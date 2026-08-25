import React, { useState, useEffect } from 'react';
import { Heart, Mail } from 'lucide-react';

export default function Navbar({ onOpenLetter }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 100,
        padding: '14px 24px',
        transition: 'all 0.4s ease',
        background: scrolled
          ? 'rgba(16,8,16,0.85)'
          : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(232,117,138,0.15)' : 'none',
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
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
            fontSize: '1.25rem',
            color: 'var(--text-white)',
            fontWeight: 600,
          }}>
            LoveLetter
          </span>
        </div>

        {/* CTA only */}
        <button className="btn-rose" onClick={onOpenLetter} style={{ padding: '10px 22px', fontSize: '0.82rem' }}>
          <Mail size={14} />
          View My Letter
        </button>
      </div>

      {/* Mobile collapsed nav — simplified */}
      <style>{`
        @media (max-width: 640px) {
          nav .container > div:nth-child(2) > button:not(.btn-rose) {
            display: none;
          }
        }
      `}</style>
    </nav>
  );
}
