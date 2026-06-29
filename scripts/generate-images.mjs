// -----------------------------------------------------------------------------
// Generates SEO/social images from the source headshot (public/my photo.png):
//   - public/profile.jpg       (clean filename, ~512px, used on the site)
//   - public/profile.webp      (modern format)
//   - public/profile-512.jpg   (explicit 512 square)
//   - public/og-image.png      (1200x630 social share card)
//
// Run with:  npm run images:generate
// -----------------------------------------------------------------------------

import sharp from 'sharp';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const pub = (p) => resolve(__dirname, '..', 'public', p);
const SRC = pub('my photo.png');

const ACCENT = '#39d0d8';
const VIOLET = '#8b7cff';
const BG = '#0a0e14';

function escapeXml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

async function circularProfile(size) {
  const mask = Buffer.from(
    `<svg width="${size}" height="${size}"><circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}" fill="#fff"/></svg>`,
  );
  return sharp(SRC)
    .resize(size, size, { fit: 'cover', position: 'top' })
    .composite([{ input: mask, blend: 'dest-in' }])
    .png()
    .toBuffer();
}

async function makeProfileVariants() {
  await sharp(SRC).resize(512, 512, { fit: 'cover', position: 'top' }).jpeg({ quality: 86 }).toFile(pub('profile.jpg'));
  await sharp(SRC).resize(512, 512, { fit: 'cover', position: 'top' }).webp({ quality: 84 }).toFile(pub('profile.webp'));
  await sharp(SRC).resize(512, 512, { fit: 'cover', position: 'top' }).jpeg({ quality: 86 }).toFile(pub('profile-512.jpg'));
  console.log('profile.jpg / profile.webp / profile-512.jpg written');
}

async function makeOgImage() {
  const W = 1200;
  const H = 630;
  const photoSize = 360;
  const photoX = W - photoSize - 110; // right side
  const photoY = (H - photoSize) / 2;

  const name = escapeXml('Mohamed Faizallah');
  const title = escapeXml('Remote Full-Stack Developer');
  const stack = escapeXml('React  •  TypeScript  •  Rust');
  const tagline = escapeXml('Web Apps · APIs · Dashboards · Automation');

  const bg = Buffer.from(`
    <svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="glow" cx="22%" cy="0%" r="80%">
          <stop offset="0%" stop-color="${ACCENT}" stop-opacity="0.18"/>
          <stop offset="60%" stop-color="${BG}" stop-opacity="0"/>
        </radialGradient>
        <linearGradient id="rule" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="${ACCENT}"/>
          <stop offset="100%" stop-color="${VIOLET}"/>
        </linearGradient>
      </defs>
      <rect width="${W}" height="${H}" fill="${BG}"/>
      <rect width="${W}" height="${H}" fill="url(#glow)"/>
      <rect x="14" y="14" width="${W - 28}" height="${H - 28}" rx="22" fill="none" stroke="${ACCENT}" stroke-opacity="0.28" stroke-width="2"/>

      <text x="80" y="150" font-family="Arial, Helvetica, sans-serif" font-size="22" letter-spacing="3" fill="${ACCENT}" font-weight="700">~/ PORTFOLIO</text>

      <text x="78" y="250" font-family="Arial, Helvetica, sans-serif" font-size="70" fill="#ffffff" font-weight="800">${name}</text>

      <text x="80" y="316" font-family="Arial, Helvetica, sans-serif" font-size="40" fill="${ACCENT}" font-weight="700">${title}</text>

      <rect x="80" y="345" width="360" height="3" rx="1.5" fill="url(#rule)"/>

      <text x="80" y="412" font-family="Arial, Helvetica, sans-serif" font-size="34" fill="#d7dee8" font-weight="600">${stack}</text>
      <text x="80" y="462" font-family="Arial, Helvetica, sans-serif" font-size="25" fill="#8b97a7">${tagline}</text>

      <rect x="80" y="500" width="290" height="44" rx="22" fill="${ACCENT}" fill-opacity="0.12" stroke="${ACCENT}" stroke-opacity="0.5"/>
      <circle cx="104" cy="522" r="6" fill="#5be8a3"/>
      <text x="120" y="530" font-family="Arial, Helvetica, sans-serif" font-size="20" fill="${ACCENT}" font-weight="600">100% Remote · Available</text>

      <circle cx="${photoX + photoSize / 2}" cy="${photoY + photoSize / 2}" r="${photoSize / 2 + 8}" fill="none" stroke="url(#rule)" stroke-width="5"/>
    </svg>
  `);

  const profile = await circularProfile(photoSize);

  await sharp(bg)
    .composite([{ input: profile, top: Math.round(photoY), left: Math.round(photoX) }])
    .png()
    .toFile(pub('og-image.png'));
  console.log('og-image.png written (1200x630)');
}

await makeProfileVariants();
await makeOgImage();
console.log('Done.');
