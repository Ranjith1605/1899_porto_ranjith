import { SkillCategory, Experience, Project, Education, CurrentStatus, NavItem } from './types';

export const PROFILE = {
  name: 'Ranjith Ramadass',
  role: 'AI Alchemist · Superintelligence Architect',
  tagline: 'AI Agents & Automation · AI Security · Human-Centred AI · EU AI Act',
  bio: 'AI Alchemist who takes LLM-powered applications and automations from idea to production with Python, REST APIs and server deployment. Hands-on experience from LENSAI, LAIFE and CipherPolice, including project management; EU AI Act expertise from my master\'s thesis and research.',
  email: 'ranjithrv1605@gmail.com',
  phone: '+49 1551 0174187',
  location: 'Hannover, Germany',
  linkedin: 'https://www.linkedin.com/in/ranjith',
  github: 'https://github.com/Ranjith1605',
  linktree: 'https://linktr.ee/ranjithrv007',
  cipherpolice: 'https://cipherpolice.com',
  cipherpoliceDe: 'https://cipherpolice.de',
  avatar: '/ranjith-avatar.jpg',
  availability: 'Open to AI development roles & projects',
  languages: 'English (C1) · German (B2) · Tamil (native)',
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
    role: 'AI Developer, Web Team (via Zenjob)',
    institution: 'Yoga Vidya e. V. · since Aug 2026',
    detail: 'Building an LLM agent with an MCP server for the TYPO3 website, so the web team can work on content through AI tool calls.',
    icon: '🌿',
    color: 'amber',
  },
  {
    role: 'Founder & Developer',
    institution: 'CipherPolice · cipherpolice.com · since Oct 2025',
    detail: 'Self-developed privacy-first security project: Chrome MV3 extension, LLM leak guard, AES-256 vault and a header scanner with SSRF protection.',
    icon: '🛡️',
    color: 'green',
    link: 'https://cipherpolice.com',
    linkText: 'Visit cipherpolice.com',
  },
  {
    role: 'Impact MBA Candidate · Master\'s Thesis',
    institution: 'Tomorrow University, Berlin · until Dec 2026',
    detail: 'Thesis on human-centred AI adoption in organisations, with CipherPolice as the case study; builds on my 2025 EU AI Act research project.',
    icon: '🎓',
    color: 'cyan',
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'AI & Machine Learning',
    variant: 'cyan',
    skills: [
      { name: 'LLM Integration (Claude, OpenAI, Gemini, Mistral)' },
      { name: 'MCP Tool Calling' },
      { name: 'RAG (Pinecone)' },
      { name: 'Human-in-the-Loop Agents' },
      { name: 'Ollama (Local LLMs)' },
      { name: 'Computer Vision' },
      { name: 'AI Training Data' },
    ],
  },
  {
    title: 'Security & Compliance',
    variant: 'green',
    skills: [
      { name: 'Privacy by Design' },
      { name: 'Chrome Extensions (MV3)' },
      { name: 'Web Crypto (AES-256-GCM)' },
      { name: 'CSP & Security Headers' },
      { name: 'SSRF Protection' },
      { name: 'GDPR' },
      { name: 'EU AI Act' },
    ],
  },
  {
    title: 'Programming, Backend & Cloud',
    variant: 'amber',
    skills: [
      { name: 'Python (since 2020)' },
      { name: 'TypeScript / JavaScript' },
      { name: 'SQL · PHP · Swift · Java' },
      { name: 'REST APIs & FastAPI' },
      { name: 'Supabase (Edge Functions, Postgres/RLS)' },
      { name: 'AWS · Vercel · Docker' },
      { name: 'Linux (Ubuntu)' },
      { name: 'Git/GitHub · CI/CD (GitHub Actions)' },
    ],
  },
  {
    title: 'Frontend, Data & Engineering Tools',
    variant: 'cyan',
    skills: [
      { name: 'React & React Native' },
      { name: 'Data Pipelines & Workflow Automation' },
      { name: 'TYPO3' },
      { name: 'Power BI & Tableau' },
      { name: 'Vitest' },
      { name: 'Fusion 360 · CATIA · SolidWorks (basic)' },
      { name: 'Apple Vision Pro (Early Access)' },
    ],
  },
];

