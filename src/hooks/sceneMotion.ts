import { useState, useSyncExternalStore } from 'react';

import { usePageVisibility } from '@/hooks/pageVisibility';

interface SceneMotion {
  readonly isEnabled: boolean;
  readonly isRunning: boolean;
  readonly toggle: () => void;
}

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

function subscribeReducedMotion(onChange: () => void): () => void {
  const query: MediaQueryList = window.matchMedia(REDUCED_MOTION_QUERY);
  query.addEventListener('change', onChange);
  return () => query.removeEventListener('change', onChange);
}

function getReducedMotion(): boolean {
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

export function useSceneMotion(): SceneMotion {
  const hasReducedMotion: boolean = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotion,
  );
  const isVisible: boolean = usePageVisibility();
  const [override, setOverride] = useState<boolean | null>(null);
  const isEnabled: boolean = override ?? !hasReducedMotion;

  return {
    isEnabled,
    isRunning: isEnabled && isVisible,
    toggle: () => setOverride(!isEnabled),
  };
}
