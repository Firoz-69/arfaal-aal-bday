import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react';

const PHOTOS = [
  {
    src: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=800&q=75',
    caption: 'That golden afternoon we never wanted to end.',
  },
  {
    src: 'https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?auto=format&fit=crop&w=800&q=75',
    caption: 'Laughing until it hurt, for reasons neither of us can remember.',
  },
  {
    src: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=800&q=75',
    caption: 'Still my favourite view — whenever you are in it.',
  },
  {
    src: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=800&q=75',
    caption: 'The moment I knew this was something real.',
  },
  {
    src: 'https://images.unsplash.com/photo-1502635385003-ee1e6a1a742d?auto=format&fit=crop&w=800&q=75',
    caption: 'Every photo with you looks like a dream.',
  },
  {
    src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=75',
    caption: 'You, effortlessly beautiful, always.',
  },
];

export default function PhotoGallerySection() {
  const [current, setCurrent] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [dragDelta, setDragDelta] = useState(0);
  const trackRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) sectionRef.current?.classList.add('visible'); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const prev = useCallback(() => setCurrent(c => (c - 1 + PHOTOS.length) % PHOTOS.length), []);
  const next = useCallback(() => setCurrent(c => (c + 1) % PHOTOS.length), []);

  // Keyboard nav
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [prev, next]);

  // Touch / mouse drag
  const onDragStart = (e) => {
    setDragging(true);
    setStartX(e.touches ? e.touches[0].clientX : e.clientX);
    setDragDelta(0);
  };
  const onDragMove = (e) => {
    if (!dragging) return;
    const x = e.touches ? e.touches[0].clientX : e.clientX;
    setDragDelta(x - startX);
  };
  const onDragEnd = () => {
    if (dragDelta < -60) next();
    else if (dragDelta > 60) prev();
    setDragging(false);
    setDragDelta(0);
  };

  return (
    <section
      className="section-pad"
      style={{ background: 'linear-gradient(180deg, var(--bg-mid) 0%, var(--bg-warm) 100%)', overflow: 'hidden' }}
    >
      <div ref={sectionRef} className="reveal container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 44 }}>
          <div className="pill-badge" style={{ marginBottom: 16 }}>📸 Gallery</div>
          <h2 className="font-serif" style={{
            fontSize: 'clamp(1.8rem, 4vw, 3rem)',
            fontWeight: 700,
            color: 'var(--text-white)',
          }}>
            Moments I{' '}
            <em style={{ color: 'var(--rose)', fontStyle: 'italic' }}>never want to forget</em>
          </h2>
        </div>

        {/* Carousel */}
        <div
          ref={trackRef}
          style={{ position: 'relative', userSelect: 'none', touchAction: 'pan-y' }}
          onMouseDown={onDragStart}
          onMouseMove={onDragMove}
          onMouseUp={onDragEnd}
          onMouseLeave={onDragEnd}
          onTouchStart={onDragStart}
          onTouchMove={onDragMove}
          onTouchEnd={onDragEnd}
        >
          {/* Main photo */}
          <div style={{ position: 'relative', borderRadius: 24, overflow: 'hidden', maxWidth: 640, margin: '0 auto' }}>
            <img
              key={current}
              src={PHOTOS[current].src}
              alt={PHOTOS[current].caption}
              draggable={false}
              style={{
                width: '100%',
                height: 'clamp(260px, 45vw, 420px)',
                objectFit: 'cover',
                display: 'block',
                animation: 'fadeIn 0.5s ease',
                cursor: dragging ? 'grabbing' : 'grab',
                transform: dragging ? `translateX(${dragDelta * 0.1}px)` : 'none',
                transition: dragging ? 'none' : 'transform 0.3s ease',
              }}
            />
            {/* Gradient + caption */}
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0,
              background: 'linear-gradient(to top, rgba(10,4,14,0.92) 0%, transparent 100%)',
              padding: '40px 24px 24px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Heart size={14} fill="var(--rose)" color="var(--rose)" />
                <p className="font-script" style={{
                  color: 'var(--text-white)',
                  fontSize: '1rem',
                  lineHeight: 1.5,
                }}>
                  {PHOTOS[current].caption}
                </p>
              </div>
            </div>

            {/* Side arrow buttons */}
            <button
              onClick={prev}
              aria-label="Previous photo"
              style={{
                position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)',
                width: 40, height: 40,
                borderRadius: '50%',
                background: 'rgba(16,8,16,0.7)',
                backdropFilter: 'blur(10px)',
                border: '1px solid var(--border)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', color: '#fff',
                transition: 'all 0.2s',
              }}
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={next}
              aria-label="Next photo"
              style={{
                position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                width: 40, height: 40,
                borderRadius: '50%',
                background: 'rgba(16,8,16,0.7)',
                backdropFilter: 'blur(10px)',
                border: '1px solid var(--border)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', color: '#fff',
                transition: 'all 0.2s',
              }}
            >
              <ChevronRight size={18} />
            </button>
          </div>

          {/* Thumbnail strip */}
          <div style={{
            display: 'flex',
            gap: 10,
            justifyContent: 'center',
            marginTop: 20,
            overflowX: 'auto',
            paddingBottom: 4,
          }}>
            {PHOTOS.map((p, i) => (
              <button
                key={i}
                className="gallery-thumb"
                onClick={() => setCurrent(i)}
                aria-label={`Go to photo ${i + 1}`}
                style={{
                  padding: 0,
                  border: i === current ? '2px solid var(--rose)' : '2px solid transparent',
                  borderRadius: 10,
                  overflow: 'hidden',
                  cursor: 'pointer',
                  flexShrink: 0,
                  transition: 'all 0.2s',
                  opacity: i === current ? 1 : 0.5,
                }}
              >
                <img
                  src={p.src}
                  alt=""
                  style={{ width: 52, height: 40, objectFit: 'cover', display: 'block' }}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
