import { useSyncExternalStore } from 'react';

function subscribeVisibility(onChange: () => void): () => void {
  document.addEventListener('visibilitychange', onChange);
  return () => document.removeEventListener('visibilitychange', onChange);
}

function getVisibility(): boolean {
  return document.visibilityState === 'visible';
}

export function usePageVisibility(): boolean {
  return useSyncExternalStore(subscribeVisibility, getVisibility);
}
