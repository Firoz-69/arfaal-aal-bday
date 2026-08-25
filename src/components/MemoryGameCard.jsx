import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Gamepad2, RotateCcw, Trophy } from 'lucide-react';

const CARDS_DATA = [
  { id: 1, symbol: '🌸', matched: false },
  { id: 2, symbol: '🌸', matched: false },
  { id: 3, symbol: '💖', matched: false },
  { id: 4, symbol: '💖', matched: false },
  { id: 5, symbol: '💌', matched: false },
  { id: 6, symbol: '💌', matched: false },
  { id: 7, symbol: '✨', matched: false },
  { id: 8, symbol: '✨', matched: false },
];

function shuffleArray(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

export default function MemoryGameCard() {
  const [cards, setCards] = useState(() => shuffleArray(CARDS_DATA));
  const [flipped, setFlipped] = useState([]);
  const [moves, setMoves] = useState(0);
  const [isWon, setIsWon] = useState(false);

  const handleCardClick = (index) => {
    if (flipped.length === 2 || flipped.includes(index) || cards[index].matched) return;

    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(m => m + 1);
      const [first, second] = newFlipped;
      if (cards[first].symbol === cards[second].symbol) {
        setCards(prev => prev.map((c, i) => i === first || i === second ? { ...c, matched: true } : c));
        setFlipped([]);
      } else {
        setTimeout(() => setFlipped([]), 800);
      }
    }
  };

  useEffect(() => {
    if (cards.length > 0 && cards.every(c => c.matched)) {
      setIsWon(true);
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    }
  }, [cards]);

  const restart = () => {
    setCards(shuffleArray(CARDS_DATA));
    setFlipped([]);
    setMoves(0);
    setIsWon(false);
  };

  return (
    <section className="px-5 pb-12">
      <div className="glass-card p-6 text-center">
        <div className="section-badge mx-auto mb-2">
          <Gamepad2 size={12} />
          <span>Mini Game</span>
        </div>

        <h2 className="section-title text-xl mb-1">Pair Match Memory Game 🧠</h2>
        <p className="text-xs mb-4" style={{ color: 'var(--text-muted)' }}>
          Find all matching romantic pairs in as few moves as possible!
        </p>

        <div className="flex items-center justify-between px-2 mb-4 text-xs font-semibold" style={{ color: 'var(--wine)' }}>
          <span>Moves: {moves}</span>
          <button onClick={restart} className="flex items-center gap-1 text-xs" style={{ color: 'var(--rose)' }}>
            <RotateCcw size={12} /> Reset
          </button>
        </div>

        {/* 4x2 Grid */}
        <div className="grid grid-cols-4 gap-3 mb-4">
          {cards.map((card, idx) => {
            const isFlipped = flipped.includes(idx) || card.matched;
            return (
              <button
                key={idx}
                onClick={() => handleCardClick(idx)}
                className="h-16 rounded-xl flex items-center justify-center text-2xl transition-all duration-300 transform"
                style={{
                  background: isFlipped ? 'var(--blush)' : 'linear-gradient(135deg, var(--rose) 0%, var(--rose-dark) 100%)',
                  border: isFlipped ? '2px solid var(--rose)' : 'none',
                  boxShadow: '0 4px 12px rgba(232,111,136,0.15)',
                  transform: isFlipped ? 'rotateY(180deg)' : 'none'
                }}
              >
                {isFlipped ? card.symbol : '❓'}
              </button>
            );
          })}
        </div>

        {isWon && (
          <div className="p-4 rounded-xl bg-pink-50 border border-pink-200 mt-3 animate-fade-in">
            <Trophy size={28} className="mx-auto text-amber-500 mb-1" />
            <h3 className="font-heading text-lg font-bold" style={{ color: 'var(--wine)' }}>You Won! 🎉</h3>
            <p className="text-xs text-pink-700">Completed in {moves} moves! Perfect match 💕</p>
          </div>
        )}
      </div>
    </section>
  );
}
