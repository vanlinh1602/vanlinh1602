import { useState, useSyncExternalStore } from 'react';

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

function subscribeVisibility(onChange: () => void): () => void {
  document.addEventListener('visibilitychange', onChange);
  return () => document.removeEventListener('visibilitychange', onChange);
}

function getVisibility(): boolean {
  return document.visibilityState === 'visible';
}

export function useSceneMotion(): SceneMotion {
  const hasReducedMotion: boolean = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotion,
  );
  const isVisible: boolean = useSyncExternalStore(
    subscribeVisibility,
    getVisibility,
  );
  const [override, setOverride] = useState<boolean | null>(null);
  const isEnabled: boolean = override ?? !hasReducedMotion;

  return {
    isEnabled,
    isRunning: isEnabled && isVisible,
    toggle: () => setOverride(!isEnabled),
  };
}
