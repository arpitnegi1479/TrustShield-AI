import React, { useEffect, useState } from 'react';
import { Decision } from '../types';

interface TrustGaugeProps {
  score: number;
  decision: Decision;
  loading: boolean;
}

const TrustGauge: React.FC<TrustGaugeProps> = ({ score, decision, loading }) => {
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    if (!loading) {
      const duration = 1200;
      const steps = 60;
      const increment = score / steps;
      let current = 0;
      const timer = setInterval(() => {
        current += increment;
        if (current >= score) {
          setAnimatedScore(score);
          clearInterval(timer);
        } else {
          setAnimatedScore(current);
        }
      }, duration / steps);
      return () => clearInterval(timer);
    }
  }, [score, loading]);

  const radius = 80;
  const endAngle = (animatedScore / 100) * Math.PI;
  const endX = 100 + radius * Math.cos(Math.PI - endAngle);
  const endY = 100 - radius * Math.sin(Math.PI - endAngle);

  const color = score >= 80 ? '#10b981' : score >= 50 ? '#f59e0b' : '#ef4444';
  const riskLevel = score >= 80 ? 'LOW RISK' : score >= 50 ? 'MODERATE' : 'HIGH RISK';
  const bgColor = score >= 80 ? 'bg-emerald-500/10 text-emerald-400' : score >= 50 ? 'bg-amber-500/10 text-amber-400' : 'bg-red-500/10 text-red-400';

  return (
    <div className="card space-y-6">
      <div>
        <p className="text-xs uppercase tracking-widest text-slate-500 font-semibold">Trust Score</p>
        <div className="mt-3 flex items-start justify-between">
          <h3 className="text-2xl font-bold text-white">Confidence Metric</h3>
          <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${bgColor}`}>
            {riskLevel}
          </span>
        </div>
      </div>

      {/* Gauge SVG */}
      <div className="flex justify-center py-2">
        <svg width="220" height="140" className={decision === 'FLAG' ? 'animate-pulse' : ''}>
          <defs>
            <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="50%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#ef4444" />
            </linearGradient>
          </defs>
          <path d="M 20 120 A 90 90 0 0 1 200 120" fill="none" stroke="#1a2540" strokeWidth="14" />
          <path d={`M 20 120 A 90 90 0 0 1 ${endX} ${endY}`} fill="none" stroke="url(#gaugeGradient)" strokeWidth="14" strokeLinecap="round" />
        </svg>
      </div>

      {/* Score Display */}
      <div className="flex items-center justify-center gap-1">
        <span className="text-5xl font-bold text-white stat-number">{Math.round(animatedScore)}</span>
        <span className="text-slate-500 text-sm font-medium">/100</span>
      </div>

      {/* Risk Zones Indicator */}
      <div className="flex items-center justify-between gap-2 text-xs px-2 py-3 rounded-lg bg-[#0d1424]">
        <div className="text-center flex-1">
          <span className="text-red-400 font-semibold">FLAG</span>
          <p className="text-slate-500">0–49</p>
        </div>
        <div className="w-px h-6 bg-[#1a2540]"></div>
        <div className="text-center flex-1">
          <span className="text-amber-400 font-semibold">VERIFY</span>
          <p className="text-slate-500">50–79</p>
        </div>
        <div className="w-px h-6 bg-[#1a2540]"></div>
        <div className="text-center flex-1">
          <span className="text-emerald-400 font-semibold">APPROVE</span>
          <p className="text-slate-500">80–100</p>
        </div>
      </div>

      <p className="text-xs text-slate-400 leading-relaxed text-center">
        Score computed from intent prediction, network risk, history decay, and transaction anomaly detection.
      </p>
    </div>
  );
};

export default TrustGauge;