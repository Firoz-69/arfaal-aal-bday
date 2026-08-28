import React, { useEffect, useRef } from 'react';
import { Heart, ChevronDown, Mail } from 'lucide-react';

const HERO_BG = 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=1600&q=80';

export default function HeroSection({ onOpenLetter }) {
  const headlineRef = useRef(null);

  useEffect(() => {
    const el = headlineRef.current;
    if (!el) return;
    setTimeout(() => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 200);
  }, []);

  const scrollDown = () => {
    document.getElementById('still-here')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Background photo */}
      <img
        src={HERO_BG}
        alt="Romantic background"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
        }}
      />

      {/* Multi-layer dark overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to bottom, rgba(10,4,14,0.5) 0%, rgba(16,8,16,0.72) 60%, rgba(16,8,16,0.95) 100%)',
      }} />

      {/* Floating rose glow orbs */}
      <div style={{
        position: 'absolute',
        top: '20%', left: '10%',
        width: 300, height: 300,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(232,117,138,0.18) 0%, transparent 70%)',
        filter: 'blur(40px)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute',
        bottom: '20%', right: '10%',
        width: 250, height: 250,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(201,165,102,0.15) 0%, transparent 70%)',
        filter: 'blur(40px)',
        pointerEvents: 'none',
      }} />

      {/* Content */}
      <div
        ref={headlineRef}
        className="hero-content"
        style={{
          position: 'relative',
          zIndex: 2,
          padding: '120px 24px 80px',
          maxWidth: 780,
          opacity: 0,
          transform: 'translateY(40px)',
          transition: 'all 1s cubic-bezier(0.22,1,0.36,1)',
        }}
      >
        {/* Pill badge */}
        <div className="pill-badge" style={{ marginBottom: 24, animation: 'fadeUp 0.8s ease both' }}>
          <Heart size={11} fill="currentColor" />
          A Birthday Surprise Just For You
        </div>

        {/* Main headline */}
        <h1
          className="font-serif"
          style={{
            fontSize: 'clamp(2.4rem, 7vw, 5rem)',
            fontWeight: 700,
            lineHeight: 1.15,
            color: 'var(--text-white)',
            marginBottom: 28,
            letterSpacing: '-0.01em',
            animation: 'fadeUp 0.9s 0.15s ease both',
          }}
        >
          Surprise on your birthday with an{' '}
          <em style={{
            fontStyle: 'italic',
            color: 'var(--rose)',
            position: 'relative',
          }}>
            unforgettable
            {/* hand-drawn squiggle */}
            <svg
              viewBox="0 0 200 12"
              style={{ position: 'absolute', bottom: -8, left: 0, width: '100%', height: 12, overflow: 'visible' }}
              fill="none"
            >
              <path
                d="M2 8 C30 2, 50 10, 80 5 C110 0, 130 9, 160 4 C180 1, 195 7, 198 6"
                stroke="var(--rose)"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
                opacity="0.8"
              />
            </svg>
          </em>{' '}
          letter.
        </h1>

        {/* Subheading */}
        <p style={{
          fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
          color: 'rgba(253,246,248,0.75)',
          maxWidth: 520,
          margin: '0 auto 40px',
          lineHeight: 1.7,
          fontWeight: 300,
          animation: 'fadeUp 0.9s 0.3s ease both',
        }}>
          A private digital letter filled with photos, music, and memories —
          opened with one tap, remembered forever.
        </p>

        {/* CTA */}
        <div style={{ animation: 'fadeUp 0.9s 0.45s ease both' }}>
          <button className="btn-rose pulse-glow" onClick={onOpenLetter} style={{ fontSize: '1rem', padding: '16px 40px' }}>
            <Mail size={18} />
            Open My Letter
          </button>
        </div>
      </div>

      {/* Floating badge overlapping edge */}
      <div
        className="float-anim hero-float-badge"
        style={{
          position: 'absolute',
          bottom: 100,
          right: 40,
          zIndex: 3,
          background: 'rgba(255,255,255,0.1)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.25)',
          borderRadius: 16,
          padding: '12px 18px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 4,
          animation: 'float 4s ease-in-out infinite',
        }}
      >
        <Heart size={22} fill="var(--rose)" color="var(--rose)" className="heartbeat-anim" />
        <span style={{ fontFamily: 'var(--font-script)', color: 'var(--text-white)', fontSize: '0.9rem' }}>
          Just for you
        </span>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollDown}
        style={{
          position: 'absolute',
          bottom: 36,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 3,
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 6,
          color: 'rgba(253,246,248,0.5)',
        }}
      >
        <span style={{ fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Scroll</span>
        <ChevronDown size={20} className="bounce-arrow" />
      </button>
    </section>
  );
}
