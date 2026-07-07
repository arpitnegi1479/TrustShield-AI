import React from 'react';
import { Bell, User } from 'lucide-react';

const TopNav: React.FC = () => {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between h-14 px-6 md:px-8 backdrop-blur-xl border-b border-[#1e293b] bg-[#080d19]/92">
            {/* LEFT: Logo Block */}
            <div className="flex items-center gap-3">
                <svg
                    className="w-8 h-8"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <defs>
                        <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#1d4ed8" />
                            <stop offset="100%" stopColor="#0f172a" />
                        </linearGradient>
                    </defs>
                    {/* Hexagon Shield */}
                    <path
                        d="M16 2L28 8V16C28 24 16 30 16 30C16 30 4 24 4 16V8L16 2Z"
                        fill="url(#shieldGrad)"
                        stroke="#3b82f6"
                        strokeWidth="1.5"
                    />
                    {/* Checkmark inside */}
                    <path
                        d="M11 16L14 19L21 12"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
                <div className="hidden sm:block">
                    <p className="text-sm font-semibold text-white">FinShield</p>
                    <p className="text-xs text-slate-500">by TrustShield AI</p>
                </div>
            </div>

            {/* CENTER: Navigation (desktop only) */}
            <div className="hidden lg:flex items-center gap-8">
                <a href="#" className="text-xs font-medium text-slate-400 hover:text-white transition">Overview</a>
                <a href="#" className="text-xs font-medium text-white border-b-2 border-blue-500 pb-1">Risk Engine</a>
                <a href="#" className="text-xs font-medium text-slate-400 hover:text-white transition">Transactions</a>
                <a href="#" className="text-xs font-medium text-slate-400 hover:text-white transition">Reports</a>
                <a href="#" className="text-xs font-medium text-slate-400 hover:text-white transition">Settings</a>
            </div>

            {/* RIGHT: Status & User */}
            <div className="flex items-center gap-4">
                {/* Demo Mode Badge */}
                <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800">
                    <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span className="text-xs font-medium text-slate-300">Demo Mode</span>
                </div>

                {/* Notification Bell */}
                <button className="relative p-2 text-slate-400 hover:text-white transition">
                    <Bell size={18} />
                    <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
                </button>

                {/* User Avatar */}
                <button className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 text-white text-xs font-semibold hover:from-blue-500 hover:to-blue-700 transition">
                    SA
                </button>
            </div>
        </nav>
    );
};

export default TopNav;
