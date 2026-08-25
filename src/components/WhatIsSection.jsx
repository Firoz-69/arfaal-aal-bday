import React, { useEffect, useRef } from 'react';

/* Reusable draw word with underline */
function DrawWord({ children, delay = '0.2s' }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('is-drawn'); observer.disconnect(); } },
      { threshold: 0.6 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return (
    <span className="draw-word" ref={ref} style={{ '--du-delay': delay }}>
      {children}
      <span className="draw-word-mark" aria-hidden="true">
        <svg viewBox="0 0 310 41" fill="none" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 29.9C52.3 26.9 99.4 21.7 146.5 17.2C151.8 16.7 157.1 15.9 162.4 15.7C163.3 15.6 165.1 15.4 164.4 16.4C161.7 20.4 157.1 23.8 153.9 27.5C153.2 28.4 148.2 33.5 150.7 34.7C153.6 36.1 163.6 32.6 165 32.2C178.5 28.4 191.5 23.6 204.9 19.5C231.9 11.3 259.3 5.8 288.8 5.1C294.1 5 299.7 4.8 305 5.5" stroke="currentColor" strokeWidth="10" strokeLinecap="round" fill="none"/>
        </svg>
      </span>
    </span>
  );
}

export default function WhatIsSection() {
  return (
    <section id="whatis" className="lv2-section lv2-what">
      <p className="eyebrow">ABOUT 2LUV</p>
      <h2 className="section-heading">
        The most beautiful way to say{' '}
        <DrawWord delay="0.2s">I love you</DrawWord>
      </h2>

      <div className="lv2-feature-row">
        <article className="lv2-feature">
          <div className="lv2-feature-icon">💌</div>
          <p>Every letter is unique — your words, photos, and music combined in one beautiful experience.</p>
        </article>
        <article className="lv2-feature">
          <div className="lv2-feature-icon">📲</div>
          <p>Share instantly via link or print a QR code anywhere in the world — no app needed.</p>
        </article>
        <article className="lv2-feature">
          <div className="lv2-feature-icon">✨</div>
          <p>16 exclusive interactive card types — countdown, timeline, gallery, quiz, star map and more.</p>
        </article>
      </div>
    </section>
  );
}
