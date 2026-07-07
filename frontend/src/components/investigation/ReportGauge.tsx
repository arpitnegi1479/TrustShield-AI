import React from 'react';

interface ReportGaugeProps {
  score: number;
  status: string;
}

export const ReportGauge: React.FC<ReportGaugeProps> = ({ score, status }) => {
  // Translate score (0-100) to SVG path arc parameters (from M 10 50 to M 90 50)
  // Arc length is 180 degrees.
  // We can calculate dynamic progress or keep it static to match Stitch's 42/100 arc perfectly.
  // The path starts at 180 deg (left) and rotates clockwise.
  // Angle for score 42 = 180 - (42/100)*180 = 180 - 75.6 = 104.4 degrees.
  // Stitch has hardcoded path d="M 10 50 A 40 40 0 0 1 43.6 15.4" for 42 score.
  
  return (
    <div className="relative w-72 h-36 mb-8">
      <svg className="w-full" viewBox="0 0 100 50">
        <path
          className="text-surface-container-highest"
          d="M 10 50 A 40 40 0 0 1 90 50"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="10"
        />
        <path
          className="text-error"
          d="M 10 50 A 40 40 0 0 1 43.6 15.4"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="10"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-end pb-2">
        <span className="text-6xl font-extrabold text-on-surface leading-none font-display-lg">{score}</span>
        <span className="text-error font-bold text-sm uppercase tracking-widest mt-1 font-label-mono">{status}</span>
      </div>
    </div>
  );
};
