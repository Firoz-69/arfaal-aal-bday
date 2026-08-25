import React from 'react';
import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer
      style={{
        background: 'var(--bg-dark)',
        borderTop: '1px solid rgba(232,117,138,0.15)',
        padding: '52px 24px 36px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Faint glow */}
      <div style={{
        position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
        width: 400, height: 150,
        background: 'radial-gradient(ellipse, rgba(232,117,138,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative', maxWidth: 480, margin: '0 auto' }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, justifyContent: 'center', marginBottom: 8 }}>
          <div style={{
            width: 36, height: 36, borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--rose) 0%, var(--rose-dark) 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 16px var(--rose-glow)',
          }}>
            <Heart size={16} fill="white" color="white" />
          </div>
          <span style={{
            fontFamily: 'var(--font-script)',
            fontSize: '1.35rem',
            color: 'var(--text-white)',
            fontWeight: 600,
          }}>
            LoveLetter
          </span>
        </div>

        {/* Tagline */}
        <p style={{
          fontFamily: 'var(--font-script)',
          fontSize: '1rem',
          color: 'var(--rose-light)',
          marginBottom: 20,
          opacity: 0.8,
        }}>
          Made with love, just for you 🌹
        </p>

        {/* Divider */}
        <div style={{
          width: 60, height: 1,
          background: 'linear-gradient(to right, transparent, var(--rose), transparent)',
          margin: '0 auto 20px',
        }} />

        {/* Credit */}
        <p style={{
          fontSize: '0.75rem',
          color: 'var(--text-faint)',
        }}>
          Crafted with{' '}
          <Heart size={10} fill="var(--rose)" color="var(--rose)" style={{ display: 'inline', marginBottom: -1 }} />
          {' '}by{' '}
          <span style={{ color: 'var(--rose)', fontWeight: 500 }}>Arfaan</span>
        </p>

        <p style={{ fontSize: '0.68rem', color: 'var(--text-faint)', marginTop: 6 }}>
          Because some moments deserve to last forever.
        </p>
      </div>
    </footer>
  );
}
