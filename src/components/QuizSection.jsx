import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { HelpCircle, CheckCircle2, XCircle, Trophy, Sparkles, RefreshCw } from 'lucide-react';

const QUESTIONS = (name) => [
  {
    id: 1,
    q: `What is ${name || "Sophia"}'s ultimate comfort food? 🍕`,
    opts: [
      { text: 'Spicy Ramen & Dumplings', correct: false },
      { text: 'Cheesy Pizza & Iced Coffee', correct: true },
      { text: 'Chocolate Cake & Ice Cream', correct: false },
    ],
  },
  {
    id: 2,
    q: `Where is ${name || "Sophia"}'s dream travel destination? ✈️`,
    opts: [
      { text: 'Tokyo, Japan', correct: false },
      { text: 'Amalfi Coast, Italy', correct: true },
      { text: 'Swiss Alps Cabin', correct: false },
    ],
  },
  {
    id: 3,
    q: `What is ${name || "Sophia"}'s real-life superpower? ⚡`,
    opts: [
      { text: 'Finding the best cafes', correct: false },
      { text: 'Binge-watching shows in 1 day', correct: false },
      { text: 'Making anyone smile instantly', correct: true },
    ],
  },
];

const fireworks = () =>
  confetti({ particleCount: 130, spread: 85, origin: { y: 0.6 }, colors: ['#E86F88', '#FFD6E0', '#D4AF37', '#8DAA86'] });

export default function QuizSection({ name }) {
  const questions = QUESTIONS(name);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const pick = (opt) => {
    const q = questions[step];
    if (answers[q.id]) return;
    const updated = { ...answers, [q.id]: opt };
    setAnswers(updated);
    if (opt.correct) setScore(s => s + 1);
    setTimeout(() => {
      if (step < questions.length - 1) setStep(s => s + 1);
      else { setDone(true); fireworks(); }
    }, 1100);
  };

  const restart = () => { setStep(0); setAnswers({}); setScore(0); setDone(false); };

  const q = questions[step];

  return (
    <section className="px-5 pb-14">
      <div className="glass-card p-6">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="section-badge mx-auto">
            <HelpCircle size={12} />
            <span>Mini Game</span>
          </div>
          <h2 className="section-title text-2xl mb-1">How Well Do You Know The Birthday Star? 🤔</h2>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Test your knowledge about {name || 'Sophia'}!</p>
        </div>

        {!done ? (
          <>
            {/* Progress */}
            <div className="w-full h-1.5 rounded-full overflow-hidden mb-5" style={{ background: 'var(--rose-light)' }}>
              <div className="h-full rounded-full transition-all duration-300"
                style={{ width: `${((step + 1) / questions.length) * 100}%`, background: 'linear-gradient(to right, var(--rose), var(--rose-dark))' }} />
            </div>

            <p className="text-[11px] font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--rose)' }}>
              Question {step + 1} of {questions.length}
            </p>
            <h3 className="font-heading text-lg font-bold mb-5" style={{ color: 'var(--wine)' }}>
              {q.q}
            </h3>

            <div className="space-y-3">
              {q.opts.map((opt, i) => {
                const chosen = answers[q.id];
                let cls = 'bg-white border text-sm p-3.5 rounded-xl flex items-center justify-between transition-all cursor-pointer';
                let style = { borderColor: 'var(--border-rose)', color: 'var(--text-body)' };
                if (chosen) {
                  if (opt.correct) { cls += ' font-bold'; style = { background: '#ecfdf5', borderColor: '#34d399', color: '#065f46' }; }
                  else if (chosen === opt) style = { background: '#fff1f2', borderColor: '#f87171', color: '#991b1b' };
                }
                return (
                  <button key={i} disabled={!!chosen} onClick={() => pick(opt)}
                    className={cls} style={style}>
                    <span>{opt.text}</span>
                    {chosen && (opt.correct ? <CheckCircle2 size={17} color="#34d399" /> : chosen === opt ? <XCircle size={17} color="#f87171" /> : null)}
                  </button>
                );
              })}
            </div>
          </>
        ) : (
          <div className="text-center py-4">
            <div className="w-16 h-16 rounded-full mx-auto flex items-center justify-center mb-4"
              style={{ background: 'var(--rose-light)', color: 'var(--rose)' }}>
              <Trophy size={30} />
            </div>
            <h3 className="font-heading text-2xl font-bold mb-1" style={{ color: 'var(--wine)' }}>You did it! 🎉</h3>
            <p className="font-bold mb-1" style={{ color: 'var(--rose)' }}>{score} / {questions.length} correct!</p>
            <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>
              {score === questions.length ? 'Perfect score! You know the birthday star so well! 💖' : 'Great effort! You really know this amazing person! ✨'}
            </p>
            <div className="flex gap-3 justify-center">
              <button onClick={restart} className="btn-outline text-xs">
                <RefreshCw size={14} /> Play Again
              </button>
              <button onClick={fireworks} className="btn-primary text-xs">
                <Sparkles size={14} /> More Confetti!
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
