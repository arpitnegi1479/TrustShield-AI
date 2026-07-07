import React from 'react';
import { Shield, Zap, BarChart3, MessageSquare } from 'lucide-react';

const PlatformHero: React.FC = () => {
    return (
        <section className="w-full px-6 md:px-8 py-12 md:py-16 border-b border-[#1a2540]" style={{
            background: `radial-gradient(circle at top left, rgba(15, 37, 71, 0.4), transparent 40%),
        linear-gradient(180deg, rgba(13, 20, 36, 0.8) 0%, #080d19 100%),
        linear-gradient(90deg, transparent 0%, rgba(59, 130, 246, 0.02) 50%, transparent 100%)`
        }}>
            <div className="max-w-7xl mx-auto">
                {/* Grid: 60% left, 40% right on desktop */}
                <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-12 lg:gap-16">
                    {/* LEFT COLUMN */}
                    <div>
                        <p className="text-xs uppercase tracking-[0.15em] text-blue-500 font-semibold">Trust Intelligence Platform</p>
                        <h1 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight text-white">
                            Financial trust, decided in milliseconds.
                        </h1>
                        <p className="mt-6 text-base text-slate-400 leading-relaxed max-w-xl">
                            FinShield's AI engine evaluates behavioral signals, network risk, and transaction patterns to make real-time credit and fraud decisions that protect your business.
                        </p>

                        {/* STATS ROW */}
                        <div className="mt-10 grid grid-cols-3 gap-6 py-8 border-y border-[#1a2540]">
                            <div>
                                <p className="text-2xl md:text-3xl font-bold text-white stat-number">2.4M+</p>
                                <p className="mt-2 text-xs text-slate-500 uppercase tracking-wider">Transactions Analyzed</p>
                            </div>
                            <div>
                                <p className="text-2xl md:text-3xl font-bold text-white stat-number">99.3%</p>
                                <p className="mt-2 text-xs text-slate-500 uppercase tracking-wider">Accuracy Rate</p>
                            </div>
                            <div>
                                <p className="text-2xl md:text-3xl font-bold text-white stat-number">&lt;800ms</p>
                                <p className="mt-2 text-xs text-slate-500 uppercase tracking-wider">Decision Time</p>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Capability Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Card 1: Fraud Detection */}
                        <div className="card group hover:shadow-lg hover:shadow-blue-900/20 transition-all">
                            <div className="flex items-start gap-3">
                                <div className="p-2 rounded-lg bg-red-500/10 text-red-400">
                                    <Shield size={20} />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-white text-sm">Fraud Detection</h4>
                                    <p className="mt-1 text-xs text-slate-500">Real-time network collusion scanning</p>
                                </div>
                            </div>
                        </div>

                        {/* Card 2: AI Agents */}
                        <div className="card group hover:shadow-lg hover:shadow-blue-900/20 transition-all">
                            <div className="flex items-start gap-3">
                                <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                                    <Zap size={20} />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-white text-sm">AI Agents</h4>
                                    <p className="mt-1 text-xs text-slate-500">4 modular agents in parallel</p>
                                </div>
                            </div>
                        </div>

                        {/* Card 3: Explainability */}
                        <div className="card group hover:shadow-lg hover:shadow-blue-900/20 transition-all">
                            <div className="flex items-start gap-3">
                                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                                    <BarChart3 size={20} />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-white text-sm">Explainability</h4>
                                    <p className="mt-1 text-xs text-slate-500">Every decision fully explained</p>
                                </div>
                            </div>
                        </div>

                        {/* Card 4: Negotiation */}
                        <div className="card group hover:shadow-lg hover:shadow-blue-900/20 transition-all">
                            <div className="flex items-start gap-3">
                                <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
                                    <MessageSquare size={20} />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-white text-sm">Negotiation</h4>
                                    <p className="mt-1 text-xs text-slate-500">Adjust & rescore live</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* BOTTOM DIVIDER */}
                <div className="mt-12 flex items-center justify-center gap-4">
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#1e293b] to-transparent"></div>
                    <p className="text-xs text-slate-600 uppercase tracking-wider">Live Analysis Module Below</p>
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#1e293b] to-transparent"></div>
                </div>
            </div>
        </section>
    );
};

export default PlatformHero;
