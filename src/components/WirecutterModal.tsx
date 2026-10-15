import React from 'react';
import { X, Check, Star, ExternalLink, ShieldCheck } from 'lucide-react';
import { WIRECUTTER_ITEMS } from '../data/newsData';

interface WirecutterModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedId?: string;
}

export const WirecutterModal: React.FC<WirecutterModalProps> = ({ isOpen, onClose, selectedId }) => {
  if (!isOpen) return null;

  const currentItem = WIRECUTTER_ITEMS.find(item => item.id === selectedId) || WIRECUTTER_ITEMS[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
      <div className="bg-white w-full max-w-xl rounded-xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Wirecutter Header */}
        <div className="bg-[#121212] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="font-extrabold tracking-widest text-sm uppercase">Wirecutter</span>
            <span className="text-[10px] bg-[#333] text-gray-300 px-2 py-0.5 rounded font-mono">
              A New York Times Company
            </span>
          </div>
          <button onClick={onClose} className="p-1 text-gray-400 hover:text-white rounded">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-nytGold block mb-1">
              Tested &amp; Trusted Review
            </span>
            <h2 className="nyt-serif text-2xl font-bold text-black">{currentItem.title}</h2>
            <p className="text-xs text-gray-500 mt-1">Updated after 120+ hours of lab and in-home testing.</p>
          </div>

          {/* Top Pick Highlight Card */}
          <div className="bg-amber-50/50 border-2 border-amber-200 rounded-lg p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="bg-nytBlack text-white text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded">
                Our Pick
              </span>
              <div className="flex items-center space-x-1 text-amber-700 text-xs font-bold">
                <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                <span>Score: {currentItem.rating}</span>
              </div>
            </div>
            <h3 className="text-lg font-bold text-black">{currentItem.pick}</h3>
            <p className="nyt-serif text-sm text-gray-700 mt-2 leading-relaxed">
              {currentItem.summary}
            </p>

            <div className="mt-4 pt-3 border-t border-amber-200/80 flex items-center justify-between text-xs">
              <span className="text-gray-500 font-medium">Verified by Wirecutter Lab Staff</span>
              <button
                onClick={() => alert(`Redirecting to verified retailer for ${currentItem.pick}`)}
                className="bg-black hover:bg-gray-800 text-white font-bold px-3 py-1.5 rounded flex items-center space-x-1.5 text-xs transition"
              >
                <span>Check Prices</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Testing methodology badge */}
          <div className="grid grid-cols-3 gap-2 text-center text-xs border border-gray-200 rounded-lg p-3 bg-gray-50">
            <div>
              <span className="font-black text-sm text-black block">120+</span>
              <span className="text-[10px] text-gray-500">Hours Lab Tested</span>
            </div>
            <div>
              <span className="font-black text-sm text-black block">18</span>
              <span className="text-[10px] text-gray-500">Models Compared</span>
            </div>
            <div>
              <span className="font-black text-sm text-black block">100%</span>
              <span className="text-[10px] text-gray-500">Editorial Independence</span>
            </div>
          </div>

          {/* Other Tested Categories */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-black mb-2">Other Recommended Guides</h4>
            <div className="space-y-2">
              {WIRECUTTER_ITEMS.map(item => (
                <div
                  key={item.id}
                  className={`p-2.5 rounded border text-xs cursor-pointer flex items-center justify-between transition ${
                    item.id === currentItem.id ? 'border-black bg-gray-50' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <span className="font-semibold text-black">{item.title}</span>
                  <span className="text-gray-500 text-[11px] font-mono">{item.pick}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-gray-50 border-t border-gray-200 flex items-center justify-between text-[11px] text-gray-500">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> Wirecutter purchases are independently vetted.
          </span>
          <button onClick={onClose} className="font-bold text-black hover:underline">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
