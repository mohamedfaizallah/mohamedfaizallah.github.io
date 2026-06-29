/**
 * Prefix a public-folder path with Vite's BASE_URL so assets resolve correctly
 * both locally and when deployed under a GitHub Pages sub-path (e.g. /repo/).
 *
 * Pass paths WITHOUT a leading slash, e.g. withBase('profile.jpg').
 */
export function withBase(path: string): string {
  const base = import.meta.env.BASE_URL || '/';
  const clean = path.replace(/^\/+/, '');
  return `${base.replace(/\/+$/, '')}/${clean}`;
}
