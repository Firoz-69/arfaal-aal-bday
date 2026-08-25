import React, { useEffect, useRef } from 'react';
import { Heart, RefreshCw, ChevronDown, Mail } from 'lucide-react';

export default function StillHereSection({ onOpenLetter }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add('visible'); },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="still-here"
      className="section-pad"
      style={{
        background: 'linear-gradient(180deg, var(--bg-dark) 0%, var(--bg-deep) 100%)',
        textAlign: 'center',
        position: 'relative',
      }}
    >
      {/* Background glow */}
      <div style={{
        position: 'absolute',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500, height: 300,
        borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(232,117,138,0.1) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div ref={ref} className="reveal container" style={{ maxWidth: 680 }}>
        {/* Icon */}
        <div style={{ marginBottom: 24 }}>
          <div style={{
            width: 72, height: 72,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, rgba(232,117,138,0.2) 0%, rgba(196,72,94,0.2) 100%)',
            border: '1px solid var(--border-strong)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto',
          }}>
            <Heart size={32} fill="var(--rose)" color="var(--rose)" className="heartbeat-anim" />
          </div>
        </div>

        <div className="pill-badge reveal delay-100" style={{ marginBottom: 20 }}>
          ✦ Always Here For You
        </div>

        <h2
          className="font-serif reveal delay-200"
          style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 700,
            color: 'var(--text-white)',
            lineHeight: 1.2,
            marginBottom: 20,
          }}
        >
          This letter will always be{' '}
          <em style={{ color: 'var(--rose)', fontStyle: 'italic' }}>waiting</em>{' '}
          for you.
        </h2>

        <p
          className="reveal delay-300"
          style={{
            fontSize: 'clamp(1rem, 2vw, 1.15rem)',
            color: 'var(--text-muted)',
            lineHeight: 1.8,
            marginBottom: 12,
            fontWeight: 300,
          }}
        >
          On your worst days and your best — whenever you need a reminder that
          you are seen, loved, and celebrated — this letter will be right here.
        </p>
        <p
          className="reveal delay-400"
          style={{
            fontFamily: 'var(--font-script)',
            fontSize: '1.3rem',
            color: 'var(--rose-light)',
            marginBottom: 40,
          }}
        >
          Open it as many times as you need. 💌
        </p>

        {/* Two buttons */}
        <div className="reveal delay-500" style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button className="btn-rose" onClick={onOpenLetter}>
            <Mail size={16} />
            Open My Letter
          </button>
          <button className="btn-ghost" onClick={onOpenLetter}>
            <RefreshCw size={16} />
            Read Again
          </button>
        </div>
      </div>

      {/* Scroll arrow */}
      <div style={{ marginTop: 64, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
        <span style={{ fontSize: '0.68rem', color: 'var(--text-faint)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          Continue
        </span>
        <ChevronDown size={18} color="var(--rose)" className="bounce-arrow" />
      </div>
    </section>
  );
}
