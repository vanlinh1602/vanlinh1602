import Chip from '@/components/Chip';
import { useContent } from '@/hooks';
import { toPublicUrl } from '@/utils';

import styles from './index.module.css';

export default function AboutContent() {
  const { copy, profile } = useContent();
  const initial: string = profile.name.trim().split(' ').pop()?.charAt(0) ?? '';

  return (
    <>
      <div className={styles.profileCard}>
        {profile.avatar ? (
          <img
            className={styles.avatar}
            src={toPublicUrl(profile.avatar)}
            alt={profile.name}
          />
        ) : (
          <span className={styles.avatar} aria-hidden="true">
            {initial}
          </span>
        )}
        <span className={styles.profileText}>
          <strong>{profile.name}</strong>
          <span>
            {profile.title} · {profile.location}
          </span>
        </span>
      </div>
      <p className={styles.lead}>{profile.intro}</p>
      {profile.resume && (
        <a
          className={styles.button}
          href={toPublicUrl(profile.resume)}
          target="_blank"
          rel="noreferrer"
        >
          {copy.downloadResume} <span aria-hidden="true">↓</span>
        </a>
      )}
      <h3>{copy.skills}</h3>
      {profile.skills.map((group) => (
        <section key={group.category} className={styles.skillGroup}>
          <h4>{group.category}</h4>
          <div className={styles.chips}>
            {group.items.map((skill) => (
              <Chip key={skill}>{skill}</Chip>
            ))}
          </div>
        </section>
      ))}
    </>
  );
}
