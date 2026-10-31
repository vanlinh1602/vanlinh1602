import clsx from 'clsx';
import { useEffect, useState } from 'react';

import Chip from '@/components/Chip';
import { CONTACT } from '@/content';
import { useContent } from '@/hooks';

import styles from './index.module.css';
import SocialIcon from './SocialIcon';

type CopyState = 'idle' | 'copied' | 'failed';

const COPY_FEEDBACK_MS = 2400;

export default function ContactContent() {
  const { copy } = useContent();
  const [copyState, setCopyState] = useState<CopyState>('idle');

  useEffect(() => {
    if (copyState === 'idle') return;
    const timer: number = window.setTimeout(
      () => setCopyState('idle'),
      COPY_FEEDBACK_MS,
    );
    return () => window.clearTimeout(timer);
  }, [copyState]);

  const copyFeedback: Readonly<Record<CopyState, string>> = {
    idle: '',
    copied: copy.emailCopied,
    failed: copy.emailCopyFailed,
  };

  const handleCopy = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(CONTACT.email);
      setCopyState('copied');
    } catch {
      setCopyState('failed');
    }
  };

  return (
    <>
      <p
        className={clsx(styles.status, CONTACT.isAvailable && styles.available)}
      >
        <span className={styles.statusDot} aria-hidden="true" />
        {CONTACT.isAvailable ? copy.availableForWork : copy.busyNow}
      </p>
      <p className={styles.lead}>{copy.contactLead}</p>
      <div className={styles.emailRow}>
        <a className={styles.button} href={`mailto:${CONTACT.email}`}>
          ✉️ {CONTACT.email}
        </a>
        <button
          type="button"
          className={styles.iconButton}
          onClick={() => void handleCopy()}
          aria-label={copy.copyEmail}
          title={copy.copyEmail}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            {copyState === 'copied' ? (
              <path d="M 5 12 L 10 17 L 19 7" />
            ) : (
              <path d="M 9 9 H 20 V 20 H 9 Z M 5 15 H 4 V 4 H 15 V 5" />
            )}
          </svg>
        </button>
      </div>
      <p className={styles.copyFeedback} role="status">
        {copyFeedback[copyState]}
      </p>
      <h3>{copy.findMeOnline}</h3>
      <div className={styles.chips}>
        {CONTACT.links.map((link) => (
          <Chip key={link.label} href={link.url}>
            <SocialIcon name={link.icon} />
            {link.label}
          </Chip>
        ))}
      </div>
    </>
  );
}
