import React, { useState } from 'react';
import { X, Plus, Trash2, ArrowUpRight, ArrowDownRight, Star, TrendingUp } from 'lucide-react';
import { MarketSymbol, TICKER_TAPE, STOCKS_DATA } from '../data/marketData';

interface WatchlistSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  watchlistSymbols: string[];
  onSelectSymbol: (symbol: MarketSymbol) => void;
  onRemoveSymbol: (sym: string) => void;
  onAddSymbol: (sym: string) => void;
  isDark: boolean;
}

export const WatchlistSidebar: React.FC<WatchlistSidebarProps> = ({
  isOpen,
  onClose,
  watchlistSymbols,
  onSelectSymbol,
  onRemoveSymbol,
  onAddSymbol,
  isDark
}) => {
  const [newSymbolInput, setNewSymbolInput] = useState('');

  if (!isOpen) return null;

  // Resolve symbols
  const allKnown = [...TICKER_TAPE, ...STOCKS_DATA['large-cap'], ...STOCKS_DATA['top-gainers']];
  const items = watchlistSymbols.map(s => {
    return allKnown.find(item => item.symbol.toUpperCase() === s.toUpperCase()) || {
      symbol: s.toUpperCase(),
      name: `${s.toUpperCase()} Asset`,
      exchange: 'NASDAQ',
      category: 'stock' as const,
      price: 150.00,
      change: 2.50,
      changePercent: 1.69,
      rating: 'Buy' as const,
      sparkline: [148, 149, 150]
    };
  });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSymbolInput.trim()) {
      onAddSymbol(newSymbolInput.trim().toUpperCase());
      setNewSymbolInput('');
    }
  };

  return (
    <div
      className={`fixed top-0 right-0 bottom-0 w-80 z-40 border-l shadow-2xl flex flex-col transition-transform duration-300 ${
        isDark
          ? 'bg-[#1e222d] border-[#2a2e39] text-[#d1d4dc]'
          : 'bg-white border-[#e0e3eb] text-[#131722]'
      }`}
    >
      {/* Header */}
      <div className={`p-3.5 border-b flex items-center justify-between ${isDark ? 'border-[#2a2e39]' : 'border-[#e0e3eb]'}`}>
        <div className="flex items-center space-x-2">
          <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
          <h3 className="font-bold text-xs uppercase tracking-wider">Watchlist</h3>
          <span className="text-[10px] text-gray-500 font-mono">({items.length})</span>
        </div>
        <button onClick={onClose} className="p-1 text-gray-400 hover:text-white rounded">
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Add Symbol Input */}
      <form onSubmit={handleAdd} className={`p-2.5 border-b flex items-center gap-1.5 ${isDark ? 'border-[#2a2e39]' : 'border-[#e0e3eb]'}`}>
        <input
          type="text"
          placeholder="Add symbol (e.g. NVDA, BTCUSD)..."
          value={newSymbolInput}
          onChange={e => setNewSymbolInput(e.target.value)}
          className={`flex-1 px-2.5 py-1 text-xs rounded border uppercase font-mono ${
            isDark ? 'bg-[#131722] border-[#2a2e39] text-white' : 'bg-slate-50 border-[#e0e3eb] text-black'
          }`}
        />
        <button
          type="submit"
          className="bg-[#2962ff] hover:bg-[#2962ff]/85 text-white p-1 rounded transition"
          title="Add Symbol"
        >
          <Plus className="w-4 h-4" />
        </button>
      </form>

      {/* Watchlist Items */}
      <div className="flex-1 overflow-y-auto divide-y divide-gray-500/10">
        {items.map(item => {
          const isPos = item.change >= 0;
          return (
            <div
              key={item.symbol}
              onClick={() => onSelectSymbol(item)}
              className={`p-3 flex items-center justify-between cursor-pointer group transition ${
                isDark ? 'hover:bg-[#131722]' : 'hover:bg-slate-50'
              }`}
            >
              <div className="flex flex-col truncate max-w-[120px]">
                <div className="flex items-center space-x-1.5">
                  <span className={`text-xs font-bold ${isDark ? 'text-white' : 'text-black'}`}>
                    {item.symbol}
                  </span>
                  <span className="text-[9px] text-[#787b86] font-mono">{item.exchange}</span>
                </div>
                <span className="text-[10px] text-[#787b86] truncate">{item.name}</span>
              </div>

              <div className="flex items-center space-x-2.5">
                <div className="text-right font-mono-num">
                  <span className={`text-xs font-bold block ${isDark ? 'text-white' : 'text-black'}`}>
                    ${item.price.toFixed(item.price < 2 ? 4 : 2)}
                  </span>
                  <span className={`text-[10px] font-bold ${isPos ? 'text-[#089981]' : 'text-[#f23645]'}`}>
                    {isPos ? '+' : ''}{item.changePercent.toFixed(2)}%
                  </span>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemoveSymbol(item.symbol);
                  }}
                  className="opacity-0 group-hover:opacity-100 p-1 text-gray-500 hover:text-red-500 transition"
                  title="Remove from watchlist"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Info */}
      <div className={`p-3 border-t text-[11px] text-gray-500 text-center ${isDark ? 'border-[#2a2e39] bg-[#131722]' : 'border-[#e0e3eb] bg-slate-50'}`}>
        Live data streaming • Real-time Quotes
      </div>
    </div>
  );
};
