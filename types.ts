export interface Skill {
  name: string;
  icon?: string;
}

export interface SkillCategory {
  title: string;
  variant: 'cyan' | 'amber' | 'green';
  skills: Skill[];
}

/** A link shown at the bottom of a portal. */
export interface PortalLink {
  label: string;
  url: string;
}

/**
 * Everything a card reveals when it is opened as a portal.
 * Cards stay minimal on the page; the portal carries the full story.
 */
export interface PortalDetails {
  /** One-sentence framing shown first, in larger type. */
  headline?: string;
  /** Paragraphs, in order. */
  story?: string[];
  /** "What I did" bullets. */
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
  icon: string;
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
