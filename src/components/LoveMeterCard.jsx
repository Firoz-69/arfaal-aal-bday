import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, Flame } from 'lucide-react';

export default function LoveMeterCard({ name1 = 'You', name2 = 'Me' }) {
  const [score, setScore] = useState(null);
  const [calculating, setCalculating] = useState(false);

  const calculateLove = () => {
    setCalculating(true);
    setScore(null);
    setTimeout(() => {
      const finalScore = 100; // Always 100% for maximum romance!
      setScore(finalScore);
      setCalculating(false);
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
    }, 1200);
  };

  return (
    <section className="px-5 pb-12">
      <div className="glass-card p-6 text-center">
        <div className="section-badge mx-auto mb-2">
          <Heart size={12} className="fill-current text-rose-500" />
          <span>Love Meter</span>
        </div>

        <h2 className="section-title text-xl mb-1">Our Compatibility Calculator 💓</h2>
        <p className="text-xs mb-5" style={{ color: 'var(--text-muted)' }}>
          Calculate the exact love percentage between {name1} & {name2}!
        </p>

        {/* Gauge display */}
        <div className="relative w-40 h-40 mx-auto rounded-full border-4 border-rose-200 flex flex-col items-center justify-center bg-gradient-to-b from-rose-50 to-pink-100 shadow-inner mb-5">
          {calculating ? (
            <div className="animate-spin text-3xl">💗</div>
          ) : score !== null ? (
            <>
              <div className="font-heading text-4xl font-extrabold text-rose-600 animate-bounce">
                {score}%
              </div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-rose-500 flex items-center gap-1">
                <Flame size={12} className="fill-current" /> Perfect Match
              </div>
            </>
          ) : (
            <div className="text-3xl animate-pulse">❓</div>
          )}
        </div>

        <button
          onClick={calculateLove}
          disabled={calculating}
          className="btn-primary w-full max-w-xs justify-center"
        >
          <Sparkles size={16} />
          <span>{score !== null ? 'Recalculate Love 💕' : 'Calculate Compatibility 💕'}</span>
        </button>

        {score !== null && (
          <p className="font-script text-lg text-rose-600 mt-4">
            "Destined to be together forever & always! ✨"
          </p>
        )}
      </div>
    </section>
  );
}
