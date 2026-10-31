export interface GitHubRepo {
  readonly name: string;
  readonly url: string;
  readonly description: string | null;
  readonly language: string | null;
  readonly stars: number;
  /** ISO 8601 timestamp of the last push. */
  readonly pushedAt: string;
  readonly isFork: boolean;
}

export interface GitHubLanguageShare {
  readonly name: string;
  /** Fraction of the counted repositories, 0 to 1. */
  readonly share: number;
}

export interface GitHubStats {
  readonly publicRepos: number;
  readonly followers: number;
  readonly totalStars: number;
  readonly languages: readonly GitHubLanguageShare[];
  readonly recentRepos: readonly GitHubRepo[];
}
