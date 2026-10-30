import { COPY } from '@/content';

import styles from './index.module.css';

export default function Hint() {
  return (
    <p className={styles.hint}>
      <span className={styles.desktopHint}>{COPY.hint}</span>
      <span className={styles.mobileHint}>{COPY.mobileHint}</span>
    </p>
  );
}
