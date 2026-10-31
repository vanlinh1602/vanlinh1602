import type { ENUM_SECTION, SectionMeta } from './section';

export interface SkillGroup {
  readonly category: string;
  readonly items: readonly string[];
}

export interface Profile {
  readonly name: string;
  readonly title: string;
  readonly location: string;
  readonly intro: string;
  readonly skills: readonly SkillGroup[];
  /** Path under `public/`, e.g. `images/avatar.png`; initials show without it. */
  readonly avatar?: string;
  /** Path under `public/`, e.g. `cv/linh-vi.pdf`; the button hides without it. */
  readonly resume?: string;
}

export interface Project {
  /** Stable across locales so the open project survives a language switch. */
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly role: string;
  readonly year: string;
  readonly highlights: readonly string[];
  readonly tags: readonly string[];
  /** Path under `public/`, e.g. `images/projects/town.png`. */
  readonly image?: string;
  readonly repoUrl?: string;
  readonly demoUrl?: string;
}

export type SocialIconName = 'github' | 'linkedin' | 'facebook' | 'website';

export interface ExternalLink {
  readonly label: string;
  readonly url: string;
  readonly icon: SocialIconName;
}

export interface Contact {
  readonly email: string;
  /** Shows the "open to work" badge instead of the "busy" one. */
  readonly isAvailable: boolean;
  readonly links: readonly ExternalLink[];
}

export type ExperienceKind = 'work' | 'education' | 'award';

export interface ExperienceItem {
  readonly kind: ExperienceKind;
  /** Free text, e.g. `2023 – nay` or `2021`. */
  readonly period: string;
  readonly title: string;
  readonly organization: string;
  readonly description: string;
}

export interface Note {
  readonly title: string;
  readonly date: string;
  readonly summary: string;
  readonly url?: string;
}

export interface NoticeBoard {
  readonly posts: readonly Note[];
  readonly learning: readonly string[];
  /** Where to find everything else, e.g. a blog or reading feed. */
  readonly moreLink?: ExternalLink;
}

export interface Hobby {
  readonly emoji: string;
  readonly title: string;
  readonly description: string;
}

export interface Garden {
  readonly hobbies: readonly Hobby[];
  readonly funFacts: readonly string[];
  readonly now: readonly string[];
}

/** Fixed UI text that is not part of the profile content. */
export interface UiCopy {
  readonly pageTitle: string;
  readonly closePanel: string;
  readonly contactLead: string;
  readonly hint: string;
  readonly mobileHint: string;
  readonly mapDescription: string;
  readonly mapSubtitle: string;
  readonly backToTown: string;
  readonly home: string;
  readonly navigation: string;
  readonly muteMusic: string;
  readonly playMusic: string;
  readonly pauseMotion: string;
  readonly resumeMotion: string;
  readonly switchLanguage: string;
  readonly otherLanguageCode: string;
  readonly petCat: string;
  readonly zoomControls: string;
  readonly zoomIn: string;
  readonly zoomOut: string;
  readonly resetView: string;
  readonly zoomLevel: string;
  readonly skills: string;
  readonly downloadResume: string;
  readonly allProjects: string;
  readonly filterProjects: string;
  readonly backToProjects: string;
  readonly projectRole: string;
  readonly projectYear: string;
  readonly projectHighlights: string;
  readonly viewSource: string;
  readonly viewDemo: string;
  readonly copyEmail: string;
  readonly emailCopied: string;
  readonly emailCopyFailed: string;
  readonly availableForWork: string;
  readonly busyNow: string;
  readonly findMeOnline: string;
  readonly dateLocale: string;
  readonly experienceKinds: Readonly<Record<ExperienceKind, string>>;
  readonly notesLatest: string;
  readonly notesLearning: string;
  readonly readMore: string;
  readonly gardenHobbies: string;
  readonly gardenFacts: string;
  readonly gardenNow: string;
  readonly githubIntro: string;
  readonly githubRepos: string;
  readonly githubStars: string;
  readonly githubFollowers: string;
  readonly githubLanguages: string;
  readonly githubRecent: string;
  readonly githubLoading: string;
  readonly githubError: string;
  readonly githubProfile: string;
  readonly startTour: string;
  readonly tourLabel: string;
  readonly tourPrevious: string;
  readonly tourNext: string;
  readonly tourStop: string;
  /** Lines villagers say when tapped, in rotation. */
  readonly villagerLines: readonly string[];
}

/** Everything a locale must translate; TypeScript keeps locales in sync. */
export interface SiteContent {
  readonly copy: UiCopy;
  readonly profile: Profile;
  readonly projects: readonly Project[];
  readonly sections: Readonly<Record<ENUM_SECTION, SectionMeta>>;
  readonly experience: readonly ExperienceItem[];
  readonly notes: NoticeBoard;
  readonly garden: Garden;
}
