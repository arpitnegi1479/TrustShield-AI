# TrustShield AI

Real-Time Trust Intelligence Platform

## Overview

TrustShield AI is a production-grade fintech hackathon prototype that provides real-time trust scoring for financial transactions. It analyzes user behavior, network connections, and transaction patterns to determine trust levels and recommend actions like approval, verification, or flagging.

The platform features:
- Multi-agent AI analysis (Intent Prediction, Network Risk, Transaction Anomaly, etc.)
- Interactive collusion network visualization
- Loan simulation with parameter adjustment
- Explainable AI with factor breakdowns and improvement suggestions
- Dark theme UI with animated components

## Architecture

```
trustshield-ai/
├── backend/ (Node.js + Express + TypeScript)
│   ├── agents/ (7 AI agents for analysis)
│   ├── services/ (Trust scoring and decision engine)
│   ├── routes/ (API endpoints)
│   └── data/ (Mock user data)
└── frontend/ (React + Vite + TypeScript)
    ├── components/ (UI components)
    ├── context/ (Global state management)
    ├── hooks/ (API integration)
    └── lib/ (Axios setup)
```

## Tech Stack

| Layer     | Technology                                      |
|-----------|-------------------------------------------------|
| Frontend  | React 18 + Vite + TailwindCSS + Recharts        |
| Backend   | Node.js 20 + Express 5                          |
| Language  | TypeScript (strict mode) throughout             |
| Charts    | Recharts (gauge, bar, line)                     |
| Graph     | react-force-graph-2d (collusion network)        |
| Icons     | lucide-react                                    |
| Styling   | TailwindCSS + CSS variables (dark theme)        |
| State     | React Context + useReducer (no Redux)           |
| HTTP      | Axios (frontend) + express-validator (backend)  |
| Fake Data | Custom seed file — no third-party faker libs    |

## Setup Instructions

1. **Backend Setup:**
   ```bash
   cd backend
   npm install
   npm run dev
   ```
   Server runs on http://localhost:3001

2. **Frontend Setup:**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   App runs on http://localhost:5173

3. Open http://localhost:5173 in your browser

## Demo Users

| ID      | Name          | Risk Profile | Use Case    | Description                                      |
|---------|---------------|--------------|-------------|--------------------------------------------------|
| USR-001 | Priya Sharma  | Low          | Payment     | Consistent device, Mumbai, normal hours          |
| USR-002 | Rahul Mehta   | Medium       | Loan        | Mixed devices, occasional off-hours logins       |
| USR-003 | Anika Patel   | High         | Transaction | Multiple locations, large spikes                 |
| USR-004 | Dev Kapoor    | Low          | API Monitor | Clean API usage, stable patterns                 |
| USR-005 | Sana Qureshi  | High         | Transaction | New account, unusual network links               |
| USR-006 | Arjun Nair    | Medium       | Loan        | Mid-credit profile, moderate EMI ratio           |

## Demo Flow

1. Load sample user Anika Patel (High Risk)
2. Analyze → See FLAG decision with low score
3. Switch to Priya Sharma (Low Risk) → APPROVE
4. Try Rahul Mehta (Loan) → Simulation panel appears
5. Adjust EMI slider → Recalculate to see score changes

## Features

- **Real-time Analysis:** 800ms response time simulation
- **Interactive Graph:** Force-directed network visualization
- **Loan Simulation:** Adjust parameters and see trust impact
- **Explainable AI:** Detailed factor breakdowns and reasons
- **Responsive Design:** Works on desktop and mobile
- **Dark Theme:** Professional fintech aesthetic

## API Endpoints

- `POST /api/analyze` - Analyze trust for a transaction
- `POST /api/simulate` - Simulate trust with modified parameters

## License

This is a hackathon prototype. Use for educational purposes only.