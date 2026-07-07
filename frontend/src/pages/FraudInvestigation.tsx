import React, { useEffect, useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Activity,
  AlertTriangle,
  Bot,
  CheckCircle2,
  ChevronRight,
  Clock3,
  FileText,
  RefreshCw,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Wallet,
} from 'lucide-react';
import {
  InvestigationDrawer,
} from '../components/investigation/InvestigationDrawer';
import { InvestigationEvidence } from '../components/investigation/InvestigationEvidence';
import { InvestigationGraph } from '../components/investigation/InvestigationGraph';
import { InvestigationTimeline } from '../components/investigation/InvestigationTimeline';
import type {
  InvestigationAnalysis,
  InvestigationCaseData,
  InvestigationNode,
  InvestigationNodeDetails,
  InvestigationTimelineItem,
} from '../components/investigation/types';

export const FraudInvestigation: React.FC = () => {
  const navigate = useNavigate();
  const { caseId } = useParams<{ caseId: string }>();

  const [caseData, setCaseData] = useState<InvestigationCaseData | null>(null);
  const [analysis, setAnalysis] = useState<InvestigationAnalysis | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedNode, setSelectedNode] = useState<InvestigationNodeDetails | null>(null);

  const demoCase: InvestigationCaseData = {
    id: 'USR-RT990',
    name: 'Rajesh Kumar',
    riskProfile: 'high',
    defaults: {
      amount: 42500,
      useCase: 'payment',
      location: 'Mumbai',
      deviceType: 'mobile',
      loginHour: 2,
    },
    transactionHistory: [
      { amount: 42500, location: 'Mumbai', date: '2024-10-24' },
      { amount: 2450, location: 'Mumbai', date: '2024-10-24' },
      { amount: 1000, location: 'Mumbai', date: '2024-10-24' },
    ],
    deviceHistory: ['iPhone 14 Pro', 'MacBook Pro'],
    accountAgeDays: 540,
  };

  const demoAnalysis: InvestigationAnalysis = {
    trustScore: 42,
    decision: 'VERIFY',
    reasons: [
      'Large transaction velocity deviation detected.',
      'Offshore node location access mismatch.',
      'Close relationship link to a flagged cluster.',
    ],
    factors: [
      {
        factor: 'Behavioral Intent',
        score: 85,
        weight: 0.25,
        status: 'good',
        detail: 'Consistent biometric and login patterns confirm prior intent.',
      },
      {
        factor: 'Transaction Anomaly',
        score: 32,
        weight: 0.35,
        status: 'danger',
        detail: 'Out-of-pattern transfer spike detected during the latest activity.',
      },
      {
        factor: 'Graph Risk Cluster',
        score: 14,
        weight: 0.2,
        status: 'danger',
        detail: 'Connected within two hops to a known suspicious network.',
      },
      {
        factor: 'Trust Decay',
        score: 55,
        weight: 0.2,
        status: 'warning',
        detail: 'Device profile mismatch compared with historical activity.',
      },
    ],
    collusionGraph: {
      nodes: [
        { id: 'USR-RT990', label: 'Rajesh Kumar', risk: 'high' },
        { id: 'ACC-001', label: 'S. Kumar', risk: 'low' },
        { id: 'ACC-002', label: 'Z. Al-Fayed', risk: 'medium' },
        { id: 'ACC-003', label: 'Cluster Alpha', risk: 'high' },
        { id: 'ACC-004', label: 'M. Zhao', risk: 'low' },
      ],
      links: [
        { source: 'USR-RT990', target: 'ACC-001', strength: 0.8 },
        { source: 'USR-RT990', target: 'ACC-002', strength: 0.6 },
        { source: 'USR-RT990', target: 'ACC-003', strength: 0.9 },
        { source: 'USR-RT990', target: 'ACC-004', strength: 0.5 },
      ],
    },
  };

  useEffect(() => {
    const loadInvestigation = async () => {
      try {
        setLoading(true);
        setError(null);

        if (caseId === 'USR-RT990') {
          setCaseData(demoCase);
          setAnalysis(demoAnalysis);
          return;
        }

        const userResponse = await fetch(`http://localhost:3001/api/users/${caseId}`);
        if (!userResponse.ok) {
          const listResponse = await fetch('http://localhost:3001/api/users');
          if (!listResponse.ok) {
            throw new Error('Unable to load investigation data');
          }
          const users = await listResponse.json();
          const fallbackUser = users.find((user: InvestigationCaseData) => user.id === caseId);
          if (!fallbackUser) {
            throw new Error('Investigation not found');
          }
          setCaseData(fallbackUser);
          const analyzePayload = {
            ...fallbackUser.defaults,
            userId: fallbackUser.id,
            amount: fallbackUser.defaults.amount,
            useCase: fallbackUser.defaults.useCase,
            location: fallbackUser.defaults.location ?? 'Mumbai',
            deviceType: fallbackUser.defaults.deviceType ?? 'mobile',
            loginHour: fallbackUser.defaults.loginHour ?? 9,
          };
          const analyzeResponse = await fetch('http://localhost:3001/api/analyze', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(analyzePayload),
          });
          if (!analyzeResponse.ok) {
            throw new Error('Analysis calculation failed');
          }
          setAnalysis(await analyzeResponse.json());
          return;
        }

        const userData: InvestigationCaseData = await userResponse.json();
        setCaseData(userData);

        const analyzePayload = {
          ...userData.defaults,
          userId: userData.id,
          amount: userData.defaults.amount,
          useCase: userData.defaults.useCase,
          location: userData.defaults.location ?? 'Mumbai',
          deviceType: userData.defaults.deviceType ?? 'mobile',
          loginHour: userData.defaults.loginHour ?? 9,
        };
        const analyzeResponse = await fetch('http://localhost:3001/api/analyze', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(analyzePayload),
        });
        if (!analyzeResponse.ok) {
          throw new Error('Analysis calculation failed');
        }
        setAnalysis(await analyzeResponse.json());
      } catch (err: any) {
        console.error('Failed loading investigation', err);
        setError(err.message || 'Unable to load investigation.');
        setCaseData(demoCase);
        setAnalysis(demoAnalysis);
      } finally {
        setLoading(false);
      }
    };

    void loadInvestigation();
  }, [caseId]);

  const handleOpenNodeDetails = (node: InvestigationNode) => {
    let score = 88;
    let rel = 'Associate';
    let history = 'Established trust pattern with no prior alerts.';

    if (node.risk === 'high') {
      score = 12;
      rel = 'Syndicate';
      history = 'Associated with a flagged cluster observed across multiple accounts.';
    } else if (node.risk === 'medium') {
      score = 58;
      rel = 'Business';
      history = 'Connected to a peripheral entity with repeated anomaly signals.';
    }

    setSelectedNode({
      name: node.label,
      score,
      risk: node.risk.toUpperCase(),
      rel,
      history,
    });
    setDrawerOpen(true);
  };

  const width = 780;
  const height = 460;
  const centerX = width / 2;
  const centerY = height / 2;

  const mappedNodes = useMemo(() => {
    return analysis?.collusionGraph.nodes ?? [];
  }, [analysis]);

  const timelineItems = useMemo<InvestigationTimelineItem[]>(() => {
    const latestTx = caseData?.transactionHistory[0];
    return [
      {
        title: 'Investigation opened',
        meta: `${caseData?.accountAgeDays ?? 0} days since initial account activity`,
        icon: Clock3,
      },
      {
        title: latestTx ? `Latest transfer · ₹${latestTx.amount.toLocaleString('en-IN')}` : 'Latest transfer recorded',
        meta: latestTx ? `${latestTx.location} · ${latestTx.date}` : 'No recent transfer data',
        icon: Activity,
      },
      {
        title: analysis?.decision === 'FLAG' ? 'Escalation triggered' : 'Review recommendation generated',
        meta: analysis?.reasons[0] ?? 'Reviewing customer risk signals',
        icon: ShieldAlert,
      },
    ];
  }, [analysis, caseData]);

  if (loading) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center gap-4">
        <RefreshCw className="h-12 w-12 animate-spin text-primary" />
        <p className="font-label-mono text-xs uppercase tracking-[0.3em] text-on-surface-variant">
          Loading investigation
        </p>
      </div>
    );
  }

  if (!caseData || !analysis) {
    return (
      <div className="mx-auto flex max-w-3xl flex-col gap-4 px-10 py-16">
        <div className="glass-card rounded-2xl border border-error/20 bg-error/5 p-8">
          <h2 className="font-display-lg text-2xl text-white">Investigation unavailable</h2>
          <p className="mt-3 text-sm text-on-surface-variant">{error ?? 'Unable to load the requested investigation.'}</p>
        </div>
      </div>
    );
  }

  const riskBadge = caseData.riskProfile === 'high' ? 'High' : caseData.riskProfile === 'medium' ? 'Medium' : 'Low';

  return (
    <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-8 px-8 py-8 pb-32">
      <section className="flex flex-col gap-5 border-b border-outline-variant/20 pb-8">
        <div className="flex items-center gap-2 text-[10px] font-label-mono uppercase tracking-[0.3em] text-on-surface-variant/70">
          <span>TrustShield AI</span>
          <ChevronRight className="h-3 w-3" />
          <span>Investigations</span>
          <ChevronRight className="h-3 w-3" />
          <span className="text-primary">{caseData.name}</span>
        </div>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="font-display-lg text-4xl font-extrabold uppercase tracking-tight text-white md:text-5xl">
              Executive Investigation Summary
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-on-surface-variant">
              Reusable fraud investigation workspace for monitoring trust, relationship exposure, and evidence-backed recommendations.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 items-center">
            <button
              onClick={() => navigate(`/ai-copilot/${caseData.id}`)}
              className="flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 hover:bg-primary/20 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.25em] text-primary transition-all cursor-pointer"
            >
              <Bot className="w-3.5 h-3.5" /> AI Copilot
            </button>
            <button
              onClick={() => navigate(`/reports/${caseData.id}`)}
              className="flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 hover:bg-primary/20 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.25em] text-primary transition-all cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5" /> AI Report
            </button>
            <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.25em] text-primary">
              Case ID #{caseData.id}
            </span>
            <span className="rounded-full border border-outline-variant/30 bg-surface-container px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.25em] text-on-surface-variant">
              {riskBadge} RISK
            </span>
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="glass-card rounded-[2rem] border border-white/5 bg-[#0d0d0d]/80 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-label-mono text-[10px] uppercase tracking-[0.3em] text-on-surface-variant/70">Trust Score</p>
              <h2 className="mt-3 font-display-lg text-3xl font-bold text-white">Trust Pulse Gauge</h2>
            </div>
            <span className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.25em] ${analysis.trustScore >= 80
              ? 'border border-primary/20 bg-primary/10 text-primary'
              : analysis.trustScore >= 50
                ? 'border border-[#ffb95f]/20 bg-[#ffb95f]/10 text-[#ffb95f]'
                : 'border border-error/20 bg-error/10 text-error'
              }`}>
              {analysis.decision}
            </span>
          </div>

          <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-6">
              <div className="relative flex h-36 w-36 items-center justify-center rounded-full border border-white/10 bg-surface-container">
                <svg viewBox="0 0 100 100" className="h-28 w-28 -rotate-90">
                  <circle cx="50" cy="50" r="38" stroke="rgba(255,255,255,0.08)" strokeWidth="10" fill="none" />
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    stroke={analysis.trustScore >= 80 ? '#22c55e' : analysis.trustScore >= 50 ? '#ffb95f' : '#f43f5e'}
                    strokeWidth="10"
                    strokeLinecap="round"
                    fill="none"
                    strokeDasharray={238}
                    strokeDashoffset={238 - (238 * analysis.trustScore) / 100}
                  />
                </svg>
                <div className="absolute text-center">
                  <div className="font-display-lg text-4xl font-bold text-white">{analysis.trustScore}</div>
                  <div className="text-[10px] uppercase tracking-[0.25em] text-on-surface-variant">/100</div>
                </div>
              </div>
              <div className="space-y-3">
                <p className="text-sm leading-7 text-on-surface-variant">
                  The investigation view combines customer context, relationship graph signals, and agent-driven explainability into a single review surface.
                </p>
                <div className="flex items-center gap-2 text-primary">
                  <ShieldCheck className="h-4 w-4" />
                  <span className="text-sm font-semibold">Explainable and auditable</span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-primary/10 bg-primary/5 p-4 text-sm text-on-surface-variant">
              <p className="text-[10px] uppercase tracking-[0.25em] text-on-surface-variant/60">AI Recommendation</p>
              <p className="mt-3 font-semibold text-white">{analysis.decision === 'FLAG' ? 'Escalate immediately' : analysis.decision === 'VERIFY' ? 'Request manual verification' : 'Approve with monitoring'}</p>
              <div className="mt-4 flex items-center gap-2 text-primary">
                <Sparkles className="h-4 w-4" />
                <span className="text-sm">Recommendation generated from live backend signals</span>
              </div>
            </div>
          </div>
        </div>

        <div className="glass-card rounded-[2rem] border border-white/5 bg-[#0d0d0d]/80 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
          <div className="flex items-center gap-3">
            <Bot className="h-5 w-5 text-primary" />
            <p className="font-label-mono text-[10px] uppercase tracking-[0.3em] text-on-surface-variant/70">Entity Information</p>
          </div>
          <div className="mt-6 space-y-4">
            <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-4">
              <p className="text-[10px] uppercase tracking-[0.25em] text-on-surface-variant/60">Customer Name</p>
              <p className="mt-2 text-sm font-semibold text-white">{caseData.name}</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-4">
                <p className="text-[10px] uppercase tracking-[0.25em] text-on-surface-variant/60">Customer ID</p>
                <p className="mt-2 text-sm font-semibold text-white">{caseData.id}</p>
              </div>
              <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-4">
                <p className="text-[10px] uppercase tracking-[0.25em] text-on-surface-variant/60">PAN</p>
                <p className="mt-2 text-sm font-semibold text-white">TODO: backend field not exposed</p>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-4">
                <p className="text-[10px] uppercase tracking-[0.25em] text-on-surface-variant/60">Account Number</p>
                <p className="mt-2 text-sm font-semibold text-white">TODO: backend field not exposed</p>
              </div>
              <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-4">
                <p className="text-[10px] uppercase tracking-[0.25em] text-on-surface-variant/60">Risk Profile</p>
                <p className="mt-2 text-sm font-semibold text-white">{riskBadge}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 2xl:grid-cols-[1.2fr_0.8fr]">
        <div className="glass-card rounded-[2rem] border border-white/5 bg-[#0d0d0d]/80 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-label-mono text-[10px] uppercase tracking-[0.3em] text-on-surface-variant/70">Risk Indicators</p>
              <h2 className="mt-2 font-display-lg text-2xl font-bold text-white">Flagged signals</h2>
            </div>
            <span className="rounded-full border border-outline-variant/30 bg-white/[0.03] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.25em] text-on-surface-variant">
              {analysis.factors.length} signals
            </span>
          </div>
          <div className="mt-6 grid gap-3 lg:grid-cols-2">
            {analysis.factors.map((factor) => (
              <div key={factor.factor} className="rounded-2xl border border-white/5 bg-white/[0.03] p-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-white">{factor.factor}</p>
                  <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.25em] ${factor.status === 'danger' ? 'bg-error/10 text-error' : factor.status === 'warning' ? 'bg-[#ffb95f]/10 text-[#ffb95f]' : 'bg-primary/10 text-primary'
                    }`}>
                    {factor.score}
                  </span>
                </div>
                <p className="mt-3 text-sm text-on-surface-variant">{factor.detail}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card rounded-[2rem] border border-white/5 bg-[#0d0d0d]/80 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
          <div className="flex items-center gap-3">
            <Clock3 className="h-5 w-5 text-primary" />
            <p className="font-label-mono text-[10px] uppercase tracking-[0.3em] text-on-surface-variant/70">Timeline of Events</p>
          </div>
          <InvestigationTimeline items={timelineItems} />
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="glass-card rounded-[2rem] border border-white/5 bg-[#0d0d0d]/80 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Wallet className="h-5 w-5 text-primary" />
              <p className="font-label-mono text-[10px] uppercase tracking-[0.3em] text-on-surface-variant/70">Related Transactions</p>
            </div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-on-surface-variant">{caseData.transactionHistory.length} entries</span>
          </div>
          <div className="mt-6 space-y-3">
            {caseData.transactionHistory.map((tx, index) => (
              <div key={`${tx.date}-${index}`} className="flex flex-col gap-3 rounded-2xl border border-white/5 bg-white/[0.03] p-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm font-semibold text-white">{tx.location}</p>
                  <p className="mt-1 text-xs text-on-surface-variant">{tx.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-white">₹{tx.amount.toLocaleString('en-IN')}</p>
                  <p className="mt-1 text-xs text-primary">{index === 0 ? 'Latest activity' : 'Historical activity'}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card rounded-[2rem] border border-white/5 bg-[#0d0d0d]/80 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-label-mono text-[10px] uppercase tracking-[0.3em] text-on-surface-variant/70">Relationship Intelligence Network</p>
              <h2 className="mt-2 font-display-lg text-2xl font-bold text-white">Linked exposure map</h2>
            </div>
            <span className="rounded-full border border-outline-variant/30 bg-white/[0.03] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.25em] text-on-surface-variant">
              {analysis.collusionGraph.nodes.length} nodes
            </span>
          </div>

          <div className="mt-6 h-[420px] overflow-hidden rounded-[1.5rem] border border-outline-variant/20 bg-[#050505]">
            <InvestigationGraph
              nodes={mappedNodes}
              centerX={centerX}
              centerY={centerY}
              width={width}
              height={height}
              activeId={caseData.id}
              onSelectNode={handleOpenNodeDetails}
            />
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="glass-card rounded-[2rem] border border-white/5 bg-[#0d0d0d]/80 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
          <div className="flex items-center gap-3">
            <FileText className="h-5 w-5 text-primary" />
            <p className="font-label-mono text-[10px] uppercase tracking-[0.3em] text-on-surface-variant/70">Evidence</p>
          </div>
          <InvestigationEvidence items={analysis.reasons} />
        </div>

        <div className="glass-card rounded-[2rem] border border-white/5 bg-[#0d0d0d]/80 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-primary" />
              <p className="font-label-mono text-[10px] uppercase tracking-[0.3em] text-on-surface-variant/70">Decision Actions</p>
            </div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-on-surface-variant">Review queue</span>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <button className="rounded-xl border border-primary/30 bg-primary/10 px-5 py-3 text-sm font-semibold text-primary">
              Approve
            </button>
            <button className="rounded-xl border border-error/20 bg-error/10 px-5 py-3 text-sm font-semibold text-error">
              Reject
            </button>
            <button className="rounded-xl border border-[#ffb95f]/20 bg-[#ffb95f]/10 px-5 py-3 text-sm font-semibold text-[#ffb95f]">
              Escalate
            </button>
          </div>
          <div className="mt-6 rounded-2xl border border-white/5 bg-white/[0.03] p-4 text-sm leading-7 text-on-surface-variant">
            <p className="flex items-center gap-2 text-white">
              <AlertTriangle className="h-4 w-4 text-[#ffb95f]" />
              Investigation actions are intentionally reusable and can be applied to any backend-backed case through the same template.
            </p>
          </div>
        </div>
      </section>

      <section className="glass-card rounded-[2rem] border border-white/5 bg-[#0d0d0d]/80 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Sparkles className="h-5 w-5 text-primary" />
            <p className="font-label-mono text-[10px] uppercase tracking-[0.3em] text-on-surface-variant/70">AI Explainability</p>
          </div>
          <span className="text-[10px] uppercase tracking-[0.25em] text-on-surface-variant">Why this decision was made</span>
        </div>
        <div className="mt-6 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-3">
            {analysis.reasons.map((reason, index) => (
              <div key={reason} className="rounded-2xl border border-white/5 bg-white/[0.03] p-4">
                <div className="flex items-center gap-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                    {index + 1}
                  </span>
                  <p className="text-sm text-on-surface-variant">{reason}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="space-y-3">
            {analysis.factors.map((factor) => (
              <div key={factor.factor} className="rounded-2xl border border-white/5 bg-white/[0.03] p-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-white">{factor.factor}</p>
                  <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.25em] ${factor.status === 'danger' ? 'bg-error/10 text-error' : factor.status === 'warning' ? 'bg-[#ffb95f]/10 text-[#ffb95f]' : 'bg-primary/10 text-primary'
                    }`}>
                    {factor.score}
                  </span>
                </div>
                <p className="mt-3 text-sm text-on-surface-variant">{factor.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {drawerOpen && selectedNode && (
        <InvestigationDrawer node={selectedNode} onClose={() => setDrawerOpen(false)} />
      )}
    </div>
  );
};
