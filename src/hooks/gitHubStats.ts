import { useEffect, useState } from 'react';

import { GITHUB } from '@/configs';
import type { GitHubStats } from '@/types';
import { parseGitHubRepos, parseGitHubUser, summarizeGitHub } from '@/utils';

export type GitHubStatsState =
  | { readonly status: 'loading' }
  | { readonly status: 'ready'; readonly stats: GitHubStats }
  | { readonly status: 'error' };

interface CachedStats {
  readonly savedAt: number;
  readonly stats: GitHubStats;
}

const MS_PER_MINUTE = 60_000;

function readCachedStats(): GitHubStats | null {
  try {
    const raw: string | null = sessionStorage.getItem(GITHUB.cacheKey);
    if (!raw) return null;
    const cached = JSON.parse(raw) as CachedStats;
    const ageMs: number = Date.now() - cached.savedAt;
    return ageMs < GITHUB.cacheMinutes * MS_PER_MINUTE ? cached.stats : null;
  } catch {
    return null;
  }
}

function errorKey(): string {
  return `${GITHUB.cacheKey}-error`;
}

function hasRecentError(): boolean {
  try {
    const savedAt = Number(sessionStorage.getItem(errorKey()));
    return Date.now() - savedAt < GITHUB.errorCacheMinutes * MS_PER_MINUTE;
  } catch {
    return false;
  }
}

function storeError(): void {
  try {
    sessionStorage.setItem(errorKey(), String(Date.now()));
  } catch {
    // Storage can be blocked; the next visit then simply tries again.
  }
}

function storeStats(stats: GitHubStats): void {
  try {
    const cached: CachedStats = { savedAt: Date.now(), stats };
    sessionStorage.setItem(GITHUB.cacheKey, JSON.stringify(cached));
  } catch {
    // Storage can be blocked; stats are then fetched again on the next visit.
  }
}

async function fetchJson(path: string, signal: AbortSignal): Promise<unknown> {
  const response: Response = await fetch(`${GITHUB.apiUrl}${path}`, {
    headers: { Accept: 'application/vnd.github+json' },
    signal,
  });
  if (!response.ok) throw new Error(`GitHub: HTTP ${response.status}`);
  return response.json();
}

async function fetchStats(signal: AbortSignal): Promise<GitHubStats> {
  const userPath = `/users/${GITHUB.username}`;
  const user = parseGitHubUser(await fetchJson(userPath, signal));
  const pageCount: number = Math.min(
    Math.max(1, Math.ceil(user.publicRepos / GITHUB.reposPerPage)),
    GITHUB.maxRepoPages,
  );
  const pages: unknown[] = await Promise.all(
    Array.from({ length: pageCount }, (_, index) =>
      fetchJson(
        `${userPath}/repos?per_page=${GITHUB.reposPerPage}&page=${index + 1}&type=owner&sort=pushed`,
        signal,
      ),
    ),
  );
  const repos = pages.flatMap((page) => parseGitHubRepos(page));
  return summarizeGitHub(user, repos, {
    languageCount: GITHUB.languageCount,
    recentRepoCount: GITHUB.recentRepoCount,
  });
}

export function useGitHubStats(): GitHubStatsState {
  const [cachedStats] = useState<GitHubStats | null>(readCachedStats);
  const [hasFailedRecently] = useState<boolean>(
    () => !cachedStats && hasRecentError(),
  );
  const [state, setState] = useState<GitHubStatsState>(
    cachedStats
      ? { status: 'ready', stats: cachedStats }
      : { status: hasFailedRecently ? 'error' : 'loading' },
  );

  useEffect(() => {
    if (cachedStats || hasFailedRecently) return;
    const controller = new AbortController();

    const loadStats = async (): Promise<void> => {
      try {
        const stats: GitHubStats = await fetchStats(controller.signal);
        storeStats(stats);
        setState({ status: 'ready', stats });
      } catch {
        if (controller.signal.aborted) return;
        storeError();
        setState({ status: 'error' });
      }
    };
    void loadStats();

    return () => controller.abort();
  }, [cachedStats, hasFailedRecently]);

  return state;
}
