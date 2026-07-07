"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeDecision = makeDecision;
function makeDecision(score, req) {
    let threshold = 50;
    if (req.useCase === 'loan' && req.loanAmount && req.loanAmount > 1000000) {
        threshold = 60; // Need 60+ to approve large loans
    }
    if (score >= 80)
        return 'APPROVE';
    if (score >= threshold)
        return 'VERIFY';
    return 'FLAG';
}
