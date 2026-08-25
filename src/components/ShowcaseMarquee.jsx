import React from 'react';

/* Showcase images — using real Unsplash photos that look like card previews */
const ROW1 = [
  'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=640&q=70',
  'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=640&q=70',
  'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=640&q=70',
  'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=640&q=70',
  'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=640&q=70',
  'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=640&q=70',
];
const ROW2 = [
  'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=640&q=70',
  'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=640&q=70',
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=640&q=70',
  'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=640&q=70',
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=640&q=70',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=640&q=70',
];
const ROW3 = [
  'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=640&q=70',
  'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=640&q=70',
  'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=640&q=70',
  'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=640&q=70',
  'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=640&q=70',
  'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=640&q=70',
];

function Track({ images, reverse = false }) {
  // duplicate for seamless loop
  const all = [...images, ...images];
  return (
    <div className={`lv2-showcase-row${reverse ? ' reverse' : ''}`}>
      <div className="lv2-showcase-track">
        {all.map((src, i) => (
          <figure key={i}>
            <img src={src} alt="" loading="lazy" decoding="async" />
          </figure>
        ))}
      </div>
    </div>
  );
}

export default function ShowcaseMarquee() {
  return (
    <section className="lv2-showcase">
      <div className="lv2-showcase-copy">
        <p>2Luv Cards</p>
        <h2>
          It has never been so{' '}
          <span style={{ fontFamily: 'Lora, serif', fontStyle: 'italic' }}>easy.</span>
        </h2>
      </div>
      <div className="lv2-showcase-rows">
        <Track images={ROW1} />
        <Track images={ROW2} reverse />
        <Track images={ROW3} />
      </div>
    </section>
  );
}
