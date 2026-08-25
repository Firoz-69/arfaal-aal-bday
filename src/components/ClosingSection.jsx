import React, { useEffect, useRef } from 'react';
import { Heart, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ClosingSection({ name = 'Sophia', onOpenLetter }) {
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) ref.current?.classList.add('visible'); },
      { threshold: 0.2 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const fireConfetti = () => {
    const opts = {
      spread: 80,
      ticks: 200,
      gravity: 0.8,
      decay: 0.94,
      startVelocity: 35,
      colors: ['#e8758a', '#c4485e', '#c9a566', '#ffd6e4', '#fff', '#ffc2d1'],
    };
    confetti({ ...opts, particleCount: 80, origin: { x: 0.25, y: 0.8 } });
    confetti({ ...opts, particleCount: 80, origin: { x: 0.75, y: 0.8 } });
    confetti({ ...opts, particleCount: 60, origin: { x: 0.5, y: 0.7 }, shapes: ['circle'] });
    onOpenLetter?.();
  };

  return (
    <section
      className="section-pad"
      style={{
        background: 'linear-gradient(180deg, var(--bg-dark) 0%, var(--bg-deep) 50%, var(--bg-dark) 100%)',
        position: 'relative',
        overflow: 'hidden',
        textAlign: 'center',
      }}
    >
      {/* Decorative glows */}
      <div style={{
        position: 'absolute', top: '20%', left: '15%',
        width: 300, height: 300, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(232,117,138,0.1) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '20%', right: '15%',
        width: 250, height: 250, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(201,165,102,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div ref={ref} className="reveal container" style={{ maxWidth: 680 }}>
        {/* Wax seal icon */}
        <div style={{ marginBottom: 32, display: 'flex', justifyContent: 'center' }}>
          <div className="wax-seal float-anim">
            <Heart size={28} fill="var(--rose-light)" color="var(--rose-light)" />
          </div>
        </div>

        {/* Letter heading */}
        <div className="pill-badge reveal delay-100" style={{ marginBottom: 20, justifyContent: 'center' }}>
          💌 A Note From Me
        </div>

        {/* Handwritten-style closing letter */}
        <div
          className="glass reveal delay-200"
          style={{
            borderRadius: 24,
            padding: 'clamp(28px, 5vw, 48px)',
            maxWidth: 560,
            margin: '0 auto 40px',
            textAlign: 'left',
            position: 'relative',
          }}
        >
          {/* Faint ruled lines */}
          <div style={{
            position: 'absolute', inset: 0, borderRadius: 24, overflow: 'hidden',
            backgroundImage: 'repeating-linear-gradient(to bottom, transparent 0px, transparent 31px, rgba(232,117,138,0.06) 31px, rgba(232,117,138,0.06) 32px)',
            backgroundSize: '100% 32px',
            pointerEvents: 'none',
          }} />

          <p
            className="font-script"
            style={{
              fontSize: 'clamp(1.1rem, 3vw, 1.35rem)',
              color: 'var(--text-muted)',
              lineHeight: 2,
              position: 'relative',
            }}
          >
            My dearest {name},
          </p>

          <p
            className="font-script reveal delay-300"
            style={{
              fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
              color: 'var(--text-muted)',
              lineHeight: 2,
              marginTop: 12,
              position: 'relative',
            }}
          >
            On this day, I just want you to know how much you mean to me.
            Every day you make this world a little brighter, a little warmer,
            a little more worth waking up for.
          </p>

          <p
            className="font-script reveal delay-400"
            style={{
              fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
              color: 'var(--text-muted)',
              lineHeight: 2,
              marginTop: 12,
              position: 'relative',
            }}
          >
            Thank you for existing. Thank you for letting me love you.
            Happy birthday — the world is so much better with you in it. 🌹
          </p>

          {/* Signature */}
          <div style={{ marginTop: 28, position: 'relative' }}>
            <div style={{ height: 1, background: 'var(--border)', marginBottom: 12 }} />
            <p
              className="font-script"
              style={{
                fontSize: '1.5rem',
                color: 'var(--rose)',
                fontWeight: 600,
              }}
            >
              Forever yours ♡
            </p>
          </div>
        </div>

        {/* Big CTA */}
        <div className="reveal delay-500">
          <button
            className="btn-rose pulse-glow"
            onClick={fireConfetti}
            style={{ fontSize: '1.05rem', padding: '18px 44px' }}
          >
            <Sparkles size={20} />
            Happy Birthday, {name}! 🎂
          </button>
          <p style={{
            marginTop: 14,
            fontSize: '0.8rem',
            color: 'var(--text-faint)',
          }}>
            Tap to open the full letter & celebrate ✨
          </p>
        </div>
      </div>
    </section>
  );
}
