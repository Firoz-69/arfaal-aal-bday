import React from 'react';

const CARDS = [
  { icon: '⏱️', name: 'Countdown' },
  { icon: '📖', name: 'Timeline' },
  { icon: '🌟', name: 'Star Map' },
  { icon: '📸', name: 'Photo Gallery' },
  { icon: '🤔', name: 'Quiz' },
  { icon: '🔤', name: 'Word Search' },
  { icon: '🌠', name: 'Wish List' },
  { icon: '🃏', name: 'Flip Cards' },
  { icon: '💌', name: 'Love Letter' },
  { icon: '🎶', name: 'Music Player' },
  { icon: '🎥', name: 'Video Reel' },
  { icon: '📍', name: 'Memory Map' },
  { icon: '❓', name: 'Q&A' },
  { icon: '🧠', name: 'Memory Game' },
  { icon: '💓', name: 'Love Meter' },
  { icon: '🔳', name: 'QR Code' }
];

export default function CardsShowcaseSection() {
  return (
    <section className="lv2-section" style={{ textAlign: 'center' }}>
      <p className="eyebrow">INTERACTIVE CARDS</p>
      <h2 className="section-heading">
        16 ways to make your message <span className="italic serif">special</span>
      </h2>
      
      <div className="lv2-cards-grid">
        {CARDS.map((card, idx) => (
          <div key={idx} className="lv2-card-tile">
            <span className="lv2-card-tile-icon">{card.icon}</span>
            <span className="lv2-card-tile-name">{card.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
