import { COPY } from '@/content';

import styles from './index.module.css';

export default function Hint() {
  return <p className={styles.hint}>{COPY.hint}</p>;
}
