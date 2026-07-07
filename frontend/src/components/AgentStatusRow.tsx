import React from 'react';
import { AgentOutputs } from '../types';

interface AgentStatusRowProps {
  loading: boolean;
  agentOutputs?: AgentOutputs;
}

const AgentStatusRow: React.FC<AgentStatusRowProps> = ({ loading, agentOutputs }) => {
  const agents = [
    { key: 'networkRiskScore', label: 'CDA', fullName: 'Collusion Detection' },
    { key: 'intentScore', label: 'IPA', fullName: 'Intent Prediction' },
    { key: 'timeAdjustedScore', label: 'TDE', fullName: 'Trust Decay Engine' },
    { key: 'transactionRisk', label: 'TRA', fullName: 'Transaction Risk' },
  ];

  return (
    <div className="w-full">
      <p className="mb-3 text-xs uppercase tracking-widest text-slate-500 font-semibold">AI Agents Status</p>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {agents.map((agent) => (
          <div
            key={agent.label}
            className="card group hover:border-blue-500/50 transition-all"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-sm font-bold text-white">{agent.label}</p>
                <p className="mt-0.5 text-xs text-slate-500">{agent.fullName}</p>
              </div>
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="h-2.5 w-2.5 animate-spin rounded-full border-2 border-blue-500 border-t-transparent"></div>
                </div>
              ) : (
                <div className="inline-flex h-2 w-2 rounded-full bg-emerald-400"></div>
              )}
            </div>

            {/* Score/Status */}
            {loading ? (
              <div className="mt-3 h-5 w-12 rounded bg-slate-700 animate-pulse"></div>
            ) : agentOutputs ? (
              <p className="mt-3 text-2xl font-bold text-white stat-number">
                {Math.round(agentOutputs[agent.key as keyof AgentOutputs])}
              </p>
            ) : (
              <p className="mt-3 text-sm text-slate-400">Ready</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AgentStatusRow;