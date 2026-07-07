import React, { useState } from 'react';
import { AnalyzeRequest } from '../types';
import { useTrustAnalysis } from '../hooks/useTrustAnalysis';
import { Sliders } from 'lucide-react';

interface SimulationPanelProps {
  baseRequest: AnalyzeRequest;
  originalScore: number;
}

const SimulationPanel: React.FC<SimulationPanelProps> = ({ baseRequest, originalScore }) => {
  const { simulate, simulationResult, simulationLoading } = useTrustAnalysis();
  const [loanAmount, setLoanAmount] = useState(baseRequest.loanAmount || 50000);
  const [emi, setEmi] = useState(baseRequest.emi || 10000);

  const handleRecalculate = () => {
    simulate({ loanAmount, emi });
  };

  const delta = simulationResult ? simulationResult.trustScore - originalScore : 0;

  return (
    <div className="card space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Sliders size={18} className="text-blue-400" />
          <p className="text-xs uppercase tracking-widest text-slate-500 font-semibold">Scenario Planning</p>
        </div>
        <h3 className="text-xl font-bold text-white">Loan Simulation</h3>
        <p className="mt-1 text-sm text-slate-400">Adjust parameters and estimate score impact</p>
      </div>

      <div className="space-y-6 border-t border-[#1a2540] pt-6">
        {/* Loan Amount Slider */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Loan Amount</label>
            <span className="text-lg font-bold text-white stat-number">₹{(loanAmount / 100000).toFixed(1)}L</span>
          </div>
          <input
            type="range"
            min="50000"
            max="2000000"
            step="10000"
            value={loanAmount}
            onChange={(e) => setLoanAmount(Number(e.target.value))}
            className="w-full h-2 bg-[#1a2540] rounded-full appearance-none cursor-pointer accent-blue-500"
          />
          <div className="flex justify-between text-xs text-slate-500 mt-2">
            <span>₹50K</span>
            <span>₹2M</span>
          </div>
        </div>

        {/* EMI Slider */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Monthly EMI</label>
            <span className="text-lg font-bold text-white stat-number">₹{emi.toLocaleString('en-IN')}</span>
          </div>
          <input
            type="range"
            min="1000"
            max="50000"
            step="500"
            value={emi}
            onChange={(e) => setEmi(Number(e.target.value))}
            className="w-full h-2 bg-[#1a2540] rounded-full appearance-none cursor-pointer accent-blue-500"
          />
          <div className="flex justify-between text-xs text-slate-500 mt-2">
            <span>₹1K</span>
            <span>₹50K</span>
          </div>
        </div>

        {/* Recalculate Button */}
        <button
          onClick={handleRecalculate}
          disabled={simulationLoading}
          className="w-full rounded-lg bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 px-4 py-3 text-sm font-semibold text-white transition shadow-lg shadow-blue-900/40 active:shadow-md"
        >
          {simulationLoading ? 'Recalculating...' : 'Simulate Impact'}
        </button>

        {/* Result */}
        {simulationResult && (
          <div className={`rounded-lg p-4 border-l-4 ${delta > 0
              ? 'bg-emerald-500/10 border-l-emerald-500'
              : delta < 0
                ? 'bg-red-500/10 border-l-red-500'
                : 'bg-slate-500/10 border-l-slate-500'
            }`}>
            <p className="text-xs text-slate-500 uppercase tracking-wider">Score Impact</p>
            <div className="mt-2 flex items-baseline gap-2">
              <span className={`text-2xl font-bold stat-number ${delta > 0 ? 'text-emerald-400' : delta < 0 ? 'text-red-400' : 'text-slate-400'
                }`}>
                {delta > 0 ? '+' : ''}{delta.toFixed(1)}
              </span>
              <span className="text-sm text-slate-400">points vs current score</span>
            </div>
            <p className="mt-2 text-xs text-slate-500">
              New score: <span className="font-semibold text-white">{Math.round(simulationResult.trustScore)}/100</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SimulationPanel;