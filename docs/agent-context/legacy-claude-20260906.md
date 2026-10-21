# Retained project reference

Preserved from the project's previous CLAUDE.md on 6 September 2026.
Read only sections relevant to the task. This document preserves technical
and business context; its historical workflow, model, permission and release
instructions are superseded by the workspace AGENTS.md. Validate versions,
commands, paths and live claims against current source before relying on them.

---

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Run ESLint
npm run lint

# Preview production build
npm run preview
```

## Architecture Overview

This is a React + TypeScript website for Kent Building & Construction Ltd, built with Vite and styled using Tailwind CSS.

### Tech Stack
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom design system
- **Routing**: React Router v6
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Forms**: React Hook Form

### Project Structure
- `/src/App.tsx`: Main router configuration with all page routes
- `/src/pages/`: Page components (HomePage, ServicesPage, AboutPage, ContactPage)
- `/src/pages/services/`: Individual service page components
- `/src/components/`: Reusable components organized by feature
  - `/layout/`: Navbar and Footer components
  - `/home/`: Home page section components
- `/public/`: Static assets including redirects, favicons, and sitemap

### Routing Pattern
The app uses a standard React Router setup with:
- Main pages: `/`, `/services`, `/about`, `/contact`
- Service sub-pages: `/services/[service-name]`

### Styling Conventions
- Uses Tailwind CSS with extensive custom theme configuration
- Custom color palette defined in `tailwind.config.js`:
  - Primary: Green shades (#9bb08a base)
  - Secondary: Teal shades (#3a857e base)
  - Accent: Orange shades (#e77b1e base)
- Custom shadow utilities: `shadow-custom` and `shadow-custom-lg`
- Typography: Inter font for both headings and body text

### Component Patterns
- Functional components with TypeScript (`React.FC`)
- Framer Motion for animations with consistent patterns
- Page components handle SEO meta tags via `useEffect`
- Images hosted on ImageKit CDN

### Deployment
- Configured for both Vercel (`vercel.json`) and Netlify (`_redirects`)
- SPA routing handled via catch-all redirects to index.html
- No test suite currently configured
