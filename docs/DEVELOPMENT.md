# Phát triển portfolio bản đồ 🗺️

> `README.md` ở thư mục gốc là **GitHub profile README** (hiện trên https://github.com/vanlinh1602), không phải tài liệu dự án. Tài liệu phát triển nằm ở file này.

Portfolio dạng bản đồ thị trấn 2D, dùng **Vite + React + TypeScript**.
The displayed map combines a reference-led storybook illustration with SVG interaction regions. The original geometric SVG building components have been removed; the map uses the backdrop and localized animated overlays.

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
├── configs/             # Vị trí và mức zoom từng khu, bảng màu SVG
├── components/          # Giao diện: TopBar, Panel, Chip, Hint, TownMap (bản đồ SVG)
│   └── TownMap/         # Illustrated SVG scene, District hit regions and labels
├── hooks/  types/
```

Quy tắc chi tiết cho người và AI agent nằm ở [CLAUDE.md](../CLAUDE.md) và `.cursor/rules/`.

## Cách hoạt động

- Bấm vào một **khu** trên bản đồ (hoặc nút trên menu) để bản đồ zoom tới và mở panel.
- Nhấn **Esc** hoặc nút ✕ để quay lại.
- Nội dung là HTML thường nằm ngoài bản đồ SVG nên tốt cho SEO, bàn phím và trình đọc màn hình.

## Chỉnh sửa thường gặp

1. **Nội dung**: sửa các file trong `src/content/`, đổi `<title>` trong `index.html`.
2. **Màu**: màu bản đồ ở `src/configs/palette.ts`, màu giao diện HTML ở `:root` trong `src/index.css`.
3. **Interactive landmarks:** `src/configs/mapViews.ts` owns positions, SVG hit-region paths, facade sign offsets, widths, perspective slopes, materials, and focus anchors. `DISTRICT_SIGNS` aligns each name with its building; signs scale with the artwork. The building hit region and HTML navigation remain the main interaction targets. Add sections through `ENUM_SECTION`, then update every section-keyed record and its panel content. Keep these coordinates aligned with the artwork.
4. **Illustration:** the displayed clean backdrop is `public/images/town/background.png`; the original is retained in `assets/reference/storybook-town.png`. Generation prompts and the asset inventory live in `docs/artwork/`. `src/configs/artwork.ts` centralizes runtime URLs and uses Vite's base URL for subpath deployment. The coordinate system is 1000 × 700 map units. The fullscreen scene pans on its overflowing axis and selecting a section centers its landmark beside or above the content panel. The compact navigation also provides keyboard and screen-reader access.
5. **Living scenery:** `TownMap/LivingScenery.tsx` composes the transparent `public/images/town/cat-walk-sheet.png` and ambient layers. `configs/livingTown.ts` owns cat routes, duration, offsets, and scenery positions. `hooks/sceneMotion.ts` combines user pause, reduced-motion preference, and document visibility. Cat route motion and facing use matching SMIL timing to stay synchronized. The map SVG pauses its SMIL timeline while `living.module.css` pauses frame and scenery animations. Artwork and animation layers share the same camera transform; they must remain aligned when dragging and zooming.
6. **Camera:** `hooks/mapCamera.ts` handles anchored wheel zoom, pointer dragging, two-pointer pinch, keyboard shortcuts, and scroll positioning after resizing the canvas. `MAP_ZOOM` owns zoom bounds and step settings. App owns the manual zoom state and resets it for section navigation. The SVG and its hit regions scale together; the wrapper centers the art when fully zoomed out. Keep the wheel listener non-passive so zooming does not also scroll the page.
7. **Ambient effects and feedback:** `TownMap/Atmosphere.tsx` contains butterfly and bird routes, wind, and clipped water/window effects. `WanderingCat.tsx` owns petting feedback and its cleanup timer. These use `living.module.css` and route coordinates in `configs/livingTown.ts`. Map taps convert client coordinates through the world's inverse screen matrix, so feedback remains aligned after zooming. Keep decorative animation under the shared motion pause state and leave building labels and core controls accessible.

## Công cụ

- **ESLint** (`eslint.config.js`): sắp xếp import, xoá import thừa, rule React Hooks.
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
