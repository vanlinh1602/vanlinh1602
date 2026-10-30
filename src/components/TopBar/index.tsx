import clsx from 'clsx';

import SectionIcon from '@/components/SectionIcon';
import { COPY, PROFILE, SECTION_IDS, SECTIONS } from '@/content';
import type { ActiveSection } from '@/types';

import styles from './index.module.css';

interface TopBarProps {
  active: ActiveSection;
  onSelect: (section: ActiveSection) => void;
  isMotionEnabled: boolean;
  onToggleMotion: () => void;
}

export default function TopBar({
  active,
  onSelect,
  isMotionEnabled,
  onToggleMotion,
}: TopBarProps) {
  return (
    <header className={styles.topBar}>
      <h1 className={styles.brandHeading}>
        <button
          className={styles.brand}
          onClick={() => onSelect(null)}
          aria-label={`${PROFILE.name} — ${COPY.home}`}
        >
          <svg
            className={styles.brandMark}
            viewBox="0 0 40 40"
            fill="none"
            aria-hidden="true"
          >
            <path d="M 6 19 L 20 7 L 34 19 M 10 16 V 33 H 30 V 16 M 17 33 V 24 H 23 V 33 M 15 17 H 17 M 23 17 H 25" />
          </svg>
          <span className={styles.brandCopy}>
            <span className={styles.brandName}>{PROFILE.name}</span>
            <span className={styles.brandTitle}>{PROFILE.title}</span>
          </span>
        </button>
      </h1>
      <button
        className={styles.motionButton}
        onClick={onToggleMotion}
        aria-label={isMotionEnabled ? COPY.pauseMotion : COPY.resumeMotion}
        title={isMotionEnabled ? COPY.pauseMotion : COPY.resumeMotion}
        aria-pressed={isMotionEnabled}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          {isMotionEnabled ? (
            <path d="M 8 5 V 19 M 16 5 V 19" />
          ) : (
            <path d="M 8 4 L 20 12 L 8 20 Z" />
          )}
        </svg>
      </button>
      {/* Keyboard and screen-reader fallback for the map districts. */}
      <nav
        className={clsx(styles.nav, styles.compactNav)}
        aria-label={COPY.navigation}
      >
        {SECTION_IDS.map((id) => (
          <button
            key={id}
            className={clsx(styles.navButton, active === id && styles.active)}
            onClick={() => onSelect(id)}
            aria-pressed={active === id}
            aria-controls="profile-section"
            aria-label={SECTIONS[id].label}
            title={SECTIONS[id].label}
          >
            <SectionIcon section={id} />
            <span>{SECTIONS[id].label}</span>
          </button>
        ))}
      </nav>
    </header>
  );
}
