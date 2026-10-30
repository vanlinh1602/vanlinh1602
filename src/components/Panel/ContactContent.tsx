import Chip from '@/components/Chip';
import { CONTACT, COPY } from '@/content';

import styles from './index.module.css';

export default function ContactContent() {
  return (
    <>
      <p className={styles.lead}>{COPY.contactLead}</p>
      <a className={styles.button} href={`mailto:${CONTACT.email}`}>
        ✉️ {CONTACT.email}
      </a>
      <div className={styles.chips}>
        {CONTACT.links.map((link) => (
          <Chip key={link.label} href={link.url}>
            {link.label}
          </Chip>
        ))}
      </div>
    </>
  );
}
