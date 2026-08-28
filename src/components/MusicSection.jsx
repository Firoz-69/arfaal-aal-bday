import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Music, Heart, SkipBack, SkipForward } from 'lucide-react';

export default function MusicSection() {
  const [playing, setPlaying] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) ref.current?.classList.add('visible'); },
      { threshold: 0.2 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      className="section-pad"
      style={{
        background: 'linear-gradient(180deg, var(--bg-warm) 0%, var(--bg-dark) 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Large decorative music note */}
      <div style={{
        position: 'absolute', top: '10%', right: '-5%',
        fontSize: '18rem',
        opacity: 0.03,
        color: 'var(--rose)',
        userSelect: 'none',
        pointerEvents: 'none',
      }}>
        ♪
      </div>

      <div className="container" style={{ maxWidth: 720 }}>
        <div ref={ref} className="reveal">
          <div style={{ textAlign: 'center', marginBottom: 44 }}>
            <div className="pill-badge" style={{ marginBottom: 16 }}>🎵 Our Song</div>
            <h2 className="font-serif" style={{
              fontSize: 'clamp(1.8rem, 4vw, 3rem)',
              fontWeight: 700,
              color: 'var(--text-white)',
              marginBottom: 10,
            }}>
              The soundtrack to{' '}
              <em style={{ color: 'var(--rose)', fontStyle: 'italic' }}>everything we are</em>
            </h2>
          </div>

          {/* Player card */}
          <div
            className="glass music-card"
            style={{
              borderRadius: 28,
              padding: 32,
              background: 'rgba(255,255,255,0.06)',
              maxWidth: 480,
              margin: '0 auto',
              textAlign: 'center',
            }}
          >
            {/* Album art */}
            <div style={{ position: 'relative', display: 'inline-block', marginBottom: 28 }}>
              {/* Spinning vinyl ring */}
              <div
                className={playing ? 'spin-slow' : ''}
                style={{
                  position: 'absolute',
                  inset: -12,
                  borderRadius: '50%',
                  background: 'conic-gradient(from 0deg, var(--rose) 0deg 60deg, rgba(232,117,138,0.2) 60deg 180deg, var(--rose-dark) 180deg 240deg, rgba(232,117,138,0.15) 240deg 360deg)',
                  opacity: 0.4,
                  filter: 'blur(4px)',
                }}
              />
              <div className="music-album" style={{
                width: 160, height: 160,
                borderRadius: '50%',
                overflow: 'hidden',
                border: '4px solid rgba(255,255,255,0.12)',
                position: 'relative',
                boxShadow: playing ? '0 0 40px rgba(232,117,138,0.4)' : '0 8px 32px rgba(0,0,0,0.4)',
                transition: 'box-shadow 0.4s ease',
              }}>
                <img
                  src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=400&q=75"
                  alt="Album art"
                  style={{
                    width: '100%', height: '100%',
                    objectFit: 'cover',
                    filter: playing ? 'brightness(0.9)' : 'brightness(0.7)',
                    animation: playing ? 'spin 12s linear infinite' : 'none',
                    transition: 'filter 0.4s',
                  }}
                />
                {/* Center hole */}
                <div style={{
                  position: 'absolute',
                  top: '50%', left: '50%',
                  transform: 'translate(-50%,-50%)',
                  width: 24, height: 24,
                  borderRadius: '50%',
                  background: 'var(--bg-dark)',
                  border: '2px solid rgba(255,255,255,0.1)',
                }} />
              </div>
            </div>

            {/* Song info */}
            <h3 className="font-serif" style={{
              fontSize: '1.5rem',
              fontWeight: 700,
              color: 'var(--text-white)',
              marginBottom: 4,
            }}>
              Perfect
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: 4 }}>Ed Sheeran</p>
            <p className="font-script" style={{
              color: 'var(--rose-light)',
              fontSize: '0.95rem',
              marginBottom: 28,
            }}>
              " This one plays when I think of you. "
            </p>

            {/* EQ bars (when playing) */}
            {playing && (
              <div style={{ display: 'flex', gap: 4, justifyContent: 'center', marginBottom: 20 }}>
                {[1, 2, 3, 4, 5].map(i => (
                  <div key={i} className="eq-bar" />
                ))}
              </div>
            )}

            {/* Progress bar (decorative) */}
            <div style={{ marginBottom: 20 }}>
              <div style={{
                height: 4,
                background: 'rgba(255,255,255,0.1)',
                borderRadius: 99,
                overflow: 'hidden',
              }}>
                <div style={{
                  height: '100%',
                  width: playing ? '42%' : '28%',
                  background: 'linear-gradient(to right, var(--rose), var(--gold))',
                  borderRadius: 99,
                  transition: 'width 1s ease',
                }} />
              </div>
              <div style={{
                display: 'flex', justifyContent: 'space-between',
                color: 'var(--text-faint)',
                fontSize: '0.72rem',
                marginTop: 6,
              }}>
                <span>1:24</span><span>4:23</span>
              </div>
            </div>

            {/* Controls */}
            <div className="music-controls" style={{ display: 'flex', gap: 20, justifyContent: 'center', alignItems: 'center' }}>
              <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
                <SkipBack size={20} />
              </button>
              <button
                onClick={() => setPlaying(p => !p)}
                aria-label={playing ? 'Pause' : 'Play'}
                className="music-play-btn"
                style={{
                  width: 60, height: 60,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--rose) 0%, var(--rose-dark) 100%)',
                  border: 'none',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 8px 28px rgba(232,117,138,0.5)',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  color: '#fff',
                }}
              >
                {playing ? <Pause size={24} fill="white" /> : <Play size={24} fill="white" style={{ marginLeft: 3 }} />}
              </button>
              <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
                <SkipForward size={20} />
              </button>
            </div>

            {/* Dedication line */}
            <div style={{
              marginTop: 24,
              padding: '12px 16px',
              borderRadius: 12,
              background: 'rgba(232,117,138,0.08)',
              border: '1px solid var(--border)',
              display: 'flex',
              gap: 10,
              alignItems: 'center',
            }}>
              <Heart size={14} fill="var(--rose)" color="var(--rose)" />
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', textAlign: 'left', fontStyle: 'italic' }}>
                Dedicated to you — the reason this song finally means something.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
