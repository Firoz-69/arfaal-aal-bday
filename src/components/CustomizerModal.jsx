import React from 'react';
import { X, Palette, User, Calendar, Music, Image, FileText, Check } from 'lucide-react';

const THEMES = [
  { id: 'pink',     name: 'Blush Pink',    color: '#E86F88' },
  { id: 'sunset',   name: 'Sunset Warmth', color: '#E06D3B' },
  { id: 'lavender', name: 'Lavender',      color: '#9B6BE8' },
  { id: 'rosegold', name: 'Rose Gold',     color: '#C54B64' },
];

export default function CustomizerModal({ isOpen, onClose, config, onChangeConfig }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        <div className="p-5">
          {/* Header */}
          <div className="flex items-center justify-between border-b pb-4 mb-5"
            style={{ borderColor: 'var(--border-rose)' }}>
            <div className="flex items-center gap-2">
              <Palette size={18} style={{ color: 'var(--rose)' }} />
              <h3 className="font-heading text-lg font-bold" style={{ color: 'var(--wine)' }}>
                Customize Website
              </h3>
            </div>
            <button onClick={onClose} className="p-1.5 rounded-full hover:bg-pink-50 transition-colors" style={{ color: 'var(--wine)' }}>
              <X size={18} />
            </button>
          </div>

          <div className="space-y-5">
            {/* Theme */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--wine)' }}>
                Color Theme
              </label>
              <div className="grid grid-cols-2 gap-2">
                {THEMES.map(t => (
                  <button key={t.id} onClick={() => onChangeConfig('theme', t.id)}
                    className="p-2.5 rounded-xl border flex items-center gap-2 text-xs font-semibold transition-all"
                    style={{
                      background: config.theme === t.id ? 'white' : 'rgba(255,255,255,0.5)',
                      borderColor: config.theme === t.id ? 'var(--rose)' : 'var(--border-rose)',
                      color: 'var(--text-body)',
                      boxShadow: config.theme === t.id ? '0 0 0 2px rgba(232,111,136,0.2)' : 'none',
                    }}>
                    <span className="w-4 h-4 rounded-full border border-black/10 shrink-0" style={{ background: t.color }} />
                    <span>{t.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Name */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-1 flex items-center gap-1" style={{ color: 'var(--wine)' }}>
                <User size={12} /> Name
              </label>
              <input type="text" value={config.name}
                onChange={e => onChangeConfig('name', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl text-sm focus:outline-none transition-colors"
                style={{ background: 'white', border: '1px solid var(--border-rose)', color: 'var(--text-body)' }}
                placeholder="Sophia" />
            </div>

            {/* Birth date */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-1 flex items-center gap-1" style={{ color: 'var(--wine)' }}>
                <Calendar size={12} /> Birth Date &amp; Time
              </label>
              <input type="datetime-local" value={config.birthDate}
                onChange={e => onChangeConfig('birthDate', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl text-sm focus:outline-none"
                style={{ background: 'white', border: '1px solid var(--border-rose)', color: 'var(--text-body)' }} />
            </div>

            {/* Portrait URL */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-1 flex items-center gap-1" style={{ color: 'var(--wine)' }}>
                <Image size={12} /> Portrait Image URL
              </label>
              <input type="text" value={config.avatarUrl}
                onChange={e => onChangeConfig('avatarUrl', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl text-sm focus:outline-none"
                style={{ background: 'white', border: '1px solid var(--border-rose)', color: 'var(--text-body)' }}
                placeholder="https://..." />
            </div>

            {/* Song title */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-1 flex items-center gap-1" style={{ color: 'var(--wine)' }}>
                <Music size={12} /> Song Title
              </label>
              <input type="text" value={config.songTitle}
                onChange={e => onChangeConfig('songTitle', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl text-sm focus:outline-none"
                style={{ background: 'white', border: '1px solid var(--border-rose)', color: 'var(--text-body)' }}
                placeholder="Happy Birthday (Piano)" />
            </div>

            {/* Custom letter */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-1 flex items-center gap-1" style={{ color: 'var(--wine)' }}>
                <FileText size={12} /> Birthday Letter
              </label>
              <textarea rows={4} value={config.customLetter}
                onChange={e => onChangeConfig('customLetter', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl text-sm focus:outline-none resize-none"
                style={{ background: 'white', border: '1px solid var(--border-rose)', color: 'var(--text-body)' }}
                placeholder="Dearest..." />
            </div>
          </div>

          <div className="mt-6 pt-4 border-t flex justify-end" style={{ borderColor: 'var(--border-rose)' }}>
            <button onClick={onClose} className="btn-primary text-xs py-2.5 px-6">
              <Check size={15} /> Apply Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
