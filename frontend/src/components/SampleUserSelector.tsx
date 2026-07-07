import React from 'react';
import { useTrust } from '../context/TrustContext';
import { User } from 'lucide-react';

const SampleUserSelector: React.FC = () => {
  const { dispatch } = useTrust();

  const users = [
    { id: 'USR-001', name: 'Priya Sharma', avatar: '👩', risk: 'low', defaults: { userId: 'USR-001', amount: 50000, deviceType: 'mobile' as const, location: 'Mumbai', loginHour: 10, useCase: 'payment' as const } },
    { id: 'USR-002', name: 'Rahul Mehta', avatar: '👨', risk: 'medium', defaults: { userId: 'USR-002', amount: 200000, deviceType: 'desktop' as const, location: 'Delhi', loginHour: 14, loanAmount: 500000, emi: 15000, useCase: 'loan' as const } },
    { id: 'USR-003', name: 'Anika Patel', avatar: '👩‍💼', risk: 'high', defaults: { userId: 'USR-003', amount: 300000, deviceType: 'unknown' as const, location: 'Ahmedabad', loginHour: 2, useCase: 'transaction' as const } },
    { id: 'USR-004', name: 'Dev Kapoor', avatar: '👨‍💻', risk: 'low', defaults: { userId: 'USR-004', amount: 10000, deviceType: 'desktop' as const, location: 'Pune', loginHour: 9, useCase: 'api_monitor' as const } },
    { id: 'USR-005', name: 'Sana Qureshi', avatar: '👩‍🎓', risk: 'high', defaults: { userId: 'USR-005', amount: 150000, deviceType: 'mobile' as const, location: 'Kolkata', loginHour: 1, useCase: 'transaction' as const } },
    { id: 'USR-006', name: 'Arjun Nair', avatar: '👨‍🏫', risk: 'medium', defaults: { userId: 'USR-006', amount: 250000, deviceType: 'mobile' as const, location: 'Chennai', loginHour: 16, loanAmount: 750000, emi: 20000, useCase: 'loan' as const } },
  ];

  const handleSelect = (userId: string) => {
    const user = users.find(u => u.id === userId);
    if (user) {
      dispatch({ type: 'SET_INPUT', payload: user.defaults });
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'text-emerald-400';
      case 'medium': return 'text-amber-400';
      case 'high': return 'text-red-400';
      default: return 'text-slate-400';
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <User size={16} className="text-slate-500" />
        <label className="block text-xs uppercase tracking-wider text-slate-400 font-semibold">Quick Load Demo User</label>
      </div>
      <select
        onChange={(e) => handleSelect(e.target.value)}
        className="w-full rounded-lg border border-[#1e293b] bg-[#0d1424] px-3.5 py-2.5 text-sm text-white outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
      >
        <option value="">Choose a demo user...</option>
        {users.map(user => (
          <option key={user.id} value={user.id}>
            {user.avatar} {user.name} — {user.risk} risk
          </option>
        ))}
      </select>
    </div>
  );
};

export default SampleUserSelector;