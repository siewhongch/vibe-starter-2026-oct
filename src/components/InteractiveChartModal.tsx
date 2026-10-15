import React, { useState, useMemo, useRef } from 'react';
import {
  X,
  Maximize2,
  Minimize2,
  TrendingUp,
  BarChart2,
  Activity,
  Layers,
  Bell,
  Star,
  Check,
  ChevronDown,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Volume2
} from 'lucide-react';
import { MarketSymbol, generateCandles, Candle } from '../data/marketData';

interface InteractiveChartModalProps {
  symbol: MarketSymbol | null;
  isOpen: boolean;
  onClose: () => void;
  isDark: boolean;
  onToggleWatchlist: (sym: string) => void;
  isWatchlisted: boolean;
}

export const InteractiveChartModal: React.FC<InteractiveChartModalProps> = ({
  symbol,
  isOpen,
  onClose,
  isDark,
  onToggleWatchlist,
  isWatchlisted
}) => {
  const [chartType, setChartType] = useState<'candles' | 'area' | 'line'>('candles');
  const [timeframe, setTimeframe] = useState<'1D' | '5D' | '1M' | '6M' | '1Y'>('1M');
  const [showSMA, setShowSMA] = useState(true);
  const [showEMA, setShowEMA] = useState(false);
  const [showBollinger, setShowBollinger] = useState(false);
  const [showRSI, setShowRSI] = useState(true);
  const [showVolume, setShowVolume] = useState(true);
  const [hoveredCandle, setHoveredCandle] = useState<Candle | null>(null);
  const [isAlertSet, setIsAlertSet] = useState(false);
  const [tradeShares, setTradeShares] = useState<number>(10);
  const [tradeMessage, setTradeMessage] = useState<string>('');
  const [portfolioBalance, setPortfolioBalance] = useState<number>(100000);
  const [positionShares, setPositionShares] = useState<number>(0);

  // Generate realistic candles based on symbol price
  const candles: Candle[] = useMemo(() => {
    if (!symbol) return [];
    const count = timeframe === '1D' ? 24 : timeframe === '5D' ? 30 : timeframe === '1M' ? 36 : 48;
    return generateCandles(symbol.price, count);
  }, [symbol, timeframe]);

  if (!isOpen || !symbol) return null;

  const currentPrice = hoveredCandle ? hoveredCandle.close : symbol.price;
  const isPos = symbol.change >= 0;

  // Compute SMA 20
  const smaPoints = useMemo(() => {
    const period = 5;
    return candles.map((c, i) => {
      if (i < period - 1) return null;
      const slice = candles.slice(i - period + 1, i + 1);
      const avg = slice.reduce((acc, curr) => acc + curr.close, 0) / period;
      return avg;
    });
  }, [candles]);

  // Chart Geometry Calculations
  const minPrice = Math.min(...candles.map(c => c.low)) * 0.995;
  const maxPrice = Math.max(...candles.map(c => c.high)) * 1.005;
  const priceRange = maxPrice - minPrice || 1;

  const chartHeight = 320;
  const chartWidth = 720;
  const paddingX = 40;
  const paddingY = 20;

  const getY = (val: number) => {
    return chartHeight - paddingY - ((val - minPrice) / priceRange) * (chartHeight - paddingY * 2);
  };

  const getX = (index: number) => {
    return paddingX + (index / (candles.length - 1)) * (chartWidth - paddingX * 2);
  };

  // Trade simulation
  const handleBuy = () => {
    const cost = currentPrice * tradeShares;
    if (portfolioBalance >= cost) {
      setPortfolioBalance(b => +(b - cost).toFixed(2));
      setPositionShares(s => s + tradeShares);
      setTradeMessage(`Bought ${tradeShares} shares of ${symbol.symbol} at $${currentPrice.toFixed(2)}`);
      setTimeout(() => setTradeMessage(''), 3000);
    } else {
      setTradeMessage('Insufficient paper buying power!');
      setTimeout(() => setTradeMessage(''), 3000);
    }
  };

  const handleSell = () => {
    if (positionShares >= tradeShares) {
      const revenue = currentPrice * tradeShares;
      setPortfolioBalance(b => +(b + revenue).toFixed(2));
      setPositionShares(s => s - tradeShares);
      setTradeMessage(`Sold ${tradeShares} shares of ${symbol.symbol} at $${currentPrice.toFixed(2)}`);
      setTimeout(() => setTradeMessage(''), 3000);
    } else {
      setTradeMessage('Not enough shares to sell!');
      setTimeout(() => setTradeMessage(''), 3000);
    }
  };

  const handleToggleAlert = () => {
    setIsAlertSet(prev => !prev);
    setTradeMessage(isAlertSet ? 'Alert removed' : `Alert set at $${(symbol.price * 1.02).toFixed(2)}`);
    setTimeout(() => setTradeMessage(''), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-xs p-2 sm:p-4">
      <div
        className={`w-full max-w-5xl rounded-lg shadow-2xl border flex flex-col overflow-hidden max-h-[95vh] select-none ${
          isDark
            ? 'bg-[#131722] border-[#2a2e39] text-[#d1d4dc]'
            : 'bg-white border-[#e0e3eb] text-[#131722]'
        }`}
      >
        {/* Top Advanced Chart Header Bar */}
        <div
          className={`px-4 py-2.5 border-b flex flex-wrap items-center justify-between gap-3 ${
            isDark ? 'border-[#2a2e39] bg-[#1e222d]' : 'border-[#e0e3eb] bg-slate-50'
          }`}
        >
          {/* Symbol info */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <span className={`text-base font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-black'}`}>
                {symbol.symbol}
              </span>
              <span className="text-xs px-1.5 py-0.5 rounded bg-gray-500/20 font-mono text-gray-400">
                {symbol.exchange}
              </span>
              <span className="text-xs text-[#787b86] hidden sm:inline truncate max-w-[180px]">
                {symbol.name}
              </span>
            </div>

            <button
              onClick={() => onToggleWatchlist(symbol.symbol)}
              className={`p-1 rounded hover:bg-gray-500/20 transition ${
                isWatchlisted ? 'text-amber-400' : 'text-gray-400 hover:text-white'
              }`}
              title="Add to Watchlist"
            >
              <Star className="w-4 h-4" fill={isWatchlisted ? 'currentColor' : 'none'} />
            </button>

            <button
              onClick={handleToggleAlert}
              className={`p-1 rounded hover:bg-gray-500/20 transition ${
                isAlertSet ? 'text-[#2962ff]' : 'text-gray-400 hover:text-white'
              }`}
              title="Set Price Alert"
            >
              <Bell className="w-4 h-4" fill={isAlertSet ? 'currentColor' : 'none'} />
            </button>
          </div>

          {/* Timeframe & Chart Type Toolbar */}
          <div className="flex items-center space-x-2 text-xs">
            {/* Timeframe selector */}
            <div className={`flex rounded p-0.5 border ${isDark ? 'border-[#2a2e39] bg-[#131722]' : 'border-[#e0e3eb] bg-white'}`}>
              {(['1D', '5D', '1M', '6M', '1Y'] as const).map(tf => (
                <button
                  key={tf}
                  onClick={() => setTimeframe(tf)}
                  className={`px-2 py-0.5 font-bold rounded text-[11px] transition ${
                    timeframe === tf
                      ? 'bg-[#2962ff] text-white'
                      : isDark ? 'text-[#787b86] hover:text-white' : 'text-slate-600 hover:text-black'
                  }`}
                >
                  {tf}
                </button>
              ))}
            </div>

            {/* Chart Type selector */}
            <div className={`flex rounded p-0.5 border ${isDark ? 'border-[#2a2e39] bg-[#131722]' : 'border-[#e0e3eb] bg-white'}`}>
              <button
                onClick={() => setChartType('candles')}
                className={`px-2 py-0.5 font-bold rounded text-[11px] ${
                  chartType === 'candles' ? 'bg-[#2962ff] text-white' : 'text-[#787b86] hover:text-white'
                }`}
              >
                Candles
              </button>
              <button
                onClick={() => setChartType('area')}
                className={`px-2 py-0.5 font-bold rounded text-[11px] ${
                  chartType === 'area' ? 'bg-[#2962ff] text-white' : 'text-[#787b86] hover:text-white'
                }`}
              >
                Area
              </button>
              <button
                onClick={() => setChartType('line')}
                className={`px-2 py-0.5 font-bold rounded text-[11px] ${
                  chartType === 'line' ? 'bg-[#2962ff] text-white' : 'text-[#787b86] hover:text-white'
                }`}
              >
                Line
              </button>
            </div>

            {/* Close */}
            <button
              onClick={onClose}
              className="p-1 text-gray-400 hover:text-white rounded hover:bg-gray-500/20 ml-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Live OHLCV Telemetry Bar (Signature TradingView format) */}
        <div
          className={`px-4 py-2 border-b flex flex-wrap items-center justify-between text-xs font-mono-num ${
            isDark ? 'border-[#2a2e39] bg-[#131722]' : 'border-[#e0e3eb] bg-white'
          }`}
        >
          <div className="flex items-center space-x-3 text-[11px]">
            <span className="text-sm font-bold text-white mr-1">
              ${currentPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
            <span className={`font-bold flex items-center ${isPos ? 'text-[#089981]' : 'text-[#f23645]'}`}>
              {isPos ? '+' : ''}{symbol.change.toFixed(2)} ({isPos ? '+' : ''}{symbol.changePercent.toFixed(2)}%)
            </span>
            {hoveredCandle ? (
              <div className="hidden md:flex items-center space-x-2 text-[#787b86]">
                <span>O <strong className="text-white">{hoveredCandle.open}</strong></span>
                <span>H <strong className="text-white">{hoveredCandle.high}</strong></span>
                <span>L <strong className="text-white">{hoveredCandle.low}</strong></span>
                <span>C <strong className="text-white">{hoveredCandle.close}</strong></span>
                <span>Vol <strong className="text-white">{(hoveredCandle.volume / 1000000).toFixed(2)}M</strong></span>
                <span>Time <strong className="text-white">{hoveredCandle.time}</strong></span>
              </div>
            ) : (
              <span className="hidden md:inline text-[#787b86]">
                Vol {symbol.volume || '48.2M'} · Market Cap {symbol.marketCap || '1.2T'}
              </span>
            )}
          </div>

          {/* Indicators Toggle Pills */}
          <div className="flex items-center space-x-1.5 text-[11px]">
            <button
              onClick={() => setShowSMA(!showSMA)}
              className={`px-1.5 py-0.5 rounded border transition ${
                showSMA ? 'border-amber-400 text-amber-400 bg-amber-400/10' : 'border-gray-600 text-gray-500'
              }`}
            >
              SMA 20
            </button>
            <button
              onClick={() => setShowEMA(!showEMA)}
              className={`px-1.5 py-0.5 rounded border transition ${
                showEMA ? 'border-cyan-400 text-cyan-400 bg-cyan-400/10' : 'border-gray-600 text-gray-500'
              }`}
            >
              EMA 50
            </button>
            <button
              onClick={() => setShowRSI(!showRSI)}
              className={`px-1.5 py-0.5 rounded border transition ${
                showRSI ? 'border-purple-400 text-purple-400 bg-purple-400/10' : 'border-gray-600 text-gray-500'
              }`}
            >
              RSI (14)
            </button>
          </div>
        </div>

        {/* Main Canvas Area */}
        <div className="relative flex-1 p-4 overflow-hidden flex flex-col items-center justify-center">
          {tradeMessage && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30 bg-[#2962ff] text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-lg animate-fade-in flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5" />
              <span>{tradeMessage}</span>
            </div>
          )}

          {/* SVG Main Chart with interactive crosshair */}
          <div className="w-full h-80 relative">
            <svg
              viewBox={`0 0 ${chartWidth} ${chartHeight}`}
              className="w-full h-full overflow-visible"
              onMouseLeave={() => setHoveredCandle(null)}
            >
              <defs>
                <linearGradient id="area-gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2962ff" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#2962ff" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Horizontal Grid lines */}
              {Array.from({ length: 5 }).map((_, i) => {
                const y = paddingY + (i / 4) * (chartHeight - paddingY * 2);
                const priceLevel = maxPrice - (i / 4) * priceRange;
                return (
                  <g key={i}>
                    <line
                      x1={paddingX}
                      y1={y}
                      x2={chartWidth - paddingX}
                      y2={y}
                      stroke={isDark ? '#2a2e39' : '#e0e3eb'}
                      strokeDasharray="3 3"
                    />
                    <text
                      x={chartWidth - paddingX + 6}
                      y={y + 4}
                      fill="#787b86"
                      fontSize="9"
                      fontFamily="JetBrains Mono"
                    >
                      {priceLevel.toFixed(priceLevel < 10 ? 4 : 2)}
                    </text>
                  </g>
                );
              })}

              {/* Volume Bars */}
              {showVolume &&
                candles.map((c, i) => {
                  const x = getX(i);
                  const isUp = c.close >= c.open;
                  const volHeight = (c.volume / 3000000) * 40;
                  return (
                    <rect
                      key={`vol-${i}`}
                      x={x - 3}
                      y={chartHeight - paddingY - volHeight}
                      width={6}
                      height={volHeight}
                      fill={isUp ? 'rgba(8, 153, 129, 0.25)' : 'rgba(242, 54, 69, 0.25)'}
                    />
                  );
                })}

              {/* Render Candles or Area or Line */}
              {chartType === 'candles' &&
                candles.map((c, i) => {
                  const x = getX(i);
                  const isUp = c.close >= c.open;
                  const color = isUp ? '#089981' : '#f23645';
                  const top = Math.min(getY(c.open), getY(c.close));
                  const height = Math.max(Math.abs(getY(c.open) - getY(c.close)), 2);

                  return (
                    <g
                      key={`c-${i}`}
                      className="cursor-crosshair"
                      onMouseEnter={() => setHoveredCandle(c)}
                    >
                      {/* High-Low Wick */}
                      <line
                        x1={x}
                        y1={getY(c.high)}
                        x2={x}
                        y2={getY(c.low)}
                        stroke={color}
                        strokeWidth="1.5"
                      />
                      {/* Real Body */}
                      <rect
                        x={x - 4}
                        y={top}
                        width={8}
                        height={height}
                        fill={color}
                        rx="1"
                      />
                    </g>
                  );
                })}

              {chartType === 'area' && (
                <>
                  <path
                    d={`M ${candles.map((c, i) => `${getX(i)},${getY(c.close)}`).join(' L ')} L ${getX(candles.length - 1)},${chartHeight - paddingY} L ${getX(0)},${chartHeight - paddingY} Z`}
                    fill="url(#area-gradient)"
                  />
                  <path
                    d={`M ${candles.map((c, i) => `${getX(i)},${getY(c.close)}`).join(' L ')}`}
                    fill="none"
                    stroke="#2962ff"
                    strokeWidth="2"
                  />
                </>
              )}

              {chartType === 'line' && (
                <path
                  d={`M ${candles.map((c, i) => `${getX(i)},${getY(c.close)}`).join(' L ')}`}
                  fill="none"
                  stroke={isPos ? '#089981' : '#f23645'}
                  strokeWidth="2"
                />
              )}

              {/* SMA 20 Overlay Line */}
              {showSMA && (
                <path
                  d={smaPoints
                    .map((val, i) => (val !== null ? `${i === 4 ? 'M' : 'L'} ${getX(i)},${getY(val)}` : ''))
                    .join(' ')}
                  fill="none"
                  stroke="#f7a600"
                  strokeWidth="1.5"
                  strokeDasharray="4 2"
                />
              )}
            </svg>
          </div>

          {/* RSI (14) Sub-indicator pane */}
          {showRSI && (
            <div className={`w-full mt-2 pt-2 border-t flex items-center justify-between px-4 text-[10px] font-mono-num ${isDark ? 'border-[#2a2e39]' : 'border-[#e0e3eb]'}`}>
              <div className="flex items-center space-x-2">
                <span className="text-purple-400 font-bold">RSI (14)</span>
                <span className="text-white font-bold">58.42</span>
                <span className="text-gray-500">• Neutral Range (30-70)</span>
              </div>
              <div className="w-48 h-2 bg-gray-700 rounded-full overflow-hidden relative">
                <div className="absolute top-0 bottom-0 left-[30%] right-[30%] bg-purple-500/30" />
                <div className="h-full bg-purple-400 w-1.5 rounded-full" style={{ marginLeft: '58%' }} />
              </div>
            </div>
          )}
        </div>

        {/* Paper Trading Order Execution & Position Bar */}
        <div
          className={`px-4 py-3 border-t flex flex-col sm:flex-row items-center justify-between gap-3 ${
            isDark ? 'border-[#2a2e39] bg-[#1e222d]' : 'border-[#e0e3eb] bg-slate-50'
          }`}
        >
          {/* Portfolio metrics */}
          <div className="flex items-center space-x-4 text-xs font-mono-num">
            <div>
              <span className="text-[10px] text-gray-500 block uppercase font-sans">Buying Power</span>
              <span className={`font-bold ${isDark ? 'text-white' : 'text-black'}`}>
                ${portfolioBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </span>
            </div>
            <div>
              <span className="text-[10px] text-gray-500 block uppercase font-sans">Position</span>
              <span className="font-bold text-[#2962ff]">{positionShares} Shares</span>
            </div>
          </div>

          {/* Quick order executor */}
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1 text-xs">
              <span className="text-gray-400 text-[11px]">Qty:</span>
              <input
                type="number"
                min="1"
                max="1000"
                value={tradeShares}
                onChange={e => setTradeShares(Math.max(1, parseInt(e.target.value) || 1))}
                className={`w-16 px-2 py-1 rounded border text-xs font-mono-num text-center ${
                  isDark ? 'bg-[#131722] border-[#2a2e39] text-white' : 'bg-white border-[#e0e3eb] text-black'
                }`}
              />
            </div>

            <button
              onClick={handleBuy}
              className="bg-[#089981] hover:bg-[#089981]/85 text-white font-bold text-xs px-4 py-1.5 rounded transition shadow-sm"
            >
              Buy @ ${currentPrice.toFixed(2)}
            </button>

            <button
              onClick={handleSell}
              disabled={positionShares === 0}
              className="bg-[#f23645] hover:bg-[#f23645]/85 disabled:opacity-40 text-white font-bold text-xs px-4 py-1.5 rounded transition shadow-sm"
            >
              Sell @ ${currentPrice.toFixed(2)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
