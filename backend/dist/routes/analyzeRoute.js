"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const mockUsers_1 = require("../data/mockUsers");
const collusionDetectionAgent_1 = require("../agents/collusionDetectionAgent");
const intentPredictionAgent_1 = require("../agents/intentPredictionAgent");
const trustDecayEngine_1 = require("../agents/trustDecayEngine");
const transactionRiskAnalyzer_1 = require("../agents/transactionRiskAnalyzer");
const explainabilityAgent_1 = require("../agents/explainabilityAgent");
const improvementCoachAgent_1 = require("../agents/improvementCoachAgent");
const trustScoreEngine_1 = require("../services/trustScoreEngine");
const decisionEngine_1 = require("../services/decisionEngine");
const router = express_1.default.Router();
router.post('/analyze', [
    (0, express_validator_1.body)('userId').isString().notEmpty(),
    (0, express_validator_1.body)('amount').isNumeric().custom((v) => v > 0),
    (0, express_validator_1.body)('deviceType').isIn(['mobile', 'desktop', 'unknown']),
    (0, express_validator_1.body)('location').isString().notEmpty(),
    (0, express_validator_1.body)('loginHour').isInt({ min: 0, max: 23 }),
    (0, express_validator_1.body)('useCase').isIn(['payment', 'loan', 'api_monitor', 'transaction']),
    (0, express_validator_1.body)('loanAmount').optional().isNumeric(),
    (0, express_validator_1.body)('emi').optional().isNumeric(),
], async (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    const body = req.body;
    const user = mockUsers_1.mockUsers.find((u) => u.id === body.userId);
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    // Artificial delay
    await new Promise((resolve) => setTimeout(resolve, 800));
    // Run agents
    const [collusionResult, intentScore, timeAdjustedScore, transactionRisk] = await Promise.all([
        (0, collusionDetectionAgent_1.runCollusionDetectionAgent)(body, user),
        (0, intentPredictionAgent_1.runIntentPredictionAgent)(body, user),
        (0, trustDecayEngine_1.runTrustDecayEngine)(body, user),
        (0, transactionRiskAnalyzer_1.runTransactionRiskAnalyzer)(body, user),
    ]);
    const agentOutputs = {
        networkRiskScore: collusionResult.networkRiskScore,
        intentScore,
        timeAdjustedScore,
        transactionRisk,
    };
    const { reasons, factors } = (0, explainabilityAgent_1.runExplainabilityAgent)(agentOutputs, body);
    const trustScore = (0, trustScoreEngine_1.computeTrustScore)(agentOutputs);
    const decision = (0, decisionEngine_1.makeDecision)(trustScore, body);
    const improvements = (0, improvementCoachAgent_1.runImprovementCoachAgent)(agentOutputs, decision);
    const result = {
        trustScore,
        decision,
        reasons,
        factors,
        agentOutputs,
        improvements,
        collusionGraph: collusionResult.collusionGraph,
        processingTimeMs: 800,
        timestamp: new Date().toISOString(),
    };
    res.json(result);
});
exports.default = router;
