"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runTrustDecayEngine = runTrustDecayEngine;
function runTrustDecayEngine(req, user) {
    let score = 75;
    const largeTransactions = user.transactionHistory.filter((t) => t.amount > 50000).length;
    score -= Math.min(largeTransactions * 3, 15);
    if (user.accountAgeDays < 30)
        score -= 20;
    if (user.accountAgeDays > 365)
        score += 10;
    const recentLocations = user.transactionHistory.slice(-3).map((t) => t.location);
    const mismatch = recentLocations.every((loc) => loc !== req.location) ? 10 : 0;
    score -= mismatch;
    return Math.max(0, Math.min(100, score));
}
