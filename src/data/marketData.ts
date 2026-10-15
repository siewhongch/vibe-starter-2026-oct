export interface MarketSymbol {
  symbol: string;
  name: string;
  exchange: string;
  category: 'index' | 'stock' | 'crypto' | 'forex' | 'commodity' | 'bond';
  price: number;
  change: number;
  changePercent: number;
  volume?: string;
  marketCap?: string;
  peRatio?: number;
  high52w?: number;
  low52w?: number;
  rating: 'Strong Buy' | 'Buy' | 'Neutral' | 'Sell' | 'Strong Sell';
  sparkline: number[];
  currency?: string;
}

export interface Candle {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export const TICKER_TAPE: MarketSymbol[] = [
  { symbol: 'SPX', name: 'S&P 500', exchange: 'S&P', category: 'index', price: 5864.67, change: 45.12, changePercent: 0.77, rating: 'Buy', sparkline: [5810, 5822, 5815, 5835, 5848, 5864.67] },
  { symbol: 'NDX', name: 'Nasdaq 100', exchange: 'NASDAQ', category: 'index', price: 20439.12, change: 228.45, changePercent: 1.13, rating: 'Strong Buy', sparkline: [20210, 20250, 20310, 20380, 20439.12] },
  { symbol: 'DJI', name: 'Dow 30', exchange: 'DJ', category: 'index', price: 43065.22, change: 201.36, changePercent: 0.47, rating: 'Buy', sparkline: [42860, 42910, 42980, 43020, 43065.22] },
  { symbol: 'BTCUSD', name: 'Bitcoin', exchange: 'CRYPTO', category: 'crypto', price: 67840.50, change: 1620.25, changePercent: 2.45, rating: 'Strong Buy', sparkline: [66200, 66500, 67100, 67400, 67840.50] },
  { symbol: 'ETHUSD', name: 'Ethereum', exchange: 'CRYPTO', category: 'crypto', price: 2642.10, change: 48.75, changePercent: 1.88, rating: 'Buy', sparkline: [2590, 2605, 2618, 2630, 2642.10] },
  { symbol: 'NVDA', name: 'NVIDIA Corp.', exchange: 'NASDAQ', category: 'stock', price: 138.07, change: 4.19, changePercent: 3.13, rating: 'Strong Buy', sparkline: [133.8, 134.5, 136.2, 137.4, 138.07] },
  { symbol: 'AAPL', name: 'Apple Inc.', exchange: 'NASDAQ', category: 'stock', price: 231.78, change: 1.56, changePercent: 0.68, rating: 'Neutral', sparkline: [230.2, 230.8, 231.1, 231.4, 231.78] },
  { symbol: 'TSLA', name: 'Tesla Inc.', exchange: 'NASDAQ', category: 'stock', price: 221.33, change: 3.42, changePercent: 1.57, rating: 'Buy', sparkline: [217.9, 218.4, 220.1, 220.8, 221.33] },
  { symbol: 'GOLD', name: 'Gold Continuous Contract', exchange: 'COMEX', category: 'commodity', price: 2682.40, change: 8.60, changePercent: 0.32, rating: 'Strong Buy', sparkline: [2673, 2676, 2678, 2680, 2682.40] },
  { symbol: 'USOIL', name: 'Crude Oil WTI', exchange: 'NYMEX', category: 'commodity', price: 70.65, change: -0.60, changePercent: -0.84, rating: 'Sell', sparkline: [71.25, 71.10, 70.90, 70.75, 70.65] },
  { symbol: 'US10Y', name: 'U.S. 10Y Yield', exchange: 'CBOE', category: 'bond', price: 4.032, change: 0.021, changePercent: 0.52, rating: 'Neutral', sparkline: [4.011, 4.018, 4.025, 4.028, 4.032] },
  { symbol: 'EURUSD', name: 'Euro / US Dollar', exchange: 'FX', category: 'forex', price: 1.0892, change: -0.0016, changePercent: -0.15, rating: 'Sell', sparkline: [1.0908, 1.0902, 1.0898, 1.0894, 1.0892] }
];

export const MAJOR_INDICES: MarketSymbol[] = [
  {
    symbol: 'SPX',
    name: 'S&P 500 Index',
    exchange: 'INDEX',
    category: 'index',
    price: 5864.67,
    change: 45.12,
    changePercent: 0.77,
    high52w: 5878.46,
    low52w: 4103.78,
    rating: 'Buy',
    sparkline: [5819, 5824, 5818, 5835, 5845, 5852, 5864.67]
  },
  {
    symbol: 'NDX',
    name: 'Nasdaq 100 Index',
    exchange: 'INDEX',
    category: 'index',
    price: 20439.12,
    change: 228.45,
    changePercent: 1.13,
    high52w: 20690.97,
    low52w: 14058.33,
    rating: 'Strong Buy',
    sparkline: [20210, 20265, 20300, 20380, 20410, 20439.12]
  },
  {
    symbol: 'DJI',
    name: 'Dow Jones Industrial Average',
    exchange: 'INDEX',
    category: 'index',
    price: 43065.22,
    change: 201.36,
    changePercent: 0.47,
    high52w: 43150.12,
    low52w: 32417.73,
    rating: 'Buy',
    sparkline: [42865, 42920, 42960, 43010, 43040, 43065.22]
  },
  {
    symbol: 'RUT',
    name: 'Russell 2000 Small Cap',
    exchange: 'INDEX',
    category: 'index',
    price: 2251.80,
    change: 14.70,
    changePercent: 0.66,
    high52w: 2299.16,
    low52w: 1633.67,
    rating: 'Buy',
    sparkline: [2237, 2240, 2245, 2248, 2251.80]
  },
  {
    symbol: 'DAX',
    name: 'DAX 40 Germany',
    exchange: 'XETR',
    category: 'index',
    price: 19525.60,
    change: 62.40,
    changePercent: 0.32,
    high52w: 19633.80,
    low52w: 14630.20,
    rating: 'Buy',
    sparkline: [19460, 19485, 19510, 19525.60]
  },
  {
    symbol: 'NI225',
    name: 'Nikkei 225 Japan',
    exchange: 'OSE',
    category: 'index',
    price: 39910.55,
    change: 300.20,
    changePercent: 0.76,
    high52w: 42426.77,
    low52w: 30538.29,
    rating: 'Neutral',
    sparkline: [39610, 39750, 39820, 39910.55]
  }
];

export const STOCKS_DATA: Record<string, MarketSymbol[]> = {
  'large-cap': [
    { symbol: 'NVDA', name: 'NVIDIA Corporation', exchange: 'NASDAQ', category: 'stock', price: 138.07, change: 4.19, changePercent: 3.13, volume: '58.4M', marketCap: '3.39T', peRatio: 64.2, rating: 'Strong Buy', sparkline: [133.8, 135.1, 136.4, 137.2, 138.07] },
    { symbol: 'AAPL', name: 'Apple Inc.', exchange: 'NASDAQ', category: 'stock', price: 231.78, change: 1.56, changePercent: 0.68, volume: '42.1M', marketCap: '3.52T', peRatio: 35.1, rating: 'Neutral', sparkline: [230.2, 230.8, 231.2, 231.5, 231.78] },
    { symbol: 'MSFT', name: 'Microsoft Corp.', exchange: 'NASDAQ', category: 'stock', price: 418.15, change: 2.85, changePercent: 0.69, volume: '18.7M', marketCap: '3.11T', peRatio: 35.4, rating: 'Buy', sparkline: [415.3, 416.2, 417.0, 417.8, 418.15] },
    { symbol: 'AMZN', name: 'Amazon.com Inc.', exchange: 'NASDAQ', category: 'stock', price: 187.65, change: 2.15, changePercent: 1.16, volume: '34.2M', marketCap: '1.97T', peRatio: 44.8, rating: 'Strong Buy', sparkline: [185.5, 186.1, 186.9, 187.3, 187.65] },
    { symbol: 'GOOGL', name: 'Alphabet Inc. Cl A', exchange: 'NASDAQ', category: 'stock', price: 166.42, change: 0.92, changePercent: 0.56, volume: '22.8M', marketCap: '2.07T', peRatio: 23.9, rating: 'Buy', sparkline: [165.5, 165.8, 166.1, 166.42] },
    { symbol: 'META', name: 'Meta Platforms Inc.', exchange: 'NASDAQ', category: 'stock', price: 588.24, change: 7.44, changePercent: 1.28, volume: '12.4M', marketCap: '1.49T', peRatio: 28.5, rating: 'Strong Buy', sparkline: [580.8, 583.2, 586.1, 588.24] },
    { symbol: 'TSLA', name: 'Tesla Inc.', exchange: 'NASDAQ', category: 'stock', price: 221.33, change: 3.42, changePercent: 1.57, volume: '71.5M', marketCap: '708.2B', peRatio: 61.2, rating: 'Buy', sparkline: [217.9, 219.0, 220.4, 221.33] },
    { symbol: 'BRK.B', name: 'Berkshire Hathaway B', exchange: 'NYSE', category: 'stock', price: 462.10, change: 1.20, changePercent: 0.26, volume: '3.1M', marketCap: '998.4B', peRatio: 21.4, rating: 'Buy', sparkline: [460.9, 461.2, 461.8, 462.10] },
    { symbol: 'AVGO', name: 'Broadcom Inc.', exchange: 'NASDAQ', category: 'stock', price: 182.40, change: 4.80, changePercent: 2.70, volume: '15.6M', marketCap: '852.1B', peRatio: 38.6, rating: 'Strong Buy', sparkline: [177.6, 179.2, 181.1, 182.40] },
    { symbol: 'JPM', name: 'JPMorgan Chase & Co.', exchange: 'NYSE', category: 'stock', price: 223.50, change: 1.95, changePercent: 0.88, volume: '8.9M', marketCap: '638.7B', peRatio: 12.3, rating: 'Buy', sparkline: [221.5, 222.1, 223.0, 223.50] }
  ],
  'top-gainers': [
    { symbol: 'PLTR', name: 'Palantir Technologies', exchange: 'NYSE', category: 'stock', price: 43.85, change: 3.45, changePercent: 8.54, volume: '84.2M', marketCap: '98.5B', peRatio: 112.4, rating: 'Strong Buy', sparkline: [40.4, 41.5, 42.8, 43.85] },
    { symbol: 'APP', name: 'AppLovin Corp.', exchange: 'NASDAQ', category: 'stock', price: 168.20, change: 12.10, changePercent: 7.75, volume: '9.4M', marketCap: '56.8B', peRatio: 48.2, rating: 'Strong Buy', sparkline: [156.1, 160.2, 165.4, 168.20] },
    { symbol: 'MSTR', name: 'MicroStrategy Inc.', exchange: 'NASDAQ', category: 'stock', price: 194.50, change: 13.80, changePercent: 7.64, volume: '22.1M', marketCap: '39.2B', peRatio: 0, rating: 'Strong Buy', sparkline: [180.7, 185.3, 191.0, 194.50] },
    { symbol: 'COIN', name: 'Coinbase Global Inc.', exchange: 'NASDAQ', category: 'stock', price: 215.30, change: 14.50, changePercent: 7.22, volume: '14.8M', marketCap: '53.1B', peRatio: 42.6, rating: 'Buy', sparkline: [200.8, 206.2, 211.5, 215.30] },
    { symbol: 'ARM', name: 'Arm Holdings plc ADR', exchange: 'NASDAQ', category: 'stock', price: 152.40, change: 8.90, changePercent: 6.20, volume: '11.3M', marketCap: '158.4B', peRatio: 96.1, rating: 'Buy', sparkline: [143.5, 147.0, 150.2, 152.40] },
    { symbol: 'HOOD', name: 'Robinhood Markets Inc.', exchange: 'NASDAQ', category: 'stock', price: 26.85, change: 1.45, changePercent: 5.71, volume: '28.4M', marketCap: '23.8B', peRatio: 38.4, rating: 'Buy', sparkline: [25.4, 25.9, 26.3, 26.85] }
  ],
  'top-losers': [
    { symbol: 'BA', name: 'Boeing Co.', exchange: 'NYSE', category: 'stock', price: 151.20, change: -4.80, changePercent: -3.08, volume: '14.5M', marketCap: '93.2B', peRatio: 0, rating: 'Strong Sell', sparkline: [156.0, 154.5, 152.8, 151.20] },
    { symbol: 'INTC', name: 'Intel Corporation', exchange: 'NASDAQ', category: 'stock', price: 22.84, change: -0.68, changePercent: -2.89, volume: '48.9M', marketCap: '97.6B', peRatio: 0, rating: 'Sell', sparkline: [23.52, 23.20, 23.05, 22.84] },
    { symbol: 'NKE', name: 'Nike Inc. Cl B', exchange: 'NYSE', category: 'stock', price: 81.40, change: -2.15, changePercent: -2.57, volume: '11.2M', marketCap: '122.8B', peRatio: 24.3, rating: 'Neutral', sparkline: [83.55, 82.80, 82.10, 81.40] },
    { symbol: 'ENPH', name: 'Enphase Energy Inc.', exchange: 'NASDAQ', category: 'stock', price: 92.15, change: -2.35, changePercent: -2.49, volume: '4.6M', marketCap: '12.4B', peRatio: 31.8, rating: 'Sell', sparkline: [94.50, 93.80, 93.00, 92.15] },
    { symbol: 'WBA', name: 'Walgreens Boots Alliance', exchange: 'NASDAQ', category: 'stock', price: 9.12, change: -0.22, changePercent: -2.36, volume: '18.1M', marketCap: '7.8B', peRatio: 0, rating: 'Strong Sell', sparkline: [9.34, 9.25, 9.18, 9.12] },
    { symbol: 'DIS', name: 'Walt Disney Co.', exchange: 'NYSE', category: 'stock', price: 95.80, change: -1.70, changePercent: -1.74, volume: '8.9M', marketCap: '174.1B', peRatio: 36.2, rating: 'Neutral', sparkline: [97.50, 96.90, 96.20, 95.80] }
  ],
  'most-active': [
    { symbol: 'NVDA', name: 'NVIDIA Corporation', exchange: 'NASDAQ', category: 'stock', price: 138.07, change: 4.19, changePercent: 3.13, volume: '58.4M', marketCap: '3.39T', peRatio: 64.2, rating: 'Strong Buy', sparkline: [133.8, 135.1, 136.4, 137.2, 138.07] },
    { symbol: 'TSLA', name: 'Tesla Inc.', exchange: 'NASDAQ', category: 'stock', price: 221.33, change: 3.42, changePercent: 1.57, volume: '71.5M', marketCap: '708.2B', peRatio: 61.2, rating: 'Buy', sparkline: [217.9, 219.0, 220.4, 221.33] },
    { symbol: 'PLTR', name: 'Palantir Technologies', exchange: 'NYSE', category: 'stock', price: 43.85, change: 3.45, changePercent: 8.54, volume: '84.2M', marketCap: '98.5B', peRatio: 112.4, rating: 'Strong Buy', sparkline: [40.4, 41.5, 42.8, 43.85] },
    { symbol: 'AMD', name: 'Advanced Micro Devices', exchange: 'NASDAQ', category: 'stock', price: 156.25, change: 1.95, changePercent: 1.26, volume: '46.8M', marketCap: '253.2B', peRatio: 118.0, rating: 'Buy', sparkline: [154.3, 155.1, 155.8, 156.25] },
    { symbol: 'INTC', name: 'Intel Corporation', exchange: 'NASDAQ', category: 'stock', price: 22.84, change: -0.68, changePercent: -2.89, volume: '48.9M', marketCap: '97.6B', peRatio: 0, rating: 'Sell', sparkline: [23.52, 23.20, 23.05, 22.84] },
    { symbol: 'SOFI', name: 'SoFi Technologies Inc.', exchange: 'NASDAQ', category: 'stock', price: 9.45, change: 0.32, changePercent: 3.50, volume: '52.3M', marketCap: '9.9B', peRatio: 41.2, rating: 'Buy', sparkline: [9.13, 9.25, 9.38, 9.45] }
  ]
};

export const CRYPTO_DATA: MarketSymbol[] = [
  { symbol: 'BTCUSD', name: 'Bitcoin', exchange: 'BINANCE', category: 'crypto', price: 67840.50, change: 1620.25, changePercent: 2.45, volume: '38.2B', marketCap: '1.34T', rating: 'Strong Buy', sparkline: [66220, 66540, 67100, 67450, 67840.50] },
  { symbol: 'ETHUSD', name: 'Ethereum', exchange: 'BINANCE', category: 'crypto', price: 2642.10, change: 48.75, changePercent: 1.88, volume: '18.4B', marketCap: '317.8B', rating: 'Buy', sparkline: [2593, 2608, 2622, 2635, 2642.10] },
  { symbol: 'SOLUSD', name: 'Solana', exchange: 'COINBASE', category: 'crypto', price: 154.80, change: 6.20, changePercent: 4.17, volume: '4.8B', marketCap: '72.6B', rating: 'Strong Buy', sparkline: [148.6, 150.2, 152.9, 154.80] },
  { symbol: 'BNBUSD', name: 'BNB', exchange: 'BINANCE', category: 'crypto', price: 592.30, change: 5.80, changePercent: 0.99, volume: '1.2B', marketCap: '86.4B', rating: 'Buy', sparkline: [586.5, 588.4, 590.2, 592.30] },
  { symbol: 'XRPUSD', name: 'XRP', exchange: 'KRAKEN', category: 'crypto', price: 0.5482, change: 0.0124, changePercent: 2.31, volume: '1.4B', marketCap: '31.2B', rating: 'Neutral', sparkline: [0.5358, 0.5401, 0.5442, 0.5482] },
  { symbol: 'DOGEUSD', name: 'Dogecoin', exchange: 'BINANCE', category: 'crypto', price: 0.1245, change: 0.0058, changePercent: 4.89, volume: '980M', marketCap: '18.2B', rating: 'Buy', sparkline: [0.1187, 0.1210, 0.1232, 0.1245] }
];

export const FOREX_DATA: MarketSymbol[] = [
  { symbol: 'EURUSD', name: 'Euro / US Dollar', exchange: 'FX_IDC', category: 'forex', price: 1.0892, change: -0.0016, changePercent: -0.15, rating: 'Sell', sparkline: [1.0908, 1.0902, 1.0898, 1.0892] },
  { symbol: 'GBPUSD', name: 'British Pound / US Dollar', exchange: 'FX_IDC', category: 'forex', price: 1.3065, change: 0.0018, changePercent: 0.14, rating: 'Neutral', sparkline: [1.3047, 1.3055, 1.3060, 1.3065] },
  { symbol: 'USDJPY', name: 'US Dollar / Japanese Yen', exchange: 'FX_IDC', category: 'forex', price: 149.25, change: 0.42, changePercent: 0.28, rating: 'Buy', sparkline: [148.83, 149.02, 149.18, 149.25] },
  { symbol: 'USDCHF', name: 'US Dollar / Swiss Franc', exchange: 'FX_IDC', category: 'forex', price: 0.8624, change: 0.0011, changePercent: 0.13, rating: 'Neutral', sparkline: [0.8613, 0.8618, 0.8621, 0.8624] },
  { symbol: 'AUDUSD', name: 'Australian Dollar / US Dollar', exchange: 'FX_IDC', category: 'forex', price: 0.6712, change: -0.0022, changePercent: -0.33, rating: 'Sell', sparkline: [0.6734, 0.6725, 0.6718, 0.6712] },
  { symbol: 'USDCAD', name: 'US Dollar / Canadian Dollar', exchange: 'FX_IDC', category: 'forex', price: 1.3785, change: 0.0025, changePercent: 0.18, rating: 'Buy', sparkline: [1.3760, 1.3772, 1.3780, 1.3785] }
];

export const COMMODITIES_DATA: MarketSymbol[] = [
  { symbol: 'GOLD', name: 'Gold Continuous Contract', exchange: 'COMEX', category: 'commodity', price: 2682.40, change: 8.60, changePercent: 0.32, rating: 'Strong Buy', sparkline: [2673, 2676, 2680, 2682.40] },
  { symbol: 'SILVER', name: 'Silver Continuous Contract', exchange: 'COMEX', category: 'commodity', price: 31.85, change: 0.42, changePercent: 1.34, rating: 'Strong Buy', sparkline: [31.43, 31.60, 31.75, 31.85] },
  { symbol: 'USOIL', name: 'Crude Oil WTI', exchange: 'NYMEX', category: 'commodity', price: 70.65, change: -0.60, changePercent: -0.84, rating: 'Sell', sparkline: [71.25, 71.05, 70.80, 70.65] },
  { symbol: 'BRENT', name: 'Brent Crude Oil', exchange: 'ICEEUR', category: 'commodity', price: 74.45, change: -0.55, changePercent: -0.73, rating: 'Sell', sparkline: [75.00, 74.80, 74.60, 74.45] },
  { symbol: 'NGAS', name: 'Natural Gas', exchange: 'NYMEX', category: 'commodity', price: 2.385, change: -0.045, changePercent: -1.85, rating: 'Strong Sell', sparkline: [2.430, 2.410, 2.395, 2.385] },
  { symbol: 'COPPER', name: 'Copper Futures', exchange: 'COMEX', category: 'commodity', price: 4.382, change: 0.028, changePercent: 0.64, rating: 'Buy', sparkline: [4.354, 4.368, 4.375, 4.382] }
];

export const BONDS_DATA: MarketSymbol[] = [
  { symbol: 'US10Y', name: 'U.S. 10Y Treasury Note Yield', exchange: 'CBOE', category: 'bond', price: 4.032, change: 0.021, changePercent: 0.52, rating: 'Neutral', sparkline: [4.011, 4.020, 4.028, 4.032] },
  { symbol: 'US02Y', name: 'U.S. 2Y Treasury Note Yield', exchange: 'CBOE', category: 'bond', price: 3.945, change: 0.015, changePercent: 0.38, rating: 'Neutral', sparkline: [3.930, 3.938, 3.942, 3.945] },
  { symbol: 'US30Y', name: 'U.S. 30Y Treasury Bond Yield', exchange: 'CBOE', category: 'bond', price: 4.328, change: 0.025, changePercent: 0.58, rating: 'Buy', sparkline: [4.303, 4.315, 4.322, 4.328] },
  { symbol: 'DE10Y', name: 'Germany 10Y Bund Yield', exchange: 'EUREX', category: 'bond', price: 2.224, change: -0.008, changePercent: -0.36, rating: 'Sell', sparkline: [2.232, 2.228, 2.225, 2.224] }
];

export const SECTORS = [
  { name: 'Technology', symbol: 'XLK', changePercent: 1.62, topStock: 'NVDA +3.13%' },
  { name: 'Communication Services', symbol: 'XLC', changePercent: 1.18, topStock: 'META +1.28%' },
  { name: 'Consumer Discretionary', symbol: 'XLY', changePercent: 0.95, topStock: 'TSLA +1.57%' },
  { name: 'Financials', symbol: 'XLF', changePercent: 0.48, topStock: 'JPM +0.88%' },
  { name: 'Industrials', symbol: 'XLI', changePercent: 0.32, topStock: 'CAT +1.02%' },
  { name: 'Health Care', symbol: 'XLV', changePercent: -0.15, topStock: 'UNH -0.45%' },
  { name: 'Materials', symbol: 'XLB', changePercent: -0.42, topStock: 'LIN -0.62%' },
  { name: 'Energy', symbol: 'XLE', changePercent: -0.88, topStock: 'XOM -0.92%' },
  { name: 'Utilities', symbol: 'XLU', changePercent: -1.05, topStock: 'NEE -1.20%' },
  { name: 'Real Estate', symbol: 'XLRE', changePercent: -1.24, topStock: 'PLD -1.45%' }
];

export const ECONOMIC_EVENTS = [
  { time: '08:30 AM', currency: 'USD', title: 'Core Consumer Price Index (MoM)', impact: 'High', actual: '0.3%', forecast: '0.2%', prior: '0.3%' },
  { time: '08:30 AM', currency: 'USD', title: 'Initial Jobless Claims', impact: 'Medium', actual: '241K', forecast: '258K', prior: '260K' },
  { time: '10:00 AM', currency: 'USD', title: 'Philadelphia Fed Manufacturing Index', impact: 'Medium', actual: '10.3', forecast: '3.0', prior: '1.7' },
  { time: '11:00 AM', currency: 'USD', title: 'EIA Crude Oil Stocks Change', impact: 'Medium', actual: '-2.19M', forecast: '+1.50M', prior: '+5.81M' },
  { time: '02:00 PM', currency: 'USD', title: 'Fed FOMC Member Waller Speech', impact: 'High', actual: 'Dovish', forecast: '—', prior: '—' }
];

// Helper to generate simulated realistic candlestick series
export function generateCandles(basePrice: number, count: number = 30): Candle[] {
  const candles: Candle[] = [];
  let currentClose = basePrice * 0.95;
  const now = new Date();

  for (let i = count - 1; i >= 0; i--) {
    const d = new Date(now.getTime() - i * 3600 * 1000 * 4);
    const timeStr = `${d.getMonth() + 1}/${d.getDate()} ${d.getHours()}:00`;
    const volatility = currentClose * 0.015;
    const open = currentClose;
    const delta = (Math.random() - 0.48) * volatility;
    const close = +(open + delta).toFixed(2);
    const high = +(Math.max(open, close) + Math.random() * volatility * 0.6).toFixed(2);
    const low = +(Math.min(open, close) - Math.random() * volatility * 0.6).toFixed(2);
    const volume = Math.floor(Math.random() * 2000000 + 500000);

    candles.push({ time: timeStr, open, high, low, close, volume });
    currentClose = close;
  }

  // Ensure last candle closes near basePrice
  if (candles.length > 0) {
    candles[candles.length - 1].close = basePrice;
    candles[candles.length - 1].high = Math.max(candles[candles.length - 1].high, basePrice);
  }

  return candles;
}
