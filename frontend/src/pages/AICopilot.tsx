import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Search,
  Send,
  Bot,
  Check,
  RefreshCw,
  Mic,
  Paperclip,
  ChevronRight,
  AlertTriangle,
  ShieldCheck,
  History
} from 'lucide-react';

interface User {
  id: string;
  name: string;
  riskProfile: 'low' | 'medium' | 'high';
  defaults: {
    amount: number;
    useCase: string;
    location?: string;
    deviceType?: string;
    loginHour?: number;
  };
}

interface Factor {
  factor: string;
  score: number;
  weight: number;
  status: 'good' | 'warning' | 'danger';
  detail: string;
}

interface AnalysisResult {
  trustScore: number;
  decision: 'APPROVE' | 'VERIFY' | 'FLAG';
  reasons: string[];
  factors: Factor[];
  processingTimeMs: number;
}

export const AICopilot: React.FC = () => {
  const navigate = useNavigate();
  const { caseId } = useParams<{ caseId: string }>();
  
  // 3 Stitch Mockup Users (Static UI layer)
  const stitchUsers: User[] = [
    { id: 'TS-99284', name: 'Rajesh Kumar', riskProfile: 'high', defaults: { amount: 42500, useCase: 'payment' } },
    { id: 'TS-99285', name: 'Elena Soroka', riskProfile: 'medium', defaults: { amount: 85000, useCase: 'wire' } },
    { id: 'TS-99286', name: 'Marcus Chen', riskProfile: 'low', defaults: { amount: 12000, useCase: 'withdrawal' } }
  ];

  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<string>('TS-99284');
  const [selectedUser, setSelectedUser] = useState<User>(stitchUsers[0]);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [analyzing, setAnalyzing] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [chatQuery, setChatQuery] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'All' | 'Flagged' | 'Pending'>('All');

  // Sync selectedUserId with route caseId
  useEffect(() => {
    if (caseId) {
      const mappedId = caseId === 'USR-RT990' ? 'TS-99284' : caseId === 'USR-002' ? 'TS-99285' : caseId === 'USR-001' ? 'TS-99286' : 'TS-99284';
      setSelectedUserId(mappedId);
    }
  }, [caseId]);

  // AI thinking timeline simulation steps
  const [thinkingStep, setThinkingStep] = useState<number>(0);
  const thinkingLabels = [
    'Retrieving subject transaction logs...',
    'Cross-referencing 14 global databases...',
    'Analyzing behavioral patterns...',
    'Checking device fingerprints & IP locations...',
    'Running relationship network algorithms...',
    'Finalizing Trust Score calculation...'
  ];

  // Fetch queue of cases from backend (to align state syncs)
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('http://localhost:3001/api/users');
        if (!res.ok) throw new Error('API Error');
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error('Error fetching users for queue:', err);
      }
    };
    fetchUsers();
  }, []);

  // Sync selected user details
  useEffect(() => {
    const current = stitchUsers.find(u => u.id === selectedUserId) || stitchUsers[0];
    setSelectedUser(current);
  }, [selectedUserId]);

  // Fetch analysis for selected user by mapping to backend ID
  useEffect(() => {
    const loadAnalysis = async () => {
      if (!selectedUserId) return;
      
      // Map Stitch UI IDs to backend mock DB IDs
      const backendId = selectedUserId === 'TS-99284' ? 'USR-RT990' : selectedUserId === 'TS-99285' ? 'USR-002' : 'USR-001';
      
      const currentUser = users.find(u => u.id === backendId);
      if (!currentUser) return;

      try {
        setAnalyzing(true);
        setThinkingStep(0);

        // Simulate step-by-step thinking sequences
        for (let i = 1; i <= thinkingLabels.length; i++) {
          await new Promise(r => setTimeout(r, 200));
          setThinkingStep(i);
        }

        const analyzePayload = {
          ...currentUser.defaults,
          userId: currentUser.id,
          amount: currentUser.defaults.amount,
          useCase: currentUser.defaults.useCase,
          location: currentUser.defaults.location ?? 'Mumbai',
          deviceType: currentUser.defaults.deviceType ?? 'mobile',
          loginHour: currentUser.defaults.loginHour ?? 9,
        };

        const res = await fetch('http://localhost:3001/api/analyze', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(analyzePayload)
        });

        if (!res.ok) throw new Error('Analyze failed');
        const data = await res.json();
        setAnalysis(data);
      } catch (err) {
        console.error('Error calculating analysis:', err);
      } finally {
        setAnalyzing(false);
        setLoading(false);
      }
    };

    if (users.length > 0) {
      loadAnalysis();
    }
  }, [selectedUserId, users]);

  // Handle natural language chat commands
  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatQuery.trim()) return;
    setChatQuery('');
  };

  // Filtered queue logic (runs on static Stitch list)
  const filteredUsers = stitchUsers.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(searchQuery.toLowerCase()) || u.id.toLowerCase().includes(searchQuery.toLowerCase());
    if (activeTab === 'All') return matchesSearch;
    if (activeTab === 'Flagged') return matchesSearch && u.riskProfile === 'high';
    if (activeTab === 'Pending') return matchesSearch && u.riskProfile === 'medium';
    return matchesSearch;
  });

  return (
    <div className="w-full h-[calc(100vh-64px)] flex flex-col relative overflow-hidden bg-background">

      {/* Header Section */}
      <section className="px-grid-margin pt-stack-lg pb-stack-md shrink-0">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="text-5xl md:text-[64px] font-display-lg text-on-surface mb-4 tracking-tighter leading-tight font-extrabold">AI Copilot</h2>
            <p className="text-body-lg text-on-surface-variant max-w-2xl font-light">Your AI investigation workspace for analysing customers, transactions, fraud cases and lending decisions.</p>
          </div>
        </div>
      </section>

      {/* Dynamic Content Grid */}
      <div className="flex-1 overflow-hidden px-grid-margin grid grid-cols-12 gap-grid-gutter pb-4">

        {/* LEFT COLUMN: Live Investigation Queue */}
        <aside className="col-span-12 lg:col-span-2 flex flex-col gap-6 overflow-y-auto custom-scrollbar pb-4">
          <div className="space-y-4">
            <h3 className="text-[10px] font-label-mono text-on-surface-variant uppercase tracking-widest">Live Queue</h3>
            <div className="mt-4 space-y-3">
              <div className="relative">
                <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-on-surface-variant" />
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-surface-container-low border border-outline-variant/20 rounded-lg pl-8 pr-2 py-1.5 text-[10px] focus:ring-1 focus:ring-primary/50 focus:border-primary/50 transition-all outline-none text-white placeholder:text-on-surface-variant/40"
                  placeholder="Search cases..."
                  type="text"
                />
              </div>
              <div className="flex gap-1 overflow-x-auto pb-1 custom-scrollbar">
                {(['All', 'Flagged', 'Pending'] as const).map(tab => (
                  <span
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-2 py-0.5 rounded text-[9px] font-bold cursor-pointer whitespace-nowrap transition-colors ${activeTab === tab
                      ? 'bg-primary text-on-primary font-bold'
                      : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-variant/40'
                      }`}
                  >
                    {tab}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              {filteredUsers.map(u => {
                const isActive = u.id === selectedUserId;
                const statusLabel = u.riskProfile === 'high' ? 'Active' : u.riskProfile === 'medium' ? 'Pending' : 'Queued';
                const backendId = u.id === 'TS-99284' ? 'USR-RT990' : u.id === 'TS-99285' ? 'USR-002' : 'USR-001';

                return isActive ? (
                  <div
                    key={u.id}
                    onClick={() => navigate(`/ai-copilot/${backendId}`)}
                    className="glass-card p-3 rounded-lg border-l-2 border-primary bg-primary/5 ring-1 ring-primary/20 cursor-pointer"
                  >
                    <p className="text-xs font-bold text-primary">{u.id}</p>
                    <p className="text-[10px] text-on-surface-variant">{u.name} • {statusLabel}</p>
                  </div>
                ) : (
                  <div
                    key={u.id}
                    onClick={() => navigate(`/ai-copilot/${backendId}`)}
                    className="glass-card p-3 rounded-lg border-l-2 border-outline-variant/30 opacity-60 hover:opacity-100 transition-opacity cursor-pointer hover:bg-surface-variant/10"
                  >
                    <p className="text-xs font-bold">{u.id}</p>
                    <p className="text-[10px] text-on-surface-variant">{u.name} • {statusLabel}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-auto pt-4 border-t border-outline-variant/10">
            <h3 className="text-[10px] font-label-mono text-on-surface-variant uppercase tracking-widest mb-3">History</h3>
            <div className="space-y-2">
              <div className="text-[10px] text-on-surface-variant hover:text-primary cursor-pointer flex items-center gap-2">
                <History className="w-3.5 h-3.5 text-on-surface-variant" />Recent Audits
              </div>
              <div className="text-[10px] text-on-surface-variant hover:text-primary cursor-pointer flex items-center gap-2">
                <History className="w-3.5 h-3.5 text-on-surface-variant" />Flagged Entities
              </div>
            </div>
          </div>
        </aside>

        {/* CENTER COLUMN: Investigation Workspace */}
        <div className="col-span-12 lg:col-span-7 flex flex-col overflow-y-auto custom-scrollbar pr-4 space-y-8 pb-32">

          {/* Active Case Report */}
          {selectedUser && (
            <div className="glass-card p-8 space-y-8 border-primary/30 relative gap-10 rounded-xl">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/50 via-primary to-primary/50"></div>

              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-bold text-primary mb-2">Investigation Report: {selectedUser.name}</h3>
                  <p className="text-sm text-on-surface-variant">Case ID: {selectedUser.id} • Status: {selectedUser.riskProfile === 'high' ? 'High' : selectedUser.riskProfile === 'medium' ? 'Medium' : 'Low'} Priority Review</p>
                </div>
                <div className="flex gap-2">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${selectedUser.riskProfile === 'high'
                    ? 'bg-error-container text-on-error-container'
                    : selectedUser.riskProfile === 'medium'
                      ? 'bg-secondary-container text-on-secondary-container'
                      : 'bg-primary/20 text-primary'
                    }`}>
                    {selectedUser.riskProfile === 'high' ? 'HIGH RISK' : selectedUser.riskProfile === 'medium' ? 'MEDIUM RISK' : 'LOW RISK'}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">Executive Summary</h4>
                  <p className="text-sm leading-relaxed font-light">
                    {selectedUserId === 'TS-99284' 
                      ? "Analysis indicates a high-probability account takeover attempt. Three rapid cross-border transfers were initiated from unrecognized IP addresses in Southeast Asia, deviating from the customer's 5-year behavioral baseline."
                      : (analysis?.reasons?.join(' ') || "Evaluating case patterns and transaction velocity...")}
                  </p>
                </div>
                <div className="bg-surface-container-low p-6 rounded-xl flex flex-col justify-center border border-outline-variant/10">
                  <p className="text-[10px] font-label-mono uppercase mb-2">Trust Score</p>
                  <div className="flex items-end gap-4">
                    <p className="text-5xl font-bold text-primary">
                      {selectedUserId === 'TS-99284' ? 84 : (analysis?.trustScore ?? 55)}
                    </p>
                    <div className="pb-1">
                      <span className="px-2 py-0.5 rounded bg-primary/20 text-primary text-[10px] font-bold">
                        {selectedUserId === 'TS-99284' ? 'STABLE' : (analysis && analysis.trustScore >= 80 ? 'STABLE' : 'DECAYING')}
                      </span>
                      <p className="text-[10px] text-on-surface-variant mt-1">
                        {selectedUserId === 'TS-99284' ? '-12 pts from baseline' : (analysis && analysis.trustScore >= 80 ? '-12 pts from baseline' : '-25 pts from baseline')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Key Risk Factors */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">Key Risk Factors</h4>
                <div className="flex flex-wrap gap-3 pb-2">
                  {selectedUserId === 'TS-99284' ? (
                    <>
                      <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-error-container/20 border border-error-container/30 text-on-error-container">
                        <span className="w-2 h-2 rounded-full bg-error animate-pulse"></span>
                        <span className="text-xs font-bold">IP Anomaly</span>
                      </div>
                      <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary-container/20 border border-secondary-container/30 text-on-secondary-container">
                        <span className="w-2 h-2 rounded-full bg-secondary"></span>
                        <span className="text-xs font-bold">Velocity Spike</span>
                      </div>
                      <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-surface-container-highest border border-outline-variant/20 text-on-surface-variant">
                        <span className="w-2 h-2 rounded-full bg-on-surface-variant"></span>
                        <span className="text-xs font-bold text-on-surface-variant">Device Change</span>
                      </div>
                    </>
                  ) : (
                    analysis?.factors?.map(f => {
                      let styleClass = "bg-surface-container-highest border border-outline-variant/20 text-on-surface-variant";
                      let dotClass = "bg-on-surface-variant";

                      if (f.status === 'danger') {
                        styleClass = "bg-error-container/20 border border-error-container/30 text-on-error-container";
                        dotClass = "bg-error animate-pulse";
                      } else if (f.status === 'warning') {
                        styleClass = "bg-secondary-container/20 border border-secondary-container/30 text-on-secondary-container";
                        dotClass = "bg-secondary";
                      }

                      return (
                        <div key={f.factor} className={`flex items-center gap-2 px-4 py-2 rounded-lg ${styleClass}`}>
                          <span className={`w-2 h-2 rounded-full ${dotClass}`}></span>
                          <span className="text-xs font-bold">{f.factor}</span>
                        </div>
                      );
                    }) || (
                      <p className="text-xs text-on-surface-variant italic">No risk factor spikes detected.</p>
                    )
                  )}
                </div>
              </div>

              {/* AI Recommendation Box */}
              <div className="bg-primary/5 border border-primary/30 p-6 rounded-xl">
                <div className="flex items-center gap-3 mb-4">
                  <ShieldCheck className="w-5 h-5 text-primary" />
                  <h4 className="text-xs font-bold text-primary uppercase">AI Recommendation</h4>
                </div>
                <p className="text-sm font-semibold mb-6">
                  {selectedUserId === 'TS-99284' 
                    ? 'Immediate temporary freeze on outbound transfers recommended. Initiate secondary biometric verification for account owner.'
                    : (analysis?.decision === 'FLAG'
                        ? 'Immediate temporary freeze on outbound transfers recommended. Initiate secondary biometric verification for account owner.'
                        : 'Initiate secondary identity verification and device fingerprint checks before authorizing.')}
                </p>
                <div className="flex flex-wrap gap-3 pb-2">
                  <button className="px-4 py-2 rounded-lg bg-primary text-on-primary text-xs font-bold hover:bg-primary-fixed-dim transition-colors">
                    Approve Freeze
                  </button>
                  <button
                    onClick={() => navigate(`/customer/${selectedUserId === 'TS-99284' ? 'USR-RT990' : (selectedUserId === 'TS-99285' ? 'USR-002' : 'USR-001')}`)}
                    className="px-4 py-2 rounded-lg border border-primary/30 text-primary text-xs font-bold hover:bg-primary/10 transition-colors"
                  >
                    Open Customer Graph
                  </button>
                  <button className="px-4 py-2 rounded-lg border border-outline-variant/30 text-on-surface-variant text-xs font-bold hover:bg-surface-variant/20 transition-colors">
                    Request ID Refresh
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* RIGHT COLUMN: AI Operating Context */}
        <aside className="col-span-12 lg:col-span-3 flex flex-col gap-6 overflow-y-auto custom-scrollbar">

          {/* AI Working Memory */}
          {selectedUser && (
            <div className="glass-card p-5 space-y-4 rounded-xl">
              <h3 className="text-[10px] font-label-mono text-on-surface-variant uppercase tracking-widest">Working Memory</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-on-surface-variant">Subject</span>
                  <span className="font-bold text-white">{selectedUser.name}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-on-surface-variant">Entity ID</span>
                  <span className="font-mono text-white">
                    {selectedUserId === 'TS-99284' ? 'RK-0092' : (selectedUserId === 'TS-99285' ? 'EL-0085' : 'MA-0012')}
                  </span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-on-surface-variant">Risk Level</span>
                  <span className={`font-bold ${selectedUser.riskProfile === 'high' ? 'text-error' : selectedUser.riskProfile === 'medium' ? 'text-[#ffb95f]' : 'text-primary'
                    }`}>
                    {selectedUser.riskProfile === 'high' ? 'CRITICAL' : selectedUser.riskProfile === 'medium' ? 'MEDIUM' : 'LOW'}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Active AI Agents */}
          <div className="glass-card p-5 space-y-4 rounded-xl">
            <h3 className="text-[10px] font-label-mono text-on-surface-variant uppercase tracking-widest">Active Agents</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2 p-2 rounded bg-surface-container-low border border-primary/20">
                <span className="w-2 h-2 rounded-full bg-primary pulse-active"></span>
                <span className="text-[10px] font-bold">FRAUD</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded bg-surface-container-low border border-primary/20">
                <span className="w-2 h-2 rounded-full bg-primary pulse-active"></span>
                <span className="text-[10px] font-bold">TRUST</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded bg-surface-container-low border border-outline-variant/20 opacity-50">
                <span className="w-2 h-2 rounded-full bg-on-surface-variant"></span>
                <span className="text-[10px] font-bold">IDENTITY</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded bg-surface-container-low border border-primary/20">
                <span className="w-2 h-2 rounded-full bg-primary pulse-active"></span>
                <span className="text-[10px] font-bold">RELATION</span>
              </div>
            </div>
          </div>

          {/* Investigation Timeline */}
          <div className="glass-card p-5 flex-1 rounded-xl">
            <h3 className="text-[10px] font-label-mono text-on-surface-variant uppercase tracking-widest mb-6">Investigation Timeline</h3>
            <div className="space-y-6 relative">
              <div className="absolute left-2 top-2 bottom-2 w-px bg-outline-variant/30"></div>
              
              <div className="flex items-start gap-4 relative z-10">
                <div className="w-4 h-4 rounded-full bg-primary flex items-center justify-center shrink-0">
                  <Check className="w-2.5 h-2.5 text-on-primary stroke-[3px]" />
                </div>
                <div className="flex-1">
                  <p className="text-[10px] font-bold text-white">Data Retrieval</p>
                  <p className="text-[9px] text-on-surface-variant mt-0.5 leading-normal">Cross-referenced 14 databases</p>
                </div>
              </div>

              <div className="flex items-start gap-4 relative z-10">
                <div className="w-4 h-4 rounded-full bg-primary flex items-center justify-center shrink-0">
                  <Check className="w-2.5 h-2.5 text-on-primary stroke-[3px]" />
                </div>
                <div className="flex-1">
                  <p className="text-[10px] font-bold text-white">Pattern Analysis</p>
                  <p className="text-[9px] text-on-surface-variant mt-0.5 leading-normal">Identified Southeast Asia IP cluster</p>
                </div>
              </div>

              <div className="flex items-start gap-4 relative z-10">
                <div className="w-4 h-4 rounded-full bg-primary flex items-center justify-center shrink-0 pulse-active">
                  <RefreshCw className="w-2.5 h-2.5 text-on-primary animate-spin" />
                </div>
                <div className="flex-1">
                  <p className="text-[10px] font-bold text-[#ffb95f]">Risk Weighting</p>
                  <p className="text-[9px] text-on-surface-variant mt-0.5 leading-normal">Calculating behavioral deviation...</p>
                </div>
              </div>
            </div>
          </div>

        </aside>
      </div>

      {/* AI Command Bar (Fixed Bottom) */}
      <div className="fixed bottom-0 left-16 right-0 flex justify-center px-grid-margin z-50 pb-8 pt-4 bg-gradient-to-t from-background via-background/95 to-transparent shrink-0">
        <form
          onSubmit={handleChatSubmit}
          className="w-full max-w-4xl glass-card bg-surface-container-lowest/95 rounded-xl flex items-center px-4 py-2 border border-outline-variant/20 focus-within:border-primary/50 transition-all"
        >
          <div className="flex gap-2 shrink-0 pr-4 border-r border-outline-variant/20">
            <button type="button" className="w-8 h-8 text-on-surface-variant hover:text-primary transition-colors flex items-center justify-center">
              <Paperclip className="w-5 h-5" />
            </button>
            <button type="button" className="w-8 h-8 text-on-surface-variant hover:text-primary transition-colors flex items-center justify-center">
              <Mic className="w-5 h-5" />
            </button>
          </div>
          <input
            value={chatQuery}
            onChange={(e) => setChatQuery(e.target.value)}
            className="flex-1 bg-transparent border-none text-on-surface px-4 focus:ring-0 text-sm placeholder:text-on-surface-variant/50 outline-none"
            placeholder="Ask TrustShield AI anything..."
            type="text"
          />
          <button type="submit" className="bg-primary hover:bg-primary-fixed-dim text-on-primary font-bold px-4 py-1.5 rounded-lg transition-all flex items-center gap-2 group shrink-0">
            <span className="text-xs">Send Query</span>
            <Send className="w-3.5 h-3.5 text-on-primary group-hover:translate-x-0.5 transition-transform" />
          </button>
        </form>
      </div>

      {/* Signal Background Effects */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/2 via-transparent to-secondary/2 opacity-30"></div>
      </div>
    </div>
  );
};
