import { AgentOutputs, Decision } from '../types';

export function runImprovementCoachAgent(
  outputs: AgentOutputs,
  decision: Decision
): string[] {
  const improvements: string[] = [];
  if (outputs.networkRiskScore > 60) {
    improvements.push('Avoid transacting with flagged accounts to reduce network risk.');
  }
  if (outputs.intentScore < 50) {
    improvements.push('Use your registered device for high-value transactions to improve intent scoring.');
  }
  if (outputs.timeAdjustedScore < 50) {
    improvements.push('Build account history by maintaining regular activity patterns.');
  }
  if (outputs.transactionRisk > 60) {
    improvements.push('Split large payments into smaller verified transactions.');
  }
  if (decision === 'FLAG') {
    improvements.push('Contact support to manually verify your identity and resolve flagged status.');
  }
  // Ensure 3-5
  while (improvements.length < 3) {
    improvements.push('Review your account settings and transaction habits for better trust scores.');
  }
  return improvements.slice(0, 5);
}