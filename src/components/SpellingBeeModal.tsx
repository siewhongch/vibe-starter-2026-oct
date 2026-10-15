import React, { useState } from 'react';
import { X, RotateCcw, Shuffle, Delete } from 'lucide-react';

interface SpellingBeeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CENTER_LETTER = 'N';
const OUTER_LETTERS = ['T', 'I', 'M', 'E', 'S', 'O'];
const VALID_WORDS = [
  'TENNIS', 'NINE', 'NOON', 'NOTE', 'NOTES', 'NOTICE', 'NOTION', 'MINE', 'MINES', 'MINT', 'MINTS',
  'SENT', 'STONE', 'STONES', 'TONES', 'TENSION', 'MISSION', 'EMISSION', 'INTENT', 'INTO', 'NOSE'
];

export const SpellingBeeModal: React.FC<SpellingBeeModalProps> = ({ isOpen, onClose }) => {
  const [currentInput, setCurrentInput] = useState<string>('');
  const [foundWords, setFoundWords] = useState<string[]>(['NOTE', 'MINES']);
  const [message, setMessage] = useState<string>('');
  const [letters, setLetters] = useState<string[]>(OUTER_LETTERS);

  if (!isOpen) return null;

  const showToast = (msg: string) => {
    setMessage(msg);
    setTimeout(() => setMessage(''), 2000);
  };

  const handleAddLetter = (char: string) => {
    setCurrentInput(prev => prev + char);
  };

  const handleDelete = () => {
    setCurrentInput(prev => prev.slice(0, -1));
  };

  const handleShuffle = () => {
    setLetters([...letters].sort(() => Math.random() - 0.5));
  };

  const handleSubmit = () => {
    const word = currentInput.toUpperCase();
    if (word.length < 4) {
      showToast('Too short');
      return;
    }
    if (!word.includes(CENTER_LETTER)) {
      showToast(`Missing center letter (${CENTER_LETTER})`);
      return;
    }
    if (foundWords.includes(word)) {
      showToast('Already found');
      return;
    }
    if (VALID_WORDS.includes(word) || word.length >= 4) {
      setFoundWords(prev => [word, ...prev]);
      showToast(`Nice! +${word.length} pts`);
      setCurrentInput('');
    } else {
      showToast('Not in word list');
    }
  };

  const score = foundWords.reduce((acc, w) => acc + (w.length === 4 ? 1 : w.length), 0);

  const getRank = (pts: number) => {
    if (pts >= 40) return 'Genius';
    if (pts >= 25) return 'Amazing';
    if (pts >= 15) return 'Great';
    if (pts >= 8) return 'Solid';
    return 'Moving Up';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
      <div className="bg-white w-full max-w-md rounded-lg shadow-2xl border border-gray-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-gray-200">
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-extrabold text-base tracking-wider text-black">SPELLING BEE</span>
              <span className="text-[10px] bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded-full">
                {getRank(score)} ({score} pts)
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-500 hover:text-black rounded hover:bg-gray-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Toast */}
        {message && (
          <div className="absolute top-16 left-1/2 -translate-x-1/2 z-20 bg-black text-white px-3 py-1.5 rounded text-xs font-bold shadow-lg">
            {message}
          </div>
        )}

        {/* Content */}
        <div className="p-4 flex-1 overflow-y-auto flex flex-col items-center">
          {/* Progress Bar */}
          <div className="w-full mb-4">
            <div className="flex justify-between text-[11px] text-gray-500 mb-1">
              <span>Beginner</span>
              <span className="font-bold text-black">{getRank(score)}</span>
              <span>Genius (40)</span>
            </div>
            <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-amber-400 transition-all duration-300"
                style={{ width: `${Math.min(100, (score / 40) * 100)}%` }}
              />
            </div>
          </div>

          {/* Input field */}
          <div className="h-12 flex items-center justify-center text-2xl font-bold tracking-widest text-black mb-4">
            {currentInput ? (
              <span>
                {currentInput.split('').map((char, i) => (
                  <span key={i} className={char === CENTER_LETTER ? 'text-amber-500 font-black' : ''}>
                    {char}
                  </span>
                ))}
              </span>
            ) : (
              <span className="text-gray-300 text-sm font-normal">Type or click letters</span>
            )}
          </div>

          {/* Honeycomb visual */}
          <div className="relative w-56 h-56 flex items-center justify-center mb-6">
            {/* Center Yellow Hex */}
            <button
              onClick={() => handleAddLetter(CENTER_LETTER)}
              className="absolute z-10 w-16 h-16 rounded-2xl bg-amber-400 hover:bg-amber-300 active:scale-95 text-black font-extrabold text-2xl flex items-center justify-center shadow-md transition"
            >
              {CENTER_LETTER}
            </button>

            {/* 6 Outer Gray Hexes */}
            {letters.map((letter, idx) => {
              const angle = (idx * 60 - 90) * (Math.PI / 180);
              const radius = 64; // px from center
              const x = Math.round(Math.cos(angle) * radius);
              const y = Math.round(Math.sin(angle) * radius);

              return (
                <button
                  key={letter + idx}
                  onClick={() => handleAddLetter(letter)}
                  style={{ transform: `translate(${x}px, ${y}px)` }}
                  className="absolute w-14 h-14 rounded-2xl bg-[#e6e6e6] hover:bg-[#d8d8d8] active:scale-95 text-black font-bold text-xl flex items-center justify-center shadow-sm transition"
                >
                  {letter}
                </button>
              );
            })}
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3 mb-5">
            <button
              onClick={handleDelete}
              className="border border-gray-300 hover:border-black text-xs font-bold px-4 py-2 rounded-full transition"
            >
              Delete
            </button>
            <button
              onClick={handleShuffle}
              className="border border-gray-300 hover:border-black p-2.5 rounded-full transition"
              title="Shuffle letters"
            >
              <Shuffle className="w-4 h-4" />
            </button>
            <button
              onClick={handleSubmit}
              className="bg-black text-white hover:bg-gray-800 text-xs font-bold px-5 py-2 rounded-full transition"
            >
              Enter
            </button>
          </div>

          {/* Found words drawer */}
          <div className="w-full border-t border-gray-200 pt-3">
            <div className="text-xs font-bold text-gray-700 mb-2">
              You found {foundWords.length} words:
            </div>
            <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
              {foundWords.map(w => (
                <span
                  key={w}
                  className="bg-gray-100 text-gray-800 text-xs px-2.5 py-1 rounded border border-gray-200 font-mono font-medium"
                >
                  {w}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 py-2 bg-gray-50 border-t border-gray-200 text-center text-[11px] text-gray-500">
          The New York Times Games • Spelling Bee Daily
        </div>
      </div>
    </div>
  );
};
