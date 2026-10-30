import type { Project } from '@/types';

export const PROJECTS: readonly Project[] = [
  {
    title: 'Dự án số 1',
    description: 'Mô tả ngắn: bạn làm gì, dùng công nghệ gì, kết quả ra sao.',
    tags: ['React', 'Vite'],
    link: 'https://github.com/',
  },
  {
    title: 'Dự án số 2',
    description: 'Một ứng dụng web bạn tự hào. Thêm ảnh hoặc demo link nếu có.',
    tags: ['Node.js', 'PostgreSQL'],
    link: 'https://github.com/',
  },
  {
    title: 'Dự án số 3',
    description: 'Dự án cá nhân, open source hoặc bài tập lớn đều được.',
    tags: ['TypeScript'],
    link: 'https://github.com/',
  },
];
