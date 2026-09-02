import { SkillCategory, Experience, Project, Education, CurrentStatus, NavItem } from './types';

export const PROFILE = {
  name: 'Ranjith Ramadass',
  role: 'AI Integration Specialist · Enterprise Automation Architect · EU AI Act Expert',
  bio: 'Pioneering compliant, production-ready AI integrations across Germany and Europe. Combining deep LLM orchestration (Claude Opus, Gemini 2.5, GPT-4o) and autonomous multi-agent pipelines with rigorous EU AI Act & DSGVO compliance. Founder of CipherPolice and creator of PROJKT 360 DEGREE.',
  email: '007ranjithr.v@gmail.com',
  altEmail: 'ranjithrv1605@gmail.com',
  phone: '+49 1551 0174187',
  location: 'Hannover, Germany',
  linkedin: 'https://www.linkedin.com/in/ranjith',
  github: 'https://github.com/Ranjith1605',
  linktree: 'https://linktr.ee/ranjithrv007',
  cipherpolice: 'https://cipherpolice.com',
  cipherpoliceDe: 'https://cipherpolice.de',
  availability: 'Available for AI Integration & Consulting',
};

export const NAV_ITEMS: NavItem[] = [
  { id: 'hero', label: 'Bridge' },
  { id: 'coordinates', label: 'Coordinates' },
  { id: 'arsenal', label: 'Arsenal' },
  { id: 'mission-log', label: 'Mission Log' },
  { id: 'simulations', label: 'Projects' },
  { id: 'academy', label: 'Academy & Thesis' },
  { id: 'dream', label: 'Vision 360°' },
  { id: 'comms', label: 'Comms' },
];

export const CURRENT_COORDINATES: CurrentStatus[] = [
  {
    role: 'Lead Architect — PROJKT 360 DEGREE',
    institution: 'Autonomous AI Second Brain & Multi-Agent Engine',
    detail: 'Building an enterprise-grade 360° AI agent orchestration layer with multi-model synthesis (Claude, Gemini, OpenAI) and automated RAG pipelines.',
    icon: '⚡',
    color: 'cyan',
  },
  {
    role: 'Founder & Lead AI Product Developer',
    institution: 'CipherPolice (cipherpolice.com | cipherpolice.de)',
    detail: 'Pioneering AI-driven browser security with a 35+ rule leak guard, session risk interceptors, and automated EU AI Act compliance checks.',
    icon: '🛡️',
    color: 'green',
    link: 'https://cipherpolice.com',
    linkText: 'Visit cipherpolice.com',
  },
  {
    role: 'KI-Entwickler & Enterprise Automation',
    institution: 'Studyheads · Hannover & Salzgitter',
    detail: 'Developing and deploying automated logistics REST-API integrations in Python (DHL parcel workflows) and internal LLM business automations.',
    icon: '⚙️',
    color: 'amber',
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'AI, LLMs & Multi-Agent Systems',
    variant: 'cyan',
    skills: [
      { name: 'Claude 3.7 / Opus' },
      { name: 'Gemini 2.5 Pro / Flash' },
      { name: 'GPT-4o & OpenAI APIs' },
      { name: 'Multi-Agent Orchestration' },
      { name: 'RAG Architecture (Pinecone, Voyage AI)' },
      { name: 'Supabase Vector' },
      { name: 'Advanced Prompt Engineering' },
      { name: 'Agentic Tools & Function Calling' },
      { name: 'Computer Vision Integration' },
    ],
  },
  {
    title: 'AI Governance & EU AI Act Compliance',
    variant: 'green',
    skills: [
      { name: 'EU AI Act Compliance Frameworks' },
      { name: 'DSGVO / GDPR Data Privacy' },
      { name: 'AI Risk Classification (High/Low/Unacceptable)' },
      { name: 'Secret & Credential Leak Guard (35+ Rules)' },
      { name: 'Prompt Injection Defense' },
      { name: 'Compliance Audit Reports' },
    ],
  },
  {
    title: 'Backend, Cloud & Automation',
    variant: 'amber',
    skills: [
      { name: 'Python (FastAPI, Flask, Automation)' },
      { name: 'TypeScript & Node.js' },
      { name: 'REST API Design & Integration' },
      { name: 'Supabase Edge Functions' },
      { name: 'Upstash Redis & Rate Limiting' },
      { name: 'AWS & Cloud Architecture' },
      { name: 'Docker & Server Deployment' },
      { name: 'Git & GitHub CI/CD' },
    ],
  },
  {
    title: 'Frontend, Mobile & Data Intelligence',
    variant: 'cyan',
    skills: [
      { name: 'React 19 & Next.js' },
      { name: 'React Native (Mobile AI Apps)' },
      { name: 'Tailwind CSS & Framer Motion' },
      { name: 'Power BI & Tableau' },
      { name: 'SQL & Data Pipelines' },
      { name: 'Google Business Intelligence Certified' },
    ],
  },
];

