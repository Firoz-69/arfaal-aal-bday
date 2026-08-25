import React, { useState } from 'react';

import PetalBackground          from './components/PetalBackground';
import Navbar                   from './components/Navbar';
import HeroSection              from './components/HeroSection';
import StillHereSection         from './components/StillHereSection';
import InfinitePhotoMarquee     from './components/InfinitePhotoMarquee';
import UnlockLetterSection      from './components/UnlockLetterSection';
import RotatingTaglineSection   from './components/RotatingTaglineSection';
import InteractiveMomentsSection from './components/InteractiveMomentsSection';
import MemoryTimelineSection    from './components/MemoryTimelineSection';
import PhotoGallerySection      from './components/PhotoGallerySection';
import MusicSection             from './components/MusicSection';
import ClosingSection           from './components/ClosingSection';
import Footer                   from './components/Footer';
import LoveLetterModal          from './components/LoveLetterModal';

const RECIPIENT_NAME = 'Sophia';

export default function App() {
  const [letterOpen, setLetterOpen] = useState(false);

  const openLetter = () => setLetterOpen(true);
  const closeLetter = () => setLetterOpen(false);

  return (
    <>
      {/* Falling petals — fixed background layer */}
      <PetalBackground />

      {/* Sticky nav */}
      <Navbar onOpenLetter={openLetter} />

      {/* ── 1. HERO ── */}
      <HeroSection onOpenLetter={openLetter} />

      {/* ── 2. STILL HERE ── */}
      <StillHereSection onOpenLetter={openLetter} />

      {/* ── 3. INFINITE PHOTO MARQUEE ── */}
      <InfinitePhotoMarquee />

      {/* ── 4. UNLOCK THE LETTER ── */}
      <UnlockLetterSection onOpenLetter={openLetter} />

      {/* ── 5. ROTATING TAGLINES ── */}
      <RotatingTaglineSection />

      {/* ── Section divider ── */}
      <div className="rose-divider" />

      {/* ── 7. INTERACTIVE MOMENTS ── */}
      <InteractiveMomentsSection />

      {/* ── Section divider ── */}
      <div className="rose-divider" />

      {/* ── 8. MEMORY TIMELINE ── */}
      <MemoryTimelineSection />

      {/* ── 9. PHOTO GALLERY ── */}
      <PhotoGallerySection />

      {/* ── 10. MUSIC ── */}
      <MusicSection />

      {/* ── Section divider ── */}
      <div className="rose-divider" />

      {/* ── 11. CLOSING LETTER ── */}
      <ClosingSection name={RECIPIENT_NAME} onOpenLetter={openLetter} />

      {/* ── FOOTER ── */}
      <Footer />

      {/* ── MODAL OVERLAY ── */}
      <LoveLetterModal
        isOpen={letterOpen}
        onClose={closeLetter}
        name={RECIPIENT_NAME}
      />
    </>
  );
}
