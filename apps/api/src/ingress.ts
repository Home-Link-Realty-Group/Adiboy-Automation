import {
  assertAuthenticatedTenantContext,
  type BootstrapIngressHeaders,
  parseBootstrapTenantContext,
} from "@home-link/contracts";
import { randomUUID } from "node:crypto";
import { getPrivilegedAuditSink } from "./audit-sink.js";
import {
  type TenantAccessRequest,
  type TenantAccessResponse,
  type TenantAccessSnapshotResult,
  resolveTenantAccessSnapshotWithAuditSink,
} from "./tenant-access.js";

function resolveRequestId(headers: BootstrapIngressHeaders): string {
  const fromHeader = headers["x-request-id"]?.trim();
  return fromHeader && fromHeader.length > 0 ? fromHeader : randomUUID();
}

/**
 * Central ingress: parse bootstrap headers, enforce authenticated actor, then capability checks.
 */
export function parseAndAssertAuthenticatedTenant(
  headers: BootstrapIngressHeaders,
): TenantAccessRequest["tenant"] {
  const tenant = parseBootstrapTenantContext(headers, {
    requestId: resolveRequestId(headers),
    source: "api",
  });
  assertAuthenticatedTenantContext(tenant);
  return tenant;
}

export function getTenantAccessSnapshotFromIngress(
  headers: BootstrapIngressHeaders,
  payload: TenantAccessRequest["payload"],
  now?: Date,
): TenantAccessResponse {
  const tenant = parseAndAssertAuthenticatedTenant(headers);
  return resolveTenantAccessSnapshotWithAuditSink(
    { tenant, payload },
    getPrivilegedAuditSink(),
    now,
  ).response;
}

export function resolveTenantAccessSnapshotFromIngress(
  headers: BootstrapIngressHeaders,
  payload: TenantAccessRequest["payload"],
  now?: Date,
): TenantAccessSnapshotResult {
  const tenant = parseAndAssertAuthenticatedTenant(headers);
  return resolveTenantAccessSnapshotWithAuditSink(
    { tenant, payload },
    getPrivilegedAuditSink(),
    now,
  );
}
