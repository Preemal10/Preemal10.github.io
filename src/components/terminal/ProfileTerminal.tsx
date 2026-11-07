import { useEffect, useId, useRef, useState, type KeyboardEvent } from 'react';
import { ArrowDown, ArrowUp, ChevronRight, LoaderCircle, Terminal, Trash2 } from 'lucide-react';
import { useTerminal } from '@/hooks/useTerminal';
import { getFollowUps, welcome } from '@/lib/terminal/answers';
import { commands, MAX_INPUT } from '@/lib/terminal/types';
import TerminalMessage from './TerminalMessage';

export default function ProfileTerminal() {
  const { messages, pending, submit, clear, cancel } = useTerminal();
  const [input, setInput] = useState('');
  const [hasNew, setHasNew] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const transcript = useRef<HTMLDivElement>(null);
  const pinned = useRef(true);
  const id = useId();
  const followUps = getFollowUps(messages);

  useEffect(() => {
    if (pinned.current && transcript.current) {
      transcript.current.scrollTop = transcript.current.scrollHeight;
      setHasNew(false);
    } else {
      setHasNew(true);
    }
  }, [messages, pending]);

  function send(value: string) {
    if (pending || !value.trim()) return;
    void submit(value);
    setInput('');
    inputRef.current?.focus({ preventScroll: true });
  }

  function onKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Tab' && !event.shiftKey) {
      const prefix = input.toLowerCase().replace(/^\//, '');
      const matches = commands.filter(command => command.startsWith(prefix));
      if (prefix && matches.length === 1 && matches[0] !== prefix) {
        event.preventDefault();
        setInput(`${input.startsWith('/') ? '/' : ''}${matches[0]}`);
      }
    }
  }

  function reset() {
    clear();
    setInput('');
    pinned.current = true;
    inputRef.current?.focus({ preventScroll: true });
  }

  return (
    <div className="mx-auto max-w-4xl overflow-hidden rounded-xl border border-white/10 bg-[#111416] shadow-xl">
      <div className="flex items-center justify-between gap-3 border-b border-white/10 bg-white/[0.04] px-4 py-1.5 sm:px-5">
        <div aria-hidden="true" className="hidden gap-2 sm:flex">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </div>
        <span className="flex items-center gap-2 font-mono text-xs text-zinc-400"><Terminal size={14} aria-hidden="true" />preemal / profile</span>
        <button type="button" onClick={reset} aria-label="Clear conversation" title="Clear terminal" className="rounded p-2 text-zinc-500 transition hover:bg-white/5 hover:text-zinc-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-400"><Trash2 size={15} aria-hidden="true" /></button>
      </div>

      <div ref={transcript} role="region" aria-label="Terminal conversation" tabIndex={0}
        onScroll={() => {
          const el = transcript.current;
          if (el) pinned.current = el.scrollHeight - el.scrollTop - el.clientHeight < 48;
          if (pinned.current) setHasNew(false);
        }}
        className="h-60 overflow-y-auto overscroll-auto px-4 py-4 font-mono text-sm focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-emerald-400 sm:h-64 sm:px-5"
      >
        <TerminalMessage answer={welcome} />
        {messages.map(message => (
          <article key={message.id} className="mt-4 animate-[terminal-in_180ms_ease-out] border-t border-white/5 pt-4 motion-reduce:animate-none">
            <p className="mb-4 flex gap-2 break-all text-zinc-200"><ChevronRight size={17} className="mt-0.5 shrink-0 text-emerald-400" aria-hidden="true" /><span>{message.question}</span></p>
            <div className="border-l border-emerald-400/20 pl-4">
              <span className="sr-only">{message.source === 'classifier' ? 'Classifier-routed response' : 'Local response'}</span>
              <TerminalMessage answer={message.answer} />
            </div>
          </article>
        ))}
        {pending && (
          <div className="mt-7 border-t border-white/5 pt-5">
            <p className="mb-3 break-all text-zinc-200">› {pending}</p>
            <p className="flex items-center gap-2 text-xs text-emerald-300"><LoaderCircle size={14} className="animate-spin motion-reduce:animate-none" aria-hidden="true" />Finding a profile topic… <button type="button" onClick={cancel} className="ml-auto rounded p-1 text-zinc-400 underline focus-visible:outline focus-visible:outline-emerald-400">Cancel</button></p>
          </div>
        )}
      </div>
      <p role="status" aria-live="polite" aria-atomic="true" className="sr-only">{pending ? 'Finding a profile topic.' : messages.length ? `${messages[messages.length - 1].answer.title}. ${messages[messages.length - 1].answer.text}` : 'Terminal ready. Ask a question about the profile.'}</p>
      {hasNew && (
        <button type="button" onClick={() => {
          if (transcript.current) transcript.current.scrollTop = transcript.current.scrollHeight;
          pinned.current = true;
          setHasNew(false);
        }} className="flex w-full items-center justify-center gap-2 bg-emerald-400/10 py-2 text-xs text-emerald-300 focus-visible:outline focus-visible:outline-emerald-400"><ArrowDown size={12} aria-hidden="true" />Jump to latest</button>
      )}

      <div role="group" aria-label="Suggested follow-up questions" className="flex flex-wrap gap-2 border-t border-white/5 px-4 py-2 sm:px-5">
        {followUps.map(suggestion => (
          <button type="button" key={suggestion} disabled={!!pending} onClick={() => send(suggestion)} className="rounded-md border border-emerald-400/15 bg-emerald-400/5 px-2.5 py-1.5 text-left font-mono text-xs text-emerald-200 transition hover:border-emerald-400/40 hover:bg-emerald-400/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-400 disabled:opacity-40">
            {suggestion} <span aria-hidden="true">↵</span>
          </button>
        ))}
      </div>
      <form onSubmit={event => { event.preventDefault(); send(input); }} className="border-t border-white/10 bg-black/15 px-3 py-2 sm:px-4">
        <label htmlFor={`${id}-input`} className="sr-only">Ask a question about the profile or enter a command</label>
        <div className="flex items-center gap-2 rounded-lg px-1 focus-within:ring-1 focus-within:ring-emerald-400/30">
          <ChevronRight size={18} className="ml-1 shrink-0 text-emerald-400" aria-hidden="true" />
          <input ref={inputRef} id={`${id}-input`} value={input} onChange={event => setInput(event.target.value)} onKeyDown={onKeyDown} readOnly={!!pending} maxLength={MAX_INPUT} autoComplete="off" autoCapitalize="off" spellCheck={false} enterKeyHint="send" placeholder="Ask about my work…" className="min-w-0 flex-1 bg-transparent py-2 font-mono text-base text-zinc-100 caret-emerald-400 outline-none placeholder:text-zinc-600 sm:text-sm" />
          <button type="submit" disabled={!!pending || !input.trim()} aria-label="Send question" className="rounded-lg bg-emerald-400 p-2 text-zinc-950 transition hover:bg-emerald-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400 disabled:bg-white/5 disabled:text-zinc-600"><ArrowUp size={17} aria-hidden="true" /></button>
        </div>
      </form>
    </div>
  );
}
