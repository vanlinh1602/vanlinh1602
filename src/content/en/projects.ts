import type { Project } from '@/types';

export const PROJECTS: readonly Project[] = [
  {
    id: 'town-portfolio',
    title: 'Portfolio town',
    description:
      'This very site: a 2D town-map portfolio with clickable houses, wandering cats and lo-fi background music.',
    role: 'Solo design & development',
    year: '2026',
    highlights: [
      'Drag, zoom and pinch camera over an SVG map',
      'Lively animation that respects prefers-reduced-motion',
      'Vietnamese/English content and a shareable link per district',
    ],
    tags: ['React', 'TypeScript', 'Vite'],
    repoUrl: 'https://github.com/vanlinh1602/vanlinh1602',
    demoUrl: 'https://vanlinh1602.github.io/vanlinh1602/',
  },
  {
    id: 'project-2',
    title: 'Project #2',
    description:
      'A web app you are proud of. Briefly describe the problem it solves and the outcome.',
    role: 'Your role on the project',
    year: '2025',
    highlights: ['First highlight', 'Second highlight'],
    tags: ['Node.js', 'PostgreSQL'],
    repoUrl: 'https://github.com/',
  },
  {
    id: 'project-3',
    title: 'Project #3',
    description: 'A personal, open-source or course project all work here.',
    role: 'Your role on the project',
    year: '2024',
    highlights: ['First highlight'],
    tags: ['TypeScript', 'React'],
    repoUrl: 'https://github.com/',
  },
];
