import type { Profile } from '@/types';

export const PROFILE: Profile = {
  name: 'Nguyen Van Linh',
  title: 'Software Engineer',
  location: 'Vietnam',
  intro:
    "Hi! I'm Linh, a software engineer. " +
    'I love turning ideas into products that are smooth, easy to use and a little bit cute.',
  skills: [
    {
      category: 'Frontend',
      items: ['JavaScript', 'TypeScript', 'React', 'HTML/CSS', 'Three.js'],
    },
    { category: 'Backend', items: ['Node.js'] },
    { category: 'Tools', items: ['Git', 'Vite'] },
  ],
};
