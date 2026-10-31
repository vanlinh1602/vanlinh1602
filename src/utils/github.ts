import type { GitHubLanguageShare, GitHubRepo, GitHubStats } from '@/types';

interface GitHubUser {
  readonly publicRepos: number;
  readonly followers: number;
}

interface SummaryLimits {
  readonly languageCount: number;
  readonly recentRepoCount: number;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function readNumber(record: Record<string, unknown>, key: string): number {
  const value: unknown = record[key];
  if (typeof value !== 'number') throw new Error(`GitHub: "${key}" missing`);
  return value;
}

function readString(record: Record<string, unknown>, key: string): string {
  const value: unknown = record[key];
  if (typeof value !== 'string') throw new Error(`GitHub: "${key}" missing`);
  return value;
}

function readOptionalString(
  record: Record<string, unknown>,
  key: string,
): string | null {
  const value: unknown = record[key];
  return typeof value === 'string' ? value : null;
}

export function parseGitHubUser(data: unknown): GitHubUser {
  if (!isRecord(data)) throw new Error('GitHub: unexpected user response');
  return {
    publicRepos: readNumber(data, 'public_repos'),
    followers: readNumber(data, 'followers'),
  };
}

function parseGitHubRepo(data: unknown): GitHubRepo {
  if (!isRecord(data)) throw new Error('GitHub: unexpected repo response');
  return {
    name: readString(data, 'name'),
    url: readString(data, 'html_url'),
    description: readOptionalString(data, 'description'),
    language: readOptionalString(data, 'language'),
    stars: readNumber(data, 'stargazers_count'),
    pushedAt: readString(data, 'pushed_at'),
    isFork: data.fork === true,
  };
}

export function parseGitHubRepos(data: unknown): readonly GitHubRepo[] {
  if (!Array.isArray(data)) throw new Error('GitHub: unexpected repo list');
  return data.map(parseGitHubRepo);
}

/** Share by number of repositories, which needs no extra API requests. */
function summarizeLanguages(
  repos: readonly GitHubRepo[],
  count: number,
): readonly GitHubLanguageShare[] {
  const counts = new Map<string, number>();
  repos.forEach(({ language }) => {
    if (language) counts.set(language, (counts.get(language) ?? 0) + 1);
  });
  const total: number = [...counts.values()].reduce((sum, n) => sum + n, 0);
  return [...counts.entries()]
    .sort(([, a], [, b]) => b - a)
    .slice(0, count)
    .map(([name, repoCount]) => ({ name, share: repoCount / total }));
}

export function summarizeGitHub(
  user: GitHubUser,
  repos: readonly GitHubRepo[],
  limits: SummaryLimits,
): GitHubStats {
  const ownRepos: readonly GitHubRepo[] = repos.filter((repo) => !repo.isFork);
  return {
    publicRepos: user.publicRepos,
    followers: user.followers,
    totalStars: ownRepos.reduce((sum, repo) => sum + repo.stars, 0),
    languages: summarizeLanguages(ownRepos, limits.languageCount),
    recentRepos: [...ownRepos]
      .sort((a, b) => b.pushedAt.localeCompare(a.pushedAt))
      .slice(0, limits.recentRepoCount),
  };
}
