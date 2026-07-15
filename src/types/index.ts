export interface SkillItem {
  name: string;
  icon?: string; // Caminho ou SVG inline representativo
  level?: 'Iniciante' | 'Intermediário' | 'Avançado' | 'Especialista';
}

export interface SkillCategory {
  title: string;
  skills: SkillItem[];
}

export interface Project {
  id: string | number;
  title: string;
  description: string;
  imageUrl?: string;
  technologies: string[];
  githubUrl?: string;
  demoUrl?: string;
}