export const EXPERIENCE: Experience[] = [
  {
    period: 'Mar 2026 – Present',
    role: 'KI-Entwickler / Werkstudent – Digital Business & Automation',
    company: 'Studyheads',
    location: 'Hannover & Salzgitter, Germany',
    description: 'Engineered and deployed an automated DHL parcel address verification and shipping pipeline via Python REST APIs for client Mambocat. Built internal LLM automations (Claude, Gemini, Perplexity) streamlining repetitive business operations.',
    tags: ['Python', 'REST APIs', 'DHL Automation', 'LLM Integration', 'Server Deployment'],
    isCurrent: true,
  },
  {
    period: 'Nov 2025 – Present',
    role: 'Founder & Lead AI Product Developer',
    company: 'CipherPolice',
    location: 'Hannover, Germany · cipherpolice.com / cipherpolice.de',
    description: 'Architected and launched an AI-driven browser cybersecurity extension featuring a 35+ prefix-anchored leak-guard engine (intercepting AWS, Anthropic, GCP, Slack, and database credentials) and automated EU AI Act compliance scanning.',
    tags: ['AI Security', 'Leak Guard', 'EU AI Act', 'TypeScript', 'Supabase', 'Clerk'],
    isCurrent: true,
  },
  {
    period: 'Jul 2025 – Mar 2026',
    role: 'AI Developer',
    company: 'LENSAI (Smart Glasses)',
    location: 'San Francisco, USA / Remote',
    description: 'Developed computer vision and multimodal AI modules for smart glasses. Built low-latency hardware-to-cloud pipelines connecting edge sensors to Python backends.',
    tags: ['Computer Vision', 'Wearable AI', 'Python', 'Edge Computing', 'APIs'],
    isCurrent: false,
  },
  {
    period: 'Jul 2025 – Nov 2025',
    role: 'Freelance AI/AR Full-Stack Developer',
    company: 'LAIFE GmbH',
    location: 'Berlin, Germany / Remote',
    description: 'Prototyped AI- and AR-driven features for mobile applications using React Native, Supabase, and AWS. Optimized data structures and rendering pipelines, cutting application latency by 40%.',
    tags: ['React Native', 'Supabase', 'AWS', 'Performance Optimization', 'AR Prototyping'],
    isCurrent: false,
  },
  {
    period: 'Mar 2025 – Sep 2025',
    role: 'AI Business Development',
    company: 'BACKWARDSLA',
    location: 'Indiana, USA / Remote',
    description: 'Conducted market intelligence and lead qualification in the B2B AI landscape. Structured technical pipelines for scalable AI enterprise integrations.',
    tags: ['B2B Strategy', 'Market Analysis', 'Enterprise AI Pipelines'],
    isCurrent: false,
  },
  {
    period: 'Aug 2023 – Oct 2025',
    role: 'Service Leadership & Operations Resilience',
    company: 'Fettluke',
    location: 'Harz, Germany',
    description: 'Led fast-paced team coordination in high-pressure system gastronomy, funding engineering and Master studies while demonstrating exceptional resilience and communication.',
    tags: ['Leadership', 'High Resilience', 'Intercultural Communication'],
    isCurrent: false,
  },
];

