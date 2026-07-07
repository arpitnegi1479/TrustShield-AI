import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  ChevronRight,
  Network,
  Terminal as TerminalIcon,
  ShieldAlert,
  CheckCircle2,
  Activity,
  TrendingUp,
  HelpCircle,
  Lightbulb,
  AlertTriangle,
  Bot,
  Send
} from 'lucide-react';

// ─── REUSABLE COMPONENTS ──────────────────────────────────────────────────────

interface AIBriefingCardProps {
  badgeText: string;
  title: string;
  subText: string;
  actionText: string;
  badgeColorClass: string;
  borderColorClass: string;
  onActionClick: () => void;
  icon: React.ComponentType<{ className?: string }>;
}

const AIBriefingCard: React.FC<AIBriefingCardProps> = ({
  badgeText,
  title,
  subText,
  actionText,
  badgeColorClass,
  borderColorClass,
  onActionClick,
  icon: Icon
}) => {
  return (
    <div className={`glass-card rounded-xl p-6 flex flex-col justify-between h-56 border-l-4 ${borderColorClass} transition-all hover:scale-[1.01]`}>
      <div>
        <span className={`font-label-mono text-[10px] ${badgeColorClass} px-2 py-0.5 rounded font-bold`}>
          {badgeText}
        </span>
        <p className="mt-4 font-display-md text-xl leading-tight text-white font-bold">{title}</p>
      </div>
      <div className="flex items-center justify-between mt-4">
        <p className="text-xs text-on-surface-variant font-light">{subText}</p>
        <button
          onClick={onActionClick}
          className={`p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-all flex items-center gap-2 text-xs font-bold font-display-md`}
        >
          {actionText} <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

interface ActivityFeedItemProps {
  title: string;
  meta: string;
  icon: React.ComponentType<{ className?: string }>;
  iconColorClass: string;
}

const ActivityFeedItem: React.FC<ActivityFeedItemProps> = ({
  title,
  meta,
  icon: Icon,
  iconColorClass
}) => {
  return (
    <div className="flex items-center gap-4 py-3 hover:bg-white/5 px-2 rounded-lg transition-colors group border-b border-white/5 last:border-b-0">
      <Icon className={`w-[18px] h-[18px] shrink-0 ${iconColorClass}`} />
      <div className="flex-1">
        <p className="font-body-md text-sm text-white font-light">{title}</p>
        <p className="text-[10px] text-on-surface-variant/60 font-label-mono uppercase tracking-wider mt-0.5">{meta}</p>
      </div>
      <ArrowRight className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-1" />
    </div>
  );
};

interface CaseCardProps {
  name: string;
  caseId: string;
  score: number;
  trigger: string;
  recommendation: string;
  onOpenCase: () => void;
}

const CaseCard: React.FC<CaseCardProps> = ({
  name,
  caseId,
  score,
  trigger,
  recommendation,
  onOpenCase
}) => {
  return (
    <div className="glass-card rounded-xl p-5 border-l-2 border-error/50">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h4 className="font-display-md font-bold text-white text-base">{name}</h4>
          <p className="text-xs text-on-surface-variant font-label-mono">{caseId}</p>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-label-mono uppercase text-error tracking-wider">Trust Score</p>
          <p className="text-3xl font-bold text-error font-display-md leading-none mt-1">{score}</p>
        </div>
      </div>
      <div className="space-y-4">
        <div>
          <p className="text-[10px] uppercase font-label-mono text-on-surface-variant tracking-wider">Primary Trigger</p>
          <p className="text-sm text-on-surface/90 font-light mt-0.5">{trigger}</p>
        </div>
        <div className="bg-primary/5 rounded p-3.5 border border-primary/10">
          <p className="text-[10px] uppercase font-label-mono text-primary flex items-center gap-1.5 font-bold tracking-wider">
            <Bot className="w-3.5 h-3.5" />
            AI Recommendation
          </p>
          <p className="text-xs text-white font-light mt-1.5">{recommendation}</p>
        </div>
      </div>
      <button
        onClick={onOpenCase}
        className="w-full mt-4 py-2.5 rounded-lg bg-primary/10 border border-primary/20 hover:bg-primary/20 text-primary text-xs font-bold transition-all flex items-center justify-center gap-2 font-display-md"
      >
        OPEN INVESTIGATION <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
};

interface InsightListItemProps {
  text: string;
  icon: React.ComponentType<{ className?: string }>;
  iconColorClass: string;
}

const InsightListItem: React.FC<InsightListItemProps> = ({
  text,
  icon: Icon,
  iconColorClass
}) => {
  return (
    <li className="flex gap-3 group cursor-pointer items-start">
      <Icon className={`w-[18px] h-[18px] shrink-0 mt-0.5 ${iconColorClass}`} />
      <div className="flex-1">
        <p className="text-sm text-on-surface-variant group-hover:text-on-surface transition-colors font-light" dangerouslySetInnerHTML={{ __html: text }} />
      </div>
      <ArrowRight className="w-3.5 h-3.5 text-primary opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-1" />
    </li>
  );
};

// ─── MAIN INTELLIGENCE CENTER PAGE ───────────────────────────────────────────

export const IntelligenceCenter: React.FC = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const handleOpenCase = () => {
    navigate('/fraud-investigation');
  };

  const handleSendQuery = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    // TODO: Connect command bar queries to /api/copilot endpoint when active
    setQuery('');
  };

  return (
    <div className="max-w-[1400px] mx-auto px-grid-margin py-8 space-y-10 pb-32">
      {/* TODO: Implement GET /api/cases/aggregate-stats to fetch system counts dynamically. */}

      {/* Breadcrumbs & Hero */}
      <div className="space-y-4">
        <nav className="mb-2">
          <ol className="flex items-center gap-2 text-[10px] font-label-mono text-on-surface-variant/60 uppercase tracking-widest">
            <li>Protocol</li>
            <li><ChevronRight className="w-3 h-3 text-outline-variant" /></li>
            <li>Intelligence</li>
            <li><ChevronRight className="w-3 h-3 text-outline-variant" /></li>
            <li className="text-primary font-bold">Global Briefing</li>
          </ol>
        </nav>
        <section className="space-y-2">
          <h2 className="font-display-lg text-4xl md:text-5xl text-white font-extrabold tracking-tighter leading-none">
            Good Morning, Arpit.
          </h2>
          <div className="flex items-center gap-3">
            <div className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            <p className="font-body-md text-base text-on-surface-variant">
              TrustShield AI analyzed <span className="text-primary font-bold">48,291</span> banking events overnight.
              <span className="text-error font-bold"> 3 investigations</span> require immediate attention.
            </p>
          </div>
        </section>
      </div>

      {/* Bento Grid layout */}
      <div className="grid grid-cols-12 gap-6">

        {/* Left Column: Briefing & Feed */}
        <div className="col-span-12 lg:col-span-8 space-y-8">
          <div className="space-y-4">
            <h3 className="font-label-mono text-[11px] uppercase tracking-widest text-on-surface-variant/60 flex items-center gap-2 font-bold">
              <Bot className="w-4 h-4 text-primary" />
              Today's AI Briefing
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <AIBriefingCard
                badgeText="VELOCITY ALERT"
                title="Three customers show unusually high transaction velocity."
                subText="Likely commercial account misuse detected."
                actionText="ANALYZE"
                badgeColorClass="text-primary bg-primary/10"
                borderColorClass="border-l-primary"
                onActionClick={handleOpenCase}
                icon={Activity}
              />
              <AIBriefingCard
                badgeText="NETWORK DISCOVERY"
                title="One synthetic fraud network identified in Region 4."
                subText="7 related nodes established in last 48h."
                actionText="VIEW HUB"
                badgeColorClass="text-secondary bg-secondary/10"
                borderColorClass="border-l-secondary"
                onActionClick={handleOpenCase}
                icon={Network}
              />
            </div>
          </div>

          {/* Timeline Feed */}
          <div className="space-y-4">
            <h3 className="font-label-mono text-[11px] uppercase tracking-widest text-on-surface-variant/60 font-bold">
              Live Activity Feed
            </h3>
            {/* TODO: Bind feed to live transaction events from /api/stream-telemetry */}
            <div className="glass-card rounded-xl p-1 overflow-hidden">
              <div className="max-h-[300px] overflow-y-auto hide-scrollbar space-y-1 p-4">
                <ActivityFeedItem
                  title="SWIFT transaction screened for AML-4 Compliance"
                  meta="08:42:11 • SYSTEM GATEWAY"
                  icon={CheckCircle2}
                  iconColorClass="text-primary"
                />
                <ActivityFeedItem
                  title="Portfolio Risk-Adjustment initiated for Sector B"
                  meta="08:41:05 • RISK ENGINE"
                  icon={TrendingUp}
                  iconColorClass="text-[#ffb95f]"
                />
                <ActivityFeedItem
                  title='Loan analyzed: Decision "APPROVE" (98.4% Confidence)'
                  meta="08:39:22 • CREDIT INTEL"
                  icon={Bot}
                  iconColorClass="text-primary"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: High Priority Cases & Insights */}
        <div className="col-span-12 lg:col-span-4 space-y-8">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-label-mono text-[11px] uppercase tracking-widest text-on-surface-variant/60 font-bold">
                High Priority Cases
              </h3>
              <span className="bg-error/10 text-[#f43f5e] px-2 py-0.5 rounded text-[10px] font-bold font-label-mono">
                3 ACTIVE
              </span>
            </div>

            {/* Case list */}
            {/* TODO: Query GET /api/cases/priority to load active high-risk bank cases */}
            <div className="space-y-4">
              <CaseCard
                name="Rajesh Kumar"
                caseId="ID: #990124-RT"
                score={42}
                trigger="Large transactions from multiple new devices in offshore zones."
                recommendation="Temporary hold on withdrawals; verify identity."
                onOpenCase={handleOpenCase}
              />
            </div>
          </div>

          {/* AI Insights */}
          <div className="space-y-4">
            <h3 className="font-label-mono text-[11px] uppercase tracking-widest text-on-surface-variant/60 font-bold">
              Recent AI Insights
            </h3>
            <ul className="space-y-4">
              <InsightListItem
                text='Small business lending in Tech showing <span class="text-primary font-bold">12% improved liquidity</span>.'
                icon={Lightbulb}
                iconColorClass="text-primary"
              />
              <InsightListItem
                text="Potential 'Smurfing' patterns emerging in retail accounts near East border."
                icon={AlertTriangle}
                iconColorClass="text-[#ffb95f]"
              />
            </ul>
          </div>
        </div>

      </div>

      {/* System Health Footer */}
      <footer className="pt-12 border-t border-outline-variant/30">
        <div className="flex flex-wrap gap-6 items-center justify-between text-[11px] font-label-mono text-on-surface-variant">
          <div className="flex gap-6 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_#22c55e]" />
              <span>Fraud Engine: <strong className="text-white">ONLINE</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_#22c55e]" />
              <span>Zero Trust: <strong className="text-white">HEALTHY</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_#22c55e]" />
              <span>Latency: <strong className="text-white">14ms</strong></span>
            </div>
          </div>
          <span className="text-on-surface-variant/40">© 2024 TRUSTSHIELD AI PROTOCOL</span>
        </div>
      </footer>

      {/* Floating Bottom AI Command Bar */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-full max-w-[640px] px-4 z-[70]">
        <form
          onSubmit={handleSendQuery}
          className="bg-[#201f20]/80 backdrop-blur-xl rounded-xl border border-primary/20 shadow-[0_0_20px_rgba(34,197,94,0.15)] flex items-center px-4 py-3 focus-within:scale-[1.02] transition-transform duration-300"
        >
          <TerminalIcon className="text-primary mr-3 w-5 h-5" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask TrustShield AI anything..."
            className="bg-transparent border-none focus:ring-0 text-white placeholder:text-on-surface-variant/40 flex-1 font-body-md text-sm outline-none"
          />
          <div className="flex items-center gap-2">
            <span className="text-[9px] font-label-mono text-on-surface-variant/50 border border-on-surface-variant/20 px-1.5 py-0.5 rounded">
              CMD + K
            </span>
            <button type="submit" className="p-1 text-primary hover:bg-primary/10 rounded transition-colors">
              <Send className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
