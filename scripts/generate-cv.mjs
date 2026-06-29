// -----------------------------------------------------------------------------
// Generates a clean, readable, ATS-friendly PDF resume (1-2 pages) at public/cv.pdf.
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
      tech: 'Rust (actix-web), MongoDB, Redis, React, TypeScript, RTK Query, SSE, JWT.',
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
// Readability first: generous spacing, ~10.5pt body, ~13.5pt headings,
// ~17mm margins, white background, dark text. Flows to a 2nd page if needed.
const INK = '#1a1a1a';
const MUTED = '#555555';
const RULE = '#cfcfcf';
const MARGIN = 50; // ~17.6mm

const BODY = 10.5;
const HEADING = 13.5;
const ROLE = 11;
const META = 9.5;

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
const pageBottom = doc.page.height - MARGIN;

/** Add a fixed vertical gap in points. */
const gap = (pts) => {
  doc.y += pts;
};

/** Start a new page if less than `min` points remain (keeps blocks together). */
function ensureSpace(min) {
  if (doc.y + min > pageBottom) doc.addPage();
}

function heading(text) {
  ensureSpace(58);
  gap(8);
  doc.font('Helvetica-Bold').fontSize(HEADING).fillColor(INK).text(text);
  const y = doc.y + 3;
  doc.moveTo(MARGIN, y).lineTo(doc.page.width - MARGIN, y).lineWidth(0.75).strokeColor(RULE).stroke();
  gap(6);
}

function para(text) {
  doc.font('Helvetica').fontSize(BODY).fillColor(INK).text(text, { align: 'left', lineGap: 1.5 });
  gap(2);
}

function bullets(items) {
  doc.font('Helvetica').fontSize(BODY).fillColor(INK);
  doc.list(items, {
    bulletRadius: 1.4,
    textIndent: 12,
    bulletIndent: 2,
    lineGap: 1.5,
    paragraphGap: 3.5,
  });
}

function labeled(label, rest) {
  doc.fontSize(BODY).fillColor(INK);
  doc.font('Helvetica-Bold').text(`${label}:  `, { continued: true });
  doc.font('Helvetica').text(rest, { lineGap: 2.5 });
}

// --- Header ------------------------------------------------------------------
doc.font('Helvetica-Bold').fontSize(21).fillColor(INK).text(data.name);
gap(2);
doc.font('Helvetica').fontSize(12).fillColor(MUTED).text(data.title);
gap(5);
doc.font('Helvetica').fontSize(META).fillColor(MUTED).text(data.contact, { width: pageWidth, lineGap: 2 });

// --- Profile -----------------------------------------------------------------
heading('Profile');
data.profile.forEach((p) => para(p));

// --- Technical Stack ---------------------------------------------------------
heading('Technical Stack');
data.stack.forEach(([label, rest]) => {
  labeled(label, rest);
  gap(4);
});

// --- Experience --------------------------------------------------------------
heading('Experience');
data.experience.forEach((job) => {
  doc.font('Helvetica-Bold').fontSize(ROLE).fillColor(INK).text(`${job.role}  |  ${job.org}`);
  gap(2);
  doc.font('Helvetica-Oblique').fontSize(META).fillColor(MUTED).text(job.period);
  gap(6);
  bullets(job.bullets);
});

// --- Selected Projects -------------------------------------------------------
heading('Selected Projects');
data.projects.forEach((p, i) => {
  // Keep each project block from splitting across the page boundary.
  ensureSpace(105);
  if (i > 0) gap(9);
  doc.font('Helvetica-Bold').fontSize(ROLE).fillColor(INK).text(p.name);
  gap(2);
  doc.font('Helvetica-Oblique').fontSize(META).fillColor(MUTED).text(p.meta);
  gap(6);
  bullets(p.bullets);
  gap(6);
  labeled('Tech', p.tech);
});

// --- Education & Languages ---------------------------------------------------
heading('Education & Languages');
labeled('Education', data.education);
gap(8);
labeled('Languages', data.languages);
gap(8);
labeled('Remote work', data.remote);

doc.end();

console.log(`CV written to ${OUT}`);
