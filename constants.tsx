
import { Experience, Project, Education, Skill, Language } from './types';
import { User, Terminal, Cpu, Shield, Code, Glasses, Database } from 'lucide-react';

export const PROFILE = {
  name: "Ranjith Ramadass",
  handle: "CipherPolice",
  role: "AI Engineer & Architect of the Digital Frontier",
  bio: "Developer, designer, and daydreamer engineering the bridge between humans and intelligent systems. Building the foundation for a digital space-faring civilization—starting with enlightened, peaceful AI.",
  funFact: "I still think about '1899' more than I should. That's where the purpose starts for me: reshaping reality responsibly.",
  location: "Hannover, Germany",
  availability: "Open to Collaborate",
  github: "https://github.com/Ranjith1605",
  email: "007ranjithr.v@gmail.com",
  linkedin: "https://www.linkedin.com/in/ranjith-ramadass-1591a819a"
};

export const LANGUAGES: Language[] = [
  { name: "English", level: "C1 (Full Professional)", score: 90 },
  { name: "German", level: "B2 (Professional Working)", score: 75 },
  { name: "Tamil", level: "A2 (Elementary)", score: 40 },
];

export const SKILLS: Skill[] = [
  { name: "Python & AI Stack", level: 95, category: 'ai' },
  { name: "LLM / Prompt Eng.", level: 95, category: 'ai' },
  { name: "Computer Vision", level: 90, category: 'ai' },
  { name: "React / TypeScript", level: 85, category: 'dev' },
  { name: "SQL / Data Analysis", level: 90, category: 'data' },
  { name: "Power BI / Tableau", level: 88, category: 'data' },
  { name: "AWS / Cloud", level: 80, category: 'tools' },
  { name: "Docker / CI/CD", level: 75, category: 'tools' },
];

export const WORK_EXPERIENCE: Experience[] = [
  {
    id: 'w0',
    role: "Founder & Strategist",
    company: "Cipher",
    period: "Nov 2025 – Present",
    type: 'work',
    description: [
      "Leading a cross-functional team of 5 professionals in developing innovative AI/Tech solutions.",
      "Defining product strategy, roadmap, and execution plans for early-stage operations.",
      "Orchestrating technical architecture and business development efforts to drive growth."
    ]
  },
  {
    id: 'w1',
    role: "AI Developer & Business Intelligence",
    company: "LENSAI",
    period: "Sep 2025 – Present",
    type: 'work',
    description: [
      "Development of AI-based features to enhance user interaction for smart glasses.",
      "Integration of computer vision and data processing workflows into existing wearable technologies.",
      "Analysis of user data to derive product and business decisions.",
      "Collaboration with software teams to implement secure, scalable AI modules."
    ]
  },
  {
    id: 'w2',
    role: "AI Product Developer",
    company: "LAIFE",
    period: "Jul 2025 – Nov 2025",
    type: 'work',
    description: [
      "Contributed to the development of AI-powered AR features for mobile systems.",
      "Created technical product requirements and prototyped new AI use cases.",
      "Optimised app architecture to improve load times and user flow.",
      "Worked closely with design and engineering teams to deliver intelligent interfaces."
    ]
  },
  {
    id: 'w3',
    role: "AI Business Development",
    company: "BACKWARDSLA",
    period: "Mar 2025 – Sep 2025",
    type: 'work',
    description: [
      "Identified and qualified new clients in the AI and software sector.",
      "Built structured lead pipelines and handed them over to sales teams.",
      "Analysed target markets and competitors to scale new business models.",
      "Successfully operated in a dynamic remote environment with a focus on sales KPIs."
    ]
  },
  {
    id: 'w4',
    role: "Intern Mechanics & Operations",
    company: "LIME",
    period: "Jun 2025 – Aug 2025",
    type: 'work',
    description: [
      "Support in daily operation to ensure e-scooter availability.",
      "Carrying out technical diagnostics, maintenance and repair processes.",
      "Coordination with city and service teams to optimise fleet logistics."
    ]
  },
  {
    id: 'w5',
    role: "Business Development",
    company: "FETTLUKE.DE",
    period: "Aug 2023 – Oct 2025",
    type: 'work',
    description: [
      "Management of restaurant operations with a focus on customer satisfaction.",
      "Responsible for staff management, procurement, and process optimisation.",
      "Development of business strategies for future franchise expansion."
    ]
  },
  {
    id: 'w6',
    role: "Business Development",
    company: "GAO TEK",
    period: "May 2025 – Jul 2025",
    type: 'work',
    description: [
      "Conducted market analyses to identify potential customers.",
      "Assisted in outreach campaigns and created pitch materials.",
      "Collaborated with international teams for lead generation."
    ]
  },
  {
    id: 'w7',
    role: "Marketing Research Analyst",
    company: "KINESIS.EU",
    period: "Feb 2024 – Jul 2024",
    type: 'work',
    description: [
      "Developed a strategic marketing model based on UN sustainability research.",
      "Prepared grant applications and project proposals.",
      "Aligned project objectives with SDGs & IDGs."
    ]
  },
  {
    id: 'w8',
    role: "Internship & Bachelor Thesis",
    company: "GOKUL AUTOTECH",
    period: "Jan 2022 – Jul 2022",
    type: 'work',
    description: [
      "Optimised high-pressure and gravity casting to reduce cycle times.",
      "Analysed production processes and implemented efficient workflows."
    ]
  },
  {
    id: 'w9',
    role: "Mechanical Engineering & Automotive Mechanics",
    company: "V.M. CARS",
    period: "Oct 2020 – Jul 2022",
    type: 'work',
    description: [
      "Performed complex vehicle diagnostics and repairs.",
      "Designed custom parts using Fusion 360 & 3D printing.",
      "Researched new mobility solutions as early concept work."
    ]
  }
];

