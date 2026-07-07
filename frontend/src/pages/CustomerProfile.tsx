import React, { useEffect, useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Activity,
  ArrowRight,
  Bot,
  ChevronRight,
  Clock3,
  CreditCard,
  FileText,
  X,
  RefreshCw,
  ShieldAlert,
  ShieldCheck,
  Smartphone,
  Users,
  Wallet,
} from 'lucide-react';
import { InvestigationGraph } from '../components/investigation/InvestigationGraph';

interface Factor {
  factor: string;
  score: number;
  weight: number;
  status: 'good' | 'warning' | 'danger';
  detail: string;
}

interface CollusionNode {
  id: string;
  label: string;
  risk: 'low' | 'medium' | 'high';
}

interface CollusionLink {
  source: string;
  target: string;
  strength: number;
}

interface CustomerProfileData {
  id: string;
  name: string;
  riskProfile: 'low' | 'medium' | 'high';
  defaults: {
    amount: number;
    useCase: string;
    location?: string;
    deviceType?: string;
    loginHour?: number;
    loanAmount?: number;
    emi?: number;
    userId?: string;
  };
  transactionHistory: { amount: number; location: string; date: string }[];
  deviceHistory: string[];
  accountAgeDays: number;
}

interface AnalysisResult {
  trustScore: number;
  decision: 'APPROVE' | 'VERIFY' | 'FLAG';
  reasons: string[];
  factors: Factor[];
  collusionGraph: {
    nodes: CollusionNode[];
    links: CollusionLink[];
  };
}

