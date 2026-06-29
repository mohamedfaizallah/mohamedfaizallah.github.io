export interface ProjectImage {
  /** Path relative to public/. */
  src: string;
  /** Descriptive alt text / caption shown in the gallery. */
  alt: string;
}

export interface CaseStudy {
  /** Background and the problem this project addresses. */
  context: string;
  /** A concise statement of what was actually built. */
  whatIBuilt: string;
  /** Notable architectural / technical choices and why. */
  technicalDecisions: string[];
  /** Outcome and value delivered. Use "Add metric here" placeholders, no fake numbers. */
  result: string;
}

export interface Project {
  id: string;
  title: string;
  /** One-line description. */
  tagline: string;
  role: string;
  date: string;
  /** Short category labels, e.g. Full-stack, Rust API, Dashboard. */
  labels: string[];
  /** Tech stack badges. */
  stack: string[];
  /** The problem the project solves. */
  problem: string;
  /** Main product features. */
  features: string[];
  /** Lower-level technical highlights. */
  technicalHighlights: string[];
  /** Captioned screenshots shown in the card preview and gallery. */
  screenshots: ProjectImage[];
  /** Optional local demo video path (relative to public/). */
  video?: string;
  /** External links — leave as '#' placeholders if not available yet. */
  links: {
    demo?: string;
    repo?: string;
  };
  /** Highlight accent for the card. */
  accent: 'cyan' | 'violet';
  caseStudy: CaseStudy;
}

