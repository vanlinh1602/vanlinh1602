import type { Profile } from '@/types';

export const PROFILE: Profile = {
  name: 'Nguyễn Văn Linh',
  title: 'Software Engineer',
  location: 'Việt Nam',
  intro:
    'Xin chào! Mình là Linh, một kỹ sư phần mềm. ' +
    'Mình thích biến ý tưởng thành những sản phẩm mượt mà, dễ dùng và có chút dễ thương.',
  skills: [
    {
      category: 'Frontend',
      items: ['JavaScript', 'TypeScript', 'React', 'HTML/CSS', 'Three.js'],
    },
    { category: 'Backend', items: ['Node.js'] },
    { category: 'Công cụ', items: ['Git', 'Vite'] },
  ],
};
