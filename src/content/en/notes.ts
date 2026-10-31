import type { NoticeBoard } from '@/types';

export const NOTES: NoticeBoard = {
  posts: [
    {
      title: 'Drawing a portfolio town in SVG',
      date: '2026',
      summary:
        'Notes on the drag/zoom camera, gentle animation and keeping a map usable from the keyboard.',
      url: 'https://github.com/vanlinh1602/vanlinh1602',
    },
    {
      title: 'Your next post title',
      date: '20xx',
      summary: 'A one-line summary. Add a link once it is published.',
    },
  ],
  learning: ['English (slowly… very slowly 😅)', 'SVG animation & Web Audio'],
  moreLink: {
    label: 'daily.dev',
    url: 'https://app.daily.dev/monsieurkuma',
    icon: 'website',
  },
};
