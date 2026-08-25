import React, { useState, useEffect } from 'react';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className={`lv2-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="lv2-header-inner">
        {/* Logo */}
        <div className="lv2-logo">
          2<span>luv</span>
        </div>

        {/* Nav */}
        <nav className="lv2-nav">
          <button onClick={() => scrollTo('whatis')}>About</button>
          <button onClick={() => scrollTo('howitworks')}>How It Works</button>
          <button onClick={() => scrollTo('pricing')}>Pricing</button>
          <button onClick={() => scrollTo('faq')}>FAQ</button>
        </nav>

        {/* CTA */}
        <button
          className="btn-primary"
          style={{ fontSize: '0.875rem', padding: '10px 22px' }}
          onClick={() => scrollTo('hero')}
        >
          Create Letter
        </button>
      </div>
    </header>
  );
}
