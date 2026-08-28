import React, { useState, useEffect, useRef } from 'react';
import { Timer, Gift, HelpCircle, Layers, Sparkles } from 'lucide-react';

/* ─── 1. Countdown Timer ─── */
function CountdownPreview() {
  const [time, setTime] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });
  useEffect(() => {
    const start = new Date('2023-02-14');
    const tick = () => {
      const diff = Math.floor((Date.now() - start.getTime()) / 1000);
      setTime({
        days: Math.floor(diff / 86400),
        hours: Math.floor((diff % 86400) / 3600),
        mins: Math.floor((diff % 3600) / 60),
        secs: diff % 60,
      });
    };
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{ padding: '24px 16px', textAlign: 'center' }}>
      <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: 16, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
        Time we've shared together ❤️
      </p>
      <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
        {Object.entries(time).map(([unit, val]) => (
          <div key={unit} style={{ textAlign: 'center' }}>
            <div className="font-serif" style={{
              fontSize: '2rem', fontWeight: 700, color: 'var(--rose)',
              background: 'rgba(232,117,138,0.1)', borderRadius: 10, padding: '10px 14px',
              border: '1px solid var(--border)', minWidth: 60,
              animation: 'scaleIn 0.3s ease',
              key: val,
            }}>
              {String(val).padStart(2, '0')}
            </div>
            <div style={{ fontSize: '0.6rem', color: 'var(--text-muted)', marginTop: 5, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              {unit}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── 2. Spin the Wheel ─── */
const WHEEL_PRIZES = [
  { label: 'Coffee date ☕', color: '#e8758a' },
  { label: 'Movie night 🎬', color: '#9b72cf' },
  { label: 'Surprise hug 🤗', color: '#c9a566' },
  { label: 'Love letter 💌', color: '#e8758a' },
  { label: 'Stargazing 🌟', color: '#4a90d9' },
  { label: 'Breakfast in bed 🥞', color: '#c9a566' },
];

function SpinWheelPreview() {
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [result, setResult] = useState(null);
  const canvasRef = useRef(null);

  const sliceAngle = 360 / WHEEL_PRIZES.length;

  useEffect(() => {
    drawWheel(rotation);
  }, [rotation]);

  function drawWheel(rot) {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const r = cx - 4;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    WHEEL_PRIZES.forEach((p, i) => {
      const start = ((i * sliceAngle - 90 + rot) * Math.PI) / 180;
      const end = (((i + 1) * sliceAngle - 90 + rot) * Math.PI) / 180;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, r, start, end);
      ctx.closePath();
      ctx.fillStyle = p.color + (i % 2 === 0 ? 'cc' : '99');
      ctx.fill();
      ctx.strokeStyle = 'rgba(255,255,255,0.15)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Label
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(((i + 0.5) * sliceAngle - 90 + rot) * Math.PI / 180);
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 9px Inter, sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText(p.label, r - 8, 4);
      ctx.restore();
    });

    // Center circle
    ctx.beginPath();
    ctx.arc(cx, cy, 14, 0, Math.PI * 2);
    ctx.fillStyle = '#1a0e18';
    ctx.fill();
    ctx.strokeStyle = 'var(--rose)';
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  function spin() {
    if (spinning) return;
    setSpinning(true);
    setResult(null);
    const spins = 5 + Math.random() * 5;
    const extra = Math.floor(Math.random() * WHEEL_PRIZES.length) * sliceAngle;
    const totalDeg = spins * 360 + extra;
    const duration = 3000;
    const start = performance.now();
    const startRot = rotation;

    function animate(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const ease = 1 - Math.pow(1 - progress, 3);
      const newRot = (startRot + totalDeg * ease) % 360;
      setRotation(newRot);
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setSpinning(false);
        // Which segment is at the top (pointer at 270deg / -90deg)
        const finalRot = (startRot + totalDeg) % 360;
        const normalized = (360 - (finalRot % 360)) % 360;
        const idx = Math.floor(((normalized + sliceAngle / 2) % 360) / sliceAngle) % WHEEL_PRIZES.length;
        setResult(WHEEL_PRIZES[idx].label);
      }
    }
    requestAnimationFrame(animate);
  }

  return (
    <div style={{ padding: '16px', textAlign: 'center' }}>
      <div style={{ position: 'relative', display: 'inline-block' }}>
        {/* Pointer */}
        <div style={{
          position: 'absolute', top: -4, left: '50%', transform: 'translateX(-50%)',
          width: 0, height: 0,
          borderLeft: '8px solid transparent',
          borderRight: '8px solid transparent',
          borderTop: '16px solid var(--rose)',
          zIndex: 2,
          filter: 'drop-shadow(0 2px 4px rgba(232,117,138,0.6))',
        }} />
        <canvas
          ref={canvasRef}
          width={160} height={160}
          style={{ borderRadius: '50%', cursor: spinning ? 'not-allowed' : 'pointer', display: 'block' }}
          onClick={spin}
        />
      </div>
      {result ? (
        <p style={{ marginTop: 12, fontSize: '0.9rem', color: 'var(--rose-light)', animation: 'fadeUp 0.4s ease', fontWeight: 600 }}>
          🎉 {result}
        </p>
      ) : (
        <p style={{ marginTop: 10, fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          {spinning ? 'Spinning... ✨' : 'Tap the wheel to spin!'}
        </p>
      )}
    </div>
  );
}

/* ─── 3. Love Quiz ─── */
const QUIZ_QUESTIONS = [
  {
    q: 'Where did we go on our first date?',
    opts: ['A café downtown', 'The park', 'A rooftop bar', 'The movies'],
    correct: 0,
  },
  {
    q: 'What is our song?',
    opts: ['Perfect – Ed Sheeran', 'Lover – Taylor Swift', 'All of Me – John Legend', 'Beautiful – James Blunt'],
    correct: 0,
  },
  {
    q: 'Which word best describes us?',
    opts: ['Soulmates', 'Adventure buddies', 'Partners in crime', 'Best friends'],
    correct: 0,
  },
];

function LoveQuizPreview() {
  const [qIdx, setQIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const q = QUIZ_QUESTIONS[qIdx];

  function pick(i) {
    if (selected !== null) return;
    setSelected(i);
    if (i === q.correct) setScore(s => s + 1);
    setTimeout(() => {
      if (qIdx + 1 < QUIZ_QUESTIONS.length) {
        setQIdx(qi => qi + 1);
        setSelected(null);
      } else {
        setDone(true);
      }
    }, 900);
  }

  function reset() { setQIdx(0); setSelected(null); setScore(0); setDone(false); }

  if (done) return (
    <div style={{ padding: '20px 16px', textAlign: 'center' }}>
      <p style={{ fontSize: '2.2rem', marginBottom: 8 }}>
        {score === 3 ? '🏆' : score >= 2 ? '💕' : '💌'}
      </p>
      <p className="font-serif" style={{ fontSize: '1.2rem', color: 'var(--text-white)', fontWeight: 700, marginBottom: 4 }}>
        {score}/3 correct
      </p>
      <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: 14 }}>
        {score === 3 ? 'You know us perfectly! 💖' : 'Keep making memories together!'}
      </p>
      <button className="btn-rose" onClick={reset} style={{ padding: '8px 20px', fontSize: '0.8rem' }}>
        Play Again
      </button>
    </div>
  );

  return (
    <div style={{ padding: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
        <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
          Question {qIdx + 1}/{QUIZ_QUESTIONS.length}
        </span>
        <span style={{ fontSize: '0.72rem', color: 'var(--rose)' }}>Score: {score}</span>
      </div>
      <div style={{ height: 3, background: 'rgba(255,255,255,0.08)', borderRadius: 99, marginBottom: 14, overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${((qIdx) / QUIZ_QUESTIONS.length) * 100}%`, background: 'var(--rose)', borderRadius: 99, transition: 'width 0.4s ease' }} />
      </div>
      <p style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-white)', marginBottom: 12 }}>{q.q}</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {q.opts.map((opt, i) => {
          let bg = 'rgba(255,255,255,0.05)';
          let border = 'var(--border)';
          let color = 'var(--text-muted)';
          if (selected !== null) {
            if (i === q.correct) { bg = 'rgba(100,200,130,0.15)'; border = '#64c882'; color = '#64c882'; }
            else if (i === selected) { bg = 'rgba(232,117,138,0.15)'; border = 'var(--rose)'; color = 'var(--rose)'; }
          }
          return (
            <button key={i} onClick={() => pick(i)} style={{
              background: bg, border: `1px solid ${border}`, borderRadius: 10,
              padding: '8px 12px', cursor: selected !== null ? 'default' : 'pointer',
              color, fontSize: '0.78rem', textAlign: 'left', fontFamily: 'var(--font-body)',
              transition: 'all 0.25s ease',
            }}>
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ─── 4. Scratch Card ─── */
function ScratchCardPreview() {
  const canvasRef = useRef(null);
  const [scratched, setScratched] = useState(false);
  const [pct, setPct] = useState(0);
  const isDrawing = useRef(false);

  const MESSAGES = [
    'You are my favourite notification 💌',
    'I choose you, every single day 🌹',
    'My love for you has no end date ♾️',
    'You make everything better just by existing 💕',
  ];
  const [msg] = useState(() => MESSAGES[Math.floor(Math.random() * MESSAGES.length)]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    grad.addColorStop(0, '#c4485e');
    grad.addColorStop(1, '#9b72cf');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(255,255,255,0.12)';
    ctx.font = '11px Inter';
    ctx.textAlign = 'center';
    ctx.fillText('✦ Scratch here ✦', canvas.width / 2, canvas.height / 2 + 4);
  }, []);

  function scratch(e) {
    if (!isDrawing.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
    const y = (e.touches ? e.touches[0].clientY : e.clientY) - rect.top;
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x * (canvas.width / rect.width), y * (canvas.height / rect.height), 18, 0, Math.PI * 2);
    ctx.fill();
    // Check coverage
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    let cleared = 0;
    for (let i = 3; i < data.length; i += 4) if (data[i] === 0) cleared++;
    const p = Math.round((cleared / (canvas.width * canvas.height)) * 100);
    setPct(p);
    if (p > 60) setScratched(true);
  }

  return (
    <div style={{ padding: '16px', textAlign: 'center' }}>
      <div style={{ position: 'relative', display: 'inline-block', borderRadius: 12, overflow: 'hidden', touchAction: 'none' }}>
        {/* Message beneath */}
        <div style={{
          position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: 12,
        }}>
          <p className="font-script" style={{ fontSize: '0.95rem', color: 'var(--rose-light)', lineHeight: 1.5 }}>
            {msg}
          </p>
        </div>
        <canvas
          ref={canvasRef}
          width={220} height={90}
          style={{ display: 'block', cursor: 'crosshair', borderRadius: 12, opacity: scratched ? 0 : 1, transition: 'opacity 0.5s ease' }}
          onMouseDown={() => { isDrawing.current = true; }}
          onMouseMove={scratch}
          onMouseUp={() => { isDrawing.current = false; }}
          onMouseLeave={() => { isDrawing.current = false; }}
          onTouchStart={() => { isDrawing.current = true; }}
          onTouchMove={scratch}
          onTouchEnd={() => { isDrawing.current = false; }}
        />
      </div>
      <p style={{ fontSize: '0.7rem', color: 'var(--text-faint)', marginTop: 8 }}>
        {scratched ? '💌 Your message revealed!' : `Scratch to reveal a love note (${pct}%)`}
      </p>
    </div>
  );
}

/* ─── 5. Would You Rather ─── */
const WYR_PAIRS = [
  ['Sunrise picnic 🌅', 'Midnight rooftop 🌙'],
  ['Road trip together 🚗', 'Fly to a new city ✈️'],
  ['Cook dinner at home 🍝', 'Fancy restaurant date 🍷'],
  ['Write love letters ✉️', 'Dance in the rain 💃'],
];

function WouldYouRatherPreview() {
  const [idx, setIdx] = useState(0);
  const [chosen, setChosen] = useState(null);
  const pair = WYR_PAIRS[idx];

  function choose(i) {
    setChosen(i);
    setTimeout(() => {
      setIdx(prev => (prev + 1) % WYR_PAIRS.length);
      setChosen(null);
    }, 800);
  }

  return (
    <div style={{ padding: '16px' }}>
      <p style={{ fontSize: '0.72rem', color: 'var(--text-faint)', textTransform: 'uppercase', letterSpacing: '0.08em', textAlign: 'center', marginBottom: 14 }}>
        Would you rather…?
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {pair.map((opt, i) => (
          <button
            key={i}
            onClick={() => choose(i)}
            style={{
              padding: '14px 10px',
              borderRadius: 14,
              border: chosen === i ? '2px solid var(--rose)' : '1px solid var(--border)',
              background: chosen === i ? 'rgba(232,117,138,0.15)' : 'rgba(255,255,255,0.04)',
              color: chosen === i ? 'var(--rose-light)' : 'var(--text-muted)',
              fontFamily: 'var(--font-body)',
              fontSize: '0.8rem',
              lineHeight: 1.5,
              cursor: chosen !== null ? 'default' : 'pointer',
              transition: 'all 0.25s ease',
              textAlign: 'center',
            }}
          >
            {opt}
          </button>
        ))}
      </div>
      <p style={{ textAlign: 'center', fontSize: '0.68rem', color: 'var(--text-faint)', marginTop: 10 }}>
        Tap an option • {WYR_PAIRS.length} rounds
      </p>
    </div>
  );
}

/* ─── Main Section ─── */
const MOMENTS = [
  { id: 'countdown', icon: Timer,      label: 'Countdown to Us',    desc: 'A live counter of every second we have shared together.',            preview: <CountdownPreview /> },
  { id: 'wheel',     icon: Gift,       label: 'Spin the Wheel',     desc: 'Spin for surprise date ideas, love notes, and little gifts.',        preview: <SpinWheelPreview /> },
  { id: 'quiz',      icon: HelpCircle, label: 'Love Quiz',          desc: 'How well do you know our story? Test your memory here.',             preview: <LoveQuizPreview /> },
  { id: 'scratch',   icon: Layers,     label: 'Scratch Card',       desc: 'Scratch to reveal a secret love note hidden just for you.',          preview: <ScratchCardPreview /> },
  { id: 'wyr',       icon: Sparkles,   label: 'Would You Rather?',  desc: 'Fun romantic choices — tap your favourite and see what we pick.',    preview: <WouldYouRatherPreview /> },
];

export default function InteractiveMomentsSection() {
  const [active, setActive] = useState('countdown');
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) ref.current?.classList.add('visible'); },
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const activeMoment = MOMENTS.find(m => m.id === active);

  return (
    <section
      className="section-pad"
      style={{ background: 'linear-gradient(180deg, var(--bg-mid) 0%, var(--bg-deep) 100%)' }}
    >
      <div className="container">
        {/* Header */}
        <div ref={ref} className="reveal" style={{ textAlign: 'center', marginBottom: 48 }}>
          <div className="pill-badge" style={{ marginBottom: 16 }}>✦ Interactive Moments</div>
          <h2 className="font-serif" style={{
            fontSize: 'clamp(1.8rem, 4vw, 3rem)',
            fontWeight: 700,
            color: 'var(--text-white)',
            marginBottom: 12,
          }}>
            Games & surprises{' '}
            <em style={{ color: 'var(--rose)', fontStyle: 'italic' }}>made for you</em>
          </h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: 480, margin: '0 auto', fontSize: '0.95rem' }}>
            This isn't just a letter — it's a world of tiny experiences to play with together.
          </p>
        </div>

        <div className="moments-layout" style={{ display: 'flex', gap: 28, flexWrap: 'wrap' }}>
          {/* Tab list */}
          <div className="moments-tabs" style={{ display: 'flex', flexDirection: 'column', gap: 8, minWidth: 210, flexShrink: 0 }}>
            {MOMENTS.map(({ id, icon: Icon, label, desc }) => (
              <button
                key={id}
                className="moments-tab-btn"
                onClick={() => setActive(id)}
                style={{
                  display: 'flex', alignItems: 'flex-start', gap: 12,
                  padding: '14px 16px',
                  borderRadius: 14,
                  border: id === active ? '1px solid var(--rose)' : '1px solid var(--border)',
                  background: id === active ? 'rgba(232,117,138,0.12)' : 'transparent',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.25s ease',
                }}
              >
                <div style={{
                  width: 36, height: 36, borderRadius: 10, flexShrink: 0,
                  background: id === active
                    ? 'linear-gradient(135deg, var(--rose) 0%, var(--rose-dark) 100%)'
                    : 'rgba(255,255,255,0.06)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all 0.25s',
                }}>
                  <Icon size={16} color={id === active ? '#fff' : 'var(--rose)'} />
                </div>
                <div>
                  <p style={{
                    fontWeight: 600, fontSize: '0.88rem', marginBottom: 2,
                    color: id === active ? 'var(--text-white)' : 'var(--text-muted)',
                    transition: 'color 0.25s',
                  }}>
                    {label}
                  </p>
                  {id === active && (
                    <p className="moments-tab-desc" style={{ fontSize: '0.73rem', color: 'var(--text-faint)' }}>{desc}</p>
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Preview panel */}
          <div style={{ flex: 1, minWidth: 260 }}>
            <div className="glass" style={{ borderRadius: 20, overflow: 'hidden', minHeight: 240 }}>
              {/* Panel header */}
              <div style={{
                padding: '14px 18px',
                borderBottom: '1px solid var(--border)',
                display: 'flex', alignItems: 'center', gap: 10,
              }}>
                <div style={{
                  width: 30, height: 30, borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--rose) 0%, var(--rose-dark) 100%)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {activeMoment && <activeMoment.icon size={14} color="#fff" />}
                </div>
                <span style={{ fontWeight: 600, color: 'var(--text-white)', fontSize: '0.88rem' }}>
                  {activeMoment?.label}
                </span>
                <span className="pill-badge" style={{ marginLeft: 'auto', fontSize: '0.62rem', padding: '3px 10px' }}>
                  Live
                </span>
              </div>

              {/* Content */}
              <div key={active} style={{ animation: 'scaleIn 0.3s ease' }}>
                {activeMoment?.preview}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
