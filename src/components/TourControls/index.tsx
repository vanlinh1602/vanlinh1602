import type { CSSProperties } from 'react';

import { TOUR } from '@/configs';
import { useContent } from '@/hooks';
import type { ENUM_SECTION } from '@/types';

import styles from './index.module.css';

interface TourControlsProps {
  step: number;
  total: number;
  section: ENUM_SECTION;
  isAutoPlay: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onStop: () => void;
}

interface TimerStyle extends CSSProperties {
  '--tour-step': string;
}

export default function TourControls({
  step,
  total,
  section,
  isAutoPlay,
  onPrevious,
  onNext,
  onStop,
}: TourControlsProps) {
  const { copy, sections } = useContent();
  const timerStyle: TimerStyle = { '--tour-step': `${TOUR.stepMs}ms` };

  return (
    <div className={styles.tour} role="group" aria-label={copy.tourLabel}>
      <p className={styles.status} aria-live="polite">
        <span className={styles.count}>
          {step + 1}/{total}
        </span>
        {sections[section].label}
      </p>
      <button
        type="button"
        className={styles.control}
        onClick={onPrevious}
        disabled={step === 0}
        aria-label={copy.tourPrevious}
        title={copy.tourPrevious}
      >
        <span aria-hidden="true">‹</span>
      </button>
      <button
        type="button"
        className={styles.control}
        onClick={onNext}
        aria-label={copy.tourNext}
        title={copy.tourNext}
      >
        <span aria-hidden="true">›</span>
      </button>
      <button
        type="button"
        className={styles.control}
        onClick={onStop}
        aria-label={copy.tourStop}
        title={copy.tourStop}
      >
        <span aria-hidden="true">✕</span>
      </button>
      {isAutoPlay && (
        <span
          key={step}
          className={styles.timer}
          style={timerStyle}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
