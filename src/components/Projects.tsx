import { Activity, ArrowUpRight, Bot, MessagesSquare, Users, type LucideIcon } from 'lucide-react';
import { profile, type ProjectItem } from '@/data/profile';
import Reveal from '@/components/Reveal';
import SectionHeading from '@/components/SectionHeading';

const icons: Record<ProjectItem['icon'], LucideIcon> = {
  bot: Bot,
  activity: Activity,
  users: Users,
  messages: MessagesSquare,
};

const accents: Record<ProjectItem['accent'], { text: string; glow: string; chip: string }> = {
  emerald: { text: 'text-emerald-300', glow: 'from-emerald-500/30', chip: 'bg-emerald-400/10 text-emerald-300' },
  cyan: { text: 'text-cyan-300', glow: 'from-cyan-500/30', chip: 'bg-cyan-400/10 text-cyan-300' },
  amber: { text: 'text-amber-300', glow: 'from-amber-500/30', chip: 'bg-amber-400/10 text-amber-300' },
  sky: { text: 'text-sky-300', glow: 'from-sky-500/30', chip: 'bg-sky-400/10 text-sky-300' },
};

export default function Projects() {
  return (
    <section id="projects" className="relative py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Projects"
          title="Side projects and experiments"
          description="Full-stack builds exploring AI agents, real-time systems, and conversational design."
        />

        <div className="grid gap-6 md:grid-cols-2">
          {profile.projects.map((project, i) => {
            const Icon = icons[project.icon];
            const accent = accents[project.accent];
            return (
              <Reveal key={project.name} delay={i * 120}>
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noreferrer"
                  className="group relative block h-full overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/60 p-8 transition-all duration-500 hover:-translate-y-2 hover:border-white/20 hover:shadow-2xl hover:shadow-black/50"
                >
                  <div className={`pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-gradient-to-br ${accent.glow} to-transparent opacity-40 blur-2xl transition-opacity duration-500 group-hover:opacity-100`} />

                  <div className="relative flex items-start justify-between">
                    <div className="rounded-2xl border border-white/10 bg-zinc-950/60 p-3 transition-transform duration-500 group-hover:scale-110">
                      <Icon size={26} className={accent.text} />
                    </div>
                    <ArrowUpRight
                      size={22}
                      className="text-zinc-500 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-white"
                    />
                  </div>

                  <div className="relative mt-8">
                    <p className={`text-sm font-medium ${accent.text}`}>{project.tagline}</p>
                    <h3 className="mt-2 font-display text-3xl font-bold text-white">{project.name}</h3>
                    <p className="mt-4 leading-relaxed text-zinc-400">{project.description}</p>
                  </div>

                  <div className="relative mt-6 flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <span key={tech} className={`rounded-full px-3 py-1 text-xs font-medium ${accent.chip}`}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </a>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
