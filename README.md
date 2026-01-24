# Preemal Monis - Personal Website

A modern, recruiter-optimized digital business card website for a Fullstack Software Engineer built with React, TypeScript, and Tailwind CSS.

## Features

- **Modern Split Layout** - Professional two-panel design with photo and skills
- **Responsive Design** - Optimized for desktop, tablet, and mobile
- **Dark Theme** - Clean, professional dark mode aesthetic
- **Fast Loading** - Built with Vite for optimal performance
- **SEO Optimized** - Meta tags and Open Graph support for social sharing

## Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite 6** - Build tool and dev server
- **Tailwind CSS 4** - Utility-first styling
- **Lucide React** - Icons

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- npm (comes with Node.js)

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd website
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

The site will be available at `http://localhost:5173` (or another port if 5173 is in use).

### 4. Build for production

```bash
npm run build
```

The production-ready files will be in the `dist/` folder.

### 5. Preview production build

```bash
npm run preview
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production (TypeScript check + Vite build) |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint to check code quality |

## Project Structure

```
website/
├── public/
│   ├── favicon.svg        # Site favicon (PM initials)
│   └── profile.jpeg       # Profile photo
├── src/
│   ├── App.tsx            # Main application component
│   ├── main.tsx           # React entry point
│   ├── index.css          # Tailwind imports & global styles
│   └── vite-env.d.ts      # Vite type declarations
├── index.html             # HTML entry point with meta tags
├── package.json           # Dependencies and scripts
├── tsconfig.json          # TypeScript configuration
├── vite.config.ts         # Vite configuration
├── postcss.config.js      # PostCSS configuration for Tailwind
└── eslint.config.js       # ESLint configuration
```

## Customization

### Update Personal Information

Edit `src/App.tsx` to update:

- **Name and headline** - In the left panel header section
- **Skills** - Modify the skill arrays at the top of the file
- **Social links** - Update LinkedIn and GitHub URLs in the CTA section
- **Languages** - Update the languages section with appropriate flags and proficiency levels

### Update Profile Photo

Replace `public/profile.jpeg` with your own photo. Recommended:
- Square aspect ratio
- Minimum 400x400 pixels
- JPEG or PNG format

### Update Favicon

Replace `public/favicon.svg` with your own favicon or edit the existing SVG to change the initials.

### Update Meta Tags

Edit `index.html` to update:
- Page title
- Meta description
- Open Graph tags for social sharing

## Deployment

The built site (`dist/` folder) can be deployed to any static hosting service:

- **Vercel** - `vercel deploy`
- **Netlify** - Drag and drop `dist/` folder or connect Git repo
- **GitHub Pages** - Use GitHub Actions to deploy
- **AWS S3** - Upload `dist/` contents to an S3 bucket with static hosting

## License

MIT
