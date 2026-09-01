import { SkillCategory, Experience, Project, Education, CurrentStatus, NavItem } from './types';

export const PROFILE = {
  name: 'Ranjith Ramadass',
  role: 'AI Integration Specialist | AI Project Manager & Developer',
  bio: 'I integrate the latest AI models into real products and workflows — seamlessly, and with deep research behind every decision. Based in Hannover, Germany, I have led an AI product end-to-end for 10 months (concept to working build) and shipped LLM automations into production. Master\'s thesis: the human-centred, EU AI Act-aligned introduction of AI projects in public and private organisations. Currently building Projkt 360° and CipherPolice — and open to AI development work.',
  location: 'Hannover, Germany',
  email: 'ranjithrv1605@gmail.com',
  linkedin: 'https://www.linkedin.com/in/ranjith-ramadass-1591a819a',
  github: 'https://github.com/Ranjith1605',
  availability: 'Open to AI development roles & projects',
};

export const NAV_ITEMS: NavItem[] = [
  { id: 'hero', label: 'Bridge' },
  { id: 'coordinates', label: 'Coordinates' },
  { id: 'arsenal', label: 'Arsenal' },
  { id: 'mission-log', label: 'Mission Log' },
  { id: 'simulations', label: 'Archive' },
  { id: 'academy', label: 'Academy' },
  { id: 'dream', label: 'The Dream' },
  { id: 'comms', label: 'Comms' },
];

export const CURRENT_COORDINATES: CurrentStatus[] = [
  {
    role: 'Founder — AI Orchestration System',
    institution: 'Projkt 360°',
    detail: 'A self-built, multi-agent system on Claude Code that runs my research, content and product pipelines end-to-end — GitHub repos, an Obsidian second brain and automated workflows wired into one loop.',
    icon: '🛰️',
    color: 'cyan',
  },
  {
    role: 'Founder & Project Lead',
    institution: 'CipherPolice',
    detail: 'AI-driven browser extension for digital privacy. Built as a full company simulation with sole product ownership — roadmap, agile delivery and QA — from concept to working build. cipherpolice.com | cipherpolice.de',
    icon: '🛡️',
    color: 'green',
  },
  {
    role: 'AI Developer (Werkstudent) — Digital Business & Automation',
    institution: 'Studyheads · Hannover',
    detail: 'Finding automation potential in business processes and taking it to production — e.g. an automated DHL address-validation pipeline on Ubuntu servers, plus LLM automations (Claude, Gemini, Perplexity) for internal data flows.',
    icon: '⚙️',
    color: 'amber',
  },
  {
    role: 'Impact MBA — Master Thesis',
    institution: 'Tomorrow University · Berlin',
    detail: 'Thesis: the human-centred introduction of AI projects in public and private-sector organisations, including EU AI Act compliance. Focus: Sustainability, Innovation & Leadership.',
    icon: '🎓',
    color: 'cyan',
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'AI Integration',
    variant: 'cyan',
    skills: [
      { name: 'LLM Integration (Claude, Gemini, GPT)' }, { name: 'Prompt Engineering' },
      { name: 'Agentic Workflows (Claude Code)' }, { name: 'RAG & Vector Search' },
      { name: 'Process Automation' }, { name: 'Computer Vision Integration' },
      { name: 'API Integration' }, { name: 'AI Research' },
    ],
  },
  {
    title: 'Engineering & Data',
    variant: 'amber',
    skills: [
      { name: 'Python' }, { name: 'TypeScript' }, { name: 'React' }, { name: 'React Native' },
      { name: 'REST APIs' }, { name: 'SQL' }, { name: 'Supabase' }, { name: 'Linux (Ubuntu)' },
      { name: 'Git / GitHub' }, { name: 'AWS' }, { name: 'Azure (Basics)' }, { name: 'Power BI' },
    ],
  },
  {
    title: 'Project Management & Regulatory',
    variant: 'green',
    skills: [
      { name: 'Scrum & Kanban' }, { name: 'Requirements Analysis' }, { name: 'Roadmap Planning' },
      { name: 'Stakeholder Communication' }, { name: 'EU AI Act' }, { name: 'Privacy-by-Design' },
      { name: 'GDPR (DSGVO)' }, { name: 'Cross-Cultural Communication' },
    ],
  },
];

