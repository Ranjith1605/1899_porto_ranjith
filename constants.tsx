import { SkillCategory, Experience, Project, Education, CurrentStatus, NavItem } from './types';

export const PROFILE = {
  name: 'Ranjith Ramadass',
  role: 'Strategic AI Developer | Digital Business Visionary',
  bio: 'Bridging the gap between raw technological power and operational excellence. From serving in high-pressure gastronomy to founding an AI cybersecurity startup and optimizing digital workflows. Currently seeking the perfect coordinates for my Master Thesis.',
  email: '007ranjithr.v@gmail.com',
  linkedin: 'https://www.linkedin.com/in/ranjithramadass',
  github: 'https://github.com/Ranjith1605',
  availability: 'Open to Collaborate',
};

export const NAV_ITEMS: NavItem[] = [
  { id: 'hero', label: 'Bridge' },
  { id: 'coordinates', label: 'Coordinates' },
  { id: 'arsenal', label: 'Arsenal' },
  { id: 'mission-log', label: 'Mission Log' },
  { id: 'simulations', label: 'Simulations' },
  { id: 'academy', label: 'Academy' },
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
    detail: 'Building open-source AI-driven browser security. Privacy-first, community-powered cybersecurity.',
    icon: '🛡️',
    color: 'green',
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'AI & Tech',
    variant: 'cyan',
    skills: [
      { name: 'Python' },
      { name: 'React' },
      { name: 'Next.js' },
      { name: 'TypeScript' },
      { name: 'Node.js' },
      { name: 'LLM Prompt Engineering' },
      { name: 'API Integration' },
      { name: 'Supabase' },
      { name: 'AWS' },
      { name: 'REST APIs' },
      { name: 'GitHub' },
      { name: 'React Native' },
    ],
  },
  {
    title: 'Data & Engineering',
    variant: 'amber',
    skills: [
      { name: 'Power BI' },
      { name: 'SQL' },
      { name: 'Tableau' },
      { name: 'AWS QuickSight' },
      { name: 'Fusion 360' },
      { name: 'CATIA V7' },
      { name: 'SolidWorks' },
      { name: 'ANSYS' },
    ],
  },
  {
    title: 'Soft Skills & Business',
    variant: 'green',
    skills: [
      { name: 'Digital Business Transformation' },
      { name: 'Product Management' },
      { name: 'Startup Leadership' },
      { name: 'High Emotional Intelligence' },
      { name: 'Resilience (Gastronomy-tested)' },
      { name: 'Cross-Cultural Communication' },
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
    location: 'Remote',
    description: 'Founded and leading development of an AI-driven browser extension for user privacy and cybersecurity. Open-source, community-first approach.',
    tags: ['AI', 'Cybersecurity', 'Browser Extension', 'Open Source'],
    isCurrent: true,
  },
  {
    period: 'Apr 2025 – Oct 2025',
    role: 'AI Full-Stack Developer',
    company: 'LAIFE GmbH & LENSAI',
    location: 'Germany',
    description: 'Optimized system efficiency by 40% through architectural improvements. Integrated scalable AI modules into production applications.',
    tags: ['Python', 'React', 'AI Integration', 'Performance'],
    isCurrent: false,
  },
  {
    period: 'May 2025 – Aug 2025',
    role: 'Mechanic & Fleet Management',
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
    description: 'Thrived in high-pressure system gastronomy. Funded my studies through excellence in human interaction and resilient performance under pressure.',
    tags: ['Leadership', 'Communication', 'Resilience'],
    isCurrent: false,
  },
];

export const PROJECTS: Project[] = [
  {
    title: 'StoryBridge Android App',
    role: 'AI Developer — Full-Stack & Mobile',
    description: 'A social storytelling platform powered by AI. Users co-create immersive narratives with intelligent prompts. Built with a modern cross-platform stack for scale.',
    tech: ['React Native', 'TypeScript', 'Supabase', 'AWS', 'LLM APIs'],
    highlight: 'AI-Powered Storytelling',
  },
  {
    title: 'EU AI Act Research Project',
    role: 'Lead Researcher',
    description: 'Deep analysis of EU AI Act regulatory impacts. Developed risk classification frameworks and compliance models for AI systems across industries.',
    tech: ['AI Policy', 'Risk Analysis', 'Regulatory Compliance', 'Research'],
    highlight: 'AI Governance',
  },
  {
    title: 'Autonomous Vacuum Cleaning Robot',
    role: 'Embedded Systems Developer',
    description: 'Engineered an autonomous cleaning robot with sensor fusion, obstacle avoidance, and embedded logic. From CAD design to working prototype.',
    tech: ['Embedded C', 'Sensor Fusion', 'CAD', 'Robotics', 'ANSYS'],
    highlight: 'Robotics & Automation',
  },
];

export const EDUCATION: Education[] = [
  {
    period: '2025 – Present',
    degree: 'Impact MBA (Sustainability, Innovation & Leadership)',
    institution: 'Tomorrow University of Applied Sciences',
    focus: 'Master Thesis: AI & Sustainability @ enercity',
    isCurrent: true,
  },
  {
    period: '2023 – 2025',
    degree: 'M.Eng — Technology & Innovation Management',
    institution: 'Hochschule Harz',
    focus: 'Innovation Systems, Smart Manufacturing, Digital Business',
    isCurrent: false,
  },
  {
    period: '2018 – 2022',
    degree: 'B.Eng — Mechanical Engineering',
    institution: 'Chennai Institute of Technology',
    focus: 'Mechanical Design, Thermodynamics, CAD/CAM',
    isCurrent: false,
  },
];
