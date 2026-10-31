import { useCallback, useSyncExternalStore } from 'react';

import { SECTION_IDS } from '@/content';
import type { ActiveSection } from '@/types';

/** `isReplace` swaps the current history entry instead of adding one. */
type NavigateSection = (section: ActiveSection, isReplace?: boolean) => void;

const HISTORY_EVENTS = ['hashchange', 'popstate'] as const;

function subscribeHistory(onChange: () => void): () => void {
  HISTORY_EVENTS.forEach((name) => window.addEventListener(name, onChange));
  return () =>
    HISTORY_EVENTS.forEach((name) =>
      window.removeEventListener(name, onChange),
    );
}

function readHashSection(): ActiveSection {
  const raw: string = window.location.hash.slice(1);
  let id: string;
  try {
    id = decodeURIComponent(raw);
  } catch {
    // A malformed escape such as `#%` is just an unknown section.
    return null;
  }
  return SECTION_IDS.find((section) => section === id) ?? null;
}

/** The open section, kept in `location.hash` so links and Back work. */
export function useHashSection(): readonly [ActiveSection, NavigateSection] {
  const active: ActiveSection = useSyncExternalStore(
    subscribeHistory,
    readHashSection,
  );

  const navigate = useCallback<NavigateSection>(
    (section, isReplace = false) => {
      if (section === readHashSection()) return;
      const { pathname, search } = window.location;
      const url: string = section ? `#${section}` : pathname + search;
      if (isReplace) history.replaceState(null, '', url);
      else history.pushState(null, '', url);
      // pushState fires no event of its own.
      window.dispatchEvent(new PopStateEvent('popstate'));
    },
    [],
  );

  return [active, navigate];
}
