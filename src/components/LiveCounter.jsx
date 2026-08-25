import React, { useState, useEffect } from 'react';
import { Clock, Heart, Sun, Smile } from 'lucide-react';

function computeAge(birthDateStr) {
  const birth = new Date(birthDateStr || '2000-08-22T00:00:00');
  const now = new Date();
  const diffMs = Math.abs(now - birth);
  const totalSecs = Math.floor(diffMs / 1000);
  const totalMins = Math.floor(totalSecs / 60);
  const totalHours = Math.floor(totalMins / 60);
  const totalDays = Math.floor(totalHours / 24);
  const years = Math.floor(totalDays / 365.25);
  const remainDays = Math.floor(totalDays % 365.25);
  const months = Math.floor(remainDays / 30.44);
  const days = Math.floor(remainDays % 30.44);
  const hours = totalHours % 24;
  const mins = totalMins % 60;
  const secs = totalSecs % 60;
  return { years, months, days, hours, mins, secs, totalDays, totalHours, totalMins };
}

export default function LiveCounter({ birthDate, name }) {
  const [age, setAge] = useState(computeAge(birthDate));

  useEffect(() => {
    const id = setInterval(() => setAge(computeAge(birthDate)), 1000);
    return () => clearInterval(id);
  }, [birthDate]);

  const pills = [
    { label: 'Years',   val: age.years,  emoji: '🌸' },
    { label: 'Months',  val: age.months, emoji: '🌷' },
    { label: 'Days',    val: age.days,   emoji: '✨' },
    { label: 'Hours',   val: age.hours,  emoji: '⏰' },
    { label: 'Minutes', val: age.mins,   emoji: '💫' },
    { label: 'Seconds', val: age.secs,   emoji: '💗' },
  ];

  return (
    <section className="px-5 pb-12">
      {/* Section header */}
      <div className="text-center mb-5">
        <div className="section-badge mx-auto">
          <Clock size={12} />
          <span>Life Journey Ticker</span>
        </div>
        <h2 className="section-title text-xl">{name || 'Sophia'} has been spreading magic for:</h2>
      </div>

      <div className="counter-card">
        {/* 6-pill grid */}
        <div className="grid grid-cols-3 gap-3 mb-5">
          {pills.map((p) => (
            <div key={p.label} className="counter-pill">
              <div className="counter-num">{String(p.val).padStart(2, '0')}</div>
              <div className="counter-lbl">{p.label}</div>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px mb-4" style={{ background: 'var(--border-rose)' }} />

        {/* Milestone stats */}
        <div className="space-y-2.5">
          {[
            { icon: Sun,   label: `${age.totalDays.toLocaleString()} days of sunshine`, emoji: '☀️' },
            { icon: Smile, label: `${age.totalHours.toLocaleString()} hours of laughter`, emoji: '😄' },
            { icon: Heart, label: `~${(age.totalMins * 75 / 1e6).toFixed(1)}M heartbeats of love`, emoji: '💗' },
          ].map(({ icon: Icon, label, emoji }) => (
            <div key={label} className="flex items-center gap-3 text-sm">
              <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-base"
                style={{ background: 'var(--rose-light)' }}>
                {emoji}
              </div>
              <span style={{ color: 'var(--wine)', fontWeight: 600 }}>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
