// ─── INPUT ────────────────────────────────────────────────────────────────────

export interface AnalyzeRequest {
  userId: string;                  // e.g. "USR-001"
  amount: number;                  // Transaction amount in INR
  deviceType: 'mobile' | 'desktop' | 'unknown';
  location: string;                // City name, e.g. "Mumbai"
  loginHour: number;               // 0–23 (hour of login)
  loanAmount?: number;             // Optional: for loan use case
  emi?: number;                    // Optional: monthly EMI
  useCase: 'payment' | 'loan' | 'api_monitor' | 'transaction';
}

export interface SimulateRequest {
  baseRequest: AnalyzeRequest;
  modifiedParams: Partial<Pick<AnalyzeRequest, 'loanAmount' | 'emi' | 'amount'>>;
}

// ─── AGENT OUTPUTS ────────────────────────────────────────────────────────────

export interface AgentOutputs {
  networkRiskScore: number;        // 0–100 (higher = riskier)
  intentScore: number;             // 0–100 (higher = more genuine)
  timeAdjustedScore: number;       // 0–100 (higher = better history)
  transactionRisk: number;         // 0–100 (higher = more anomalous)
}

// ─── TRUST RESULT ─────────────────────────────────────────────────────────────

export type Decision = 'APPROVE' | 'VERIFY' | 'FLAG';

export interface FactorBreakdown {
  factor: string;                  // Human label, e.g. "Behavioral Intent"
  score: number;                   // Normalized 0–100 contribution
  weight: number;                  // Weight used in formula
  status: 'good' | 'warning' | 'danger';
  detail: string;                  // One-sentence plain-English explanation
}

export interface CollusionNode {
  id: string;
  label: string;
  risk: 'low' | 'medium' | 'high';
}

export interface CollusionLink {
  source: string;
  target: string;
  strength: number;                // 0–1
}

export interface TrustAnalysisResult {
  trustScore: number;              // Final 0–100
  decision: Decision;
  reasons: string[];               // Top 3 plain-English reasons
  factors: FactorBreakdown[];      // Per-agent breakdown
  agentOutputs: AgentOutputs;      // Raw scores
  improvements: string[];          // From ImprovementCoachAgent
  collusionGraph: {
    nodes: CollusionNode[];
    links: CollusionLink[];
  };
  processingTimeMs: number;
  timestamp: string;               // ISO string
}

export interface MockUser {
  id: string;
  name: string;
  riskProfile: 'low' | 'medium' | 'high';
  avatar: string;           // Emoji
  defaults: AnalyzeRequest;
  transactionHistory: { amount: number; location: string; date: string }[];
  deviceHistory: string[];  // ['mobile', 'desktop', ...]
  accountAgeDays: number;
}