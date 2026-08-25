import React, { useEffect, useRef } from 'react';
import { PenLine, ImagePlus, QrCode } from 'lucide-react';

const STEPS = [
  {
    num: '1',
    icon: PenLine,
    title: 'Create',
    desc: 'The message and story is written just for her — in your own voice, from the heart.',
    img: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=600&q=70',
  },
  {
    num: '2',
    icon: ImagePlus,
    title: 'Personalize',
    desc: 'Add your favourite photos together, your song, and memories only the two of you share.',
    img: 'https://images.unsplash.com/photo-1583316174775-bd6dc0e9f298?auto=format&fit=crop&w=600&q=70',
  },
  {
    num: '3',
    icon: QrCode,
    title: 'Reveal',
    desc: 'She opens it via a private link or a scanned QR code — no app needed, instant magic.',
    img: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=70',
  },
];

export default function HowItWorksSection() {
  const refs = useRef([]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.15 }
    );
    refs.current.forEach(r => r && obs.observe(r));
    return () => obs.disconnect();
  }, []);

  return (
    <section id="how-it-works" className="section-pad" style={{
      background: 'linear-gradient(180deg, var(--bg-deep) 0%, var(--bg-dark) 100%)',
    }}>
      <div className="container">
        {/* Header */}
        <div
          ref={el => refs.current[0] = el}
          className="reveal"
          style={{ textAlign: 'center', marginBottom: 56 }}
        >
          <div className="pill-badge" style={{ marginBottom: 16 }}>✦ How It Works</div>
          <h2 className="font-serif" style={{
            fontSize: 'clamp(1.8rem, 4vw, 3rem)',
            fontWeight: 700,
            color: 'var(--text-white)',
            marginBottom: 12,
          }}>
            Three steps to something{' '}
            <em style={{ color: 'var(--rose)', fontStyle: 'italic' }}>extraordinary</em>
          </h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: 440, margin: '0 auto', fontSize: '0.95rem', lineHeight: 1.7 }}>
            Building the perfect birthday surprise is easier than you think.
          </p>
        </div>

        {/* Steps */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 28,
        }}>
          {STEPS.map(({ num, icon: Icon, title, desc, img }, i) => (
            <div
              key={i}
              ref={el => refs.current[i + 1] = el}
              className={`reveal delay-${(i + 1) * 200}`}
              style={{
                borderRadius: 20,
                overflow: 'hidden',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid var(--border)',
                transition: 'all 0.3s ease',
              }}
            >
              {/* Photo thumbnail */}
              <div style={{ position: 'relative', height: 180, overflow: 'hidden' }}>
                <img
                  src={img}
                  alt={title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.6)' }}
                />
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to top, rgba(16,8,16,0.9) 0%, transparent 60%)',
                }} />
                {/* Step number badge */}
                <div className="step-num" style={{
                  position: 'absolute', top: 16, left: 16,
                }}>
                  {num}
                </div>
                {/* Icon badge */}
                <div style={{
                  position: 'absolute', bottom: 16, right: 16,
                  width: 40, height: 40,
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.15)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Icon size={18} color="var(--rose-light)" />
                </div>
              </div>

              {/* Content */}
              <div style={{ padding: '24px 20px' }}>
                <h3 className="font-serif" style={{
                  fontSize: '1.4rem',
                  fontWeight: 700,
                  color: 'var(--text-white)',
                  marginBottom: 10,
                }}>
                  {title}
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
                  {desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
