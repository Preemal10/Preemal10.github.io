import { Award, GraduationCap } from 'lucide-react';
import { profile } from '@/data/profile';
import Reveal from '@/components/Reveal';
import SectionHeading from '@/components/SectionHeading';

export default function Education() {
  return (
    <section id="education" className="relative py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow="Education" title="Academic path and certifications" />

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-6">
            <Reveal>
              <div className="glass relative overflow-hidden rounded-3xl p-8">
                <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-cyan-400/20 blur-3xl" />
                <p className="font-display text-sm uppercase tracking-[0.2em] text-cyan-300">Master's Thesis</p>
                <h3 className="mt-3 font-display text-2xl font-bold leading-snug text-white">{profile.thesis.title}</h3>
                <p className="mt-2 text-sm text-zinc-500">{profile.thesis.period}</p>
                <ul className="mt-6 space-y-3">
                  {profile.thesis.points.map((point) => (
                    <li key={point} className="flex gap-3 text-sm leading-relaxed text-zinc-300">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            {profile.education.map((item, i) => (
              <Reveal key={item.degree} delay={i * 120}>
                <div className="glass flex gap-5 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-400/30">
                  <span className="h-fit rounded-xl bg-emerald-400/10 p-3 text-emerald-300">
                    <GraduationCap size={22} />
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-bold text-white">{item.degree}</h3>
                    <p className="text-zinc-400">{item.school}</p>
                    <p className="mt-2 text-sm text-zinc-500">
                      {item.period} · {item.location}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={150}>
            <div className="glass rounded-3xl p-8">
              <h3 className="mb-6 flex items-center gap-3 font-display text-xl font-bold text-white">
                <Award size={22} className="text-emerald-300" />
                Certifications
              </h3>
              <ul className="divide-y divide-white/10">
                {profile.certifications.map((cert) => (
                  <li key={cert.name} className="group flex items-start justify-between gap-4 py-4">
                    <div>
                      <p className="font-medium text-zinc-100 transition-colors group-hover:text-emerald-300">{cert.name}</p>
                      <p className="text-sm text-zinc-500">{cert.issuer}</p>
                    </div>
                    <span className="shrink-0 rounded-full bg-white/5 px-3 py-1 text-xs text-zinc-400">{cert.date}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
