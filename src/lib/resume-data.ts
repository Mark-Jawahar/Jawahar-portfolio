export const profile = {
  name: "Jawahar A",
  role: "Customer Experience Specialist",
  headline: "5+ years transforming customer journeys across EdTech, Real Estate, and Financial Services. Currently leading onboarding and success initiatives at Hello Mentor.",
  roles: [
    "Customer Experience Specialist",
    "Assistant Team Lead",
    "Customer Success Advocate",
    "Process Optimisation Enthusiast",
  ],
  about: "Customer experience leader with 5+ years of expertise in customer onboarding, lifecycle management, and process excellence. Currently leading onboarding initiatives for 500+ learners at Hello Mentor, where I standardize processes, collaborate with cross-functional teams, and drive measurable improvements in customer satisfaction and operational efficiency. My career spans EdTech, Real Estate, and Financial Services, giving me a versatile perspective on customer success across industries.",
  location: "Bengaluru, Karnataka",
  email: "markjawahar17@gmail.com",
  phone: "+91 9620151434",
  linkedin: "https://linkedin.com/in/jawahar-a-47037a240",
  linkedinDisplay: "linkedin.com/in/jawahar-a-47037a240",
  instagram: "https://www.instagram.com/monsieur_heart_10",
  whatsapp: "https://wa.me/919620151434",
  experience: "5+ Years",
  resumeLastUpdated: "July 2026",
  resumeUrl: "/resume/Jawahar_A_Resume.pdf",
  portraitUrl: "/images/profile.png",
};

export const highlights = [
  { value: "500+", label: "Learners Onboarded" },
  { value: "5+", label: "Years of Experience" },
  { value: "25%", label: "CSAT Improvement" },
  { value: "30%", label: "Query Reduction" },
  { value: "80+", label: "Concurrent Transactions" },
  { value: "150+", label: "Customer Leads Managed Monthly" },
];

export const summaryHighlights = [
  { label: "Customer Onboarding", desc: "500+ learners" },
  { label: "Process Excellence", desc: "30% query reduction" },
  { label: "CRM Expertise", desc: "Zoho Suite" },
  { label: "Cross-functional", desc: "Admissions, Product, Ops" },
];

export type Experience = {
  company: string;
  role: string;
  location: string;
  period: string;
  description: string;
  achievements: string[];
  responsibilities: string[];
};

export const experiences: Experience[] = [
  {
    company: "Hello Mentor",
    role: "Customer Experience Specialist",
    location: "Bengaluru",
    period: "Sep 2024 — Present",
    description: "Leading customer onboarding and success initiatives for 500+ learners across the EdTech platform.",
    achievements: [
      "End-to-end onboarding for 500+ learners",
      "Standardized processes reducing confusion by 30%",
      "Cross-functional collaboration with Admissions, Product, Operations",
      "Improved retention through proactive engagement",
    ],
    responsibilities: [
      "Managed end-to-end customer onboarding for 500+ learners, ensuring a seamless transition from enrollment to program commencement.",
      "Served as the primary point of contact for students and parents, providing timely support and resolving queries.",
      "Created and standardized onboarding checklists, communication templates, and customer support processes.",
      "Collaborated with Admissions, Product, Operations, and Marketing teams to resolve customer concerns.",
      "Conducted regular follow-ups to improve engagement and build long-term customer relationships.",
      "Maintained accurate customer records using CRM tools and analyzed feedback for process improvements.",
    ],
  },
  {
    company: "NoBrokers.com",
    role: "Relationship Manager",
    location: "Bengaluru",
    period: "Sep 2023 — June 2024",
    description: "Managed high-volume property transactions and client relationships in a fast-paced real estate marketplace.",
    achievements: [
      "Managed 80+ concurrent property transactions",
      "48-hour SLA on client escalations",
      "Improved deal conversion through pricing analysis",
      "Cross-functional workflow optimization",
    ],
    responsibilities: [
      "Managed 80+ concurrent property transactions ensuring end-to-end client satisfaction.",
      "Conducted locality and pricing analyses to identify matching opportunities faster.",
      "Resolved client escalations within a 48-hour SLA, maintaining high satisfaction scores.",
      "Collaborated with cross-functional teams to streamline workflows.",
      "Negotiated between multiple stakeholders to resolve conflicts and accelerate deal closures.",
    ],
  },
  {
    company: "Daztek Online Services Pvt Ltd",
    role: "Senior Lead Generation Executive",
    location: "Bengaluru",
    period: "July 2021 — Aug 2023",
    description: "Managed lead qualification and customer acquisition for domestic and international financial products.",
    achievements: [
      "150+ qualified leads managed monthly",
      "Consistently achieved monthly targets",
      "End-to-end loan application guidance",
      "Cross-border customer management",
    ],
    responsibilities: [
      "Qualified and managed 150+ inbound and outbound customer leads each month.",
      "Assisted customers throughout the loan application journey with clear guidance.",
      "Maintained accurate customer records and sales pipelines using Excel.",
      "Coordinated with internal teams for document verification and query resolution.",
      "Consistently achieved monthly performance targets through customer-centric service.",
    ],
  },
];

