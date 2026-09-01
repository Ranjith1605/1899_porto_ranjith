import { SkillCategory, Experience, Project, Education, CurrentStatus, NavItem } from './types';

/**
 * The hero portrait. Swapping the photo is a one-line change here.
 *
 * `fit`:
 *   'cover'   — the image fills the circle; edges are cropped. Best for a
 *               head-and-shoulders photo. Use `position` to choose what stays centred.
 *   'contain' — the WHOLE image sits inside the circle, nothing cropped. Use this
 *               for a full-body shot where the pose and hands must stay visible
 *               (the WhatsApp-DP look).
 *
 * Source quality note: a crisp result needs roughly 1200x1600px or larger.
 * The current file was recovered from the CV PDF and is only ~350x430px of real
 * detail, which is why it softens when enlarged.
 */
export const PHOTO = {
  src: '/ranjith-profile.jpg',
  fit: 'cover' as 'cover' | 'contain',
  position: '50% 22%',
  alt: 'Ranjith Ramadass',
};

export const PROFILE = {
  name: 'Ranjith Ramadass',
  role: 'AI Integration Specialist | AI Project Manager & Developer',
  bio: 'I integrate the latest AI models into real products and workflows — seamlessly, and with deep research behind every decision. Based in Hannover, Germany. Currently AI Developer at Yoga Vidya, automating processes and putting the Projkt 360° approach to work inside a real organisation; before that, ten months leading an AI product end-to-end and LLM automations shipped to production. Master\'s thesis: the human-centred, EU AI Act-aligned introduction of AI projects in public and private organisations. Open to AI development work.',
  location: 'Hannover, Germany',
  email: '007ranjithr.v@gmail.com',
  linkedin: 'https://www.linkedin.com/in/ranjith-ramadass-1591a819a',
  github: 'https://github.com/Ranjith1605',
  availability: 'Open to AI development roles & projects',
};

export const NAV_ITEMS: NavItem[] = [
  { id: 'hero', label: 'Home' },
  { id: 'coordinates', label: 'Now' },
  { id: 'arsenal', label: 'Skills' },
  { id: 'mission-log', label: 'Experience' },
  { id: 'simulations', label: 'Projects' },
  { id: 'academy', label: 'Education' },
  { id: 'dream', label: 'Vision' },
  { id: 'comms', label: 'Contact' },
];

const CIPHERPOLICE_LINKS = [
  { label: 'cipherpolice.com', url: 'https://cipherpolice.com' },
  { label: 'cipherpolice.de', url: 'https://cipherpolice.de' },
];

