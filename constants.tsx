import { SkillCategory, Experience, Project, Education, CurrentStatus, NavItem } from './types';

/**
 * The portrait, in two forms.
 *
 * `avatar` is a 1600x1600 square built for the hero circle: the head sits dead
 * centre, and the photo is padded out with its own blurred background so the
 * circular crop never clips the hair or chin. The source photo has almost no
 * margin around the head, so without that padding a circle always cut into it.
 *
 * `full` is the unpadded portrait, shown in the "view full photo" panel.
 *
 * Swapping either is a one-line change. See public/PHOTO_README.md.
 */
export const PHOTO = {
  avatar: '/ranjith-avatar.jpg',
  full: '/ranjith-profile.jpg',
  /** 'cover' fills the circle; 'contain' fits the whole square inside it. */
  fit: 'cover' as 'cover' | 'contain',
  /** The avatar is already centred, so this stays at dead centre. */
  position: '50% 50%',
  alt: 'Ranjith Ramadass',
};

export const PROFILE = {
  name: 'Ranjith Ramadass',
  role: 'AI Integration Specialist',
  /** One line. This is what a recruiter reads first. */
  tagline: 'I bring AI models into real products and processes — and keep them compliant.',
  /** Two sentences maximum. Everything else lives in the sections below. */
  bio: 'AI project manager and developer in Hannover. Ten months of end-to-end ownership of an AI product, LLM automations running in production, and a Master\'s thesis on introducing AI projects into organisations under the EU AI Act.',
  location: 'Hannover, Germany',
  email: '007ranjithr.v@gmail.com',
  linkedin: 'https://www.linkedin.com/in/ranjith-ramadass-1591a819a',
  github: 'https://github.com/Ranjith1605',
  availability: 'Open to AI development roles & projects',
};

/** The four facts a recruiter scans for, in order. */
export const QUICK_FACTS = [
  { label: 'Focus', value: 'LLM integration & process automation' },
  { label: 'Stack', value: 'Python · SQL · REST APIs · Linux' },
  { label: 'Regulatory', value: 'EU AI Act · GDPR · Privacy-by-Design' },
  { label: 'Languages', value: 'English C1 · German B2 · Tamil native' },
];

export const NAV_ITEMS: NavItem[] = [
  { id: 'hero', label: 'Home' },
  { id: 'now', label: 'Now' },
  { id: 'work', label: 'Work' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
];

const CIPHERPOLICE_LINKS = [
  { label: 'cipherpolice.com', url: 'https://cipherpolice.com' },
  { label: 'cipherpolice.de', url: 'https://cipherpolice.de' },
];

/** What I am doing right now — three, no more. */
export const CURRENT_COORDINATES: CurrentStatus[] = [
  {
    role: 'AI Developer (Intern)',
    institution: 'Yoga Vidya · since Aug 2026',
    detail: 'Automating internal processes with LLM workflows.',
    color: 'amber',
    details: {
      headline: 'Automation and AI integration inside a real organisation.',
      story: [
        'A two-month AI-development internship, started 24 August 2026, focused on automation: mapping the repetitive, rule-heavy processes inside the organisation and turning the right ones into reliable LLM-assisted workflows.',
        'It is also the first real-world deployment of the Projkt 360° approach — small verified steps, confirmation before anything goes public, and EU AI Act and GDPR treated as design constraints rather than paperwork.',
      ],
      highlights: [
        'Process analysis and selection of automation candidates',
        'LLM-based workflow automation (Claude, Gemini, GPT)',
        'Documented, minimised and consented data flows',
      ],
    },
  },
  {
    role: 'AI Developer (Working Student)',
    institution: 'Studyheads · Hannover',
    detail: 'Digital business and automation, from analysis to production.',
    color: 'cyan',
    details: {
      headline: 'Finding automation potential in business processes and shipping it.',
      story: [
        'Analysing business processes for AI automation potential and taking the winners all the way to production.',
        'The flagship is an automated DHL address-validation pipeline (Python, DHL developer toolkits) running on Ubuntu servers, which cut misdeliveries and returns in e-commerce fulfilment.',
      ],
      highlights: [
        'DHL address-validation pipeline on Linux servers',
        'LLM automations (Claude, Gemini, Perplexity) for internal data processes',
        'Prompt design through to deployment',
      ],
    },
  },
  {
    role: 'Founder & Project Lead',
    institution: 'CipherPolice',
    detail: 'A privacy-first browser security companion, built as a full company simulation.',
    color: 'green',
    details: {
      headline: 'Ten months of sole product ownership, concept to working build.',
      story: [
        'CipherPolice is a self-initiated, non-commercial project set up as a complete company simulation: requirements analysis, roadmap, Scrum/Kanban delivery with a small dev team, QA of the detection workflow, and milestone and risk reporting.',
        'The product is honest by design — every feature is tagged LIVE or SIM, and the site never claims protection it cannot deliver.',
      ],
      highlights: [
        'Manifest V3 browser extension, local-first detection',
        'Trilingual site (EN / DE / TA) on Vercel',
        'EU AI Act risk-tier assessments grounded only in source excerpts',
      ],
      links: CIPHERPOLICE_LINKS,
    },
  },
];

/** Skill groups, exactly as they appear on the CV. */
export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'AI & Automation',
    variant: 'cyan',
    skills: [
      { name: 'LLM Integration (Claude, Gemini, GPT)' },
      { name: 'Prompt Engineering' },
      { name: 'Process Automation' },
      { name: 'Computer Vision Integration' },
    ],
  },
  {
    title: 'Technical',
    variant: 'amber',
    skills: [
      { name: 'Python' }, { name: 'SQL' }, { name: 'REST APIs' },
      { name: 'Linux (Ubuntu)' }, { name: 'Git / GitHub' },
      { name: 'AWS' }, { name: 'Azure (Basics)' }, { name: 'Power BI' },
    ],
  },
  {
    title: 'Project Management',
    variant: 'green',
    skills: [
      { name: 'Scrum & Kanban' }, { name: 'Agile & Classical Methods' },
      { name: 'Requirements Analysis' }, { name: 'Roadmap Planning' },
      { name: 'Stakeholder Communication' }, { name: 'Project Reporting' },
    ],
  },
  {
    title: 'Regulatory',
    variant: 'cyan',
    skills: [
      { name: 'EU AI Act' }, { name: 'Privacy-by-Design' }, { name: 'GDPR (DSGVO)' },
    ],
  },
];

