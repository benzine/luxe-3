# Headless Website Builder - Next.js Frontend

A production-grade headless website builder with a fully customizable WordPress backoffice admin panel.

## Features

- **Section-Isolated Center Stage Model**: Edit sections in isolation with full control
- **3-Rail Layout**: Left dock, center stage, right inspector
- **Real-time Preview**: Changes reflect instantly
- **Device Preview**: Desktop, tablet, and mobile views
- **Dark Mode**: Full dark mode support
- **Accessibility**: Font size adjustment, high contrast, reduced motion
- **Multi-language**: EN/FR/ES/DE support
- **Undo/Redo**: Full history stack (50 actions)
- **Image Handling**: All images stored in `/images/` folder with relative paths

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v3
- **State Management**: Zustand
- **Animation**: Framer Motion
- **API Client**: Apollo Client (WPGraphQL)
- **Form Handling**: React Hook Form

## Getting Started

### Prerequisites

- Node.js 18+ 
- WordPress 6.4+ with WPGraphQL plugin

### Installation

```bash
cd frontend
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000/admin](http://localhost:3000/admin) to access the builder.

### Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_WP_GRAPHQL_URL=http://localhost/wp/graphql
```

## Project Structure

```
frontend/
├── app/
│   └── admin/
│       └── page.tsx          # Admin panel entry point
├── components/
│   ├── admin/                # Admin panel components
│   │   ├── AdminPanel.tsx    # Main layout
│   │   ├── LeftDock.tsx      # Left rail with settings
│   │   ├── RightInspector.tsx # Right rail property editor
│   │   ├── CenterStage.tsx   # Main editing area
│   │   ├── SectionList.tsx   # Section list in left rail
│   │   ├── ModuleLibrary.tsx # Module library
│   │   ├── Toolbar.tsx       # Section toolbar
│   │   ├── LanguageSwitcher.tsx
│   │   └── AccessibilityPanel.tsx
│   ├── modules/              # Reusable UI modules
│   ├── sections/             # Section components
│   └── ui/                   # Base UI components
├── hooks/
│   └── useBuilderStore.ts    # Zustand state management
├── lib/
│   └── apollo.ts             # Apollo client configuration
├── types/
│   └── index.ts              # TypeScript type definitions
├── public/
│   └── images/               # Image storage folder
└── styles/                   # Global styles
```

## Key Components

### Admin Panel (`AdminPanel.tsx`)
Main 3-rail layout with collapsible sidebars.

### Center Stage (`CenterStage.tsx`)
The isolated editing area where sections are rendered and edited. Supports:
- Full-page view
- Isolated section editing
- Device-responsive preview
- Hover outlines on elements
- Click-to-select functionality

### Section List (`SectionList.tsx`)
Drag-and-drop section reordering in the left rail.

### Module Library (`ModuleLibrary.tsx`)
Searchable, filterable library of available modules.

### Right Inspector (`RightInspector.tsx`)
Property editor for selected sections/elements with:
- Layout settings
- Background options
- Spacing controls
- Border & shadow
- Animation settings
- Advanced options (custom ID, classes)

## Available Modules

- Text
- Heading
- Button/CTA
- Image
- Video
- Icon
- Divider
- Spacer
- Form
- Testimonials
- Team Members
- Pricing Tables
- Blog Posts
- Accordion/Tabs
- Feature Boxes
- Counters/Stats
- Progress Bars
- Timeline
- Logo Carousel
- Instagram Feed
- Search
- Breadcrumbs
- Custom HTML

## Image Handling

All images uploaded through the admin panel are stored in the `/public/images/` folder using relative paths only. No absolute URLs are used anywhere in the system.

Example: `images/hero-banner.jpg` ✅
Not: `http://example.com/images/hero-banner.jpg` ❌

## State Management

Zustand store (`useBuilderStore`) manages:
- Page and section data
- Selection state
- Device preview mode
- Global site settings
- UI state (dock visibility)
- Undo/redo history
- Dark mode
- Accessibility settings
- Language preference

## API Integration

The frontend connects to WordPress via WPGraphQL:

```typescript
// lib/apollo.ts
const client = new ApolloClient({
  link: createHttpLink({
    uri: process.env.NEXT_PUBLIC_WP_GRAPHQL_URL || 'http://localhost/wp/graphql',
  }),
  cache: new InMemoryCache(),
});
```

## License

MIT
