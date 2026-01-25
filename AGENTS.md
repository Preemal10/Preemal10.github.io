# AGENTS.md - AI Agent Context for Website Project

This file provides context for AI agents working on this project.

## Project Overview

A personal portfolio/digital business card website for **Preemal Monis**, a Fullstack Software Engineer with 5+ years of experience. The site is designed to be recruiter-optimized, professional, and modern.

## Key Design Decisions

### Layout
- **Split layout**: Left panel (40%) for identity/intro, right panel (60%) for skills/CTAs
- **Full viewport**: Uses entire screen height, designed to be non-scrolling
- **Responsive**: Stacks vertically on mobile, splits horizontally on tablet+
- **Dark theme**: Zinc color palette with subtle gradient background

### Profile Photo
- **Position**: Floats right in the left panel, text wraps around it
- **Style**: Rounded corners (`rounded-2xl`), not circular
- **Size**: Scales from 112px to 160px based on viewport
- **File**: `/public/profile.jpg`

### Visual Elements
- **Gradient background**: Subtle diagonal gradient (zinc-950 → zinc-900 → #1a1a1f)
- **Blue accent glow**: Soft blurred orbs in the left panel background
- **Decorative accent line**: Blue gradient line below the name
- **Badge hover effects**: Subtle scale (1.05) on hover

### Typography
- **Name**: Large bold text (text-4xl to text-7xl responsive)
- **Headline**: "Fullstack Software Engineer" with React/TypeScript/Node.js highlighted in blue
- **Experience badge**: "5+ Years Experience · Mid-Senior Level"

## Content Structure

### Left Panel
1. Profile photo (floating right)
2. Name (Preemal Monis)
3. Decorative accent line
4. Headline with tech keywords
5. Experience badge
6. Value statement
7. Experience highlights (bullet points)
8. Languages with flags (🇬🇧 English, 🇩🇪 German, 🇮🇳 Hindi)

### Right Panel (Skills Grid - 2x3)
1. **Frontend**: React, TypeScript, JavaScript, Next.js, HTML5, CSS3, Tailwind CSS
2. **Backend**: Node.js, Express, REST APIs, GraphQL, PostgreSQL, MongoDB
3. **DevOps & Cloud**: Git, Docker, CI/CD, AWS, Kubernetes, GitHub Actions
4. **Testing & QA**: Jest, Playwright, React Testing Library, TDD
5. **Methodologies**: Agile/Scrum, Code Review, Pair Programming, Jira, Confluence
6. **AI Tools**: AI Prompt Engineering, ChatGPT, Claude, GitHub Copilot

### CTAs
- **LinkedIn** (primary blue button): https://www.linkedin.com/in/preemal-monis-112972277/
- **GitHub** (secondary dark button): https://github.com/Preemal10

## Tech Stack

- **React 19** with TypeScript
- **Vite 6** for build tooling
- **Tailwind CSS 4** for styling
- **Lucide React** for icons (Monitor, Server, Cloud, TestTube, Users, Sparkles, Linkedin, Github)

## Important Files

| File | Purpose |
|------|---------|
| `src/App.tsx` | Main component with all UI (single component design) |
| `src/index.css` | Tailwind imports, gradient background, global styles |
| `public/profile.jpg` | Profile photo |
| `public/favicon.svg` | Favicon with "PM" initials |
| `index.html` | Entry point with SEO meta tags and Open Graph tags |

## Styling Guidelines

- **All badges**: Uniform zinc color scheme (zinc-700 border, zinc-800 bg, zinc-200 text)
- **Category headers**: zinc-500 text with zinc-400 icons
- **No colored badge variants**: User prefers monochromatic badge design
- **Hover states**: Subtle, professional (scale + brightness change)
- **No animations**: User explicitly declined animations

## User Preferences (from conversation)

1. ✅ Dark mode theme
2. ✅ Split layout (recommended option)
3. ✅ Subtle gradient background
4. ✅ Photo floating right of name (not inline, not above)
5. ✅ Simple border on photo (no glow effects)
6. ❌ No "Open to Work" badge
7. ❌ No colored category badges (reverted to uniform gray)
8. ❌ No animations or QR codes
9. ✅ Icons for technology categories
10. ✅ Language flags for English, German (Conversational), Hindi (Native)

## Language Proficiency

- 🇬🇧 English: Fluent
- 🇩🇪 German: Conversational
- 🇮🇳 Hindi: Native

## Commands

```bash
npm run dev      # Start dev server
npm run build    # Production build
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## Notes for Future Changes

- The Badge component is simplified to a single style - no variants needed
- Skills arrays are at the top of `App.tsx` for easy editing
- Photo position uses CSS float - changing to flexbox would require restructuring
- The site is designed to fit in one viewport - adding content may require scrolling adjustments