export const EXPERIENCE: Experience[] = [
  {
    period: 'Mar 2026 – Present',
    role: 'AI Developer (Werkstudent) — Digital Business & Automation',
    company: 'Studyheads',
    location: 'Hannover, Germany',
    description: 'Analysing business processes for AI automation potential and delivering it to production. Built an automated DHL address-validation pipeline (Python, DHL developer toolkits) on Ubuntu servers, cutting misdeliveries and returns in e-commerce. LLM automations for internal data processes, from prompt design to deployment.',
    tags: ['Process Automation', 'Python', 'LLM Integration', 'Linux'],
    isCurrent: true,
  },
  {
    period: 'Sep 2025 – Present',
    role: 'Founder & Project Lead (self-initiated AI project)',
    company: 'CipherPolice',
    location: 'Hannover · cipherpolice.com | cipherpolice.de',
    description: 'Ten months of full ownership of an AI product — an AI-driven browser extension for digital privacy — set up as a complete company simulation. Requirements analysis, roadmap, Scrum/Kanban delivery with a small dev team, QA of the AI detection workflow and milestone/risk reporting.',
    tags: ['AI', 'Privacy', 'Browser Extension', 'Product Leadership'],
    isCurrent: true,
  },
  {
    period: 'Jul 2025 – Mar 2026',
    role: 'AI Developer',
    company: 'LensAI',
    location: 'Remote (San Francisco, USA)',
    description: 'Production cloud backend (Lens Cloud) for real-time AI features on smart glasses — Python services and computer-vision integration. REST API integration between device, cloud services and AI models in an international remote team.',
    tags: ['Python', 'Computer Vision', 'Cloud Backend', 'REST APIs'],
    isCurrent: false,
  },
  {
    period: 'Jul 2025 – Nov 2025',
    role: 'Freelance AI / AR Developer',
    company: 'LAIFE GmbH (StoryBridge)',
    location: 'Remote (Berlin)',
    description: 'AI/AR prototyping for a React Native mobile app; load times reduced by 40% (Supabase, AWS). Deployment and operation of the platform on Linux servers.',
    tags: ['React Native', 'Supabase', 'AWS', 'Performance'],
    isCurrent: false,
  },
  {
    period: 'Mar 2025 – Sep 2025',
    role: 'AI Business Development',
    company: 'BACKWARDSLA',
    location: 'Remote',
    description: 'Identified and qualified new clients in the AI sector. Built structured lead pipelines and analysed target markets.',
    tags: ['Sales', 'Market Analysis', 'AI Business'],
    isCurrent: false,
  },
  {
    period: 'Dec 2024 – May 2025',
    role: 'Business Development Intern',
    company: 'GAO Tek',
    location: 'Remote',
    description: 'Market analysis and lead generation. Collaborated with international teams on outreach campaigns.',
    tags: ['Market Research', 'Lead Generation'],
    isCurrent: false,
  },
  {
    period: '2024',
    role: 'Marketing Research (Erasmus)',
    company: 'KINESIS.EU',
    location: 'Groningen, Netherlands',
    description: 'Developed strategic marketing models based on UN sustainability research. Aligned objectives with the SDGs.',
    tags: ['Research', 'Sustainability', 'SDGs'],
    isCurrent: false,
  },
  {
    period: '2023 – 2025',
    role: 'Service (Werkstudent)',
    company: 'Fettluke',
    location: 'Harz, Germany',
    description: 'High-pressure system gastronomy alongside my studies. Where the resilience and people skills come from.',
    tags: ['Communication', 'Resilience'],
    isCurrent: false,
  },
  {
    period: '2022',
    role: 'Intern & Bachelor Thesis',
    company: 'Gokul Autotech',
    location: 'Chennai, India',
    description: 'Mechanical engineering internship and bachelor thesis in an automotive manufacturing environment.',
    tags: ['Mechanical Engineering', 'Manufacturing'],
    isCurrent: false,
  },
];

