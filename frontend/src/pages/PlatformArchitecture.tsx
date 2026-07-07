import React, { useState } from 'react';
import {
  GitMerge,
  Search,
  Brain,
  ShieldAlert,
  Gavel,
  Gauge,
  DownloadCloud,
  Network,
  Shield,
  BarChart3,
  Lightbulb,
  FileText,
  CloudLightning,
  GitBranch,
  Share2
} from 'lucide-react';

export const PlatformArchitecture: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'frontend' | 'backend' | 'ai' | 'infra'>('all');

  const scrollToStep = (index: number) => {
    const step = document.getElementById(`step-${index}`);
    if (step) {
      step.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const techTiles = [
    {
      id: 'react',
      name: 'React v18',
      desc: 'Powers our real-time dashboard UI',
      category: 'frontend',
      logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAJmv19ibBOxO3Cb1-_H2Zp9QzC5RvRQpjFr3Ywrb2wAIti2q6pSHY62bcWrZ7o1GpwIhb2Fa3Ob7JvF37kzRNPC6-hO9-cBVwvuMXB5NkIOiftDyc_s5C19dTuJWPtqXAbE_7eqhxJAlyfU29g_rJQZyP-mfcXIZxbl5gyBfYhGyyqGdTPx8A7XFn6nI3S0fBHOapyKwzKsxPkhnr062ISWtCXibmaCi8wAHabATCtAqzbWr22-jrmo2Sns6vDBlnquoQZTqAN-GY',
      shadowColor: 'rgba(97, 218, 251, 0.2)',
      hoverBorder: '#61dafb'
    },
    {
      id: 'fastapi',
      name: 'FastAPI',
      desc: 'High-performance async agent logic',
      category: 'backend',
      logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBClY9bR-q15q9WhGevMr3aytukiFNhD3vmMH5SFqgdwzPD35q99pYJLSQhfl4IQkZ5WJh_XCPyV-x83--iYfHAS9IPpilsLzotSg60XxWwL5aev1dExJhnobALkqdDQQ9ZEPZiLRzfMlZRi6GhRsMOKnzRGbHax3evNdw3gWLI__EtNsgHVzxPzVdtvnw2Ykg--8AGQWuBfFAZkibJnNsw2BpoS_laR5MBpw-4RGS99QYdd4H05YZ2H0x0Y0uaBdjSChm3P0jDFA4',
      shadowColor: 'rgba(75, 139, 190, 0.2)',
      hoverBorder: '#4B8BBE'
    },
    {
      id: 'gemini',
      name: 'Gemini Ultra',
      desc: 'State-of-the-art LLM reasoning core',
      category: 'ai',
      logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCxGQM3dK_Ox4lS1QgeMBRS4jZIQeKwzpzeIrM18yPFvx1xDiy8cjBG0OuWe16TfLN2yEGDVhPeufCJXzkIHMIn38Udg-OGOoIOToJw2ZMGeP97faTqPg3TO8m79gsIqgTQf77Tl6s7NmsttVX9xKiDM2j3tnxthGJTxntrR39uyQ8vhPzudp42WmP8MhKI9ZNuqM26S-xJWiIgw7TY_QQmEi4fF6JM0dI2J6zOHqe55_b-1N0RcTnaEEmCeC27nW7qMzbyG-QvRTg',
      shadowColor: 'rgba(74, 225, 118, 0.2)',
      hoverBorder: '#4ae176'
    },
    {
      id: 'neo4j',
      name: 'Neo4j',
      desc: 'Complex relationship graph database',
      category: 'infra',
      logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDnx2TeOGnc4WFYpubEeRiri-Sr5YDt4X_5Y5iCScJ9Tp6JFpe7W5UNf0XbTcpdYRB-SaVY7qpBjNp2h4Rl4JPYtGiCvO3sF9k8bsCjvtt-Vihv3qrBoOrBFJidDJBt1z8BY2J848ukSoWGkE3DDEbNciEQ_JD2LMis0I3nThAtguB-37OFv0oZl0oVDEwH3D3qoE2A3_gYsUrUwL2y0_MAM7O9NFCocflmxQEyv1pep42BO6gEHHs9LV3sM66d3Y8XlrJFK8jvd3Y',
      shadowColor: 'rgba(255, 255, 255, 0.1)',
      hoverBorder: '#ffffff'
    }
  ];

  const filteredTiles = techTiles.filter(
    tile => activeFilter === 'all' || tile.category === activeFilter
  );

  return (
    <div className="w-full min-h-screen bg-[#0e0e0f] text-[#e5e2e3]">
      <main className="pl-16 pt-16 min-h-screen">
        
        {/* 1. Hero Section */}
        <section className="relative w-full h-[85vh] flex flex-col justify-center items-center text-center overflow-hidden px-grid-margin" id="hero">
          <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(75,226,119,0.1)_0%,transparent_70%)]"></div>
          </div>
          <div className="relative z-10 max-w-7xl">
            <div className="flex flex-col items-center mb-8">
              <span className="inline-block px-4 py-1 bg-primary/10 text-primary border border-primary/20 rounded-full font-label-mono text-label-mono mb-8 tracking-widest text-xs font-bold">
                NEXT-GEN FINANCIAL INTELLIGENCE
              </span>
            </div>
            <h1 className="font-display-hero text-6xl md:text-[144px] leading-none text-on-surface mb-8 tracking-tighter font-extrabold hero-title-glow">
              About <span className="text-primary relative inline-block">
                TrustShield AI
                <span className="absolute bottom-4 left-0 w-full h-[2px] bg-primary/50 shadow-[0_0_10px_#4be277]"></span>
              </span>
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-3xl mx-auto mb-16 leading-relaxed text-xl opacity-80 font-light">
              An autonomous enterprise intelligence core designed to predict, analyze, and neutralize banking fraud through high-fidelity signal reasoning and multi-agent synergy.
            </p>
            <div className="flex gap-stack-md justify-center">
              <a
                className="px-10 py-5 bg-primary text-on-primary font-bold rounded-lg hover:shadow-[0_0_30px_rgba(75,226,119,0.4)] hover:scale-105 active:scale-95 transition-all duration-300 text-sm"
                href="#architecture"
              >
                Explore Architecture
              </a>
              <a
                className="px-10 py-5 border border-outline-variant text-on-surface font-bold rounded-lg hover:bg-surface-variant/20 transition-all duration-300 text-sm"
                href="#"
              >
                Technical Whitepaper
              </a>
            </div>
          </div>
        </section>

        {/* 2. Platform Architecture Section */}
        <section className="relative w-full min-h-screen flex flex-col justify-center bg-surface-container-lowest/30 py-32 px-grid-margin border-y border-outline-variant/10" id="architecture">
          <div className="max-w-7xl mx-auto w-full">
            <h2 className="font-display-lg text-4xl md:text-display-lg mb-28 text-center font-extrabold">
              Neural Workflow <span className="text-primary-container">Architecture</span>
            </h2>
            <div className="relative flex flex-col md:flex-row justify-between items-center gap-12 py-20 px-10 min-h-[350px]">
              
              {/* Advanced Orchestrator Node (Center Core) */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 hidden md:block">
                <div className="relative w-48 h-48 flex items-center justify-center">
                  <div
                    className="absolute inset-0 rounded-full border border-primary/20"
                    style={{ animation: 'heartbeat 4s ease-in-out infinite' }}
                  ></div>
                  <div
                    className="absolute inset-[-20px] rounded-full border border-primary/10"
                    style={{ animation: 'heartbeat 4s ease-in-out infinite', animationDelay: '1s' }}
                  ></div>
                  <div
                    className="absolute inset-[-40px] rounded-full border-2 border-dashed border-primary/30"
                    style={{ animation: 'rotate-slow 20s linear infinite' }}
                  ></div>
                  <div className="w-32 h-32 bg-primary rounded-full flex items-center justify-center shadow-[0_0_60px_rgba(75,226,119,0.4)] relative z-30 group cursor-pointer">
                    <GitMerge className="text-on-primary w-14 h-14 group-hover:scale-110 transition-transform duration-500" />
                  </div>
                </div>
              </div>

              {/* Agent Nodes */}
              <div className="flex flex-col items-center gap-4 z-10 w-full md:w-48 group">
                <div className="w-20 h-20 glass-card rounded-2xl flex items-center justify-center text-primary-container group-hover:border-primary transition-all">
                  <Search className="w-10 h-10" />
                </div>
                <div className="text-center">
                  <h4 className="font-headline-md text-body-lg font-bold">Request</h4>
                  <p className="text-label-mono text-on-surface-variant text-xs">Data Entry</p>
                </div>
              </div>

              <div className="flex flex-col items-center gap-4 z-10 w-full md:w-48 group">
                <div className="w-24 h-24 glass-card rounded-full flex items-center justify-center text-secondary group-hover:scale-110 transition-all shadow-[0_0_20px_rgba(238,152,0,0.1)]">
                  <Brain className="w-12 h-12" />
                </div>
                <div className="text-center">
                  <h4 className="font-headline-md text-body-lg font-bold">Intelligence</h4>
                  <p className="text-label-mono text-on-surface-variant text-xs">Core Engine</p>
                </div>
              </div>

              <div className="w-48 hidden md:block"></div>

              <div className="flex flex-col items-center gap-4 z-10 w-full md:w-48 group">
                <div className="w-20 h-20 glass-card rounded-2xl flex items-center justify-center text-error group-hover:border-error transition-all">
                  <ShieldAlert className="w-10 h-10" />
                </div>
                <div className="text-center">
                  <h4 className="font-headline-md text-body-lg font-bold">Fraud Det.</h4>
                  <p className="text-label-mono text-on-surface-variant text-xs">Threat Eval</p>
                </div>
              </div>

              <div className="flex flex-col items-center gap-4 z-10 w-full md:w-48 group">
                <div className="w-24 h-24 bg-primary text-on-primary rounded-2xl flex items-center justify-center shadow-[0_0_40px_rgba(75,226,119,0.2)]">
                  <Gavel className="w-12 h-12" />
                </div>
                <div className="text-center">
                  <h4 className="font-headline-md text-body-lg font-bold">Decision</h4>
                  <p className="text-label-mono text-on-surface-variant text-xs">Execution</p>
                </div>
              </div>

              {/* Connecting flowing signals */}
              <div className="absolute inset-0 pointer-events-none hidden md:block">
                <div className="flow-dot" style={{ top: '50%', left: '10%', animationDelay: '0s' }}></div>
                <div className="flow-dot" style={{ top: '50%', left: '30%', animationDelay: '1s' }}></div>
                <div className="flow-dot" style={{ top: '50%', left: '70%', animationDelay: '2s' }}></div>
                <div className="flow-dot" style={{ top: '50%', left: '90%', animationDelay: '0.5s' }}></div>
              </div>

            </div>

            {/* Performance Insight Callout */}
            <div className="mt-32 max-w-4xl mx-auto border border-primary/30 bg-primary/5 rounded-2xl p-8 flex items-center gap-8 shadow-[0_0_30px_rgba(75,226,119,0.05)]">
              <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center flex-shrink-0 text-on-primary shadow-[0_0_15px_rgba(75,226,119,0.3)]">
                <Gauge className="w-7 h-7 text-on-primary" />
              </div>
              <div>
                <h5 className="text-primary font-label-mono text-xs uppercase tracking-widest mb-1 font-bold">
                  Performance Insight
                </h5>
                <p className="font-headline-md text-on-surface leading-tight font-medium text-lg">
                  Our system operates with a <span className="text-primary font-bold">sub-50ms latency</span> across global nodes, utilizing proprietary signal-path optimization to ensure data integrity.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* 3. Intelligence Journey Section */}
        <section className="w-full min-h-screen py-32 px-grid-margin" id="journey">
          <div className="max-w-7xl mx-auto">
            <h2 className="font-display-lg text-4xl md:text-display-lg mb-20 font-extrabold">
              The Intelligence <span className="text-primary-container">Journey</span>
            </h2>
            
            {/* Horizontal Stepper */}
            <div className="relative mb-24 px-12">
              <div className="absolute top-1/2 left-12 right-12 h-[1px] bg-outline-variant/30 -translate-y-1/2"></div>
              <div className="flex justify-between items-center relative z-10">
                <button
                  className="w-12 h-12 rounded-full glass-card border-primary/50 text-primary flex items-center justify-center hover:scale-125 transition-all group"
                  onClick={() => scrollToStep(1)}
                  title="Collect the Data"
                >
                  <DownloadCloud className="w-4 h-4" />
                </button>
                <button
                  className="w-12 h-12 rounded-full glass-card border-primary/50 text-primary flex items-center justify-center hover:scale-125 transition-all group"
                  onClick={() => scrollToStep(2)}
                  title="Map the Connections"
                >
                  <Network className="w-4 h-4" />
                </button>
                <button
                  className="w-12 h-12 rounded-full glass-card border-primary/50 text-primary flex items-center justify-center hover:scale-125 transition-all group"
                  onClick={() => scrollToStep(3)}
                  title="Think Like a Detective"
                >
                  <Brain className="w-4 h-4" />
                </button>
                <button
                  className="w-12 h-12 rounded-full glass-card border-primary/50 text-primary flex items-center justify-center hover:scale-125 transition-all group"
                  onClick={() => scrollToStep(4)}
                  title="Check for Fraud"
                >
                  <Shield className="w-4 h-4" />
                </button>
                <button
                  className="w-12 h-12 rounded-full glass-card border-primary/50 text-primary flex items-center justify-center hover:scale-125 transition-all group"
                  onClick={() => scrollToStep(5)}
                  title="Score the Risk"
                >
                  <BarChart3 className="w-4 h-4" />
                </button>
                <button
                  className="w-12 h-12 rounded-full glass-card border-primary/50 text-primary flex items-center justify-center hover:scale-125 transition-all group"
                  onClick={() => scrollToStep(6)}
                  title="Explain the Why"
                >
                  <Lightbulb className="w-4 h-4" />
                </button>
                <button
                  className="w-12 h-12 rounded-full glass-card border-primary/50 text-primary flex items-center justify-center hover:scale-125 transition-all group"
                  onClick={() => scrollToStep(7)}
                  title="Write the Report"
                >
                  <FileText className="w-4 h-4" />
                </button>
                <button
                  className="w-12 h-12 rounded-full bg-primary text-on-primary flex items-center justify-center hover:scale-125 transition-all group"
                  onClick={() => scrollToStep(8)}
                  title="Make the Call"
                >
                  <Gavel className="w-4 h-4 text-on-primary" />
                </button>
              </div>
            </div>

            {/* Visual Story Steps (Replicating exact steps 1, 2, 3, 8) */}
            <div className="space-y-40">
              
              <div className="flex flex-col md:flex-row items-center gap-20" id="step-1">
                <div className="w-full md:w-1/2">
                  <div className="text-label-mono text-primary mb-4 font-bold tracking-tighter text-xs">STEP 01</div>
                  <h3 className="font-headline-md text-3xl md:text-[44px] text-on-surface mb-6 font-bold">Collect the Data</h3>
                  <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed text-lg font-light">
                    We securely pull in transaction data and clean it up, removing anything private.
                  </p>
                </div>
                <div className="w-full md:w-1/2 glass-card h-96 rounded-3xl overflow-hidden relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent"></div>
                  <div className="flex items-center justify-center h-full">
                    <CloudLightning className="text-primary w-28 h-28 opacity-40 group-hover:scale-110 transition-transform duration-700" />
                  </div>
                </div>
              </div>

              <div className="flex flex-col md:flex-row-reverse items-center gap-20" id="step-2">
                <div className="w-full md:w-1/2">
                  <div className="text-label-mono text-primary mb-4 font-bold text-xs">STEP 02</div>
                  <h3 className="font-headline-md text-3xl md:text-[44px] text-on-surface mb-6 font-bold">Map the Connections</h3>
                  <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed text-lg font-light">
                    We connect the dots between accounts, people, and devices to spot hidden patterns.
                  </p>
                </div>
                <div className="w-full md:w-1/2 glass-card h-96 rounded-3xl overflow-hidden relative group">
                  <img
                    alt="Pattern mapping visualization"
                    className="w-full h-full object-cover opacity-50 group-hover:opacity-70 transition-opacity duration-700"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAAJCQc9sbZvbMA8WauYAXE0prNaVmWqRU26JS0Zj4PNGovcBO9gS-HrbmO4AdWMMGJxA7a2s2OXUY-HoIxDl5cf3jYxhFZ37FttC04_36b2qO1oDupvhxXOcFVQjihSc1UnBi2Y_0sd5-9FOzdN-mJoZY_FTCXFWm3rbPy8HJQeqppjHJSkB92b6sS9wjeDFQ_FiTD3kcNiOC8PlSfPC55m_VXGQd2pHAywl16gax2enT6Du5ZKAcDk6y-sttkVTq3LlSflYul3YM"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <GitBranch className="text-primary w-20 h-20 drop-shadow-[0_0_15px_#4be277]" />
                  </div>
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-center gap-20" id="step-3">
                <div className="w-full md:w-1/2">
                  <div className="text-label-mono text-primary mb-4 font-bold text-xs">STEP 03</div>
                  <h3 className="font-headline-md text-3xl md:text-[44px] text-on-surface mb-6 font-bold">Think Like a Detective</h3>
                  <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed text-lg font-light">
                    Our AI agents study the patterns and reason about what looks suspicious.
                  </p>
                </div>
                <div className="w-full md:w-1/2 glass-card h-96 rounded-3xl flex items-center justify-center relative overflow-hidden bg-primary/5 group">
                  <Brain className="text-primary w-32 h-32 animate-pulse" />
                </div>
              </div>

              <div className="flex flex-col md:flex-row-reverse items-center gap-20" id="step-8">
                <div className="w-full md:w-1/2">
                  <div className="text-label-mono text-primary mb-4 font-bold text-xs">STEP 08</div>
                  <h3 className="font-headline-md text-3xl md:text-[44px] text-on-surface mb-6 font-bold">Make the Call</h3>
                  <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed text-lg font-light">
                    The system approves, flags, or blocks — instantly.
                  </p>
                </div>
                <div className="w-full md:w-1/2 h-96 bg-primary rounded-3xl flex items-center justify-center shadow-[0_0_50px_rgba(75,226,119,0.2)]">
                  <Gavel className="text-on-primary w-36 h-36" />
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* 4. Interactive Tech Stack Section */}
        <section className="w-full py-48 px-grid-margin border-t border-outline-variant/10" id="tech-stack">
          <div className="max-w-7xl mx-auto">
            <h2 className="font-display-lg text-4xl md:text-display-lg mb-8 text-center font-extrabold">
              Engineered for <span className="text-primary-container">Scale</span>
            </h2>
            
            {/* Category Filter Bar */}
            <div className="flex justify-center gap-4 mb-20 flex-wrap">
              {(['all', 'frontend', 'backend', 'ai', 'infra'] as const).map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`px-6 py-2 rounded-full border text-[10px] uppercase tracking-widest font-label-mono font-bold transition-all ${
                    activeFilter === cat
                      ? 'border-primary bg-primary text-on-primary'
                      : 'border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary'
                  }`}
                >
                  {cat === 'all' ? 'All Tech' : cat}
                </button>
              ))}
            </div>

            {/* Filtered Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {filteredTiles.map(tile => (
                <div
                  key={tile.id}
                  className="tech-tile glass-card p-10 rounded-3xl flex flex-col items-center justify-center gap-6 transition-all duration-500 hover:-translate-y-4 hover:border-opacity-100 group cursor-pointer"
                  style={{
                    boxShadow: `0 0 0 transparent`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = `0 20px 50px ${tile.shadowColor}`;
                    e.currentTarget.style.borderColor = tile.hoverBorder;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.borderColor = 'rgba(134, 149, 133, 0.1)';
                  }}
                >
                  <div className="w-20 h-20 transition-transform duration-500 group-hover:scale-110 flex items-center justify-center">
                    <img
                      alt={tile.name}
                      className="w-full h-full object-contain filter invert opacity-85 group-hover:opacity-100"
                      src={tile.logo}
                    />
                  </div>
                  <div className="text-center">
                    <span className="block font-label-mono text-on-surface transition-colors font-bold text-sm">
                      {tile.name}
                    </span>
                    <span className="caption block text-[11px] text-on-surface-variant mt-2 max-w-[120px] font-light">
                      {tile.desc}
                    </span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* 5. Innovation Roadmap Section */}
        <section className="w-full min-h-screen py-32 px-grid-margin bg-gradient-to-b from-transparent to-surface-container-lowest" id="roadmap">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center mb-24 gap-6">
              <h2 className="font-display-lg text-4xl md:text-display-lg font-extrabold">
                Innovation <span className="text-primary-container">Roadmap</span>
              </h2>
              <div className="w-32 h-1 bg-primary/20 rounded-full">
                <div className="w-1/3 h-full bg-primary rounded-full"></div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              <div className="glass-card p-10 rounded-2xl hover:-translate-y-4 transition-all duration-500 border-t-2 border-t-outline-variant/30 flex flex-col justify-between min-h-[220px]">
                <div>
                  <div className="font-label-mono text-primary mb-6 uppercase tracking-widest text-[10px] font-bold">
                    Phase 01 • Q3 2024
                  </div>
                  <h3 className="font-headline-md text-xl font-bold mb-6">Global Ledger Sync</h3>
                  <p className="font-body-md text-on-surface-variant font-light text-sm mb-10 leading-normal">
                    Real-time cross-institutional ledger synchronization to prevent double-spend fraud.
                  </p>
                </div>
                <div className="flex items-center gap-2 text-on-surface-variant font-label-mono text-[10px] uppercase font-bold">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span> DEVELOPMENT
                </div>
              </div>

              <div className="glass-card p-10 rounded-2xl hover:-translate-y-4 transition-all duration-500 border-t-2 border-t-outline-variant/30 flex flex-col justify-between min-h-[220px]">
                <div>
                  <div className="font-label-mono text-primary mb-6 uppercase tracking-widest text-[10px] font-bold">
                    Phase 02 • Q1 2025
                  </div>
                  <h3 className="font-headline-md text-xl font-bold mb-6">Homomorphic AI</h3>
                  <p className="font-body-md text-on-surface-variant font-light text-sm mb-10 leading-normal">
                    Processing encrypted data without decryption for absolute privacy-preserving intelligence.
                  </p>
                </div>
                <div className="flex items-center gap-2 text-on-surface-variant font-label-mono text-[10px] uppercase font-bold">
                  <span className="w-2 h-2 rounded-full bg-secondary"></span> RESEARCH
                </div>
              </div>

              <div className="glass-card p-10 rounded-2xl hover:-translate-y-4 transition-all duration-500 border-t-2 border-t-outline-variant/30 flex flex-col justify-between min-h-[220px]">
                <div>
                  <div className="font-label-mono text-primary mb-6 uppercase tracking-widest text-[10px] font-bold">
                    Phase 03 • Q3 2025
                  </div>
                  <h3 className="font-headline-md text-xl font-bold mb-6">Autonomous Triage</h3>
                  <p className="font-body-md text-on-surface-variant font-light text-sm mb-10 leading-normal">
                    Fully decentralized fraud detection nodes that operate independently of a central core.
                  </p>
                </div>
                <div className="flex items-center gap-2 text-on-surface-variant font-label-mono text-[10px] uppercase font-bold">
                  <span className="w-2 h-2 rounded-full bg-surface-variant"></span> CONCEPT
                </div>
              </div>

            </div>
          </div>

          {/* Footer Integration */}
          <footer className="mt-48 text-center border-t border-outline-variant/10 pt-24 pb-12">
            <div className="mb-12 flex justify-center">
              <Shield className="text-primary opacity-50 w-16 h-16" />
            </div>
            <h2 className="font-display-lg text-4xl md:text-5xl font-extrabold mb-8 text-white">Secure Your Future.</h2>
            <button className="px-12 py-5 bg-primary text-on-primary font-bold rounded-lg hover:shadow-[0_0_30px_rgba(75,226,119,0.3)] hover:scale-105 transition-all mb-24 text-sm active:scale-95 duration-150">
              Partner with TrustShield
            </button>
            <div className="flex flex-col md:flex-row justify-between items-center px-4 font-label-mono text-[11px] text-on-surface-variant uppercase tracking-widest gap-6 font-semibold">
              <span>© 2024 TrustShield AI Enterprise</span>
              <div className="flex gap-8">
                <a className="hover:text-primary transition-colors" href="#">Privacy</a>
                <a className="hover:text-primary transition-colors" href="#">Security</a>
                <a className="hover:text-primary transition-colors" href="#">Legal</a>
              </div>
              <span>LOC: Silicon Valley Core</span>
            </div>
          </footer>
        </section>

      </main>

      {/* Floating Command Bar (Fixed Bottom) */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-full max-w-2xl px-4">
        <div className="glass-card rounded-full p-2 flex items-center gap-2 border border-primary/30 shadow-[0_0_30px_rgba(75,226,119,0.15)] bg-surface-container-lowest/95 backdrop-blur-xl">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-on-primary shrink-0 shadow-[0_0_15px_rgba(75,226,119,0.4)]">
            <span className="font-bold text-sm font-label-mono text-on-primary">⚡</span>
          </div>
          <input
            className="bg-transparent border-none focus:ring-0 flex-1 text-on-surface placeholder:text-on-surface-variant/50 font-body-md px-2 outline-none text-sm"
            placeholder="Ask AI about architecture..."
            type="text"
          />
          <button className="px-6 py-2 bg-surface-variant text-on-surface font-semibold rounded-full hover:bg-primary hover:text-on-primary transition-all active:scale-95 text-xs">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};
