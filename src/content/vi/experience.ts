import type { ExperienceItem } from '@/types';

/** Newest first. Replace the placeholders with your real history. */
export const EXPERIENCE: readonly ExperienceItem[] = [
  {
    kind: 'work',
    period: '2024 – nay',
    title: 'Freelance Software Engineer',
    organization: 'Tự do',
    description:
      'Nhận làm web app, extension và trải nghiệm tương tác cho khách hàng nhỏ.',
  },
  {
    kind: 'work',
    period: '20xx – 20xx',
    title: 'Vị trí của bạn',
    organization: 'Tên công ty',
    description: 'Một câu về việc bạn làm và kết quả nổi bật nhất.',
  },
  {
    kind: 'education',
    period: '20xx – 20xx',
    title: 'Ngành học',
    organization: 'Tên trường',
    description: 'Đồ án, giải thưởng hoặc môn học bạn tâm đắc.',
  },
];
