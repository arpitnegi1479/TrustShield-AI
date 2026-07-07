import React from 'react';
import { Decision } from '../types';
import { CheckCircle2, AlertCircle, XCircle } from 'lucide-react';

interface DecisionBadgeProps {
  decision: Decision;
  loading: boolean;
}

const DecisionBadge: React.FC<DecisionBadgeProps> = ({ decision, loading }) => {
  if (loading) return <div className="card h-48 animate-pulse" />;

  const configs = {
    APPROVE: {
      icon: CheckCircle2,
      bgColor: 'bg-emerald-500/10',
      textColor: 'text-emerald-400',
      borderColor: 'border-emerald-500/30',
      label: 'Proceed',
      description: 'Transaction approved for processing',
      detail: 'Risk assessment within acceptable thresholds',
    },
    VERIFY: {
      icon: AlertCircle,
      bgColor: 'bg-amber-500/10',
      textColor: 'text-amber-400',
      borderColor: 'border-amber-500/30',
      label: 'Verify',
      description: 'Step-up verification required',
      detail: 'Moderate risk detected — additional authentication needed',
    },
    FLAG: {
      icon: XCircle,
      bgColor: 'bg-red-500/10',
      textColor: 'text-red-400',
      borderColor: 'border-red-500/30',
      label: 'Flag',
      description: 'Manual review required',
      detail: 'High-risk patterns detected — escalate to compliance',
    },
  };

  const config = configs[decision];
  const Icon = config.icon;

  return (
    <div className={`card border-2 ${config.borderColor} space-y-4`} style={{ backgroundColor: config.bgColor }}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-widest text-slate-500 font-semibold">Decision</p>
          <h2 className={`mt-2 text-3xl font-bold ${config.textColor}`}>{config.label}</h2>
          <p className={`mt-1 text-sm ${config.textColor}/80`}>{config.description}</p>
        </div>
        <div className={`p-3 rounded-xl ${config.bgColor} ${config.textColor}`}>
          <Icon size={28} />
        </div>
      </div>

      <div className={`px-3 py-2 rounded-lg bg-white/3 border border-white/5`}>
        <p className="text-xs text-slate-400">{config.detail}</p>
      </div>

      {decision === 'VERIFY' && (
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-wider text-slate-500 font-semibold">OTP Verification Simulation</p>
          <div className="flex gap-2 justify-center">
            {[0, 1, 2, 3].map((i) => (
              <input
                key={i}
                type="text"
                maxLength={1}
                placeholder="•"
                className="w-12 h-12 rounded-lg border border-amber-500/30 bg-amber-500/5 text-center text-lg font-bold text-white outline-none disabled:opacity-50"
                disabled
              />
            ))}
          </div>
        </div>
      )}

      {decision === 'FLAG' && (
        <div className={`px-3 py-2 rounded-lg bg-red-500/5 border border-red-500/20`}>
          <p className="text-xs text-red-300 font-semibold">⚠️ Alert: Escalate to manual review immediately</p>
        </div>
      )}
    </div>
  );
};

export default DecisionBadge;