import React, { useState, useEffect, useRef } from 'react';

const TAGLINES = [
  'For the one who makes every day better.',
  'For our story so far — and every chapter ahead.',
  'For the girl who deserves the whole world.',
  'For the love that feels like coming home.',
  'For every laugh, every quiet moment, every memory.',
  'For you. Always, only, endlessly — for you.',
];

export default function RotatingTaglineSection() {
  const [current, setCurrent] = useState(0);
  const [fading, setFading] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) ref.current?.classList.add('visible'); },
      { threshold: 0.3 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setCurrent(prev => (prev + 1) % TAGLINES.length);
        setFading(false);
      }, 500);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="section-pad-sm"
      style={{
        background: 'linear-gradient(135deg, var(--bg-mid) 0%, var(--bg-warm) 100%)',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative large rose glow */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse 60% 80% at 50% 50%, rgba(232,117,138,0.07) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div ref={ref} className="reveal container" style={{ maxWidth: 720 }}>
        {/* Decorative line */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 32 }}>
          <div style={{ flex: 1, height: 1, background: 'linear-gradient(to right, transparent, var(--rose))' }} />
          <span style={{ fontSize: '1.4rem' }}>💌</span>
          <div style={{ flex: 1, height: 1, background: 'linear-gradient(to left, transparent, var(--rose))' }} />
        </div>

        {/* Rotating tagline */}
        <div className="tagline-container" style={{ minHeight: 120, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <h2
            className="font-serif"
            style={{
              fontSize: 'clamp(1.8rem, 5vw, 3.2rem)',
              fontWeight: 700,
              fontStyle: 'italic',
              color: 'var(--text-white)',
              lineHeight: 1.25,
              opacity: fading ? 0 : 1,
              transform: fading ? 'translateY(12px)' : 'translateY(0)',
              transition: 'opacity 0.5s ease, transform 0.5s ease',
              letterSpacing: '-0.01em',
            }}
          >
            {TAGLINES[current]}
          </h2>
        </div>

        {/* Dot indicators */}
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 28 }}>
          {TAGLINES.map((_, i) => (
            <button
              key={i}
              onClick={() => { setFading(true); setTimeout(() => { setCurrent(i); setFading(false); }, 400); }}
              style={{
                width: i === current ? 22 : 8,
                height: 8,
                borderRadius: 99,
                background: i === current ? 'var(--rose)' : 'rgba(232,117,138,0.3)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                padding: 0,
              }}
            />
          ))}
        </div>

        {/* Decorative line */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 32 }}>
          <div style={{ flex: 1, height: 1, background: 'linear-gradient(to right, transparent, var(--rose))' }} />
          <span style={{ fontSize: '1.4rem' }}>🌹</span>
          <div style={{ flex: 1, height: 1, background: 'linear-gradient(to left, transparent, var(--rose))' }} />
        </div>
      </div>
    </section>
  );
}
