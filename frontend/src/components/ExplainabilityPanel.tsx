import React, { useState } from 'react';
import { FactorBreakdown } from '../types';

interface ExplainabilityPanelProps {
  factors: FactorBreakdown[];
  reasons: string[];
}

const ExplainabilityPanel: React.FC<ExplainabilityPanelProps> = ({ factors, reasons }) => {
  const [activeTab, setActiveTab] = useState<'breakdown' | 'reasons'>('breakdown');

  return (
    <div className="card space-y-6">
      {/* Header */}
      <div>
        <p className="text-xs uppercase tracking-widest text-slate-500 font-semibold">Explainability</p>
        <h3 className="mt-2 text-xl font-bold text-white">Factor Breakdown</h3>
      </div>

      {/* Tab Selector */}
      <div className="flex gap-2 border-b border-[#1a2540]">
        <button
          onClick={() => setActiveTab('breakdown')}
          className={`px-4 py-2 text-sm font-medium transition border-b-2 ${activeTab === 'breakdown'
              ? 'border-blue-500 text-white'
              : 'border-transparent text-slate-500 hover:text-slate-400'
            }`}
        >
          Factor Breakdown
        </button>
        <button
          onClick={() => setActiveTab('reasons')}
          className={`px-4 py-2 text-sm font-medium transition border-b-2 ${activeTab === 'reasons'
              ? 'border-blue-500 text-white'
              : 'border-transparent text-slate-500 hover:text-slate-400'
            }`}
        >
          Why This Matters
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'breakdown' && (
        <div className="grid gap-3">
          {factors.map((factor, index) => (
            <div key={factor.factor} className="rounded-lg border border-[#1a2540] bg-[#0d1424] p-4" style={{ animationDelay: `${index * 0.08}s` }}>
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <p className="font-semibold text-white">{factor.factor}</p>
                  <p className="text-xs text-slate-500 mt-1">{factor.detail}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-white stat-number">{Math.round(factor.score)}</p>
                  <p className="text-xs text-slate-500">wgt {factor.weight}</p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="h-1.5 rounded-full bg-[#1a2540] overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${factor.status === 'good'
                      ? 'bg-emerald-500'
                      : factor.status === 'warning'
                        ? 'bg-amber-500'
                        : 'bg-red-500'
                    }`}
                  style={{ width: `${Math.min(factor.score, 100)}%` }}
                ></div>
              </div>

              {/* Status Badge */}
              <div className="mt-2 flex justify-end">
                <span
                  className={`text-xs font-semibold uppercase tracking-wider px-2 py-0.5 rounded ${factor.status === 'good'
                      ? 'bg-emerald-500/10 text-emerald-400'
                      : factor.status === 'warning'
                        ? 'bg-amber-500/10 text-amber-400'
                        : 'bg-red-500/10 text-red-400'
                    }`}
                >
                  {factor.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'reasons' && (
        <div className="space-y-3">
          {reasons.map((reason, index) => (
            <div key={index} className="rounded-lg border border-[#1a2540] bg-[#0d1424] p-4">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center text-xs font-bold text-blue-400">
                  {index + 1}
                </div>
                <p className="text-sm text-slate-300 leading-relaxed">{reason}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExplainabilityPanel;