# ShopPulse | Advanced E-commerce Admin Dashboard

ShopPulse is a high-performance, modern administrative dashboard designed for large-scale e-commerce platforms. Built with the latest technologies, it provides a seamless experience for managing orders, products, vendors, and customers with real-time analytics and a premium UI/UX.

## ✨ Features

- **🚀 Performance-First**: Built with Next.js 15 and React 19 for lightning-fast interactions and server-side optimization.
- **🎨 Premium Aesthetics**: A stunning design language featuring glassmorphism, smooth transitions, and a curated dark/light mode experience.
- **📊 Real-time Analytics**: Interactive charts powered by Recharts for revenue, orders, and customer trends.
- **🔍 Command Palette**: Global search and quick actions via `⌘K` command palette for efficient navigation.
- **📦 Inventory Management**: Advanced tracking of products, categories, and stock levels.
- **👥 User & Vendor Management**: Comprehensive directories with status tracking and performance metrics.
- **🛠 Responsive & Accessible**: Fully optimized for all screen sizes with accessible components powered by Base UI.

## 🛠 Tech Stack

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **UI Components**: [Shadcn UI](https://ui.shadcn.com/) (Base UI primitives)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Charts**: [Recharts](https://recharts.org/)
- **Theming**: Custom Theme Provider with `next-themes` support

## 🚀 Getting Started

### Prerequisites

- Node.js 20.x or higher
- npm / yarn / pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Surajmaurya1/Dashboard.git
   cd ecom-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open the application**
   Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```text
src/
├── app/               # Next.js App Router (Pages & Layouts)
├── components/        # Reusable UI & Layout components
│   ├── dashboard/     # Page-specific dashboard widgets
│   ├── layout/        # Sidebar, Header, and Shell
│   ├── shared/        # Global components (Search, Tables)
│   └── ui/            # Primitive UI components (Base UI)
├── data/              # Mock data and service layers
├── lib/               # Utilities, constants, and hooks
└── styles/            # Global styles and Tailwind config
```

## 📄 License

This project is licensed under the MIT License.

---

Built with ❤️ by [Suraj Maurya](https://github.com/Surajmaurya1)
