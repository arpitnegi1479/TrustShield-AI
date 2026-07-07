"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runCollusionDetectionAgent = runCollusionDetectionAgent;
function runCollusionDetectionAgent(req, user) {
    const nodes = [{ id: user.id, label: user.name, risk: user.riskProfile }];
    const links = [];
    // Add linked accounts based on user
    if (user.id === 'USR-001') {
        nodes.push({ id: 'ACC-001', label: 'Trusted Partner', risk: 'low' });
        links.push({ source: user.id, target: 'ACC-001', strength: 0.5 });
    }
    else if (user.id === 'USR-002') {
        nodes.push({ id: 'ACC-002', label: 'Business Associate', risk: 'medium' });
        nodes.push({ id: 'ACC-003', label: 'Family Account', risk: 'low' });
        links.push({ source: user.id, target: 'ACC-002', strength: 0.6 });
        links.push({ source: user.id, target: 'ACC-003', strength: 0.4 });
    }
    else if (user.id === 'USR-003') {
        nodes.push({ id: 'ACC-004', label: 'High Risk Link', risk: 'high' });
        nodes.push({ id: 'ACC-005', label: 'Shared Account', risk: 'high' });
        nodes.push({ id: 'ACC-006', label: 'Suspicious Partner', risk: 'high' });
        nodes.push({ id: 'ACC-007', label: 'Another Link', risk: 'medium' });
        links.push({ source: user.id, target: 'ACC-004', strength: 0.8 });
        links.push({ source: user.id, target: 'ACC-005', strength: 0.9 });
        links.push({ source: user.id, target: 'ACC-006', strength: 0.7 });
        links.push({ source: user.id, target: 'ACC-007', strength: 0.5 });
        links.push({ source: 'ACC-004', target: 'ACC-005', strength: 0.6 });
    }
    else if (user.id === 'USR-004') {
        nodes.push({ id: 'ACC-008', label: 'API Partner', risk: 'low' });
        links.push({ source: user.id, target: 'ACC-008', strength: 0.3 });
    }
    else if (user.id === 'USR-005') {
        nodes.push({ id: 'ACC-005', label: 'Shared Account', risk: 'high' });
        nodes.push({ id: 'ACC-009', label: 'New Link', risk: 'high' });
        links.push({ source: user.id, target: 'ACC-005', strength: 0.9 });
        links.push({ source: user.id, target: 'ACC-009', strength: 0.8 });
    }
    else if (user.id === 'USR-006') {
        nodes.push({ id: 'ACC-010', label: 'Loan Partner', risk: 'medium' });
        nodes.push({ id: 'ACC-011', label: 'Credit Account', risk: 'low' });
        links.push({ source: user.id, target: 'ACC-010', strength: 0.7 });
        links.push({ source: user.id, target: 'ACC-011', strength: 0.5 });
    }
    const sharedLinks = links.filter((l) => l.source === user.id).length;
    const newAccountPenalty = user.accountAgeDays < 60 ? 20 : 0;
    const networkRiskScore = Math.min(sharedLinks * 15 + newAccountPenalty, 100);
    return { networkRiskScore, collusionGraph: { nodes, links } };
}
