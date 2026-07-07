"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runIntentPredictionAgent = runIntentPredictionAgent;
function runIntentPredictionAgent(req, user) {
    const devicePenalty = user.deviceHistory.includes(req.deviceType) ? 0 : -20;
    let hourBonus = 0;
    if (req.loginHour >= 0 && req.loginHour <= 5)
        hourBonus = -25;
    else if (req.loginHour >= 9 && req.loginHour <= 18)
        hourBonus = 10;
    const amounts = user.transactionHistory.map((t) => t.amount).sort((a, b) => a - b);
    const medianAmount = amounts.length > 0 ? amounts[Math.floor(amounts.length / 2)] : 0;
    const frequencyPenalty = req.amount > 3 * medianAmount ? -20 : 0;
    return Math.max(0, Math.min(100, 80 + devicePenalty + hourBonus + frequencyPenalty));
}
