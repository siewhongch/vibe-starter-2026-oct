import React, { useState, useEffect } from 'react';
import { Play, Pause, X, Volume2, FastForward, Rewind, Headphones } from 'lucide-react';

interface AudioBarProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

export const AudioBar: React.FC<AudioBarProps> = ({
  isOpen,
  onClose,
  title = 'The Daily: Inside the Shift in Trump’s Inner Circle'
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(45); // seconds
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const duration = 24 * 60 + 10; // 24m 10s

  useEffect(() => {
    let interval: any = null;
    if (isPlaying && isOpen) {
      interval = setInterval(() => {
        setProgress(p => (p >= duration ? 0 : p + playbackSpeed));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, isOpen, duration, playbackSpeed]);

  if (!isOpen) return null;

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const toggleSpeed = () => {
    if (playbackSpeed === 1) setPlaybackSpeed(1.25);
    else if (playbackSpeed === 1.25) setPlaybackSpeed(1.5);
    else if (playbackSpeed === 1.5) setPlaybackSpeed(2);
    else setPlaybackSpeed(1);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#121212] text-white border-t border-gray-800 shadow-2xl px-4 py-2.5">
      <div className="max-w-[1240px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Track Info */}
        <div className="flex items-center space-x-3 w-full sm:w-auto">
          <div className="w-10 h-10 rounded bg-white text-black flex items-center justify-center font-extrabold text-xs shrink-0 shadow">
            <Headphones className="w-5 h-5 text-black" />
          </div>
          <div className="truncate">
            <div className="flex items-center space-x-2">
              <span className="text-[10px] uppercase font-bold tracking-wider text-amber-400">NYT Audio</span>
              <span className="text-[10px] text-gray-400">• Michael Barbaro</span>
            </div>
            <p className="text-xs font-bold truncate max-w-sm sm:max-w-md">{title}</p>
          </div>
        </div>

        {/* Controls & Progress */}
        <div className="flex flex-col items-center w-full sm:w-96">
          <div className="flex items-center space-x-4 mb-1">
            <button
              onClick={() => setProgress(p => Math.max(0, p - 15))}
              className="text-gray-400 hover:text-white transition"
              title="Rewind 15s"
            >
              <Rewind className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center hover:bg-gray-200 transition"
            >
              {isPlaying ? <Pause className="w-4 h-4 fill-black" /> : <Play className="w-4 h-4 fill-black ml-0.5" />}
            </button>
            <button
              onClick={() => setProgress(p => Math.min(duration, p + 15))}
              className="text-gray-400 hover:text-white transition"
              title="Fast Forward 15s"
            >
              <FastForward className="w-4 h-4" />
            </button>
            <button
              onClick={toggleSpeed}
              className="text-[11px] font-bold text-gray-400 hover:text-white border border-gray-700 px-1.5 py-0.5 rounded"
            >
              {playbackSpeed}x
            </button>
          </div>
          <div className="w-full flex items-center space-x-2 text-[10px] text-gray-400 font-mono">
            <span>{formatTime(progress)}</span>
            <input
              type="range"
              min="0"
              max={duration}
              value={progress}
              onChange={e => setProgress(Number(e.target.value))}
              className="w-full accent-white h-1 bg-gray-700 rounded-lg cursor-pointer"
            />
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Close Button */}
        <div className="hidden sm:flex items-center space-x-2">
          <button onClick={onClose} className="p-1 text-gray-400 hover:text-white transition">
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