export const EDUCATION: Education[] = [
  {
    institution: "Tomorrow University",
    degree: "Impact MBA – Sustainability, Innovation & Leadership",
    period: "2025 – Present",
    details: "Specialisations: Data Mastery, IoT, Innovation Strategies | Berlin, Germany"
  },
  {
    institution: "Harz University of Applied Sciences",
    degree: "M.Tech – Technology & Innovation Management",
    period: "2023 – 2025",
    details: "Wernigerode, Germany"
  },
  {
    institution: "Chennai Institute of Technology",
    degree: "Bachelor of Mechanical Engineering",
    period: "2018 – 2022",
    details: "Chennai, India"
  }
];

export const PROJECTS: Project[] = [
  {
    id: "p1",
    title: "LensAI Smart Glasses Integration",
    techStack: ["Python", "OpenCV", "Embedded APIs", "Hardware"],
    description: "Development of a complete hardware-to-software pipeline for smart glasses.",
    challenges: "Integrating real-time computer vision on low-power embedded hardware while maintaining battery efficiency.",
    solutions: "Optimized vision models using quantization and implemented efficient event-driven data processing workflows.",
    image: "https://picsum.photos/800/450?random=1"
  },
  {
    id: "p2",
    title: "StoryBridge Android App",
    techStack: ["React Native", "TypeScript", "Supabase", "AWS"],
    description: "Full-stack and mobile development of a social storytelling platform for Android.",
    challenges: "Synchronizing story states across multiple users in real-time with low latency.",
    solutions: "Leveraged Supabase real-time subscriptions and local caching strategies to ensure smooth user experience even with poor connectivity.",
    image: "https://picsum.photos/800/450?random=2"
  },
  {
    id: "p3",
    title: "Thirukkural GPT",
    techStack: ["LLM", "Python", "NLP", "React"],
    description: "An AI-powered semantic search and explanation engine for the ancient Tamil text Thirukkural.",
    challenges: "Preserving the poetic nuance of classical Tamil while providing accurate modern English interpretations.",
    solutions: "Fine-tuned a language model on parallel corpuses of scholarly commentaries to ensure cultural accuracy.",
    image: "https://picsum.photos/800/450?random=6"
  },
  {
    id: "p4",
    title: "VisionOS Spatial Lab",
    techStack: ["Swift", "ARKit", "Spatial Computing", "AI"],
    description: "Experimental spatial computing interfaces exploring human-AI collaboration in 3D space.",
    challenges: "Designing intuitive gesture-based interactions for non-tactile feedback loops in AR environments.",
    solutions: "Implemented predictive hand-tracking models and adaptive UI scaling based on user gaze depth.",
    image: "https://picsum.photos/800/450?random=7"
  },
  {
    id: "p5",
    title: "EU AI Act Research Project",
    techStack: ["Legal Tech", "Data Analysis", "Risk Modeling"],
    description: "Analysis of regulatory impacts, risk classification, and compliance models for AI.",
    challenges: "Translating complex legal regulatory frameworks into technical compliance requirements for developers.",
    solutions: "Created a structured risk classification matrix and a compliance checklist tool for AI deployments.",
    image: "https://picsum.photos/800/450?random=3"
  },
  {
    id: "p6",
    title: "Autonomous Vacuum Cleaning Robot",
    techStack: ["C++", "Sensors", "Embedded Logic"],
    description: "Development of an autonomous cleaning robot with sensor control and embedded logic.",
    challenges: "Obstacle avoidance and path planning in dynamic environments.",
    solutions: "Implemented a custom SLAM-like algorithm using basic sensor arrays for efficient room mapping.",
    image: "https://picsum.photos/800/450?random=4"
  },
  {
    id: "p7",
    title: "CipherPolice Security Tool",
    techStack: ["AI Security", "Browser Extension", "LLM"],
    description: "AI browser security tool focused on detecting malicious patterns.",
    challenges: "Real-time detection without compromising browser performance.",
    solutions: "Used lightweight local models for initial filtering before offloading complex analysis to the cloud.",
    image: "https://picsum.photos/800/450?random=5"
  }
];

export const NAV_ITEMS = [
  { label: 'STATUS', icon: <User size={16} />, href: '#hero' },
  { label: 'TIMELINE', icon: <Terminal size={16} />, href: '#timeline' },
  { label: 'SKILLS', icon: <Code size={16} />, href: '#skills' },
  { label: 'ARCHIVE', icon: <Cpu size={16} />, href: '#projects' },
  { label: 'R&D LAB', icon: <Glasses size={16} />, href: '#lab' },
];
