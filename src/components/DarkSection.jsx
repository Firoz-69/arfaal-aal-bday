import React from 'react';

export default function DarkSection() {
  return (
    <section id="free-letter" className="lv2-dark-section">
      <p className="eyebrow">UNLOCK YOUR LETTER</p>
      <h2 className="section-heading">
        Create the cover first — <span className="italic serif">unlock the full Letter</span>
      </h2>
      <p>
        Preview it before checkout. Pay once to read ad-free with lifetime access.
      </p>
      <button 
        className="btn-primary btn-pink"
        onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
      >
        Start Creating Now
      </button>
    </section>
  );
}
