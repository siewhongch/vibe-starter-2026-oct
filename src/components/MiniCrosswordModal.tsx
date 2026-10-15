import React, { useState, useEffect } from 'react';
import { X, RotateCcw, CheckCircle, Clock } from 'lucide-react';

interface MiniCrosswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// 5x5 grid definition:
// S P E E D
// P A L E T
// A T O N E
// C O D E R
// E D G E S
// Black cells: none (pure 5x5) or simple layout
const SOLUTION = [
  ['T', 'I', 'M', 'E', 'S'],
  ['R', 'O', 'U', 'T', 'E'],
  ['U', 'N', 'I', 'O', 'N'],
  ['T', 'E', 'C', 'H', 'S'],
  ['H', 'Y', 'P', 'E', 'D']
];

const CLUES = {
  across: [
    { num: 1, text: 'The New York ___ (newspaper)', row: 0, col: 0, length: 5 },
    { num: 6, text: 'Path from A to B', row: 1, col: 0, length: 5 },
    { num: 7, text: 'Organized labor group', row: 2, col: 0, length: 5 },
    { num: 8, text: 'IT support staff, informally', row: 3, col: 0, length: 5 },
    { num: 9, text: 'Promoted enthusiastically', row: 4, col: 0, length: 5 }
  ],
  down: [
    { num: 1, text: 'Veracity or undeniable fact', row: 0, col: 0, length: 5 },
    { num: 2, text: 'Capital of Ukraine, or cryptocurrency term', row: 0, col: 1, length: 5 },
    { num: 3, text: 'Auditory sensors for podcasts', row: 0, col: 2, length: 5 },
    { num: 4, text: 'Subtle moral value or principle', row: 0, col: 3, length: 5 },
    { num: 5, text: 'Sent message via smartphone', row: 0, col: 4, length: 5 }
  ]
};

