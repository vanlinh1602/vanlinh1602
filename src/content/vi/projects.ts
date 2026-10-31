import type { Project } from '@/types';

export const PROJECTS: readonly Project[] = [
  {
    id: 'town-portfolio',
    title: 'Khu phố portfolio',
    description:
      'Chính trang web này: portfolio dạng bản đồ thị trấn 2D với các ngôi nhà bấm được, mèo đi dạo và nhạc nền lo-fi.',
    role: 'Thiết kế & phát triển một mình',
    year: '2026',
    highlights: [
      'Camera kéo, zoom và chụm hai ngón trên bản đồ SVG',
      'Hoạt ảnh sinh động nhưng tôn trọng prefers-reduced-motion',
      'Song ngữ Việt/Anh, link riêng cho từng khu',
    ],
    tags: ['React', 'TypeScript', 'Vite'],
    repoUrl: 'https://github.com/vanlinh1602/vanlinh1602',
    demoUrl: 'https://vanlinh1602.github.io/vanlinh1602/',
  },
  {
    id: 'project-2',
    title: 'Dự án số 2',
    description:
      'Một ứng dụng web bạn tự hào. Mô tả ngắn vấn đề nó giải quyết và kết quả.',
    role: 'Vai trò của bạn trong dự án',
    year: '2025',
    highlights: ['Điểm nổi bật thứ nhất', 'Điểm nổi bật thứ hai'],
    tags: ['Node.js', 'PostgreSQL'],
    repoUrl: 'https://github.com/',
  },
  {
    id: 'project-3',
    title: 'Dự án số 3',
    description: 'Dự án cá nhân, open source hoặc bài tập lớn đều được.',
    role: 'Vai trò của bạn trong dự án',
    year: '2024',
    highlights: ['Điểm nổi bật thứ nhất'],
    tags: ['TypeScript', 'React'],
    repoUrl: 'https://github.com/',
  },
];
