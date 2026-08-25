import React, { useState } from 'react';
import { Camera, Heart, X, MessageCircle } from 'lucide-react';

const PHOTOS = [
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=700&q=80',
    caption: 'Birthday cake & endless wishes 🎂',
    date: 'Aug 22',
    rotate: '-3deg',
    likes: 42,
    comments: ['Best birthday vibes! 🎉', 'You look absolutely stunning ❤️'],
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=700&q=80',
    caption: 'Golden hour glow 🌅',
    date: 'Summer',
    rotate: '2.5deg',
    likes: 38,
    comments: ['Golden hour perfection ✨', 'So pretty!!'],
  },
  {
    id: 3,
    url: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=700&q=80',
    caption: 'Surprise party magic 🎉',
    date: 'Party Night',
    rotate: '-2deg',
    likes: 55,
    comments: ['Your reaction was priceless!', 'Loved this night so much 🎊'],
  },
  {
    id: 4,
    url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=700&q=80',
    caption: 'Cozy books & coffee ☕',
    date: 'Rainy Sunday',
    rotate: '3.5deg',
    likes: 29,
    comments: ['Ultimate cozy aesthetic 📚', 'Favourite person ever ❤️'],
  },
  {
    id: 5,
    url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=700&q=80',
    caption: 'Confetti & balloons 🎈',
    date: 'Celebration',
    rotate: '-3.5deg',
    likes: 61,
    comments: ['Party queen! 👑', 'Wishing you the happiest year!'],
  },
  {
    id: 6,
    url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=700&q=80',
    caption: 'Late night songs & vibes 🎶',
    date: 'Music Night',
    rotate: '2deg',
    likes: 33,
    comments: ['Such a vibe ✨', 'Love this so much!'],
  },
];

export default function GallerySection() {
  const [selected, setSelected] = useState(null);
  const [likes, setLikes] = useState(() => Object.fromEntries(PHOTOS.map(p => [p.id, p.likes])));

  const like = (id, e) => {
    e?.stopPropagation();
    setLikes(prev => ({ ...prev, [id]: prev[id] + 1 }));
  };

  return (
    <section className="px-5 pb-14">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="section-badge mx-auto">
          <Camera size={12} />
          <span>Polaroid Wall</span>
        </div>
        <h2 className="section-title text-2xl mb-1">Snapshot Memories 📸</h2>
        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
          Tap any polaroid to expand and leave a heart!
        </p>
      </div>

      {/* 2-column polaroid grid */}
      <div className="grid grid-cols-2 gap-8">
        {PHOTOS.map((p) => (
          <div
            key={p.id}
            className="polaroid"
            style={{ transform: `rotate(${p.rotate})` }}
            onClick={() => setSelected(p)}
          >
            <div className="washi" />
            {/* Photo */}
            <div className="aspect-square w-full overflow-hidden rounded-sm bg-pink-50 mb-2">
              <img src={p.url} alt={p.caption}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
            </div>
            {/* Caption row */}
            <div className="flex items-center justify-between px-0.5">
              <p className="font-script text-sm truncate" style={{ color: 'var(--wine)' }}>
                {p.caption}
              </p>
              <button
                onClick={(e) => like(p.id, e)}
                className="flex items-center gap-0.5 text-xs font-bold shrink-0 hover:scale-110 transition-transform"
                style={{ color: 'var(--rose)' }}
              >
                <Heart size={13} className="fill-current" />
                <span>{likes[p.id]}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selected && (
        <div className="modal-overlay" onClick={() => setSelected(null)}>
          <div className="modal-box p-5" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--rose)' }}>
                  {selected.date}
                </div>
                <h3 className="font-heading text-lg font-bold" style={{ color: 'var(--wine)' }}>
                  {selected.caption}
                </h3>
              </div>
              <button onClick={() => setSelected(null)} className="p-2 rounded-full hover:bg-pink-50 transition-colors" style={{ color: 'var(--wine)' }}>
                <X size={20} />
              </button>
            </div>

            <div className="aspect-video w-full rounded-2xl overflow-hidden mb-4 shadow">
              <img src={selected.url} alt={selected.caption} className="w-full h-full object-cover" />
            </div>

            {/* Like + comments */}
            <div className="flex items-center gap-3 mb-4">
              <button
                onClick={() => like(selected.id)}
                className="btn-primary py-2 px-5 text-xs"
              >
                <Heart size={14} className="fill-current" />
                <span>{likes[selected.id]} Hearts</span>
              </button>
            </div>

            {selected.comments?.length > 0 && (
              <div className="rounded-xl p-3 space-y-2" style={{ background: 'var(--rose-light)', opacity: 0.9 }}>
                <div className="flex items-center gap-1 text-xs font-bold" style={{ color: 'var(--wine)' }}>
                  <MessageCircle size={13} />
                  <span>Comments</span>
                </div>
                {selected.comments.map((c, i) => (
                  <p key={i} className="text-xs px-2 py-1.5 rounded-lg" style={{ background: 'white', color: 'var(--text-muted)' }}>
                    "{c}"
                  </p>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
