import React, { useEffect, useRef } from 'react';

/*
  Three rows of photos that scroll continuously in alternating directions,
  with a bold headline overlay in the center — inspired by 2-luv.com.
  Pure CSS infinite marquee: each row duplicates its images so the loop
  is seamless, with no JavaScript scrolling needed.
*/

const ROW1 = [
  'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=420&h=220&q=70',
  'https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?auto=format&fit=crop&w=420&h=220&q=70',
  'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=420&h=220&q=70',
  'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=420&h=220&q=70',
  'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=420&h=220&q=70',
  'https://images.unsplash.com/photo-1502635385003-ee1e6a1a742d?auto=format&fit=crop&w=420&h=220&q=70',
];

const ROW2 = [
  'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=420&h=220&q=70',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=420&h=220&q=70',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=420&h=220&q=70',
  'https://images.unsplash.com/photo-1521119989659-a83eee488004?auto=format&fit=crop&w=420&h=220&q=70',
  'https://images.unsplash.com/photo-1535931737580-a99567967ddc?auto=format&fit=crop&w=420&h=220&q=70',
  'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=420&h=220&q=70',
];

const ROW3 = [
  'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=420&h=220&q=70',
  'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=420&h=220&q=70',
  'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=420&h=220&q=70',
  'https://images.unsplash.com/photo-1543589965-99bfb7218e3c?auto=format&fit=crop&w=420&h=220&q=70',
  'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=420&h=220&q=70',
  'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=420&h=220&q=70',
];

function MarqueeRow({ images, reverse = false, speed = 38 }) {
  // Duplicate array for seamless infinite scroll
  const doubled = [...images, ...images];
  const totalItems = images.length;
  // Each image is 280px wide + 8px gap = 288px per item
  const itemW = 288;
  const totalW = totalItems * itemW;

  return (
    <div
      style={{
        overflow: 'hidden',
        width: '100%',
        maskImage: 'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)',
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: 8,
          width: 'max-content',
          animation: `marquee${reverse ? 'Reverse' : ''} ${speed}s linear infinite`,
          willChange: 'transform',
        }}
      >
        {doubled.map((src, i) => (
          <div
            key={i}
            style={{
              width: 280,
              height: 190,
              borderRadius: 14,
              overflow: 'hidden',
              flexShrink: 0,
              background: '#1a0e18',
            }}
          >
            <img
              src={src}
              alt=""
              loading="lazy"
              draggable={false}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
                filter: 'brightness(0.65)',
                transition: 'filter 0.3s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.filter = 'brightness(0.85)'; }}
              onMouseLeave={e => { e.currentTarget.style.filter = 'brightness(0.65)'; }}
            />
          </div>
        ))}
      </div>

      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-${totalW + (totalItems - 1) * 8}px); }
        }
        @keyframes marqueeReverse {
          0%   { transform: translateX(-${totalW + (totalItems - 1) * 8}px); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}

export default function InfinitePhotoMarquee() {
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) ref.current?.classList.add('visible'); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="about-section"
      style={{
        position: 'relative',
        background: 'var(--bg-dark)',
        overflow: 'hidden',
        padding: '0',
      }}
    >
      {/* Rows container */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: '0' }}>
        <MarqueeRow images={ROW1} reverse={false} speed={40} />
        <MarqueeRow images={ROW2} reverse={true}  speed={36} />
        <MarqueeRow images={ROW3} reverse={false} speed={44} />
      </div>

      {/* Dark gradient overlay — top & bottom fade to page bg */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to bottom, rgba(16,8,16,0.55) 0%, rgba(16,8,16,0.18) 25%, rgba(16,8,16,0.18) 75%, rgba(16,8,16,0.55) 100%)',
        pointerEvents: 'none',
      }} />

      {/* Centered headline overlay */}
      <div
        ref={ref}
        className="reveal"
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '0 20px',
          pointerEvents: 'none',
        }}
      >
        {/* Pill badge */}
        <div
          className="pill-badge reveal delay-100"
          style={{
            marginBottom: 16,
            pointerEvents: 'all',
            background: 'rgba(30,16,26,0.75)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
          }}
        >
          ✦ A Love Letter
        </div>

        {/* Main headline */}
        <h2
          className="font-serif reveal delay-200"
          style={{
            fontSize: 'clamp(2.2rem, 6vw, 5rem)',
            fontWeight: 700,
            color: '#ffffff',
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
            textShadow: '0 2px 24px rgba(0,0,0,0.6)',
            maxWidth: 700,
          }}
        >
          It has never been{' '}
          <br className="hidden-mobile" />
          so{' '}
          <em
            style={{
              fontStyle: 'italic',
              color: 'var(--rose)',
              position: 'relative',
              display: 'inline-block',
            }}
          >
            beautiful.
            {/* Hand-drawn squiggle underline */}
            <svg
              viewBox="0 0 240 14"
              style={{
                position: 'absolute',
                bottom: -6,
                left: 0,
                width: '100%',
                height: 14,
                overflow: 'visible',
              }}
              fill="none"
            >
              <path
                d="M4 10 C40 2, 70 13, 110 7 C150 1, 175 11, 200 6 C215 3, 230 9, 236 8"
                stroke="var(--rose)"
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
                opacity="0.9"
              />
            </svg>
          </em>
        </h2>
      </div>
    </section>
  );
}
