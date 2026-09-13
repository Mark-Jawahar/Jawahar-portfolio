export interface CaseStudy {
  id: string;
  title: string;
  company: string;
  category: string;
  summary: string;
  challenge: string;
  situation: string;
  actions: string[];
  tools: string[];
  collaboration: string;
  result: string;
  learnings: string;
}

export const caseStudies: CaseStudy[] = [
  {
    id: "hello-mentor-onboarding",
    title: "Scaling Learner Onboarding",
    company: "Hello Mentor",
    category: "Customer Onboarding",
    summary:
      "Structured onboarding for 500+ learners with checklists, templates, and CRM tracking, cutting onboarding time 20% and confusion 40%.",
    challenge:
      "Learners enrolled but didn't know what happened next. Follow-ups were inconsistent, and onboarding confusion surfaced as repetitive support queries and low early engagement.",
    situation:
      "Hello Mentor was onboarding 500+ learners end to end. Handoffs between Admissions, Product, Operations, and Support were fragmented, and there was no single source of truth for a learner's onboarding status.",
    actions: [
      "Mapped the end-to-end onboarding journey and documented every step from enrollment to program commencement.",
      "Created standardized onboarding checklists and communication templates used consistently across every touchpoint.",
      "Tracked each learner's progress in the CRM so nobody fell through the gaps between teams.",
      "Ran regular follow-ups with learners and parents to drive engagement and surface issues early.",
    ],
    tools: ["CRM (Zoho)", "Onboarding checklists", "Communication templates", "Feedback analysis"],
    collaboration:
      "Admissions, Product, Operations, and Marketing — with learners and parents as the ultimate stakeholders.",
    result:
      "Onboarding became consistent and predictable: learners started programs with clear expectations, onboarding-related support queries dropped significantly, onboarding time reduced 20%, and both customer satisfaction and operational efficiency improved.",
    learnings:
      "A clear process and one source of truth remove more friction than any single tool ever could.",
  },
  {
    id: "hello-mentor-repeat-queries",
    title: "Reducing Repeat Customer Queries",
    company: "Hello Mentor",
    category: "Customer Experience Operations",
    summary:
      "Built a knowledge base and proactive communication cadence that cut repeat queries 30% and saved 15+ support hours weekly.",
    challenge:
      "Customers repeated the same questions across channels. Support spent hours answering identical queries instead of solving new problems. No centralized knowledge base existed.",
    situation:
      "With 500+ active learners and a growing parent base, support volume was rising. Repeat contacts clustered around onboarding steps, payment timelines, and platform navigation — all solvable with better self-serve resources.",
    actions: [
      "Analyzed 3 months of support tickets to identify the top 20 repeat query patterns.",
      "Built a searchable knowledge base with step-by-step guides, FAQs, and video walkthroughs.",
      "Designed a proactive communication cadence: pre-emptive emails at key milestones (enrollment, payment, program start, first session).",
      "Created a query-reduction playbook so new team members could resolve common issues without escalation.",
    ],
    tools: ["Zoho Desk", "Knowledge base", "Email automation", "Support analytics"],
    collaboration:
      "Support, Product, Operations, and Marketing — content reviews and milestone alignment.",
    result:
      "Repeat contacts reduced by 30%, saving 15+ support hours per week. First-contact resolution improved, and the team shifted focus from reactive answers to proactive journey improvements.",
    learnings:
      "Proactive communication beats reactive support. The best ticket is the one the customer never needs to open.",
  },
  {
    id: "hello-mentor-team-performance",
    title: "Improving CX Team Performance",
    company: "Hello Mentor",
    category: "Team Leadership & Operations",
    summary:
      "Led a 10-member CX team with KPI dashboards, 1:1 coaching, and performance plans, improving team productivity 20% and CSAT 25%.",
    challenge:
      "As the team grew to 10 members, quality variance increased. No shared KPI framework existed, coaching was ad-hoc, and escalation ownership was unclear.",
    situation:
      "Promoted to Assistant Team Lead in Mar 2026. Inherited a team handling onboarding, support, and escalations for 500+ learners. Needed to standardize performance management while maintaining customer experience quality.",
    actions: [
      "Implemented weekly KPI dashboards tracking CSAT, first-response time, resolution time, escalation rate, and onboarding completion.",
      "Established structured 1:1s with each team member: metrics review, coaching on specific interactions, and action items.",
      "Created performance improvement plans for underperforming areas with clear milestones and support resources.",
      "Defined escalation ownership and SLAs — achieved zero escalation breaches over 12 months.",
      "Collaborated with Product and Marketing to surface top customer pain points as structured feedback for roadmap prioritization.",
    ],
    tools: ["Zoho CRM", "Zoho Desk", "Zoho Analytics", "Weekly KPI dashboards", "1:1 coaching framework"],
    collaboration:
      "Product, Sales, Marketing, and Operations — cross-functional feedback loops and UX improvements.",
    result:
      "Team productivity improved 20%. CSAT rose 25%. Zero escalation breaches for 12 consecutive months. Three major UX pain points resolved through cross-functional collaboration.",
    learnings:
      "Visibility drives accountability. When the team sees the same metrics the leader sees, ownership becomes shared, not assigned.",
  },
  {
    id: "nobrokers-transactions",
    title: "Managing 80+ Concurrent Property Transactions",
    company: "NoBrokers.com",
    category: "Stakeholder Management",
    summary:
      "Kept 80+ concurrent property transactions moving with clear ownership, escalation discipline, and a 48-hour SLA.",
    challenge:
      "High transaction volume with multiple stakeholders made it easy for deals to stall. Escalations were reactive, and customers lost confidence when they didn't know who was handling what.",
    situation:
      "NoBrokers.com ran 80+ concurrent buy, sell, and rent transactions. Buyers, sellers, and internal teams all needed reliable status updates and fast resolution.",
    actions: [
      "Managed a high-volume queue of transactions, giving each deal a clear owner and an up-to-date status.",
      "Standardized escalation handling and committed to resolving client escalations within a 48-hour SLA.",
      "Conducted locality and pricing analyses to match customers with the right opportunities faster.",
      "Negotiated between buyers, sellers, and field teams to unblock deals and protect customer trust.",
    ],
    tools: ["CRM", "Call scripts", "SLA tracking", "Locality and pricing analysis"],
    collaboration:
      "Field Relationship Managers, Sales, and Operations — plus both sides of every transaction.",
    result:
      "Deals moved faster with fewer silent gaps, escalations were resolved within SLA, and customers trusted the process enough to stay engaged through to closure.",
    learnings:
      "In high-stakes, high-volume work, clear ownership and service levels build more trust than any single interaction.",
  },
  {
    id: "dalztek-lead-qualification",
    title: "Lead Qualification Workflow",
    company: "Dalztek Online Services",
    category: "Lead Management",
    summary:
      "Qualified 150+ leads a month with a repeatable, documented workflow that made follow-up quality consistent.",
    challenge:
      "Lead volume varied month to month, and follow-up quality depended on who picked up the phone. Data lived in spreadsheets, and documentation was thin.",
    situation:
      "Dalztek qualified 150+ inbound and outbound leads every month across domestic and international loan products. Customers needed clear guidance through a high-stakes application journey.",
    actions: [
      "Built a simple qualification checklist so every lead was assessed consistently before handoff.",
      "Documented the process and tracked every lead in Excel — status, follow-up schedule, and next action.",
      "Guided customers step by step through eligibility, documentation, and application procedures.",
      "Coordinated with internal teams to keep document verification and processing moving.",
    ],
    tools: ["Excel tracking", "Qualification checklists", "Process documentation", "Call scripts"],
    collaboration:
      "Marketing, Sales, and Operations teams that owned the funnel upstream and downstream.",
    result:
      "Follow-up became consistent and traceable, customers got accurate guidance at every step, and conversion and experience quality both improved.",
    learnings:
      "Volume stops being a risk the moment a process is repeatable and every customer is trackable.",
  },
];