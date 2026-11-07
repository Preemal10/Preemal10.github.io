import Reveal from '@/components/Reveal';

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
}

export default function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <Reveal className="mx-auto mb-16 max-w-2xl text-center">
      <p className="mb-4 font-display text-sm font-medium uppercase tracking-[0.25em] text-emerald-400">
        {eyebrow}
      </p>
      <h2 className="font-display text-4xl font-bold leading-[1.2] tracking-tight text-white md:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mt-5 text-base leading-relaxed text-zinc-400 md:text-lg">{description}</p>
      )}
    </Reveal>
  );
}
