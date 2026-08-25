import React, { useEffect, useRef } from 'react';
import { Heart, MapPin, Plane, Star, Coffee, Camera } from 'lucide-react';

const MILESTONES = [
  {
    date: 'Feb 14, 2023',
    title: 'The First Date',
    caption: 'A coffee that turned into a five-hour conversation. I knew right then.',
    icon: Coffee,
    img: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=400&q=70',
    accent: '#e8758a',
  },
  {
    date: 'Apr 02, 2023',
    title: 'First "I Love You"',
    caption: 'You said it first. I had been holding it in for weeks, terrified. You made it easy.',
    icon: Heart,
    img: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=400&q=70',
    accent: '#c9a566',
  },
  {
    date: 'Jun 18, 2023',
    title: 'Our First Adventure',
    caption: 'We got lost three times and somehow found the most beautiful place.',
    icon: MapPin,
    img: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=400&q=70',
    accent: '#9b72cf',
  },
  {
    date: 'Aug 30, 2023',
    title: 'First Trip Together',
    caption: "Watching the sunset from that rooftop, I couldn't imagine being anywhere else.",
    icon: Plane,
    img: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=400&q=70',
    accent: '#e8758a',
  },
  {
    date: 'Dec 25, 2023',
    title: 'Christmas Magic',
    caption: 'Fairy lights, hot cocoa, and the best company in the world.',
    icon: Star,
    img: 'https://images.unsplash.com/photo-1543589965-99bfb7218e3c?auto=format&fit=crop&w=400&q=70',
    accent: '#c9a566',
  },
  {
    date: 'Today',
    title: 'Your Birthday 🎂',
    caption: 'Another year around the sun, and I get to celebrate you. Lucky me.',
    icon: Camera,
    img: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=400&q=70',
    accent: '#e8758a',
  },
];

export default function MemoryTimelineSection() {
  const itemRefs = useRef([]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.2 }
    );
    itemRefs.current.forEach(r => r && obs.observe(r));
    return () => obs.disconnect();
  }, []);

  return (
    <section
      className="section-pad"
      style={{ background: 'linear-gradient(180deg, var(--bg-dark) 0%, var(--bg-mid) 100%)' }}
    >
      <div className="container" style={{ maxWidth: 760 }}>
        {/* Header */}
        <div
          ref={el => itemRefs.current[0] = el}
          className="reveal"
          style={{ textAlign: 'center', marginBottom: 56 }}
        >
          <div className="pill-badge" style={{ marginBottom: 16 }}>📖 Our Story</div>
          <h2 className="font-serif" style={{
            fontSize: 'clamp(1.8rem, 4vw, 3rem)',
            fontWeight: 700,
            color: 'var(--text-white)',
            marginBottom: 12,
          }}>
            Milestones of{' '}
            <em style={{ color: 'var(--rose)', fontStyle: 'italic', position: 'relative', display: 'inline-block' }}>
              us
              <svg viewBox="0 0 40 12" style={{ position: 'absolute', bottom: -4, left: 0, width: '100%', height: 10 }} fill="none">
                <path d="M2 8 C10 2, 25 10, 38 5" stroke="var(--rose)" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </em>
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            The moments that made us — written in the margins of our shared story.
          </p>
        </div>

        {/* Timeline */}
        <div style={{ position: 'relative', paddingLeft: 56 }}>
          {/* Vertical line */}
          <div className="timeline-line" />

          <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
            {MILESTONES.map(({ date, title, caption, icon: Icon, img, accent }, i) => (
              <div
                key={i}
                ref={el => itemRefs.current[i + 1] = el}
                className={`reveal delay-${Math.min((i + 1) * 100, 600)}`}
                style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}
              >
                {/* Dot */}
                <div
                  className="timeline-dot"
                  style={{
                    position: 'absolute',
                    left: 0,
                    background: `linear-gradient(135deg, ${accent} 0%, ${accent}99 100%)`,
                  }}
                >
                  <Icon size={16} color="#fff" />
                </div>

                {/* Card */}
                <div
                  className="glass"
                  style={{
                    flex: 1,
                    borderRadius: 16,
                    overflow: 'hidden',
                    display: 'grid',
                    gridTemplateColumns: '1fr auto',
                  }}
                >
                  <div style={{ padding: '18px 20px' }}>
                    <div style={{
                      fontSize: '0.7rem',
                      color: `${accent}`,
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      marginBottom: 6,
                    }}>
                      {date}
                    </div>
                    <h3 className="font-serif" style={{
                      fontSize: '1.15rem',
                      fontWeight: 700,
                      color: 'var(--text-white)',
                      marginBottom: 6,
                    }}>
                      {title}
                    </h3>
                    <p style={{
                      fontFamily: 'var(--font-script)',
                      fontSize: '0.95rem',
                      color: 'var(--text-muted)',
                      lineHeight: 1.6,
                    }}>
                      {caption}
                    </p>
                  </div>
                  <img
                    src={img}
                    alt={title}
                    style={{
                      width: 90,
                      height: '100%',
                      objectFit: 'cover',
                      filter: 'brightness(0.7)',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
