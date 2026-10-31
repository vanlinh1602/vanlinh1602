import { GITHUB } from '@/configs';
import { useContent, useGitHubStats } from '@/hooks';
import type { GitHubStats } from '@/types';

import ExternalLink from './ExternalLink';
import styles from './index.module.css';

interface StatsViewProps {
  stats: GitHubStats;
}

/** Bar colors cycle through the DOM palette tokens. */
const LANGUAGE_TOKENS = [
  '--pink',
  '--blue',
  '--yellow-deep',
  '--mint',
  '--grass',
] as const;

function StatsView({ stats }: StatsViewProps) {
  const { copy } = useContent();
  const dateFormat = new Intl.DateTimeFormat(copy.dateLocale, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
  const tiles = [
    { label: copy.githubRepos, value: stats.publicRepos },
    { label: copy.githubStars, value: stats.totalStars },
    { label: copy.githubFollowers, value: stats.followers },
  ] as const;

  return (
    <>
      <dl className={styles.statTiles}>
        {tiles.map((tile) => (
          <div key={tile.label}>
            <dt>{tile.label}</dt>
            <dd>{tile.value}</dd>
          </div>
        ))}
      </dl>
      <h3>{copy.githubLanguages}</h3>
      <div className={styles.languageBar} aria-hidden="true">
        {stats.languages.map((language, index) => (
          <span
            key={language.name}
            style={{
              width: `${language.share * 100}%`,
              background: `var(${LANGUAGE_TOKENS[index % LANGUAGE_TOKENS.length]})`,
            }}
          />
        ))}
      </div>
      <ul className={styles.languageLegend}>
        {stats.languages.map((language, index) => (
          <li key={language.name}>
            <span
              className={styles.languageSwatch}
              style={{
                background: `var(${LANGUAGE_TOKENS[index % LANGUAGE_TOKENS.length]})`,
              }}
              aria-hidden="true"
            />
            {language.name} {Math.round(language.share * 100)}%
          </li>
        ))}
      </ul>
      <h3>{copy.githubRecent}</h3>
      <ul className={styles.noteList}>
        {stats.recentRepos.map((repo) => (
          <li key={repo.name} className={styles.note}>
            <span className={styles.cardMeta}>
              {dateFormat.format(new Date(repo.pushedAt))}
              {repo.language && ` · ${repo.language}`}
              {repo.stars > 0 && ` · ★ ${repo.stars}`}
            </span>
            <strong>
              <ExternalLink href={repo.url}>{repo.name}</ExternalLink>
            </strong>
            {repo.description && <p>{repo.description}</p>}
          </li>
        ))}
      </ul>
    </>
  );
}

export default function GitHubContent() {
  const { copy } = useContent();
  const github = useGitHubStats();

  return (
    <>
      <p className={styles.lead}>{copy.githubIntro}</p>
      <div role="status">
        {github.status === 'loading' && (
          <p className={styles.mutedNote}>{copy.githubLoading}</p>
        )}
        {github.status === 'error' && (
          <p className={styles.mutedNote}>{copy.githubError}</p>
        )}
      </div>
      {github.status === 'ready' && <StatsView stats={github.stats} />}
      <ExternalLink className={styles.button} href={GITHUB.profileUrl}>
        {copy.githubProfile}
      </ExternalLink>
    </>
  );
}
