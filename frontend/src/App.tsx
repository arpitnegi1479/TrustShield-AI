import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LandingPage } from './components/LandingPage';
import { AppLayout } from './components/AppLayout';
import { IntelligenceCenter } from './pages/IntelligenceCenter';
import { FraudInvestigation } from './pages/FraudInvestigation';
import { UnderConstruction } from './components/UnderConstruction';
import { AICopilot } from './pages/AICopilot';

import { CustomerIntelligence } from './pages/CustomerIntelligence';
import { CustomerProfile } from './pages/CustomerProfile';
import { InvestigationReport } from './pages/InvestigationReport';
import { PlatformArchitecture } from './pages/PlatformArchitecture';
import { Settings } from './pages/Settings';

const RedirectWithActiveCustomer: React.FC<{ target: string }> = ({ target }) => {
  const activeId = localStorage.getItem('activeCustomerId') || 'USR-RT990';
  return <Navigate to={`/${target}/${activeId}`} replace />;
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Standalone Landing Page Route */}
        <Route path="/" element={<LandingPage />} />

        {/* Global Layout Shell Routes */}
        <Route element={<AppLayout />}>
          <Route path="/intelligence-center" element={<IntelligenceCenter />} />
          <Route path="/customer-intelligence" element={<CustomerIntelligence />} />
          <Route path="/customer/:customerId" element={<CustomerProfile />} />
          
          <Route path="/investigation/:caseId" element={<FraudInvestigation />} />
          <Route path="/fraud-investigation" element={<RedirectWithActiveCustomer target="investigation" />} />
          
          <Route path="/ai-copilot/:caseId" element={<AICopilot />} />
          <Route path="/ai-copilot" element={<RedirectWithActiveCustomer target="ai-copilot" />} />

          <Route path="/reports/:caseId" element={<InvestigationReport />} />
          <Route path="/reports" element={<RedirectWithActiveCustomer target="reports" />} />

          <Route path="/platform-architecture" element={<PlatformArchitecture />} />
          <Route path="/settings" element={<Settings />} />
        </Route>

        {/* Catch-all Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;