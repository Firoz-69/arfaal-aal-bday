import React, { useState } from 'react';
import { Sparkles, Heart, Smile, Coffee, Star, Sun, Music, Gift, Crown, Award } from 'lucide-react';

const REASONS = [
  { id: 1, icon: Smile,  title: 'Your Warm Laugh',     back: 'Your laughter is the kind that\'s completely contagious and instantly brightens any room.' },
  { id: 2, icon: Heart,  title: 'Your Huge Heart',     back: 'You treat everyone around you with such genuine kindness and grace.' },
  { id: 3, icon: Coffee, title: 'Long Conversations',  back: 'How we can talk for hours about everything and absolutely nothing at the same time.' },
  { id: 4, icon: Star,   title: 'Unstoppable Spirit',  back: 'The passion you pour into everything you set your mind to is truly inspiring.' },
  { id: 5, icon: Sun,    title: 'You Bring Sunshine',  back: 'You have a rare gift for making the most ordinary moments feel magical.' },
  { id: 6, icon: Music,  title: 'Incredible Vibes',    back: 'From amazing playlist picks to late-night car karaoke sessions — always 10/10.' },
  { id: 7, icon: Gift,   title: 'Your Thoughtfulness', back: 'You always remember the tiny details and have a way of making people feel deeply valued.' },
  { id: 8, icon: Crown,  title: 'Simply Legendary',    back: 'You stay authentically yourself and inspire everyone around you to do the same.' },
  { id: 9, icon: Sparkles, title: 'Best Cheerleader',  back: 'Always showing up with unwavering love and support whenever it matters most.' },
  { id: 10, icon: Award, title: 'Because You\'re YOU', back: 'There is nobody in the world like you. Truly, genuinely irreplaceable. 💗' },
];

export default function FlipCardsSection({ name }) {
  const [flipped, setFlipped] = useState({});

  const toggle = (id) => setFlipped(prev => ({ ...prev, [id]: !prev[id] }));

  return (
    <section className="px-5 pb-14" style={{ background: 'linear-gradient(180deg, transparent, rgba(255,214,224,0.15), transparent)' }}>
      {/* Header */}
      <div className="text-center mb-8">
        <div className="section-badge mx-auto">
          <Sparkles size={12} />
          <span>Birthday Appreciation</span>
        </div>
        <h2 className="section-title text-2xl mb-1">
          10 Reasons {name || 'Sophia'} Is Amazing 💌
        </h2>
        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
          Tap each card to reveal a special message!
        </p>
      </div>

      {/* 2-column flip card grid */}
      <div className="grid grid-cols-2 gap-4">
        {REASONS.map((r) => {
          const Icon = r.icon;
          const isFlipped = !!flipped[r.id];
          return (
            <div
              key={r.id}
              className="flip-wrap"
              style={{ height: '148px' }}
              onClick={() => toggle(r.id)}
            >
              <div className={`flip-inner ${isFlipped ? 'flipped' : ''}`}>
                {/* Front */}
                <div className="flip-face glass-card flex flex-col items-center justify-between p-4" style={{ height: '148px' }}>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full"
                    style={{ background: 'var(--rose-light)', color: 'var(--rose)' }}>
                    #{String(r.id).padStart(2, '0')}
                  </span>

                  <div className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ background: 'var(--rose-light)', color: 'var(--rose)' }}>
                    <Icon size={20} />
                  </div>

                  <div className="text-center">
                    <p className="text-xs font-bold" style={{ color: 'var(--wine)' }}>{r.title}</p>
                    <p className="text-[10px] mt-0.5" style={{ color: 'var(--text-muted)' }}>Tap ✨</p>
                  </div>
                </div>

                {/* Back */}
                <div className="flip-face flip-back flex flex-col items-center justify-center p-4 text-center"
                  style={{
                    background: 'linear-gradient(135deg, var(--rose) 0%, var(--rose-dark) 100%)',
                    height: '148px',
                    borderRadius: '18px',
                    border: '2px solid rgba(255,255,255,0.2)',
                  }}>
                  <Heart size={16} className="fill-current text-white/70 mb-2" />
                  <p className="font-script text-base text-white leading-snug">"{r.back}"</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
