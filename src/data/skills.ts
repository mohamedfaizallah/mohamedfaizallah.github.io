export interface SkillGroup {
  id: string;
  title: string;
  description: string;
  skills: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    id: 'frontend',
    title: 'Frontend',
    description:
      'Building fast, responsive dashboards and product UIs with a strong React + TypeScript foundation.',
    skills: [
      'React',
      'TypeScript',
      'Vite',
      'Tailwind CSS',
      'Redux Toolkit',
      'RTK Query',
      'Responsive Dashboards',
      'Forms & Validation',
      'Reusable UI Components',
    ],
  },
  {
    id: 'backend',
    title: 'Backend',
    description:
      'Designing REST APIs and authentication flows, with a focus on Rust for safe, performant services.',
    skills: [
      'Rust APIs',
      'REST APIs',
      'Authentication',
      'JWT / OAuth Flows',
      'Role-Based Access',
      'SSE / Real-Time Updates',
      'File Upload',
      'PDF Generation',
    ],
  },
  {
    id: 'infra',
    title: 'Data / Infrastructure',
    description:
      'Data modelling, caching and deployment-ready configuration to ship production web apps.',
    skills: [
      'MongoDB',
      'SQL',
      'Redis Caching',
      'Docker',
      'Nginx',
      'Git',
      'Environment Configuration',
      'Deployment-Ready Frontend Config',
    ],
  },
  {
    id: 'business',
    title: 'Business / Automation',
    description:
      'Turning real business workflows into scripts, integrations and automation around ERP and e-commerce.',
    skills: [
      'PHP',
      'JavaScript',
      'Dolibarr / ERP',
      'Shopify GraphQL / REST',
      'Marketplace Integrations',
      'CSV / PDF / Excel Automation',
      'Stock Synchronization',
      'Pricing Automation',
      'Shipment Tracking',
    ],
  },
];
