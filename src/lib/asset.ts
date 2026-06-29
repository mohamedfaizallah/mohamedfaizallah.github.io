export function withBase(path: string): string {
  const base = import.meta.env.BASE_URL || '/';
  const clean = path.replace(/^\/+/, '');
  return `${base.replace(/\/+$/, '')}/${clean}`;
}