export type Skill = {
  category: string;
  icon: string;
  items: string[];
};

export const skills: Skill[] = [
  { category: "Customer Success", icon: "Users", items: ["Onboarding", "Lifecycle Management", "Account Management", "Escalation Management", "Technical Support"] },
  { category: "Operations & Analytics", icon: "BarChart3", items: ["Process Improvement", "CSAT Management", "CRM Management", "Data Analysis", "Cross-functional Collaboration"] },
  { category: "Tools & Platforms", icon: "Wrench", items: ["Zoho CRM", "Zoho Desk", "Zoho SalesIQ", "MS Excel", "Google Sheets"] },
  { category: "Languages", icon: "Globe", items: ["English (Professional)", "Tamil (Native)", "Kannada (Professional)", "Telugu (Conversational)"] },
  { category: "Leadership", icon: "Brain", items: ["Team Coaching", "Process Design", "Mentoring", "Stakeholder Management"] },
  { category: "Education", icon: "GraduationCap", items: ["B.Com - SSMRV College", "Bengaluru, 2021"] },
];

export const education = {
  degree: "Bachelor of Commerce (B.Com)",
  college: "SSMRV College",
  year: "2021",
  location: "Bengaluru",
};

export const projects = [
  { title: "AI Website Builder", description: "Built an AI-powered website creation tool using Next.js, exploring prompt engineering and automated site generation.", tags: ["Next.js", "AI", "Prompt Engineering"], category: "AI" },
  { title: "Customer Experience Automation", description: "Designed automated workflows for customer onboarding, reducing manual touchpoints and improving response times.", tags: ["Automation", "Process Design", "Zoho"], category: "Automation" },
  { title: "Figma Design Explorations", description: "Learning product design and UI/UX principles through hands-on projects in Figma, focusing on customer-facing interfaces.", tags: ["Figma", "UI/UX", "Product Design"], category: "Design" },
  { title: "Portfolio Design System", description: "Created a comprehensive design system with glassmorphism, premium typography, and cinematic animations.", tags: ["Design Systems", "CSS", "Animation"], category: "Design" },
  { title: "CX Concept Projects", description: "Developed customer experience improvement concepts including feedback loops, journey mapping, and NPS frameworks.", tags: ["CX Strategy", "Journey Mapping", "NPS"], category: "CX" },
  { title: "Website Creation", description: "Built multiple responsive websites exploring modern web technologies and premium UI patterns.", tags: ["Next.js", "Responsive", "Performance"], category: "Development" },
];

export const socialLinks = [
  { platform: "LinkedIn", url: "https://linkedin.com/in/jawahar-a-47037a240", icon: "linkedin", label: "Connect on LinkedIn" },
  { platform: "Instagram", url: "https://www.instagram.com/monsieur_heart_10", icon: "instagram", label: "Follow on Instagram" },
  { platform: "WhatsApp", url: "https://wa.me/919620151434", icon: "whatsapp", label: "Chat on WhatsApp" },
  { platform: "Email", url: "mailto:markjawahar17@gmail.com", icon: "mail", label: "Send an Email" },
];

export const chapters = [
  { id: "introduction", label: "Introduction", number: "01" },
  { id: "profile", label: "About", number: "02" },
  { id: "impact", label: "Impact", number: "03" },
  { id: "journey", label: "Journey", number: "04" },
  { id: "projects", label: "Projects", number: "05" },
  { id: "resume", label: "Resume", number: "06" },
  { id: "connect", label: "Connect", number: "07" },
];
