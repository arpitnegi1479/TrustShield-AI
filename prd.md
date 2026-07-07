# TrustShield AI — Hackathon PRD (Stitch-Ready, MVP Scope)

> **Scope note:** This is trimmed from the full product vision to 4 core screens buildable in a 3-day hackathon sprint: Landing Page, AI Command Center, AI Copilot, Fraud/Risk Investigation. Full roadmap (Loan Intelligence, Customer Intelligence, Zero Trust Center, Reports, Threat Intel, Settings) is listed at the bottom as a "Coming Next" slide — not built for the demo.

## Project Context

TrustShield AI is an AI-powered Enterprise Banking Intelligence Platform — an "AI Operating System for Banks." It is NOT a banking website or loan portal. AI is the primary interaction model, not a bolt-on chatbot.

**Backend is already built and is NOT being redesigned.** This PRD is frontend-only. Assume these APIs exist and use mock data shaped to match them:
- Fraud Detection Engine → fraud probability, suspicious transaction flags, risk explanation
- Zero Trust / Risk Engine → trust score (0–100), risk tier (Flag/Verify/Approve), component sub-scores (CDA, IPA, TDE, TRA)
- AI Copilot → natural-language Q&A over the above, with explainable citations

## Objective

Impress judges within 10 seconds. The product should look like it raised a Series A, not like a student project. But go one level further than "looks polished": judges should feel like **the AI is already awake and working** before they've clicked anything. This is the difference between "nice dashboard" and "AI Operating System" — the AI is not a feature you open, it's the thing that's running the moment the page loads.

**Reframe test for every screen:** if you removed the AI, would the screen still basically work? If yes, the AI isn't the hero yet — redesign until the answer is no.

## Design Inspiration

Stripe, Linear, Vercel, Cursor, Perplexity, Notion AI, Palantir Foundry — but as a floor, not a ceiling. Pulling only from these produces a very good *dark SaaS* look, which is not the same as an *original* look. **Avoid:** generic admin templates, Bootstrap/Material default styling, bright banking-blue themes, dense KPI tables, clipart icons, and — new — generic radial/circular gauges, floating chat widgets, and stock "neural network" AI-brain iconography.

## Signature Visual System: "Signal Network"

This is the one idea every other decision below hangs off. **TrustShield AI doesn't display data — it shows trust as a living signal moving through a network.** Concretely:

