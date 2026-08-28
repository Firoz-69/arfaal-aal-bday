import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';

/* ─── Floating particle ─── */
function Particle({ delay, x, emoji, size }) {
  return (
    <span
      style={{
        position: 'absolute',
        left: `${x}%`,
        top: '-5%',
        fontSize: size,
        opacity: 0,
        animation: `introParticleFall ${3 + Math.random() * 3}s ${delay}s ease-in forwards`,
        pointerEvents: 'none',
        userSelect: 'none',
        lineHeight: 1,
      }}
    >
      {emoji}
    </span>
  );
}

const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  delay: i * 0.2,
  x: 4 + (i / 18) * 92,
  emoji: ['🌸', '🌹', '✨', '💕', '🌺', '💫'][i % 6],
  size: `${0.8 + Math.random() * 0.6}rem`,
}));

/* ─── Word reveal sequence ─── */
const WORDS = [
  { text: 'For someone…', delay: 0 },
  { text: 'who lights up every room…', delay: 0.55 },
  { text: 'and every corner of my heart.', delay: 1.15 },
];

export default function IntroScreen({ name = 'Sophia', onDone }) {
  const [phase, setPhase] = useState('idle'); // 'idle' | 'opening' | 'words' | 'leaving'
  const [showParticles, setShowParticles] = useState(false);
  const overlayRef = useRef(null);

  /* ── Lock scroll ── */
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  /* ── Confetti burst ── */
  function fireConfetti() {
    const opts = {
      spread: 90, ticks: 200, gravity: 0.75, decay: 0.93,
      startVelocity: 35,
      colors: ['#e8758a', '#c4485e', '#ffc2d1', '#c9a566', '#fff', '#ffd6e4'],
    };
    confetti({ ...opts, particleCount: 70, origin: { x: 0.25, y: 0.65 } });
    confetti({ ...opts, particleCount: 70, origin: { x: 0.75, y: 0.65 } });
    confetti({ ...opts, particleCount: 50, origin: { x: 0.5, y: 0.6 }, shapes: ['circle'] });
  }

  /* ── Tap / click handler ── */
  function handleOpen() {
    if (phase !== 'idle') return;
    setPhase('opening');
    setShowParticles(true);
    fireConfetti();
    setTimeout(() => setPhase('words'), 950);
    setTimeout(() => setPhase('leaving'), 4300);
    setTimeout(() => { document.body.style.overflow = ''; onDone?.(); }, 5100);
  }

  function handleSkip(e) {
    e.stopPropagation();
    setPhase('leaving');
    setTimeout(() => { document.body.style.overflow = ''; onDone?.(); }, 850);
  }

  const isLeaving = phase === 'leaving';
  const isWords   = phase === 'words' || isLeaving;
  const isOpening = phase === 'opening' || isWords;

  return (
    <>
      {/* ── All keyframes ── */}
      <style>{`
        @keyframes introParticleFall {
          0%   { opacity: 0; transform: translateY(0) rotate(0deg); }
          10%  { opacity: 1; }
          80%  { opacity: 0.5; }
          100% { opacity: 0; transform: translateY(110vh) rotate(540deg); }
        }
        @keyframes introEnvPop {
          0%   { transform: scale(1) rotate(0deg); }
          30%  { transform: scale(1.14) rotate(-3deg); }
          60%  { transform: scale(0.95) rotate(1.5deg); }
          80%  { transform: scale(1.04) rotate(-0.5deg); }
          100% { transform: scale(1) rotate(0deg); }
        }
        @keyframes introFlapOpen {
          0%   { transform: rotateX(0deg); }
          100% { transform: rotateX(-175deg); }
        }
        @keyframes introLetterRise {
          0%   { opacity: 0; transform: translateY(0) scale(0.95); }
          100% { opacity: 1; transform: translateY(-34px) scale(1); }
        }
        @keyframes introWordFadeUp {
          0%   { opacity: 0; transform: translateY(20px) scale(0.97); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes introHintPulse {
          0%, 100% { opacity: 0.4; transform: translateX(-50%) scale(1); }
          50%       { opacity: 0.75; transform: translateX(-50%) scale(1.06); }
        }
        @keyframes introSealIn {
          0%   { transform: translate(-50%, -50%) scale(0) rotate(-30deg); opacity: 0; }
          70%  { transform: translate(-50%, -50%) scale(1.16) rotate(5deg); opacity: 1; }
          100% { transform: translate(-50%, -50%) scale(1) rotate(0deg); opacity: 1; }
        }
        @keyframes introSealOut {
          0%   { transform: translate(-50%, -50%) scale(1) rotate(0deg); opacity: 1; }
          100% { transform: translate(-50%, -50%) scale(0) rotate(30deg); opacity: 0; }
        }
        @keyframes introShimmer {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes introGlow {
          0%, 100% { opacity: 0.35; }
          50%       { opacity: 0.7; }
        }
        @keyframes introExit {
          0%   { opacity: 1; transform: scale(1); }
          100% { opacity: 0; transform: scale(1.05); }
        }
        @keyframes introLabelIn {
          0%   { opacity: 0; transform: translateY(14px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes introHintFloat {
          0%, 100% { opacity: 0.4; transform: translateY(0); }
          50%       { opacity: 0.8; transform: translateY(-4px); }
        }

        /* ── Mobile overrides ── */
        @media (max-width: 480px) {
          .intro-top-label {
            font-size: 1rem !important;
            padding: 0 16px;
            text-align: center;
          }
          .intro-hint {
            font-size: 0.68rem !important;
          }
          .intro-word {
            font-size: clamp(1.15rem, 6.5vw, 1.9rem) !important;
            padding: 0 12px;
          }
          .intro-name {
            font-size: clamp(1.7rem, 10vw, 3rem) !important;
          }
          .intro-skip {
            font-size: 0.62rem !important;
          }
        }
        @media (max-height: 640px) {
          .intro-envelope-wrap { gap: 16px !important; }
          .intro-word-wrap { gap: 10px !important; }
        }
      `}</style>

      {/* ── Overlay ── */}
      <div
        ref={overlayRef}
        onClick={handleOpen}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'radial-gradient(ellipse at 50% 38%, #2e1830 0%, #1a0e18 48%, #100810 100%)',
          overflow: 'hidden',
          cursor: phase === 'idle' ? 'pointer' : 'default',
          // safe-area insets for notched phones
          paddingTop: 'env(safe-area-inset-top)',
          paddingBottom: 'env(safe-area-inset-bottom)',
          paddingLeft: 'env(safe-area-inset-left)',
          paddingRight: 'env(safe-area-inset-right)',
          animation: isLeaving ? 'introExit 0.85s ease forwards' : 'none',
        }}
      >
        {/* ── Glow orbs ── */}
        <div style={{
          position: 'absolute', top: '15%', left: '10%',
          width: 'min(300px, 60vw)', height: 'min(300px, 60vw)',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(232,117,138,0.17) 0%, transparent 70%)',
          animation: 'introGlow 4s ease-in-out infinite',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: '12%', right: '10%',
          width: 'min(220px, 50vw)', height: 'min(220px, 50vw)',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(201,165,102,0.12) 0%, transparent 70%)',
          animation: 'introGlow 5.5s ease-in-out infinite reverse',
          pointerEvents: 'none',
        }} />

        {/* ── Particles ── */}
        {showParticles && PARTICLES.map(p => <Particle key={p.id} {...p} />)}

        {/* ══════════════════════════════════
            PHASE: idle / opening — envelope
            ══════════════════════════════════ */}
        {!isWords && (
          <div
            className="intro-envelope-wrap"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 'clamp(18px, 4vw, 32px)',
              width: '100%',
              animation: isOpening ? 'introEnvPop 0.7s cubic-bezier(0.34,1.56,0.64,1) forwards' : 'none',
            }}
          >
            {/* Top tagline */}
            <p
              className="intro-top-label"
              style={{
                fontFamily: 'var(--font-script)',
                fontSize: 'clamp(1rem, 3vw, 1.3rem)',
                color: 'rgba(253,246,248,0.45)',
                letterSpacing: '0.03em',
                textAlign: 'center',
                maxWidth: '80vw',
                lineHeight: 1.4,
                animation: 'introLabelIn 1s 0.25s ease both',
              }}
            >
              A birthday surprise awaits you…
            </p>

            {/* Envelope */}
            <div
              style={{
                position: 'relative',
                width: 'clamp(200px, 62vw, 300px)',
                flexShrink: 0,
              }}
            >
              <svg
                viewBox="0 0 320 220"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  width: '100%',
                  display: 'block',
                  filter: 'drop-shadow(0 16px 48px rgba(232,117,138,0.38))',
                }}
              >
                {/* Body */}
                <rect x="2" y="60" width="316" height="158" rx="12" fill="#2a1325" stroke="#c9a566" strokeWidth="1.5" />
                {/* V-fold lines */}
                <path d="M2 72 L160 152 L318 72" stroke="#3a1e36" strokeWidth="1" fill="none" />
                <path d="M2 218 L160 146 L318 218" fill="#1e0f1c" stroke="#3a1e36" strokeWidth="1" />

                {/* Flap */}
                <path
                  d="M2 62 L160 148 L318 62 L304 52 Q160 0 16 52 Z"
                  fill={isOpening ? '#3d1c38' : '#3a1832'}
                  stroke="#c9a566"
                  strokeWidth="1.5"
                  style={{
                    transformOrigin: '160px 62px',
                    animation: isOpening
                      ? 'introFlapOpen 0.5s 0.1s cubic-bezier(0.4,0,0.2,1) forwards'
                      : 'none',
                  }}
                />

                {/* Letter rising out */}
                {isOpening && (
                  <g style={{ animation: 'introLetterRise 0.55s 0.42s ease forwards', opacity: 0 }}>
                    <rect x="56" y="72" width="208" height="138" rx="6" fill="#fdf8f0" opacity="0.96" />
                    <line x1="80" y1="100" x2="240" y2="100" stroke="#e8758a" strokeWidth="1" opacity="0.35" />
                    <line x1="80" y1="116" x2="240" y2="116" stroke="#e8758a" strokeWidth="1" opacity="0.25" />
                    <line x1="80" y1="132" x2="240" y2="132" stroke="#e8758a" strokeWidth="1" opacity="0.25" />
                    <line x1="80" y1="148" x2="210" y2="148" stroke="#e8758a" strokeWidth="1" opacity="0.2" />
                    <text
                      x="160" y="92"
                      textAnchor="middle"
                      fontFamily="Dancing Script, cursive"
                      fontSize="12"
                      fill="#c4485e"
                      opacity="0.85"
                    >
                      {name} {String.fromCharCode(9825)}
                    </text>
                  </g>
                )}
              </svg>

              {/* Wax seal */}
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: 'clamp(48px, 10vw, 64px)',
                height: 'clamp(48px, 10vw, 64px)',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #8B1632 0%, #5A0D1F 100%)',
                border: '2.5px solid #c9a566',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 6px 22px rgba(91,13,31,0.6), inset 0 2px 5px rgba(255,255,255,0.18)',
                zIndex: 2,
                pointerEvents: 'none',
                animation: isOpening
                  ? 'introSealOut 0.28s ease forwards'
                  : 'introSealIn 0.9s 0.4s cubic-bezier(0.34,1.56,0.64,1) both',
              }}>
                <span style={{ fontSize: 'clamp(1rem, 3vw, 1.4rem)', lineHeight: 1 }}>💌</span>
              </div>
            </div>

            {/* Tap hint — absolute so it doesn't shift layout */}
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(0.65rem, 2vw, 0.78rem)',
              color: 'rgba(253,246,248,0.35)',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              animation: 'introHintFloat 2.2s 1.1s ease-in-out infinite',
              userSelect: 'none',
              textAlign: 'center',
            }}>
              tap to open ✦
            </p>
          </div>
        )}

        {/* ══════════════════════════════════
            PHASE: words — cinematic reveal
            ══════════════════════════════════ */}
        {isWords && (
          <div
            className="intro-word-wrap"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 'clamp(12px, 2.5vh, 24px)',
              textAlign: 'center',
              width: '100%',
              padding: '0 clamp(16px, 5vw, 48px)',
              pointerEvents: 'none',
              maxWidth: 680,
            }}
          >
            {/* Three cinematic lines */}
            {WORDS.map(({ text, delay }) => (
              <p
                key={text}
                className="intro-word"
                style={{
                  fontFamily: 'var(--font-script)',
                  fontSize: 'clamp(1.3rem, 4.5vw, 2.6rem)',
                  color: 'transparent',
                  background: 'linear-gradient(90deg, #ffc2d1 0%, #e8cc96 40%, #ffc2d1 70%, #e8cc96 100%)',
                  backgroundSize: '200% auto',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  animation: `introWordFadeUp 0.7s ${delay}s cubic-bezier(0.34,1.56,0.64,1) both,
                               introShimmer 3s ${delay + 0.7}s linear infinite`,
                  lineHeight: 1.4,
                  maxWidth: '100%',
                  wordBreak: 'break-word',
                }}
              >
                {text}
              </p>
            ))}

            {/* Big name reveal */}
            <div style={{
              marginTop: 'clamp(6px, 2vh, 16px)',
              width: '100%',
              animation: `introWordFadeUp 0.85s 2s cubic-bezier(0.34,1.56,0.64,1) both`,
            }}>
              <p
                className="intro-name"
                style={{
                  fontFamily: 'var(--font-script)',
                  fontSize: 'clamp(1.8rem, 9vw, 4.5rem)',
                  color: 'transparent',
                  background: 'linear-gradient(135deg, #e8758a 0%, #c9a566 50%, #ffc2d1 100%)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  fontWeight: 700,
                  filter: 'drop-shadow(0 0 28px rgba(232,117,138,0.45))',
                  lineHeight: 1.15,
                  wordBreak: 'break-word',
                  maxWidth: '100%',
                }}
              >
                Happy Birthday, {name}! 🎂
              </p>

              {/* Decorative underline */}
              <div style={{
                height: 2,
                margin: '10px auto 0',
                maxWidth: 'clamp(180px, 60%, 380px)',
                background: 'linear-gradient(to right, transparent, #e8758a, #c9a566, transparent)',
                borderRadius: 99,
                animation: 'introWordFadeUp 0.55s 2.6s ease both',
                opacity: 0,
              }} />
            </div>

            {/* Skip / enter link */}
            <p
              className="intro-skip"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(0.6rem, 2vw, 0.72rem)',
                color: 'rgba(253,246,248,0.28)',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                animation: 'introWordFadeUp 0.5s 3.3s ease both',
                marginTop: 'clamp(6px, 1.5vh, 14px)',
                pointerEvents: 'auto',
                cursor: 'pointer',
                padding: '8px 16px', // bigger tap target on mobile
              }}
              onClick={handleSkip}
            >
              entering in a moment… (tap to skip)
            </p>
          </div>
        )}
      </div>
    </>
  );
}
