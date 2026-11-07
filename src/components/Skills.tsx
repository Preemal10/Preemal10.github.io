import { Cloud, Code, Database, LayoutDashboard, Server, Sparkles, type LucideIcon } from 'lucide-react';
import { profile, type SkillGroup } from '@/data/profile';
import Reveal from '@/components/Reveal';
import SectionHeading from '@/components/SectionHeading';

const icons: Record<SkillGroup['icon'], LucideIcon> = {
  code: Code,
  layout: LayoutDashboard,
  server: Server,
  database: Database,
  cloud: Cloud,
  sparkles: Sparkles,
};

export default function Skills() {
  return (
    <section id="skills" className="relative py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow="Skills" title="The toolkit I reach for" />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {profile.skillGroups.map((group, i) => {
            const Icon = icons[group.icon];
            return (
              <Reveal key={group.title} delay={i * 80}>
                <div className="glass group h-full rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-400/30">
                  <div className="mb-5 flex items-center gap-3">
                    <span className="rounded-xl bg-emerald-400/10 p-2.5 text-emerald-300 transition-transform duration-300 group-hover:rotate-6">
                      <Icon size={20} />
                    </span>
                    <h3 className="font-display text-lg font-bold text-white">{group.title}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-lg border border-white/10 bg-zinc-950/50 px-3 py-1.5 text-sm text-zinc-300 transition-colors duration-200 hover:border-emerald-400/50 hover:text-emerald-300"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
