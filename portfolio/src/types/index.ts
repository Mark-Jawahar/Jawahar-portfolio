export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  image?: string;
  link?: string;
  github?: string;
}

export interface Skill {
  name: string;
  category?: string;
  level?: number;
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  description: string;
  responsibilities: string[];
  achievements: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar?: string;
}

export interface SocialLinks {
  linkedin: string;
  github: string;
  email: string;
}

export interface SiteConfig {
  name: string;
  headline: string;
  shortIntroduction: string;
  location: string;
  experience: string;
  currentCompany: string;
  currentRole: string;
  social: SocialLinks;
  about: {
    yearsOfExperience: string;
    areas: string[];
    currentPosition: string;
    passions: string[];
  };
  achievements: {
    years: string;
    teamMembers: string;
    csatImprovement: string;
    reductionQueries: string;
  };
}
