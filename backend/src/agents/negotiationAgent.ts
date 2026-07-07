import { AgentOutputs, AnalyzeRequest, MockUser } from '../types';
import { runCollusionDetectionAgent } from './collusionDetectionAgent';
import { runIntentPredictionAgent } from './intentPredictionAgent';
import { runTransactionRiskAnalyzer } from './transactionRiskAnalyzer';
import { runTrustDecayEngine } from './trustDecayEngine';

export function runNegotiationAgent(
  base: AnalyzeRequest,
  modified: Partial<AnalyzeRequest>,
  user: MockUser
): AgentOutputs {
  const req: AnalyzeRequest = { ...base, ...modified };
  const { networkRiskScore } = runCollusionDetectionAgent(req, user);
  let intentScore = runIntentPredictionAgent(req, user);
  const timeAdjustedScore = runTrustDecayEngine(req, user);
  let transactionRisk = runTransactionRiskAnalyzer(req, user);

  // Apply bonuses
  if (modified.loanAmount && base.loanAmount && modified.loanAmount < base.loanAmount * 0.8) {
    intentScore = Math.min(100, intentScore + 8);
  }
  const incomeProxy = (base.loanAmount || 0) / 10; // Rough proxy
  if (modified.emi && modified.emi < 0.3 * incomeProxy) {
    transactionRisk = Math.max(0, transactionRisk - 10);
  }

  return {
    networkRiskScore,
    intentScore,
    timeAdjustedScore,
    transactionRisk,
  };
}