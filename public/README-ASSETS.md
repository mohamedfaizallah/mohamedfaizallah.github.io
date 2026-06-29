# Media assets (public/ folder)

Paths in the app are relative to this folder and resolved through Vite's base.

## Generated automatically — do NOT hand-edit

Run `npm run images:generate` (regenerates from `my photo.png`):

| File                 | Purpose                                  |
| -------------------- | ---------------------------------------- |
| `profile.jpg`        | Hero photo + JSON-LD image (512², SEO filename) |
| `profile.webp`       | Modern-format profile image              |
| `profile-512.jpg`    | Explicit 512² profile image              |
| `og-image.png`       | 1200×630 social share card (name/title/stack + photo) |

Source headshot: **`my photo.png`** (replace this, then re-run the command).

Run `npm run cv:generate` → `cv.pdf` (the downloadable resume).

## Project media — already added ✅

Screenshots and a compressed `<project>-demo.mp4` are in each `projects/<id>/`
folder. The screenshots shown in the gallery (and their captions/order) are
defined per project in `src/data/projects.ts` under `screenshots`.

- **Videos** were re-encoded to web-friendly 720p MP4 (run `node scripts/encode...`
  pattern again if you replace one — keep files well under GitHub's 100 MB limit).
- **To show more / fewer screenshots or change captions:** edit the `screenshots`
  array in `src/data/projects.ts`. ProLancer has extra screenshots already in its
  folder (e.g. `prolancer-admin-users.png`, `prolancer-trainer-wallet.png`) that you
  can add as gallery entries — just add `{ src, alt }` lines.
- Any missing file falls back to a clean browser mockup, so nothing breaks.
