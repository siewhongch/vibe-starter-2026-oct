import React, { useState, useEffect } from 'react';
import { X, RotateCcw, Share2, Check, Sparkles } from 'lucide-react';

interface WordleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TARGET_WORD = 'PRESS';
const VALID_WORDS = ['PRESS', 'TIMES', 'MEDIA', 'PRINT', 'PAPER', 'STORY', 'DAILY', 'NEWSY', 'WORDS', 'SMART', 'CLERK', 'JUDGE', 'POLLS', 'VOTER'];

export const WordleModal: React.FC<WordleModalProps> = ({ isOpen, onClose }) => {
  const [guesses, setGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState<string>('');
  const [gameStatus, setGameStatus] = useState<'playing' | 'won' | 'lost'>('playing');
  const [message, setMessage] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameStatus !== 'playing') return;

      if (e.key === 'Enter') {
        handleSubmitGuess();
      } else if (e.key === 'Backspace') {
        setCurrentGuess(prev => prev.slice(0, -1));
      } else if (/^[a-zA-Z]$/.test(e.key) && currentGuess.length < 5) {
        setCurrentGuess(prev => (prev + e.key.toUpperCase()).slice(0, 5));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentGuess, gameStatus, guesses]);

  if (!isOpen) return null;

  const showToast = (msg: string) => {
    setMessage(msg);
    setTimeout(() => setMessage(''), 2500);
  };

  const handleSubmitGuess = () => {
    if (currentGuess.length !== 5) {
      showToast('Not enough letters');
      return;
    }

    const newGuesses = [...guesses, currentGuess];
    setGuesses(newGuesses);

    if (currentGuess === TARGET_WORD) {
      setGameStatus('won');
      showToast('Splendid! 🎯');
    } else if (newGuesses.length >= 6) {
      setGameStatus('lost');
      showToast(`The word was ${TARGET_WORD}`);
    }

    setCurrentGuess('');
  };

  const handleKeyClick = (char: string) => {
    if (gameStatus !== 'playing') return;
    if (char === 'ENTER') {
      handleSubmitGuess();
    } else if (char === 'DEL') {
      setCurrentGuess(prev => prev.slice(0, -1));
    } else if (currentGuess.length < 5) {
      setCurrentGuess(prev => (prev + char).slice(0, 5));
    }
  };

  const getLetterStatus = (letter: string, index: number, word: string) => {
    if (word[index] === TARGET_WORD[index]) return 'bg-[#6aaa64] text-white border-[#6aaa64]';
    if (TARGET_WORD.includes(letter)) return 'bg-[#c9b458] text-white border-[#c9b458]';
    return 'bg-[#787c7e] text-white border-[#787c7e]';
  };

  const getKeyColor = (key: string) => {
    let color = 'bg-[#d3d6da] text-[#1a1a1b] hover:bg-[#bbb]';
    for (const g of guesses) {
      for (let i = 0; i < 5; i++) {
        if (g[i] === key) {
          if (TARGET_WORD[i] === key) return 'bg-[#6aaa64] text-white';
          if (TARGET_WORD.includes(key) && color !== 'bg-[#6aaa64] text-white') {
            color = 'bg-[#c9b458] text-white';
          } else if (!TARGET_WORD.includes(key)) {
            color = 'bg-[#787c7e] text-white';
          }
        }
      }
    }
    return color;
  };

  const resetGame = () => {
    setGuesses([]);
    setCurrentGuess('');
    setGameStatus('playing');
    setMessage('');
  };

  const shareScore = () => {
    const text = `The New York Times Wordle ${gameStatus === 'won' ? guesses.length : 'X'}/6\n\n🟩🟩🟩🟩🟩`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    showToast('Copied results to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };

  const keyboardRows = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'DEL']
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
      <div className="bg-white w-full max-w-md rounded-lg shadow-2xl border border-gray-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <span className="font-extrabold text-base tracking-wider text-black">WORDLE</span>
            <span className="text-[10px] font-semibold bg-gray-100 text-gray-700 px-1.5 py-0.5 rounded">OCT 14</span>
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

        {/* Toast alert */}
        {message && (
          <div className="absolute top-16 left-1/2 -translate-x-1/2 z-20 bg-black text-white px-3 py-1.5 rounded text-xs font-bold shadow-lg">
            {message}
          </div>
        )}

        {/* Wordle Grid */}
        <div className="flex-1 overflow-y-auto p-4 flex flex-col items-center justify-center">
          <div className="grid grid-rows-6 gap-1.5 mb-4">
            {Array.from({ length: 6 }).map((_, rowIndex) => {
              const rowWord = guesses[rowIndex] || (rowIndex === guesses.length ? currentGuess.padEnd(5, ' ') : '     ');
              const isGuessedRow = rowIndex < guesses.length;

              return (
                <div key={rowIndex} className="grid grid-cols-5 gap-1.5">
                  {Array.from({ length: 5 }).map((__, colIndex) => {
                    const char = rowWord[colIndex]?.trim() || '';
                    let tileClass = 'border-2 border-[#d3d6da] text-black bg-white';

                    if (isGuessedRow && char) {
                      tileClass = getLetterStatus(char, colIndex, guesses[rowIndex]);
                    } else if (char) {
                      tileClass = 'border-2 border-[#878a8c] text-black font-bold scale-[1.03] transition-transform';
                    }

                    return (
                      <div
                        key={colIndex}
                        className={`w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center text-xl font-bold uppercase transition-all duration-300 ${tileClass}`}
                      >
                        {char}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>

          {gameStatus !== 'playing' && (
            <div className="w-full max-w-xs mb-3 bg-gray-50 p-3 rounded-lg border border-gray-200 text-center animate-fade-in">
              <h4 className="font-bold text-sm text-black flex items-center justify-center gap-1.5">
                <Sparkles className="w-4 h-4 text-nytGold" />
                {gameStatus === 'won' ? `Solved in ${guesses.length}/6 attempts!` : 'Better luck tomorrow!'}
              </h4>
              <p className="text-xs text-gray-500 mt-1">Word: <span className="font-bold text-black">{TARGET_WORD}</span></p>
              <div className="mt-2.5 flex justify-center gap-2">
                <button
                  onClick={shareScore}
                  className="bg-[#6aaa64] text-white hover:bg-[#5b9556] text-xs font-bold px-3 py-1.5 rounded flex items-center gap-1.5 transition"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Share2 className="w-3.5 h-3.5" />}
                  {copied ? 'Copied' : 'Share Result'}
                </button>
                <button
                  onClick={resetGame}
                  className="border border-gray-300 hover:border-black text-xs font-bold px-3 py-1.5 rounded transition"
                >
                  Play Again
                </button>
              </div>
            </div>
          )}

          {/* On-screen Keyboard */}
          <div className="w-full max-w-md px-1 space-y-1.5">
            {keyboardRows.map((row, rIdx) => (
              <div key={rIdx} className="flex justify-center gap-1">
                {row.map(key => {
                  const isWide = key === 'ENTER' || key === 'DEL';
                  return (
                    <button
                      key={key}
                      onClick={() => handleKeyClick(key)}
                      className={`h-11 rounded font-bold text-xs uppercase flex items-center justify-center transition-colors active:scale-95 ${
                        isWide ? 'px-2.5 min-w-[50px] text-[10px]' : 'w-8 sm:w-9'
                      } ${getKeyColor(key)}`}
                    >
                      {key}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 py-2 bg-gray-50 border-t border-gray-200 text-center text-[11px] text-gray-500">
          The New York Times Games • Edit Edition
        </div>
      </div>
    </div>
  );
};