export const PROJECTS: Project[] = [
  {
    title: 'PROJKT 360 DEGREE',
    role: 'Lead Architect & AI Engineer',
    description: 'An autonomous 360° AI second brain and multi-agent system orchestrating multi-model reasoning (Claude Opus, Gemini 2.5, GPT-4o), vector knowledge retrieval (Voyage AI / Pinecone), and automated execution pipelines.',
    tech: ['Multi-Agent Systems', 'Claude Opus', 'Gemini Flash', 'Pinecone', 'Voyage AI', 'Python'],
    highlight: 'Flagship Autonomous AI',
    github: 'https://github.com/Ranjith1605',
  },
  {
    title: 'CipherPolice AI Security & Compliance Shield',
    role: 'Founder & Lead Developer',
    description: 'Real-time AI security tool protecting sensitive data with a 35+ rule leak guard, hidden tracker detection, session risk defense, and automated EU AI Act compliance checks.',
    tech: ['AI Security', 'Browser Extension', 'EU AI Act', 'Supabase', 'Clerk', 'TypeScript'],
    highlight: 'Live Cybersecurity Product',
    link: 'https://cipherpolice.com',
    linkText: 'cipherpolice.com',
    github: 'https://github.com/Ranjith1605/cipherpolice',
  },
  {
    title: 'Enterprise Logistics API Automation (DHL)',
    role: 'AI & Automation Engineer — Studyheads',
    description: 'Production-grade DHL parcel and address validation engine built with Python REST APIs for client Mambocat, automating manual fulfillment operations and eliminating delivery errors.',
    tech: ['Python', 'REST API', 'DHL Logistics', 'Server Deployment', 'Data Validation'],
    highlight: 'Enterprise Automation',
  },
  {
    title: 'EU AI Act Compliance & Governance Playbook',
    role: 'Lead Researcher — Master Thesis',
    description: 'Comprehensive research and implementation framework for human-centric AI adoption, regulatory risk-tier classification, and audit compliance under the EU AI Act & DSGVO.',
    tech: ['EU AI Act', 'DSGVO / GDPR', 'Risk Classification', 'AI Governance', 'Research'],
    highlight: 'Regulatory Authority',
  },
  {
    title: 'LENSAI Smart Glasses Vision Pipeline',
    role: 'AI & Computer Vision Developer',
    description: 'Hardware-integrated AI pipeline enabling real-time visual recognition, spatial data processing, and contextual audio overlays on lightweight smart glasses.',
    tech: ['Computer Vision', 'Python', 'OpenCV', 'Embedded Hardware', 'APIs'],
    highlight: 'Wearable AI',
  },
  {
    title: 'StoryBridge Mobile Storytelling Platform',
    role: 'Full-Stack & Mobile AI Developer',
    description: 'Interactive social storytelling mobile platform connecting generative prompt chains with cloud synchronization and community interaction.',
    tech: ['React Native', 'TypeScript', 'Supabase', 'AWS', 'LLM APIs'],
    highlight: 'Mobile & Full-Stack',
  },
];

export const EDUCATION: Education[] = [
  {
    period: '2023 – 2026',
    degree: 'M.Eng. Technologie- und Innovationsmanagement',
    institution: 'Hochschule Harz (Harz University of Applied Sciences), Germany',
    focus: "Master Thesis: Human-Centric AI Adoption & Integration in Organizations / EU AI Act Compliance Frameworks (Case Study: CipherPolice)",
    badge: 'Master of Engineering',
    isCurrent: false,
  },
  {
    period: '2025 – Present',
    degree: 'Impact MBA (Sustainability, Innovation & Leadership)',
    institution: 'Tomorrow University of Applied Sciences, Berlin, Germany',
    focus: 'Data Mastery, Responsible Innovation & Technology Leadership',
    badge: 'MBA in Progress',
    isCurrent: true,
  },
  {
    period: '2018 – 2022',
    degree: 'B.Eng. Mechanical Engineering',
    institution: 'Chennai Institute of Technology, India',
    focus: 'Systems Engineering, Dynamics, Embedded Logic & Sensor Control',
    badge: 'Bachelor of Engineering',
    isCurrent: false,
  },
];

export const CERTIFICATIONS = [
  { title: 'Google Business Intelligence Specialization', issuer: 'Google', year: '2025' },
  { title: 'IBM AI Product Developer', issuer: 'IBM', year: '2025' },
  { title: 'IBM AI Product Manager', issuer: 'IBM', year: '2025' },
];
