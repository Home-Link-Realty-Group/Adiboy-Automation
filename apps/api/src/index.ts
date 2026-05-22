export type HealthResponse = {
  service: string;
  status: "ok";
};

export function getHealth(): HealthResponse {
  return {
    service: "@home-link/api",
    status: "ok",
  };
}

export * from "./audit-sink.js";
export * from "./tenant-access.js";
export * from "./ingress.js";
