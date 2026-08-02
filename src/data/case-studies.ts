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
    title: "Improving Customer Onboarding",
    company: "Hello Mentor",
    category: "Customer Onboarding",
    summary:
      "Rebuilt the onboarding flow so 500+ learners start their programs with clarity instead of confusion.",
    challenge:
      "Learners enrolled, but many didn't know what happened next. Follow-ups were inconsistent, and onboarding confusion surfaced as repetitive support queries and low early engagement.",
    situation:
      "Hello Mentor was onboarding 500+ learners end to end. Handoffs between Admissions, Product, Operations, and Support were fragmented, and there was no single source of truth for a learner's onboarding status.",
    actions: [
      "Mapped the end-to-end onboarding journey and documented every step from enrollment to program commencement.",
      "Created standardized onboarding checklists and communication templates used consistently across every touchpoint.",
      "Tracked each learner's progress in the CRM so nobody fell through the gaps between teams.",
      "Ran regular follow-ups with learners and parents to drive engagement and surface issues early.",
    ],
    tools: ["CRM", "Onboarding checklists", "Communication templates", "Feedback analysis"],
    collaboration:
      "Admissions, Product, Operations, and Marketing — with learners and parents as the ultimate stakeholders.",
    result:
      "Onboarding became consistent and predictable: learners started their programs with clear expectations, onboarding-related support queries dropped, and customer satisfaction and operational efficiency both improved.",
    learnings:
      "A clear process and one source of truth remove more friction than any single tool ever could.",
  },
  {
    id: "nobrokers-transactions",
    title: "Managing High-Volume Property Transactions",
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
    id: "daztek-lead-qualification",
    title: "Lead Qualification Workflow",
    company: "Daztek Online Services",
    category: "Lead Management",
    summary:
      "Qualified 150+ leads a month with a repeatable, documented workflow that made follow-up quality consistent.",
    challenge:
      "Lead volume varied month to month, and follow-up quality depended on who picked up the phone. Data lived in spreadsheets, and documentation was thin.",
    situation:
      "Daztek qualified 150+ inbound and outbound leads every month across domestic and international loan products. Customers needed clear guidance through a high-stakes application journey.",
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
  {
    id: "journey-improvement",
    title: "Customer Journey Improvement",
    company: "Conceptual Case Study",
    category: "CX Strategy",
    summary:
      "A structured approach to finding, prioritizing, and fixing the moments where customers feel friction.",
    challenge:
      "Customers dropped off at the same predictable moments, and complaints clustered around a handful of touchpoints nobody had ever mapped.",
    situation:
      "A conceptual case study: applying journey mapping to a service flow with clear funnel leaks and recurring support themes.",
    actions: [
      "Mapped the journey end to end, from first touch to post-purchase, capturing every touchpoint and handoff.",
      "Overlaid feedback and support data to identify the pain points that mattered most to customers.",
      "Prioritized fixes by impact and effort, then defined the KPIs that would prove improvement.",
    ],
    tools: ["Journey mapping", "Feedback analysis", "CSAT / NPS", "Support data"],
    collaboration:
      "Product, Support, and Marketing — anyone who owns a moment of the customer journey.",
    result:
      "A prioritized roadmap that turns the journey's worst moments into its smoothest ones, with clear KPIs to prove the change.",
    learnings: "Data shows you where customers struggle; empathy explains why. You need both.",
  },
  {
    id: "crm-process-optimization",
    title: "CRM & Process Optimization",
    company: "Conceptual Case Study",
    category: "Process Optimization",
    summary:
      "How standardized processes and clean CRM data make every customer interaction more consistent.",
    challenge:
      "Records were scattered across tools and tribal knowledge. The same question was answered differently depending on who answered it.",
    situation:
      "A conceptual study of a team where ad-hoc workflows and inconsistent CRM hygiene were quietly eroding service quality.",
    actions: [
      "Audited the current process to find duplicated steps, gaps, and handoffs that dropped the ball.",
      "Standardized the workflow and documented it so new team members could ramp faster.",
      "Cleaned CRM data, defined mandatory fields, and made accurate records the default rather than the exception.",
    ],
    tools: ["CRM", "SOPs", "Process documentation", "Data audits"],
    collaboration: "Operations, Sales, and Support teams that live in the same records every day.",
    result:
      "Fewer errors, faster onboarding for new team members, and a consistent experience for customers — with measurable efficiency gains for the business.",
    learnings: "The process is the product. Improve the process and you improve every interaction that runs on it.",
  },
];
