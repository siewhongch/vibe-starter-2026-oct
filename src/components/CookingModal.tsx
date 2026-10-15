import React, { useState } from 'react';
import { X, Clock, Users, ChefHat, Check, Bookmark, Play, Pause, RotateCcw } from 'lucide-react';

interface CookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CookingModal: React.FC<CookingModalProps> = ({ isOpen, onClose }) => {
  const [servings, setServings] = useState<number>(4);
  const [checkedIngredients, setCheckedIngredients] = useState<Record<number, boolean>>({});
  const [isCookMode, setIsCookMode] = useState<boolean>(false);
  const [timerSeconds, setTimerSeconds] = useState<number>(15 * 60); // 15 min bake timer
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);

  React.useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => setTimerSeconds(t => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds]);

  if (!isOpen) return null;

  const baseIngredients = [
    { qty: 1, unit: 'lb', name: 'Ground meat of choice (beef, pork, turkey, lamb, or meatless)', id: 1 },
    { qty: 0.5, unit: 'cup', name: 'Panko or plain breadcrumbs', id: 2 },
    { qty: 0.33, unit: 'cup', name: 'Whole milk or unsweetened almond milk', id: 3 },
    { qty: 1, unit: '', name: 'Large egg, lightly beaten', id: 4 },
    { qty: 0.33, unit: 'cup', name: 'Finely grated parmesan or pecorino', id: 5 },
    { qty: 2, unit: 'cloves', name: 'Garlic, finely grated or minced', id: 6 },
    { qty: 1, unit: 'tsp', name: 'Kosher salt and 1/2 tsp freshly ground black pepper', id: 7 },
    { qty: 2, unit: 'cups', name: 'Warm marinara sauce or roasted garlic pan jus', id: 8 }
  ];

  const steps = [
    'Heat oven to 425°F (220°C). Line a rimmed baking sheet with parchment paper.',
    'In a large mixing bowl, stir breadcrumbs and milk together; let rest for 3 minutes until completely softened into a paste (panade).',
    'Add beaten egg, grated parmesan, garlic, salt, and pepper to the panade, stirring until smoothly combined.',
    'Add the ground meat and gently toss with your fingertips until just combined. Do not overwork the meat or the meatballs will turn tough.',
    'Shape into 12 to 14 golf-ball sized rounds (about 2 tablespoons each) and place 1 inch apart on the baking sheet.',
    'Bake for 14 to 16 minutes until browned on the exterior and cooked through. Transfer directly into warm sauce and serve immediately.'
  ];

  const toggleCheck = (id: number) => {
    setCheckedIngredients(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const scale = servings / 4;

  const formatTimer = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
      <div className="bg-white w-full max-w-2xl rounded-xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="bg-[#b33d26] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="font-extrabold tracking-wider text-sm uppercase">NYT Cooking</span>
            <span className="text-orange-200 text-xs">★ Easy Weeknight Classic</span>
          </div>
          <button onClick={onClose} className="p-1 text-orange-100 hover:text-white rounded">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Recipe Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-orange-900 bg-orange-100 px-2 py-0.5 rounded">
              FEATURED RECIPE
            </span>
            <h1 className="nyt-serif text-3xl font-bold text-black mt-2 leading-tight">
              Meatballs With Any Meat: The Flexible Weeknight Dinner Formula
            </h1>
            <p className="nyt-serif text-base text-gray-700 mt-2">
              By Ali Slagle • Adapted for effortless weeknight cooking
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-3 bg-gray-50 p-3 rounded-lg border border-gray-200 text-xs">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-gray-600" />
              <div>
                <span className="text-gray-500 block text-[10px] uppercase font-bold">Total Time</span>
                <span className="font-bold text-black">25 Minutes</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4 text-gray-600" />
              <div>
                <span className="text-gray-500 block text-[10px] uppercase font-bold">Yield</span>
                <span className="font-bold text-black">{servings} Servings</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <ChefHat className="w-4 h-4 text-gray-600" />
              <div>
                <span className="text-gray-500 block text-[10px] uppercase font-bold">Difficulty</span>
                <span className="font-bold text-black">Easy</span>
              </div>
            </div>
          </div>

          {/* Servings Adjuster */}
          <div className="flex items-center justify-between border-b border-gray-200 pb-3">
            <h3 className="font-bold text-sm text-black">Ingredients</h3>
            <div className="flex items-center space-x-2 text-xs">
              <span className="text-gray-500">Servings:</span>
              <button
                onClick={() => setServings(s => Math.max(2, s - 2))}
                className="w-6 h-6 border rounded font-bold hover:bg-gray-100 flex items-center justify-center"
              >
                -
              </button>
              <span className="font-bold text-black w-4 text-center">{servings}</span>
              <button
                onClick={() => setServings(s => Math.min(12, s + 2))}
                className="w-6 h-6 border rounded font-bold hover:bg-gray-100 flex items-center justify-center"
              >
                +
              </button>
            </div>
          </div>

          {/* Ingredients list with checkboxes */}
          <div className="space-y-2">
            {baseIngredients.map(ing => {
              const isChecked = !!checkedIngredients[ing.id];
              const scaledQty = (ing.qty * scale).toFixed(ing.qty * scale % 1 === 0 ? 0 : 2);
              return (
                <div
                  key={ing.id}
                  onClick={() => toggleCheck(ing.id)}
                  className={`flex items-start space-x-2.5 p-2 rounded cursor-pointer transition select-none ${
                    isChecked ? 'bg-emerald-50 text-gray-400 line-through' : 'hover:bg-gray-50 text-gray-800'
                  }`}
                >
                  <div
                    className={`w-4 h-4 mt-0.5 rounded border flex items-center justify-center shrink-0 ${
                      isChecked ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-gray-300 bg-white'
                    }`}
                  >
                    {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                  <span className="text-xs">
                    <span className="font-bold text-black mr-1">
                      {scaledQty} {ing.unit}
                    </span>
                    {ing.name}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Preparation Steps */}
          <div>
            <div className="flex items-center justify-between mb-3 border-b border-gray-200 pb-2">
              <h3 className="font-bold text-sm text-black">Preparation</h3>
              <button
                onClick={() => setIsCookMode(!isCookMode)}
                className={`text-xs px-2.5 py-1 rounded font-bold transition flex items-center space-x-1 ${
                  isCookMode ? 'bg-[#b33d26] text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                <ChefHat className="w-3.5 h-3.5" />
                <span>{isCookMode ? 'Exit Cook Mode' : 'Start Cook Mode'}</span>
              </button>
            </div>

            {/* Cook mode bake timer bar */}
            {isCookMode && (
              <div className="bg-orange-50 border border-orange-200 p-3 rounded-lg mb-4 flex items-center justify-between animate-fade-in">
                <div>
                  <span className="text-xs font-bold text-orange-950 block">Oven Bake Timer (15 min)</span>
                  <span className="font-mono text-xl font-black text-[#b33d26]">
                    {formatTimer(timerSeconds)}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setIsTimerRunning(!isTimerRunning)}
                    className="bg-[#b33d26] hover:bg-orange-800 text-white p-2 rounded-full transition"
                  >
                    {isTimerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={() => {
                      setIsTimerRunning(false);
                      setTimerSeconds(15 * 60);
                    }}
                    className="p-2 border border-gray-300 rounded-full hover:bg-gray-100"
                  >
                    <RotateCcw className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>
            )}

            <ol className="space-y-4 text-xs nyt-serif">
              {steps.map((st, i) => (
                <li key={i} className="flex space-x-3">
                  <span className="font-sans font-black text-sm text-[#b33d26] shrink-0 mt-0.5">
                    Step {i + 1}
                  </span>
                  <span className="text-gray-800 text-[14px] leading-relaxed">{st}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-gray-50 border-t border-gray-200 flex items-center justify-between text-xs">
          <span className="text-gray-500">NYT Cooking • Saved by 42,000 readers</span>
          <button onClick={onClose} className="font-bold text-black hover:underline">
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
