import React, { useEffect } from 'react';
import { X, Heart, Sparkles } from 'lucide-react';

export default function LoveLetterModal({ isOpen, onClose, name = 'Sophia' }) {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(10,4,16,0.88)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 20,
        animation: 'fadeIn 0.3s ease',
      }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div style={{
        background: 'linear-gradient(145deg, var(--bg-deep) 0%, var(--bg-warm) 100%)',
        border: '1px solid var(--border-strong)',
        borderRadius: 28,
        maxWidth: 500,
        width: '100%',
        maxHeight: '90vh',
        overflowY: 'auto',
        boxShadow: '0 32px 80px rgba(0,0,0,0.6), 0 0 60px rgba(232,117,138,0.15)',
        animation: 'scaleIn 0.4s cubic-bezier(0.34,1.56,0.64,1)',
        position: 'relative',
      }}>
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close letter"
          style={{
            position: 'absolute', top: 16, right: 16,
            width: 36, height: 36, borderRadius: '50%',
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid var(--border)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', color: 'var(--text-muted)',
            transition: 'all 0.2s',
            zIndex: 2,
          }}
        >
          <X size={16} />
        </button>

        <div style={{ padding: '40px 36px' }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: 28 }}>
            <div style={{ marginBottom: 14 }}>
              <Heart size={40} fill="var(--rose)" color="var(--rose)" className="heartbeat-anim" style={{ margin: '0 auto' }} />
            </div>
            <div className="pill-badge" style={{ marginBottom: 14, justifyContent: 'center' }}>
              💌 Your Letter
            </div>
            <h2 className="font-serif" style={{
              fontSize: '2rem', fontWeight: 700,
              color: 'var(--text-white)', marginBottom: 6,
            }}>
              Happy Birthday, {name}! 🎂
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              This was written only for you.
            </p>
          </div>

          {/* Letter body */}
          <div style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid var(--border)',
            borderRadius: 18,
            padding: '28px 24px',
            position: 'relative',
            backgroundImage: 'repeating-linear-gradient(transparent 0px, transparent 27px, rgba(232,117,138,0.06) 27px, rgba(232,117,138,0.06) 28px)',
          }}>
            <p className="font-script" style={{
              fontSize: '1.15rem', lineHeight: 2,
              color: 'var(--text-muted)', marginBottom: 14,
            }}>
              My dearest {name},
            </p>
            <p className="font-script" style={{
              fontSize: '1.05rem', lineHeight: 2,
              color: 'var(--text-muted)', marginBottom: 14,
            }}>
              If I could put into words exactly what you mean to me, I would need a thousand pages and still fall short.
              So instead, I built you this — a small, digital corner of the universe that exists just for you.
            </p>
            <p className="font-script" style={{
              fontSize: '1.05rem', lineHeight: 2,
              color: 'var(--text-muted)', marginBottom: 14,
            }}>
              Every photo here is a memory I treasure. Every word is something I've felt but never quite said out loud.
              Every song is the one that plays when the world quiets down and all I can think of is you.
            </p>
            <p className="font-script" style={{
              fontSize: '1.05rem', lineHeight: 2,
              color: 'var(--text-muted)', marginBottom: 20,
            }}>
              On this birthday, I just want you to know — you are seen. You are adored. And I am so grateful
              that of all the people in all the world, I get to know you. 🌹
            </p>
            <div style={{ borderTop: '1px solid var(--border)', paddingTop: 16 }}>
              <p className="font-script" style={{
                fontSize: '1.4rem', color: 'var(--rose)', fontWeight: 600,
              }}>
                Forever yours ♡
              </p>
            </div>
          </div>

          {/* Close CTA */}
          <div style={{ textAlign: 'center', marginTop: 28 }}>
            <button className="btn-rose" onClick={onClose} style={{ width: '100%', justifyContent: 'center' }}>
              <Sparkles size={16} />
              Close & Keep Exploring
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
