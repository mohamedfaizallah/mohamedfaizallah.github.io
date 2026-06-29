// -----------------------------------------------------------------------------
// Generates a clean, one-page, ATS-friendly PDF resume at public/cv.pdf.
//
// Run with:  npm run cv:generate
//
// Design goals: plain white background, dark text, standard fonts (Helvetica),
// clear headings, no graphics/screenshots — readable by recruiters and ATS.
//
// To update the CV: edit the `data` object below, then re-run the command.
// -----------------------------------------------------------------------------

import PDFDocument from 'pdfkit';
import { createWriteStream, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(__dirname, '..', 'public', 'cv.pdf');

// --- Content -----------------------------------------------------------------
const data = {
  name: 'Mohamed Faizallah',
  title: 'Full-Stack Developer - React, TypeScript, Rust',
  contact:
    'Tunis, Tunisie | 100% remote | +216 23 09 10 15 | mohamed.faizallah@gmail.com | LinkedIn: linkedin.com/in/mohamed-faizallah',

  profile: [
    'Full-stack developer focused on practical business web apps: APIs, dashboards, authentication, admin panels, payments, file handling and automation. I like building the whole flow, not just isolated screens: data model, backend routes, frontend state, UI details and the small tools that make a product usable.',
    'I work like an owner: I sweat the details, keep a clean and intentional Git history, and treat optimization and polish as part of the job, not an afterthought. Looking for a 100% remote role where I can contribute on both frontend and backend.',
  ],

  stack: [
    ['Frontend', 'React, TypeScript, Vite, Tailwind CSS, Redux Toolkit, RTK Query, responsive dashboards, forms.'],
    ['Backend', 'Rust APIs, REST, authentication, JWT/OAuth flows, role-based access, SSE/real-time updates, file upload.'],
    ['Data / infra', 'MongoDB / SQL depending on project, Redis caching, Docker, Nginx, Git, environment configuration.'],
    ['Business tools', 'PHP, JavaScript, Dolibarr, Shopify GraphQL/REST, marketplace integrations, CSV/PDF/Excel automation.'],
  ],

  experience: [
    {
      role: 'Full-Stack Developer',
      org: 'Independent / Self-Driven Products',
      period: '2025 - Present',
      bullets: [
        'Design and ship full applications end to end: data model, Rust/REST APIs, React + TypeScript dashboards, authentication, file handling and automation.',
        'Treat every commit like production: clean, intentional Git history, readable code and care for the small details that make a product feel finished.',
        'Obsess over optimization: profile, refactor and tune performance, UX and code clarity instead of stopping at "good enough".',
        'Take full ownership of each feature: understand the requirement, build it, then keep enhancing and polishing it until it is genuinely solid.',
      ],
    },
  ],

  projects: [
    {
      name: 'ProLancer - Freelance Marketplace & Training Platform for Tunisia',
      meta: 'Founder / Full-stack project | Mar 2026 - Jun 2026',
      bullets: [
        'Full-stack marketplace connecting companies, freelancers and trainers, built for a market where Stripe and PayPal are unavailable.',
        'Designed a bank-transfer escrow system (references, admin validation, wallet/ledger payouts) as the trust layer in place of a card gateway.',
        'Money in integer millimes with one canonical TVA 19% / commission model across catalogue, checkout, wallets and invoices.',
        'Training platform with quizzes, certificates and server-enforced paid-content access; automated PDF invoices, contracts and certificates.',
      ],
      tech: 'Rust (actix-web), MongoDB, Redis, React, TypeScript, Redux Toolkit Query, SSE, JWT, PDF generation.',
    },
    {
      name: 'TicketApp - High-Concurrency Sports Ticketing & Gate Scanning Platform',
      meta: 'Backend & full-stack project (client) | Nov 2025 - Feb 2026',
      bullets: [
        'Sports ticketing platform with a Redis-backed virtual waiting-room queue and atomic, per-seat ticket purchasing with unique QR tickets.',
        'Double-entry wallet ledger with idempotent credits reconciling to the cent; gate scanning, dashboards, analytics and payouts.',
        'Load-tested with k6 to 50,000 concurrent fans: sub-100 ms (p95) queue reads, zero overselling or double-charging.',
        'Fixed two launch-blocking concurrency bugs and tuned auth/indexes to run on a single 4 vCPU / 8 GB server.',
      ],
      tech: 'Rust (Actix-web), MongoDB (transactions), Redis, React, TypeScript, k6, JWT, PDF generation.',
    },
    {
      name: 'Linkora - Recruitment CRM and Candidate Pipeline',
      meta: 'Personal full-stack project | Sep 2025 - Nov 2025',
      bullets: [
        'Built a recruitment CRM covering candidates, companies, clients, agents, managers, objectives and admin users.',
        'Implemented candidate records with CV upload/download, technical folders, skills, salary, availability, mobility and visa process information.',
        'Created LinkedIn import review/conversion flows, client personas, campaign modules and analytics screens.',
        'Worked on role-based permissions, profile management, notifications and deployment-ready frontend configuration.',
      ],
      tech: 'React, TypeScript, Redux Toolkit, Rust backend, SendGrid integration, file upload, Docker, Nginx.',
    },
    {
      name: 'BATIQAD - Construction Company Website',
      meta: 'Frontend project | Aug 2025 - Sep 2025',
      bullets: [
        'Delivered a responsive company website with landing page, services, sectors, project gallery, process and contact sections.',
        'Structured services and projects as reusable data files, making the site easier to maintain without touching layout code.',
        'Built reusable components for hero, header, footer, cards, project modal and brand-focused presentation.',
      ],
      tech: 'React, Vite, JavaScript, Tailwind CSS, reusable components, responsive UI.',
    },
  ],

  education:
    "Licence, Network and System Administration / Administrator - Institut superieur d'informatique (2013 - 2016)",
  languages: 'French, English, Arabic',
  remote:
    'Comfortable with async communication, written updates, Git-based collaboration and timezone-flexible work.',
};

// --- Layout ------------------------------------------------------------------
const INK = '#1a1a1a';
const MUTED = '#444444';
const RULE = '#999999';
const MARGIN = 34;

mkdirSync(dirname(OUT), { recursive: true });

const doc = new PDFDocument({
  size: 'A4',
  margins: { top: MARGIN, bottom: MARGIN, left: MARGIN, right: MARGIN },
  info: {
    Title: `${data.name} - CV`,
    Author: data.name,
    Subject: data.title,
  },
});
doc.pipe(createWriteStream(OUT));

const pageWidth = doc.page.width - MARGIN * 2;

function heading(text) {
  doc.moveDown(0.22);
  doc.font('Helvetica-Bold').fontSize(9.5).fillColor(INK).text(text.toUpperCase(), { characterSpacing: 0.5 });
  const y = doc.y + 1;
  doc.moveTo(MARGIN, y).lineTo(doc.page.width - MARGIN, y).lineWidth(0.6).strokeColor(RULE).stroke();
  doc.moveDown(0.2);
}

function para(text, { size = 8.5, color = INK, gap = 0.12 } = {}) {
  doc.font('Helvetica').fontSize(size).fillColor(color).text(text, { align: 'left', lineGap: 0 });
  doc.moveDown(gap);
}

function bullets(items) {
  doc.font('Helvetica').fontSize(8.5).fillColor(INK);
  doc.list(items, {
    bulletRadius: 1.1,
    textIndent: 9,
    bulletIndent: 2,
    lineGap: 0,
    paragraphGap: 0.5,
  });
}

function labeled(label, rest, { size = 8.5 } = {}) {
  doc.fontSize(size).fillColor(INK);
  doc.font('Helvetica-Bold').text(`${label}: `, { continued: true });
  doc.font('Helvetica').text(rest, { lineGap: 1 });
}

// --- Header ------------------------------------------------------------------
doc.font('Helvetica-Bold').fontSize(18).fillColor(INK).text(data.name);
doc.font('Helvetica').fontSize(10.5).fillColor(MUTED).text(data.title);
doc.moveDown(0.2);
doc.font('Helvetica').fontSize(8.5).fillColor(MUTED).text(data.contact, { width: pageWidth, lineGap: 0.5 });

// --- Profile -----------------------------------------------------------------
heading('Profile');
data.profile.forEach((p) => para(p, { gap: 0.3 }));

// --- Technical Stack ---------------------------------------------------------
heading('Technical Stack');
data.stack.forEach(([label, rest]) => {
  labeled(label, rest);
  doc.moveDown(0.18);
});

// --- Experience --------------------------------------------------------------
heading('Experience');
data.experience.forEach((job) => {
  doc.font('Helvetica-Bold').fontSize(9.5).fillColor(INK).text(`${job.role} | ${job.org}`);
  doc.font('Helvetica-Oblique').fontSize(8.5).fillColor(MUTED).text(job.period);
  doc.moveDown(0.18);
  bullets(job.bullets);
});

// --- Selected Projects -------------------------------------------------------
heading('Selected Projects');
data.projects.forEach((p, i) => {
  if (i > 0) doc.moveDown(0.35);
  doc.font('Helvetica-Bold').fontSize(9.5).fillColor(INK).text(p.name);
  doc.font('Helvetica-Oblique').fontSize(8.5).fillColor(MUTED).text(p.meta);
  doc.moveDown(0.18);
  bullets(p.bullets);
  doc.moveDown(0.15);
  labeled('Tech', p.tech, { size: 8.5 });
});

// --- Education & Languages ---------------------------------------------------
heading('Education & Languages');
labeled('Education', data.education);
doc.moveDown(0.18);
labeled('Languages', data.languages);
doc.moveDown(0.18);
labeled('Remote work', data.remote);

doc.end();

doc.on('end', () => {});
console.log(`CV written to ${OUT}`);
