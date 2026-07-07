import React from 'react';
import type { InvestigationTimelineItem } from './types';

interface InvestigationTimelineProps {
    items: InvestigationTimelineItem[];
}

export const InvestigationTimeline: React.FC<InvestigationTimelineProps> = ({ items }) => {
    return (
        <div className="mt-6 space-y-4">
            {items.map((item) => {
                const Icon = item.icon;
                return (
                    <div key={item.title} className="flex gap-3 rounded-2xl border border-white/5 bg-white/[0.03] p-4">
                        <div className="mt-0.5 rounded-full border border-primary/20 bg-primary/10 p-2 text-primary">
                            <Icon className="h-4 w-4" />
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-white">{item.title}</p>
                            <p className="mt-1 text-sm text-on-surface-variant">{item.meta}</p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
