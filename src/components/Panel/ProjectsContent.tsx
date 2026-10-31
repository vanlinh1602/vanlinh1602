import { useEffect, useMemo, useRef, useState } from 'react';

import Chip from '@/components/Chip';
import { useContent } from '@/hooks';
import type { Project } from '@/types';
import { toPublicUrl } from '@/utils';

import styles from './index.module.css';
import ProjectDetail from './ProjectDetail';

export default function ProjectsContent() {
  const { copy, projects } = useContent();
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [openId, setOpenId] = useState<string | null>(null);
  const lastOpenedId = useRef<string | null>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const tags: readonly string[] = useMemo(
    () => [...new Set(projects.flatMap((project) => project.tags))],
    [projects],
  );
  const openProject: Project | undefined = projects.find(
    (project) => project.id === openId,
  );
  // A tag from the other locale no longer exists; fall back to "all".
  const selectedTag: string | null =
    activeTag && tags.includes(activeTag) ? activeTag : null;
  const visibleProjects: readonly Project[] = selectedTag
    ? projects.filter((project) => project.tags.includes(selectedTag))
    : projects;

  // Returning from a detail view puts focus back on the card that opened it.
  useEffect(() => {
    if (openId || !lastOpenedId.current) return;
    cardsRef.current
      ?.querySelector<HTMLButtonElement>(
        `[data-project="${lastOpenedId.current}"]`,
      )
      ?.focus();
  }, [openId]);

  const handleOpen = (id: string): void => {
    lastOpenedId.current = id;
    setOpenId(id);
  };

  if (openProject) {
    return (
      <ProjectDetail project={openProject} onBack={() => setOpenId(null)} />
    );
  }

  return (
    <>
      <div
        className={styles.filters}
        role="group"
        aria-label={copy.filterProjects}
      >
        <Chip onClick={() => setActiveTag(null)} isPressed={!selectedTag}>
          {copy.allProjects}
        </Chip>
        {tags.map((tag) => (
          <Chip
            key={tag}
            onClick={() => setActiveTag(tag)}
            isPressed={selectedTag === tag}
          >
            {tag}
          </Chip>
        ))}
      </div>
      <div className={styles.cards} ref={cardsRef}>
        {visibleProjects.map((project) => (
          <button
            key={project.id}
            type="button"
            className={styles.card}
            onClick={() => handleOpen(project.id)}
            data-project={project.id}
          >
            {project.image && (
              <img
                className={styles.cardImage}
                src={toPublicUrl(project.image)}
                alt=""
                loading="lazy"
              />
            )}
            <strong>{project.title}</strong>
            <span className={styles.cardMeta}>
              {project.year} · {project.role}
            </span>
            <span>{project.description}</span>
            <span className={styles.chips}>
              {project.tags.map((tag) => (
                <Chip key={tag} isSmall>
                  {tag}
                </Chip>
              ))}
            </span>
          </button>
        ))}
      </div>
    </>
  );
}
