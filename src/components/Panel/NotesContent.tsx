import Chip from '@/components/Chip';
import { useContent } from '@/hooks';

import ExternalLink from './ExternalLink';
import styles from './index.module.css';
import SocialIcon from './SocialIcon';

export default function NotesContent() {
  const { copy, notes } = useContent();

  return (
    <>
      <h3 className={styles.firstHeading}>{copy.notesLatest}</h3>
      <ul className={styles.noteList}>
        {notes.posts.map((post) => (
          <li key={post.title} className={styles.note}>
            <span className={styles.cardMeta}>{post.date}</span>
            <strong>
              {post.url ? (
                <ExternalLink href={post.url}>{post.title}</ExternalLink>
              ) : (
                post.title
              )}
            </strong>
            <p>{post.summary}</p>
          </li>
        ))}
      </ul>
      <h3>{copy.notesLearning}</h3>
      <div className={styles.chips}>
        {notes.learning.map((topic) => (
          <Chip key={topic}>{topic}</Chip>
        ))}
      </div>
      {notes.moreLink && (
        <>
          <h3>{copy.readMore}</h3>
          <div className={styles.chips}>
            <Chip href={notes.moreLink.url}>
              <SocialIcon name={notes.moreLink.icon} />
              {notes.moreLink.label}
            </Chip>
          </div>
        </>
      )}
    </>
  );
}