export const CURRENT_COORDINATES: CurrentStatus[] = [
  {
    role: 'AI Developer (Intern) — Automation & AI Integration',
    institution: 'Yoga Vidya · since 24 Aug 2026',
    detail: 'Two-month internship: automating internal processes with LLM workflows and bringing the Projkt 360° approach into a real organisation.',
    icon: '🧘',
    color: 'amber',
    details: {
      headline: 'The newest mission — started 24 August 2026.',
      story: [
        'A two-month AI-development internship focused on automation: finding the repetitive, rule-heavy processes inside the organisation and turning them into reliable LLM-assisted workflows.',
        'It is also the first real-world deployment of Projkt 360°: the same agentic, compliance-aware way of working I use for my own projects — small verified steps, confirm before anything goes public, EU AI Act and GDPR treated as design constraints — applied inside a company.',
      ],
      highlights: [
        'Process analysis and selection of automation candidates',
        'LLM-based workflow automation (Claude, Gemini, GPT)',
        'Privacy-by-design: every data flow documented, minimised, consented',
      ],
    },
  },
  {
    role: 'Founder — AI Orchestration System',
    institution: 'Projkt 360°',
    detail: 'A self-built, multi-agent system on Claude Code that runs my research, content and product pipelines end-to-end.',
    icon: '🛰️',
    color: 'cyan',
    details: {
      headline: 'One operating system for research, content, product and company work.',
      story: [
        'Projkt 360° is the orchestration layer I built on Claude Code: specialised skills and agents that route work across five tracks — this portfolio, the CipherPolice company track, a weekly research-to-video content engine, an Obsidian second brain, and the Paperclip control plane for agent "seats".',
        'Every track shares the same guardrails: confirm before anything public or irreversible, data minimisation, honest claims, and small verified pushes. The point is not autonomy for its own sake — it is more careful output per human.',
      ],
      highlights: [
        'Multi-agent Claude Code skills with a versioned repo map',
        'Retrieval over the EU AI Act and my thesis (Voyage embeddings, Pinecone)',
        'Supabase edge functions, Clerk auth, Upstash rate limiting',
        'Obsidian vault as compounding memory',
      ],
      links: [{ label: 'GitHub', url: PROFILE.github }],
    },
  },
  {
    role: 'Founder & Project Lead',
    institution: 'CipherPolice',
    detail: 'AI-driven browser extension for digital privacy — built as a full company simulation with sole product ownership, from concept to working build.',
    icon: '🛡️',
    color: 'green',
    details: {
      headline: 'A privacy-first browser security companion — and an EU AI Act assessment layer for businesses.',
      story: [
        'CipherPolice started as a self-initiated, non-commercial company simulation: ten months of full product ownership from concept to working build — requirements analysis, roadmap, Scrum/Kanban delivery with a small dev team, QA of the detection workflow, milestone and risk reporting.',
        'The public product is honest by design: every feature is tagged LIVE (real, verifiable) or SIM (teaching simulation), and the site never claims protection it cannot deliver. The business layer adds authenticated, retrieval-grounded AI-system assessments under the EU AI Act — decision support, not legal advice.',
      ],
      highlights: [
        'Manifest V3 browser extension with local-first detection',
        'Trilingual site (EN / DE / TA) on Vercel; security headers graded A',
        'Supabase edge functions: website security scan, AI-system assessment',
        'EU AI Act risk-tier classification grounded only in source excerpts',
      ],
      links: CIPHERPOLICE_LINKS,
    },
  },
  {
    role: 'AI Developer (Werkstudent) — Digital Business & Automation',
    institution: 'Studyheads · Hannover',
    detail: 'Finding automation potential in business processes and taking it to production — e.g. an automated DHL address-validation pipeline.',
    icon: '⚙️',
    color: 'amber',
    details: {
      story: [
        'Analysing business processes for automation potential and taking the winners all the way to production.',
        'Flagship: an automated DHL address-validation pipeline (Python, DHL developer toolkits) running on Ubuntu servers, cutting misdeliveries and returns in e-commerce fulfilment. Alongside it, LLM automations (Claude, Gemini, Perplexity) for internal data processes — from prompt design to deployment.',
      ],
      highlights: [
        'DHL address-validation pipeline on Linux servers',
        'LLM automations for internal data processes',
        'From analysis to productive operation, end-to-end',
      ],
    },
  },
  {
    role: 'Impact MBA — Master Thesis',
    institution: 'Tomorrow University · Berlin',
    detail: 'Thesis: the human-centred introduction of AI projects in public and private-sector organisations, including EU AI Act compliance.',
    icon: '🎓',
    color: 'cyan',
    details: {
      headline: 'The AI Realization Playbook — human-centred, EU AI Act-aligned and sustainable AI adoption in public administrations and corporate organisations.',
      story: [
        'A Design Science Research study built around a trilingual, four-gateway survey (30 valid responses after cleaning). Headline findings: AI use outruns trust, internal AI rules are uneven across organisations, dignity-first adoption is strongly valued, and views on displacement risk and Universal Basic Income diverge across groups.',
        'The findings feed a six-module playbook that links each governance function to a legal anchor, design knowledge and a stakeholder signal — the same playbook that grounds the CipherPolice assessment engine.',
      ],
      highlights: [
        'Design Science Research method (Peffers et al.)',
        'EU AI Act deployer obligations and risk triage',
        'Six-module AI Realization Playbook',
      ],
    },
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
    period: 'Aug 2026 – Present',
    role: 'AI Developer (Intern) — Automation & AI Integration',
    company: 'Yoga Vidya',
    location: 'Germany',
    description: 'Two-month internship, started 24 August 2026: automating internal processes with LLM-based workflows and bringing the Projkt 360° approach — agentic automation with EU AI Act and GDPR awareness — into a real organisation.',
    tags: ['Process Automation', 'LLM Integration', 'Projkt 360°', 'Privacy-by-Design'],
    isCurrent: true,
    details: {
      story: [
        'A two-month AI-development internship focused on automation: mapping the organisation\'s repetitive, rule-heavy processes and turning the right ones into reliable LLM-assisted workflows.',
        'It doubles as the first real-world deployment of Projkt 360° — the same agentic, compliance-aware way of working I use for my own projects, applied inside a company: small verified steps, confirm before anything goes public, EU AI Act and GDPR as design constraints.',
      ],
      highlights: [
        'Process analysis and selection of automation candidates',
        'LLM-based workflow automation (Claude, Gemini, GPT)',
        'Documented, minimised, consented data flows',
      ],
    },
  },
  {
    period: 'Mar 2026 – Present',
    role: 'AI Developer (Werkstudent) — Digital Business & Automation',
    company: 'Studyheads',
    location: 'Hannover, Germany',
    description: 'Analysing business processes for AI automation potential and delivering it to production. Built an automated DHL address-validation pipeline (Python, DHL developer toolkits) on Ubuntu servers, cutting misdeliveries and returns in e-commerce. LLM automations for internal data processes, from prompt design to deployment.',
    tags: ['Process Automation', 'Python', 'LLM Integration', 'Linux'],
    isCurrent: true,
    details: {
      highlights: [
        'Automated DHL address-validation pipeline on Ubuntu servers (Python, DHL developer toolkits)',
        'Fewer misdeliveries and returns in e-commerce fulfilment',
        'LLM automations (Claude, Gemini, Perplexity) for internal data processes — prompt design to deployment',
      ],
    },
  },
  {
    period: 'Sep 2025 – Present',
    role: 'Founder & Project Lead (self-initiated AI project)',
    company: 'CipherPolice',
    location: 'Hannover · cipherpolice.com | cipherpolice.de',
    description: 'Ten months of full ownership of an AI product — an AI-driven browser extension for digital privacy — set up as a complete company simulation. Requirements analysis, roadmap, Scrum/Kanban delivery with a small dev team, QA of the AI detection workflow and milestone/risk reporting.',
    tags: ['AI', 'Privacy', 'Browser Extension', 'Product Leadership'],
    isCurrent: true,
    details: {
      highlights: [
        'Full product ownership from concept to working build (10 months)',
        'Requirements analysis, prioritisation and roadmap maintenance',
        'Agile steering of a small dev team — sprint planning, retros, task and resource coordination',
        'QA of the AI detection workflow; regular milestone and risk reporting',
      ],
      links: CIPHERPOLICE_LINKS,
    },
  },
  {
    period: 'Jul 2025 – Mar 2026',
    role: 'AI Developer',
    company: 'LensAI',
    location: 'Remote (San Francisco, USA)',
    description: 'Production cloud backend (Lens Cloud) for real-time AI features on smart glasses — Python services and computer-vision integration. REST API integration between device, cloud services and AI models in an international remote team.',
    tags: ['Python', 'Computer Vision', 'Cloud Backend', 'REST APIs'],
    isCurrent: false,
    details: {
      highlights: [
        'Productive cloud backend (Lens Cloud) for real-time AI functions on smart glasses',
        'Python services and computer-vision integration',
        'REST API integration between device, cloud services and AI models',
      ],
    },
  },
  {
    period: 'Jul 2025 – Nov 2025',
    role: 'Freelance AI / AR Developer',
    company: 'LAIFE GmbH (StoryBridge)',
    location: 'Remote (Berlin)',
    description: 'AI/AR prototyping for a React Native mobile app; load times reduced by 40% (Supabase, AWS). Deployment and operation of the platform on Linux servers.',
    tags: ['React Native', 'Supabase', 'AWS', 'Performance'],
    isCurrent: false,
    details: {
      highlights: [
        'AI / AR prototyping for a React Native mobile app',
        'Load times reduced by 40% (Supabase, AWS)',
        'Deployment and operation on Linux servers (Ubuntu, Bash, CLI)',
      ],
    },
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
    description: 'An AI orchestration system built on Claude Code: specialised agents and skills that turn my thesis research, an Obsidian second brain and a network of GitHub repos into one automated loop — research, content, product development and company operations.',
    tech: ['Claude Code', 'Multi-Agent Systems', 'Obsidian', 'GitHub', 'RAG', 'Supabase'],
    highlight: 'AI Orchestration Flagship',
    details: {
      headline: 'The engine room: one operating system for everything I build.',
      story: [
        'Five tracks — portfolio, the CipherPolice company track, a weekly research-to-video content engine, an Obsidian second brain and the Paperclip control plane — run through one set of versioned Claude Code skills and repo agents.',
        'Compliance is built in rather than bolted on: every track confirms before anything public or irreversible, minimises data, keeps secrets out of git, and labels AI output as decision support. Now being deployed inside a real organisation at Yoga Vidya.',
      ],
      highlights: [
        'Versioned skill with a repo map, phase gates and definitions of done',
        'Retrieval-grounded assessment pipeline (Voyage, Pinecone, Claude)',
        'Repo agents for bug hunting, cleanup and real-browser design audits',
      ],
      links: [{ label: 'GitHub', url: PROFILE.github }],
    },
  },
  {
    title: 'CipherPolice',
    role: 'Founder & Project Lead',
    description: 'AI-driven browser extension for digital privacy — detecting malicious patterns without compromising performance. Built as a full company simulation with sole product ownership over 10 months.',
    tech: ['AI Security', 'Browser Extension', 'LLM', 'Privacy-by-Design', 'Supabase', 'Vercel'],
    highlight: 'Privacy & Security',
    details: {
      headline: 'Honest by design: every feature is LIVE or SIM, never dressed up.',
      story: [
        'A privacy-first browser security companion — tracker visibility, permission-risk checks, scam-link guidance — with digital-justice education as the mission layer. Trilingual (EN / DE / TA), local-first, no analytics.',
        'The business layer turns my thesis into a product: authenticated, retrieval-grounded EU AI Act risk-tier assessments of a company\'s AI systems, returned as a structured report that says plainly what it is not sure of.',
      ],
      highlights: [
        'Manifest V3 extension with a pure TypeScript detection core',
        'Security headers graded A on the live site; build-time CSP guard',
        'Supabase edge functions with Clerk-verified JWTs and rate limiting',
      ],
      links: CIPHERPOLICE_LINKS,
    },
  },
  {
    title: 'The AI Realization Playbook',
    role: 'Master Thesis — Tomorrow University',
    description: 'Human-centred, EU AI Act-aligned introduction of AI projects in public and private-sector organisations. Risk classification, compliance models and an adoption framework practitioners can actually use.',
    tech: ['EU AI Act', 'AI Governance', 'Change Management', 'Design Science Research'],
    highlight: 'AI Governance',
    details: {
      headline: 'Human-centred, EU AI Act-aligned and sustainable AI adoption in public administrations and corporate organisations.',
      story: [
        'A Design Science Research study around a trilingual, four-gateway survey. AI use outruns trust; internal AI rules are uneven; dignity-first adoption is strongly valued; views on displacement risk and Universal Basic Income diverge across groups.',
        'The result is a six-module playbook linking each governance function to a legal anchor, design knowledge and a stakeholder signal — and the knowledge base behind the CipherPolice assessment engine.',
      ],
    },
  },
  {
    title: 'LensAI Smart Glasses',
    role: 'AI Developer',
    description: 'Production cloud backend for real-time AI features on smart glasses. Python services, computer-vision integration and REST APIs between device, cloud and models.',
    tech: ['Python', 'Computer Vision', 'Cloud', 'REST APIs'],
    highlight: 'Wearable AI',
    details: {
      highlights: [
        'Lens Cloud backend for real-time AI functions on the glasses',
        'Computer-vision integration and Python services',
        'Device ↔ cloud ↔ model REST integration in an international remote team',
      ],
    },
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
