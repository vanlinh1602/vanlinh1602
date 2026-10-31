import { useCallback, useEffect, useState } from 'react';
import { flushSync } from 'react-dom';

import { TOUR } from '@/configs';
import { SECTION_IDS } from '@/content';
import type { ActiveSection, ENUM_SECTION } from '@/types';

interface TourOptions {
  readonly active: ActiveSection;
  readonly onSelect: (section: ActiveSection, isReplace?: boolean) => void;
  /** Moves on by itself; otherwise the visitor presses Next. */
  readonly isAutoPlay: boolean;
}

export interface Tour {
  /** Index of the current stop, or `null` when no tour is running. */
  readonly step: number | null;
  readonly total: number;
  readonly section: ENUM_SECTION | null;
  readonly start: () => void;
  readonly stop: () => void;
  readonly next: () => void;
  readonly previous: () => void;
}

export function useTour({ active, onSelect, isAutoPlay }: TourOptions): Tour {
  const [step, setStep] = useState<number | null>(null);
  const total: number = SECTION_IDS.length;

  // Opening another section or closing the panel ends the tour.
  if (step !== null && active !== SECTION_IDS[step]) setStep(null);

  const goTo = useCallback(
    (index: number, isReplace = true): void => {
      // One synchronous render for both updates: the section change arrives
      // on a sync lane, and a lagging `step` would read as "tour left".
      // Stops replace the history entry; only the first one adds an entry.
      if (index >= total) {
        flushSync(() => {
          setStep(null);
          onSelect(null, isReplace);
        });
        return;
      }
      const clamped: number = Math.max(0, index);
      flushSync(() => {
        setStep(clamped);
        onSelect(SECTION_IDS[clamped], isReplace);
      });
    },
    [onSelect, total],
  );

  useEffect(() => {
    if (step === null || !isAutoPlay) return;
    const timer: number = window.setTimeout(() => goTo(step + 1), TOUR.stepMs);
    return () => window.clearTimeout(timer);
  }, [goTo, isAutoPlay, step]);

  return {
    step,
    total,
    section: step === null ? null : SECTION_IDS[step],
    start: () => goTo(0, false),
    stop: () => setStep(null),
    next: () => goTo((step ?? -1) + 1),
    previous: () => goTo((step ?? 1) - 1),
  };
}
