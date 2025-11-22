export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string[];
  type: 'work' | 'education';
}

export interface Project {
  id: string;
  title: string;
  techStack: string[];
  description: string;
  challenges: string;
  solutions: string;
  image?: string;
}

export interface Education {
  institution: string;
  degree: string;
  period: string;
  details?: string;
}

export interface Skill {
  name: string;
  level: number; // 0 to 100
  category: 'ai' | 'dev' | 'data' | 'tools';
}

export interface Language {
  name: string;
  level: string; // e.g. "C1", "Native"
  score: number; // 0 to 100 for bar
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

// Extend window to support AI Studio key selection
declare global {
  interface AIStudio {
    hasSelectedApiKey: () => Promise<boolean>;
    openSelectKey: () => Promise<void>;
  }

  interface Window {
    aistudio?: AIStudio;
  }
}