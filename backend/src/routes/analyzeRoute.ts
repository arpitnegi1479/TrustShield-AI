import express from 'express';
import { body, validationResult } from 'express-validator';
import { AnalyzeRequest, TrustAnalysisResult } from '../types';
import { mockUsers } from '../data/mockUsers';
import { runCollusionDetectionAgent } from '../agents/collusionDetectionAgent';
import { runIntentPredictionAgent } from '../agents/intentPredictionAgent';
import { runTrustDecayEngine } from '../agents/trustDecayEngine';
import { runTransactionRiskAnalyzer } from '../agents/transactionRiskAnalyzer';
import { runExplainabilityAgent } from '../agents/explainabilityAgent';
import { runImprovementCoachAgent } from '../agents/improvementCoachAgent';
import { computeTrustScore } from '../services/trustScoreEngine';
import { makeDecision } from '../services/decisionEngine';

const router = express.Router();

router.post('/analyze', [
  body('userId').isString().notEmpty(),
  body('amount').isNumeric().custom((v) => v > 0),
  body('deviceType').isIn(['mobile', 'desktop', 'unknown']),
  body('location').isString().notEmpty(),
  body('loginHour').isInt({ min: 0, max: 23 }),
  body('useCase').isIn(['payment', 'loan', 'api_monitor', 'transaction']),
  body('loanAmount').optional().isNumeric(),
  body('emi').optional().isNumeric(),
], async (req: express.Request, res: express.Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const body: AnalyzeRequest = req.body;
  const user = mockUsers.find((u) => u.id === body.userId);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  // Artificial delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  // Run agents
  const [collusionResult, intentScore, timeAdjustedScore, transactionRisk] = await Promise.all([
    runCollusionDetectionAgent(body, user),
    runIntentPredictionAgent(body, user),
    runTrustDecayEngine(body, user),
    runTransactionRiskAnalyzer(body, user),
  ]);

  const agentOutputs = {
    networkRiskScore: collusionResult.networkRiskScore,
    intentScore,
    timeAdjustedScore,
    transactionRisk,
  };

  const { reasons, factors } = runExplainabilityAgent(agentOutputs, body);
  const trustScore = computeTrustScore(agentOutputs);
  const decision = makeDecision(trustScore, body);
  const improvements = runImprovementCoachAgent(agentOutputs, decision);

  const result: TrustAnalysisResult = {
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

router.get('/users', (req, res) => {
  res.json(mockUsers);
});

router.get('/users/:userId', (req, res) => {
  const user = mockUsers.find((u) => u.id === req.params.userId);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.json(user);
});

export default router;