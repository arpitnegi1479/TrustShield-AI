import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';

export const AppLayout: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    // Extract customer or case ID from parameterized routes
    const match = location.pathname.match(/\/(customer|investigation|reports|ai-copilot)\/([^/]+)/);
    if (match && match[2]) {
      localStorage.setItem('activeCustomerId', match[2]);
    }
  }, [location]);

  return (
    <div className="w-full min-h-screen bg-background text-on-surface flex overflow-hidden">
      {/* Collapsible Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 ml-16 flex flex-col h-screen overflow-hidden">
        {/* Top Header Bar */}
        <TopBar />

        {/* Scrollable Viewport */}
        <main className="flex-1 overflow-y-auto hide-scrollbar">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
