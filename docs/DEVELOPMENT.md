# Phát triển portfolio 3D 🐱

> `README.md` ở thư mục gốc là **GitHub profile README** (hiện trên https://github.com/vanlinh1602), không phải tài liệu dự án. Tài liệu phát triển nằm ở file này.

Portfolio dạng website 3D, dùng **Vite + React + TypeScript + Three.js (React Three Fiber + drei)**.
Toàn bộ cảnh được ghép từ hình khối cơ bản nên không cần tải model nào, chạy là thấy ngay.

## Chạy thử

Cần Node.js 20 trở lên (xem `.nvmrc`).

```bash
npm install
npm run dev      # mở http://localhost:5173
npm run build    # kiểm tra kiểu + build ra thư mục dist/
npm run check    # lint + kiểm tra format + build (chạy trước khi commit)
```

## Cấu trúc

```
src/
├── main.tsx / App.tsx   # Điểm vào, giữ state section đang mở
├── index.css            # Reset + màu giao diện HTML (CSS variables)
├── content/             # ✏️ NỘI DUNG CỦA BẠN: profile, dự án, liên hệ, chữ trên UI
├── configs/             # Góc camera từng section, bảng màu 3D
├── components/          # Giao diện HTML: TopBar, Panel, Chip, Hint
├── scene/               # Cảnh 3D
│   ├── Scene/           # Sắp xếp đồ vật trong phòng
│   ├── objects/         # Từng đồ vật: Cat, Desk, Monitor, Books, Lamp, Plant…
│   ├── primitives/      # Khối dựng hình dùng chung: Box, Ball
│   ├── Hotspot/         # Vật thể bấm được + nhãn nổi
│   ├── CameraRig/       # Camera bay mượt tới góc nhìn
│   ├── Lights/  Decorations/
├── hooks/  types/
```

Quy tắc chi tiết cho người và AI agent nằm ở [CLAUDE.md](../CLAUDE.md) và `.cursor/rules/`.

## Cách hoạt động

- Bấm vào **máy tính**, **chú mèo** hoặc **chồng sách** (hoặc nút trên menu) để camera bay tới và mở panel.
- Nhấn **Esc** hoặc nút ✕ để quay lại.
- Nội dung là HTML thường nằm ngoài canvas nên tốt cho SEO, bàn phím và trình đọc màn hình.

## Chỉnh sửa thường gặp

1. **Nội dung**: sửa các file trong `src/content/`, đổi `<title>` trong `index.html`.
2. **Màu**: màu 3D ở `src/configs/palette.ts`, màu giao diện HTML ở `:root` trong `src/index.css`.
3. **Thêm vật thể bấm được**: thêm giá trị vào `ENUM_SECTION` (`src/types/section.ts`) rồi sửa hết lỗi TypeScript báo ra
   (label, góc camera, nội dung panel), tạo object trong `src/scene/objects/` và đặt vào `Scene` trong một `<Hotspot>`.
   Chi tiết: mục "Adding A New Section" trong `.cursor/rules/three.mdc`.
4. **Dùng model `.glb`** (Blender/Sketchfab): đặt file vào `public/models/`, tạo component trong `src/scene/objects/`:
   ```tsx
   import { useGLTF } from '@react-three/drei';

   // Dùng BASE_URL thay vì '/' để vẫn chạy khi deploy dưới /<tên-repo>/ trên GitHub Pages.
   const MODEL_URL = `${import.meta.env.BASE_URL}models/cat.glb`;

   export default function MyModel() {
     const { scene } = useGLTF(MODEL_URL);

     return <primitive object={scene} />;
   }

   useGLTF.preload(MODEL_URL);
   ```
   Nên nén model (Draco / `gltf-transform`) và giữ dưới vài MB.

## Công cụ

- **ESLint** (`eslint.config.js`): sắp xếp import, xoá import thừa, rule React Hooks và React Three Fiber.
- **Prettier** (`.prettierrc`), **EditorConfig** (`.editorconfig`), cấu hình VS Code trong `.vscode/`.
- **Husky + lint-staged**: pre-commit tự chạy ESLint/Prettier cho file đã stage, pre-push chạy `tsc`.

## Deploy lên GitHub Pages

Workflow `.github/workflows/deploy.yml` tự lint, kiểm tra format, build và deploy mỗi khi push lên nhánh `main`
(hoặc bấm **Run workflow** trong tab Actions).

Thiết lập một lần:

1. Nối với repo profile và push code. Repo `vanlinh1602/vanlinh1602` đã có lịch sử commit riêng (README cũ),
   nên lần đầu cần gộp lịch sử hai bên rồi giữ bản README mới khi bị conflict:
   ```bash
   git remote add origin https://github.com/vanlinh1602/vanlinh1602.git
   git pull origin main --allow-unrelated-histories --no-rebase
   git push -u origin main
   ```
2. Vào **Settings → Pages → Build and deployment → Source**, chọn **GitHub Actions**.
3. Đợi workflow chạy xong; trang sẽ ở https://vanlinh1602.github.io/vanlinh1602/.

Đường dẫn gốc (`/<repo>/`) được workflow tự lấy từ GitHub và truyền vào Vite qua biến `BASE_PATH`,
nên đổi tên repo, dùng repo `<user>.github.io` hay custom domain đều không cần sửa code.
Muốn thử bản build giống GitHub Pages ở máy:

```bash
BASE_PATH=/vanlinh1602 npm run build && npm run preview
```

Trên Windows: Git Bash tự đổi `/<repo>` thành đường dẫn ổ đĩa, nên thêm `MSYS_NO_PATHCONV=1` vào đầu lệnh;
với PowerShell dùng `$env:BASE_PATH='/<repo>'; npm run build; npm run preview`.

Vẫn có thể deploy lên **Vercel**, **Netlify** hoặc **Cloudflare Pages** (build command: `npm run build`, output: `dist`).
