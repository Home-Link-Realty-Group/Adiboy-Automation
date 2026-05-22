import type { PrivilegedAuditEvent } from "@home-link/contracts";

export type PrivilegedAuditSink = (
  audits: readonly PrivilegedAuditEvent[],
) => void;

const noopSink: PrivilegedAuditSink = () => {};

let currentSink: PrivilegedAuditSink = noopSink;

export function setPrivilegedAuditSink(sink: PrivilegedAuditSink): void {
  currentSink = sink;
}

export function resetPrivilegedAuditSink(): void {
  currentSink = noopSink;
}

export function getPrivilegedAuditSink(): PrivilegedAuditSink {
  return currentSink;
}
