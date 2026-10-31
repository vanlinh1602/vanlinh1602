import { useContent } from '@/hooks';

import styles from './index.module.css';

export default function ExperienceContent() {
  const { copy, experience } = useContent();

  return (
    <ol className={styles.timeline}>
      {experience.map((item) => (
        <li
          key={`${item.period}-${item.title}`}
          className={styles.timelineItem}
          data-kind={item.kind}
        >
          <span className={styles.timelineMeta}>
            {item.period} · {copy.experienceKinds[item.kind]}
          </span>
          <strong>{item.title}</strong>
          <span className={styles.timelineOrganization}>
            {item.organization}
          </span>
          <p>{item.description}</p>
        </li>
      ))}
    </ol>
  );
}
