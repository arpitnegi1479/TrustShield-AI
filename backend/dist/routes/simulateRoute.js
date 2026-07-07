"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const mockUsers_1 = require("../data/mockUsers");
const collusionDetectionAgent_1 = require("../agents/collusionDetectionAgent");
const negotiationAgent_1 = require("../agents/negotiationAgent");
const explainabilityAgent_1 = require("../agents/explainabilityAgent");
const improvementCoachAgent_1 = require("../agents/improvementCoachAgent");
const trustScoreEngine_1 = require("../services/trustScoreEngine");
const decisionEngine_1 = require("../services/decisionEngine");
const router = express_1.default.Router();
router.post('/simulate', [
    (0, express_validator_1.body)('baseRequest').isObject(),
    (0, express_validator_1.body)('modifiedParams').isObject(),
], async (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    const body = req.body;
    const user = mockUsers_1.mockUsers.find((u) => u.id === body.baseRequest.userId);
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    const modifiedReq = { ...body.baseRequest, ...body.modifiedParams };
    const modifiedOutputs = (0, negotiationAgent_1.runNegotiationAgent)(body.baseRequest, body.modifiedParams, user);
    const modifiedCollusion = (0, collusionDetectionAgent_1.runCollusionDetectionAgent)(modifiedReq, user);
    const agentOutputs = {
        ...modifiedOutputs,
        networkRiskScore: modifiedCollusion.networkRiskScore,
    };
    const { reasons, factors } = (0, explainabilityAgent_1.runExplainabilityAgent)(agentOutputs, modifiedReq);
    const trustScore = (0, trustScoreEngine_1.computeTrustScore)(agentOutputs);
    const decision = (0, decisionEngine_1.makeDecision)(trustScore, modifiedReq);
    const improvements = (0, improvementCoachAgent_1.runImprovementCoachAgent)(agentOutputs, decision);
    const result = {
        trustScore,
        decision,
        reasons,
        factors,
        agentOutputs,
        improvements,
        collusionGraph: modifiedCollusion.collusionGraph,
        processingTimeMs: 0,
        timestamp: new Date().toISOString(),
    };
    res.json(result);
});
exports.default = router;
