import React from 'react';
import type { InvestigationNode } from './types';

interface InvestigationGraphProps {
    nodes: InvestigationNode[];
    centerX: number;
    centerY: number;
    width: number;
    height: number;
    onSelectNode: (node: InvestigationNode) => void;
    activeId?: string;
}

export const InvestigationGraph: React.FC<InvestigationGraphProps> = ({
    nodes,
    centerX,
    centerY,
    width,
    height,
    onSelectNode,
    activeId,
}) => {
    const radius = 170;
    const count = Math.max(nodes.length - 1, 1);

    const mappedNodes = nodes.map((node, index) => {
        if (node.id === activeId) {
            return { ...node, x: centerX, y: centerY, isCenter: true };
        }

        const angle = ((index - 1) / count) * 2 * Math.PI;
        return {
            ...node,
            x: centerX + radius * Math.cos(angle),
            y: centerY + radius * Math.sin(angle),
            isCenter: false,
        };
    });

    return (
        <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} className="overflow-visible">
            <g>
                {mappedNodes.map((node) => {
                    if (node.isCenter) {
                        return null;
                    }
                    return (
                        <line
                            key={`line-${node.id}`}
                            x1={centerX}
                            y1={centerY}
                            x2={node.x}
                            y2={node.y}
                            stroke={node.risk === 'high' ? '#f43f5e' : node.risk === 'medium' ? '#ffb95f' : '#22c55e'}
                            strokeOpacity="0.22"
                            strokeWidth="1.5"
                        />
                    );
                })}
            </g>

            <circle cx={centerX} cy={centerY} r="46" fill="rgba(34,197,94,0.12)" stroke="rgba(34,197,94,0.5)" strokeWidth="2" />
            <text x={centerX} y={centerY - 6} textAnchor="middle" className="fill-white text-[12px] font-semibold">
                Investigation
            </text>
            <text x={centerX} y={centerY + 16} textAnchor="middle" className="fill-[#9ca3af] text-[10px]">
                Primary subject
            </text>

            {mappedNodes.map((node) => {
                if (node.isCenter) {
                    return null;
                }
                return (
                    <g key={node.id} onClick={() => onSelectNode(node)} className="cursor-pointer">
                        <circle cx={node.x} cy={node.y} r="22" fill="rgba(255,255,255,0.06)" stroke={node.risk === 'high' ? '#f43f5e' : node.risk === 'medium' ? '#ffb95f' : '#22c55e'} strokeWidth="1.5" />
                        <circle cx={node.x} cy={node.y} r="10" fill={node.risk === 'high' ? '#f43f5e' : node.risk === 'medium' ? '#ffb95f' : '#22c55e'} />
                        <text x={node.x} y={node.y + 38} textAnchor="middle" className="fill-[#cbd5e1] text-[10px]">
                            {node.label}
                        </text>
                    </g>
                );
            })}
        </svg>
    );
};
