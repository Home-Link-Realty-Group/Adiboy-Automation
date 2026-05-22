import { BillingWebhookPayloadError } from "@home-link/contracts";
import { afterEach, describe, expect, it } from "vitest";
import {
  BillingWebhookSignatureError,
  assertValidBillingWebhookSignature,
  processBillingWebhookDelivery,
  resetBillingWebhookIdempotencyForTests,
} from "./billing-webhook.js";

const signingSecret = "whsec_test";
const validSignature = `v1=${signingSecret}`;

const validBody = JSON.stringify({
  id: "evt_1",
  type: "customer.subscription.updated",
  data: {
    tenantId: "tenant_a",
    subscriptionId: "sub_1",
    status: "active",
    occurredAtIso: "2026-05-06T12:00:00.000Z",
  },
});

afterEach(() => {
  resetBillingWebhookIdempotencyForTests();
});

describe("assertValidBillingWebhookSignature", () => {
  it("accepts v1=<secret> header", () => {
    expect(() =>
      assertValidBillingWebhookSignature(validSignature, signingSecret),
    ).not.toThrow();
  });

  it("rejects missing header", () => {
    expect(() =>
      assertValidBillingWebhookSignature(undefined, signingSecret),
    ).toThrow(BillingWebhookSignatureError);
  });

  it("rejects wrong signature", () => {
    expect(() =>
      assertValidBillingWebhookSignature("v1=wrong", signingSecret),
    ).toThrow(BillingWebhookSignatureError);
  });
});

describe("processBillingWebhookDelivery", () => {
  it("processes first delivery", () => {
    const result = processBillingWebhookDelivery({
      rawBody: validBody,
      signatureHeader: validSignature,
      signingSecret,
    });
    expect(result.duplicate).toBe(false);
    expect(result.envelope.id).toBe("evt_1");
    expect(result.envelope.tenantId).toBe("tenant_a");
  });

  it("returns duplicate on same id and tenant", () => {
    processBillingWebhookDelivery({
      rawBody: validBody,
      signatureHeader: validSignature,
      signingSecret,
    });
    const second = processBillingWebhookDelivery({
      rawBody: validBody,
      signatureHeader: validSignature,
      signingSecret,
    });
    expect(second.duplicate).toBe(true);
  });

  it("does not mark duplicate for same event id different tenant", () => {
    processBillingWebhookDelivery({
      rawBody: validBody,
      signatureHeader: validSignature,
      signingSecret,
    });
    const otherTenantBody = JSON.stringify({
      id: "evt_1",
      type: "customer.subscription.updated",
      data: {
        tenantId: "tenant_b",
        subscriptionId: "sub_1",
        status: "active",
        occurredAtIso: "2026-05-06T12:00:00.000Z",
      },
    });
    const second = processBillingWebhookDelivery({
      rawBody: otherTenantBody,
      signatureHeader: validSignature,
      signingSecret,
    });
    expect(second.duplicate).toBe(false);
  });

  it("fails closed on bad JSON after signature ok", () => {
    expect(() =>
      processBillingWebhookDelivery({
        rawBody: "not-json",
        signatureHeader: validSignature,
        signingSecret,
      }),
    ).toThrow(BillingWebhookPayloadError);
  });
});