export const EXPERIENCE: Experience[] = [
  {
    period: 'Jul 2023 – Sep 2026',
    role: 'Working Student, Multiple Assignments',
    company: 'Zenjob',
    location: 'Germany',
    description: 'Yoga Vidya e. V. (Aug 2026 – present): AI developer in the web team, building an LLM agent with an MCP server for TYPO3. MicroAGI (Jul – Sep 2026): recorded AI training data with a head-strap camera. Hospitality & service, incl. Fettluke.de in the Harz (food service, meat preparation, PHP/APIs), plus stadium beverage sales and warehouse work at many locations.',
    tags: ['LLM Agents', 'MCP', 'TYPO3', 'AI Training Data', 'PHP/APIs'],
    isCurrent: true,
  },
  {
    period: 'Feb 2026 – Jul 2026',
    role: 'Working Student, AI Development',
    company: 'Studyheads',
    location: 'Hannover, Germany',
    description: 'Automation: DHL address validation via REST API integration in Python, running in production on servers (client project Mambocat, Salzgitter). AI processes: automated internal business processes with Claude, Gemini and Perplexity.',
    tags: ['Python', 'REST APIs', 'DHL Integration', 'Server Deployment', 'LLM Automation'],
    isCurrent: false,
  },
  {
    period: 'Jul 2025 – Mar 2026',
    role: 'AI Development & Cloud Architecture',
    company: 'LENSAI',
    location: 'Remote (San Francisco / Los Angeles)',
    description: 'Smart glasses: AI and computer-vision features; Python cloud backend with scalable AI modules via REST APIs.',
    tags: ['Computer Vision', 'Smart Glasses', 'Python', 'Cloud Backend', 'REST APIs'],
    isCurrent: false,
  },
  {
    period: 'Jul 2025 – Nov 2025',
    role: 'AI/AR Development',
    company: 'LAIFE GmbH',
    location: 'Remote (Berlin)',
    description: 'Mobile app: AI/AR prototyping in React Native; cut load times by about 40% (Supabase, AWS).',
    tags: ['React Native', 'AI/AR Prototyping', 'Supabase', 'AWS'],
    isCurrent: false,
  },
  {
    period: 'Aug 2025 – Dec 2025',
    role: 'Working Student, Operations & Fleet Mechanics',
    company: 'Lime',
    location: 'Berlin, Germany',
    description: 'E-bike and e-scooter repair and fleet operations.',
    tags: ['Operations', 'Fleet Mechanics', 'Hardware'],
    isCurrent: false,
  },
  {
    period: 'Jan 2025 – Dec 2025',
    role: 'Freelance AI Business Development',
    company: 'BACKWARDSLA · GAO Tek',
    location: 'Remote (USA)',
    description: 'Freelance AI business development for two remote clients.',
    tags: ['AI Business Development', 'Remote', 'B2B'],
    isCurrent: false,
  },
  {
    period: 'Jan 2024 – Jun 2024',
    role: 'Erasmus+ Internship, Research & Marketing Research',
    company: 'Hanzehogeschool Groningen · Kinesis / Krachtkoppeling',
    location: 'Netherlands',
    description: 'Project on three pumping stations in Groningen, linked to the UN goals and AI. Presented on 21 March 2024; feedback: "I have never seen a piece of work like this."',
    tags: ['Research', 'UN SDGs', 'AI', 'Erasmus+'],
    isCurrent: false,
  },
];

