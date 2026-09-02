export interface Skill {
  name: string;
  icon?: string;
}

export interface SkillCategory {
  title: string;
  variant: 'cyan' | 'amber' | 'green';
  skills: Skill[];
}

export interface Experience {
  period: string;
  role: string;
  company: string;
  location?: string;
  description: string;
  tags?: string[];
  isCurrent?: boolean;
}

export interface Project {
  title: string;
  role: string;
  description: string;
  tech: string[];
  highlight?: string;
  link?: string;
  linkText?: string;
  github?: string;
}

export interface Education {
  period: string;
  degree: string;
  institution: string;
  focus?: string;
  isCurrent?: boolean;
  badge?: string;
}

export interface CurrentStatus {
  role: string;
  institution: string;
  detail: string;
  icon: string;
  color: 'cyan' | 'amber' | 'green';
  link?: string;
  linkText?: string;
}

export interface NavItem {
  id: string;
  label: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}