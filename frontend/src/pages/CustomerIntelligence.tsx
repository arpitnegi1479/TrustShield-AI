import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  ArrowRight, 
  SlidersHorizontal, 
  ChevronRight, 
  Zap, 
  AlertCircle, 
  ClipboardCheck, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle2
} from 'lucide-react';

interface Customer {
  id: string;
  name: string;
  riskProfile: 'low' | 'medium' | 'high';
  trustScore: number;
  loanEligibility: 'Qualified' | 'Pending Review' | 'Rejected';
  lastTransaction: string;
}

export const CustomerIntelligence: React.FC = () => {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  // Static sample data from Stitch
  const sampleCustomers: Customer[] = [
    {
      id: 'USR-RT990',
      name: 'Rajesh Kumar',
      riskProfile: 'low',
      trustScore: 84,
      loanEligibility: 'Qualified',
      lastTransaction: '$42,500.00'
    },
    {
      id: 'USR-AS882',
      name: 'Anjali Sharma',
      riskProfile: 'medium',
      trustScore: 62,
      loanEligibility: 'Pending Review',
      lastTransaction: '$12,400.00'
    },
    {
      id: 'USR-VM771',
      name: 'Vikram Mehta',
      riskProfile: 'low',
      trustScore: 91,
      loanEligibility: 'Qualified',
      lastTransaction: '$105,200.50'
    },
    {
      id: 'USR-SG559',
      name: 'Sanya Gupta',
      riskProfile: 'high',
      trustScore: 34,
      loanEligibility: 'Rejected',
      lastTransaction: '$2,100.00'
    }
  ];

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        setLoading(true);
        // Fetch from new GET /api/users endpoint
        const response = await fetch('http://localhost:3001/api/users');
        if (!response.ok) throw new Error('API failed');
        const data = await response.json();
        
        // Map backend structure to customer cards
        const apiCustomers = data.map((user: any) => {
          const risk = user.riskProfile || 'low';
          let score = 88;
          let eligibility: 'Qualified' | 'Pending Review' | 'Rejected' = 'Qualified';
          if (risk === 'medium') {
            score = 62;
            eligibility = 'Pending Review';
          } else if (risk === 'high') {
            score = 34;
            eligibility = 'Rejected';
          }
          return {
            id: user.id,
            name: user.name,
            riskProfile: risk,
            trustScore: score,
            loanEligibility: eligibility,
            lastTransaction: `$${(user.defaults?.amount || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}`
          };
        });

        // Merge with sample customers and remove duplicates by ID
        const merged = [...sampleCustomers, ...apiCustomers];
        const unique = merged.filter((item, index, self) => 
          index === self.findIndex((t) => t.id === item.id)
        );
        setCustomers(unique);
      } catch (err) {
        console.error('Error fetching customers from API, falling back to samples:', err);
        setCustomers(sampleCustomers);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  // Filter & Search Logic
  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = 
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.id.toLowerCase().includes(searchTerm.toLowerCase());

    if (activeFilter === 'All') return matchesSearch;
    if (activeFilter === 'High Risk') return matchesSearch && customer.riskProfile === 'high';
    if (activeFilter === 'Medium Risk') return matchesSearch && customer.riskProfile === 'medium';
    if (activeFilter === 'Low Risk') return matchesSearch && customer.riskProfile === 'low';
    if (activeFilter === 'Loan Applicants') return matchesSearch && customer.loanEligibility === 'Pending Review';
    if (activeFilter === 'Recently Active') return matchesSearch; // Fallback
    return matchesSearch;
  });

  return (
    <div className="max-w-[1600px] mx-auto px-grid-margin py-stack-lg flex flex-col gap-stack-lg w-full pb-32">
      
      {/* Header Section */}
      <section className="flex flex-col gap-2">
        <nav className="mb-2">
          <ol className="flex items-center gap-2 text-[10px] font-label-mono text-on-surface-variant/60 uppercase tracking-widest">
            <li>TrustShield AI</li>
            <li><ChevronRight className="w-3 h-3 text-outline-variant" /></li>
            <li>Customers</li>
            <li><ChevronRight className="w-3 h-3 text-outline-variant" /></li>
            <li className="text-primary font-bold">Directory</li>
          </ol>
        </nav>
        <h1 className="font-display-lg text-5xl md:text-6xl text-white tracking-tighter font-extrabold uppercase">
          Customer Intelligence
        </h1>
        <p className="text-on-surface-variant text-lg font-light max-w-2xl leading-relaxed">
          Search, filter and explore customer profiles using AI-powered banking intelligence.
        </p>
      </section>

      {/* Central Search Node */}
      <section className="relative">
        <div className="glass-card p-6 rounded-xl flex items-center gap-4 border-primary/15 bg-background/80">
          <Search className="text-primary w-8 h-8 shrink-0" />
          <input 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent border-none text-xl text-on-surface placeholder:text-on-surface-variant/40 w-full focus:ring-0 outline-none" 
            placeholder="Search customer by name, account number, phone number or PAN..." 
            type="text"
          />
          <button className="bg-primary text-[#313030] font-bold px-8 py-3 rounded-lg hover:scale-[1.02] active:scale-95 transition-all text-sm font-display-lg uppercase tracking-tight shadow-[0_0_20px_rgba(34,197,94,0.2)]">
            Search
          </button>
        </div>
        {/* Ambient Glow behind search */}
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-primary/5 blur-[100px] pointer-events-none" />
      </section>

      {/* Filter Layer */}
      <section className="flex flex-wrap items-center gap-3">
        {['All', 'High Risk', 'Medium Risk', 'Low Risk', 'Loan Applicants', 'Recently Active'].map((filter) => (
          <button 
            key={filter}
            onClick={() => setActiveFilter(filter === 'All' ? 'All' : filter)}
            className={`px-5 py-2.5 rounded-full border transition-all text-xs font-bold tracking-wider font-display-lg ${
              (filter === 'All' ? activeFilter === 'All' : activeFilter === filter)
                ? 'border-primary bg-primary/10 text-primary' 
                : 'border-outline-variant/30 hover:border-primary/50 text-on-surface-variant hover:text-on-surface'
            }`}
          >
            {filter === 'All' ? 'All Customers' : filter}
          </button>
        ))}
        
        <div className="ml-auto flex items-center gap-2 text-on-surface-variant text-xs font-label-mono uppercase tracking-widest">
          <span>Showing {filteredCustomers.length} customers</span>
          <SlidersHorizontal className="w-4 h-4 text-outline-variant" />
        </div>
      </section>

      {/* Primary Directory Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
        {loading ? (
          // Skeletons
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="glass-card rounded-xl p-6 h-60 animate-pulse bg-white/5" />
          ))
        ) : filteredCustomers.map((customer) => (
          <div key={customer.id} className="glass-card rounded-xl p-6 flex flex-col gap-4 group relative overflow-hidden">
            {/* Subtle glow border gradient */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="flex justify-between items-start">
              <div className="flex flex-col">
                <h3 className="font-display-md text-lg text-white font-bold group-hover:text-primary transition-colors duration-300">
                  {customer.name}
                </h3>
                <span className="font-label-mono text-[10px] text-on-surface-variant/70 mt-1 uppercase tracking-wider">
                  ID: #{customer.id}
                </span>
              </div>
              <span className={`px-2 py-0.5 rounded text-[9px] font-bold tracking-widest font-label-mono ${
                customer.riskProfile === 'high' 
                  ? 'bg-error/10 border border-error/20 text-error' 
                  : customer.riskProfile === 'medium'
                    ? 'bg-[#ffb95f]/10 border border-[#ffb95f]/20 text-[#ffb95f]'
                    : 'bg-primary/10 border border-primary/20 text-primary'
              }`}>
                {customer.riskProfile.toUpperCase()} RISK
              </span>
            </div>

            <div className="flex items-end gap-2 my-2">
              <span className={`font-display-lg text-4xl font-extrabold leading-none ${
                customer.riskProfile === 'high' ? 'text-error' : 'text-white'
              }`}>
                {customer.trustScore}
              </span>
              <span className="text-on-surface-variant/80 text-[11px] font-label-mono uppercase tracking-wider pb-1">
                Trust Score
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 py-4 border-t border-b border-outline-variant/10">
              <div>
                <p className="text-[10px] text-on-surface-variant/60 uppercase tracking-wider font-label-mono">Loan Eligibility</p>
                <p className={`text-xs font-bold mt-1 ${
                  customer.loanEligibility === 'Rejected' 
                    ? 'text-error' 
                    : customer.loanEligibility === 'Qualified'
                      ? 'text-primary'
                      : 'text-on-surface-variant'
                }`}>
                  {customer.loanEligibility}
                </p>
              </div>
              <div>
                <p className="text-[10px] text-on-surface-variant/60 uppercase tracking-wider font-label-mono">Last Transaction</p>
                <p className="text-xs font-bold text-white font-mono mt-1">{customer.lastTransaction}</p>
              </div>
            </div>

            <button 
              onClick={() => navigate(`/customer/${customer.id}`)}
              className="w-full py-3 rounded-lg bg-primary/5 border border-primary/25 hover:bg-primary/15 hover:border-primary text-primary font-bold flex items-center justify-center gap-2 transition-all text-xs font-display-md uppercase tracking-tight"
            >
              Open Profile
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ))}
      </section>

      {/* AI Priority Section */}
      <section className="mt-12 flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <div className="w-8 h-[1px] bg-primary/30" />
          <h2 className="font-display-lg text-xl md:text-2xl text-white font-bold flex items-center gap-3 uppercase tracking-tight">
            <Zap className="text-primary w-5 h-5" />
            AI Recommended Customers
          </h2>
          <div className="flex-1 h-[1px] bg-outline-variant/10" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Recommended 1 */}
          <div className="glass-card rounded-xl p-6 border-l-4 border-l-error bg-error/5 flex flex-col justify-between h-48">
            <div className="flex justify-between items-start">
              <span className="font-label-mono text-[9px] text-error uppercase tracking-widest font-bold">Recently Flagged</span>
              <AlertCircle className="text-error w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white font-bold text-base font-display-md uppercase tracking-tight">Amitav Shah</h4>
              <p className="text-xs text-on-surface-variant/80 font-light mt-1">Suspicious multi-node transfer patterns detected in last 24h.</p>
            </div>
            <div className="text-[10px] font-bold text-error/80 flex items-center gap-1.5 font-label-mono uppercase tracking-wider">
              <AlertTriangle className="w-3.5 h-3.5" />
              Urgent Review Needed
            </div>
          </div>

          {/* Recommended 2 */}
          <div className="glass-card rounded-xl p-6 border-l-4 border-l-[#ffb95f] bg-[#ffb95f]/5 flex flex-col justify-between h-48">
            <div className="flex justify-between items-start">
              <span className="font-label-mono text-[9px] text-[#ffb95f] uppercase tracking-widest font-bold">Requires Manual Review</span>
              <ClipboardCheck className="text-[#ffb95f] w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white font-bold text-base font-display-md uppercase tracking-tight">Meera Reddy</h4>
              <p className="text-xs text-on-surface-variant/80 font-light mt-1">Identity verification mismatch during high-value loan application.</p>
            </div>
            <div className="text-[10px] font-bold text-[#ffb95f]/80 flex items-center gap-1.5 font-label-mono uppercase tracking-wider">
              <AlertCircle className="w-3.5 h-3.5" />
              Pending for 3 hours
            </div>
          </div>

          {/* Recommended 3 */}
          <div className="glass-card rounded-xl p-6 border-l-4 border-l-primary bg-primary/5 flex flex-col justify-between h-48">
            <div className="flex justify-between items-start">
              <span className="font-label-mono text-[9px] text-primary uppercase tracking-widest font-bold">Rapid Trust Score Change</span>
              <TrendingUp className="text-primary w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white font-bold text-base font-display-md uppercase tracking-tight">Karan Johar</h4>
              <p className="text-xs text-on-surface-variant/80 font-light mt-1">Score improved from 68 to 82 following massive liability clearance.</p>
            </div>
            <div className="text-[10px] font-bold text-primary/80 flex items-center gap-1.5 font-label-mono uppercase tracking-wider">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Opportunity Detected
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
