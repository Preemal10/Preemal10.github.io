import { useEffect, useId, useRef, useState, type CSSProperties } from 'react';
import { createLensMap } from '@/lib/liquidGlass';

/** A decorative lens; the navigation stays sharp on a separate layer. */
export default function LiquidGlass() {
  const layerRef = useRef<HTMLSpanElement>(null);
  const id = `lens-${useId().replace(/:/g, '')}`;
  const [map, setMap] = useState('');

  useEffect(() => {
    const layer = layerRef.current;
    if (!layer) return;
    let frame = 0;
    const resize = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const { width, height } = layer.getBoundingClientRect();
        if (width && height) setMap(createLensMap(width, height, parseFloat(getComputedStyle(layer).borderTopLeftRadius) || 28));
      });
    };
    const observer = new ResizeObserver(resize);
    observer.observe(layer);
    resize();
    return () => { observer.disconnect(); cancelAnimationFrame(frame); };
  }, []);

  useEffect(() => {
    const layer = layerRef.current;
    const surface = layer?.parentElement;
    if (!layer || !surface) return;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    let current = 50;
    let target = 50;
    let lastTime = 0;
    const update = (time: number) => {
      const delta = Math.min((time - (lastTime || time - 16)) / 1000, 0.05);
      lastTime = time;
      current += (target - current) * (1 - Math.exp(-12 * delta));
      layer.style.setProperty('--glass-x', `${current}%`);
      if (Math.abs(target - current) > 0.05) {
        frame = window.requestAnimationFrame(update);
      } else {
        frame = 0;
        lastTime = 0;
      }
    };
    const move = (event: PointerEvent) => {
      if (event.pointerType === 'touch' || reducedMotion.matches) return;
      const bounds = surface.getBoundingClientRect();
      target = Math.max(0, Math.min(100, ((event.clientX - bounds.left) / bounds.width) * 100));
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    const reset = () => {
      target = 50;
      if (reducedMotion.matches) {
        window.cancelAnimationFrame(frame);
        frame = 0;
        lastTime = 0;
        current = 50;
        layer.style.setProperty('--glass-x', '50%');
      } else if (!frame) {
        frame = window.requestAnimationFrame(update);
      }
    };
    surface.addEventListener('pointermove', move, { passive: true });
    surface.addEventListener('pointerleave', reset);
    reducedMotion.addEventListener('change', reset);
    return () => {
      window.cancelAnimationFrame(frame);
      surface.removeEventListener('pointermove', move);
      surface.removeEventListener('pointerleave', reset);
      reducedMotion.removeEventListener('change', reset);
    };
  }, []);

  return (
    <span ref={layerRef} aria-hidden="true" className="liquid-glass" style={{ '--glass-filter': map ? `url("#${id}")` : 'blur(2px)' } as CSSProperties}>
      <svg width="0" height="0" className="absolute" focusable="false">
        <defs>
          <filter id={id} x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
            <feImage href={map || undefined} x="0" y="0" width="100%" height="100%" preserveAspectRatio="none" result="lens" />
            <feDisplacementMap in="SourceGraphic" in2="lens" scale="8" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>
    </span>
  );
}