export const PROJECTS: Project[] = [
  {
    title: 'CipherPolice',
    role: 'Self-Developed AI Project · Oct 2025 – present',
    description: 'Full-stack privacy-first security product: Chrome MV3 extension, LLM leak guard, AES-256 vault and a header scanner with SSRF protection. Also an MCP server, RAG on the EU AI Act, Vitest, CI and team sprints. Available in German, English and Tamil.',
    tech: ['React', 'TypeScript', 'Vite', 'Vercel', 'Supabase Edge Functions', 'Postgres (RLS)', 'Chrome MV3'],
    highlight: 'Flagship Project',
    link: 'https://cipherpolice.com',
    linkText: 'cipherpolice.com',
    github: 'https://github.com/Ranjith1605/cipherpolice',
  },
  {
    title: 'TYPO3 LLM Agent with MCP Server',
    role: 'AI Developer — Yoga Vidya e. V.',
    description: 'An LLM agent connected to TYPO3 through an MCP server, so the web team can carry out website work via AI tool calls.',
    tech: ['LLM Agents', 'MCP', 'TYPO3', 'PHP'],
    highlight: 'Current Work',
  },
  {
    title: 'DHL Address Validation Automation',
    role: 'Working Student, AI Development — Studyheads',
    description: 'DHL address validation via REST API integration in Python, running in production on servers for client project Mambocat, Salzgitter.',
    tech: ['Python', 'REST API', 'DHL', 'Server Deployment'],
    highlight: 'In Production',
  },
  {
    title: 'LENSAI Smart Glasses',
    role: 'AI Development & Cloud Architecture',
    description: 'AI and computer-vision features for smart glasses, backed by a Python cloud backend with scalable AI modules exposed via REST APIs.',
    tech: ['Computer Vision', 'Python', 'Cloud', 'REST APIs'],
    highlight: 'Wearable AI',
  },
  {
    title: 'PROJKT 360 DEGREE',
    role: 'Creator',
    description: 'Project 360°: a research-to-content engine that turns my thesis work on human-centred, EU AI Act-aligned AI adoption into videos and posts, run as part of CipherPolice.',
    tech: ['LLMs', 'Research Pipelines', 'Content Automation'],
    highlight: 'Side Project',
    github: 'https://github.com/Ranjith1605',
  },
  {
    title: 'EU AI Act Research Project & Master\'s Thesis',
    role: 'Researcher — Tomorrow University',
    description: 'EU AI Act research (2025): regulatory impact, risk classification and compliance models. Master\'s thesis: human-centred AI adoption in organisations, with CipherPolice as the case study.',
    tech: ['EU AI Act', 'Risk Classification', 'Compliance Models', 'Human-Centred AI'],
    highlight: 'Research',
  },
];

export const EDUCATION: Education[] = [
  {
    period: 'Mar 2025 – Dec 2026',
    degree: 'Impact MBA – Sustainability, Innovation & Leadership',
    institution: 'Tomorrow University, Berlin',
    focus: "Grade 2.3 (German scale). Master's thesis: human-centred AI adoption in organisations (case study: CipherPolice). EU AI Act research project (2025): regulatory impact, risk classification, compliance models.",
    badge: 'In Progress',
    isCurrent: true,
  },
  {
    period: 'Mar 2023 – 2025',
    degree: 'M.Eng. Technology & Innovation Management',
    institution: 'Harz University of Applied Sciences, Wernigerode',
    focus: '50 ECTS completed, average grade 2.4. Transferred to Tomorrow University to focus my research on AI and human–AI collaboration, which was not possible in this programme.',
    badge: 'Transferred',
    isCurrent: false,
  },
  {
    period: 'Aug 2018 – Jul 2022',
    degree: 'B.Eng. Mechanical Engineering',
    institution: 'Chennai Institute of Technology, Chennai, India',
    focus: 'CGPA 8.01 / 10 (German grade 2.4); programming in Python since my bachelor\'s. Thesis: "Optimization of High Pressure Die Casting and Gravity Die Casting" — reduced the cycle time of a steering housing by analysing each component. Internship at Gokul Autotech (production planning, industrial engineering).',
    badge: 'Bachelor of Engineering',
    isCurrent: false,
  },
];

export const CERTIFICATIONS: { title: string; issuer: string; year?: string; inProgress?: boolean }[] = [
  { title: 'IBM Certified AI Developer', issuer: 'IBM' },
  { title: 'Google Business Intelligence Specialization', issuer: 'Google', year: '2025' },
  { title: 'IBM AI Product Manager', issuer: 'IBM', inProgress: true },
  { title: 'Cybersecurity · New Technologies · Strategic Innovation', issuer: 'Tomorrow University' },
  { title: 'Innovation Management', issuer: 'Erasmus University Rotterdam' },
];
