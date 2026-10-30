import clsx from 'clsx';
import type { ReactNode } from 'react';

import styles from './index.module.css';

interface ChipProps {
  children: ReactNode;
  isSmall?: boolean;
  /** Renders the chip as an external link when set. */
  href?: string;
}

export default function Chip({ children, isSmall = false, href }: ChipProps) {
  if (href) {
    return (
      <a
        className={clsx(styles.chip, styles.link)}
        href={href}
        target="_blank"
        rel="noreferrer"
      >
        {children}
      </a>
    );
  }

  return (
    <span className={clsx(styles.chip, isSmall && styles.small)}>
      {children}
    </span>
  );
}
