import React, { useState, useEffect } from 'react';
import { TICKER_TAPE, MarketSymbol } from '../data/marketData';
import { SparklineChart } from './SparklineChart';

interface TickerTapeProps {
  onSelectSymbol: (symbol: MarketSymbol) => void;
  isDark: boolean;
}

export const TickerTape: React.FC<TickerTapeProps> = ({ onSelectSymbol, isDark }) => {
  const [items, setItems] = useState<MarketSymbol[]>(TICKER_TAPE);
  const [flashingIndex, setFlashingIndex] = useState<number | null>(null);

  // Simulate real-time live price ticks every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const targetIdx = Math.floor(Math.random() * items.length);
      setItems(prev => {
        const next = [...prev];
        const item = { ...next[targetIdx] };
        const changeFactor = (Math.random() - 0.49) * 0.003;
        const newPrice = +(item.price * (1 + changeFactor)).toFixed(2);
        item.price = newPrice;
        next[targetIdx] = item;
        return next;
      });
      setFlashingIndex(targetIdx);
      setTimeout(() => setFlashingIndex(null), 800);
    }, 2800);

    return () => clearInterval(interval);
  }, [items.length]);

  // Duplicate items for continuous seamless loop
  const displayItems = [...items, ...items];

  return (
    <div
      className={`w-full overflow-hidden border-b select-none ${
        isDark ? 'bg-[#131722] border-[#2a2e39]' : 'bg-white border-[#e0e3eb]'
      }`}
    >
      <div className="animate-ticker flex items-center py-2">
        {displayItems.map((item, idx) => {
          const isPos = item.change >= 0;
          const isFlashing = flashingIndex === idx % items.length;

          return (
            <div
              key={`${item.symbol}-${idx}`}
              onClick={() => onSelectSymbol(item)}
              className={`flex items-center space-x-3 px-4 py-0.5 border-r cursor-pointer transition-colors duration-150 shrink-0 ${
                isDark
                  ? 'border-[#2a2e39] hover:bg-[#1e222d]'
                  : 'border-[#e0e3eb] hover:bg-slate-50'
              } ${isFlashing ? (isPos ? 'flash-green' : 'flash-red') : ''}`}
            >
              <div className="flex flex-col">
                <div className="flex items-center space-x-1.5">
                  <span className={`text-xs font-bold tracking-tight ${isDark ? 'text-white' : 'text-[#131722]'}`}>
                    {item.symbol}
                  </span>
                  <span className="text-[10px] text-[#787b86] uppercase font-mono">{item.exchange}</span>
                </div>
                <span className={`text-[11px] truncate max-w-[100px] ${isDark ? 'text-[#787b86]' : 'text-slate-500'}`}>
                  {item.name}
                </span>
              </div>

              <div className="text-right font-mono-num flex flex-col items-end">
                <span className={`text-xs font-semibold ${isDark ? 'text-white' : 'text-[#131722]'}`}>
                  {item.price > 1000
                    ? item.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                    : item.price.toFixed(item.price < 2 ? 4 : 2)}
                </span>
                <span
                  className={`text-[10px] font-bold ${
                    isPos ? 'text-[#089981]' : 'text-[#f23645]'
                  }`}
                >
                  {isPos ? '+' : ''}
                  {item.changePercent.toFixed(2)}%
                </span>
              </div>

              <div className="hidden sm:block">
                <SparklineChart data={item.sparkline} isPositive={isPos} width={55} height={20} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
