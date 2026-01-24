import { Linkedin, Github, Monitor, Server, Cloud, TestTube, Users, Sparkles } from 'lucide-react'

// Technology data organized by category - optimized for recruiter keyword matching
const frontendSkills = ['React', 'TypeScript', 'JavaScript', 'Next.js', 'HTML5', 'CSS3', 'Tailwind CSS']
const backendSkills = ['Node.js', 'Express', 'REST APIs', 'GraphQL', 'PostgreSQL', 'MongoDB']
const devOpsTools = ['Git', 'Docker', 'CI/CD', 'AWS', 'Kubernetes', 'GitHub Actions']
const testingSkills = ['Jest', 'Playwright', 'React Testing Library', 'TDD']
const methodologies = ['Agile/Scrum', 'Code Review', 'Pair Programming', 'Jira', 'Confluence']
const aiTools = ['AI Prompt Engineering', 'ChatGPT', 'Claude', 'GitHub Copilot']

// Badge component - clean uniform styling
function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-md border border-zinc-700 bg-zinc-800 px-2.5 py-1 text-xs font-medium text-zinc-200 transition-all duration-200 cursor-default hover:bg-zinc-700 hover:border-zinc-600 hover:scale-105">
      {children}
    </span>
  )
}

// Skill category component for consistency
function SkillCategory({ icon: Icon, title, skills }: { icon: any, title: string, skills: string[] }) {
  return (
    <div>
      <h2 className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-zinc-500 font-semibold mb-2">
        <Icon size={12} className="text-zinc-400" />
        {title}
      </h2>
      <div className="flex flex-wrap gap-1.5">
        {skills.map((skill) => (
          <Badge key={skill}>{skill}</Badge>
        ))}
      </div>
    </div>
  )
}

// CTA Buttons component to avoid duplication
function CTAButtons() {
  return (
    <>
      <p className="text-sm text-zinc-400 mb-4">
        Looking for a dedicated fullstack engineer? Let's connect!
      </p>
      <div className="flex flex-col sm:flex-row gap-3">
        <a
          href="https://www.linkedin.com/in/preemal-monis-112972277/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-zinc-950 transition-colors"
        >
          <Linkedin size={18} />
          Let's Connect
        </a>
        <a
          href="https://github.com/Preemal10"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-zinc-800 border border-zinc-700 px-5 py-2.5 text-sm font-semibold text-zinc-200 hover:bg-zinc-700 hover:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 focus:ring-offset-zinc-950 transition-colors"
        >
          <Github size={18} />
          View Projects
        </a>
      </div>
    </>
  )
}

function App() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <main className="flex flex-col lg:flex-row">
        {/* Left Panel - Identity & Headline */}
        <section className="lg:w-2/5 px-6 py-8 md:px-10 md:py-12 lg:px-16 lg:py-16 relative">
          {/* Subtle blue accent glow - contained within section */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none opacity-50" />
          <div className="absolute bottom-0 right-0 w-48 h-48 bg-blue-600/5 rounded-full blur-3xl pointer-events-none opacity-50" />
          
        <div className="relative z-10 max-w-xl mx-auto lg:mx-0">
          {/* Header with photo and name */}
          <div className="flex items-start gap-6 mb-6">
            <div className="flex-1 min-w-0">
              <h1 className="text-5xl md:text-6xl lg:text-5xl xl:text-6xl font-bold text-zinc-50 tracking-tight leading-tight">
                Preemal<br />Monis
              </h1>
            </div>
            
            <img 
              src="/profile.jpeg" 
              alt="Preemal Monis" 
              className="w-28 h-28 md:w-36 md:h-36 lg:w-32 lg:h-32 xl:w-36 xl:h-36 rounded-2xl object-cover border-2 border-zinc-700 shadow-xl shadow-black/40 flex-shrink-0"
            />
          </div>
          
          {/* Decorative accent */}
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-blue-400 rounded-full mb-6" />
          
          {/* Headline */}
          <p className="text-xl md:text-2xl lg:text-xl xl:text-2xl font-medium text-zinc-300 mb-4 leading-relaxed">
            Fullstack Software Engineer<br />
            <span className="text-zinc-400">specializing in </span>
            <span className="text-blue-400">React</span>
            <span className="text-zinc-500">, </span>
            <span className="text-blue-400">TypeScript</span>
            <span className="text-zinc-500"> & </span>
            <span className="text-blue-400">Node.js</span>
          </p>
          
          {/* Experience badge */}
          <div className="inline-flex items-center gap-2 bg-zinc-800/50 border border-zinc-700/50 rounded-full px-3 py-1 mb-6">
            <span className="text-sm font-semibold text-zinc-200">5+ Years Experience</span>
            <span className="text-zinc-500">·</span>
            <span className="text-sm text-zinc-400">Mid-Senior Level</span>
          </div>
          
          {/* Value Statement */}
          <p className="text-base md:text-lg text-zinc-500 leading-relaxed mb-6">
            Building scalable, production-ready web applications.<br />
            From concept to deployment.
          </p>
          
          {/* Experience highlights */}
          <div className="flex flex-wrap gap-3 text-xs text-zinc-400 mb-6">
            <span className="flex items-center gap-1.5">
              <span className="w-1 h-1 bg-blue-400 rounded-full" />
              Production-Ready Code
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1 h-1 bg-blue-400 rounded-full" />
              Agile Development
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1 h-1 bg-blue-400 rounded-full" />
              Team Collaboration
            </span>
          </div>
          
          {/* Languages */}
          <div className="flex flex-wrap gap-3 text-sm text-zinc-300">
            <span className="flex items-center gap-2">
              <span>🇬🇧</span>
              <span>English <span className="text-zinc-500 text-xs">(Fluent)</span></span>
            </span>
            <span className="flex items-center gap-2">
              <span>🇩🇪</span>
              <span>German <span className="text-zinc-500 text-xs">(Conversational)</span></span>
            </span>
            <span className="flex items-center gap-2">
              <span>🇮🇳</span>
              <span>Hindi <span className="text-zinc-500 text-xs">(Native)</span></span>
            </span>
          </div>
        </div>
      </section>

      {/* Right Panel - Skills & CTAs */}
      <section className="lg:w-3/5 px-6 py-8 md:px-10 md:py-12 lg:px-16 lg:py-16 lg:border-l lg:border-zinc-800/50">
        <div className="max-w-2xl mx-auto lg:mx-0">
          {/* CTA Section - Mobile/Tablet Only */}
          <div className="mb-8 lg:hidden">
            <CTAButtons />
          </div>

          {/* Technologies Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
            <SkillCategory icon={Monitor} title="Frontend" skills={frontendSkills} />
            <SkillCategory icon={Server} title="Backend" skills={backendSkills} />
            <SkillCategory icon={Cloud} title="DevOps & Cloud" skills={devOpsTools} />
            <SkillCategory icon={TestTube} title="Testing & QA" skills={testingSkills} />
            <SkillCategory icon={Users} title="Methodologies" skills={methodologies} />
            <SkillCategory icon={Sparkles} title="AI Tools" skills={aiTools} />
          </div>

          {/* CTA Section - Desktop Only */}
          <div className="border-t border-zinc-800/50 pt-8 hidden lg:block">
            <CTAButtons />
          </div>
        </div>
      </section>
    </main>
    </div>
  )
}

export default App
