import React, { useState } from 'react';
import { X, RotateCcw, Shuffle } from 'lucide-react';

interface ConnectionsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Category {
  name: string;
  items: string[];
  color: string;
  bgClass: string;
}

const CATEGORIES: Category[] = [
  {
    name: 'THINGS ASSOCIATED WITH JOURNALISM',
    items: ['BYLINE', 'DEK', 'LEAD', 'MASTHEAD'],
    color: '#f9df6d',
    bgClass: 'bg-[#f9df6d] text-black'
  },
  {
    name: 'TYPES OF NEWSPAPER SECTIONS',
    items: ['OPINION', 'SPORTS', 'METRO', 'STYLE'],
    color: '#a0c35a',
    bgClass: 'bg-[#a0c35a] text-black'
  },
  {
    name: 'WORDS BEFORE "POLL"',
    items: ['EXIT', 'STRAW', 'OPINION', 'TRACKING'].map(w => w === 'OPINION' ? 'GALLUP' : w),
    color: '#b0c4de',
    bgClass: 'bg-[#b0c4de] text-black'
  },
  {
    name: 'PUNCTUATION MARKS',
    items: ['COMMA', 'COLON', 'DASH', 'PERIOD'],
    color: '#ba81c5',
    bgClass: 'bg-[#ba81c5] text-white'
  }
];

export const ConnectionsModal: React.FC<ConnectionsModalProps> = ({ isOpen, onClose }) => {
  const [selected, setSelected] = useState<string[]>([]);
  const [solvedCategories, setSolvedCategories] = useState<Category[]>([]);
  const [mistakesRemaining, setMistakesRemaining] = useState<number>(4);
  const [items, setItems] = useState<string[]>(() => {
    return CATEGORIES.flatMap(c => c.items).sort(() => Math.random() - 0.5);
  });
  const [message, setMessage] = useState<string>('');

  if (!isOpen) return null;

  const showToast = (msg: string) => {
    setMessage(msg);
    setTimeout(() => setMessage(''), 2000);
  };

  const handleToggle = (word: string) => {
    if (selected.includes(word)) {
      setSelected(selected.filter(w => w !== word));
    } else {
      if (selected.length < 4) {
        setSelected([...selected, word]);
      }
    }
  };

  const shuffleItems = () => {
    setItems([...items].sort(() => Math.random() - 0.5));
  };

  const handleSubmit = () => {
    if (selected.length !== 4) return;

    // Check if matching any category
    const foundCategory = CATEGORIES.find(cat =>
      selected.every(word => cat.items.includes(word))
    );

    if (foundCategory) {
      setSolvedCategories(prev => [...prev, foundCategory]);
      setItems(prev => prev.filter(w => !selected.includes(w)));
      setSelected([]);
      showToast('Category Solved! 🎉');
    } else {
      setMistakesRemaining(prev => Math.max(0, prev - 1));
      showToast('Incorrect group');
      if (mistakesRemaining - 1 === 0) {
        showToast('Game over!');
      }
    }
  };

  const resetGame = () => {
    setSolvedCategories([]);
    setSelected([]);
    setMistakesRemaining(4);
    setItems(CATEGORIES.flatMap(c => c.items).sort(() => Math.random() - 0.5));
    setMessage('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
      <div className="bg-white w-full max-w-md rounded-lg shadow-2xl border border-gray-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-gray-200">
          <div>
            <span className="font-extrabold text-base tracking-wider text-black">CONNECTIONS</span>
            <p className="text-[11px] text-gray-500">Group words that share a common thread</p>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={resetGame}
              title="Reset Puzzle"
              className="p-1.5 text-gray-500 hover:text-black rounded hover:bg-gray-100 transition"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-gray-500 hover:text-black rounded hover:bg-gray-100 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Toast */}
        {message && (
          <div className="absolute top-16 left-1/2 -translate-x-1/2 z-20 bg-black text-white px-3 py-1.5 rounded text-xs font-bold shadow-lg">
            {message}
          </div>
        )}

        {/* Content */}
        <div className="p-4 flex-1 overflow-y-auto">
          {/* Solved Groups */}
          <div className="space-y-2 mb-3">
            {solvedCategories.map(cat => (
              <div
                key={cat.name}
                className={`p-3 rounded-md text-center ${cat.bgClass} animate-fade-in`}
              >
                <div className="font-extrabold text-xs tracking-wider uppercase">{cat.name}</div>
                <div className="text-[11px] font-medium tracking-wide mt-0.5">{cat.items.join(', ')}</div>
              </div>
            ))}
          </div>

          {/* Grid of Remaining Words */}
          {items.length > 0 && (
            <div className="grid grid-cols-4 gap-2 mb-4">
              {items.map(word => {
                const isSelected = selected.includes(word);
                return (
                  <button
                    key={word}
                    onClick={() => handleToggle(word)}
                    className={`h-16 rounded font-bold text-xs uppercase px-1 text-center transition-all flex items-center justify-center leading-tight ${
                      isSelected
                        ? 'bg-[#5a594e] text-white scale-[0.98]'
                        : 'bg-[#efefe6] text-black hover:bg-[#e2e2d8]'
                    }`}
                  >
                    {word}
                  </button>
                );
              })}
            </div>
          )}

          {/* Mistakes tracker */}
          <div className="flex items-center justify-center space-x-1.5 my-3 text-xs text-gray-600">
            <span>Mistakes remaining:</span>
            <div className="flex space-x-1">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className={`w-2.5 h-2.5 rounded-full ${
                    i < mistakesRemaining ? 'bg-[#5a594e]' : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex justify-center gap-2 mt-4">
            <button
              onClick={shuffleItems}
              disabled={items.length === 0}
              className="border border-gray-400 hover:border-black text-xs font-bold px-3 py-2 rounded-full flex items-center gap-1 transition disabled:opacity-40"
            >
              <Shuffle className="w-3.5 h-3.5" />
              Shuffle
            </button>
            <button
              onClick={() => setSelected([])}
              disabled={selected.length === 0}
              className="border border-gray-400 hover:border-black text-xs font-bold px-4 py-2 rounded-full transition disabled:opacity-40"
            >
              Deselect all
            </button>
            <button
              onClick={handleSubmit}
              disabled={selected.length !== 4}
              className="bg-black text-white hover:bg-gray-800 disabled:bg-gray-300 text-xs font-bold px-5 py-2 rounded-full transition"
            >
              Submit
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 py-2 bg-gray-50 border-t border-gray-200 text-center text-[11px] text-gray-500">
          The New York Times Connections • Puzzle #491
        </div>
      </div>
    </div>
  );
};
