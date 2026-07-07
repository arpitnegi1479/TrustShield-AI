import { AnalyzeRequest, Decision } from '../types';

export function makeDecision(score: number, req: AnalyzeRequest): Decision {
  let threshold = 50;
  if (req.useCase === 'loan' && req.loanAmount && req.loanAmount > 1000000) {
    threshold = 60; // Need 60+ to approve large loans
  }
  if (score >= 80) return 'APPROVE';
  if (score >= threshold) return 'VERIFY';
  return 'FLAG';
}