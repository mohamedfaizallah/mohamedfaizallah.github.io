export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  current?: boolean;
  summary: string;
  bullets: string[];
  stack: string[];
}

export const experience: ExperienceItem[] = [
  {
    id: 'independent',
    role: 'Full-Stack Developer',
    company: 'Independent / Self-Driven Products',
    period: '2025 — Present',
    summary:
      'Building complete web products end to end, with an owner’s mindset for quality, detail and optimization.',
    bullets: [
      'Design and ship full applications end to end — data model, Rust/REST APIs, React + TypeScript dashboards, authentication, file handling and automation.',
      'Treat every commit like production: clean, intentional Git history, readable code and care for the small details that make a product feel finished.',
      'Obsess over optimization — profile, refactor and tune performance, UX and code clarity instead of stopping at “good enough”.',
      'Take full ownership of each feature: understand the requirement, build it, then keep enhancing and polishing it until it’s genuinely solid.',
    ],
    stack: [
      'React',
      'TypeScript',
      'Rust',
      'Redux Toolkit',
      'REST APIs',
      'Authentication',
      'Docker',
      'Git',
    ],
  },
];
