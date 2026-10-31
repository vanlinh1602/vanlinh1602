import { useContent } from '@/hooks';

import styles from './index.module.css';

interface HintProps {
  onStartTour: () => void;
}

export default function Hint({ onStartTour }: HintProps) {
  const { copy } = useContent();

  return (
    <div className={styles.hint}>
      <p className={styles.text}>
        <span className={styles.desktopHint}>{copy.hint}</span>
        <span className={styles.mobileHint}>{copy.mobileHint}</span>
      </p>
      <button type="button" className={styles.tourButton} onClick={onStartTour}>
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M 7 4 L 20 12 L 7 20 Z" />
        </svg>
        {copy.startTour}
      </button>
    </div>
  );
}
