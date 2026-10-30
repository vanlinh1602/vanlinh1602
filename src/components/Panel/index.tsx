import type { ComponentType } from 'react';

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

  const { label, emoji } = SECTIONS[active];
  const Content = SECTION_CONTENT[active];

  return (
    <aside className={styles.panel} role="dialog" aria-label={label}>
      <button
        className={styles.close}
        onClick={onClose}
        aria-label={COPY.closePanel}
      >
        ✕
      </button>
      <h2>
        {emoji} {label}
      </h2>
      <Content />
    </aside>
  );
}
