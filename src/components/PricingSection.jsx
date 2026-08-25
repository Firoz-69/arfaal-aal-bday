import React from 'react';

const FEATURES = [
  'Lifetime access — no expiration date',
  'All 16 interactive card types included',
  'Unlimited edits & customization anytime',
  'Exclusive QR Code for printing on gifts',
  'Background music integration (Spotify)',
  'Private & secure shareable link'
];

export default function PricingSection() {
  return (
    <section id="pricing" className="lv2-section" style={{ textAlign: 'center' }}>
      <p className="eyebrow">PRICING</p>
      <h2 className="section-heading">
        One simple price. <span className="italic serif">Lifetime access.</span>
      </h2>

      <div className="lv2-pricing-card">
        <span className="lv2-pricing-badge">LIFETIME DEAL</span>
        <div className="lv2-pricing-price">
          <sup>$</sup>2.99
        </div>
        <p className="lv2-pricing-note">One-time payment • No monthly fees or subscriptions</p>

        <ul className="lv2-pricing-features">
          {FEATURES.map((f, i) => (
            <li key={i}>{f}</li>
          ))}
        </ul>

        <button 
          className="btn-primary btn-pink" 
          style={{ width: '100%', justifyContent: 'center' }}
          onClick={() => alert('Redirecting to creator...')}
        >
          Create Your Birthday Letter
        </button>
      </div>
    </section>
  );
}
