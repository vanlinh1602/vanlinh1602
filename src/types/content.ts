export interface Profile {
  readonly name: string;
  readonly title: string;
  readonly intro: string;
  readonly skills: readonly string[];
}

export interface Project {
  readonly title: string;
  readonly description: string;
  readonly tags: readonly string[];
  readonly link: string;
}

export interface ExternalLink {
  readonly label: string;
  readonly url: string;
}

export interface Contact {
  readonly email: string;
  readonly links: readonly ExternalLink[];
}
