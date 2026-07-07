import { AgentOutputs } from '../types';

export function computeTrustScore(outputs: AgentOutputs): number {
  const score =
    0.3 * outputs.intentScore +
    0.3 * (100 - outputs.networkRiskScore) +
    0.2 * (100 - outputs.transactionRisk) +
    0.2 * outputs.timeAdjustedScore;
  return Math.round(score * 10) / 10; // Round to 1 decimal
}