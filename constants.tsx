import { SkillCategory, Experience, Project, Education, CurrentStatus, NavItem } from './types';

export const PROFILE = {
  name: 'Ranjith Ramadass',
  role: 'Strategic AI Developer | Digital Business Visionary',
  bio: 'Bridging the gap between raw technological power and operational excellence. From serving in high-pressure gastronomy to founding an AI cybersecurity startup and optimizing digital workflows. Currently seeking the perfect coordinates for my Master Thesis.',
  email: '007ranjithr.v@gmail.com',
  linkedin: 'https://www.linkedin.com/in/ranjith-ramadass-1591a819a',
  github: 'https://github.com/Ranjith1605',
  availability: 'Open to Collaborate',
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
    role: 'Impact MBA Student — Master Thesis Phase',
    institution: 'Tomorrow University of Applied Sciences',
    detail: 'Preparing Master Thesis in AI & Sustainability at enercity. Focus: Sustainability, Innovation & Leadership.',
    icon: '🎓',
    color: 'cyan',
  },
  {
    role: 'Werkstudent Digital Business',
    institution: 'Studyheads (Salzgitter)',
    detail: 'Optimizing internal workflows, driving digital transformation and process automation.',
    icon: '⚙️',
    color: 'amber',
  },
  {
    role: 'Founder & Lead Developer',
    institution: 'CipherPolice',
    detail: 'Building AI-driven browser security. Privacy-first, community-powered. Visit: cipherpolice.com | cipherpolice.de',
    icon: '🛡️',
    color: 'green',
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'AI & Tech',
    variant: 'cyan',
    skills: [
      { name: 'Python' }, { name: 'React' }, { name: 'Next.js' }, { name: 'TypeScript' },
      { name: 'Node.js' }, { name: 'LLM Prompt Engineering' }, { name: 'API Integration' },
      { name: 'Supabase' }, { name: 'AWS' }, { name: 'REST APIs' }, { name: 'GitHub' },
      { name: 'React Native' },
    ],
  },
  {
    title: 'Data & Engineering',
    variant: 'amber',
    skills: [
      { name: 'Power BI' }, { name: 'SQL' }, { name: 'Tableau' }, { name: 'AWS QuickSight' },
      { name: 'Fusion 360' }, { name: 'CATIA V7' }, { name: 'SolidWorks' }, { name: 'ANSYS' },
    ],
  },
  {
    title: 'Soft Skills & Business',
    variant: 'green',
    skills: [
      { name: 'Digital Business Transformation' }, { name: 'Product Management' },
      { name: 'Startup Leadership' }, { name: 'High Emotional Intelligence' },
      { name: 'Resilience (Gastronomy-tested)' }, { name: 'Cross-Cultural Communication' },
    ],
  },
];

export const EXPERIENCE: Experience[] = [
  {
    period: 'Mar 2026 – Present',
    role: 'Werkstudent Digital Business',
    company: 'Studyheads',
    location: 'Salzgitter, Germany',
    description: 'Optimizing internal workflows and digital transformation initiatives. Building scalable digital tooling and process documentation.',
    tags: ['Process Optimization', 'Digital Tools', 'Automation'],
    isCurrent: true,
  },
  {
    period: 'Nov 2025 – Present',
    role: 'Founder & Project Lead',
    company: 'CipherPolice',
    location: 'Remote (cipherpolice.com | cipherpolice.de)',
    description: 'Founded and leading development of an AI-driven browser extension for user privacy and cybersecurity. Focused on detecting malicious patterns without compromising performance.',
    tags: ['AI', 'Cybersecurity', 'Browser Extension', 'Open Source'],
    isCurrent: true,
  },
  {
    period: 'Nov 2025 – Present',
    role: 'AI & Fullstack Developer',
    company: 'LensAI (Smart Glasses)',
    location: 'Germany',
    description: 'Development of AI-based features for smart glasses. Integrating computer vision and data processing workflows into hardware.',
    tags: ['AI', 'Computer Vision', 'Hardware', 'React'],
    isCurrent: true,
  },
  {
    period: 'Jul 2025 – Nov 2025',
    role: 'AI Full-Stack Developer',
    company: 'LAIFE GmbH & LENSAI',
    location: 'Germany',
    description: 'Optimized system efficiency by 40% through architectural improvements. Integrated scalable AI modules into production applications.',
    tags: ['Python', 'React', 'AI Integration', 'Performance'],
    isCurrent: false,
  },
  {
    period: 'Mar 2025 – Sep 2025',
    role: 'AI Business Development',
    company: 'BACKWARDSLA',
    location: 'Remote',
    description: 'Identified and qualified new clients in the AI sector. Built structured lead pipelines and analyzed target markets.',
    tags: ['Sales', 'Market Analysis', 'AI Business'],
    isCurrent: false,
  },
  {
    period: 'Jun 2025 – Aug 2025',
    role: 'Intern Mechanics & Operations',
    company: 'Lime GmbH',
    location: 'Germany',
    description: 'Led fleet management operations for urban e-mobility. Applied systematic problem-solving in fast-paced operations.',
    tags: ['Fleet Management', 'Operations', 'E-Mobility'],
    isCurrent: false,
  },
  {
    period: 'Aug 2023 – Oct 2025',
    role: 'Service Expert',
    company: 'Fettluke',
    location: 'Germany',
    description: 'Thrived in high-pressure system gastronomy. Funded my studies through excellence in human interaction and resilient performance.',
    tags: ['Leadership', 'Communication', 'Resilience'],
    isCurrent: false,
  },
  {
    period: 'May 2025 – Jul 2025',
    role: 'Business Development',
    company: 'GAO TEK',
    location: 'Remote',
    description: 'Market analysis and lead generation. Collaborated with international teams for outreach campaigns.',
    tags: ['Market Research', 'Lead Generation'],
    isCurrent: false,
  },
  {
    period: 'Feb 2024 – Jul 2024',
    role: 'Marketing Research Analyst',
    company: 'KINESIS.EU',
    location: 'Europe',
    description: 'Developed strategic marketing models based on UN sustainability research. Aligned objectives with SDGs.',
    tags: ['Research', 'Sustainability', 'SDGs'],
    isCurrent: false,
  },
];

