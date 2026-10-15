import React, { useState, useMemo, useEffect } from 'react';
import { Search, X, ArrowUpRight, Globe, TrendingUp } from 'lucide-react';
import {
  MarketSymbol,
  TICKER_TAPE,
  MAJOR_INDICES,
  STOCKS_DATA,
  CRYPTO_DATA,
  FOREX_DATA,
  COMMODITIES_DATA,
  BONDS_DATA
} from '../data/marketData';

interface SymbolSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSymbol: (symbol: MarketSymbol) => void;
  isDark: boolean;
}

export const SymbolSearchModal: React.FC<SymbolSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectSymbol,
  isDark
}) => {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  // Keyboard shortcut: Esc to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Aggregate all symbols
  const allSymbols = useMemo(() => {
    const map = new Map<string, MarketSymbol>();
    const list = [
      ...TICKER_TAPE,
      ...MAJOR_INDICES,
      ...STOCKS_DATA['large-cap'],
      ...STOCKS_DATA['top-gainers'],
      ...STOCKS_DATA['top-losers'],
      ...CRYPTO_DATA,
      ...FOREX_DATA,
      ...COMMODITIES_DATA,
      ...BONDS_DATA
    ];
    for (const item of list) {
      if (!map.has(item.symbol)) {
        map.set(item.symbol, item);
      }
    }
    return Array.from(map.values());
  }, []);

  const filtered = useMemo(() => {
    return allSymbols.filter(s => {
      const matchCat = activeCategory === 'all' || s.category === activeCategory;
      const q = query.toLowerCase().trim();
      if (!q) return matchCat;
      const inSym = s.symbol.toLowerCase().includes(q);
      const inName = s.name.toLowerCase().includes(q);
      const inExch = s.exchange.toLowerCase().includes(q);
      return matchCat && (inSym || inName || inExch);
    });
  }, [allSymbols, query, activeCategory]);

  if (!isOpen) return null;

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'stock', label: 'Stocks' },
    { id: 'index', label: 'Indices' },
    { id: 'crypto', label: 'Crypto' },
    { id: 'forex', label: 'Forex' },
    { id: 'commodity', label: 'Commodities' },
    { id: 'bond', label: 'Bonds' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/75 backdrop-blur-xs p-4 pt-16">
      <div
        className={`w-full max-w-2xl rounded-xl shadow-2xl border flex flex-col overflow-hidden max-h-[82vh] ${
          isDark
            ? 'bg-[#1e222d] border-[#2a2e39] text-[#d1d4dc]'
            : 'bg-white border-[#e0e3eb] text-[#131722]'
        }`}
      >
        {/* Search Input Bar */}
        <div className={`p-4 border-b flex items-center space-x-3 ${isDark ? 'border-[#2a2e39] bg-[#131722]' : 'border-[#e0e3eb] bg-slate-50'}`}>
          <Search className="w-5 h-5 text-[#2962ff]" />
          <input
            type="text"
            placeholder="Search symbol, company, currency or crypto (e.g. NVDA, BTC, S&P 500)..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            autoFocus
            className={`w-full bg-transparent text-sm font-medium focus:outline-none placeholder-gray-500 ${
              isDark ? 'text-white' : 'text-black'
            }`}
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs text-gray-400 hover:text-white px-1"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-white rounded"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Category Filters */}
        <div className={`px-4 py-2 border-b flex items-center space-x-2 overflow-x-auto text-xs ${isDark ? 'border-[#2a2e39]' : 'border-[#e0e3eb]'}`}>
          {categories.map(c => (
            <button
              key={c.id}
              onClick={() => setActiveCategory(c.id)}
              className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition ${
                activeCategory === c.id
                  ? 'bg-[#2962ff] text-white'
                  : isDark
                  ? 'bg-[#131722] text-[#787b86] hover:text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto divide-y divide-gray-500/10 p-2">
          {filtered.length === 0 ? (
            <div className="text-center py-14 text-sm text-gray-500">
              No matching markets or symbols found for “{query}”.
            </div>
          ) : (
            filtered.map(item => {
              const isPos = item.change >= 0;
              return (
                <div
                  key={item.symbol}
                  onClick={() => {
                    onSelectSymbol(item);
                    onClose();
                  }}
                  className={`p-3 flex items-center justify-between cursor-pointer rounded-lg group transition ${
                    isDark ? 'hover:bg-[#131722]' : 'hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-gray-500/20 flex items-center justify-center font-bold text-xs text-[#2962ff]">
                      {item.symbol.slice(0, 2)}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className={`font-bold text-sm ${isDark ? 'text-white' : 'text-black'}`}>
                          {item.symbol}
                        </span>
                        <span className="text-[10px] text-gray-400 uppercase font-mono px-1 rounded bg-gray-500/10">
                          {item.exchange}
                        </span>
                        <span className="text-[10px] text-gray-400 uppercase font-mono">
                          {item.category}
                        </span>
                      </div>
                      <span className="text-xs text-[#787b86] line-clamp-1">{item.name}</span>
                    </div>
                  </div>

                  <div className="text-right font-mono-num">
                    <span className={`text-sm font-bold block ${isDark ? 'text-white' : 'text-black'}`}>
                      ${item.price.toFixed(item.price < 2 ? 4 : 2)}
                    </span>
                    <span className={`text-xs font-bold ${isPos ? 'text-[#089981]' : 'text-[#f23645]'}`}>
                      {isPos ? '+' : ''}{item.changePercent.toFixed(2)}%
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className={`px-4 py-2.5 border-t flex items-center justify-between text-xs text-gray-500 ${isDark ? 'border-[#2a2e39] bg-[#131722]' : 'border-[#e0e3eb] bg-slate-50'}`}>
          <span>Showing {filtered.length} symbols</span>
          <span className="font-mono text-[11px]">Press ESC to close</span>
        </div>
      </div>
    </div>
  );
};
