export interface ServerModel {
  id: string;
  capacityRps: number;
  baseLatencyMs: number;
  maxQueue: number;
}

export interface TrafficModel {
  requestsPerSecond: number;
}

export interface SimulationResult {
  offeredRps: number;
  servedRps: number;
  droppedRps: number;
  utilization: number;
  estimatedLatencyMs: number;
  errorRate: number;
}

export function simulateServer(server: ServerModel, traffic: TrafficModel): SimulationResult {
  const offeredRps = Math.max(0, traffic.requestsPerSecond);
  const servedRps = Math.min(offeredRps, Math.max(0, server.capacityRps));
  const droppedRps = Math.max(0, offeredRps - servedRps);
  const utilization = server.capacityRps > 0 ? offeredRps / server.capacityRps : 1;
  const pressure = Math.min(8, Math.max(0, utilization));
  const estimatedLatencyMs = server.baseLatencyMs * (1 + pressure * pressure);
  const errorRate = offeredRps > 0 ? droppedRps / offeredRps : 0;

  return {
    offeredRps,
    servedRps,
    droppedRps,
    utilization,
    estimatedLatencyMs,
    errorRate
  };
}

// Keep the engine deterministic: the same inputs must always produce the same outputs.
// Seeded traffic distributions and discrete-event simulation can be layered on later.