/** Primary roles, in CV order. Minor roles are grouped in FURTHER_EXPERIENCE. */
export const EXPERIENCE: Experience[] = [
  {
    period: 'Aug 2026 – Present',
    role: 'AI Developer (Intern) — Automation & AI Integration',
    company: 'Yoga Vidya',
    location: 'Germany',
    description: 'Automating internal processes with LLM-based workflows; two-month internship applying the Projkt 360° approach inside a real organisation.',
    tags: ['Process Automation', 'LLM Integration'],
    isCurrent: true,
  },
  {
    period: 'Mar 2026 – Present',
    role: 'AI Developer (Working Student) — Digital Business & Automation',
    company: 'Studyheads',
    location: 'Hannover',
    description: 'Analysis of business processes and identification of AI automation potential, through to productive operation. Automated DHL address validation (Python, DHL developer toolkits) as a pipeline on Ubuntu servers — fewer misdeliveries and returns in e-commerce. LLM automations (Claude, Gemini, Perplexity) for internal data processes, from prompt design to deployment.',
    tags: ['Python', 'Automation', 'LLM Integration', 'Linux'],
    isCurrent: true,
  },
  {
    period: 'Sep 2025 – Present',
    role: 'Project Lead & Founder (self-initiated AI project)',
    company: 'CipherPolice — AI browser extension for digital privacy',
    location: 'Hannover',
    description: 'Set up as a complete company simulation (non-commercial): ten months of overall responsibility for an AI product, from concept to working build. Requirements analysis, prioritisation and roadmap maintenance. Agile steering of a small development team with Scrum/Kanban — sprint planning, retrospectives, task and resource coordination. Quality assurance of the AI detection workflow and regular progress reporting (milestones, risks).',
    tags: ['Product Leadership', 'Scrum', 'AI', 'Privacy'],
    isCurrent: true,
  },
  {
    period: 'Jul 2025 – Mar 2026',
    role: 'AI Developer',
    company: 'LENSAI',
    location: 'Remote (San Francisco, USA)',
    description: 'Productive cloud backend (Lens Cloud) for real-time AI functions on smart glasses — Python services and computer-vision integration. REST API integration between device, cloud services and AI models in an international remote team.',
    tags: ['Python', 'Computer Vision', 'REST APIs'],
    isCurrent: false,
  },
  {
    period: 'Jul 2025 – Nov 2025',
    role: 'Freelance AI / AR Developer',
    company: 'LAIFE GmbH (StoryBridge)',
    location: 'Remote (Berlin)',
    description: 'AI/AR prototyping for mobile apps (React Native); load times reduced by 40% (Supabase, AWS). Deployment and operation of the platform on Linux servers (Ubuntu, Bash/CLI).',
    tags: ['React Native', 'Supabase', 'AWS'],
    isCurrent: false,
  },
];

/** The CV's "Weitere Erfahrung" block — one compact line, not five cards. */
export const FURTHER_EXPERIENCE = {
  period: '2022 – 2025',
  items: [
    'AI Business Development, BACKWARDSLA (remote, 03–09/2025)',
    'Business Development Intern, GAO Tek (remote, 12/2024–05/2025)',
    'Marketing Research (Erasmus), KINESIS.EU (Groningen, 2024)',
    'Working Student Service, Fettluke (Harz, 2023–2025)',
    'Internship & Bachelor Thesis, Gokul Autotech (Chennai, 2022)',
  ],
};

