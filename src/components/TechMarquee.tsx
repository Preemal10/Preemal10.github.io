import { profile } from '@/data/profile';

export default function TechMarquee() {
  const items = [...profile.techMarquee, ...profile.techMarquee];

  return (
    <div className="relative overflow-hidden border-y border-white/10 bg-zinc-900/40 py-6 [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
      <div className="flex w-max animate-marquee gap-12 whitespace-nowrap">
        {items.map((tech, i) => (
          <span key={`${tech}-${i}`} className="font-display text-xl font-medium text-zinc-500 transition-colors duration-300 hover:text-emerald-300">
            {tech}
            <span className="ml-12 text-emerald-400/60">/</span>
          </span>
        ))}
      </div>
    </div>
  );
}
