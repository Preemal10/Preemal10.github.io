import { profile } from '@/data/profile';
import Reveal from '@/components/Reveal';
import SectionHeading from '@/components/SectionHeading';

export default function Experience() {
  return (
    <section id="experience" className="relative py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Experience"
          title="Where I've worked"
          description="From enterprise platforms to a founding role at an AI-focused startup."
        />

        <div className="relative mx-auto max-w-4xl">
          <div className="absolute left-3 top-2 bottom-2 w-px bg-gradient-to-b from-emerald-400 via-cyan-400/40 to-transparent md:left-1/2 md:-translate-x-1/2" />

          <div className="space-y-12">
            {profile.experience.map((job, i) => {
              const alignRight = i % 2 === 1;
              return (
                <Reveal key={`${job.company}-${job.period}`}>
                  <div className={`relative pl-12 md:pl-0 ${alignRight ? 'md:pl-0' : ''} md:grid md:grid-cols-2 md:gap-12`}>
                    <span
                      className={`absolute left-[7px] top-2 h-3.5 w-3.5 rounded-full border-2 border-emerald-400 bg-zinc-950 md:left-1/2 md:-translate-x-1/2 ${
                        job.current ? 'shadow-[0_0_0_6px_rgba(52,211,153,0.15)]' : ''
                      }`}
                    />
                    <div className={`${alignRight ? 'md:col-start-2' : 'md:col-start-1 md:row-start-1 md:text-right'}`}>
                      <p className="font-display text-sm text-emerald-400">
                        {job.period}
                        {job.current && (
                          <span className="ml-3 rounded-full bg-emerald-400/15 px-2.5 py-0.5 text-xs text-emerald-300">Current</span>
                        )}
                      </p>
                      <h3 className="mt-2 font-display text-2xl font-bold text-white">{job.role}</h3>
                      <p className="text-zinc-400">
                        {job.company} · {job.location}
                      </p>
                    </div>
                    <ul className={`mt-5 space-y-3 md:mt-0 ${alignRight ? 'md:col-start-1 md:row-start-1 md:text-right' : ''}`}>
                      {job.highlights.map((point) => (
                        <li
                          key={point}
                          className="glass rounded-xl p-4 text-sm leading-relaxed text-zinc-300 transition-colors duration-300 hover:border-emerald-400/30"
                        >
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
