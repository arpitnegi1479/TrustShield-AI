"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.computeTrustScore = computeTrustScore;
function computeTrustScore(outputs) {
    const score = 0.3 * outputs.intentScore +
        0.3 * (100 - outputs.networkRiskScore) +
        0.2 * (100 - outputs.transactionRisk) +
        0.2 * outputs.timeAdjustedScore;
    return Math.round(score * 10) / 10; // Round to 1 decimal
}