export const PROJECTS: Project[] = [
  {
    title: 'Projkt 360°',
    role: 'Founder & Architect',
    description: 'An AI orchestration system built on Claude Code: specialised agents and skills that turn my thesis research, an Obsidian second brain and a network of GitHub repos into one automated loop — research, content, product development and company operations. Compliance-aware by design (EU AI Act, GDPR).',
    tech: ['Claude Code', 'Multi-Agent Systems', 'Obsidian', 'GitHub', 'RAG'],
    highlight: 'AI Orchestration Flagship',
  },
  {
    title: 'CipherPolice',
    role: 'Founder & Project Lead',
    description: 'AI-driven browser extension for digital privacy — detecting malicious patterns without compromising performance. Built as a full company simulation with sole product ownership over 10 months. Visit: cipherpolice.com | cipherpolice.de',
    tech: ['AI Security', 'Browser Extension', 'LLM', 'Privacy-by-Design'],
    highlight: 'Privacy & Security',
  },
  {
    title: 'The AI Realization Playbook',
    role: 'Master Thesis — Tomorrow University',
    description: 'Human-centred, EU AI Act-aligned introduction of AI projects in public and private-sector organisations. Risk classification, compliance models and an adoption framework practitioners can actually use.',
    tech: ['EU AI Act', 'AI Governance', 'Change Management', 'Research'],
    highlight: 'AI Governance',
  },
  {
    title: 'LensAI Smart Glasses',
    role: 'AI Developer',
    description: 'Production cloud backend for real-time AI features on smart glasses. Python services, computer-vision integration and REST APIs between device, cloud and models.',
    tech: ['Python', 'Computer Vision', 'Cloud', 'REST APIs'],
    highlight: 'Wearable AI',
  },
  {
    title: 'StoryBridge (LAIFE GmbH)',
    role: 'Freelance AI / AR Developer',
    description: 'AI-powered social storytelling app. AI/AR prototyping in React Native with a 40% load-time reduction; deployed and operated on Linux servers.',
    tech: ['React Native', 'TypeScript', 'Supabase', 'AWS', 'LLM APIs'],
    highlight: 'AI-Powered Storytelling',
  },
  {
    title: 'Thirukkural GPT',
    role: 'NLP Researcher',
    description: 'AI-powered semantic search and explanation engine for the Tamil classic Thirukkural. Preserves poetic nuance while providing accurate interpretations.',
    tech: ['LLM', 'Python', 'NLP', 'React'],
    highlight: 'Cultural AI',
  },
  {
    title: 'DHL Address-Validation Pipeline',
    role: 'AI Developer — Studyheads',
    description: 'Automated address validation for e-commerce shipping (Python, DHL developer toolkits) running as a pipeline on Ubuntu servers — fewer misdeliveries and returns.',
    tech: ['Python', 'Linux', 'Automation', 'E-Commerce'],
    highlight: 'Process Automation',
  },
];

export const EDUCATION: Education[] = [
  {
    period: '2025 – Present',
    degree: 'Impact MBA — Sustainability, Innovation & Leadership',
    institution: 'Tomorrow University of Applied Sciences',
    focus: 'Master thesis: introducing AI projects in public and private-sector organisations (EU AI Act) | Berlin, Germany',
    isCurrent: true,
  },
  {
    period: '2023 – 2025',
    degree: 'M.Eng. — Technology & Innovation Management',
    institution: 'Harz University of Applied Sciences',
    focus: 'Wernigerode, Germany — transferred to Tomorrow University',
    isCurrent: false,
  },
  {
    period: '2018 – 2022',
    degree: 'B.Eng. — Mechanical Engineering',
    institution: 'Chennai Institute of Technology',
    focus: 'Chennai, India',
    isCurrent: false,
  },
];

export const CERTIFICATES = [
  'IBM AI Product Manager',
  'IBM AI Developer',
  'Tomorrow University — Strategic Innovation',
  'Tomorrow University — IoT & New Technologies',
  'Google Business Intelligence Specialization (2025)',
];

export const LANGUAGES = [
  { name: 'English', level: 'C1' },
  { name: 'German', level: 'B2' },
  { name: 'Tamil', level: 'Native' },
];
