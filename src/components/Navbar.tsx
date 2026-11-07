import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import LiquidGlass from './LiquidGlass';

const links = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('');
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > 24);
      let current = '';
      for (const link of links) {
        const section = document.getElementById(link.href.slice(1));
        if (section && section.getBoundingClientRect().top <= 160) current = link.href;
      }
      if (window.scrollY > 0 && window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
        current = '#contact';
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        menuRef.current?.focus();
      }
    };
    const onPointerDown = (event: PointerEvent) => {
      if (event.target instanceof Node && !headerRef.current?.contains(event.target)) setOpen(false);
    };
    const desktop = window.matchMedia('(min-width: 768px)');
    const onBreakpoint = () => { if (desktop.matches) setOpen(false); };
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    desktop.addEventListener('change', onBreakpoint);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
      desktop.removeEventListener('change', onBreakpoint);
    };
  }, [open]);

  return (
    <header
      ref={headerRef}
      className="pointer-events-none fixed inset-x-0 top-4 z-50 px-4 md:top-6"
      onBlur={event => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
    >
      <nav
        aria-label="Main navigation"
        className={`nav-dock pointer-events-auto relative mx-auto w-full max-w-sm rounded-[1.75rem] p-2 md:w-fit md:max-w-none ${scrolled || open ? 'nav-dock--scrolled' : ''}`}
      >
        <LiquidGlass />
        <div className="relative flex items-center justify-between gap-4 px-2 md:hidden">
          <span className="flex items-center gap-2.5 pl-2 text-xs font-medium tracking-wide text-zinc-300">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-emerald-300 shadow-[0_0_12px_#6ee7b780]" />
            {links.find(link => link.href === active)?.label ?? 'Explore'}
          </span>
          <button
            ref={menuRef}
            type="button"
            onClick={() => setOpen(value => !value)}
            aria-label={open ? 'Close navigation' : 'Open navigation'}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            className="nav-focus flex h-10 items-center gap-2 rounded-full px-3 text-xs font-medium text-zinc-200 transition-colors hover:bg-white/10"
          >
            {open ? 'Close' : 'Menu'}
            {open ? <X size={17} aria-hidden="true" /> : <Menu size={17} aria-hidden="true" />}
          </button>
        </div>

        <ul className="relative hidden items-center gap-1 md:flex">
          {links.map(link => (
            <li key={link.href}>
              <a
                href={link.href}
                aria-current={active === link.href ? 'location' : undefined}
                className={`nav-focus ${link.href === '#contact' ? 'nav-contact' : 'nav-link'}`}
              >
                {link.href === '#contact' ? <>Let’s talk <ArrowUpRight size={15} aria-hidden="true" /></> : link.label}
              </a>
            </li>
          ))}
        </ul>

        <ul id="mobile-navigation" hidden={!open} className="relative mt-2 space-y-1 pt-2 md:hidden">
          {links.map((link, index) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                aria-current={active === link.href ? 'location' : undefined}
                className="nav-focus nav-mobile-link group flex items-center gap-4 rounded-2xl px-4 py-3 text-sm text-zinc-300 transition-colors hover:bg-white/5 hover:text-white"
              >
                <span aria-hidden="true" className="font-mono text-[10px] text-zinc-500">0{index + 1}</span>
                <span className="flex-1">{link.label}</span>
                <ArrowUpRight size={15} aria-hidden="true" className="text-zinc-500 transition-colors group-hover:text-emerald-300" />
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