export const projects: Project[] = [
  {
    id: 'prolancer',
    title: 'ProLancer — Freelance Marketplace & Training Platform for Tunisia',
    tagline:
      "Full-stack marketplace connecting Tunisian companies, freelancers and trainers — escrow payments via bank transfer, digital contracts and an online course platform, built for a market where Stripe and PayPal don't work.",
    role: 'Full-Stack Engineer · Founder project',
    date: 'Mar 2026 — Jun 2026',
    accent: 'cyan',
    labels: ['Full-stack', 'Rust · actix-web', 'Escrow Payments', 'Marketplace', 'Training'],
    stack: [
      'Rust',
      'actix-web',
      'MongoDB',
      'Redis',
      'React 18',
      'TypeScript',
      'Redux Toolkit Query',
      'Vite',
      'SSE',
      'JWT Auth',
      'PDF Generation',
    ],
    problem:
      "International freelance platforms (Upwork, Fiverr) don't serve Tunisia well: card processors like Stripe Connect aren't available to Tunisian businesses, payouts are hard, and nothing is adapted to local tax rules (TVA 19%, stamp duty) or the way people actually pay — bank transfer. Companies had no trusted way to hire local freelancers with payment protection, freelancers had no reliable way to get paid, and trainers had nowhere to sell courses. The core challenge: build the trust layer of a marketplace — escrow plus contracts — without a card payment provider.",
    features: [
      'Missions, applications and digital contracts',
      'Escrow held until work is delivered',
      'Manual bank-transfer payment flow with admin validation',
      'Wallet / ledger system with payouts',
      'Tunisia-specific tax logic (TVA 19%, stamp duty)',
      'Training platform: courses in video, PDF, text and quizzes',
      'Enrollments, progress tracking and certificates',
      'Server-enforced paid-content access control',
      'Automated invoices, contracts and certificates as PDFs',
      'Role-based dashboards: companies, freelancers, trainers, admins',
      'Real-time notifications (Server-Sent Events)',
    ],
    technicalHighlights: [
      'Rust (actix-web) + MongoDB chosen for performance and correctness on the money-handling paths; Redis for caching and payment-locking; SSE for real-time notifications.',
      'Wallet + transaction-ledger + escrow model computed in integer millimes to avoid floating-point errors.',
      'One canonical pricing/commission/VAT model (HT → +19% TVA → TTC) reused across catalogue, checkout, wallets and invoices so every screen agrees on the amount.',
      'Manual bank-transfer escrow with generated references (e.g. VIR-FORM-2026-000001), admin validation, and idempotent confirmation under distributed locks.',
      'Server-enforced access control on every protected endpoint — locked quiz/lesson content returns 403, not just a hidden button.',
      'Automated PDF generation for invoices, contracts and certificates; configurable legal/banking identity (no hardcoded secrets).',
    ],
    screenshots: [
      { src: 'projects/prolancer/prolancer-company-dashboard.png', alt: 'ProLancer company dashboard — overview of missions, applications and spending' },
      { src: 'projects/prolancer/prolancer-company-missions.png', alt: 'ProLancer: a company posting and managing freelance missions' },
      { src: 'projects/prolancer/prolancer-applications.png', alt: 'ProLancer freelancer applications to a mission' },
      { src: 'projects/prolancer/prolancer-company-contracts.png', alt: 'ProLancer digital contracts between company and freelancer' },
      { src: 'projects/prolancer/prolancer-company-facturation.png', alt: 'ProLancer invoicing with Tunisia-specific tax (TVA 19%)' },
      { src: 'projects/prolancer/prolancer-dashboard-freelancer.png', alt: 'ProLancer freelancer dashboard' },
      { src: 'projects/prolancer/prolancer-freelancer-wallet.png', alt: 'ProLancer freelancer wallet and escrow balance' },
      { src: 'projects/prolancer/prolancer-admin-finance.png', alt: 'ProLancer admin finance — validating bank-transfer escrow payments' },
      { src: 'projects/prolancer/prolancer-admin-dashboard.png', alt: 'ProLancer admin dashboard overview' },
      { src: 'projects/prolancer/prolancer-courses-freelancer.png', alt: 'ProLancer training platform course catalogue' },
      { src: 'projects/prolancer/prolancer-trainer-dashboard.png', alt: 'ProLancer trainer dashboard' },
      { src: 'projects/prolancer/prolancer-trainer-revenue.png', alt: 'ProLancer trainer revenue and payouts' },
    ],
    video: 'projects/prolancer/prolancer-demo.mp4',
    links: { demo: '#', repo: '#' },
    caseStudy: {
      context:
        "ProLancer is a single platform with four roles — companies, freelancers, trainers and admins — covering three connected products: a missions-and-contracts marketplace, a manual bank-transfer escrow system, and an online training platform. It's engineered for a market where Stripe and PayPal don't work, so the trust layer has to be built without a card gateway.",
      whatIBuilt:
        'A full-stack marketplace with escrow at its core: companies post missions, freelancers apply, both sign a digital contract, and money is held in escrow until delivery. A complete bank-transfer flow replaces the card gateway — the platform generates payment instructions, the payer declares the transfer with a reference, an admin validates it, and funds are released through a wallet/ledger system. On top sits a training platform where trainers publish courses (video, PDF, text, quizzes), learners progress and earn certificates, and access to paid content is enforced server-side.',
      technicalDecisions: [
        'Designed a manual bank-transfer escrow flow that gives both sides the protection a card processor normally provides — generated references, admin validation, automatic enrollment/payout activation and step-by-step notifications.',
        'Implemented one canonical pricing/commission/VAT model (HT → +19% TVA → TTC) reused across catalogue, checkout, payment requests, wallets and invoices, so every record always agrees on the amount.',
        'Computed all money in integer millimes to avoid floating-point rounding errors.',
        'Closed a class of bugs where locked course material could be reached by URL or "next" navigation — enforced server-side with a single canAccessLesson rule and regression tests.',
      ],
      result:
        'A production-ready platform serving four user types (companies, freelancers, trainers, admins) across missions, escrow payments and training. Add your real numbers here — e.g. contracts signed and TND held in escrow, courses published and learners enrolled, and test coverage on the financial logic (target: zero rounding discrepancies in payment reconciliation).',
    },
  },
  {
    id: 'ticketapp',
    title: 'TicketApp — High-Concurrency Sports Ticketing & Gate Scanning Platform',
    tagline:
      'Sports ticketing with a virtual waiting-room queue and atomic ticketing/wallet system — load-tested to 50,000 concurrent fans with zero overselling.',
    role: 'Backend & Full-Stack Engineer · Client project (anonymized)',
    date: 'Nov 2025 — Feb 2026',
    accent: 'violet',
    labels: ['Full-stack', 'Rust · Actix-web', 'High-Concurrency', 'Load-Tested 50k', 'Wallet & Payouts'],
    stack: [
      'Rust',
      'Actix-web',
      'React',
      'TypeScript',
      'MongoDB',
      'Redis',
      'k6',
      'JWT / OAuth',
      'PDF Generation',
    ],
    problem:
      "Tunisian football matches sell out in minutes. When a derby goes on sale, tens of thousands of fans hit “buy” in the same few seconds — and most ticketing systems either fall over, oversell seats, or double-charge under that load. The platform needed to hold a fair virtual queue during the rush, sell tickets with zero overselling and zero double-charging, and run affordably on a single modest server.",
    features: [
      'Virtual waiting-room queue with real-time position (Redis-cached)',
      'Five-wide checkout funnel that throttles admission',
      'Atomic ticket purchase with per-seat stock reservation',
      'Unique QR tickets and gate-scanning entry validation',
      'Double-entry wallet ledger (platform + per-club balances, fees, idempotent credits)',
      'Club / Manager / Admin dashboards',
      'Event creation, revenue analytics and PDF reports',
      'Season passes, buyers and payout requests',
      'Google OAuth and role-based access',
      'Multi-sport / competition support',
      'Rate-limiting and brute-force protection',
    ],
    technicalHighlights: [
      'Load-tested with k6 to 50,000 concurrent fans; queue status reads held sub-100 ms (p95) from 15k → 37.5k → 50k depth with 0 errors.',
      'Fixed a MongoDB write-conflict that turned ~90% of simultaneous purchases into server errors, using a transaction-retry strategy (12/12 concurrent purchases succeed, 0 errors).',
      'Fixed a silent wallet-credit loss under concurrency and reconciled the ledger with a safe backfill for affected records.',
      'Moved CPU-heavy password hashing off the async event loop to keep the app responsive during login surges.',
      'Added database indexes that dropped a full-collection cleanup scan from ~13 s → ~0 at 50k.',
      'Data-driven infrastructure sizing: the core runs comfortably on a single 4 vCPU / 8 GB server for a normal launch.',
    ],
    screenshots: [
      { src: 'projects/ticketapp/ticketapp-home.png', alt: 'TicketApp landing page — buy tickets for Tunisian sports clubs' },
      { src: 'projects/ticketapp/ticketapp-events.png', alt: 'TicketApp events listing across football, basketball, handball and volleyball' },
      { src: 'projects/ticketapp/ticketapp-clubs.png', alt: 'TicketApp clubs directory' },
      { src: 'projects/ticketapp/ticketapp-my-ticket-qr.png', alt: 'TicketApp QR-coded ticket with PDF download for gate scanning' },
      { src: 'projects/ticketapp/ticketapp-events-2.png', alt: 'TicketApp event browsing with sport filters' },
      { src: 'projects/ticketapp/ticketapp-register.png', alt: 'TicketApp account registration' },
    ],
    video: 'projects/ticketapp/ticketapp-demo.mp4',
    links: { demo: '#', repo: '#' },
    caseStudy: {
      context:
        "A Tunisian sports-ticketing startup needed a platform that could survive a derby on-sale, where tens of thousands of fans hit “buy” in the same few seconds. Most systems fall over, oversell seats, or double-charge under that load — so the system had to stay fair, correct and affordable on a single modest server.",
      whatIBuilt:
        'A complete ticketing platform with a virtual waiting-room queue at its core: fans wait in a live, Redis-cached queue with real-time position and are admitted to checkout a few at a time, then buy through an atomic purchase path with per-seat reservation, unique QR tickets and a double-entry wallet ledger. Club/Manager/Admin dashboards cover event creation, revenue analytics, PDF reports, season passes, payouts and gate scanning.',
      technicalDecisions: [
        'Designed a virtual waiting-room queue (Redis) so the system throttles a traffic spike instead of collapsing under it — admitting a few fans to checkout at a time.',
        'Made the purchase path atomic with per-seat stock reservation and MongoDB multi-document transactions, plus a retry strategy to eliminate write-conflict errors under concurrency.',
        'Used a double-entry wallet ledger with idempotent credits so club balances reconcile exactly and can be audited.',
        'Proved it under load with k6 (50k concurrent), caught two launch-blocking concurrency bugs in staging, and sized infrastructure from real metrics.',
      ],
      result:
        'Validated to 50,000 concurrent fans with sub-100 ms (p95) queue reads and zero data corruption. Two critical concurrency bugs caught pre-launch — preventing lost revenue, double-charges and underpaid partners. Financial integrity guaranteed: no overselling, no duplicate tickets/QRs, and an idempotent wallet ledger that reconciles to the cent. Runs on a single 4 vCPU / 8 GB server for a normal launch, with a documented path to big-match scale. Architected, built and load-tested — live payment-gateway integration is still pending.',
    },
  },
  {
    id: 'linkora',
    title: 'Linkora — Recruitment CRM & Candidate Pipeline',
    tagline:
      'Recruitment CRM covering candidates, clients and campaigns with role-based access and analytics.',
    role: 'Personal full-stack project',
    date: 'Sep 2025 — Nov 2025',
    accent: 'cyan',
    labels: ['Full-stack', 'CRM', 'Rust API', 'File Handling', 'Docker'],
    stack: [
      'React',
      'TypeScript',
      'Redux Toolkit',
      'Rust',
      'SendGrid',
      'File Upload',
      'Docker',
      'Nginx',
    ],
    problem:
      'Recruitment teams track candidates, companies, clients and campaigns across spreadsheets and inboxes. Linkora centralises the pipeline with the right permissions for agents, managers and admins.',
    features: [
      'Candidate records with CV upload / download',
      'Technical folders, skills, salary, availability and mobility',
      'Visa process information',
      'LinkedIn import review / conversion flows',
      'Client personas',
      'Campaign modules',
      'Analytics screens',
      'Role-based permissions',
      'Profile management and notifications',
      'Deployment-ready frontend configuration',
    ],
    technicalHighlights: [
      'Role-based permissions for candidates, companies, clients, agents, managers and admin users.',
      'CV upload/download and technical folder management with file handling.',
      'LinkedIn import review and conversion into structured candidate records.',
      'SendGrid integration for transactional and campaign email.',
      'Dockerised build with Nginx and deployment-ready frontend configuration.',
    ],
    screenshots: [
      { src: 'projects/linkora/linkora-manager-dashboard.png', alt: 'Linkora manager dashboard — companies, clients, candidates and users at a glance' },
      { src: 'projects/linkora/linkora-candidates-pipeline.png', alt: 'Linkora candidate pipeline with filters and LinkedIn import' },
      { src: 'projects/linkora/linkora-candidate-details.png', alt: 'Linkora candidate profile — info, CV, skills, scores and mobility' },
      { src: 'projects/linkora/linkora-users-permissions.png', alt: 'Linkora users and role-based permissions (HR, recruiter, manager)' },
      { src: 'projects/linkora/linkora-linkedin-import.png', alt: 'Linkora LinkedIn import review and notifications' },
    ],
    video: 'projects/linkora/linkora-demo.mp4',
    links: { demo: '#', repo: '#' },
    caseStudy: {
      context:
        'Recruitment data is fragmented across CVs, emails and notes. Linkora gives each role — from agent to admin — a structured view of candidates, clients and campaigns in one CRM.',
      whatIBuilt:
        'A recruitment CRM with candidate records, CV handling, technical folders, client personas, campaign modules and analytics, wrapped in role-based permissions and a Dockerised, deployment-ready setup.',
      technicalDecisions: [
        'Designed role-based permissions so agents, managers and admins only see what they should.',
        'Built LinkedIn import review/conversion to turn raw profiles into structured candidate data.',
        'Integrated SendGrid for reliable transactional and campaign email.',
        'Containerised with Docker + Nginx and prepared deployment-ready frontend configuration.',
      ],
      result:
        'A single pipeline for the recruitment workflow. Add metric here (e.g. candidate records managed, time saved per placement).',
    },
  },
  {
    id: 'batiqad',
    title: 'BATIQAD — Construction Company Website',
    tagline:
      'Responsive, brand-focused company website with services, sectors and a project gallery.',
    role: 'Frontend project',
    date: 'Aug 2025 — Sep 2025',
    accent: 'violet',
    labels: ['Frontend', 'Responsive UI', 'Marketing Site', 'Component Library'],
    stack: ['React', 'Vite', 'JavaScript', 'Tailwind CSS', 'Reusable Components', 'Responsive UI'],
    problem:
      'A construction company needed a clear, professional online presence that presents its services, sectors and completed projects, and makes it easy for prospects to get in touch.',
    features: [
      'Landing page',
      'Services section',
      'Sectors section',
      'Project gallery',
      'Process section',
      'Contact section',
      'Reusable data files for services and projects',
      'Reusable components: hero, header, footer, cards, project modal',
      'Brand-focused presentation',
    ],
    technicalHighlights: [
      'Data-driven content via reusable data files for services and projects.',
      'Reusable component library: hero, header, footer, cards and a project modal.',
      'Fully responsive UI built with Tailwind CSS.',
      'Fast Vite build suitable for static hosting.',
    ],
    screenshots: [
      { src: 'projects/batiqad/batiqad-home.png', alt: 'BATIQAD landing page — engineering, construction and technical infrastructure' },
      { src: 'projects/batiqad/batiqad-services.png', alt: 'BATIQAD technical expertise and services section' },
      { src: 'projects/batiqad/batiqad-sectors.png', alt: 'BATIQAD sectors served across construction' },
      { src: 'projects/batiqad/batiqad-projects-gallery.png', alt: 'BATIQAD project reference gallery' },
      { src: 'projects/batiqad/batiqad-process.png', alt: 'BATIQAD structured engineering process section' },
      { src: 'projects/batiqad/batiqad-why-us.png', alt: 'BATIQAD quality and differentiation section' },
      { src: 'projects/batiqad/batiqad-contact.png', alt: 'BATIQAD contact and request-a-quote section' },
    ],
    video: 'projects/batiqad/batiqad-demo.mp4',
    links: { demo: '#', repo: '#' },
    caseStudy: {
      context:
        'A construction business needs to look credible online and communicate what it does at a glance. BATIQAD presents services, sectors and a project gallery in a clean, responsive site.',
      whatIBuilt:
        'A responsive company website with a landing page, services, sectors, a project gallery, a process section and contact — built from reusable components and data files.',
      technicalDecisions: [
        'Drove content from reusable data files so services and projects are easy to update.',
        'Built a small component library (hero, header, footer, cards, project modal) for consistency.',
        'Used Tailwind CSS for a responsive, brand-focused layout.',
        'Kept it a static Vite build for simple, cheap hosting.',
      ],
      result:
        'A professional, easy-to-maintain marketing site. Add metric here (e.g. pages delivered, load time, lead enquiries).',
    },
  },
];
