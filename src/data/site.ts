// -----------------------------------------------------------------------------
// Central place for your personal details. Replace the placeholders below.
// These values are reused across the Hero, Contact, Resume and Footer sections.
// -----------------------------------------------------------------------------

export const site = {
  name: 'Mohamed Faizallah',
  role: 'Remote Full-Stack Developer',
  subtitle: 'React, TypeScript & Rust | Web Apps, APIs, Dashboards & Automation',
  resumeTitle: 'Remote Full-Stack Developer — React, TypeScript, Rust',

  // -------------------------------------------------------------------------
  // PRODUCTION URL — single source of truth for canonical / OG / sitemap.
  // If your GitHub username differs, update it HERE and in: index.html,
  // public/sitemap.xml and public/robots.txt (search for this origin).
  // For a custom domain, set this to e.g. 'https://yourdomain.com'.
  // -------------------------------------------------------------------------
  url: 'https://mohamedfaizallah.github.io',

  // Contact — replace remaining placeholders
  location: 'Tunis, Tunisie',
  phone: '+216 23 09 10 15',
  email: 'mohamed.faizallah@gmail.com',
  linkedin: 'https://www.linkedin.com/in/mohamed-faizallah/',

  // Asset paths (relative to public/). withBase() in src/lib/asset.ts handles
  // the base-path prefix automatically.
  profileImage: 'profile.jpg',
  cvFile: 'cv.pdf',
  // Suggested filename when the visitor downloads the CV.
  cvDownloadName: 'Mohamed-Faizallah-Full-Stack-Developer-React-TypeScript-Rust-CV.pdf',
} as const;

export const languages = ['French', 'English', 'Arabic'];

export const education = [
  {
    degree: 'Licence, Network and System Administration / Administrator',
    school: "Institut supérieur d'informatique",
    year: '2013 – 2016',
  },
];
