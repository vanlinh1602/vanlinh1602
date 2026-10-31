import clsx from 'clsx';
import type { ReactNode } from 'react';

import styles from './index.module.css';

interface ChipProps {
  children: ReactNode;
  isSmall?: boolean;
  /** Renders the chip as an external link when set. */
  href?: string;
  /** Renders the chip as a toggle button when set. */
  onClick?: () => void;
  isPressed?: boolean;
}

export default function Chip({
  children,
  isSmall = false,
  href,
  onClick,
  isPressed = false,
}: ChipProps) {
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

  if (onClick) {
    return (
      <button
        type="button"
        className={clsx(
          styles.chip,
          styles.toggle,
          isPressed && styles.pressed,
        )}
        onClick={onClick}
        aria-pressed={isPressed}
      >
        {children}
      </button>
    );
  }

  return (
    <span className={clsx(styles.chip, isSmall && styles.small)}>
      {children}
    </span>
  );
}
