import { useEffect, useState } from 'react';

/**
 * Returns the id of the section currently considered "active" based on
 * scroll position, using IntersectionObserver. Used to highlight nav links.
 */
export function useActiveSection(ids: string[]): string {
  const [active, setActive] = useState(ids[0] ?? '');

  // Depend on a stable string key, not the array identity. Callers usually
  // pass a fresh array each render (e.g. links.map(...)); without this the
  // observer would be rebuilt on every render, churning the main thread.
  const key = ids.join('|');

  useEffect(() => {
    const sections = key
      .split('|')
      .filter(Boolean)
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the entry nearest the top that is sufficiently visible.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]?.target.id) {
          setActive(visible[0].target.id);
        }
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [key]);

  return active;
}
