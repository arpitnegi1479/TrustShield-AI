"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runNegotiationAgent = runNegotiationAgent;
const collusionDetectionAgent_1 = require("./collusionDetectionAgent");
const intentPredictionAgent_1 = require("./intentPredictionAgent");
const transactionRiskAnalyzer_1 = require("./transactionRiskAnalyzer");
const trustDecayEngine_1 = require("./trustDecayEngine");
function runNegotiationAgent(base, modified, user) {
    const req = { ...base, ...modified };
    const { networkRiskScore } = (0, collusionDetectionAgent_1.runCollusionDetectionAgent)(req, user);
    let intentScore = (0, intentPredictionAgent_1.runIntentPredictionAgent)(req, user);
    const timeAdjustedScore = (0, trustDecayEngine_1.runTrustDecayEngine)(req, user);
    let transactionRisk = (0, transactionRiskAnalyzer_1.runTransactionRiskAnalyzer)(req, user);
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
