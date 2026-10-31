import { useContent } from '@/hooks';

import styles from './index.module.css';

export default function GardenContent() {
  const { copy, garden } = useContent();

  return (
    <>
      <h3 className={styles.firstHeading}>{copy.gardenHobbies}</h3>
      <ul className={styles.hobbies}>
        {garden.hobbies.map((hobby) => (
          <li key={hobby.title} className={styles.hobby}>
            <span className={styles.hobbyEmoji} aria-hidden="true">
              {hobby.emoji}
            </span>
            <span>
              <strong>{hobby.title}</strong>
              <span>{hobby.description}</span>
            </span>
          </li>
        ))}
      </ul>
      <h3>{copy.gardenNow}</h3>
      <ul className={styles.highlights}>
        {garden.now.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <h3>{copy.gardenFacts}</h3>
      <ul className={styles.highlights}>
        {garden.funFacts.map((fact) => (
          <li key={fact}>{fact}</li>
        ))}
      </ul>
    </>
  );
}
