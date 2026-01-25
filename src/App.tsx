import { useState, useEffect } from 'react'
import { Linkedin, Github, ArrowDown, Sun, Moon, MapPin } from 'lucide-react'

// Skills organized by category
const skills = {
  'Frontend': ['React', 'TypeScript', 'Next.js', 'Tailwind CSS'],
  'Backend': ['Node.js', 'Express', 'PostgreSQL', 'GraphQL'],
  'DevOps': ['Docker', 'AWS', 'CI/CD', 'Kubernetes'],
  'AI': ['Claude', 'ChatGPT', 'GitHub Copilot', 'Agents'],
}

function ThemeToggle({ isDark, toggle }: { isDark: boolean; toggle: () => void }) {
  return (
    <button
      onClick={toggle}
      className="fixed top-6 right-6 z-50 p-3 rounded-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-all hover:scale-110"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  )
}

function Background() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Base gradient - subtle warm to cool */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-zinc-50 to-slate-100 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 transition-colors duration-500" />

      {/* Subtle accent - single soft blue glow */}
      <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_50%_50%_at_70%_-10%,rgba(59,130,246,0.08),transparent)] dark:bg-[radial-gradient(ellipse_50%_50%_at_70%_-10%,rgba(59,130,246,0.06),transparent)]" />

      {/* Very subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.025] dark:opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(to right, rgb(0 0 0) 1px, transparent 1px), linear-gradient(to bottom, rgb(0 0 0) 1px, transparent 1px)`,
          backgroundSize: '64px 64px'
        }}
      />
    </div>
  )
}

function App() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('theme')
      if (stored) return stored === 'dark'
      return window.matchMedia('(prefers-color-scheme: dark)').matches
    }
    return true
  })

  useEffect(() => {
    const root = document.documentElement
    if (isDark) {
      root.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      root.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [isDark])

  const toggleTheme = () => setIsDark(!isDark)

  return (
    <div className="min-h-screen transition-colors duration-300">
      <Background />
      <ThemeToggle isDark={isDark} toggle={toggleTheme} />

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 py-12 relative">
        <div className="max-w-2xl w-full text-center">
          {/* Profile Image */}
          <div className="mb-8">
            <img
              src="/profile.jpg"
              alt="Preemal Monis"
              className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover mx-auto border-4 border-white dark:border-zinc-800"
            />
          </div>

          {/* Name */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight mb-4">
            Preemal Monis
          </h1>

          {/* Title */}
          <p className="text-lg sm:text-xl md:text-2xl text-zinc-600 dark:text-zinc-400 mb-2">
            Fullstack Software Engineer
          </p>

          {/* Tech Stack */}
          <p className="text-base sm:text-lg text-zinc-500 mb-8">
            React · TypeScript · Node.js · AI
          </p>

          {/* Experience Badge */}
          <div className="inline-flex items-center gap-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-full px-4 py-2 mb-10">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm text-zinc-700 dark:text-zinc-300">5+ Years Experience</span>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <a
              href="https://www.linkedin.com/in/preemal-monis-112972277/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-500 transition-all hover:scale-105"
            >
              <Linkedin size={18} />
              Connect on LinkedIn
            </a>
            <a
              href="https://github.com/Preemal10"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 px-6 py-3 text-sm font-semibold text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-all hover:scale-105"
            >
              <Github size={18} />
              View GitHub
            </a>
          </div>

          {/* Scroll Indicator */}
          <a
            href="#skills"
            className="inline-flex flex-col items-center text-zinc-500 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer group"
          >
            <span className="text-sm font-medium mb-2">View Skills</span>
            <ArrowDown size={20} className="animate-bounce group-hover:scale-110 transition-transform" />
          </a>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="px-6 py-20 md:py-28 relative scroll-mt-8">
        <div className="max-w-4xl mx-auto relative">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-zinc-800 dark:text-zinc-100 mb-4">
              Technical Expertise
            </h2>
            <p className="text-zinc-500 max-w-lg mx-auto">
              Building scalable web applications from concept to deployment
            </p>
          </div>

          {/* Skills Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {Object.entries(skills).map(([category, items]) => (
              <div key={category} className="group">
                <h3 className="text-xs uppercase tracking-widest text-zinc-500 mb-4 font-semibold">
                  {category}
                </h3>
                <ul className="space-y-2">
                  {items.map((skill) => (
                    <li
                      key={skill}
                      className="text-zinc-700 dark:text-zinc-300 text-sm py-2 px-3 bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:border-blue-300 dark:hover:border-blue-800 transition-colors"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Additional Skills */}
          <div className="mt-16 text-center">
            <p className="text-xs uppercase tracking-widest text-zinc-400 dark:text-zinc-600 mb-4">Also experienced with</p>
            <div className="flex flex-wrap justify-center gap-2">
              {['Agile', 'Scrum', 'Requirements Engineering', 'Team Collaboration', 'Code Review', 'Problem Solving'].map((skill) => (
                <span
                  key={skill}
                  className="text-xs text-zinc-500 px-3 py-1 border border-zinc-300 dark:border-zinc-800 rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 border-t border-zinc-200 dark:border-zinc-800">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-8 text-sm">
          <div className="text-center sm:text-left">
            <p className="text-xs uppercase tracking-widest text-zinc-400 dark:text-zinc-600 mb-3">Languages</p>
            <div className="flex flex-wrap justify-center sm:justify-start gap-3">
              <span className="text-zinc-700 dark:text-zinc-300">English <span className="text-zinc-400 dark:text-zinc-500">(Fluent)</span></span>
              <span className="text-zinc-700 dark:text-zinc-300">German <span className="text-zinc-400 dark:text-zinc-500">(Conversational)</span></span>
              <span className="text-zinc-700 dark:text-zinc-300">Hindi <span className="text-zinc-400 dark:text-zinc-500">(Native)</span></span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-zinc-500">
            <MapPin size={16} />
            <span>Germany</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
