import React, { useState, useEffect } from 'react';
import {
  Cloud,
  Activity,
  Heart,
  Terminal,
  ShieldAlert,
  ShieldCheck,
  CheckCircle,
  FileCheck,
  Eye,
  Lock,
  Database,
  Grid,
  Users,
  Building,
  Gauge
} from 'lucide-react';


interface FeedItem {
  time: string;
  msg: string;
  type: 'primary' | 'secondary' | 'on-surface-variant';
}

export const Settings: React.FC = () => {
  const [command, setCommand] = useState<string>('');
  
  // Local state for Activity Feed entries
  const [feed, setFeed] = useState<FeedItem[]>([
    { time: '14:22:01', msg: 'System health check completed. All engines nominal.', type: 'primary' },
    { time: '14:15:30', msg: 'Database sync: 1,200 new transaction hashes indexed.', type: 'secondary' },
    { time: '13:58:12', msg: 'New Risk Officer role assigned to user @JDoe.', type: 'on-surface-variant' },
    { time: '13:45:00', msg: 'Fraud Detection Engine v4.2.1-patch hot-reloaded successfully.', type: 'primary' },
    { time: '13:30:22', msg: 'Auto-backup of governance logs completed to vault.S3.', type: 'on-surface-variant' }
  ]);

  // Periodic timeline feed simulator matching Stitch JS script
  useEffect(() => {
    const feedItems = [
      { time: '14:25:12', msg: 'Neural cache refreshed for Region ap-south-1.', type: 'primary' as const },
      { time: '14:26:45', msg: 'MFA challenge passed for session #8821.', type: 'on-surface-variant' as const },
      { time: '14:28:10', msg: 'Live transaction audit streaming active.', type: 'secondary' as const }
    ];
    let itemIndex = 0;

    const interval = setInterval(() => {
      const item = feedItems[itemIndex];
      setFeed(prev => [
        { time: item.time, msg: item.msg, type: item.type },
        ...prev.slice(0, 19) // Cap timeline list size
      ]);
      itemIndex = (itemIndex + 1) % feedItems.length;
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!command.trim()) return;
    
    // Append manually executed command log
    const now = new Date();
    const timeStr = now.toTimeString().split(' ')[0];
    setFeed(prev => [
      { time: timeStr, msg: `Console command executed: "${command}"`, type: 'primary' },
      ...prev
    ]);
    setCommand('');
  };

  return (
    <div className="w-full min-h-screen bg-[#0e0e0f] text-[#e5e2e3]">
      
      {/* Injecting Stitch keyframe declarations */}
      <style>{`
        .ecg-wave {
          height: 20px;
          width: 60px;
          stroke: #4be277;
          stroke-width: 2;
          fill: none;
          stroke-dasharray: 200;
          animation: dash 3s linear infinite;
        }
        @keyframes dash {
          from { stroke-dashoffset: 200; }
          to { stroke-dashoffset: 0; }
        }
      `}</style>

      <main className="flex-grow p-grid-margin max-w-[1600px] mx-auto w-full space-y-stack-lg pb-32">
        
        {/* HEADER SECTION */}
        <section className="flex flex-col md:flex-row md:items-end justify-between gap-stack-md pt-8 border-b border-outline-variant/10 pb-6">
          <div>
            <h1 className="font-display-lg text-5xl md:text-display-lg text-on-surface tracking-tight font-extrabold">
              Enterprise Control Center
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant mt-2 font-light">
              Configure, monitor and govern TrustShield AI across your banking organization.
            </p>
          </div>
          <div className="flex items-center bg-surface-container-highest/50 border border-outline-variant/20 px-4 py-2 rounded-xl">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse mr-3 shadow-[0_0_8px_#4be277]"></span>
            <span className="font-label-mono text-xs uppercase tracking-widest text-primary font-bold">
              Operational
            </span>
          </div>
        </section>

        {/* SECTION 1: PLATFORM STATUS OVERVIEW */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-grid-gutter">
          
          <div className="glass-card p-6 rounded-xl flex flex-col justify-between h-36">
            <div className="flex justify-between items-start">
              <span className="text-on-surface-variant font-label-mono text-xs tracking-wider font-bold">AI SERVICES</span>
              <Cloud className="text-primary w-5 h-5" />
            </div>
            <div className="mt-4">
              <div className="text-2xl font-bold text-on-surface font-display-lg">ONLINE</div>
              <div className="text-primary text-[10px] font-label-mono flex items-center mt-1 font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mr-1.5 animate-pulse"></span> All nodes active
              </div>
            </div>
          </div>

          <div className="glass-card p-6 rounded-xl flex flex-col justify-between h-36">
            <div className="flex justify-between items-start">
              <span className="text-on-surface-variant font-label-mono text-xs tracking-wider font-bold">INVESTIGATIONS</span>
              <Activity className="text-secondary w-5 h-5" />
            </div>
            <div className="mt-4">
              <div className="text-2xl font-bold text-on-surface font-display-lg">1,248</div>
              <div className="text-secondary text-[10px] font-label-mono flex items-center mt-1 font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary mr-1.5 animate-pulse"></span> +12% from yesterday
              </div>
            </div>
          </div>

          <div className="glass-card p-6 rounded-xl flex flex-col justify-between h-36">
            <div className="flex justify-between items-start">
              <span className="text-on-surface-variant font-label-mono text-xs tracking-wider font-bold">SYSTEM HEALTH</span>
              <Heart className="text-primary w-5 h-5" />
            </div>
            <div className="mt-4">
              <div className="text-2xl font-bold text-on-surface font-display-lg">99.9%</div>
              <div className="text-on-surface-variant text-[10px] font-label-mono flex items-center mt-1">
                <span className="w-1.5 h-1.5 rounded-full bg-on-surface-variant mr-1.5"></span> 0ms latency drift
              </div>
            </div>
          </div>

          <div className="glass-card p-6 rounded-xl flex flex-col justify-between h-36">
            <div className="flex justify-between items-start">
              <span className="text-on-surface-variant font-label-mono text-xs tracking-wider font-bold">VERSION</span>
              <Terminal className="text-on-surface-variant w-5 h-5" />
            </div>
            <div className="mt-4">
              <div className="text-2xl font-bold text-on-surface font-display-lg">v4.2.0</div>
              <div className="text-on-surface-variant text-[10px] font-label-mono flex items-center mt-1 uppercase font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-outline mr-1.5"></span> LATEST RELEASE
              </div>
            </div>
          </div>

        </section>

        {/* SECTION 2: AI ENGINE HEALTH */}
        <section className="space-y-stack-md">
          <div className="flex items-center space-x-2">
            <Database className="text-primary w-5 h-5" />
            <h2 className="font-headline-md text-xl font-bold text-on-surface">AI Engine Core Health</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-grid-gutter">
            
            <div className="glass-card p-5 rounded-xl border-l-4 border-l-primary flex flex-col justify-between min-h-[150px]">
              <div className="flex justify-between items-center">
                <h3 className="font-body-lg font-bold text-sm">Fraud Detection Engine</h3>
                <svg className="ecg-wave" viewBox="0 0 60 20">
                  <polyline points="0,10 10,10 15,0 25,20 30,10 40,10 45,5 50,15 60,10" />
                </svg>
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-[10px] font-label-mono">
                  <span className="text-on-surface-variant">Status</span>
                  <span className="text-primary font-bold">HEALTHY / RUNNING</span>
                </div>
                <div className="flex justify-between text-[10px] font-label-mono">
                  <span className="text-on-surface-variant">Avg Response</span>
                  <span className="text-on-surface">42ms</span>
                </div>
                <div className="flex justify-between text-[10px] font-label-mono">
                  <span className="text-on-surface-variant">Last Sync</span>
                  <span className="text-on-surface">2 mins ago</span>
                </div>
              </div>
            </div>

            <div className="glass-card p-5 rounded-xl border-l-4 border-l-primary flex flex-col justify-between min-h-[150px]">
              <div className="flex justify-between items-center">
                <h3 className="font-body-lg font-bold text-sm">Trust Score Engine</h3>
                <svg className="ecg-wave" viewBox="0 0 60 20">
                  <polyline points="0,10 5,10 10,5 15,15 20,10 30,10 35,0 45,20 50,10 60,10" />
                </svg>
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-[10px] font-label-mono">
                  <span className="text-on-surface-variant">Status</span>
                  <span className="text-primary font-bold">HEALTHY / RUNNING</span>
                </div>
                <div className="flex justify-between text-[10px] font-label-mono">
                  <span className="text-on-surface-variant">Avg Response</span>
                  <span className="text-on-surface">18ms</span>
                </div>
                <div className="flex justify-between text-[10px] font-label-mono">
                  <span className="text-on-surface-variant">Last Sync</span>
                  <span className="text-on-surface">Just now</span>
                </div>
              </div>
            </div>

            <div className="glass-card p-5 rounded-xl border-l-4 border-l-primary flex flex-col justify-between min-h-[150px]">
              <div className="flex justify-between items-center">
                <h3 className="font-body-lg font-bold text-sm">Relationship Intelligence</h3>
                <svg className="ecg-wave" viewBox="0 0 60 20">
                  <polyline points="0,10 15,10 20,5 25,15 30,10 40,10 45,0 55,20 60,10" />
                </svg>
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-[10px] font-label-mono">
                  <span className="text-on-surface-variant">Status</span>
                  <span className="text-primary font-bold">HEALTHY / RUNNING</span>
                </div>
                <div className="flex justify-between text-[10px] font-label-mono">
                  <span className="text-on-surface-variant">Avg Response</span>
                  <span className="text-on-surface">65ms</span>
                </div>
                <div className="flex justify-between text-[10px] font-label-mono">
                  <span className="text-on-surface-variant">Last Sync</span>
                  <span className="text-on-surface">5 mins ago</span>
                </div>
              </div>
            </div>

            <div className="glass-card p-5 rounded-xl border-l-4 border-l-primary flex flex-col justify-between min-h-[150px]">
              <div className="flex justify-between items-center">
                <h3 className="font-body-lg font-bold text-sm">Customer Intelligence</h3>
                <svg className="ecg-wave" viewBox="0 0 60 20">
                  <polyline points="0,10 10,10 15,5 25,15 30,10 40,10 50,5 55,15 60,10" />
                </svg>
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-[10px] font-label-mono">
                  <span className="text-on-surface-variant">Status</span>
                  <span className="text-primary font-bold">HEALTHY / RUNNING</span>
                </div>
                <div className="flex justify-between text-[10px] font-label-mono">
                  <span className="text-on-surface-variant">Avg Response</span>
                  <span className="text-on-surface">32ms</span>
                </div>
                <div className="flex justify-between text-[10px] font-label-mono">
                  <span className="text-on-surface-variant">Last Sync</span>
                  <span className="text-on-surface">1 min ago</span>
                </div>
              </div>
            </div>

            <div className="glass-card p-5 rounded-xl border-l-4 border-l-primary flex flex-col justify-between min-h-[150px]">
              <div className="flex justify-between items-center">
                <h3 className="font-body-lg font-bold text-sm">AI Copilot</h3>
                <svg className="ecg-wave" viewBox="0 0 60 20">
                  <polyline points="0,10 5,10 15,0 25,20 35,10 45,10 50,5 55,15 60,10" />
                </svg>
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-[10px] font-label-mono">
                  <span className="text-on-surface-variant">Status</span>
                  <span className="text-primary font-bold">HEALTHY / RUNNING</span>
                </div>
                <div className="flex justify-between text-[10px] font-label-mono">
                  <span className="text-on-surface-variant">Avg Response</span>
                  <span className="text-on-surface">110ms</span>
                </div>
                <div className="flex justify-between text-[10px] font-label-mono">
                  <span className="text-on-surface-variant">Last Sync</span>
                  <span className="text-on-surface">Just now</span>
                </div>
              </div>
            </div>

            <div className="glass-card p-5 rounded-xl border-l-4 border-l-primary flex flex-col justify-between min-h-[150px]">
              <div className="flex justify-between items-center">
                <h3 className="font-body-lg font-bold text-sm">Report Generator</h3>
                <svg className="ecg-wave" viewBox="0 0 60 20">
                  <polyline points="0,10 10,10 20,10 30,0 40,20 45,10 55,10 60,10" />
                </svg>
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-[10px] font-label-mono">
                  <span className="text-on-surface-variant">Status</span>
                  <span className="text-primary font-bold">HEALTHY / RUNNING</span>
                </div>
                <div className="flex justify-between text-[10px] font-label-mono">
                  <span className="text-on-surface-variant">Avg Response</span>
                  <span className="text-on-surface">850ms</span>
                </div>
                <div className="flex justify-between text-[10px] font-label-mono">
                  <span className="text-on-surface-variant">Last Sync</span>
                  <span className="text-on-surface">12 mins ago</span>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* SECTION 3: COMPLIANCE & GOVERNANCE */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-grid-gutter">
          
          <div className="lg:col-span-1 space-y-stack-md">
            <div className="flex items-center space-x-2">
              <Gavel className="text-primary w-5 h-5" />
              <h2 className="font-headline-md text-xl font-bold text-on-surface">Governance</h2>
            </div>
            <div className="space-y-4">
              
              <div className="glass-card p-4 rounded-xl flex items-center justify-between border-l-4 border-l-primary">
                <div>
                  <h4 className="font-body-lg font-bold text-sm">RBI Compliance</h4>
                  <p className="text-on-surface-variant text-xs font-light mt-0.5">Financial regulatory standards.</p>
                </div>
                <CheckCircle className="text-primary w-5 h-5" />
              </div>

              <div className="glass-card p-4 rounded-xl flex items-center justify-between border-l-4 border-l-primary">
                <div>
                  <h4 className="font-body-lg font-bold text-sm">AML Monitoring</h4>
                  <p className="text-on-surface-variant text-xs font-light mt-0.5">Anti-money laundering logic.</p>
                </div>
                <CheckCircle className="text-primary w-5 h-5" />
              </div>

              <div className="glass-card p-4 rounded-xl flex items-center justify-between border-l-4 border-l-primary">
                <div>
                  <h4 className="font-body-lg font-bold text-sm">KYC Verification</h4>
                  <p className="text-on-surface-variant text-xs font-light mt-0.5">Identity verification module.</p>
                </div>
                <CheckCircle className="text-primary w-5 h-5" />
              </div>

            </div>
          </div>

          <div className="lg:col-span-2 space-y-stack-md">
            <div className="flex items-center space-x-2">
              <Eye className="text-primary w-5 h-5" />
              <h2 className="font-headline-md text-xl font-bold text-on-surface">Explainability &amp; Privacy</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              <div className="glass-card p-5 rounded-xl">
                <div className="flex items-center space-x-3 mb-2">
                  <Brain className="text-primary w-5 h-5" />
                  <h4 className="font-body-lg font-bold text-sm">Explainable AI Enabled</h4>
                </div>
                <p className="text-on-surface-variant text-xs font-light leading-normal">
                  All decisions processed by the Fraud engine include a logical reason string for auditability.
                </p>
              </div>

              <div className="glass-card p-5 rounded-xl">
                <div className="flex items-center space-x-3 mb-2">
                  <FileCheck className="text-primary w-5 h-5" />
                  <h4 className="font-body-lg font-bold text-sm">Audit Logging Active</h4>
                </div>
                <p className="text-on-surface-variant text-xs font-light leading-normal">
                  Immutable record of all administrative actions and high-risk decision overrides.
                </p>
              </div>

              <div className="glass-card p-5 rounded-xl">
                <div className="flex items-center space-x-3 mb-2">
                  <Lock className="text-primary w-5 h-5" />
                  <h4 className="font-body-lg font-bold text-sm">Data Encryption</h4>
                </div>
                <p className="text-on-surface-variant text-xs font-light leading-normal">
                  AES-256 bit encryption at rest and TLS 1.3 in transit across all internal nodes.
                </p>
              </div>

              <div className="glass-card p-5 rounded-xl">
                <div className="flex items-center space-x-3 mb-2">
                  <Database className="text-primary w-5 h-5" />
                  <h4 className="font-body-lg font-bold text-sm">Data Retention</h4>
                </div>
                <p className="text-on-surface-variant text-xs font-light leading-normal">
                  Policy set to 7-year archival for transaction history and 24-month for behavioral traces.
                </p>
              </div>

            </div>
          </div>

        </section>

        {/* SECTION 4: SECURITY CONFIGURATION */}
        <section className="space-y-stack-md">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="text-primary w-5 h-5" />
            <h2 className="font-headline-md text-xl font-bold text-on-surface">Security Configuration</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-grid-gutter">
            
            <div className="glass-card p-4 rounded-xl flex flex-col items-center text-center cursor-pointer hover:border-primary/45 transition-colors">
              <Activity className="text-primary w-6 h-6 mb-2" />
              <span className="font-label-mono text-[10px] font-bold">MFA</span>
              <span className="text-[10px] text-primary uppercase mt-1 font-bold">Enforced</span>
            </div>

            <div className="glass-card p-4 rounded-xl flex flex-col items-center text-center cursor-pointer hover:border-primary/45 transition-colors">
              <Users className="text-primary w-6 h-6 mb-2" />
              <span className="font-label-mono text-[10px] font-bold">RBAC</span>
              <span className="text-[10px] text-primary uppercase mt-1 font-bold">Active</span>
            </div>

            <div className="glass-card p-4 rounded-xl flex flex-col items-center text-center cursor-pointer hover:border-primary/45 transition-colors">
              <Grid className="text-primary w-6 h-6 mb-2" />
              <span className="font-label-mono text-[10px] font-bold">API SECURITY</span>
              <span className="text-[10px] text-primary uppercase mt-1 font-bold">Shielded</span>
            </div>

            <div className="glass-card p-4 rounded-xl flex flex-col items-center text-center cursor-pointer hover:border-primary/45 transition-colors">
              <Lock className="text-primary w-6 h-6 mb-2" />
              <span className="font-label-mono text-[10px] font-bold">ENCRYPTION</span>
              <span className="text-[10px] text-primary uppercase mt-1 font-bold">FIPS-140-2</span>
            </div>

            <div className="glass-card p-4 rounded-xl flex flex-col items-center text-center cursor-pointer hover:border-primary/45 transition-colors">
              <Gauge className="text-primary w-6 h-6 mb-2" />
              <span className="font-label-mono text-[10px] font-bold">TIMEOUT</span>
              <span className="text-[10px] text-primary uppercase mt-1 font-bold">15 Mins</span>
            </div>

            <div className="glass-card p-4 rounded-xl flex flex-col items-center text-center cursor-pointer hover:border-primary/45 transition-colors">
              <ShieldCheck className="text-primary w-6 h-6 mb-2" />
              <span className="font-label-mono text-[10px] font-bold">ZERO TRUST</span>
              <span className="text-[10px] text-primary uppercase mt-1 font-bold">Global</span>
            </div>

          </div>
        </section>

        {/* SECTION 5 & 6: ORG + ACTIVITY */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-grid-gutter">
          
          <div className="space-y-stack-md">
            <div className="flex items-center space-x-2">
              <Building className="text-primary w-5 h-5" />
              <h2 className="font-headline-md text-xl font-bold text-on-surface">Organization &amp; Users</h2>
            </div>
            <div className="glass-card p-6 rounded-xl space-y-6">
              <div className="flex justify-between items-center pb-4 border-b border-white/5">
                <div>
                  <h5 className="text-on-surface-variant font-label-mono text-[10px] uppercase font-bold tracking-wider mb-1">BANK ENTITY</h5>
                  <p className="text-md font-bold text-white">Metropolitan Global Banking Corp</p>
                </div>
                <div className="text-right">
                  <h5 className="text-on-surface-variant font-label-mono text-[10px] uppercase font-bold tracking-wider mb-1">REGION</h5>
                  <p className="text-md font-bold text-white">AWS ap-south-1</p>
                </div>
              </div>
              <div className="space-y-4">
                <h5 className="text-on-surface-variant font-label-mono text-[10px] uppercase font-bold tracking-wider mb-2">ACTIVE ROLES</h5>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-primary-container/10 text-primary border border-primary/20 px-3 py-1 rounded-full text-[10px] font-label-mono font-bold">
                    Administrator (2)
                  </span>
                  <span className="bg-surface-container-highest/50 text-on-surface-variant border border-outline-variant/20 px-3 py-1 rounded-full text-[10px] font-label-mono">
                    Risk Officer (12)
                  </span>
                  <span className="bg-surface-container-highest/50 text-on-surface-variant border border-outline-variant/20 px-3 py-1 rounded-full text-[10px] font-label-mono">
                    Fraud Investigator (45)
                  </span>
                  <span className="bg-surface-container-highest/50 text-on-surface-variant border border-outline-variant/20 px-3 py-1 rounded-full text-[10px] font-label-mono">
                    Compliance Auditor (5)
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-stack-md">
            <div className="flex items-center space-x-2">
              <Terminal className="text-primary w-5 h-5" />
              <h2 className="font-headline-md text-xl font-bold text-on-surface">System Activity Feed</h2>
            </div>
            <div className="glass-card p-6 rounded-xl max-h-[220px] overflow-y-auto space-y-3 custom-scrollbar flex flex-col">
              {feed.map((item, index) => (
                <div key={index} className="flex items-start space-x-3 text-label-mono text-xs transition-opacity duration-500 font-mono">
                  <span className={`font-bold ${
                    item.type === 'primary' ? 'text-primary' : item.type === 'secondary' ? 'text-secondary' : 'text-on-surface-variant'
                  }`}>
                    [{item.time}]
                  </span>
                  <span className="text-on-surface">{item.msg}</span>
                </div>
              ))}
            </div>
          </div>

        </section>

        {/* FOOTER INFO */}
        <section className="glass-card p-6 rounded-xl flex flex-wrap justify-between items-center gap-stack-md border-t border-t-primary/10">
          <div className="flex space-x-8">
            <div className="flex flex-col">
              <span className="text-on-surface-variant font-label-mono uppercase tracking-widest text-[9px] font-bold">Backend Status</span>
              <span className="font-bold text-primary flex items-center text-xs mt-1">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mr-2"></span> CLUSTER_ACTIVE
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-on-surface-variant font-label-mono uppercase tracking-widest text-[9px] font-bold">Database Connection</span>
              <span className="font-bold text-on-surface text-xs mt-1">LATENCY: 2.4ms</span>
            </div>
            <div className="flex flex-col">
              <span className="text-on-surface-variant font-label-mono uppercase tracking-widest text-[9px] font-bold">License Status</span>
              <span className="font-bold text-on-surface text-xs mt-1">PREMIUM ENTERPRISE</span>
            </div>
          </div>
          <div className="text-on-surface-variant font-label-mono text-[10px] uppercase tracking-wider font-semibold">
            TRUSTSHIELD AI SYSTEM MONITORING • 2024
          </div>
        </section>

      </main>

      {/* Floating command bar */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-full max-w-2xl px-grid-margin z-50">
        <form onSubmit={handleCommandSubmit} className="glass-card p-1 rounded-full flex items-center shadow-2xl border-primary/20 ring-1 ring-primary/10 bg-surface-container-lowest/95 backdrop-blur-xl">
          <div className="pl-5 pr-3 text-primary">
            <Terminal className="w-5 h-5" />
          </div>
          <input
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            className="bg-transparent border-none focus:ring-0 text-on-surface w-full py-3 font-body-lg text-sm placeholder:text-on-surface-variant/40 outline-none"
            placeholder="Issue a system command or ask Intelligence..."
            type="text"
          />
          <div className="pr-2">
            <button type="submit" className="bg-primary text-on-primary font-bold px-6 py-2 rounded-full transition-transform active:scale-95 hover:brightness-110 uppercase text-[10px] tracking-widest">
              Execute
            </button>
          </div>
        </form>
      </div>

    </div>
  );
};
