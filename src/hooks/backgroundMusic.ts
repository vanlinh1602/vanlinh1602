import { useCallback, useEffect, useState } from 'react';

import { MUSIC } from '@/configs';
import { usePageVisibility } from '@/hooks/pageVisibility';
import { AmbientMusic } from '@/utils';

interface BackgroundMusic {
  readonly isEnabled: boolean;
  readonly toggle: () => void;
}

const DISABLED_VALUE = 'off';
const UNLOCK_EVENTS = ['pointerdown', 'keydown'] as const;

function readStoredEnabled(): boolean {
  try {
    return localStorage.getItem(MUSIC.storageKey) !== DISABLED_VALUE;
  } catch {
    return true;
  }
}

function storeEnabled(isEnabled: boolean): void {
  try {
    localStorage.setItem(MUSIC.storageKey, isEnabled ? 'on' : DISABLED_VALUE);
  } catch {
    // Storage can be blocked; the choice then only lasts for this visit.
  }
}

export function useBackgroundMusic(): BackgroundMusic {
  const [music] = useState<AmbientMusic>(() => new AmbientMusic());
  const [isEnabled, setIsEnabled] = useState<boolean>(readStoredEnabled);
  const isVisible: boolean = usePageVisibility();
  const shouldPlay: boolean = isEnabled && isVisible;

  useEffect(() => {
    if (!shouldPlay) {
      music.pause();
      return;
    }
    if (music.hasStarted) {
      music.play();
      return;
    }

    // Browsers only allow audio after a user gesture.
    const handleUnlock = (): void => music.play();
    UNLOCK_EVENTS.forEach((name) =>
      window.addEventListener(name, handleUnlock, { once: true }),
    );

    return () =>
      UNLOCK_EVENTS.forEach((name) =>
        window.removeEventListener(name, handleUnlock),
      );
  }, [music, shouldPlay]);

  const toggle = useCallback((): void => {
    storeEnabled(!isEnabled);
    setIsEnabled(!isEnabled);
  }, [isEnabled]);

  return { isEnabled, toggle };
}
