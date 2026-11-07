import { useEffect, useRef, useState, type MouseEvent } from 'react';
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';
import { profile } from '@/data/profile';
import Flag from './Flag';

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [visibleRole, setVisibleRole] = useState(true);
  const spotlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setVisibleRole(false);
      window.setTimeout(() => {
        setRoleIndex((i) => (i + 1) % profile.roles.length);
        setVisibleRole(true);
      }, 400);
    }, 3200);
    return () => window.clearInterval(interval);
  }, []);

  const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
    const el = spotlightRef.current;
    if (!el) return;
    const rect = e.currentTarget.getBoundingClientRect();
    el.style.background = `radial-gradient(600px circle at ${e.clientX - rect.left}px ${e.clientY - rect.top}px, rgb(52 211 153 / 0.12), transparent 60%)`;
  };

  return (
    <section
      id="top"
      onMouseMove={handleMouseMove}
      className="relative flex min-h-screen items-center overflow-hidden pt-28"
    >
      <div className="grid-bg absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      <div className="pointer-events-none absolute -left-32 top-24 h-96 w-96 animate-blob rounded-full bg-emerald-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-16 h-96 w-96 animate-blob rounded-full bg-cyan-500/15 blur-3xl [animation-delay:-6s]" />
      <div ref={spotlightRef} className="pointer-events-none absolute inset-0 transition-[background] duration-300" />

      <div className="relative mx-auto grid w-full max-w-6xl gap-12 px-6 lg:grid-cols-[1.4fr_1fr] lg:items-center">
        <div>
          <h1 className="font-display text-5xl font-bold leading-[1.1] tracking-tight text-white sm:text-6xl lg:text-7xl">
            Hi, I'm <span className="text-gradient">{profile.name}</span>
          </h1>

          <p className="mt-6 flex h-10 items-center font-display text-2xl text-zinc-300 md:text-3xl">
            <span
              className={`transition-all duration-400 ${
                visibleRole ? 'translate-y-0 opacity-100' : '-translate-y-3 opacity-0'
              }`}
            >
              {profile.roles[roleIndex]}
            </span>
          </p>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-zinc-400 md:text-lg">
            {profile.intro}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-full bg-emerald-400 px-6 py-3 font-semibold text-zinc-950 transition-all duration-300 hover:-translate-y-0.5 hover:bg-emerald-300 hover:shadow-xl hover:shadow-emerald-400/25"
            >
              View my work
              <ArrowDown size={18} className="transition-transform duration-300 group-hover:translate-y-1" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-400/60 hover:bg-white/5"
            >
              <Mail size={18} />
              Get in touch
            </a>
          </div>

          <div className="mt-10 flex items-center gap-3">
            {[
              { href: profile.github, label: 'GitHub', Icon: Github },
              { href: profile.linkedin, label: 'LinkedIn', Icon: Linkedin },
            ].map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="rounded-full border border-white/10 p-3 text-zinc-300 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-400/50 hover:text-emerald-300"
              >
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-sm lg:max-w-none">
          <div className="pointer-events-none absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-emerald-400/20 to-cyan-400/10 blur-2xl" />
          <figure className="glass relative overflow-hidden rounded-3xl p-3 shadow-2xl shadow-black/40">
            <img
              src={profile.image}
              alt={`Portrait of ${profile.name}`}
              width={600}
              height={600}
              fetchPriority="high"
              className="aspect-square w-full rounded-2xl object-cover"
            />
            <figcaption className="flex items-center justify-center gap-3 px-3 pb-1 pt-4">
              {(['germany', 'india', 'eu'] as const).map(country => (
                <span key={country} className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-2.5 shadow-sm shadow-black/20 transition-colors hover:border-emerald-300/30 hover:bg-white/10">
                  <Flag country={country} />
                </span>
              ))}
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
