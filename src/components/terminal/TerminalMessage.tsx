import { ArrowUpRight } from 'lucide-react';
import type { Answer } from '@/lib/terminal/types';

export default function TerminalMessage({ answer }: { answer: Answer }) {
  return (
    <div className="space-y-3">
      <h3 className="font-semibold text-zinc-100">{answer.title}</h3>
      <p className="whitespace-pre-wrap break-words leading-6 text-zinc-400">{answer.text}</p>
      {answer.links && (
        <div className="flex flex-wrap gap-3">
          {answer.links.map(link => (
            <a key={link.href} href={link.href} target={link.href.startsWith('https:') ? '_blank' : undefined} rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded text-emerald-300 underline decoration-emerald-400/30 underline-offset-4 transition hover:text-emerald-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-400">
              {link.label}<ArrowUpRight size={13} aria-hidden="true" />
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
