"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runExplainabilityAgent = runExplainabilityAgent;
function runExplainabilityAgent(outputs, req) {
    const factors = [
        {
            factor: 'Behavioral Intent',
            score: outputs.intentScore,
            weight: 0.3,
            status: outputs.intentScore > 70 ? 'good' : outputs.intentScore > 40 ? 'warning' : 'danger',
            detail: `Intent score of ${outputs.intentScore} based on device consistency and login timing.`,
        },
        {
            factor: 'Network Risk',
            score: 100 - outputs.networkRiskScore,
            weight: 0.3,
            status: outputs.networkRiskScore < 30 ? 'good' : outputs.networkRiskScore < 60 ? 'warning' : 'danger',
            detail: `Network risk adjusted to ${100 - outputs.networkRiskScore} after accounting for account links.`,
        },
        {
            factor: 'Transaction Anomaly',
            score: 100 - outputs.transactionRisk,
            weight: 0.2,
            status: outputs.transactionRisk < 30 ? 'good' : outputs.transactionRisk < 60 ? 'warning' : 'danger',
            detail: `Transaction risk adjusted to ${100 - outputs.transactionRisk} based on amount and location patterns.`,
        },
        {
            factor: 'Account History',
            score: outputs.timeAdjustedScore,
            weight: 0.2,
            status: outputs.timeAdjustedScore > 70 ? 'good' : outputs.timeAdjustedScore > 40 ? 'warning' : 'danger',
            detail: `History score of ${outputs.timeAdjustedScore} reflecting account age and transaction consistency.`,
        },
    ];
    const reasons = [];
    if (outputs.intentScore < 50) {
        reasons.push(`Login detected at ${req.loginHour}:00 from a ${req.deviceType} device not previously associated with your account.`);
    }
    if (outputs.networkRiskScore > 60) {
        reasons.push(`Your account is connected to ${outputs.networkRiskScore > 80 ? 'multiple high-risk entities' : 'several suspicious accounts'} in the transaction network.`);
    }
    if (outputs.transactionRisk > 60) {
        reasons.push(`Transaction of ₹${req.amount.toLocaleString('en-IN')} from ${req.location} deviates significantly from your typical patterns.`);
    }
    if (outputs.timeAdjustedScore < 50) {
        reasons.push(`Your account history shows inconsistencies, including recent location changes and account age of ${Math.floor((Date.now() - new Date().getTime() + 86400000 * 0) / 86400000)} days.`);
    }
    // Ensure at least 3 reasons
    while (reasons.length < 3) {
        reasons.push('Additional verification recommended due to overall risk profile.');
    }
    return { reasons: reasons.slice(0, 3), factors };
}
