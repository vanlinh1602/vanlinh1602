const USERNAME = 'vanlinh1602';

export const GITHUB = {
  username: USERNAME,
  profileUrl: `https://github.com/${USERNAME}`,
  apiUrl: 'https://api.github.com',
  /** Unauthenticated calls are limited to 60 per hour per visitor IP. */
  cacheKey: 'town-github-stats',
  cacheMinutes: 30,
  /** After a failed load, wait this long before asking GitHub again. */
  errorCacheMinutes: 5,
  reposPerPage: 100,
  /** Caps the extra requests spent against the 60-per-hour limit. */
  maxRepoPages: 3,
  languageCount: 5,
  recentRepoCount: 3,
} as const;
