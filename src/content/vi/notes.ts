import type { NoticeBoard } from '@/types';

export const NOTES: NoticeBoard = {
  posts: [
    {
      title: 'Vẽ một khu phố portfolio bằng SVG',
      date: '2026',
      summary:
        'Ghi chú về camera kéo/zoom, hoạt ảnh nhẹ nhàng và cách giữ bản đồ dễ dùng bằng bàn phím.',
      url: 'https://github.com/vanlinh1602/vanlinh1602',
    },
    {
      title: 'Tiêu đề bài viết tiếp theo',
      date: '20xx',
      summary: 'Tóm tắt một câu. Thêm link nếu bài đã đăng ở đâu đó.',
    },
  ],
  learning: ['Tiếng Anh (chậm… rất chậm 😅)', 'Hoạt ảnh SVG & Web Audio'],
  moreLink: {
    label: 'daily.dev',
    url: 'https://app.daily.dev/monsieurkuma',
    icon: 'website',
  },
};