- Every place the AI reasons, moves between data sources, or connects evidence is rendered as a **thin glowing line with a pulse of light traveling along it** — the same visual grammar everywhere (thinking states, explainability timeline, chat-to-dashboard updates all use this one motif).
- Color language is restricted to three signal states, used sparingly against a near-black obsidian base: **living green** (trust/approve — slightly desaturated, not mint), **amber pulse** (verify/uncertain), **coral flare** (risk/flag). No default blue-purple gradient soup.
- One distinctive display typeface for numbers and headlines that feels engineered rather than decorative (think Stripe's number-forward feel), clean sans for body copy.
- Glassmorphism and floating surfaces are still used, but sparingly — as containers for the signal network, not as decoration on every card.

This system is what a judge will remember and describe to someone else afterward ("the one where the AI's thinking looks like pulses of light moving through the interface") — that's the bar.

## Trust Score: "Trust Pulse" (signature identity, replaces any gauge)

Not a radial progress ring. The Trust Score is visualized as a **living waveform, like a heartbeat monitor for a transaction** — a horizontal pulse line that:
- Runs continuously left to right, like an ECG strip, with the current score as the rightmost live point
- Amplitude and color shift in real time based on signal state (calm, tight, green wave = trust; sharp coral spike = risk event)
- Each spike or dip is tagged with the factor that caused it (identity check, device anomaly, network risk) — hovering or tapping a spike reveals that factor inline, without leaving the graph
- The numeric score (0–100) sits directly on the live point of the wave, not off to the side in a separate number
- Historical strip behind the live point shows the last several transactions' pulses, so patterns are visible at a glance

This single component should appear, in some form, on the Landing Page (as ambient proof-of-life), the AI Command Center, and the Fraud Investigation screen — it's the through-line that makes the product feel like one system, not four separate screens.

## AI Thinking State (make the AI feel alive, without exposing reasoning)

Whenever the AI is working — in chat, or auto-running on page load — show a short sequence of high-level status lines, each one lighting up a node on the Signal Network motif as it completes, e.g.:

`Checking transaction history →` `Evaluating behavioral anomalies →` `Running relationship intelligence →` `Calculating trust score →` `Generating summary`

These are plain-language progress labels only — never chain-of-thought or internal reasoning detail. Animate each line in with a soft fade + the signal-pulse traveling to the next node, roughly 400–600ms per step. This should feel closer to watching a system think than watching a spinner.

## Motion Design (build in React/Framer Motion AFTER Stitch export — Stitch does not generate animations)

- Signal pulses traveling along connective lines (the core recurring animation — thinking states, timeline, chat-to-UI updates)
- Trust Pulse waveform animating in real time as new data arrives
- Streaming AI responses with typing animation
- Animated counters on metrics
- Card hover elevation
- Loading skeletons
- Smooth page transitions

## Screens (build in this order — each must stand alone if you run out of time)

### 1. Landing Page — "The AI is already working" (Day 1 priority — this is the first 10 seconds)
Do not open on a static hero with a headline and a screenshot. Open on **proof that the system is alive**:
- Above the fold: a live-feeling activity strip already animating on load — anonymized transaction pulses arriving one by one along a Signal Network line, each briefly tagged ("Transaction screened · Trust 94" / "Anomaly flagged · Reviewing..."). This runs before the user does anything.
- Headline overlays this activity rather than sitting above it in a dead zone — the AI's work is the background texture of the hero, not a separate section below it
- A single live Trust Pulse strip visible in the hero as ambient proof-of-life, not yet tied to any specific transaction
- 3-feature strip (Fraud Detection, Zero Trust Scoring, AI Copilot) stays, but each icon should itself be a small looping signal-pulse animation, not a static Lucide icon
- Single CTA: "Enter Command Center" → skip auth entirely for the demo (the word "Dashboard" doesn't appear anywhere in the product's language)

### 2. AI Command Center (formerly "Dashboard") — Day 1–2
Reframe the mental model: this is not a dashboard the AI feeds data into — it's **the AI's workspace, which happens to show you what it's doing**.
- The AI Insights panel leads the page, above the metrics, not below them — 2–3 natural-language observations the AI has already generated ("3 transactions this hour show elevated network risk — reviewing now"), each with a live thinking-state animation if freshly generated
- Metric cards (Trust Index, Active Alerts, Transactions Screened, System Health) still exist but are secondary — smaller, quieter, supporting evidence for what the AI just said, not the headline
- A persistent Trust Pulse strip runs across the top, showing the aggregate trust waveform across recent activity
- Recent investigations list, each row showing a mini Signal Network trail instead of a plain timestamp+status row
- The AI Copilot is not a "quick action button" — it's a persistent command layer (see Screen 3) reachable from anywhere via a single keystroke or an always-visible input bar docked at the bottom, Cursor/Linear-command-palette style, not a chat icon in a corner

### 3. AI Copilot — deeply integrated, not floating (Day 2 — the heart of the demo)
The critical shift: **this is not a chat panel beside the app — asking the AI a question should visibly change the rest of the interface in real time.**
- Docked command bar, always accessible, ChatGPT/Claude/Perplexity-quality streaming responses
- Suggested prompts on load: "Why was this transaction flagged?", "Summarize today's fraud cases", "Explain this trust score"
- While the AI answers, show the **AI Thinking State** sequence (see above) instead of a blank loading gap
- As the answer streams, the surrounding screen reacts live: the relevant Trust Pulse spike highlights itself, an evidence card slides in from the side, the Explainability Timeline (below) auto-expands to the step being discussed — the chat is narrating changes that are actually happening on screen, not just printing text
- Responses render rich inline cards (a Trust Pulse snippet, a small chart) rather than plain text blocks
- Follow-up question chips appear after each response, generated to feel like the AI is anticipating the next question, not a static FAQ list

### 4. Fraud/Risk I
nvestigation (Day 2–3 — wire this to your real backend, it's your working core)
- Transaction Setup input panel (reuse your existing working logic/fields)
- Trust Pulse as the centerpiece visualization (see Trust Pulse spec above) — this replaces any gauge
- **AI Explainability Timeline** — the signature interaction of the product. A vertical sequence of steps, each a node on the Signal Network line, lighting up in order as the AI reasons through the decision:
  `Transaction Received → Identity Verification → Behavior Analysis → Relationship Analysis → Device Trust → Risk Calculation → Decision → Explainable AI Summary`
  Each node, once lit, shows a one-line result (e.g. "Device Trust — recognized device, low anomaly"). The final node expands into the plain-language decision summary. This should animate node-by-node (signal pulse traveling down the line) rather than appearing all at once — it's the moment a judge watches the AI *show its work*.
- Decision panel: Flag / Verify / Approve, color-matched to the Signal Network palette, with the AI-generated explanation pulled from the timeline's final node
- This screen is the payoff of the whole product: Trust Pulse shows *what* the AI concluded, the Explainability Timeline shows *how* it got there

## Technical Requirements (for your dev phase — not for Stitch generation)

Stitch will export static HTML/Tailwind. Plan to hand these off into:
- React + Vite + TypeScript
- TailwindCSS + shadcn/ui for components
- Framer Motion for the motion design listed above
- Recharts for any charts inside the AI Copilot cards

Keep components API-ready: props-driven, no hardcoded mock data baked into JSX — pull from a single mock-data file you can later swap for real API calls.

## Things to Avoid

Generic admin templates, flat cards, cramped layouts, excessive tables, bright banking blue, dull KPI screens, stock AI-robot iconography, radial/circular score gauges, floating chat widgets that don't affect the rest of the screen, the word "Dashboard" in the product's own UI copy.

## UX Philosophy

For every screen: *if a judge looked at this for 20 seconds, would they understand the AI value immediately — and would it feel like the AI was already working before they arrived?* If not, cut it or redesign it. Prioritize insight over data. Tell a story, don't present a form. The AI is the protagonist; the UI is how you watch it work.

---

## Coming Next (mention in pitch, do not build)

Customer Intelligence · Loan Intelligence · Relationship Intelligence (network graph) · Zero Trust Center · Threat Intelligence · Reports & Compliance · Enterprise SSO / Settings

Frame this as: *"This is the MVP core — the platform is architected to extend into full relationship-graph fraud rings, loan explainability, and compliance reporting."* One roadmap slide with 6 icons does the job better than 6 half-built screens.
