import Chip from '@/components/Chip';
import { PROJECTS } from '@/content';

import styles from './index.module.css';

export default function ProjectsContent() {
  return (
    <div className={styles.cards}>
      {PROJECTS.map((project) => (
        <a
          key={project.title}
          className={styles.card}
          href={project.link}
          target="_blank"
          rel="noreferrer"
        >
          <strong>{project.title}</strong>
          <span>{project.description}</span>
          <div className={styles.chips}>
            {project.tags.map((tag) => (
              <Chip key={tag} isSmall>
                {tag}
              </Chip>
            ))}
          </div>
        </a>
      ))}
    </div>
  );
}
