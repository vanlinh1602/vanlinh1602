import clsx from 'clsx';

import SectionIcon from '@/components/SectionIcon';
import { SECTION_IDS } from '@/content';
import { useContent } from '@/hooks';
import type { ActiveSection } from '@/types';

import styles from './index.module.css';

interface TopBarProps {
  active: ActiveSection;
  onSelect: (section: ActiveSection) => void;
  isMotionEnabled: boolean;
  onToggleMotion: () => void;
  isMusicEnabled: boolean;
  onToggleMusic: () => void;
  onToggleLanguage: () => void;
}

export default function TopBar({
  active,
  onSelect,
  isMotionEnabled,
  onToggleMotion,
  isMusicEnabled,
  onToggleMusic,
  onToggleLanguage,
}: TopBarProps) {
  const { copy, profile, sections } = useContent();

  return (
    <header className={styles.topBar}>
      <h1 className={styles.brandHeading}>
        <button
          className={styles.brand}
          onClick={() => onSelect(null)}
          aria-label={`${profile.name} — ${copy.home}`}
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
            <span className={styles.brandName}>{profile.name}</span>
            <span className={styles.brandTitle}>{profile.title}</span>
          </span>
        </button>
      </h1>
      <button
        className={styles.motionButton}
        onClick={onToggleMotion}
        aria-label={isMotionEnabled ? copy.pauseMotion : copy.resumeMotion}
        title={isMotionEnabled ? copy.pauseMotion : copy.resumeMotion}
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
      <button
        className={clsx(styles.motionButton, styles.musicButton)}
        onClick={onToggleMusic}
        aria-label={isMusicEnabled ? copy.muteMusic : copy.playMusic}
        title={isMusicEnabled ? copy.muteMusic : copy.playMusic}
        aria-pressed={isMusicEnabled}
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
          <path d="M 9 18 V 6 L 19 4 V 16" />
          <circle cx="6.5" cy="18" r="2.5" />
          <circle cx="16.5" cy="16" r="2.5" />
          {!isMusicEnabled && <path d="M 3 21 L 21 3" />}
        </svg>
      </button>
      <button
        className={clsx(styles.motionButton, styles.languageButton)}
        onClick={onToggleLanguage}
        aria-label={copy.switchLanguage}
        title={copy.switchLanguage}
        lang={copy.otherLanguageCode.toLowerCase()}
      >
        {copy.otherLanguageCode}
      </button>
      {/* Keyboard and screen-reader fallback for the map districts. */}
      <nav
        className={clsx(styles.nav, styles.compactNav)}
        aria-label={copy.navigation}
      >
        {SECTION_IDS.map((id) => (
          <button
            key={id}
            className={clsx(styles.navButton, active === id && styles.active)}
            onClick={() => onSelect(id)}
            aria-pressed={active === id}
            aria-controls="profile-section"
            aria-label={sections[id].label}
            title={sections[id].label}
          >
            <SectionIcon section={id} />
            <span>{sections[id].label}</span>
          </button>
        ))}
      </nav>
    </header>
  );
}
