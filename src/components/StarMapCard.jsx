import React, { useState } from 'react';
import { Sparkles, Moon, Star } from 'lucide-react';

export default function StarMapCard({ name, date = 'August 22, 2024' }) {
  const [constellation, setConstellation] = useState('Ursa Major');

  return (
    <section className="px-5 pb-12">
      <div className="glass-card p-6 text-center relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #180e29 0%, #2a153b 100%)', color: '#fff' }}>
        
        {/* Floating background stars */}
        <div className="absolute top-4 left-6 text-amber-200/40 text-xs animate-pulse">★</div>
        <div className="absolute top-12 right-10 text-pink-200/40 text-sm animate-pulse" style={{ animationDelay: '1s' }}>✨</div>
        <div className="absolute bottom-8 left-12 text-purple-200/40 text-xs animate-pulse" style={{ animationDelay: '0.5s' }}>✦</div>

        <div className="section-badge mx-auto mb-3" style={{ background: 'rgba(255,255,255,0.15)', color: '#ffd6e4' }}>
          <Sparkles size={12} />
          <span>Star Map</span>
        </div>

        <h2 className="font-heading text-2xl font-bold mb-1 text-pink-100">
          The Sky When We Met 🌌
        </h2>
        <p className="text-xs text-pink-200/80 mb-6">
          The exact stars & constellations aligned above us on {date}
        </p>

        {/* Interactive Night Sky Globe */}
        <div className="relative w-48 h-48 mx-auto rounded-full border-2 border-pink-300/30 flex items-center justify-center shadow-2xl mb-5"
          style={{ background: 'radial-gradient(circle at 50% 50%, #2c1654 0%, #0d0618 100%)' }}>
          
          {/* SVG Constellation */}
          <svg className="w-40 h-40" viewBox="0 0 100 100">
            {/* Stars */}
            <circle cx="20" cy="30" r="1.5" fill="#ffd6e4" />
            <circle cx="45" cy="20" r="2" fill="#fff" />
            <circle cx="75" cy="35" r="1.5" fill="#ffe4b5" />
            <circle cx="85" cy="65" r="2" fill="#fff" />
            <circle cx="60" cy="80" r="1.5" fill="#ffd6e4" />
            <circle cx="30" cy="70" r="2" fill="#fff" />

            {/* Constellation Lines */}
            <line x1="20" y1="30" x2="45" y2="20" stroke="rgba(255,214,228,0.4)" strokeWidth="0.8" strokeDasharray="2,2" />
            <line x1="45" y1="20" x2="75" y2="35" stroke="rgba(255,214,228,0.4)" strokeWidth="0.8" strokeDasharray="2,2" />
            <line x1="75" y1="35" x2="85" y2="65" stroke="rgba(255,214,228,0.4)" strokeWidth="0.8" strokeDasharray="2,2" />
            <line x1="85" y1="65" x2="60" y2="80" stroke="rgba(255,214,228,0.4)" strokeWidth="0.8" strokeDasharray="2,2" />
            <line x1="60" y1="80" x2="30" y2="70" stroke="rgba(255,214,228,0.4)" strokeWidth="0.8" strokeDasharray="2,2" />
            <line x1="30" y1="70" x2="20" y2="30" stroke="rgba(255,214,228,0.4)" strokeWidth="0.8" strokeDasharray="2,2" />

            {/* Center Moon Symbol */}
            <circle cx="50" cy="50" r="16" fill="rgba(255,255,255,0.05)" />
            <circle cx="50" cy="50" r="2" fill="#E86F88" />
          </svg>

          {/* Interactive Constellation Label Badge */}
          <div className="absolute -bottom-2 bg-pink-500/80 backdrop-blur-md px-3 py-0.5 rounded-full text-[10px] font-bold text-white tracking-wider border border-white/20">
            ✨ {constellation}
          </div>
        </div>

        <p className="text-xs text-pink-100/90 font-serif italic mb-4">
          "Out of all the stars in the universe, finding you was my favorite miracle."
        </p>

        {/* Buttons to switch constellations */}
        <div className="flex justify-center gap-2">
          {['Ursa Major', 'Cassiopeia', 'Orion'].map(c => (
            <button key={c} onClick={() => setConstellation(c)}
              className="text-[11px] px-3 py-1 rounded-full border transition-all"
              style={{
                background: constellation === c ? 'rgba(232,111,136,0.6)' : 'rgba(255,255,255,0.08)',
                borderColor: constellation === c ? '#E86F88' : 'rgba(255,255,255,0.2)',
                color: '#fff'
              }}>
              {c}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
