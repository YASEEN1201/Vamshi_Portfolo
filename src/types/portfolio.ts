export interface ExperienceItem {
  company: string;
  position: string;
  duration: string;
  location?: string;
  responsibilities: string[];
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  technologies: string[];
  description: string;
  visualType: 'audio' | 'scanner';
}

export interface InternshipItem {
  company: string;
  focus: string;
  duration: string;
}

export interface EducationItem {
  institution: string;
  qualification: string;
  subjects: string[];
  university: string;
  duration: string;
}

export interface CertificationItem {
  title: string;
}
