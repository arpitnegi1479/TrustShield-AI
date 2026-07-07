import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Search, Bell, ChevronRight } from 'lucide-react';

export const TopBar: React.FC = () => {
  const location = useLocation();

  // Get readable breadcrumb from path
  const getBreadcrumb = (pathname: string) => {
    switch (pathname) {
      case '/intelligence-center':
        return 'Intelligence Center';
      case '/customer-intelligence':
        return 'Customer Intelligence';
      case '/fraud-investigation':
        return 'Fraud Investigation';
      case '/ai-copilot':
        return 'AI Copilot';
      case '/reports':
        return 'Reports';
      case '/platform-architecture':
        return 'Platform Architecture';
      case '/settings':
        return 'Settings';
      default:
        return 'Overview';
    }
  };

  const breadcrumb = getBreadcrumb(location.pathname);

  return (
    <header className="h-16 bg-surface/80 backdrop-blur-md border-b border-outline-variant/10 flex justify-between items-center px-6 shrink-0 z-40">
      <div className="flex items-center gap-4">
        <nav className="flex items-center gap-2 text-xs font-medium">
          <Link to="/" className="text-on-surface-variant hover:text-primary transition-colors cursor-pointer">TrustShield AI</Link>
          <ChevronRight className="w-3.5 h-3.5 text-outline-variant" />
          <span className="text-on-surface">{breadcrumb}</span>
        </nav>
      </div>

      <div className="flex-1 max-w-xl px-12 hidden md:block">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant w-4 h-4" />
          <input 
            type="text" 
            placeholder="Search customers, investigations, reports..." 
            className="w-full bg-surface-container border border-outline-variant/20 rounded-full pl-10 pr-4 py-2 text-sm focus:ring-1 focus:ring-primary/50 focus:border-primary/50 transition-all text-white placeholder:text-on-surface-variant/50 outline-none"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Notifications */}
        <button className="w-10 h-10 flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-error rounded-full border border-surface"></span>
        </button>

        {/* AI Live Pulsing Badge */}
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/20">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          <span className="text-[10px] font-bold text-primary tracking-wider uppercase font-label-mono">AI Live</span>
        </div>

        {/* User Account initials "A" */}
        <div className="flex items-center gap-3 pl-2 border-l border-outline-variant/30">
          <div className="w-8 h-8 rounded-full bg-secondary text-on-secondary flex items-center justify-center font-bold text-xs">
            A
          </div>
          <span className="text-sm font-medium text-on-surface hidden md:block">Arpit</span>
        </div>
      </div>
    </header>
  );
};
