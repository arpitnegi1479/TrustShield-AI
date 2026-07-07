import type { ComponentType, SVGProps } from 'react';

export interface InvestigationFactor {
    factor: string;
    score: number;
    weight: number;
    status: 'good' | 'warning' | 'danger';
    detail: string;
}

export interface InvestigationNode {
    id: string;
    label: string;
    risk: 'low' | 'medium' | 'high';
}

export interface InvestigationLink {
    source: string;
    target: string;
    strength: number;
}

export interface InvestigationCaseData {
    id: string;
    name: string;
    riskProfile: 'low' | 'medium' | 'high';
    defaults: {
        amount: number;
        useCase: string;
        location?: string;
        deviceType?: string;
        loginHour?: number;
        loanAmount?: number;
        emi?: number;
    };
    transactionHistory: Array<{ amount: number; location: string; date: string }>;
    deviceHistory: string[];
    accountAgeDays: number;
}

export interface InvestigationAnalysis {
    trustScore: number;
    decision: 'APPROVE' | 'VERIFY' | 'FLAG';
    reasons: string[];
    factors: InvestigationFactor[];
    collusionGraph: {
        nodes: InvestigationNode[];
        links: InvestigationLink[];
    };
}

export interface InvestigationTimelineItem {
    title: string;
    meta: string;
    icon: ComponentType<{ className?: string }>;
}

export interface InvestigationNodeDetails {
    name: string;
    score: number;
    risk: string;
    rel: string;
    history: string;
}

export type IconComponent = ComponentType<{ className?: string }>;
