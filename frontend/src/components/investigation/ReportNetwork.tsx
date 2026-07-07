import React from 'react';
import { User, Building2 } from 'lucide-react';

export const ReportNetwork: React.FC = () => {
  return (
    <div className="flex-1 flex items-center justify-center relative min-h-[250px]">
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Outer Orbit */}
        <div
          className="absolute w-80 h-80 border border-outline-variant/10 rounded-full opacity-10"
          style={{ animation: 'spin 20s linear infinite' }}
        ></div>
        {/* Inner Orbit */}
        <div
          className="absolute w-56 h-56 border border-outline-variant/10 rounded-full opacity-20"
          style={{ animation: 'spin 12s linear infinite' }}
        ></div>
        
        {/* Center Node */}
        <div className="absolute w-14 h-14 bg-surface-container-highest rounded-full border-2 border-primary flex items-center justify-center z-10 shadow-[0_0_20px_rgba(75,226,119,0.2)]">
          <User className="text-primary w-6 h-6" />
        </div>

        {/* Connection Lines */}
        <div
          className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-error/50 to-transparent"
          style={{ transform: 'rotate(45deg)' }}
        ></div>
        <div
          className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-secondary/50 to-transparent"
          style={{ transform: 'rotate(160deg)' }}
        ></div>
        <div
          className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent"
          style={{ transform: 'rotate(280deg)' }}
        ></div>

        {/* Risk Nodes */}
        <div
          className="absolute w-6 h-6 bg-error rounded-full ring-4 ring-error/20 flex items-center justify-center pulse-node"
          style={{ top: '3rem', right: '4rem' }}
        >
          <Building2 className="text-white w-3 h-3" />
        </div>
        <div
          className="absolute w-5 h-5 bg-secondary rounded-full ring-2 ring-secondary/20 flex items-center justify-center"
          style={{ bottom: '4rem', left: '2rem' }}
        >
          <User className="text-white w-2.5 h-2.5" />
        </div>
        <div
          className="absolute w-4 h-4 bg-primary rounded-full flex items-center justify-center"
          style={{ top: '6rem', left: '12rem' }}
        >
          <User className="text-white w-2 h-2" />
        </div>
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 flex flex-wrap gap-4 text-[10px] font-label-mono uppercase bg-surface-container-lowest/80 p-3 rounded-lg border border-outline-variant/10">
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-primary"></span> Trusted
        </div>
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-secondary"></span> Medium Risk
        </div>
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-error"></span> High Risk
        </div>
      </div>
    </div>
  );
};
