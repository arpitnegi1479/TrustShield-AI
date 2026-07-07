import React from 'react';
import { useTrust } from '../context/TrustContext';
import { useTrustAnalysis } from '../hooks/useTrustAnalysis';
import SampleUserSelector from './SampleUserSelector';

const InputPanel: React.FC = () => {
  const { state, dispatch } = useTrust();
  const { analyze } = useTrustAnalysis();

  const handleChange = (key: keyof typeof state.input, value: any) => {
    dispatch({ type: 'SET_INPUT', payload: { [key]: value } });
  };

  const handleSubmit = () => {
    if (!state.input.userId || state.input.amount <= 0) {
      alert('Please fill in user ID and amount');
      return;
    }
    analyze();
  };

  const formatHour = (hour: number) => {
    const period = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour} ${period}`;
  };

  return (
    <div className="card space-y-6">
      <div>
        <p className="text-xs uppercase tracking-widest text-blue-500 font-semibold">Analysis Input</p>
        <h2 className="mt-2 text-xl font-bold text-white">Transaction Setup</h2>
      </div>

      <SampleUserSelector />

      <div className="space-y-4 pt-2 border-t border-[#1a2540]">
        <div>
          <label className="block mb-2.5 text-xs uppercase tracking-wider text-slate-400 font-semibold">User ID</label>
          <input
            type="text"
            value={state.input.userId}
            onChange={(e) => handleChange('userId', e.target.value)}
            className="w-full rounded-lg border border-[#1e293b] bg-[#0d1424] px-3.5 py-2.5 text-sm text-white outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            placeholder="e.g. USR-001"
          />
        </div>

        <div>
          <label className="block mb-2.5 text-xs uppercase tracking-wider text-slate-400 font-semibold">Use Case</label>
          <select
            value={state.input.useCase}
            onChange={(e) => handleChange('useCase', e.target.value)}
            className="w-full rounded-lg border border-[#1e293b] bg-[#0d1424] px-3.5 py-2.5 text-sm text-white outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          >
            <option value="payment">Payment</option>
            <option value="loan">Loan</option>
            <option value="transaction">Transaction</option>
            <option value="api_monitor">API Monitor</option>
          </select>
        </div>

        <div>
          <label className="block mb-2.5 text-xs uppercase tracking-wider text-slate-400 font-semibold">Amount (₹)</label>
          <input
            type="number"
            value={state.input.amount}
            onChange={(e) => handleChange('amount', Number(e.target.value))}
            className="w-full rounded-lg border border-[#1e293b] bg-[#0d1424] px-3.5 py-2.5 text-sm text-white outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            min="0"
          />
        </div>

        <div>
          <label className="block mb-2.5 text-xs uppercase tracking-wider text-slate-400 font-semibold">Device</label>
          <div className="flex gap-2">
            {['mobile', 'desktop', 'unknown'].map((type) => (
              <label
                key={type}
                className={`flex-1 px-3 py-2 rounded-lg border text-xs font-medium text-center cursor-pointer transition ${state.input.deviceType === type
                    ? 'border-blue-500 bg-blue-500/10 text-white'
                    : 'border-[#1e293b] bg-[#0d1424] text-slate-400 hover:border-slate-600'
                  }`}
              >
                <input
                  type="radio"
                  name="deviceType"
                  value={type}
                  checked={state.input.deviceType === type}
                  onChange={(e) => handleChange('deviceType', e.target.value as any)}
                  className="hidden"
                />
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block mb-2.5 text-xs uppercase tracking-wider text-slate-400 font-semibold">Location</label>
          <input
            type="text"
            value={state.input.location}
            onChange={(e) => handleChange('location', e.target.value)}
            className="w-full rounded-lg border border-[#1e293b] bg-[#0d1424] px-3.5 py-2.5 text-sm text-white outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            placeholder="e.g. Mumbai"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2.5">
            <label className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Login Hour</label>
            <span className="text-sm font-semibold text-white">{formatHour(state.input.loginHour)}</span>
          </div>
          <input
            type="range"
            min="0"
            max="23"
            value={state.input.loginHour}
            onChange={(e) => handleChange('loginHour', Number(e.target.value))}
            className="w-full h-2 bg-[#1a2540] rounded-full appearance-none cursor-pointer accent-blue-500"
          />
        </div>

        {state.input.useCase === 'loan' && (
          <>
            <div>
              <label className="block mb-2.5 text-xs uppercase tracking-wider text-slate-400 font-semibold">Loan Amount (₹)</label>
              <input
                type="number"
                value={state.input.loanAmount || ''}
                onChange={(e) => handleChange('loanAmount', Number(e.target.value))}
                className="w-full rounded-lg border border-[#1e293b] bg-[#0d1424] px-3.5 py-2.5 text-sm text-white outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                min="0"
              />
            </div>
            <div>
              <label className="block mb-2.5 text-xs uppercase tracking-wider text-slate-400 font-semibold">EMI (₹)</label>
              <input
                type="number"
                value={state.input.emi || ''}
                onChange={(e) => handleChange('emi', Number(e.target.value))}
                className="w-full rounded-lg border border-[#1e293b] bg-[#0d1424] px-3.5 py-2.5 text-sm text-white outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                min="0"
              />
            </div>
          </>
        )}
      </div>

      <button
        onClick={handleSubmit}
        className="w-full rounded-lg bg-blue-600 hover:bg-blue-500 px-4 py-3 text-sm font-semibold text-white transition shadow-lg shadow-blue-900/40 active:shadow-md"
      >
        Analyze Trust →
      </button>
    </div>
  );
};

export default InputPanel;