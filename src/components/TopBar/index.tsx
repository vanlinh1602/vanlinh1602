import clsx from 'clsx';

import { COPY, PROFILE, SECTION_IDS, SECTIONS } from '@/content';
import type { ActiveSection } from '@/types';

import styles from './index.module.css';

interface TopBarProps {
  active: ActiveSection;
  onSelect: (section: ActiveSection) => void;
}

export default function TopBar({ active, onSelect }: TopBarProps) {
  return (
    <header className={styles.topBar}>
      <button className={styles.brand} onClick={() => onSelect(null)}>
        <span className={styles.brandName}>{PROFILE.name}</span>
        <span className={styles.brandTitle}>{PROFILE.title}</span>
      </button>
      {/* Keyboard and screen-reader fallback for the 3D hotspots. */}
      <nav className={styles.nav} aria-label={COPY.navigation}>
        {SECTION_IDS.map((id) => (
          <button
            key={id}
            className={clsx(styles.navButton, active === id && styles.active)}
            onClick={() => onSelect(id)}
          >
            {SECTIONS[id].emoji} {SECTIONS[id].label}
          </button>
        ))}
      </nav>
    </header>
  );
}
