import { AnalyzeRequest, MockUser } from '../types';

export function runTransactionRiskAnalyzer(req: AnalyzeRequest, user: MockUser): number {
  let risk = 20;
  if (req.amount > 500000) risk += 50;
  else if (req.amount > 100000) risk += 30;
  const locationCounts: Record<string, number> = {};
  user.transactionHistory.forEach((t: { location: string }) => {
    locationCounts[t.location] = (locationCounts[t.location] || 0) + 1;
  });
  const mostCommonLocation = Object.keys(locationCounts).reduce((a, b) =>
    locationCounts[a] > locationCounts[b] ? a : b, '');
  if (req.location !== mostCommonLocation) risk += 20;
  if (req.deviceType === 'unknown') risk += 15;
  return Math.min(100, risk);
}