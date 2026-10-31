import { useEffect, useState } from 'react';

import { AMBIENCE, DAY_PHASE_STARTS, SEASON_BY_MONTH } from '@/configs';
import { type Ambience, ENUM_DAY_PHASE, ENUM_SEASON } from '@/types';

const DAY_PHASES: readonly ENUM_DAY_PHASE[] = Object.values(ENUM_DAY_PHASE);
const SEASONS: readonly ENUM_SEASON[] = Object.values(ENUM_SEASON);

function readQueryOverride<T extends string>(
  key: string,
  values: readonly T[],
): T | undefined {
  const value: string | null = new URLSearchParams(window.location.search).get(
    key,
  );
  return values.find((candidate) => candidate === value);
}

function findDayPhase(hour: number): ENUM_DAY_PHASE {
  return DAY_PHASE_STARTS.reduce<ENUM_DAY_PHASE>(
    (phase, [start, next]) => (hour >= start ? next : phase),
    ENUM_DAY_PHASE.NIGHT,
  );
}

function readAmbience(): Ambience {
  const now: Date = new Date();
  return {
    dayPhase:
      readQueryOverride(AMBIENCE.timeQuery, DAY_PHASES) ??
      findDayPhase(now.getHours()),
    season:
      readQueryOverride(AMBIENCE.seasonQuery, SEASONS) ??
      SEASON_BY_MONTH[now.getMonth()],
  };
}

/** The visitor's local time of day and season, checked once a minute. */
export function useAmbience(): Ambience {
  const [ambience, setAmbience] = useState<Ambience>(readAmbience);

  useEffect(() => {
    const timer: number = window.setInterval(() => {
      setAmbience((previous: Ambience) => {
        const next: Ambience = readAmbience();
        const isSame: boolean =
          next.dayPhase === previous.dayPhase &&
          next.season === previous.season;
        return isSame ? previous : next;
      });
    }, AMBIENCE.refreshMs);
    return () => window.clearInterval(timer);
  }, []);

  return ambience;
}
