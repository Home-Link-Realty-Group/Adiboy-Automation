import {
  type TenantId,
  type UserId,
  IngressValidationError,
} from "@home-link/contracts";
import { afterEach, describe, expect, it } from "vitest";
import {
  getHealth,
  getTenantAccessSnapshot,
  getTenantAccessSnapshotFromIngress,
  resetPrivilegedAuditSink,
  resolveTenantAccessSnapshot,
  resolveTenantAccessSnapshotFromIngress,
  setPrivilegedAuditSink,
  TenantAccessDeniedError,
} from "./index.js";

afterEach(() => {
  resetPrivilegedAuditSink();
});

function catchSync<T>(
  fn: () => T,
): { ok: true; value: T } | { ok: false; error: unknown } {
  try {
    return { ok: true, value: fn() };
  } catch (error) {
    return { ok: false, error };
  }
}

describe("getHealth", () => {
  it("returns service health", () => {
    expect(getHealth()).toEqual({
      service: "@home-link/api",
      status: "ok",
    });
  });
});

describe("getTenantAccessSnapshot", () => {
  it("returns snapshot when capabilities are satisfied", () => {
    const result = getTenantAccessSnapshot({
      tenant: {
        tenantId: "t1" as TenantId,
        actorUserId: "u1" as UserId,
        actorRole: "tenant_admin",
        requestId: "r1",
        source: "api",
      },
      payload: { includeBillingSummary: true },
    });

    expect(result).toEqual({
      tenantId: "t1",
      actorUserId: "u1",
      canViewBillingSummary: true,
    });
  });

  it("throws when billing.read is required but missing", () => {
    expect(() =>
      getTenantAccessSnapshot({
        tenant: {
          tenantId: "t1" as TenantId,
          actorUserId: "u1" as UserId,
          actorRole: "acquisitions_rep",
          requestId: "r1",
          source: "api",
        },
        payload: { includeBillingSummary: true },
      }),
    ).toThrow(/billing\.read/);
  });

  it("throws when authenticated actor is missing", () => {
    expect(() =>
      getTenantAccessSnapshot({
        tenant: {
          tenantId: "t1" as TenantId,
          actorUserId: null,
          actorRole: "tenant_admin",
          requestId: "r-missing-user",
          source: "api",
        },
        payload: { includeBillingSummary: false },
      }),
    ).toThrow(/r-missing-user.*tenant\.read/);
  });
});

describe("resolveTenantAccessSnapshot", () => {
  const fixedInstant = new Date("2026-05-06T15:30:00.000Z");

  it("records tenant.read denial audit before rejecting", () => {
    const outcome = catchSync(() =>
      resolveTenantAccessSnapshot(
        {
          tenant: {
            tenantId: "t1" as TenantId,
            actorUserId: null,
            actorRole: "tenant_admin",
            requestId: "r-no-actor",
            source: "api",
          },
          payload: { includeBillingSummary: false },
        },
        fixedInstant,
      ),
    );

    expect(outcome).toMatchObject({ ok: false });
    const denial = outcome as { ok: false; error: unknown };
    expect(denial.error).toBeInstanceOf(TenantAccessDeniedError);

    const denied = denial.error as TenantAccessDeniedError;
    expect(denied.audits).toHaveLength(1);
    expect(denied.audits[0].capability).toBe("tenant.read");
    expect(denied.audits[0].outcome).toBe("denied");
    expect(denied.audits[0].denyReason).toBe("missing_authenticated_actor");
  });

  it("emits privilege audit rows in evaluation order", () => {
    const result = resolveTenantAccessSnapshot(
      {
        tenant: {
          tenantId: "t1" as TenantId,
          actorUserId: "u1" as UserId,
          actorRole: "tenant_admin",
          requestId: "r-audit",
          source: "api",
        },
        payload: { includeBillingSummary: true },
      },
      fixedInstant,
    );

    expect(result.audits).toHaveLength(2);
    expect(result.audits[0]).toMatchObject({
      capability: "tenant.read",
      action: "tenant_access_snapshot.tenant_read",
      outcome: "allowed",
      occurredAtIso: fixedInstant.toISOString(),
    });
    expect(result.audits[1]).toMatchObject({
      capability: "billing.read",
      action: "tenant_access_snapshot.billing_read",
      outcome: "allowed",
    });
  });

  it("records tenant.read allow plus billing denial in audit trail", () => {
    const outcome = catchSync(() =>
      resolveTenantAccessSnapshot(
        {
          tenant: {
            tenantId: "t1" as TenantId,
            actorUserId: "u1" as UserId,
            actorRole: "acquisitions_rep",
            requestId: "r-deny-chain",
            source: "job",
          },
          payload: { includeBillingSummary: true },
        },
        fixedInstant,
      ),
    );

    expect(outcome).toMatchObject({ ok: false });
    const denial = outcome as { ok: false; error: unknown };
    expect(denial.error).toBeInstanceOf(TenantAccessDeniedError);

    const denied = denial.error as TenantAccessDeniedError;
    expect(denied.message).toMatch(/billing\.read/);
    expect(denied.audits).toHaveLength(2);
    expect(denied.audits[0].outcome).toBe("allowed");
    expect(denied.audits[1]).toMatchObject({
      capability: "billing.read",
      outcome: "denied",
      denyReason: "missing_capability",
    });
  });
});

