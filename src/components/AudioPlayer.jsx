import React, { useRef, useState, useEffect } from 'react';
import { Play, Pause, VolumeX, Volume2, Settings, Music2 } from 'lucide-react';

export default function AudioPlayer({ audioUrl, songTitle, artist, onOpenCustomizer }) {
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = 0.45;
  }, []);

  const toggle = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.play().then(() => setPlaying(true)).catch(() => {});
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !muted;
    setMuted(!muted);
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={audioUrl || 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3'}
        loop
      />
      <div className="music-pill">
        {/* Play / Pause */}
        <button
          onClick={toggle}
          aria-label={playing ? 'Pause' : 'Play'}
          className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 text-white"
          style={{ background: 'linear-gradient(135deg, var(--rose), var(--rose-dark))', boxShadow: '0 4px 14px rgba(232,111,136,0.4)' }}
        >
          {playing ? <Pause size={15} /> : <Play size={15} className="ml-0.5" />}
        </button>

        {/* Track info */}
        <div className="flex-1 min-w-0 flex flex-col">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold truncate" style={{ color: 'var(--wine)', fontFamily: 'var(--font-heading)' }}>
              {songTitle || 'Happy Birthday ♫'}
            </span>
            {playing && (
              <div className="flex items-end gap-0.5 h-[18px] shrink-0">
                <span className="eq-bar" />
                <span className="eq-bar" />
                <span className="eq-bar" />
                <span className="eq-bar" />
              </div>
            )}
          </div>
          <span className="text-[11px] truncate" style={{ color: 'var(--text-muted)' }}>
            {artist || 'Birthday Playlist 🎶'}
          </span>
        </div>

        {/* Controls */}
        <button onClick={toggleMute} aria-label="Toggle mute" className="p-1.5 rounded-full hover:bg-pink-50 transition-colors" style={{ color: 'var(--text-muted)' }}>
          {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </button>
        <button onClick={onOpenCustomizer} aria-label="Customize" className="p-1.5 rounded-full hover:bg-pink-50 transition-colors" style={{ color: 'var(--wine)' }}>
          <Settings size={16} />
        </button>
      </div>
    </>
  );
}
