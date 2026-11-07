import { ArrowUpRight, Github, Globe, Linkedin, MapPin } from 'lucide-react';
import { profile } from '@/data/profile';
import Reveal from '@/components/Reveal';

const socials = [
  { label: 'LinkedIn', href: profile.linkedin, Icon: Linkedin },
  { label: 'GitHub', href: profile.github, Icon: Github },
  { label: 'Website', href: profile.website, Icon: Globe },
];

export default function Contact() {
  return (
    <section id="contact" className="relative py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-900/60 p-8 md:p-16">
            <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 animate-blob rounded-full bg-emerald-500/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 -right-20 h-72 w-72 animate-blob rounded-full bg-cyan-500/15 blur-3xl [animation-delay:-8s]" />
            <div className="relative grid gap-10 lg:grid-cols-2 lg:items-center">
              <div>
                <p className="mb-4 font-display text-sm uppercase tracking-[0.25em] text-emerald-400">Contact</p>
                <h2 className="font-display text-4xl font-bold leading-[1.2] tracking-tight text-white md:text-5xl">
                  Let's <span className="text-gradient">build together.</span>
                </h2>
                <p className="mt-5 max-w-md leading-relaxed text-zinc-400">
                  Open to full-stack, AI, and cloud opportunities. Let's connect on LinkedIn.
                </p>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-8 inline-flex items-center gap-2 rounded-full bg-emerald-400 px-6 py-3 font-semibold text-zinc-950 transition-all hover:-translate-y-0.5 hover:bg-emerald-300"
                >
                  Connect on LinkedIn <ArrowUpRight size={18} />
                </a>
              </div>
              <div className="space-y-6">
                <p className="flex items-center gap-3 text-zinc-300">
                  <MapPin size={20} className="text-emerald-400" />
                  {profile.location}
                </p>
                <div className="grid grid-cols-3 gap-3">
                  {socials.map(({ label, href, Icon }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      className="glass flex flex-col items-center gap-2 rounded-2xl py-5 text-sm text-zinc-300 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-400/40 hover:text-emerald-300"
                    >
                      <Icon size={22} />
                      {label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
