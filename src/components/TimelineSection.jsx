import React from 'react';
import { MapPin, Star, Smile, Sparkles, Trophy, Heart } from 'lucide-react';

const DEFAULT_MILESTONES = [
  {
    emoji: '⭐',
    icon: Star,
    date: 'Aug 22',
    place: 'Home Sweet Home',
    title: 'The Day a Star Was Born 🌟',
    desc: 'The world gained a beautiful soul whose smile has been lighting up every room ever since.',
    img: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=600&q=80',
  },
  {
    emoji: '☕',
    icon: Smile,
    date: 'Spring',
    place: 'Corner Café',
    title: 'Late Nights & Endless Laughs ☕',
    desc: 'Spontaneous coffee dates, inside jokes, and talking until the café had to close.',
    img: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=600&q=80',
  },
  {
    emoji: '🌊',
    icon: Sparkles,
    date: 'Summer',
    place: 'Golden Coast',
    title: 'Chasing Sunsets at the Beach 🌊',
    desc: 'Barefoot on warm sand, collecting seashells, and watching the sun melt into the sea.',
    img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
  },
  {
    emoji: '🏆',
    icon: Trophy,
    date: 'Big Day',
    place: 'Celebration Night',
    title: 'Conquering New Heights 🏆',
    desc: 'Watching you achieve your biggest goals with grace, grit, and that unstoppable sparkle.',
    img: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=600&q=80',
  },
  {
    emoji: '🎉',
    icon: Heart,
    date: 'Today!',
    place: 'Right Here',
    title: 'Celebrating YOU — Today & Always 🎉',
    desc: 'To another incredible year of growth, joy, adventures, and making unforgettable memories.',
    img: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=600&q=80',
  },
];

export default function TimelineSection({ id }) {
  return (
    <section id={id} className="px-5 pb-14">

      {/* Section Header */}
      <div className="text-center mb-8">
        <div className="section-badge mx-auto">
          <Sparkles size={12} />
          <span>Memory Lane</span>
        </div>
        <h2 className="section-title text-2xl mb-1">Our Beautiful Journey 📖</h2>
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
          A stroll down precious chapters and milestones
        </p>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div className="timeline-line" />

        <div className="space-y-6 ml-[54px]">
          {DEFAULT_MILESTONES.map((item, i) => {
            const IconComp = item.icon;
            return (
              <div key={i} className="relative">
                {/* Dot — positioned outside the ml-[54px] wrapper */}
                <div className="timeline-dot absolute" style={{ left: '-38px', top: '16px' }}>
                  <IconComp size={16} />
                </div>

                {/* Card */}
                <div className="glass-card p-4 overflow-hidden">
                  {/* Date badge */}
                  <div className="text-[11px] font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5"
                    style={{ color: 'var(--rose)' }}>
                    <span>{item.emoji}</span>
                    <span>{item.date} · {item.place}</span>
                  </div>

                  {/* Thumbnail + text */}
                  <div className="flex gap-3 items-start">
                    <div className="w-20 h-16 rounded-xl overflow-hidden shrink-0 shadow-sm">
                      <img src={item.img} alt={item.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-heading text-base font-bold mb-1"
                        style={{ color: 'var(--wine)', lineHeight: 1.3 }}>
                        {item.title}
                      </h3>
                      <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
