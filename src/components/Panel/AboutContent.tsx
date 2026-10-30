import Chip from '@/components/Chip';
import { COPY, PROFILE } from '@/content';

import styles from './index.module.css';

export default function AboutContent() {
  return (
    <>
      <p className={styles.lead}>{PROFILE.intro}</p>
      <h3>{COPY.skills}</h3>
      <div className={styles.chips}>
        {PROFILE.skills.map((skill) => (
          <Chip key={skill}>{skill}</Chip>
        ))}
      </div>
    </>
  );
}
