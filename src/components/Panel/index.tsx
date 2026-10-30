import type { ComponentType } from 'react';

import SectionIcon from '@/components/SectionIcon';
import { COPY, SECTIONS } from '@/content';
import { type ActiveSection, ENUM_SECTION } from '@/types';

import AboutContent from './AboutContent';
import ContactContent from './ContactContent';
import styles from './index.module.css';
import ProjectsContent from './ProjectsContent';

interface PanelProps {
  active: ActiveSection;
  onClose: () => void;
}

const SECTION_CONTENT: Readonly<Record<ENUM_SECTION, ComponentType>> = {
  [ENUM_SECTION.PROJECTS]: ProjectsContent,
  [ENUM_SECTION.ABOUT]: AboutContent,
  [ENUM_SECTION.CONTACT]: ContactContent,
};

export default function Panel({ active, onClose }: PanelProps) {
  if (!active) return null;

  const { label } = SECTIONS[active];
  const Content = SECTION_CONTENT[active];

  return (
    <aside
      id="profile-section"
      className={styles.panel}
      role="region"
      aria-label={label}
    >
      <div className={styles.panelHeader}>
        <h2>
          <SectionIcon section={active} />
          {label}
        </h2>
        <button
          className={styles.close}
          onClick={onClose}
          aria-label={COPY.closePanel}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            aria-hidden="true"
          >
            <path d="m 6 6 12 12 M 18 6 6 18" />
          </svg>
        </button>
      </div>
      <div className={styles.panelBody} key={active}>
        <Content />
      </div>
      <button className={styles.backButton} onClick={onClose}>
        <span aria-hidden="true">←</span> {COPY.backToTown}
      </button>
    </aside>
  );
}
