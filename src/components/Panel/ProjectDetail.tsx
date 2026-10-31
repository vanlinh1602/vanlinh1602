import { useEffect, useRef } from 'react';

import Chip from '@/components/Chip';
import { useContent } from '@/hooks';
import type { Project } from '@/types';
import { toPublicUrl } from '@/utils';

import ExternalLink from './ExternalLink';
import styles from './index.module.css';

interface ProjectDetailProps {
  project: Project;
  onBack: () => void;
}

export default function ProjectDetail({ project, onBack }: ProjectDetailProps) {
  const { copy } = useContent();
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    headingRef.current?.focus();
  }, [project.id]);

  return (
    <article className={styles.detail}>
      <button type="button" className={styles.textButton} onClick={onBack}>
        <span aria-hidden="true">←</span> {copy.backToProjects}
      </button>
      {project.image && (
        <img
          className={styles.detailImage}
          src={toPublicUrl(project.image)}
          alt={project.title}
        />
      )}
      <h3 className={styles.detailTitle} ref={headingRef} tabIndex={-1}>
        {project.title}
      </h3>
      <dl className={styles.facts}>
        <div>
          <dt>{copy.projectRole}</dt>
          <dd>{project.role}</dd>
        </div>
        <div>
          <dt>{copy.projectYear}</dt>
          <dd>{project.year}</dd>
        </div>
      </dl>
      <p className={styles.lead}>{project.description}</p>
      <h4>{copy.projectHighlights}</h4>
      <ul className={styles.highlights}>
        {project.highlights.map((highlight) => (
          <li key={highlight}>{highlight}</li>
        ))}
      </ul>
      <div className={styles.chips}>
        {project.tags.map((tag) => (
          <Chip key={tag} isSmall>
            {tag}
          </Chip>
        ))}
      </div>
      <div className={styles.actions}>
        {project.repoUrl && (
          <ExternalLink className={styles.button} href={project.repoUrl}>
            {copy.viewSource}
          </ExternalLink>
        )}
        {project.demoUrl && (
          <ExternalLink className={styles.button} href={project.demoUrl}>
            {copy.viewDemo}
          </ExternalLink>
        )}
      </div>
    </article>
  );
}
