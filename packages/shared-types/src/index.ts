export type Difficulty = 'beginner' | 'intermediate' | 'advanced';

export interface ChallengeSummary {
  id: string;
  slug: string;
  title: string;
  description: string;
  difficulty: Difficulty;
  published_at: string | null;
}

export interface SimulationMetrics {
  throughputRps: number;
  p95LatencyMs: number;
  errorRate: number;
  queueDepth: number;
}

export interface AttemptPayload {
  challengeId: string;
  score: number;
  architecture: unknown;
  metrics: SimulationMetrics;
}
