import React from 'react';

interface InvestigationEvidenceProps {
    items: string[];
}

export const InvestigationEvidence: React.FC<InvestigationEvidenceProps> = ({ items }) => {
    return (
        <div className="mt-6 space-y-3">
            {items.map((reason, index) => (
                <div key={reason} className="rounded-2xl border border-white/5 bg-white/[0.03] p-4">
                    <div className="flex items-center gap-3">
                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                            {index + 1}
                        </span>
                        <p className="text-sm text-on-surface-variant">{reason}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};
