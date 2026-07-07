import React from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { 
  Shield, 
  BarChart2, 
  UserCheck, 
  Activity, 
  Bot, 
  FileText, 
  Network, 
  Settings 
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  // useLocation triggers a re-render when navigating, ensuring local storage active ID is always fresh
  const location = useLocation();
  const activeId = localStorage.getItem('activeCustomerId') || 'USR-RT990';

  const navItems = [
    { name: 'Intelligence Center', path: '/intelligence-center', icon: BarChart2 },
    { name: 'Customer Intelligence', path: '/customer-intelligence', icon: UserCheck },
    { name: 'Fraud Investigation', path: `/investigation/${activeId}`, icon: Activity },
    { name: 'AI Copilot', path: `/ai-copilot/${activeId}`, icon: Bot },
    { name: 'Reports', path: `/reports/${activeId}`, icon: FileText },
    { name: 'Platform Architecture', path: '/platform-architecture', icon: Network },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-16 hover:w-64 transition-all duration-300 bg-surface-container-lowest border-r border-outline-variant/10 flex flex-col py-6 z-[60] group overflow-hidden">
      {/* Brand Logo */}
      <Link to="/" className="px-4 mb-10 flex items-center gap-4 shrink-0 cursor-pointer">
        <div className="w-8 h-8 rounded bg-primary flex items-center justify-center shrink-0">
          <Shield className="text-on-primary w-5 h-5" />
        </div>
        <span className="ml-4 font-headline-md text-[18px] font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
          TrustShield AI
        </span>
      </Link>

      {/* Nav Links */}
      <nav className="flex-1 flex flex-col gap-2 px-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => 
              `flex items-center gap-4 p-3 rounded-lg text-on-surface-variant hover:bg-surface-variant/20 hover:text-on-surface transition-colors ${
                isActive 
                  ? 'text-primary bg-primary/10 border-l-2 border-primary' 
                  : ''
              }`
            }
          >
            <item.icon className="w-5 h-5 shrink-0" />
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
              {item.name}
            </span>
          </NavLink>
        ))}

        {/* Settings at the bottom */}
        <div className="mt-auto pt-4 border-t border-outline-variant/10 w-full">
          <NavLink
            to="/settings"
            className={({ isActive }) => 
              `flex items-center gap-4 p-3 rounded-lg text-on-surface-variant hover:bg-surface-variant/20 hover:text-on-surface transition-colors ${
                isActive 
                  ? 'text-primary bg-primary/10 border-l-2 border-primary' 
                  : ''
              }`
            }
          >
            <Settings className="w-5 h-5 shrink-0" />
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
              Settings
            </span>
          </NavLink>
        </div>
      </nav>
    </aside>
  );
};
