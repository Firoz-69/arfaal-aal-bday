import React, { useEffect, useRef } from 'react';
import { Mail, Music, Image, Calendar, MessageSquareHeart, Lock, Heart } from 'lucide-react';

const ITEMS = [
  { icon: MessageSquareHeart, label: 'A private message', desc: 'Words written only for your eyes.' },
  { icon: Image, label: 'Your favourite photos', desc: 'Every picture that captures our story.' },
  { icon: Music, label: 'Our song', desc: 'The one that plays in my head when I think of you.' },
  { icon: Calendar, label: 'A special date memory', desc: 'A milestone we will never forget.' },
  { icon: Heart, label: 'A love note just for today', desc: 'Because you deserve to feel celebrated.' },
];

export default function UnlockLetterSection({ onOpenLetter }) {
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
      className="section-pad"
      style={{ background: 'var(--bg-warm)', position: 'relative', overflow: 'hidden' }}
    >
      {/* Decorative glow */}
      <div style={{
        position: 'absolute', top: '-20%', right: '-10%',
        width: 400, height: 400,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(232,117,138,0.12) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 60,
          alignItems: 'center',
        }}>
          {/* Illustration side */}
          <div ref={ref} className="reveal" style={{ textAlign: 'center' }}>
            {/* Animated envelope SVG */}
            <div style={{ position: 'relative', display: 'inline-block' }}>
              <div style={{
                width: 220, height: 220,
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(232,117,138,0.15) 0%, transparent 70%)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto',
              }}>
                <div className="float-anim" style={{
                  width: 140, height: 140,
                  background: 'linear-gradient(135deg, rgba(232,117,138,0.25) 0%, rgba(196,72,94,0.2) 100%)',
                  border: '2px solid var(--border-strong)',
                  borderRadius: 24,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  position: 'relative',
                }}>
                  <Mail size={56} color="var(--rose)" strokeWidth={1.5} />
                  {/* Lock badge */}
                  <div style={{
                    position: 'absolute',
                    bottom: -12, right: -12,
                    width: 40, height: 40,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, var(--gold) 0%, var(--gold-light) 100%)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 4px 12px rgba(201,165,102,0.4)',
                  }}>
                    <Lock size={18} color="#fff" />
                  </div>
                </div>
              </div>

              {/* Orbiting hearts */}
              {[0, 120, 240].map((deg, i) => (
                <div
                  key={i}
                  style={{
                    position: 'absolute',
                    top: '50%', left: '50%',
                    width: 28, height: 28,
                    marginTop: -14, marginLeft: -14,
                    transform: `rotate(${deg}deg) translateX(110px)`,
                    animation: `spin 10s linear infinite`,
                    animationDirection: i % 2 === 0 ? 'normal' : 'reverse',
                  }}
                >
                  <Heart size={14} fill="var(--rose)" color="var(--rose)" opacity={0.6} />
                </div>
              ))}
            </div>

            <p className="font-script" style={{
              marginTop: 24,
              fontSize: '1.4rem',
              color: 'var(--rose-light)',
            }}>
              Ready to be opened...
            </p>
          </div>

          {/* Checklist side */}
          <div className="reveal delay-200">
            <div className="pill-badge" style={{ marginBottom: 20 }}>
              💌 Inside This Letter
            </div>
            <h2 className="font-serif" style={{
              fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
              fontWeight: 700,
              color: 'var(--text-white)',
              marginBottom: 8,
              lineHeight: 1.2,
            }}>
              Unlock everything{' '}
              <em style={{ color: 'var(--rose)', fontStyle: 'italic' }}>made for you</em>
            </h2>
            <p style={{
              color: 'var(--text-muted)',
              fontSize: '0.95rem',
              marginBottom: 32,
              lineHeight: 1.7,
            }}>
              One link. One tap. A whole world of love waiting inside.
            </p>

            <div>
              {ITEMS.map(({ icon: Icon, label, desc }, i) => (
                <div
                  key={i}
                  className={`check-item reveal delay-${(i + 1) * 100}`}
                >
                  <div className="check-dot">
                    <Icon size={11} color="#fff" />
                  </div>
                  <div>
                    <p style={{ fontWeight: 600, color: 'var(--text-white)', fontSize: '0.9rem', marginBottom: 2 }}>
                      {label}
                    </p>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <button className="btn-rose" onClick={onOpenLetter} style={{ marginTop: 32 }}>
              <Mail size={16} />
              Read My Letter
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
