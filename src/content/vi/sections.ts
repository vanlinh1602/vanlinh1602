import { ENUM_SECTION, type SectionMeta } from '@/types';

/** Labels shown in the nav bar and on the district tags on the town map. */
export const SECTIONS: Readonly<Record<ENUM_SECTION, SectionMeta>> = {
  [ENUM_SECTION.PROJECTS]: {
    label: 'Dự án',
    emoji: '💻',
    greeting: 'Ghé xem mấy món mình đã làm nè!',
  },
  [ENUM_SECTION.ABOUT]: {
    label: 'Giới thiệu',
    emoji: '🐱',
    greeting: 'Chào bạn, mình là Linh 👋',
  },
  [ENUM_SECTION.CONTACT]: {
    label: 'Liên hệ',
    emoji: '💌',
    greeting: 'Gửi thư cho mình nhé 💌',
  },
  [ENUM_SECTION.EXPERIENCE]: {
    label: 'Kinh nghiệm',
    emoji: '🧭',
    greeting: 'Hành trình của mình ở đây',
  },
  [ENUM_SECTION.NOTES]: {
    label: 'Bảng tin',
    emoji: '📌',
    greeting: 'Có tin mới trên bảng!',
  },
  [ENUM_SECTION.GARDEN]: {
    label: 'Vườn nhỏ',
    emoji: '🌱',
    greeting: 'Vào vườn chơi chút không?',
  },
  [ENUM_SECTION.GITHUB]: {
    label: 'GitHub',
    emoji: '🐙',
    greeting: 'Câu thử vài con số 🎣',
  },
};
