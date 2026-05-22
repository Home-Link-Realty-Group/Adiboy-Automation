import {
  type BillingWebhookEnvelope,
  parseBillingWebhookEnvelope,
} from "@home-link/contracts";

export class BillingWebhookSignatureError extends Error {
  override readonly name = "BillingWebhookSignatureError";

  constructor(message: string) {
    super(message);
  }
}

const idempotencyKeys = new Set<string>();

/** Test-only: in-memory store resets between tests. */
export function resetBillingWebhookIdempotencyForTests(): void {
  idempotencyKeys.clear();
}

/**
 * Skeleton verifier only: compares `X-Billing-Signature` to `v1=${signingSecret}`.
 * Replace with provider HMAC verification before production.
 */
export function assertValidBillingWebhookSignature(
  signatureHeader: string | undefined,
  signingSecret: string,
): void {
  if (!signatureHeader?.trim()) {
    throw new BillingWebhookSignatureError(
      "Missing billing webhook signature header.",
    );
  }
  const expected = `v1=${signingSecret}`;
  if (signatureHeader.trim() !== expected) {
    throw new BillingWebhookSignatureError(
      "Invalid billing webhook signature (skeleton verifier).",
    );
  }
}

export type BillingWebhookDeliveryResult =
  | { ok: true; envelope: BillingWebhookEnvelope; duplicate: false }
  | { ok: true; envelope: BillingWebhookEnvelope; duplicate: true };

export function processBillingWebhookDelivery(input: {
  rawBody: string;
  signatureHeader: string | undefined;
  signingSecret: string;
}): BillingWebhookDeliveryResult {
  assertValidBillingWebhookSignature(
    input.signatureHeader,
    input.signingSecret,
  );
  const envelope = parseBillingWebhookEnvelope(input.rawBody);
  const idempotencyKey = `${envelope.id}:${envelope.tenantId}`;
  if (idempotencyKeys.has(idempotencyKey)) {
    return { ok: true, envelope, duplicate: true };
  }
  idempotencyKeys.add(idempotencyKey);
  return { ok: true, envelope, duplicate: false };
}
