import React, { useState } from 'react';
import { Activity, ShieldCheck, Gauge } from 'lucide-react';

interface TechnicalGaugeProps {
  rating: 'Strong Buy' | 'Buy' | 'Neutral' | 'Sell' | 'Strong Sell';
  symbol: string;
  isDark: boolean;
}

export const TechnicalGauge: React.FC<TechnicalGaugeProps> = ({ rating, symbol, isDark }) => {
  const [timeframe, setTimeframe] = useState<'1m' | '5m' | '1h' | '1D' | '1W'>('1D');

  const ratingValues = {
    'Strong Sell': { deg: -68, label: 'Strong Sell', color: '#f23645', osc: { buy: 1, neutral: 8, sell: 2 }, ma: { buy: 0, neutral: 1, sell: 14 } },
    'Sell': { deg: -35, label: 'Sell', color: '#f23645', osc: { buy: 2, neutral: 8, sell: 1 }, ma: { buy: 2, neutral: 2, sell: 11 } },
    'Neutral': { deg: 0, label: 'Neutral', color: '#787b86', osc: { buy: 2, neutral: 9, sell: 0 }, ma: { buy: 6, neutral: 3, sell: 6 } },
    'Buy': { deg: 35, label: 'Buy', color: '#089981', osc: { buy: 3, neutral: 7, sell: 1 }, ma: { buy: 12, neutral: 1, sell: 2 } },
    'Strong Buy': { deg: 68, label: 'Strong Buy', color: '#089981', osc: { buy: 4, neutral: 6, sell: 1 }, ma: { buy: 14, neutral: 1, sell: 0 } }
  };

  const current = ratingValues[rating] || ratingValues['Buy'];

  return (
    <div
      className={`p-4 rounded-lg border flex flex-col justify-between ${
        isDark ? 'bg-[#1e222d] border-[#2a2e39]' : 'bg-white border-[#e0e3eb]'
      }`}
    >
      <div className="flex items-center justify-between border-b pb-2 mb-3 border-gray-500/20">
        <div className="flex items-center space-x-2">
          <Gauge className="w-4 h-4 text-[#2962ff]" />
          <h4 className="text-xs font-bold uppercase tracking-wider">Technical Analysis</h4>
        </div>
        <div className="flex space-x-1 text-[10px] font-bold font-mono">
          {(['1m', '5m', '1h', '1D', '1W'] as const).map(tf => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`px-1.5 py-0.5 rounded ${
                timeframe === tf
                  ? 'bg-[#2962ff] text-white'
                  : 'text-[#787b86] hover:text-white'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      {/* Speedometer Arc Visual */}
      <div className="relative flex flex-col items-center justify-center my-2">
        <div className="relative w-48 h-24 overflow-hidden flex items-end justify-center">
          {/* Half circle arc */}
          <div className="w-48 h-48 rounded-full border-[10px] border-t-red-500 border-r-emerald-500 border-b-transparent border-l-red-500 transform rotate-45" />

          {/* Needle */}
          <div
            className="absolute bottom-0 w-1 h-20 bg-white origin-bottom transition-transform duration-700 ease-out shadow-md"
            style={{ transform: `rotate(${current.deg}deg)` }}
          />
          {/* Pivot dot */}
          <div className="absolute bottom-0 w-4 h-4 rounded-full bg-white shadow-md z-10" />
        </div>

        {/* Labels under dial */}
        <div className="w-full flex justify-between text-[9px] font-bold text-gray-500 px-2 mt-1 uppercase">
          <span className="text-red-500">Strong Sell</span>
          <span>Neutral</span>
          <span className="text-emerald-500">Strong Buy</span>
        </div>

        <div className="mt-2 text-center">
          <span className="text-xs font-black uppercase tracking-wider" style={{ color: current.color }}>
            {current.label}
          </span>
          <span className="text-[10px] text-[#787b86] block font-mono">Summary for {symbol}</span>
        </div>
      </div>

      {/* Breakdown Metrics */}
      <div className="grid grid-cols-2 gap-2 text-xs pt-3 border-t border-gray-500/20 font-mono-num">
        <div className={`p-2 rounded text-center ${isDark ? 'bg-[#131722]' : 'bg-slate-50'}`}>
          <span className="text-[10px] text-gray-400 block font-sans">Oscillators</span>
          <div className="text-[11px] font-bold mt-0.5 space-x-1.5">
            <span className="text-red-400">{current.osc.sell} Sell</span>
            <span className="text-gray-400">{current.osc.neutral} Neut</span>
            <span className="text-emerald-400">{current.osc.buy} Buy</span>
          </div>
        </div>
        <div className={`p-2 rounded text-center ${isDark ? 'bg-[#131722]' : 'bg-slate-50'}`}>
          <span className="text-[10px] text-gray-400 block font-sans">Moving Averages</span>
          <div className="text-[11px] font-bold mt-0.5 space-x-1.5">
            <span className="text-red-400">{current.ma.sell} Sell</span>
            <span className="text-emerald-400">{current.ma.buy} Buy</span>
          </div>
        </div>
      </div>
    </div>
  );
};
