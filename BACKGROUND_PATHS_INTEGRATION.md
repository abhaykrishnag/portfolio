# Background Paths Integration

## Current repo status

This repository is currently a static HTML/CSS/JS site.

Missing requirements for the provided component:

- React
- TypeScript
- Tailwind CSS
- shadcn/ui configuration
- npm project metadata (`package.json`)

Because of that, the new TSX files added to this repo are staged for reuse, but they will not run until the project is migrated to a React-based setup.

## Default shadcn paths

Recommended default paths:

- `components/ui` for reusable shadcn-style UI primitives
- `lib/utils.ts` for the shared `cn()` helper
- `app/globals.css` in Next.js apps, or `src/index.css` / `src/app.css` in Vite apps

Why `components/ui` matters:

- Most shadcn examples assume imports like `@/components/ui/button`
- Keeping primitives there avoids one-off import rewrites later
- It separates low-level UI building blocks from feature-level components
- It makes future shadcn CLI additions consistent with the rest of the codebase

## Files added

- `components/ui/background-paths.tsx`
- `components/ui/button.tsx`
- `components/demo-background-paths.tsx`
- `lib/utils.ts`

## Required dependencies

Install these packages after creating a React app:

```bash
npm install framer-motion @radix-ui/react-slot class-variance-authority clsx tailwind-merge
```

`clsx` and `tailwind-merge` are also required because `lib/utils.ts` uses them for the `cn()` helper.

## Recommended setup path

This component is best integrated after converting the portfolio to a React + TypeScript app. The cleanest option is Vite.

### 1. Create a React + TypeScript app

```bash
npm create vite@latest . -- --template react-ts
npm install
```

If you want to preserve the current static site first, do this in a new branch.

### 2. Install Tailwind CSS

Use the current Tailwind + Vite instructions:

```bash
npm install tailwindcss @tailwindcss/vite
```

Update your Vite config to use the Tailwind plugin, then import Tailwind in your main stylesheet.

### 3. Initialize shadcn/ui

```bash
npx shadcn@latest init
```

Recommended answers:

- TypeScript: `Yes`
- Style: `Default`
- Base color: your preference
- Components path: `@/components`
- Utils path: `@/lib/utils`

That setup keeps the default primitive path as `components/ui`.

### 4. Add path alias support

In `tsconfig.json`, ensure `@/*` points to the project source root you choose.

Examples:

- If you keep files at repo root: `@/*` -> `./*`
- If you move to `src`: `@/*` -> `./src/*`

### 5. Ensure Tailwind scans TSX files

Your Tailwind source config must include:

- `components/**/*.tsx`
- `app/**/*.tsx` or `src/**/*.tsx`
- `lib/**/*.ts`

### 6. Use the demo component

Example:

```tsx
import { DemoBackgroundPaths } from "@/components/demo-background-paths";

export default function App() {
  return <DemoBackgroundPaths />;
}
```

## Assets and icons review

- Unsplash images: not required for this component
- Lucide icons: not required for this component
- Context providers: none required
- State management: none required

## Props and behavior review

Component props:

- `title?: string`

Internal state:

- none

Responsive behavior:

- full-screen hero section
- large animated heading
- centered CTA button
- works best as a landing-page hero or section header

## Best placement in this app

If you migrate this portfolio to React, this component fits best:

- at the top of the homepage as the hero section
- as a replacement for the current `#profile` section
- or as a new visual intro before the portfolio content

## Questions to answer before final placement

- What title should be passed into `BackgroundPaths`?
- Should the CTA button navigate somewhere, open a CV, or scroll to contact?
- Should the hero fill the full first screen on mobile?
- Do you want light mode only, or both light and dark themes?
- Should this replace the existing hero or live on a separate route?
