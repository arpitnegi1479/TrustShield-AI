import React from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import { TrustAnalysisResult } from '../types';
import { Network } from 'lucide-react';

interface CollusionGraphProps {
  graph: TrustAnalysisResult['collusionGraph'];
  userId: string;
}

const CollusionGraph: React.FC<CollusionGraphProps> = ({ graph, userId }) => {
  const highRiskCount = graph.nodes.filter(n => n.risk === 'high').length;

  return (
    <div className="card space-y-4">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Network size={20} className="text-blue-400" />
            <p className="text-xs uppercase tracking-widest text-slate-500 font-semibold">Network Analysis</p>
          </div>
          <h3 className="mt-2 text-xl font-bold text-white">Risk Map</h3>
          <p className="mt-1 text-sm text-slate-400">Account relationships and collusion patterns</p>
        </div>
        {highRiskCount > 0 && (
          <div className="px-3 py-1.5 rounded-lg bg-red-500/10 text-red-400 text-xs font-semibold">
            {highRiskCount} High Risk
          </div>
        )}
      </div>

      {/* Graph Container */}
      <div className="relative overflow-hidden rounded-xl border border-[#1a2540] bg-gradient-to-b from-[#0d1424] to-[#080d19]" style={{ minHeight: '360px' }}>
        <ForceGraph2D
          graphData={graph}
          nodeLabel={(node) => `${node.label} (${node.risk})`}
          nodeColor={(node) => {
            if (node.risk === 'low') return '#10b981';
            if (node.risk === 'medium') return '#f59e0b';
            return '#ef4444';
          }}
          nodeVal={(node) => (node.id === userId ? 10 : 5)}
          linkColor={(link) => (link.strength > 0.6 ? '#ef4444' : '#64748b')}
          linkWidth={(link) => Math.max(1, link.strength * 4)}
          style={{ width: '100%', height: '360px' }}
        />
      </div>

      {/* Legend */}
      <div className="grid grid-cols-3 gap-2 text-xs">
        <div className="flex items-center gap-2 p-2 rounded-lg bg-[#0d1424] border border-[#1a2540]">
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
          <span className="text-slate-400">Low Risk</span>
        </div>
        <div className="flex items-center gap-2 p-2 rounded-lg bg-[#0d1424] border border-[#1a2540]">
          <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
          <span className="text-slate-400">Medium</span>
        </div>
        <div className="flex items-center gap-2 p-2 rounded-lg bg-[#0d1424] border border-[#1a2540]">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
          <span className="text-slate-400">High Risk</span>
        </div>
      </div>
    </div>
  );
};

export default CollusionGraph;