const validIngressHeaders = {
  "x-home-link-tenant-id": "t1",
  "x-home-link-user-id": "u1",
  "x-home-link-actor-role": "tenant_admin",
  "x-request-id": "r-ingress",
} as const;

describe("getTenantAccessSnapshotFromIngress", () => {
  it("returns snapshot from bootstrap headers", () => {
    const result = getTenantAccessSnapshotFromIngress(validIngressHeaders, {
      includeBillingSummary: true,
    });
    expect(result).toEqual({
      tenantId: "t1",
      actorUserId: "u1",
      canViewBillingSummary: true,
    });
  });

  it("throws IngressValidationError before capability checks when user header is missing", () => {
    expect(() =>
      getTenantAccessSnapshotFromIngress(
        {
          "x-home-link-tenant-id": "t1",
          "x-home-link-actor-role": "tenant_admin",
        },
        { includeBillingSummary: false },
      ),
    ).toThrow(IngressValidationError);
  });

  it("throws for billing without capability after ingress passes", () => {
    expect(() =>
      getTenantAccessSnapshotFromIngress(
        {
          ...validIngressHeaders,
          "x-home-link-actor-role": "acquisitions_rep",
        },
        { includeBillingSummary: true },
      ),
    ).toThrow(/billing\.read/);
  });

  it("resolveTenantAccessSnapshotFromIngress returns audits and response", () => {
    const fixedInstant = new Date("2026-05-06T15:30:00.000Z");
    const result = resolveTenantAccessSnapshotFromIngress(
      validIngressHeaders,
      { includeBillingSummary: true },
      fixedInstant,
    );
    expect(result.response).toEqual({
      tenantId: "t1",
      actorUserId: "u1",
      canViewBillingSummary: true,
    });
    expect(result.audits).toHaveLength(2);
    expect(result.audits[0]).toMatchObject({ capability: "tenant.read" });
    expect(result.audits[1]).toMatchObject({ capability: "billing.read" });
  });
});

describe("privileged audit sink", () => {
  it("invokes sink on allowed snapshot", () => {
    const received: unknown[] = [];
    setPrivilegedAuditSink((audits) => {
      received.push(audits);
    });

    getTenantAccessSnapshot({
      tenant: {
        tenantId: "t1" as TenantId,
        actorUserId: "u1" as UserId,
        actorRole: "tenant_admin",
        requestId: "r-sink-ok",
        source: "api",
      },
      payload: { includeBillingSummary: false },
    });

    expect(received).toHaveLength(1);
    expect((received[0] as { length: number }).length).toBe(1);
  });

  it("invokes sink with audits on denial", () => {
    const received: unknown[] = [];
    setPrivilegedAuditSink((audits) => {
      received.push(audits);
    });

    expect(() =>
      getTenantAccessSnapshot({
        tenant: {
          tenantId: "t1" as TenantId,
          actorUserId: "u1" as UserId,
          actorRole: "acquisitions_rep",
          requestId: "r-sink-deny",
          source: "api",
        },
        payload: { includeBillingSummary: true },
      }),
    ).toThrow(TenantAccessDeniedError);

    expect(received).toHaveLength(1);
    const audits = received[0] as Array<{ outcome: string }>;
    expect(audits.some((a) => a.outcome === "allowed")).toBe(true);
    expect(audits.some((a) => a.outcome === "denied")).toBe(true);
  });
});
