import { AnalyzeRequest, MockUser } from '../types';

export function runTrustDecayEngine(req: AnalyzeRequest, user: MockUser): number {
  let score = 75;
  const largeTransactions = user.transactionHistory.filter((t: { amount: number }) => t.amount > 50000).length;
  score -= Math.min(largeTransactions * 3, 15);
  if (user.accountAgeDays < 30) score -= 20;
  if (user.accountAgeDays > 365) score += 10;
  const recentLocations = user.transactionHistory.slice(-3).map((t: { location: string }) => t.location);
  const mismatch = recentLocations.every((loc: string) => loc !== req.location) ? 10 : 0;
  score -= mismatch;
  return Math.max(0, Math.min(100, score));
}