import React, { useState } from 'react';
import { Gift, Check, Plus } from 'lucide-react';

const DEFAULTS = [
  { id: 1, text: 'Watch sunrise from a mountain peak 🌄', done: true },
  { id: 2, text: 'Learn to bake a multi-tier birthday cake 🎂', done: false },
  { id: 3, text: 'Take an impromptu weekend road trip 🚗', done: true },
  { id: 4, text: 'Adopt a golden retriever puppy 🐶', done: false },
  { id: 5, text: 'Attend an outdoor concert under the stars 🎶', done: false },
];

export default function WishListSection({ name }) {
  const [wishes, setWishes] = useState(DEFAULTS);
  const [input, setInput] = useState('');

  const toggle = (id) => setWishes(prev => prev.map(w => w.id === id ? { ...w, done: !w.done } : w));
  const add = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setWishes(prev => [...prev, { id: Date.now(), text: input.trim(), done: false }]);
    setInput('');
  };

  return (
    <section className="px-5 pb-14">
      <div className="glass-card p-6">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="section-badge mx-auto">
            <Gift size={12} />
            <span>Dream List</span>
          </div>
          <h2 className="section-title text-2xl mb-1">{name || 'Sophia'}'s Wish List 🌠</h2>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
            Dreams, goals & adventures for the year ahead!
          </p>
        </div>

        {/* List */}
        <div className="space-y-2.5 mb-5">
          {wishes.map((w) => (
            <div
              key={w.id}
              onClick={() => toggle(w.id)}
              className="flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all text-sm"
              style={{
                background: w.done ? 'rgba(255,214,224,0.25)' : 'white',
                borderColor: w.done ? 'var(--rose-light)' : 'var(--border-rose)',
                color: w.done ? 'var(--text-muted)' : 'var(--wine)',
                textDecoration: w.done ? 'line-through' : 'none',
              }}
            >
              <span className="font-medium">{w.text}</span>
              <div className="w-6 h-6 rounded-full border flex items-center justify-center shrink-0 transition-colors"
                style={{
                  background: w.done ? 'var(--rose)' : 'white',
                  borderColor: w.done ? 'var(--rose)' : 'var(--border-rose)',
                  color: 'white',
                }}>
                {w.done && <Check size={13} />}
              </div>
            </div>
          ))}
        </div>

        {/* Add form */}
        <form onSubmit={add} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Add a birthday wish..."
            className="flex-1 px-4 py-2.5 rounded-full text-sm focus:outline-none transition-colors"
            style={{ background: 'white', border: '1px solid var(--border-rose)', color: 'var(--text-body)' }}
          />
          <button type="submit" className="btn-primary py-2.5 px-4 text-xs shrink-0">
            <Plus size={16} />
          </button>
        </form>
      </div>
    </section>
  );
}
