"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runTransactionRiskAnalyzer = runTransactionRiskAnalyzer;
function runTransactionRiskAnalyzer(req, user) {
    let risk = 20;
    if (req.amount > 500000)
        risk += 50;
    else if (req.amount > 100000)
        risk += 30;
    const locationCounts = {};
    user.transactionHistory.forEach((t) => {
        locationCounts[t.location] = (locationCounts[t.location] || 0) + 1;
    });
    const mostCommonLocation = Object.keys(locationCounts).reduce((a, b) => locationCounts[a] > locationCounts[b] ? a : b, '');
    if (req.location !== mostCommonLocation)
        risk += 20;
    if (req.deviceType === 'unknown')
        risk += 15;
    return Math.min(100, risk);
}
