import {
  evaluateCapabilityAccess,
  type PrivilegedAuditEvent,
  type TenantContextEnvelope,
  type TenantId,
  type UserId,
  privilegedCapabilityAudit,
} from "@home-link/contracts";
import type { PrivilegedAuditSink } from "./audit-sink.js";
import { getPrivilegedAuditSink } from "./audit-sink.js";

export type TenantAccessRequest = TenantContextEnvelope<{
  includeBillingSummary: boolean;
}>;

export type TenantAccessResponse = {
  tenantId: TenantId;
  actorUserId: UserId;
  canViewBillingSummary: boolean;
};

export type TenantAccessSnapshotResult = {
  response: TenantAccessResponse;
  audits: readonly PrivilegedAuditEvent[];
};

export class TenantAccessDeniedError extends Error {
  override readonly name = "TenantAccessDeniedError";

  constructor(
    message: string,
    readonly audits: readonly PrivilegedAuditEvent[],
    options?: ErrorOptions,
  ) {
    super(message, options);
  }
}

function resolveTenantAccessSnapshotCore(
  request: TenantAccessRequest,
  now?: Date,
): TenantAccessSnapshotResult {
  const audits: PrivilegedAuditEvent[] = [];
  const { tenant } = request;

  const tenantReadDecision = evaluateCapabilityAccess(tenant, "tenant.read");
  audits.push(
    privilegedCapabilityAudit({
      context: tenant,
      capability: "tenant.read",
      decision: tenantReadDecision,
      action: "tenant_access_snapshot.tenant_read",
      now,
    }),
  );

  if (!tenantReadDecision.allowed) {
    throw new TenantAccessDeniedError(
      `Access denied for request ${tenant.requestId}: ${tenantReadDecision.reason} (tenant.read).`,
      audits,
    );
  }

  if (request.payload.includeBillingSummary) {
    const billingDecision = evaluateCapabilityAccess(tenant, "billing.read");
    audits.push(
      privilegedCapabilityAudit({
        context: tenant,
        capability: "billing.read",
        decision: billingDecision,
        action: "tenant_access_snapshot.billing_read",
        now,
      }),
    );

    if (!billingDecision.allowed) {
      throw new TenantAccessDeniedError(
        `Access denied for request ${tenant.requestId}: ${billingDecision.reason} (billing.read).`,
        audits,
      );
    }
  }

  return {
    response: {
      tenantId: tenant.tenantId,
      actorUserId: tenantReadDecision.context.actorUserId,
      canViewBillingSummary: request.payload.includeBillingSummary,
    },
    audits,
  };
}

export function resolveTenantAccessSnapshotWithAuditSink(
  request: TenantAccessRequest,
  sink: PrivilegedAuditSink,
  now?: Date,
): TenantAccessSnapshotResult {
  try {
    const result = resolveTenantAccessSnapshotCore(request, now);
    sink(result.audits);
    return result;
  } catch (e: unknown) {
    if (e instanceof TenantAccessDeniedError) {
      sink(e.audits);
    }
    throw e;
  }
}

export function resolveTenantAccessSnapshot(
  request: TenantAccessRequest,
  now?: Date,
): TenantAccessSnapshotResult {
  return resolveTenantAccessSnapshotWithAuditSink(
    request,
    getPrivilegedAuditSink(),
    now,
  );
}

export function getTenantAccessSnapshot(
  request: TenantAccessRequest,
  now?: Date,
): TenantAccessResponse {
  return resolveTenantAccessSnapshot(request, now).response;
}
