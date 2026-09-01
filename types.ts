export interface Skill {
  name: string;
}

export interface SkillCategory {
  title: string;
  variant: 'cyan' | 'amber' | 'green';
  skills: Skill[];
}

export interface PortalLink {
  label: string;
  url: string;
}

/**
 * Everything a card reveals when opened as a portal.
 * Cards stay minimal on the page; the portal carries the detail.
 */
export interface PortalDetails {
  headline?: string;
  story?: string[];
  highlights?: string[];
  links?: PortalLink[];
}

export interface Experience {
  period: string;
  role: string;
  company: string;
  location?: string;
  description: string;
  tags?: string[];
  isCurrent?: boolean;
  details?: PortalDetails;
}

export interface Project {
  title: string;
  role: string;
  description: string;
  tech: string[];
  highlight?: string;
  details?: PortalDetails;
}

export interface Education {
  period: string;
  degree: string;
  institution: string;
  focus?: string;
  isCurrent?: boolean;
}

export interface CurrentStatus {
  role: string;
  institution: string;
  detail: string;
  color: 'cyan' | 'amber' | 'green';
  details?: PortalDetails;
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
