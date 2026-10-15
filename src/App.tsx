import React, { useState, useEffect } from 'react';
import {
  Search,
  Star,
  Sun,
  Moon,
  TrendingUp,
  TrendingDown,
  BarChart2,
  Activity,
  Layers,
  Globe,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  ChevronRight,
  Maximize2,
  SlidersHorizontal,
  Compass,
  Zap,
  Info,
  Clock,
  ExternalLink
} from 'lucide-react';
import {
  MarketSymbol,
  MAJOR_INDICES,
  STOCKS_DATA,
  CRYPTO_DATA,
  FOREX_DATA,
  COMMODITIES_DATA,
  BONDS_DATA,
  SECTORS,
  ECONOMIC_EVENTS
} from './data/marketData';
import { TickerTape } from './components/TickerTape';
import { SparklineChart } from './components/SparklineChart';
import { InteractiveChartModal } from './components/InteractiveChartModal';
import { TechnicalGauge } from './components/TechnicalGauge';
import { WatchlistSidebar } from './components/WatchlistSidebar';
import { SymbolSearchModal } from './components/SymbolSearchModal';

export default function App() {
  const [isDark, setIsDark] = useState<boolean>(true);
  const [activeMarketTab, setActiveMarketTab] = useState<'overview' | 'stocks' | 'crypto' | 'forex' | 'commodities' | 'bonds'>('overview');
  const [activeStockFilter, setActiveStockFilter] = useState<'large-cap' | 'top-gainers' | 'top-losers' | 'most-active'>('large-cap');
  const [selectedRegion, setSelectedRegion] = useState<'us' | 'europe' | 'asia' | 'world'>('us');

  // Modal / drawer states
  const [selectedChartSymbol, setSelectedChartSymbol] = useState<MarketSymbol | null>(null);
  const [isChartModalOpen, setIsChartModalOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isWatchlistOpen, setIsWatchlistOpen] = useState(false);

  // Watchlist items (persisted)
  const [watchlist, setWatchlist] = useState<string[]>(['NVDA', 'AAPL', 'TSLA', 'BTCUSD', 'SPX']);

  // Load watchlist
  useEffect(() => {
    const saved = localStorage.getItem('tv_watchlist');
    if (saved) {
      try {
        setWatchlist(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  // Keyboard shortcut: '/' or Ctrl+K to open search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.key === '/' || (e.ctrlKey && e.key === 'k') || (e.metaKey && e.key === 'k')) && !isSearchOpen && !isChartModalOpen) {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, isChartModalOpen]);

  const handleToggleWatchlist = (sym: string) => {
    setWatchlist(prev => {
      const next = prev.includes(sym) ? prev.filter(s => s !== sym) : [...prev, sym];
      localStorage.setItem('tv_watchlist', JSON.stringify(next));
      return next;
    });
  };

  const handleOpenChart = (sym: MarketSymbol) => {
    setSelectedChartSymbol(sym);
    setIsChartModalOpen(true);
  };

  // Resolve active table dataset
  const getTableData = () => {
    switch (activeMarketTab) {
      case 'stocks':
      case 'overview':
        return STOCKS_DATA[activeStockFilter] || STOCKS_DATA['large-cap'];
      case 'crypto':
        return CRYPTO_DATA;
      case 'forex':
        return FOREX_DATA;
      case 'commodities':
        return COMMODITIES_DATA;
      case 'bonds':
        return BONDS_DATA;
      default:
        return STOCKS_DATA['large-cap'];
    }
  };

  const currentTableData = getTableData();
  const featuredGaugeSymbol = selectedChartSymbol?.symbol || 'NVDA';
  const featuredGaugeRating = selectedChartSymbol?.rating || 'Strong Buy';

  const themeClasses = {
    bg: isDark ? 'bg-[#131722] text-[#d1d4dc]' : 'bg-[#f8f9fd] text-[#131722]',
    headerBg: isDark ? 'bg-[#131722] border-[#2a2e39]' : 'bg-white border-[#e0e3eb]',
    cardBg: isDark ? 'bg-[#1e222d] border-[#2a2e39]' : 'bg-white border-[#e0e3eb]',
    subtleBg: isDark ? 'bg-[#131722]' : 'bg-slate-50',
    border: isDark ? 'border-[#2a2e39]' : 'border-[#e0e3eb]',
    textMuted: isDark ? 'text-[#787b86]' : 'text-slate-500',
    textPrimary: isDark ? 'text-white' : 'text-[#131722]',
    hoverRow: isDark ? 'hover:bg-[#1e222d]' : 'hover:bg-slate-50'
  };

  return (
    <div className={`min-h-screen ${themeClasses.bg} flex flex-col font-sans transition-colors duration-200`}>
      {/* Top Main Navigation Bar (TradingView Header) */}
      <header className={`sticky top-0 z-30 border-b ${themeClasses.headerBg} select-none`}>
        <div className="max-w-[1520px] mx-auto px-4 h-13 flex items-center justify-between gap-4">
          {/* Left: Brand Logo & Primary Links */}
          <div className="flex items-center space-x-6">
            <a href="/" className="flex items-center space-x-2 shrink-0 group">
              {/* TradingView Icon */}
              <div className="w-7 h-7 rounded bg-[#2962ff] flex items-center justify-center text-white font-extrabold text-sm tracking-tighter shadow-sm group-hover:scale-105 transition-transform">
                TV
              </div>
              <span className={`font-extrabold text-lg tracking-tight ${themeClasses.textPrimary}`}>
                TradingView
              </span>
            </a>

            <nav className="hidden lg:flex items-center space-x-5 text-xs font-semibold">
              <a href="#products" className={`${themeClasses.textMuted} hover:${themeClasses.textPrimary} transition`}>
                Products
              </a>
              <a href="#community" className={`${themeClasses.textMuted} hover:${themeClasses.textPrimary} transition`}>
                Community
              </a>
              <a href="#markets" className="text-[#2962ff] border-b-2 border-[#2962ff] py-4">
                Markets
              </a>
              <a href="#news" className={`${themeClasses.textMuted} hover:${themeClasses.textPrimary} transition`}>
                News
              </a>
              <a href="#brokers" className={`${themeClasses.textMuted} hover:${themeClasses.textPrimary} transition`}>
                Brokers
              </a>
            </nav>
          </div>

          {/* Center: Global Symbol Search Bar */}
          <div className="flex-1 max-w-md hidden sm:block">
            <button
              onClick={() => setIsSearchOpen(true)}
              className={`w-full flex items-center justify-between px-3.5 py-1.5 rounded-full border text-xs cursor-pointer transition ${
                isDark
                  ? 'bg-[#1e222d] border-[#2a2e39] text-[#787b86] hover:border-[#363a45] hover:text-[#d1d4dc]'
                  : 'bg-slate-100 border-[#e0e3eb] text-slate-500 hover:border-slate-300 hover:text-black'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Search className="w-3.5 h-3.5 text-gray-400" />
                <span>Search markets, stocks, crypto, forex...</span>
              </div>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-gray-500/20 text-gray-400">
                /
              </span>
            </button>
          </div>

          {/* Right: Actions, Watchlist, Theme Toggle & Profile */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Mobile search trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className={`sm:hidden p-2 rounded-lg border ${themeClasses.border} hover:opacity-80`}
              title="Search"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Watchlist toggle button */}
            <button
              onClick={() => setIsWatchlistOpen(!isWatchlistOpen)}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold cursor-pointer transition ${
                isWatchlistOpen
                  ? 'bg-[#2962ff] text-white border-[#2962ff]'
                  : `${themeClasses.border} ${themeClasses.textMuted} hover:${themeClasses.textPrimary}`
              }`}
              title="Open Watchlist"
            >
              <Star className="w-3.5 h-3.5" fill={isWatchlistOpen ? 'currentColor' : 'none'} />
              <span className="hidden md:inline">Watchlist</span>
              <span className="text-[10px] font-mono bg-black/20 px-1 rounded">
                {watchlist.length}
              </span>
            </button>

            {/* Theme Toggle (Dark / Light) */}
            <button
              onClick={() => setIsDark(!isDark)}
              className={`p-2 rounded-lg border cursor-pointer transition ${themeClasses.border} ${themeClasses.textMuted} hover:${themeClasses.textPrimary}`}
              title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>

            {/* Sign in / Get started */}
            <button
              onClick={() => alert("TradingView Pro: Real-time data, custom screeners, and multi-chart layouts.")}
              className="bg-[#2962ff] hover:bg-[#1e53e5] text-white text-xs font-bold px-3.5 py-1.5 rounded-full transition shadow-xs cursor-pointer whitespace-nowrap"
            >
              Get started
            </button>
          </div>
        </div>
      </header>

      {/* Real-time Ticker Tape Bar */}
      <TickerTape onSelectSymbol={handleOpenChart} isDark={isDark} />

      {/* Main Markets Container */}
      <main className="flex-1 max-w-[1520px] w-full mx-auto px-4 py-6 space-y-6">
        {/* Markets Header & Breadcrumb */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-xs text-[#787b86] mb-1 font-mono">
              <span>Markets</span>
              <span>/</span>
              <span className="text-[#2962ff] uppercase font-bold">{selectedRegion}</span>
            </div>
            <h1 className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${themeClasses.textPrimary}`}>
              Markets overview
            </h1>
            <p className={`text-xs mt-1 ${themeClasses.textMuted}`}>
              Track world financial markets in real time with high-density quotes, charts, and technical signals.
            </p>
          </div>

          {/* Region Tabs (US, Europe, Asia, World) */}
          <div className={`flex rounded-lg p-1 border text-xs font-semibold ${themeClasses.cardBg}`}>
            {[
              { id: 'us', label: 'United States' },
              { id: 'europe', label: 'Europe' },
              { id: 'asia', label: 'Asia' },
              { id: 'world', label: 'World' }
            ].map(r => (
              <button
                key={r.id}
                onClick={() => setSelectedRegion(r.id as any)}
                className={`px-3 py-1 rounded-md transition cursor-pointer ${
                  selectedRegion === r.id
                    ? 'bg-[#2962ff] text-white'
                    : `${themeClasses.textMuted} hover:${themeClasses.textPrimary}`
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>

        {/* Major Global Indices Grid (Signature TradingView Cards) */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className={`text-sm font-bold uppercase tracking-wider ${themeClasses.textPrimary}`}>
              Major Indices
            </h2>
            <span className="text-xs text-[#787b86] font-mono">Real-time quotes</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
            {MAJOR_INDICES.map(idx => {
              const isPos = idx.change >= 0;
              return (
                <div
                  key={idx.symbol}
                  onClick={() => handleOpenChart(idx)}
                  className={`p-3.5 rounded-lg border cursor-pointer group transition-all duration-150 hover:scale-[1.02] ${themeClasses.cardBg} hover:border-[#2962ff]`}
                >
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-bold text-white group-hover:text-[#2962ff] transition">
                      {idx.symbol}
                    </span>
                    <span className="text-[10px] text-[#787b86] uppercase font-mono">{idx.exchange}</span>
                  </div>
                  <div className={`text-[11px] truncate mb-2 ${themeClasses.textMuted}`}>
                    {idx.name}
                  </div>

                  <div className="font-mono-num mb-3">
                    <div className={`text-lg font-extrabold ${themeClasses.textPrimary}`}>
                      {idx.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                    <div className={`text-xs font-bold flex items-center space-x-1 ${isPos ? 'text-[#089981]' : 'text-[#f23645]'}`}>
                      {isPos ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                      <span>{isPos ? '+' : ''}{idx.change.toFixed(2)} ({isPos ? '+' : ''}{idx.changePercent.toFixed(2)}%)</span>
                    </div>
                  </div>

                  {/* Sparkline chart */}
                  <div className="w-full flex justify-end">
                    <SparklineChart data={idx.sparkline} isPositive={isPos} width={130} height={32} />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Primary Markets Layout: Table (Left 8-9 cols) & Side Intelligence (Right 3-4 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Main Left Section: Market Movers & Asset Class Tabs */}
          <div className="lg:col-span-8 xl:col-span-9 space-y-4">
            {/* Asset Class Filter Tabs */}
            <div className={`border-b flex items-center space-x-6 overflow-x-auto text-xs font-bold ${themeClasses.border}`}>
              {[
                { id: 'overview', label: 'Stocks Overview' },
                { id: 'crypto', label: 'Cryptocurrency' },
                { id: 'forex', label: 'Currencies & Forex' },
                { id: 'commodities', label: 'Commodities & Energy' },
                { id: 'bonds', label: 'Bonds & Yields' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveMarketTab(tab.id as any)}
                  className={`pb-3 whitespace-nowrap transition cursor-pointer border-b-2 ${
                    activeMarketTab === tab.id
                      ? 'border-[#2962ff] text-[#2962ff]'
                      : `border-transparent ${themeClasses.textMuted} hover:${themeClasses.textPrimary}`
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Sub-Filters for Stocks */}
            {(activeMarketTab === 'overview' || activeMarketTab === 'stocks') && (
              <div className="flex items-center space-x-2 text-xs">
                {[
                  { id: 'large-cap', label: 'Large Cap' },
                  { id: 'top-gainers', label: 'Top Gainers' },
                  { id: 'top-losers', label: 'Top Losers' },
                  { id: 'most-active', label: 'Most Active' }
                ].map(filter => (
                  <button
                    key={filter.id}
                    onClick={() => setActiveStockFilter(filter.id as any)}
                    className={`px-3 py-1 rounded-md text-xs font-semibold transition cursor-pointer ${
                      activeStockFilter === filter.id
                        ? 'bg-[#2962ff] text-white shadow-xs'
                        : `${themeClasses.cardBg} border ${themeClasses.textMuted} hover:${themeClasses.textPrimary}`
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            )}

            {/* High-Density Data Grid (Signature TradingView Table) */}
            <div className={`rounded-lg border overflow-hidden ${themeClasses.cardBg}`}>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className={`border-b text-[11px] font-semibold text-[#787b86] ${themeClasses.subtleBg}`}>
                      <th className="py-2.5 px-4 font-normal">Symbol</th>
                      <th className="py-2.5 px-4 text-right font-normal">Last Price</th>
                      <th className="py-2.5 px-4 text-right font-normal">Change</th>
                      <th className="py-2.5 px-4 text-right font-normal">Change %</th>
                      <th className="py-2.5 px-4 text-center font-normal">Technical Rating</th>
                      <th className="py-2.5 px-4 text-right font-normal hidden sm:table-cell">Volume</th>
                      <th className="py-2.5 px-4 text-right font-normal hidden md:table-cell">Market Cap</th>
                      <th className="py-2.5 px-4 text-center font-normal hidden lg:table-cell">Trend</th>
                      <th className="py-2.5 px-3 text-center font-normal w-12">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-500/10 font-mono-num">
                    {currentTableData.map(item => {
                      const isPos = item.change >= 0;
                      const isWatch = watchlist.includes(item.symbol);

                      return (
                        <tr
                          key={item.symbol}
                          onClick={() => handleOpenChart(item)}
                          className={`cursor-pointer transition duration-150 ${themeClasses.hoverRow}`}
                        >
                          {/* Symbol & Name */}
                          <td className="py-3 px-4">
                            <div className="flex items-center space-x-2.5">
                              <div className="w-7 h-7 rounded-full bg-gray-500/15 flex items-center justify-center font-bold text-[11px] text-[#2962ff] shrink-0">
                                {item.symbol.slice(0, 2)}
                              </div>
                              <div className="flex flex-col truncate max-w-[140px] sm:max-w-xs">
                                <span className={`font-bold font-sans ${themeClasses.textPrimary}`}>
                                  {item.symbol}
                                </span>
                                <span className="text-[11px] text-[#787b86] font-sans truncate">
                                  {item.name}
                                </span>
                              </div>
                            </div>
                          </td>

                          {/* Price */}
                          <td className={`py-3 px-4 text-right font-bold font-sans ${themeClasses.textPrimary}`}>
                            ${item.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: item.price < 2 ? 4 : 2 })}
                          </td>

                          {/* Change $ */}
                          <td className={`py-3 px-4 text-right font-bold ${isPos ? 'text-[#089981]' : 'text-[#f23645]'}`}>
                            {isPos ? '+' : ''}{item.change.toFixed(item.price < 2 ? 4 : 2)}
                          </td>

                          {/* Change % */}
                          <td className={`py-3 px-4 text-right font-bold ${isPos ? 'text-[#089981]' : 'text-[#f23645]'}`}>
                            <span className={`inline-block px-1.5 py-0.5 rounded text-[11px] ${
                              isPos ? 'bg-[#089981]/15 text-[#089981]' : 'bg-[#f23645]/15 text-[#f23645]'
                            }`}>
                              {isPos ? '+' : ''}{item.changePercent.toFixed(2)}%
                            </span>
                          </td>

                          {/* Technical Rating */}
                          <td className="py-3 px-4 text-center">
                            <span
                              className={`text-[10px] font-sans font-bold px-2 py-0.5 rounded uppercase tracking-wide ${
                                item.rating === 'Strong Buy'
                                  ? 'bg-[#089981]/20 text-[#089981]'
                                  : item.rating === 'Buy'
                                  ? 'bg-[#089981]/15 text-[#089981]'
                                  : item.rating === 'Neutral'
                                  ? 'bg-gray-500/20 text-[#787b86]'
                                  : 'bg-[#f23645]/20 text-[#f23645]'
                              }`}
                            >
                              {item.rating}
                            </span>
                          </td>

                          {/* Volume */}
                          <td className="py-3 px-4 text-right text-[#787b86] hidden sm:table-cell">
                            {item.volume || '—'}
                          </td>

                          {/* Market Cap */}
                          <td className="py-3 px-4 text-right text-[#787b86] hidden md:table-cell">
                            {item.marketCap || '—'}
                          </td>

                          {/* Sparkline */}
                          <td className="py-3 px-4 text-center hidden lg:table-cell">
                            <div className="flex justify-center">
                              <SparklineChart data={item.sparkline} isPositive={isPos} width={80} height={22} />
                            </div>
                          </td>

                          {/* Actions */}
                          <td className="py-3 px-3 text-center">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleToggleWatchlist(item.symbol);
                              }}
                              className={`p-1.5 rounded hover:bg-gray-500/20 transition ${
                                isWatch ? 'text-amber-400' : 'text-gray-500 hover:text-white'
                              }`}
                              title={isWatch ? 'Remove from Watchlist' : 'Add to Watchlist'}
                            >
                              <Star className="w-3.5 h-3.5" fill={isWatch ? 'currentColor' : 'none'} />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Sector Heatmap & Performance Strips */}
            <div className={`p-5 rounded-lg border space-y-4 ${themeClasses.cardBg}`}>
              <div className="flex items-center justify-between border-b pb-2 border-gray-500/20">
                <div className="flex items-center space-x-2">
                  <Layers className="w-4 h-4 text-[#2962ff]" />
                  <h3 className={`text-xs font-bold uppercase tracking-wider ${themeClasses.textPrimary}`}>
                    U.S. Sectors Performance (S&amp;P 500)
                  </h3>
                </div>
                <span className="text-xs text-[#787b86] font-mono">1D Performance</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {SECTORS.map(sec => {
                  const isPos = sec.changePercent >= 0;
                  return (
                    <div
                      key={sec.name}
                      onClick={() => handleOpenChart({
                        symbol: sec.symbol,
                        name: `${sec.name} ETF`,
                        exchange: 'AMEX',
                        category: 'index',
                        price: 120.50,
                        change: sec.changePercent * 1.2,
                        changePercent: sec.changePercent,
                        rating: isPos ? 'Buy' : 'Sell',
                        sparkline: [118, 119, 120.5]
                      })}
                      className={`p-2.5 rounded-lg border cursor-pointer hover:border-[#2962ff] transition flex items-center justify-between ${
                        isDark ? 'bg-[#131722] border-[#2a2e39]' : 'bg-slate-50 border-[#e0e3eb]'
                      }`}
                    >
                      <div>
                        <div className="flex items-center space-x-1.5">
                          <span className="font-bold text-xs text-white">{sec.symbol}</span>
                          <span className="text-[11px] text-[#787b86] truncate max-w-[130px]">{sec.name}</span>
                        </div>
                        <span className="text-[10px] text-gray-500 block">Top: {sec.topStock}</span>
                      </div>

                      <div className="text-right font-mono-num">
                        <span
                          className={`text-xs font-bold px-2 py-0.5 rounded ${
                            isPos ? 'bg-[#089981]/20 text-[#089981]' : 'bg-[#f23645]/20 text-[#f23645]'
                          }`}
                        >
                          {isPos ? '+' : ''}{sec.changePercent.toFixed(2)}%
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Rail: Technical Gauge & Economic Calendar (TradingView Widgets) */}
          <aside className="lg:col-span-4 xl:col-span-3 space-y-5">
            {/* Technical Analysis Gauge */}
            <TechnicalGauge
              symbol={featuredGaugeSymbol}
              rating={featuredGaugeRating}
              isDark={isDark}
            />

            {/* Economic Calendar Widget */}
            <div className={`p-4 rounded-lg border space-y-3 ${themeClasses.cardBg}`}>
              <div className="flex items-center justify-between border-b pb-2 border-gray-500/20">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-[#2962ff]" />
                  <h4 className={`text-xs font-bold uppercase tracking-wider ${themeClasses.textPrimary}`}>
                    Economic Calendar
                  </h4>
                </div>
                <span className="text-[10px] text-[#089981] font-bold uppercase tracking-wide">Live</span>
              </div>

              <div className="divide-y divide-gray-500/10 space-y-2.5 text-xs">
                {ECONOMIC_EVENTS.map((evt, i) => (
                  <div key={i} className="pt-2 flex items-start justify-between">
                    <div>
                      <div className="flex items-center space-x-1.5 text-[10px] font-mono text-[#787b86]">
                        <span>{evt.time}</span>
                        <span>•</span>
                        <span className="font-bold text-white">{evt.currency}</span>
                        <span>•</span>
                        <span
                          className={`font-bold ${
                            evt.impact === 'High' ? 'text-red-400' : 'text-amber-400'
                          }`}
                        >
                          {evt.impact}
                        </span>
                      </div>
                      <span className={`font-semibold block mt-0.5 text-[11px] leading-snug ${themeClasses.textPrimary}`}>
                        {evt.title}
                      </span>
                    </div>

                    <div className="text-right font-mono-num text-[11px] shrink-0 ml-2">
                      <span className="text-emerald-400 font-bold block">{evt.actual}</span>
                      <span className="text-[10px] text-gray-500 block">F: {evt.forecast}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* TradingView Promo / Broker Integration Box */}
            <div className="p-4 rounded-lg border border-[#2962ff]/30 bg-[#2962ff]/10 text-xs space-y-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-[#2962ff] block">
                Trade on TradingView
              </span>
              <p className="font-bold text-white text-sm">
                Connect your brokerage account to trade directly from charts.
              </p>
              <p className="text-[11px] text-gray-400">
                Execute stocks, forex, and crypto orders with real-time level 2 data.
              </p>
              <button
                onClick={() => alert("Broker Connection: Select from 50+ integrated partners including Interactive Brokers, TradeStation, and Binance.")}
                className="w-full bg-[#2962ff] hover:bg-[#2962ff]/85 text-white font-bold py-2 rounded text-xs transition cursor-pointer"
              >
                Connect Broker
              </button>
            </div>
          </aside>
        </div>
      </main>

      {/* TradingView Global Footer */}
      <footer className={`border-t py-8 px-4 mt-12 text-xs select-none ${themeClasses.headerBg}`}>
        <div className="max-w-[1520px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 rounded bg-[#2962ff] flex items-center justify-center text-white font-extrabold text-xs">
              TV
            </div>
            <span className={`font-bold text-sm ${themeClasses.textPrimary}`}>TradingView</span>
            <span className="text-gray-500">|</span>
            <span className="text-gray-500 text-[11px]">Look first / Then leap.</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-[#787b86]">
            <a href="#overview" className="hover:text-white transition">Markets</a>
            <a href="#stocks" className="hover:text-white transition">Screeners</a>
            <a href="#community" className="hover:text-white transition">Pine Script</a>
            <a href="#calendar" className="hover:text-white transition">Economic Calendar</a>
            <a href="#privacy" className="hover:text-white transition">Privacy Policy</a>
            <a href="#terms" className="hover:text-white transition">Terms of Service</a>
          </div>

          <span className="text-gray-500 text-[11px] font-mono">
            © 2026 TradingView Inc. All rights reserved.
          </span>
        </div>
      </footer>

      {/* MODALS AND SIDEBARS */}
      <InteractiveChartModal
        symbol={selectedChartSymbol}
        isOpen={isChartModalOpen}
        onClose={() => setIsChartModalOpen(false)}
        isDark={isDark}
        onToggleWatchlist={handleToggleWatchlist}
        isWatchlisted={selectedChartSymbol ? watchlist.includes(selectedChartSymbol.symbol) : false}
      />

      <SymbolSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectSymbol={handleOpenChart}
        isDark={isDark}
      />

      <WatchlistSidebar
        isOpen={isWatchlistOpen}
        onClose={() => setIsWatchlistOpen(false)}
        watchlistSymbols={watchlist}
        onSelectSymbol={handleOpenChart}
        onRemoveSymbol={handleToggleWatchlist}
        onAddSymbol={sym => handleToggleWatchlist(sym)}
        isDark={isDark}
      />
    </div>
  );
}
