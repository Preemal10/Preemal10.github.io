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

function App() {
  return (
    <main className="min-h-screen flex flex-col md:flex-row">
      {/* Left Panel - Identity & Headline */}
      <section className="md:w-2/5 flex flex-col justify-center px-6 py-8 md:px-12 lg:px-16 md:py-0 relative overflow-hidden">
        {/* Subtle blue accent glow */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-48 -right-24 w-72 h-72 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />
        
        <header className="relative z-10">
          {/* Profile Photo - floating right */}
          <img 
            src="/profile.jpeg" 
            alt="Preemal Monis" 
            className="float-right ml-6 mb-4 w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 lg:w-40 lg:h-40 rounded-2xl object-cover border-2 border-zinc-700 shadow-xl shadow-black/40"
          />
          
          {/* Name */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-zinc-50 tracking-tight mb-4 md:mb-6">
            Preemal
            <br />
            Monis
          </h1>
          
          {/* Decorative accent line */}
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-blue-400 rounded-full mb-4 md:mb-6" />
          
          {/* Headline with highlighted tech keywords */}
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium text-zinc-300 mb-3 md:mb-4 leading-relaxed">
            Fullstack Software Engineer
            <br />
            <span className="text-zinc-400">specializing in </span>
            <span className="text-blue-400">React</span>
            <span className="text-zinc-500">, </span>
            <span className="text-blue-400">TypeScript</span>
            <span className="text-zinc-500"> & </span>
            <span className="text-blue-400">Node.js</span>
          </p>
          
          {/* Experience badge */}
          <div className="inline-flex items-center gap-2 bg-zinc-800/50 border border-zinc-700/50 rounded-full px-3 py-1 mb-4 md:mb-6">
            <span className="text-sm font-semibold text-zinc-200">5+ Years Experience</span>
            <span className="text-zinc-500">·</span>
            <span className="text-sm text-zinc-400">Mid-Senior Level</span>
          </div>
          
          {/* Clear float before value statement */}
          <div className="clear-both" />
          
          {/* Value Statement */}
          <p className="text-sm sm:text-base md:text-lg text-zinc-500 leading-relaxed mb-4 md:mb-6">
            Building scalable, production-ready web applications.
            <br />
            From concept to deployment.
          </p>
          
          {/* Experience highlights */}
          <div className="flex flex-wrap gap-3 text-xs text-zinc-400 mb-4 md:mb-6">
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
              <span>English</span>
              <span className="text-zinc-500 text-xs">(Fluent)</span>
            </span>
            <span className="flex items-center gap-2">
              <span>🇩🇪</span>
              <span>German</span>
              <span className="text-zinc-500 text-xs">(Conversational)</span>
            </span>
            <span className="flex items-center gap-2">
              <span>🇮🇳</span>
              <span>Hindi</span>
              <span className="text-zinc-500 text-xs">(Native)</span>
            </span>
          </div>
        </header>
      </section>

      {/* Right Panel - Skills & CTAs */}
      <section className="md:w-3/5 flex flex-col justify-center px-6 py-8 md:px-12 lg:px-16 md:py-0 md:border-l md:border-zinc-800/50">
        <div className="max-w-xl">
          {/* Technologies Grid */}
          <div className="grid grid-cols-2 gap-4 md:gap-5 mb-6 md:mb-8">
            {/* Frontend */}
            <div>
              <h2 className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-zinc-500 font-semibold mb-2">
                <Monitor size={12} className="text-zinc-400" />
                Frontend
              </h2>
              <div className="flex flex-wrap gap-1.5">
                {frontendSkills.map((tech) => (
                  <Badge key={tech}>{tech}</Badge>
                ))}
              </div>
            </div>
            
            {/* Backend */}
            <div>
              <h2 className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-zinc-500 font-semibold mb-2">
                <Server size={12} className="text-zinc-400" />
                Backend
              </h2>
              <div className="flex flex-wrap gap-1.5">
                {backendSkills.map((tech) => (
                  <Badge key={tech}>{tech}</Badge>
                ))}
              </div>
            </div>
            
            {/* DevOps & Cloud */}
            <div>
              <h2 className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-zinc-500 font-semibold mb-2">
                <Cloud size={12} className="text-zinc-400" />
                DevOps & Cloud
              </h2>
              <div className="flex flex-wrap gap-1.5">
                {devOpsTools.map((tech) => (
                  <Badge key={tech}>{tech}</Badge>
                ))}
              </div>
            </div>

            {/* Testing */}
            <div>
              <h2 className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-zinc-500 font-semibold mb-2">
                <TestTube size={12} className="text-zinc-400" />
                Testing & QA
              </h2>
              <div className="flex flex-wrap gap-1.5">
                {testingSkills.map((tech) => (
                  <Badge key={tech}>{tech}</Badge>
                ))}
              </div>
            </div>
            
            {/* Methodologies */}
            <div>
              <h2 className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-zinc-500 font-semibold mb-2">
                <Users size={12} className="text-zinc-400" />
                Methodologies
              </h2>
              <div className="flex flex-wrap gap-1.5">
                {methodologies.map((item) => (
                  <Badge key={item}>{item}</Badge>
                ))}
              </div>
            </div>

            {/* AI Tools */}
            <div>
              <h2 className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-zinc-500 font-semibold mb-2">
                <Sparkles size={12} className="text-zinc-400" />
                AI Tools
              </h2>
              <div className="flex flex-wrap gap-1.5">
                {aiTools.map((item) => (
                  <Badge key={item}>{item}</Badge>
                ))}
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="border-t border-zinc-800/50 pt-6 md:pt-8">
            <p className="text-sm text-zinc-400 mb-4">
              Looking for a dedicated fullstack engineer? Let's connect!
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
              <a
                href="https://www.linkedin.com/in/preemal-monis-112972277/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 md:px-6 md:py-3 text-sm font-semibold text-white hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-zinc-950 transition-colors"
              >
                <Linkedin size={18} />
                Let's Connect
              </a>
              <a
                href="https://github.com/Preemal10"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-zinc-800 border border-zinc-700 px-5 py-2.5 md:px-6 md:py-3 text-sm font-semibold text-zinc-200 hover:bg-zinc-700 hover:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 focus:ring-offset-zinc-950 transition-colors"
              >
                <Github size={18} />
                View Projects
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default App
