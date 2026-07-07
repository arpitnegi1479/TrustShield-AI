import express from 'express';
import { body, validationResult } from 'express-validator';
import { AnalyzeRequest, SimulateRequest, TrustAnalysisResult } from '../types';
import { mockUsers } from '../data/mockUsers';
import { runCollusionDetectionAgent } from '../agents/collusionDetectionAgent';
import { runNegotiationAgent } from '../agents/negotiationAgent';
import { runExplainabilityAgent } from '../agents/explainabilityAgent';
import { runImprovementCoachAgent } from '../agents/improvementCoachAgent';
import { computeTrustScore } from '../services/trustScoreEngine';
import { makeDecision } from '../services/decisionEngine';

const router = express.Router();

router.post('/simulate', [
  body('baseRequest').isObject(),
  body('modifiedParams').isObject(),
], async (req: express.Request, res: express.Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const body: SimulateRequest = req.body;
  const user = mockUsers.find((u) => u.id === body.baseRequest.userId);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  const modifiedReq: AnalyzeRequest = { ...body.baseRequest, ...body.modifiedParams };
  const modifiedOutputs = runNegotiationAgent(body.baseRequest, body.modifiedParams, user);
  const modifiedCollusion = runCollusionDetectionAgent(modifiedReq, user);

  const agentOutputs = {
    ...modifiedOutputs,
    networkRiskScore: modifiedCollusion.networkRiskScore,
  };

  const { reasons, factors } = runExplainabilityAgent(agentOutputs, modifiedReq);
  const trustScore = computeTrustScore(agentOutputs);
  const decision = makeDecision(trustScore, modifiedReq);
  const improvements = runImprovementCoachAgent(agentOutputs, decision);

  const result: TrustAnalysisResult = {
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

export default router;