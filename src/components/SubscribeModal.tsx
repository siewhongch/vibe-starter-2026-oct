import React, { useState } from 'react';
import { X, Check, ShieldCheck, Sparkles } from 'lucide-react';

interface SubscribeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubscribed: () => void;
}

export const SubscribeModal: React.FC<SubscribeModalProps> = ({ isOpen, onClose, onSubscribed }) => {
  const [selectedPlan, setSelectedPlan] = useState<'all-access' | 'news-only'>('all-access');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubscribe = () => {
    setIsSuccess(true);
    setTimeout(() => {
      onSubscribed();
      onClose();
      setIsSuccess(false);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
      <div className="bg-white w-full max-w-lg rounded-xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="relative bg-[#121212] text-white p-6 text-center">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1 text-gray-400 hover:text-white rounded transition"
          >
            <X className="w-5 h-5" />
          </button>
          <span className="font-masthead text-3xl tracking-tight block mb-2">The New York Times</span>
          <span className="text-[10px] uppercase tracking-widest text-amber-300 font-bold block mb-1">
            SPECIAL FALL INTRODUCTORY OFFER
          </span>
          <h2 className="nyt-serif text-2xl font-bold">Independent journalism for an informed life.</h2>
          <p className="text-xs text-gray-300 mt-1">
            Unlimited access on web, mobile, and audio apps.
          </p>
        </div>

        {/* Content */}
        <div className="p-6">
          {isSuccess ? (
            <div className="py-8 text-center animate-fade-in">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <Check className="w-6 h-6 stroke-[3]" />
              </div>
              <h3 className="text-lg font-bold text-black">Welcome to The New York Times!</h3>
              <p className="text-xs text-gray-600 mt-1">Your All-Access Digital Subscription is now active.</p>
            </div>
          ) : (
            <>
              {/* Plan Cards */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div
                  onClick={() => setSelectedPlan('all-access')}
                  className={`p-3.5 rounded-lg border-2 cursor-pointer transition relative ${
                    selectedPlan === 'all-access'
                      ? 'border-black bg-gray-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <span className="absolute -top-2.5 right-2 bg-nytGold text-white text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded">
                    BEST VALUE
                  </span>
                  <div className="text-xs font-bold text-black">All Access</div>
                  <div className="text-xl font-black text-black mt-1">$1<span className="text-xs font-normal text-gray-500">/week</span></div>
                  <div className="text-[10px] text-gray-500 mt-0.5">Billed as $4 every 4 weeks</div>
                  <ul className="mt-3 text-[11px] text-gray-600 space-y-1">
                    <li className="flex items-center gap-1 font-semibold text-black"><Check className="w-3 h-3 text-emerald-600" /> News &amp; Live Reports</li>
                    <li className="flex items-center gap-1 font-semibold text-black"><Check className="w-3 h-3 text-emerald-600" /> NYT Games (Wordle, Mini)</li>
                    <li className="flex items-center gap-1 font-semibold text-black"><Check className="w-3 h-3 text-emerald-600" /> NYT Cooking Recipes</li>
                    <li className="flex items-center gap-1 font-semibold text-black"><Check className="w-3 h-3 text-emerald-600" /> Wirecutter &amp; The Athletic</li>
                  </ul>
                </div>

                <div
                  onClick={() => setSelectedPlan('news-only')}
                  className={`p-3.5 rounded-lg border-2 cursor-pointer transition ${
                    selectedPlan === 'news-only'
                      ? 'border-black bg-gray-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-xs font-bold text-black">News Only</div>
                  <div className="text-xl font-black text-black mt-1">$0.75<span className="text-xs font-normal text-gray-500">/week</span></div>
                  <div className="text-[10px] text-gray-500 mt-0.5">Billed as $3 every 4 weeks</div>
                  <ul className="mt-3 text-[11px] text-gray-600 space-y-1">
                    <li className="flex items-center gap-1"><Check className="w-3 h-3 text-emerald-600" /> Daily Breaking News</li>
                    <li className="flex items-center gap-1"><Check className="w-3 h-3 text-emerald-600" /> Opinion &amp; Investigations</li>
                    <li className="flex items-center gap-1 text-gray-400">✕ Games &amp; Cooking excluded</li>
                  </ul>
                </div>
              </div>

              {/* Guarantees */}
              <div className="flex items-center space-x-2 text-[11px] text-gray-500 bg-gray-50 p-2.5 rounded border border-gray-100 mb-5">
                <ShieldCheck className="w-4 h-4 text-gray-700 shrink-0" />
                <span>Cancel online anytime with a single click. No hidden fees or long-term contracts.</span>
              </div>

              {/* Button */}
              <button
                onClick={handleSubscribe}
                className="w-full bg-nytBlue hover:bg-nytBlueHover text-white py-3 rounded-md font-bold text-sm tracking-wide transition flex items-center justify-center space-x-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Activate Subscription ($1/week)</span>
              </button>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-2.5 bg-gray-50 border-t border-gray-200 text-center text-[10px] text-gray-500">
          Special introductory rate applies for the first year. Terms apply.
        </div>
      </div>
    </div>
  );
};
