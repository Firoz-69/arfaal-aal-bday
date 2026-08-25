import React, { useEffect } from 'react';

const PETALS = Array.from({ length: 14 }, (_, i) => ({
  id: i,
  left: `${Math.random() * 100}%`,
  width: `${Math.random() * 10 + 7}px`,
  height: `${Math.random() * 14 + 10}px`,
  duration: `${Math.random() * 8 + 10}s`,
  delay: `${Math.random() * 12}s`,
  opacity: Math.random() * 0.4 + 0.2,
}));

export default function PetalBackground() {
  return (
    <div className="petal-container" aria-hidden="true">
      {PETALS.map(p => (
        <div
          key={p.id}
          className="petal"
          style={{
            left: p.left,
            width: p.width,
            height: p.height,
            animationDuration: p.duration,
            animationDelay: p.delay,
            opacity: p.opacity,
          }}
        />
      ))}
    </div>
  );
}
