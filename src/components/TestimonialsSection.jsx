import React from 'react';

const REVIEWS = [
  {
    author: 'Sarah M.',
    stars: '★★★★★',
    text: 'My boyfriend was genuinely moved to tears! He loved being able to listen to our song while scrolling through our photos and timeline.'
  },
  {
    author: 'David K.',
    stars: '★★★★★',
    text: 'I printed the QR code on a card and attached it to her birthday present. Opening the digital site was her favourite part of the night!'
  },
  {
    author: 'Emily & Mark',
    stars: '★★★★★',
    text: 'Super easy to set up. Took me 10 minutes and the outcome looked like a professionally designed website. 10/10 recommend.'
  }
];

export default function TestimonialsSection() {
  return (
    <section className="lv2-section" style={{ textAlign: 'center' }}>
      <p className="eyebrow">TESTIMONIALS</p>
      <h2 className="section-heading">
        Loved by thousands of <span className="italic serif">couples & friends</span>
      </h2>

      <div className="lv2-testimonials-grid">
        {REVIEWS.map((r, i) => (
          <div className="lv2-testimonial-card" key={i}>
            <div className="lv2-testimonial-stars">{r.stars}</div>
            <p className="lv2-testimonial-text">"{r.text}"</p>
            <span className="lv2-testimonial-author">— {r.author}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