export const MiniCrosswordModal: React.FC<MiniCrosswordModalProps> = ({ isOpen, onClose }) => {
  const [grid, setGrid] = useState<string[][]>([
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', '']
  ]);
  const [activeCell, setActiveCell] = useState<{ r: number; c: number }>({ r: 0, c: 0 });
  const [direction, setDirection] = useState<'across' | 'down'>('across');
  const [seconds, setSeconds] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [showErrors, setShowErrors] = useState<boolean>(false);

  useEffect(() => {
    if (!isOpen || isCompleted) return;
    const interval = setInterval(() => setSeconds(s => s + 1), 1000);
    return () => clearInterval(interval);
  }, [isOpen, isCompleted]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (isCompleted) return;

      if (/^[a-zA-Z]$/.test(e.key)) {
        const char = e.key.toUpperCase();
        setGrid(prev => {
          const next = prev.map(row => [...row]);
          next[activeCell.r][activeCell.c] = char;
          return next;
        });

        // advance to next cell
        if (direction === 'across') {
          if (activeCell.c < 4) {
            setActiveCell({ r: activeCell.r, c: activeCell.c + 1 });
          }
        } else {
          if (activeCell.r < 4) {
            setActiveCell({ r: activeCell.r + 1, c: activeCell.c });
          }
        }
      } else if (e.key === 'Backspace') {
        setGrid(prev => {
          const next = prev.map(row => [...row]);
          if (next[activeCell.r][activeCell.c] !== '') {
            next[activeCell.r][activeCell.c] = '';
          } else {
            // move back
            if (direction === 'across' && activeCell.c > 0) {
              next[activeCell.r][activeCell.c - 1] = '';
              setActiveCell({ r: activeCell.r, c: activeCell.c - 1 });
            } else if (direction === 'down' && activeCell.r > 0) {
              next[activeCell.r - 1][activeCell.c] = '';
              setActiveCell({ r: activeCell.r - 1, c: activeCell.c });
            }
          }
          return next;
        });
      } else if (e.key === 'ArrowRight') {
        setActiveCell(p => ({ ...p, c: Math.min(4, p.c + 1) }));
      } else if (e.key === 'ArrowLeft') {
        setActiveCell(p => ({ ...p, c: Math.max(0, p.c - 1) }));
      } else if (e.key === 'ArrowDown') {
        setActiveCell(p => ({ ...p, r: Math.min(4, p.r + 1) }));
      } else if (e.key === 'ArrowUp') {
        setActiveCell(p => ({ ...p, r: Math.max(0, p.r - 1) }));
      } else if (e.key === ' ') {
        setDirection(d => (d === 'across' ? 'down' : 'across'));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, activeCell, direction, isCompleted]);

  // Check victory
  useEffect(() => {
    let complete = true;
    for (let r = 0; r < 5; r++) {
      for (let c = 0; c < 5; c++) {
        if (grid[r][c] !== SOLUTION[r][c]) {
          complete = false;
          break;
        }
      }
    }
    if (complete) {
      setIsCompleted(true);
    }
  }, [grid]);

  if (!isOpen) return null;

  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleCellClick = (r: number, c: number) => {
    if (activeCell.r === r && activeCell.c === c) {
      setDirection(d => (d === 'across' ? 'down' : 'across'));
    } else {
      setActiveCell({ r, c });
    }
  };

  const solveAutofill = () => {
    setGrid(SOLUTION.map(row => [...row]));
    setIsCompleted(true);
  };

  const resetPuzzle = () => {
    setGrid([
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', '']
    ]);
    setActiveCell({ r: 0, c: 0 });
    setSeconds(0);
    setIsCompleted(false);
    setShowErrors(false);
  };

  const currentAcrossClue = CLUES.across[activeCell.r];
  const currentDownClue = CLUES.down[activeCell.c];
  const activeClue = direction === 'across' ? currentAcrossClue : currentDownClue;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
      <div className="bg-white w-full max-w-lg rounded-lg shadow-2xl border border-gray-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Top Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <span className="font-extrabold text-base tracking-wider text-black">THE MINI</span>
            <div className="flex items-center space-x-1 text-xs text-gray-600 bg-gray-100 px-2 py-0.5 rounded font-mono">
              <Clock className="w-3.5 h-3.5" />
              <span>{formatTimer(seconds)}</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={solveAutofill}
              className="text-[11px] font-bold text-nytBlue hover:underline px-2 py-1"
            >
              Reveal
            </button>
            <button
              onClick={resetPuzzle}
              title="Reset Crossword"
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

        {/* Active Clue Bar */}
        <div className="bg-[#e6f3ff] px-4 py-2 text-xs font-semibold text-black border-b border-[#cde4f7] flex items-center justify-between">
          <div className="flex items-center space-x-2 truncate">
            <span className="font-bold text-nytBlue">{activeClue.num} {direction.toUpperCase()}:</span>
            <span className="truncate">{activeClue.text}</span>
          </div>
          <span className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">Space to toggle</span>
        </div>

        {/* Body Content */}
        <div className="p-4 overflow-y-auto flex-1 flex flex-col md:flex-row gap-5 items-center justify-center">
          {/* 5x5 Grid */}
          <div className="border-2 border-black bg-black p-0.5 select-none">
            <div className="grid grid-cols-5 gap-[1px] bg-black">
              {grid.map((row, r) =>
                row.map((cell, c) => {
                  const isSelected = activeCell.r === r && activeCell.c === c;
                  const isInWord = direction === 'across' ? activeCell.r === r : activeCell.c === c;
                  const isWrong = showErrors && cell && cell !== SOLUTION[r][c];

                  let cellBg = 'bg-white';
                  if (isSelected) cellBg = 'bg-[#ffda00]';
                  else if (isInWord) cellBg = 'bg-[#a7d8ff]';
                  else if (isWrong) cellBg = 'bg-red-100 text-red-700';

                  // Clue numbering
                  let clueNum = null;
                  if (r === 0) clueNum = c + 1;
                  else if (c === 0) clueNum = r + 5;

                  return (
                    <div
                      key={`${r}-${c}`}
                      onClick={() => handleCellClick(r, c)}
                      className={`relative w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center cursor-pointer font-bold text-xl uppercase ${cellBg}`}
                    >
                      {clueNum && (
                        <span className="absolute top-0.5 left-1 text-[9px] font-sans font-bold text-gray-600 leading-none pointer-events-none">
                          {clueNum}
                        </span>
                      )}
                      <span className="mt-1">{cell}</span>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Clues List */}
          <div className="w-full md:w-56 text-xs space-y-3">
            <div>
              <h5 className="font-black uppercase tracking-wider text-black border-b border-gray-300 pb-0.5 mb-1.5 text-[11px]">Across</h5>
              <ul className="space-y-1">
                {CLUES.across.map(clue => (
                  <li
                    key={clue.num}
                    onClick={() => { setActiveCell({ r: clue.row, c: clue.col }); setDirection('across'); }}
                    className={`cursor-pointer p-1 rounded transition text-[11px] ${
                      direction === 'across' && activeCell.r === clue.row ? 'bg-blue-50 font-bold text-nytBlue' : 'hover:bg-gray-100'
                    }`}
                  >
                    <span className="font-bold mr-1">{clue.num}</span> {clue.text}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h5 className="font-black uppercase tracking-wider text-black border-b border-gray-300 pb-0.5 mb-1.5 text-[11px]">Down</h5>
              <ul className="space-y-1">
                {CLUES.down.map(clue => (
                  <li
                    key={clue.num}
                    onClick={() => { setActiveCell({ r: clue.row, c: clue.col }); setDirection('down'); }}
                    className={`cursor-pointer p-1 rounded transition text-[11px] ${
                      direction === 'down' && activeCell.c === clue.col ? 'bg-blue-50 font-bold text-nytBlue' : 'hover:bg-gray-100'
                    }`}
                  >
                    <span className="font-bold mr-1">{clue.num}</span> {clue.text}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Win Banner */}
        {isCompleted && (
          <div className="bg-[#6aaa64] text-white px-4 py-3 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5" />
              <div>
                <p className="font-bold text-xs">Congratulations!</p>
                <p className="text-[11px] text-emerald-100">You solved the Mini in {formatTimer(seconds)}</p>
              </div>
            </div>
            <button
              onClick={resetPuzzle}
              className="bg-white text-[#6aaa64] hover:bg-gray-100 px-3 py-1 rounded text-xs font-bold transition"
            >
              Play Again
            </button>
          </div>
        )}

        {/* Footer */}
        <div className="px-4 py-2 bg-gray-50 border-t border-gray-200 text-center text-[11px] text-gray-500">
          The New York Times Games • Edited by Will Shortz
        </div>
      </div>
    </div>
  );
};
