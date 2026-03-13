<div align="center">

# 🧘 Zen Tools

**Bộ sưu tập công cụ dành cho lập trình viên — tối giản, đẹp mắt, nhanh chóng.**

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)](https://vitejs.dev)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)

</div>

---

## 🛠️ Công cụ hiện có

| Tool | Mô tả | Trạng thái |
|------|--------|------------|
| **ZenShot** | Tạo ảnh code snippet tuyệt đẹp với syntax highlight, nhiều theme và khung cửa sổ tùy chỉnh. Hỗ trợ xuất PNG, JPEG, SVG, WEBP. | ✅ Hoạt động |
| **ZenMock** | Tạo mockup thiết bị ấn tượng cho ảnh chụp màn hình ứng dụng. | 🔜 Sắp ra mắt |
| **ZenReadme** | Trình tạo file README.md chuyên nghiệp và tương tác cho dự án mã nguồn mở. | 🔜 Sắp ra mắt |

## 🚀 Bắt đầu

**Yêu cầu:** Node.js >= 18

```bash
# Cài đặt dependencies
npm install

# Chạy development server
npm run dev
```

Mở trình duyệt tại `http://localhost:3000`

## 📦 Scripts

```bash
npm run dev       # Chạy dev server (port 3000)
npm run build     # Build production
npm run preview   # Preview bản build
npm run lint      # Kiểm tra TypeScript
npm run clean     # Xóa thư mục dist
```

## 🏗️ Tech Stack

- **React 19** + **TypeScript** — UI framework
- **Vite 6** — Build tool
- **Tailwind CSS 4** — Styling
- **React Router 7** — Routing
- **html-to-image** — Xuất ảnh từ DOM
- **Prism.js** — Syntax highlighting
- **Lucide React** — Icon set
- **Motion** — Animation

## 📁 Cấu trúc dự án

```
src/
├── pages/          # Trang chính (Home)
├── tools/          # Các công cụ
│   └── zenshot/    # ZenShot - Code snippet image generator
├── lib/            # Utilities
├── App.tsx         # Router setup
└── main.tsx        # Entry point
```

## 📄 License

MIT
