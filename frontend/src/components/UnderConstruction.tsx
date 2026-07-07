import React from 'react';
import { useLocation } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';

export const UnderConstruction: React.FC = () => {
  const location = useLocation();

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] p-8 text-center bg-[#050505] obsidian-texture">
      <div className="glass-card max-w-lg p-12 rounded-[2rem] border-primary/20 shadow-glow relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/50 via-primary to-primary/50" />
        
        <AlertCircle className="w-16 h-16 text-primary mb-8 mx-auto animate-pulse" />
        
        <h2 className="font-display-lg text-4xl text-white mb-4 uppercase tracking-tighter font-extrabold">
          Section Under Construction
        </h2>
        
        <p className="font-body-md text-[#c4c7c7] mb-8 font-light leading-relaxed">
          The module for path <code className="font-label-mono text-primary bg-primary/10 px-2 py-1 rounded text-sm">{location.pathname}</code> is currently active on our product roadmap but is not fully generated yet.
        </p>

        <div className="font-label-mono text-[10px] text-white/30 uppercase tracking-[0.2em] border-t border-white/5 pt-6">
          System Ready • Platform v4.2
        </div>
      </div>
    </div>
  );
};
