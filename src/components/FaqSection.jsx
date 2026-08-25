import React from 'react';

const FAQS = [
  {
    q: 'What is 2Luv?',
    a: '2Luv is a platform to create digital love letters and personalized interactive cards. You can surprise the one you love with messages, photos, music, and unique experiences — all in a shareable link.'
  },
  {
    q: 'What are Interactive Cards?',
    a: 'They are premium experiences you add to your letter — like countdown, timeline, star map, photo gallery, word search, quiz, and many more. There are 16 exclusive card types that turn your message into something unforgettable.'
  },
  {
    q: 'How much does it cost and how does payment work?',
    a: 'Interactive Cards cost $2.99 as a one-time payment. No monthly fee, no subscription. You pay once and get lifetime access, including all future updates.'
  },
  {
    q: 'How long does my link stay available?',
    a: 'Your Interactive Cards link stays available forever — lifetime access with no expiration date.'
  },
  {
    q: 'Can I edit my letter after creating it?',
    a: 'Yes! You can edit your letters and cards at any time through your personal edit panel.'
  },
  {
    q: 'Does the recipient need to sign up or download an app?',
    a: 'No! The recipient only needs to open the link. No app to download, no account to create, no login required.'
  },
  {
    q: 'Is my content private?',
    a: 'Yes. Your letters are private and can only be accessed by whoever has your link.'
  },
  {
    q: 'Can I share via QR Code?',
    a: 'Yes! You can generate an exclusive QR Code for your letter, perfect for printing on gifts or physical cards.'
  }
];

export default function FaqSection() {
  return (
    <section id="faq" className="lv2-section">
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <p className="eyebrow">FREQUENTLY ASKED QUESTIONS</p>
        <h2 className="section-heading">
          Got questions? <span className="italic serif">We've got answers.</span>
        </h2>
      </div>

      <div className="lv2-faq-list">
        {FAQS.map((faq, i) => (
          <details key={i} className="lv2-faq-item">
            <summary className="lv2-faq-summary">
              <span className="lv2-faq-question">{faq.q}</span>
              <span className="lv2-faq-icon">+</span>
            </summary>
            <div className="lv2-faq-panel">
              <p>{faq.a}</p>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