/** Four pieces of proof. Quality over quantity. */
export const PROJECTS: Project[] = [
  {
    title: 'Projkt 360°',
    role: 'Founder & Architect',
    description: 'An AI orchestration system on Claude Code: specialised agents and skills that run research, content, product development and operations as one loop.',
    tech: ['Claude Code', 'Multi-Agent', 'RAG', 'Supabase'],
    highlight: 'AI Orchestration',
    details: {
      headline: 'One operating system for everything I build.',
      story: [
        'Five tracks — this portfolio, the CipherPolice company track, a research-to-video content engine, an Obsidian second brain, and an agent control plane — run through one set of versioned Claude Code skills and repository agents.',
        'Compliance is built in rather than bolted on: every track confirms before anything public or irreversible, minimises data, keeps secrets out of version control, and labels AI output as decision support. Currently being deployed inside a real organisation at Yoga Vidya.',
      ],
      highlights: [
        'Versioned skill with a repo map, phase gates and definitions of done',
        'Retrieval-grounded assessment pipeline (Voyage, Pinecone, Claude)',
        'Repository agents for bug hunting, cleanup and design audits',
      ],
      links: [{ label: 'GitHub', url: PROFILE.github }],
    },
  },
  {
    title: 'CipherPolice',
    role: 'Founder & Project Lead',
    description: 'A privacy-first browser security companion, plus an EU AI Act assessment layer that classifies a company\'s AI systems by risk tier.',
    tech: ['TypeScript', 'Supabase', 'LLM', 'Privacy-by-Design'],
    highlight: 'Product Leadership',
    details: {
      headline: 'Honest by design: every feature is LIVE or SIM, never dressed up.',
      story: [
        'Tracker visibility, permission-risk checks and scam-link guidance, trilingual (EN / DE / TA), local-first, with no analytics on the free tools.',
        'The business layer turns the thesis into a product: authenticated, retrieval-grounded EU AI Act risk-tier assessments returned as a structured report that states plainly what it is not sure of. Decision support, not legal advice.',
      ],
      highlights: [
        'Manifest V3 extension with a pure TypeScript detection core',
        'Security headers graded A on the live site',
        'Edge functions with verified JWTs and per-organisation rate limiting',
      ],
      links: CIPHERPOLICE_LINKS,
    },
  },
  {
    title: 'The AI Realization Playbook',
    role: 'Master Thesis · Tomorrow University',
    description: 'Human-centred, EU AI Act-aligned adoption of AI in public administrations and corporate organisations. A six-module framework practitioners can use.',
    tech: ['EU AI Act', 'AI Governance', 'Design Science Research'],
    highlight: 'Research',
    details: {
      headline: 'Human-centred, EU AI Act-aligned and sustainable AI adoption.',
      story: [
        'A Design Science Research study built around a trilingual, four-gateway survey. The findings: AI use outruns trust, internal AI rules are uneven across organisations, dignity-first adoption is strongly valued, and views on displacement risk and Universal Basic Income diverge across groups.',
        'These feed a six-module playbook linking each governance function to a legal anchor, design knowledge and a stakeholder signal — and form the knowledge base behind the CipherPolice assessment engine.',
      ],
    },
  },
  {
    title: 'DHL Address-Validation Pipeline',
    role: 'AI Developer · Studyheads',
    description: 'Automated address validation for e-commerce shipping, running as a pipeline on Ubuntu servers — fewer misdeliveries and returns.',
    tech: ['Python', 'Linux', 'Automation'],
    highlight: 'Automation in Production',
    details: {
      headline: 'A small, boring automation that saves real money every week.',
      story: [
        'Incoming addresses are validated against the DHL developer toolkits before a label is ever generated, so malformed and undeliverable addresses are caught at entry rather than discovered on return.',
        'It runs unattended as a pipeline on Ubuntu servers — the kind of unglamorous automation that pays for itself in reduced returns.',
      ],
    },
  },
];

export const EDUCATION: Education[] = [
  {
    period: 'Mar 2025 – Present',
    degree: 'Impact MBA — Sustainability, Innovation & Leadership',
    institution: 'Tomorrow University of Applied Sciences · Berlin',
    focus: 'Master thesis: introducing AI projects in public and private-sector organisations, incl. EU AI Act',
    isCurrent: true,
  },
  {
    period: 'Mar 2023 – 2025',
    degree: 'M.Eng. — Technology & Innovation Management',
    institution: 'Harz University of Applied Sciences · Wernigerode',
    focus: 'Transferred to Tomorrow University',
    isCurrent: false,
  },
  {
    period: '2018 – 2022',
    degree: 'B.Eng. — Mechanical Engineering',
    institution: 'Chennai Institute of Technology · India',
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