export const PROJECTS: Project[] = [
  {
    title: 'CipherPolice Security Tool',
    role: 'Lead Developer',
    description: 'AI-driven browser security focused on detecting malicious patterns. Protecting user privacy through community-powered cybersecurity. Visit: cipherpolice.com',
    tech: ['AI Security', 'Browser Extension', 'LLM', 'Privacy'],
    highlight: 'Cybersecurity Flagship',
  },
  {
    title: 'StoryBridge Android App',
    role: 'AI Developer — Full-Stack & Mobile',
    description: 'A social storytelling platform powered by AI. Users co-create immersive narratives with intelligent prompts.',
    tech: ['React Native', 'TypeScript', 'Supabase', 'AWS', 'LLM APIs'],
    highlight: 'AI-Powered Storytelling',
  },
  {
    title: 'Thirukkural GPT',
    role: 'NLP Researcher',
    description: 'AI-powered semantic search and explanation engine for final Tamil text Thirukkural. Preserves poetic nuance while providing accurate interpretations.',
    tech: ['LLM', 'Python', 'NLP', 'React'],
    highlight: 'Cultural AI',
  },
  {
    title: 'VisionOS Spatial Lab',
    role: 'Spatial Computing Dev',
    description: 'Experimental spatial computing interfaces exploring human-AI collaboration in 3D space using predictive hand-tracking.',
    tech: ['Swift', 'ARKit', 'Spatial Computing', 'AI'],
    highlight: 'Mixed Reality',
  },
  {
    title: 'LensAI Smart Glasses',
    role: 'Embedded Systems Dev',
    description: 'Complete hardware-to-software pipeline for smart glasses. Real-time computer vision on low-power hardware.',
    tech: ['Python', 'OpenCV', 'Embedded APIs', 'Hardware'],
    highlight: 'Wearable AI',
  },
  {
    title: 'EU AI Act Research Project',
    role: 'Lead Researcher',
    description: 'Analysis of EU AI Act regulatory impacts. Developed risk classification frameworks and compliance models.',
    tech: ['AI Policy', 'Risk Analysis', 'Regulatory Compliance', 'Research'],
    highlight: 'AI Governance',
  },
  {
    title: 'Autonomous Vacuum Cleaner',
    role: 'Embedded Systems Developer',
    description: 'Autonomous cleaning robot with sensor fusion, obstacle avoidance, and custom SLAM-like algorithm.',
    tech: ['Embedded C', 'Sensor Fusion', 'Robotics', 'Path Planning'],
    highlight: 'Robotics',
  },
];

export const EDUCATION: Education[] = [
  {
    period: '2025 – Present',
    degree: 'Impact MBA (Sustainability, Innovation & Leadership)',
    institution: 'Tomorrow University of Applied Sciences',
    focus: 'Specialisations: Data Mastery, IoT, Innovation Strategies | Berlin, Germany',
    isCurrent: true,
  },
  {
    period: '2023 – 2025',
    degree: 'M.Tech — Technology & Innovation Management',
    institution: 'Harz University of Applied Sciences',
    focus: 'Innovation Systems, Wernigerode, Germany',
    isCurrent: false,
  },
  {
    period: '2018 – 2022',
    degree: 'Bachelor of Mechanical Engineering',
    institution: 'Chennai Institute of Technology',
    focus: 'Chennai, India',
    isCurrent: false,
  },
];
