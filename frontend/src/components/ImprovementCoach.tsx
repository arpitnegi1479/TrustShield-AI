import React from 'react';
import { Decision } from '../types';
import { Lightbulb, TrendingUp } from 'lucide-react';

interface ImprovementCoachProps {
  improvements: string[];
  decision: Decision;
}

const ImprovementCoach: React.FC<ImprovementCoachProps> = ({ improvements, decision }) => {
  if (decision === 'APPROVE') return null;

  return (
    <div className="card space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Lightbulb size={20} className="text-amber-400" />
            <p className="text-xs uppercase tracking-widest text-slate-500 font-semibold">Recommendations</p>
          </div>
          <h3 className="mt-2 text-xl font-bold text-white">Recommended Actions</h3>
          <p className="mt-1 text-sm text-slate-400">Steps to improve your trust score</p>
        </div>
      </div>

      {/* Actions List */}
      <div className="space-y-3">
        {improvements.map((imp, index) => {
          const urgency = index === 0 ? 'urgent' : index === 1 ? 'moderate' : 'low';
          const colors =
            urgency === 'urgent'
              ? 'border-l-red-500 bg-red-500/5'
              : urgency === 'moderate'
                ? 'border-l-amber-500 bg-amber-500/5'
                : 'border-l-blue-500 bg-blue-500/5';

          return (
            <div
              key={index}
              className={`rounded-lg border border-[#1a2540] ${colors} p-4 flex items-start gap-3 transition hover:border-white/10`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex-shrink-0 mt-1">
                <div className="flex items-center justify-center h-6 w-6 rounded-full bg-white/10 text-sm font-bold text-white">
                  {index + 1}
                </div>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">{imp}</p>
            </div>
          );
        })}
      </div>

      {/* Score Impact Estimate */}
      <div className="p-3 rounded-lg bg-green-500/5 border border-green-500/30 flex items-center gap-2">
        <TrendingUp size={16} className="text-green-400" />
        <p className="text-xs text-green-300">
          Following these recommendations could improve your score by <span className="font-semibold">+8–12 points</span>
        </p>
      </div>
    </div>
  );
};

export default ImprovementCoach;