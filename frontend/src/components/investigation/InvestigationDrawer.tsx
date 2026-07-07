import React from 'react';
import { X } from 'lucide-react';
import type { InvestigationNodeDetails } from './types';

interface InvestigationDrawerProps {
    node: InvestigationNodeDetails;
    onClose: () => void;
}

export const InvestigationDrawer: React.FC<InvestigationDrawerProps> = ({ node, onClose }) => {
    return (
        <div className="fixed right-6 top-24 z-[80] w-[360px] rounded-[1.5rem] border border-white/10 bg-[#111111]/95 p-6 shadow-[0_30px_80px_rgba(0,0,0,0.5)] backdrop-blur-xl">
            <div className="flex items-start justify-between">
                <div>
                    <p className="font-label-mono text-[10px] uppercase tracking-[0.3em] text-on-surface-variant/60">Relationship detail</p>
                    <h3 className="mt-2 font-display-lg text-xl font-bold text-white">{node.name}</h3>
                </div>
                <button onClick={onClose} className="rounded-full p-2 text-on-surface-variant hover:bg-white/5 hover:text-white">
                    <X className="h-4 w-4" />
                </button>
            </div>
            <div className="mt-6 grid gap-3 text-sm">
                <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-4">
                    <p className="text-[10px] uppercase tracking-[0.25em] text-on-surface-variant/60">Trust Score</p>
                    <p className="mt-2 text-lg font-semibold text-white">{node.score}</p>
                </div>
                <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-4">
                    <p className="text-[10px] uppercase tracking-[0.25em] text-on-surface-variant/60">Risk Level</p>
                    <p className="mt-2 text-sm font-semibold text-white">{node.risk}</p>
                </div>
                <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-4">
                    <p className="text-[10px] uppercase tracking-[0.25em] text-on-surface-variant/60">Relation Type</p>
                    <p className="mt-2 text-sm font-semibold text-white">{node.rel}</p>
                </div>
                <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-4">
                    <p className="text-[10px] uppercase tracking-[0.25em] text-on-surface-variant/60">Signal Note</p>
                    <p className="mt-2 text-sm leading-7 text-on-surface-variant">{node.history}</p>
                </div>
            </div>
        </div>
    );
};