export const CustomerProfile: React.FC = () => {
  const navigate = useNavigate();
  const { customerId } = useParams<{ customerId: string }>();

  const [customer, setCustomer] = useState<CustomerProfileData | null>(null);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedNode, setSelectedNode] = useState<{
    name: string;
    score: number;
    risk: string;
    rel: string;
    count: number;
    last: string;
    history: string;
  } | null>(null);

  const width = 820;
  const height = 500;
  const centerX = width / 2;
  const centerY = height / 2;

  const demoCustomer: CustomerProfileData = {
    id: 'USR-RT990',
    name: 'Rajesh Kumar',
    riskProfile: 'high',
    defaults: {
      amount: 42500,
      useCase: 'payment',
      location: 'Mumbai',
      deviceType: 'mobile',
      loginHour: 2,
      userId: 'USR-RT990',
    },
    transactionHistory: [
      { amount: 42500, location: 'Mumbai', date: '2024-10-24' },
      { amount: 2450, location: 'Mumbai', date: '2024-10-24' },
      { amount: 1000, location: 'Mumbai', date: '2024-10-24' },
    ],
    deviceHistory: ['iPhone 14 Pro', 'MacBook Pro'],
    accountAgeDays: 540,
  };

  const demoAnalysis: AnalysisResult = {
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
        detail: 'Out-of-pattern amount spike detected during the latest transfer.',
      },
      {
        factor: 'Graph Risk Cluster',
        score: 14,
        weight: 0.2,
        status: 'danger',
        detail: 'Connected within two hops to a known syndicate cluster.',
      },
      {
        factor: 'Trust Decay',
        score: 55,
        weight: 0.2,
        status: 'warning',
        detail: 'Device profile mismatch compared to historical activity.',
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
    const loadProfileData = async () => {
      try {
        setLoading(true);
        setError(null);

        if (customerId === 'USR-RT990') {
          setCustomer(demoCustomer);
          setAnalysis(demoAnalysis);
          return;
        }

        const userResponse = await fetch(`http://localhost:3001/api/users/${customerId}`);
        if (!userResponse.ok) {
          throw new Error('Customer not found');
        }

        const userData: CustomerProfileData = await userResponse.json();
        setCustomer(userData);

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

        const analyzeData: AnalysisResult = await analyzeResponse.json();
        setAnalysis(analyzeData);
      } catch (err: any) {
        console.error('Failed loading customer profile', err);
        setError(err.message || 'Unable to load customer data.');
        setCustomer(demoCustomer);
        setAnalysis(demoAnalysis);
      } finally {
        setLoading(false);
      }
    };

    void loadProfileData();
  }, [customerId]);

  const handleOpenNodeDetails = (node: CollusionNode) => {
    if (node.id === customerId || node.id === customer?.id) {
      return;
    }

    let score = 88;
    let rel = 'Associate';
    let count = 142;
    let last = '$4,000.00';
    let history = 'Established trust pattern with no prior alerts.';

    if (node.risk === 'high') {
      score = 12;
      rel = 'Syndicate';
      count = 890;
      last = '$1.2M';
      history = 'Consolidated fraudulent cluster identified by the AI risk engine.';
    } else if (node.risk === 'medium') {
      score = 58;
      rel = 'Business';
      count = 24;
      last = '$18k';
      history = 'Associated with a shell entity flagged during a prior review.';
    }

    setSelectedNode({
      name: node.label,
      score,
      risk: node.risk.toUpperCase(),
      rel,
      count,
      last,
      history,
    });
    setDrawerOpen(true);
  };

  const summaryItems = [
    { label: 'Use Case', value: customer?.defaults.useCase ?? '—' },
    { label: 'Location', value: customer?.defaults.location ?? '—' },
    { label: 'Account Age', value: `${customer?.accountAgeDays ?? 0} days` },
    { label: 'Last Activity', value: customer?.transactionHistory[0]?.date ?? '—' },
  ];

  const timelineItems = useMemo(() => {
    const latestTx = customer?.transactionHistory[0];
    return [
      {
        title: 'Case opened',
        meta: `${customer?.accountAgeDays ?? 0} days since account creation`,
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
  }, [analysis, customer]);

  if (loading) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center gap-4">
        <RefreshCw className="h-12 w-12 animate-spin text-primary" />
        <p className="font-label-mono text-xs uppercase tracking-[0.3em] text-on-surface-variant">
          Loading customer profile
        </p>
      </div>
    );
  }

  if (error || !customer || !analysis) {
    return (
      <div className="mx-auto flex max-w-3xl flex-col gap-4 px-10 py-16">
        <div className="glass-card rounded-2xl border border-error/20 bg-error/5 p-8">
          <h2 className="font-display-lg text-2xl text-white">Profile unavailable</h2>
          <p className="mt-3 text-sm text-on-surface-variant">{error ?? 'Unable to load the requested customer profile.'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-8 px-8 py-8 pb-32">
      <section className="flex flex-col gap-5 border-b border-outline-variant/20 pb-8">
        <div className="flex items-center gap-2 text-[10px] font-label-mono uppercase tracking-[0.3em] text-on-surface-variant/70">
          <span>TrustShield AI</span>
          <ChevronRight className="h-3 w-3" />
          <span>Customers</span>
          <ChevronRight className="h-3 w-3" />
          <span className="text-primary">{customer.name}</span>
        </div>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="font-display-lg text-4xl font-extrabold uppercase tracking-tight text-white md:text-5xl">
              {customer.name}
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-on-surface-variant">
              Unified customer profile combining account history, relationship signals, and AI-generated trust reasoning.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 items-center">
            <button
              onClick={() => navigate(`/investigation/${customer.id}`)}
              className="flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 hover:bg-primary/20 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.25em] text-primary transition-all cursor-pointer"
            >
              <Activity className="w-3.5 h-3.5" /> Open Investigation
            </button>
            <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.25em] text-primary">
              Case ID #{customer.id}
            </span>
            <span className="rounded-full border border-outline-variant/30 bg-surface-container px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.25em] text-on-surface-variant">
              {customer.riskProfile.toUpperCase()} RISK
            </span>
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="glass-card rounded-[2rem] border border-white/5 bg-[#0d0d0d]/80 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-label-mono text-[10px] uppercase tracking-[0.3em] text-on-surface-variant/70">Trust Score</p>
              <h2 className="mt-3 font-display-lg text-3xl font-bold text-white">Live trust assessment</h2>
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
                  The AI engine has synthesized intent, transaction, relationship, and trust-decay signals into a single decision.
                </p>
                <div className="flex items-center gap-2 text-primary">
                  <ShieldCheck className="h-4 w-4" />
                  <span className="text-sm font-semibold">Explainable by design</span>
                </div>
              </div>
            </div>

            <div className="grid gap-3 text-sm text-on-surface-variant sm:grid-cols-2">
              {summaryItems.map((item) => (
                <div key={item.label} className="rounded-2xl border border-white/5 bg-white/[0.03] p-3">
                  <p className="text-[10px] uppercase tracking-[0.25em] text-on-surface-variant/60">{item.label}</p>
                  <p className="mt-2 font-semibold text-white">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="glass-card rounded-[2rem] border border-white/5 bg-[#0d0d0d]/80 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
          <div className="flex items-center gap-3">
            <Bot className="h-5 w-5 text-primary" />
            <p className="font-label-mono text-[10px] uppercase tracking-[0.3em] text-on-surface-variant/70">Customer Summary</p>
          </div>
          <div className="mt-6 space-y-4">
            <div className="rounded-2xl border border-primary/10 bg-primary/5 p-4">
              <p className="text-sm leading-7 text-on-surface-variant">
                {customer.defaults.useCase === 'loan'
                  ? 'Loan exposure is under review with elevated risk due to repayment pressure.'
                  : 'Transaction behavior is consistent with the current trust profile and requires human verification.'}
              </p>
            </div>
            <div className="grid gap-3 text-sm sm:grid-cols-2">
              <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-4">
                <p className="text-[10px] uppercase tracking-[0.25em] text-on-surface-variant/60">Main Device</p>
                <p className="mt-2 font-semibold text-white">{customer.deviceHistory[0] ?? 'Unknown'}</p>
              </div>
              <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-4">
                <p className="text-[10px] uppercase tracking-[0.25em] text-on-surface-variant/60">Expected Behavior</p>
                <p className="mt-2 font-semibold text-white">{customer.defaults.location ?? 'Unspecified'}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 2xl:grid-cols-[1.3fr_0.7fr]">
        <div className="glass-card rounded-[2rem] border border-white/5 bg-[#0d0d0d]/80 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-label-mono text-[10px] uppercase tracking-[0.3em] text-on-surface-variant/70">Relationship Network</p>
              <h2 className="mt-2 font-display-lg text-2xl font-bold text-white">Linked entities and exposure</h2>
            </div>
            <span className="rounded-full border border-outline-variant/30 bg-white/[0.03] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.25em] text-on-surface-variant">
              {analysis.collusionGraph.nodes.length} nodes
            </span>
          </div>

          <div className="mt-6 h-[480px] overflow-hidden rounded-[1.5rem] border border-outline-variant/20 bg-[#050505]">
            <InvestigationGraph
              nodes={analysis.collusionGraph.nodes}
              centerX={centerX}
              centerY={centerY}
              width={width}
              height={height}
              activeId={customer.id}
              onSelectNode={handleOpenNodeDetails}
            />
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass-card rounded-[2rem] border border-white/5 bg-[#0d0d0d]/80 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
            <div className="flex items-center gap-3">
              <Clock3 className="h-5 w-5 text-primary" />
              <p className="font-label-mono text-[10px] uppercase tracking-[0.3em] text-on-surface-variant/70">Timeline</p>
            </div>
            <div className="mt-6 space-y-4">
              {timelineItems.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="flex gap-3 rounded-2xl border border-white/5 bg-white/[0.03] p-4">
                    <div className="mt-0.5 rounded-full border border-primary/20 bg-primary/10 p-2 text-primary">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">{item.title}</p>
                      <p className="mt-1 text-sm text-on-surface-variant">{item.meta}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="glass-card rounded-[2rem] border border-white/5 bg-[#0d0d0d]/80 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
            <div className="flex items-center gap-3">
              <Smartphone className="h-5 w-5 text-primary" />
              <p className="font-label-mono text-[10px] uppercase tracking-[0.3em] text-on-surface-variant/70">Devices</p>
            </div>
            <div className="mt-6 space-y-3">
              {customer.deviceHistory.map((device) => (
                <div key={device} className="flex items-center justify-between rounded-2xl border border-white/5 bg-white/[0.03] p-4 text-sm">
                  <span className="text-white">{device}</span>
                  <span className="text-on-surface-variant">Known device</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="glass-card rounded-[2rem] border border-white/5 bg-[#0d0d0d]/80 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
          <div className="flex items-center gap-3">
            <CreditCard className="h-5 w-5 text-primary" />
            <p className="font-label-mono text-[10px] uppercase tracking-[0.3em] text-on-surface-variant/70">Accounts</p>
          </div>
          <div className="mt-6 space-y-3">
            {analysis.collusionGraph.nodes.filter((node) => node.id !== customer.id).map((node) => (
              <div key={node.id} className="rounded-2xl border border-white/5 bg-white/[0.03] p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-white">{node.label}</p>
                    <p className="mt-1 text-xs text-on-surface-variant">Linked account</p>
                  </div>
                  <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.25em] ${node.risk === 'high' ? 'bg-error/10 text-error' : node.risk === 'medium' ? 'bg-[#ffb95f]/10 text-[#ffb95f]' : 'bg-primary/10 text-primary'
                    }`}>
                    {node.risk}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card rounded-[2rem] border border-white/5 bg-[#0d0d0d]/80 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Wallet className="h-5 w-5 text-primary" />
              <p className="font-label-mono text-[10px] uppercase tracking-[0.3em] text-on-surface-variant/70">Transactions</p>
            </div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-on-surface-variant">{customer.transactionHistory.length} entries</span>
          </div>
          <div className="mt-6 space-y-3">
            {customer.transactionHistory.map((tx, index) => (
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
      </section>

      <section className="glass-card rounded-[2rem] border border-white/5 bg-[#0d0d0d]/80 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FileText className="h-5 w-5 text-primary" />
            <p className="font-label-mono text-[10px] uppercase tracking-[0.3em] text-on-surface-variant/70">AI Summary</p>
          </div>
          <span className="text-[10px] uppercase tracking-[0.25em] text-on-surface-variant">Explainability</span>
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
        <div className="fixed right-6 top-24 z-[80] w-[360px] rounded-[1.5rem] border border-white/10 bg-[#111111]/95 p-6 shadow-[0_30px_80px_rgba(0,0,0,0.5)] backdrop-blur-xl">
          <div className="flex items-start justify-between">
            <div>
              <p className="font-label-mono text-[10px] uppercase tracking-[0.3em] text-on-surface-variant/60">Entity details</p>
              <h3 className="mt-2 font-display-lg text-xl font-bold text-white">{selectedNode.name}</h3>
            </div>
            <button onClick={() => setDrawerOpen(false)} className="rounded-full p-2 text-on-surface-variant hover:bg-white/5 hover:text-white">
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="mt-6 grid gap-3 text-sm">
            <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-4">
              <p className="text-[10px] uppercase tracking-[0.25em] text-on-surface-variant/60">Trust Score</p>
              <p className="mt-2 text-lg font-semibold text-white">{selectedNode.score}</p>
            </div>
            <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-4">
              <p className="text-[10px] uppercase tracking-[0.25em] text-on-surface-variant/60">Risk Level</p>
              <p className="mt-2 text-sm font-semibold text-white">{selectedNode.risk}</p>
            </div>
            <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-4">
              <p className="text-[10px] uppercase tracking-[0.25em] text-on-surface-variant/60">Relation Type</p>
              <p className="mt-2 text-sm font-semibold text-white">{selectedNode.rel}</p>
            </div>
            <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-4">
              <p className="text-[10px] uppercase tracking-[0.25em] text-on-surface-variant/60">Signal Note</p>
              <p className="mt-2 text-sm leading-7 text-on-surface-variant">{selectedNode.history}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
