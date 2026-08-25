import React, { useEffect, useRef } from 'react';
import { Heart, Star, Clock } from 'lucide-react';

const MOSAIC_PHOTOS = [
  'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=400&q=70',
  'https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?auto=format&fit=crop&w=400&q=70',
  'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=400&q=70',
  'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=400&q=70',
  'https://images.unsplash.com/photo-1502635385003-ee1e6a1a742d?auto=format&fit=crop&w=400&q=70',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=70',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=70',
  'https://images.unsplash.com/photo-1535931737580-a99567967ddc?auto=format&fit=crop&w=400&q=70',
  'https://images.unsplash.com/photo-1521119989659-a83eee488004?auto=format&fit=crop&w=400&q=70',
];

const VALUE_PROPS = [
  { icon: Heart, label: 'Made just for you', desc: 'Every word, photo, and memory selected with love — nothing generic.' },
  { icon: Star, label: 'Every photo tells our story', desc: 'A visual journey through every moment we treasure together.' },
  { icon: Clock, label: 'Words that last forever', desc: 'Reopen anytime, share again, and revisit your story whenever you wish.' },
];

function useReveal(ref, options = {}) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add('visible'); },
      { threshold: 0.15, ...options }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
}

export default function ValuePropsSection() {
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  useReveal(leftRef);
  useReveal(rightRef);

  return (
    <section
      id="about-section"
      className="section-pad"
      style={{
        background: 'linear-gradient(180deg, var(--bg-deep) 0%, var(--bg-mid) 100%)',
        overflow: 'hidden',
      }}
    >
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 48,
          alignItems: 'center',
        }}>
          {/* Left: value props */}
          <div ref={leftRef} className="reveal-left">
            <div className="pill-badge" style={{ marginBottom: 20 }}>
              ✦ About This Letter
            </div>
            <h2 className="font-serif" style={{
              fontSize: 'clamp(1.8rem, 4vw, 3rem)',
              fontWeight: 700,
              color: 'var(--text-white)',
              marginBottom: 36,
              lineHeight: 1.2,
            }}>
              More than a message —<br/>
              <em style={{ color: 'var(--rose)', fontStyle: 'italic' }}>a keepsake</em>
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              {VALUE_PROPS.map(({ icon: Icon, label, desc }, i) => (
                <div
                  key={i}
                  className={`reveal delay-${(i + 1) * 200}`}
                  style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}
                >
                  <div style={{
                    width: 44, height: 44,
                    borderRadius: 12,
                    background: 'linear-gradient(135deg, rgba(232,117,138,0.2) 0%, rgba(196,72,94,0.15) 100%)',
                    border: '1px solid var(--border)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <Icon size={18} color="var(--rose)" />
                  </div>
                  <div>
                    <p style={{ fontWeight: 600, color: 'var(--text-white)', marginBottom: 4, fontSize: '0.95rem' }}>
                      {label}
                    </p>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                      {desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: photo mosaic with text overlay */}
          <div ref={rightRef} className="reveal-right" style={{ position: 'relative', borderRadius: 20, overflow: 'hidden' }}>
            {/* Mosaic grid */}
            <div className="photo-mosaic">
              {MOSAIC_PHOTOS.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={`Memory ${i + 1}`}
                  loading="lazy"
                  style={{
                    transitionDelay: `${i * 60}ms`,
                    animationDelay: `${i * 80}ms`,
                  }}
                />
              ))}
            </div>

            {/* Dark gradient overlay */}
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to top, rgba(16,8,16,0.9) 0%, rgba(16,8,16,0.4) 50%, rgba(16,8,16,0.2) 100%)',
            }} />

            {/* Headline overlay */}
            <div style={{
              position: 'absolute', bottom: 24, left: 20, right: 20,
              textAlign: 'center',
            }}>
              <div className="pill-badge" style={{ marginBottom: 12, justifyContent: 'center' }}>
                ✦ Our Story
              </div>
              <h3 className="font-serif" style={{
                fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
                fontWeight: 700,
                color: '#fff',
                lineHeight: 1.2,
              }}>
                Every frame is{' '}
                <em style={{ color: 'var(--rose)', fontStyle: 'italic', position: 'relative', display: 'inline-block' }}>
                  love
                  <svg viewBox="0 0 80 12" style={{ position: 'absolute', bottom: -5, left: 0, width: '100%', height: 10 }} fill="none">
                    <path d="M2 8 C20 2, 40 10, 60 4 C70 1, 76 7, 78 6"
                      stroke="var(--rose)" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.9" />
                  </svg>
                </em>
              </h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
