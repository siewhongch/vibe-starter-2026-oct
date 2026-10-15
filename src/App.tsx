import React, { useState, useEffect } from 'react';
import {
  Search,
  Bookmark,
  Share2,
  Headphones,
  Check,
  ChevronRight,
  Flame,
  MessageSquare,
  Globe,
  Sparkles,
  ExternalLink,
  BookOpen
} from 'lucide-react';
import { ARTICLES, Article, WIRECUTTER_ITEMS, FIELD_REPORTS } from './data/newsData';
import { WordleModal } from './components/WordleModal';
import { MiniCrosswordModal } from './components/MiniCrosswordModal';
import { ConnectionsModal } from './components/ConnectionsModal';
import { SpellingBeeModal } from './components/SpellingBeeModal';
import { ArticleModal } from './components/ArticleModal';
import { SearchModal } from './components/SearchModal';
import { SubscribeModal } from './components/SubscribeModal';
import { LoginModal } from './components/LoginModal';
import { WirecutterModal } from './components/WirecutterModal';
import { CookingModal } from './components/CookingModal';
import { TechTipModal } from './components/TechTipModal';
import { SavedArticlesDrawer } from './components/SavedArticlesDrawer';
import { AudioBar } from './components/AudioBar';

export default function App() {
  // Modal states
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);
  const [isArticleModalOpen, setIsArticleModalOpen] = useState(false);
  const [isWordleOpen, setIsWordleOpen] = useState(false);
  const [isMiniOpen, setIsMiniOpen] = useState(false);
  const [isConnectionsOpen, setIsConnectionsOpen] = useState(false);
  const [isSpellingBeeOpen, setIsSpellingBeeOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSubscribeOpen, setIsSubscribeOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isWirecutterOpen, setIsWirecutterOpen] = useState(false);
  const [wirecutterSelectedId, setWirecutterSelectedId] = useState<string>('wc1');
  const [isCookingOpen, setIsCookingOpen] = useState(false);
  const [isTechTipOpen, setIsTechTipOpen] = useState(false);
  const [isSavedDrawerOpen, setIsSavedDrawerOpen] = useState(false);
  const [isAudioBarOpen, setIsAudioBarOpen] = useState(false);
  const [audioTitle, setAudioTitle] = useState('The Daily: Inside the Shift in Trump’s Inner Circle');

  // User state
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [savedArticleIds, setSavedArticleIds] = useState<string[]>(['press-secretary-attorney']);
  const [selectedEdition, setSelectedEdition] = useState<'us' | 'international' | 'canada' | 'espanol' | 'chinese'>('us');
  const [activeNavSection, setActiveNavSection] = useState<string>('Home');
  const [bannerDismissed, setBannerDismissed] = useState(false);

  // Load bookmarks
  useEffect(() => {
    const stored = localStorage.getItem('nyt_saved_articles');
    if (stored) {
      try {
        setSavedArticleIds(JSON.parse(stored));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const handleToggleBookmark = (id: string) => {
    setSavedArticleIds(prev => {
      const next = prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id];
      localStorage.setItem('nyt_saved_articles', JSON.stringify(next));
      return next;
    });
  };

  const handleOpenArticle = (art: Article) => {
    setActiveArticle(art);
    setIsArticleModalOpen(true);
  };

  const handlePlayAudio = (title?: string) => {
    if (title) setAudioTitle(title);
    setIsAudioBarOpen(true);
  };

  return (
    <div className="bg-white min-h-screen text-[#121212] antialiased flex flex-col justify-between selection:bg-[#fff2a8] selection:text-black">
      {/* Top Banner Notice when edition changes */}
      {selectedEdition !== 'us' && (
        <div className="bg-gray-100 text-black py-1.5 px-4 text-xs text-center border-b border-gray-300 flex items-center justify-center space-x-2">
          <Globe className="w-3.5 h-3.5" />
          <span>
            You are viewing the <strong>{selectedEdition.toUpperCase()}</strong> edition. Stories are curated for this region.
          </span>
          <button
            onClick={() => setSelectedEdition('us')}
            className="text-nytBlue underline font-bold ml-2 text-[11px]"
          >
            Switch to U.S.
          </button>
        </div>
      )}

      {/* BEGIN: SiteHeader */}
      <header className="w-full max-w-[1240px] mx-auto px-4 pt-2">
        {/* Top Utility Bar: Search, Editions, Date, Today's Paper & Authentication Actions */}
        <div className="flex items-center justify-between text-xs py-1.5 border-b border-gray-200 text-[#5a5a5a]" data-purpose="top-utility-bar">
          {/* Left: Search & Editions */}
          <div className="flex items-center space-x-4">
            {/* Search Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search"
              className="flex items-center space-x-1.5 hover:text-black transition cursor-pointer"
            >
              <Search className="w-3.5 h-3.5 text-black" />
              <span className="uppercase tracking-wider font-semibold text-[10px]">Search</span>
            </button>

            {/* Edition Selector Links */}
            <nav aria-label="International Editions" className="hidden md:flex items-center space-x-2 text-[11px] font-medium border-l border-gray-300 pl-3">
              <button
                onClick={() => setSelectedEdition('us')}
                className={`transition ${selectedEdition === 'us' ? 'font-bold text-black border-b border-black' : 'hover:text-black text-gray-600'}`}
              >
                U.S.
              </button>
              <span className="text-gray-300">|</span>
              <button
                onClick={() => setSelectedEdition('international')}
                className={`transition ${selectedEdition === 'international' ? 'font-bold text-black border-b border-black' : 'hover:text-black text-gray-600'}`}
              >
                International
              </button>
              <span className="text-gray-300">|</span>
              <button
                onClick={() => setSelectedEdition('canada')}
                className={`transition ${selectedEdition === 'canada' ? 'font-bold text-black border-b border-black' : 'hover:text-black text-gray-600'}`}
              >
                Canada
              </button>
              <span className="text-gray-300">|</span>
              <button
                onClick={() => setSelectedEdition('espanol')}
                className={`transition ${selectedEdition === 'espanol' ? 'font-bold text-black border-b border-black' : 'hover:text-black text-gray-600'}`}
              >
                Español
              </button>
              <span className="text-gray-300">|</span>
              <button
                onClick={() => setSelectedEdition('chinese')}
                className={`transition ${selectedEdition === 'chinese' ? 'font-bold text-black border-b border-black' : 'hover:text-black text-gray-600'}`}
              >
                中文
              </button>
            </nav>
          </div>

          {/* Right: Live Date Stamp, Subscription CTA and Login */}
          <div className="flex items-center space-x-3">
            {/* Date Stamp */}
            <div className="hidden sm:flex flex-col text-right leading-tight pr-2">
              <span className="font-bold text-black text-[11px]">Wednesday, October 14, 2026</span>
              <button
                onClick={() => alert("Today's Paper is archived in digital broadsheet replica format.")}
                className="text-[10px] text-[#727272] hover:underline text-right"
              >
                Today’s Paper
              </button>
            </div>

            {/* Saved Articles Bookmark shortcut */}
            <button
              onClick={() => setIsSavedDrawerOpen(true)}
              className="p-1 text-gray-500 hover:text-black rounded transition relative flex items-center gap-1 text-[11px]"
              title="Saved reading list"
            >
              <Bookmark className="w-4 h-4 text-amber-700" fill={savedArticleIds.length > 0 ? 'currentColor' : 'none'} />
              <span className="hidden sm:inline font-bold">{savedArticleIds.length}</span>
            </button>

            {/* CTA Subscribe Button */}
            <button
              onClick={() => setIsSubscribeOpen(true)}
              className="bg-[#326891] hover:bg-[#254e6d] text-white px-2.5 py-1 rounded text-[11px] font-bold tracking-wide uppercase transition duration-150 cursor-pointer shadow-2xs"
            >
              Subscribe for $1/week
            </button>

            {/* Log In Button */}
            <button
              onClick={() => setIsLoginOpen(true)}
              className="border border-gray-400 hover:border-black px-2.5 py-1 rounded text-[11px] font-bold text-black transition cursor-pointer"
            >
              {userEmail ? 'Account' : 'Log In'}
            </button>
          </div>
        </div>

        {/* Iconic Center Masthead */}
        <div className="text-center pt-3 pb-2" data-purpose="masthead-brand">
          <a
            href="/"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="inline-block hover:opacity-95 transition-opacity"
            title="The New York Times"
          >
            <h1 className="font-masthead text-5xl md:text-7xl lg:text-[76px] tracking-tight leading-none text-black select-none">
              The New York Times
            </h1>
          </a>
        </div>

        {/* Primary Section Navigation Bar */}
        <nav className="border-double-bottom pt-1 pb-1.5 mb-1.5 overflow-x-auto no-scrollbar" data-purpose="primary-sections-navigation">
          <ul className="flex items-center justify-between text-[12px] whitespace-nowrap tracking-tight font-medium text-black px-1 min-w-[760px]">
            <li>
              <button
                onClick={() => { setActiveNavSection('U.S.'); alert("Navigating to U.S. News Section"); }}
                className="hover:underline py-1 cursor-pointer"
              >
                U.S.
              </button>
            </li>
            <li>
              <button
                onClick={() => { setActiveNavSection('World'); alert("Navigating to World News Section"); }}
                className="hover:underline py-1 cursor-pointer"
              >
                World
              </button>
            </li>
            <li>
              <button
                onClick={() => { setActiveNavSection('Business'); alert("Navigating to Business & Markets Section"); }}
                className="hover:underline py-1 cursor-pointer"
              >
                Business
              </button>
            </li>
            <li>
              <button
                onClick={() => { setActiveNavSection('Arts'); alert("Navigating to Arts & Entertainment Section"); }}
                className="hover:underline py-1 cursor-pointer"
              >
                Arts
              </button>
            </li>
            <li>
              <button
                onClick={() => { setActiveNavSection('Lifestyle'); alert("Navigating to Lifestyle & Culture Section"); }}
                className="hover:underline py-1 cursor-pointer"
              >
                Lifestyle
              </button>
            </li>
            <li>
              <a href="#opinion" className="hover:underline py-1 cursor-pointer">
                Opinion
              </a>
            </li>
            <li>
              <button
                onClick={() => handlePlayAudio('The Daily: Special Front-Page Report')}
                className="hover:underline py-1 cursor-pointer flex items-center gap-1"
              >
                <Headphones className="w-3.5 h-3.5 text-black" />
                <span>Audio</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => setIsWordleOpen(true)}
                className="hover:underline py-1 font-semibold cursor-pointer text-emerald-800"
              >
                Games
              </button>
            </li>
            <li>
              <button
                onClick={() => setIsCookingOpen(true)}
                className="hover:underline py-1 font-semibold cursor-pointer text-orange-800"
              >
                Cooking
              </button>
            </li>
            <li>
              <button
                onClick={() => { setWirecutterSelectedId('wc1'); setIsWirecutterOpen(true); }}
                className="hover:underline py-1 font-semibold cursor-pointer"
              >
                Wirecutter
              </button>
            </li>
            <li>
              <button
                onClick={() => alert("The Athletic: Premier sports reporting, scores and in-depth analytics.")}
                className="hover:underline py-1 font-semibold cursor-pointer"
              >
                The Athletic
              </button>
            </li>
          </ul>
        </nav>

        {/* Sub-header Alert / Free to read Banner */}
        {!bannerDismissed && (
          <div className="py-1 text-center border-b border-gray-200 mb-4 flex items-center justify-center relative">
            <p className="text-xs text-[#727272]">
              These top stories are <span className="font-bold text-black">free to read.</span>
            </p>
            <button
              onClick={() => setBannerDismissed(true)}
              className="absolute right-0 text-gray-400 hover:text-black text-xs px-2"
              title="Dismiss"
            >
              ✕
            </button>
          </div>
        )}
      </header>
      {/* END: SiteHeader */}

      {/* BEGIN: MainContent */}
      <main className="w-full max-w-[1240px] mx-auto px-4 grow">
        {/* Top Grid Layout: 3 Columns Classic Broadsheet Arrangement */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-6 pb-6 border-b border-gray-300" data-purpose="top-stories-grid">
          {/* LEFT COLUMN: Lead Investigative & Breaking (Cols 1-4) */}
          <article className="md:col-span-4 flex flex-col justify-between pr-0 md:pr-4 md:border-r border-gray-200" data-purpose="lead-left-story">
            <div>
              {/* Story 1: Lead Trump Cabinet Departure */}
              <div className="pb-5 border-b border-gray-200">
                <div
                  onClick={() => handleOpenArticle(ARTICLES['trump-women-departures'])}
                  className="group cursor-pointer"
                >
                  <h2 className="nyt-serif text-2xl lg:text-[26px] font-bold leading-tight text-[#121212] group-hover:text-gray-600 transition">
                    High-Ranking Women Are Leaving the Trump Administration
                  </h2>
                </div>
                <p className="nyt-serif text-[15px] leading-snug text-[#121212] mt-2">
                  In the president’s second term, those heading for the exits are female officials, leaving an inner circle dominated by long-serving loyalists.
                </p>
                <div className="flex items-center space-x-2 text-[11px] text-[#727272] mt-2">
                  <span>5 min read</span>
                  <span>•</span>
                  <span
                    onClick={() => handleOpenArticle(ARTICLES['trump-women-departures'])}
                    className="hover:underline cursor-pointer"
                  >
                    Tierney L. Cross / The New York Times
                  </span>
                </div>
              </div>

              {/* Story 2: Secondary Political Fall */}
              <div className="pt-4">
                <div
                  onClick={() => handleOpenArticle(ARTICLES['guilfoyle-fall'])}
                  className="group cursor-pointer"
                >
                  <h3 className="nyt-serif text-lg font-bold leading-snug text-[#121212] group-hover:text-gray-600 transition">
                    The Steep Rise and Sudden Fall of Kimberly Guilfoyle
                  </h3>
                </div>
                <p className="nyt-serif text-[13px] leading-snug text-[#5a5a5a] mt-1.5">
                  An ambitious trajectory from cable news pundit to presidential campaign insider reaches a sharp conclusion amid ambassadorial tensions.
                </p>
                <div className="flex items-center space-x-2 text-[11px] text-[#727272] mt-2">
                  <button
                    onClick={() => handleOpenArticle(ARTICLES['guilfoyle-fall'])}
                    className="flex items-center space-x-1 text-[#326891] hover:underline"
                  >
                    <MessageSquare className="w-3 h-3 fill-current" />
                    <span>519 comments</span>
                  </button>
                  <span>•</span>
                  <span>3 min read</span>
                </div>
              </div>
            </div>

            {/* Secondary Opinion Teaser at base of Column 1 */}
            <div className="mt-6 pt-4 border-t border-gray-200 bg-gray-50 p-3 rounded-sm">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#b88b4a]">Election Dispatches</span>
              <div
                onClick={() => handleOpenArticle(ARTICLES['texas-senate-race'])}
                className="block group mt-1 cursor-pointer"
              >
                <h4 className="nyt-serif text-sm font-bold text-black group-hover:underline">
                  Texas Senate Race Tightens, Polls Show, Even as Talarico Keeps His Edge
                </h4>
              </div>
              <span className="text-[11px] text-[#727272] mt-1 block">2 min read</span>
            </div>
          </article>

          {/* CENTER COLUMN: Primary Visual & Centerpiece (Cols 5-8) */}
          <article className="md:col-span-5 flex flex-col justify-between pr-0 md:pr-4 md:border-r border-gray-200" data-purpose="lead-center-story">
            <div>
              {/* Featured Editorial Image */}
              <div
                onClick={() => handleOpenArticle(ARTICLES['press-secretary-attorney'])}
                className="overflow-hidden bg-gray-100 cursor-pointer group"
              >
                <img
                  alt="Portrait of official in professional attire with glasses"
                  className="w-full h-[270px] lg:h-[310px] object-cover object-top group-hover:scale-[1.01] transition duration-300"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDnTIWo3IH87Tfr_mdUiywauvtb_zbYRyc2iiXX7dBEowM_p2yoMH3udMA7AfOIjWO7BwBJGSJ48AutaG-RA07rKAYiCyvgc-BbMilnx3EkxTIPlXIYud8wWbfQOVCnbkhsMBYFtZULXL2KuayIbwHVDztwCJ7OuTY9JTZqaTxFdbTPmugDMvHBUV4sreYbdI9xPO7bVBPTJEC7pNXpgya2VwYLr7PU7TqUnu5EQba7_bwA8YPUKLlhHA"
                />
                <p className="text-[10px] text-[#727272] text-right pt-1 pb-2">Tierney L. Cross/The New York Times</p>
              </div>

              {/* Headline and Excerpt */}
              <div className="mt-2 text-center md:text-left">
                <div
                  onClick={() => handleOpenArticle(ARTICLES['press-secretary-attorney'])}
                  className="group cursor-pointer"
                >
                  <h2 className="nyt-serif text-2xl lg:text-[28px] font-bold leading-tight text-[#121212] group-hover:text-gray-600 transition">
                    Trump’s New Press Secretary: Not-Quite Attorney at Law
                  </h2>
                </div>
                <p className="nyt-serif text-[15px] leading-relaxed text-[#121212] mt-2">
                  Katie Zacharia told The New York Times that the confusion over her legal credentials is the result of one big misunderstanding that took place while transitioning between judicial circuits.
                </p>
                <div className="flex items-center justify-center md:justify-start space-x-2 text-[11px] text-[#727272] mt-3">
                  <span>4 min read</span>
                  <span>•</span>
                  <button
                    onClick={() => {
                      setSelectedEdition('espanol');
                      handleOpenArticle(ARTICLES['press-secretary-attorney']);
                    }}
                    className="text-[#326891] hover:underline"
                  >
                    Read in Español
                  </button>
                </div>
              </div>
            </div>

            {/* Highlight Bullet Points under Center Story */}
            <div className="mt-6 pt-3 border-t border-gray-200 text-xs">
              <ul className="space-y-2 nyt-serif text-[13px] text-[#121212] list-disc pl-4">
                <li>
                  <button
                    onClick={() => alert("Jon Ossoff Campaign Dispatch: Georgia senator discusses 2028 landscape.")}
                    className="hover:underline text-left"
                  >
                    Jon Ossoff says he’s not running for president, but history says he can change his mind.
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => alert("Midterm Ad Spending Investigation: Federal election finance disclosures top $10B.")}
                    className="hover:underline text-left"
                  >
                    The breathtaking cost of the midterms: $10 billion and counting on ads.
                  </button>
                </li>
              </ul>
            </div>
          </article>

          {/* RIGHT COLUMN: International & Fast Breaking News (Cols 9-12) */}
          <aside className="md:col-span-3 flex flex-col justify-between space-y-4" data-purpose="right-sidebar-coverage">
            {/* Section: Russia-Ukraine War Cluster */}
            <div>
              <div className="border-b border-black pb-1 mb-2.5 flex items-center justify-between">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-black">Russia-Ukraine War</span>
                <span className="text-[10px] text-red-700 font-bold uppercase tracking-wider animate-pulse flex items-center gap-1">
                  <span>●</span> Developing
                </span>
              </div>
              <div
                onClick={() => handleOpenArticle(ARTICLES['ukraine-satellite-restricted'])}
                className="group block mb-2 cursor-pointer"
              >
                <h3 className="nyt-serif text-base font-bold leading-snug text-[#121212] group-hover:underline">
                  Ukraine’s Exposure Grows as Satellite Use Is Restricted and Russia Escalates
                </h3>
              </div>
              <p className="nyt-serif text-xs leading-normal text-[#5a5a5a]">
                A huge attack cut power to 600,000 people in Kyiv, and a Pentagon-funded satellite internet program appeared to be curbed without warning.
              </p>
              <div className="flex items-center space-x-2 text-[11px] text-[#727272] mt-1.5 pb-3 border-b border-gray-200">
                <button
                  onClick={() => handleOpenArticle(ARTICLES['ukraine-satellite-restricted'])}
                  className="text-[#326891] hover:underline"
                >
                  1.1k comments
                </button>
                <span>•</span>
                <span>4 min read</span>
              </div>

              {/* Secondary Story in Right Rail */}
              <div className="pt-3">
                <div
                  onClick={() => handleOpenArticle(ARTICLES['trump-diesel-putin'])}
                  className="group block cursor-pointer"
                >
                  <h4 className="nyt-serif text-sm font-bold leading-snug text-[#121212] group-hover:underline">
                    Why Trump’s Diesel Deal With Putin Won’t Knock Down High Prices
                  </h4>
                </div>
                <span className="text-[11px] text-[#727272] mt-1 block">4 min read</span>
              </div>

              <div className="pt-2">
                <div
                  onClick={() => handleOpenArticle(ARTICLES['us-intelligence-ukraine'])}
                  className="group block cursor-pointer"
                >
                  <h4 className="nyt-serif text-sm font-bold leading-snug text-[#121212] group-hover:underline">
                    The U.S. Continues to Provide Intelligence to Ukraine, Officials Say
                  </h4>
                </div>
                <span className="text-[11px] text-[#727272] mt-1 block">3 min read</span>
              </div>
            </div>

            {/* The Evening Briefing Feature Box */}
            <div className="border-t-2 border-black pt-3 bg-gray-50 p-3 rounded">
              <span className="text-[10px] font-black uppercase tracking-wider text-[#121212]">The Evening</span>
              <div
                onClick={() => handleOpenArticle(ARTICLES['evening-briefing'])}
                className="group block mt-1 cursor-pointer"
              >
                <h4 className="nyt-serif text-base font-bold text-[#121212] group-hover:underline leading-snug">
                  Catch Up on Today’s Biggest Stories
                </h4>
              </div>
              <p className="nyt-serif text-xs text-[#5a5a5a] mt-1">
                Energy prices lift inflation, Ukraine grows more vulnerable and the Texas Senate race tightens.
              </p>
              <span className="text-[10px] text-[#727272] mt-2 block font-medium">5 min read • Evgeniy Maloletka / AP</span>
            </div>
          </aside>
        </section>

        {/* Mid-Page Feature Band: Artificial Intelligence & Technology */}
        <section className="py-6 border-b border-gray-300" data-purpose="ai-and-tech-strip">
          <div className="flex items-center justify-between pb-2 mb-4 border-b border-black">
            <h3 className="font-serif text-xl font-bold tracking-tight text-black flex items-center space-x-2">
              <span>Artificial Intelligence</span>
              <span className="text-xs font-normal text-[#727272]">| Special Coverage</span>
            </h3>
            <button
              onClick={() => { setActiveNavSection('Technology'); setIsSearchOpen(true); }}
              className="text-xs text-[#326891] hover:underline font-medium"
            >
              Explore All Tech ›
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* AI Card 1 */}
            <div className="space-y-2">
              <div
                onClick={() => handleOpenArticle(ARTICLES['ai-dinner-party'])}
                className="cursor-pointer overflow-hidden group"
              >
                <img
                  alt="Abstract visual representing conversational AI agents"
                  className="w-full h-40 object-cover rounded-sm mb-2 group-hover:scale-102 transition duration-200"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC_CtfAEx5hATYDr7Jl9pvlcP9FAUwfWxoQBvfLCVti-HH7ACbuUpzvu4ojgbLuyXOmpz3aEkzk4Jatr9ZrroRh1BdlPHjn3U7entJggzabLQrZZ94IiIArQRMsiRp7_5YchFGLKo7KmT3hwv3d3rxgN6qXtV9LRP78xdCNpNRZO8fPO09vf91SUVBTIY9a0VsGtXVW1fn2A5TaqX7nYVzPGj6IsUyc1B5zAYide5TctDNAQ89-KQvc1A"
                />
                <h4 className="nyt-serif text-lg font-bold leading-snug text-[#121212] group-hover:underline">
                  What a Group of A.I. Agents Talked About as Their Humans Had a Dinner Party
                </h4>
              </div>
              <p className="nyt-serif text-xs text-[#5a5a5a] leading-relaxed">
                As artificial intelligence bots spread, we are increasingly glimpsing how these digital entities interact and what they talk about with one another.
              </p>
              <div className="text-[11px] text-[#727272] flex items-center space-x-2">
                <button
                  onClick={() => handleOpenArticle(ARTICLES['ai-dinner-party'])}
                  className="text-[#326891] hover:underline"
                >
                  210 comments
                </button>
                <span>•</span>
                <span>Aaron Fernandez</span>
              </div>
            </div>

            {/* AI Card 2 */}
            <div className="space-y-2">
              <div
                onClick={() => handleOpenArticle(ARTICLES['anthropic-revenue'])}
                className="cursor-pointer overflow-hidden group"
              >
                <img
                  alt="Data charts displaying revenue explosion in tech"
                  className="w-full h-40 object-cover rounded-sm mb-2 group-hover:scale-102 transition duration-200"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuD0XT8Z_d4IYrvhlI9QsIch67b_0D_sr9hLFYTkwisStDPiLjAxkblTx7m43yQiaea3wwg0wLEDSs8ecB2Jhccz5FV-UdPxtJd-A-MGmYEBwtjD_Ua2c1l4he99ZelFFhFCunShES9tsvzZNxo9v2MmZXdnNjwXy-gIG3Pks49vdqMZEdC8BPXJQ3QVq-bJNdQpO9SYjSuy9gAat1JmSRy3uqWku0m46aqWjbcEc-N-VWZBdTz1nGnI2w"
                />
                <h4 className="nyt-serif text-lg font-bold leading-snug text-[#121212] group-hover:underline">
                  Anthropic Says Revenue Jumped 45% to $16.8 Billion in Third Quarter
                </h4>
              </div>
              <p className="nyt-serif text-xs text-[#5a5a5a] leading-relaxed">
                Enterprise cloud integrations and automated programming models drive unprecedented fiscal surge as public offering expectations mount.
              </p>
              <div className="text-[11px] text-[#727272]">
                <span>3 min read</span>
              </div>
            </div>

            {/* AI Card 3: Deep Analysis & Links */}
            <div className="bg-gray-50 p-4 border border-gray-200 rounded-sm flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#121212] block mb-2">
                  In the News &amp; Field Reports
                </span>
                <ul className="nyt-serif text-xs space-y-3 divide-y divide-gray-200">
                  {FIELD_REPORTS.map(fr => (
                    <li key={fr.id} className="pt-2">
                      <button
                        onClick={() => alert(`Opening Report: ${fr.title}`)}
                        className="hover:underline font-semibold text-left block text-[#121212]"
                      >
                        {fr.title}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="pt-4 border-t border-gray-200 mt-2">
                <button
                  onClick={() => setIsTechTipOpen(true)}
                  className="w-full text-xs font-bold text-[#326891] hover:underline flex items-center justify-between"
                >
                  <span>Got a confidential tech tip?</span>
                  <span>Submit info ›</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Lower Grid: Opinion Columns, Culture, Games & Wirecutter */}
        <section id="opinion" className="py-6 grid grid-cols-1 md:grid-cols-12 gap-6" data-purpose="editorial-lifestyle-grid">
          {/* OPINION COLUMN (Left Cols 1-5) */}
          <div className="md:col-span-5 pr-0 md:pr-4 md:border-r border-gray-200" data-purpose="opinion-section">
            <div className="border-b border-black pb-1 mb-4 flex items-center justify-between">
              <h3 className="nyt-serif text-xl font-black text-black">Opinion</h3>
              <button
                onClick={() => alert("Browse Opinion pieces and guest essays from all Times columnists.")}
                className="text-xs text-[#326891] hover:underline font-semibold"
              >
                All Columnists ›
              </button>
            </div>
            <div className="space-y-4">
              {/* Opinion Essay 1 */}
              <article className="border-b border-gray-200 pb-3">
                <span className="text-xs font-bold text-black uppercase tracking-wide">David Wallace-Wells</span>
                <div
                  onClick={() => handleOpenArticle(ARTICLES['opinion-democrats'])}
                  className="group block mt-0.5 cursor-pointer"
                >
                  <h4 className="nyt-serif text-lg font-bold leading-tight text-[#121212] group-hover:underline">
                    Democrats Shouldn’t Wait Two More Years
                  </h4>
                </div>
                <p className="nyt-serif text-xs text-[#5a5a5a] mt-1">
                  Waiting for national political conditions to reset spontaneously is a strategy designed for continuous legislative frustration.
                </p>
                <button
                  onClick={() => handleOpenArticle(ARTICLES['opinion-democrats'])}
                  className="text-[11px] text-[#326891] mt-1 inline-block hover:underline"
                >
                  388 comments
                </button>
              </article>

              {/* Opinion Essay 2 */}
              <article className="border-b border-gray-200 pb-3">
                <span className="text-xs font-bold text-black uppercase tracking-wide">Heather Kerr</span>
                <div
                  onClick={() => handleOpenArticle(ARTICLES['opinion-ebola'])}
                  className="group block mt-0.5 cursor-pointer"
                >
                  <h4 className="nyt-serif text-base font-bold leading-tight text-[#121212] group-hover:underline">
                    I’ve Never Seen Ebola Spread Like This
                  </h4>
                </div>
                <span className="text-[11px] text-[#727272] mt-1 block">Guest Essay • 4 min read</span>
              </article>

              {/* Opinion Essay 3 */}
              <article className="border-b border-gray-200 pb-3">
                <span className="text-xs font-bold text-black uppercase tracking-wide">Carlos Lozada</span>
                <div
                  onClick={() => handleOpenArticle(ARTICLES['opinion-manifestoes'])}
                  className="group block mt-0.5 cursor-pointer"
                >
                  <h4 className="nyt-serif text-base font-bold leading-tight text-[#121212] group-hover:underline">
                    A Manifesto to End All Manifestoes
                  </h4>
                </div>
                <span className="text-[11px] text-[#326891] mt-1 inline-block">69 comments</span>
              </article>

              {/* Opinion Essay 4 */}
              <article>
                <span className="text-xs font-bold text-black uppercase tracking-wide">Jayson Greene</span>
                <div
                  onClick={() => handleOpenArticle(ARTICLES['opinion-tom-cruise'])}
                  className="group block mt-0.5 cursor-pointer"
                >
                  <h4 className="nyt-serif text-base font-bold leading-tight text-[#121212] group-hover:underline">
                    Tom Cruise’s Big Flop Is a Secret Masterpiece
                  </h4>
                </div>
                <span className="text-[11px] text-[#727272] mt-1 block">5 min read</span>
              </article>
            </div>
          </div>

          {/* CULTURE & INVESTIGATIONS (Center Cols 6-8) */}
          <div className="md:col-span-4 pr-0 md:pr-4 md:border-r border-gray-200 space-y-5" data-purpose="culture-and-great-read">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-[#b88b4a]">The Great Read</span>
              <div
                onClick={() => handleOpenArticle(ARTICLES['the-great-read-shelly'])}
                className="group block mt-1 cursor-pointer"
              >
                <h3 className="nyt-serif text-xl font-bold leading-tight text-[#121212] group-hover:underline">
                  Coming Out at 50 Can Be Hard. Shelly Found a Coach.
                </h3>
              </div>
              <p className="nyt-serif text-xs text-[#5a5a5a] mt-2 leading-relaxed">
                She spent decades building an identity as a wife and mother. Could she disrupt “a perfectly good family dynamic” to live her own truth?
              </p>
              <span className="text-[11px] text-[#727272] mt-1 block">Sophie Park for The New York Times • 259 comments</span>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <span className="text-[10px] font-black uppercase tracking-widest text-black">New York Region</span>
              <div
                onClick={() => handleOpenArticle(ARTICLES['battle-the-pierre'])}
                className="group block mt-1 cursor-pointer"
              >
                <h4 className="nyt-serif text-base font-bold text-[#121212] group-hover:underline">
                  Battle Over the Pierre Ends in Defeat for the Buyer Pushed by Lutnick
                </h4>
              </div>
              <p className="nyt-serif text-xs text-[#5a5a5a] mt-1">
                Motasem Khashoggi missed a deadline to make a deposit to purchase the famed Manhattan apartment building.
              </p>
            </div>

            <div className="border-t border-gray-200 pt-3">
              <div
                onClick={() => handleOpenArticle(ARTICLES['sally-rooney-britain'])}
                className="group block cursor-pointer"
              >
                <h4 className="nyt-serif text-sm font-bold text-[#121212] group-hover:underline">
                  Sally Rooney Says Her Novels Will No Longer Be Sold in Britain
                </h4>
              </div>
              <span className="text-[11px] text-[#727272] mt-0.5 block">3 min read • Ellius Grace for NYT</span>
            </div>
          </div>

          {/* GAMES & WIRECUTTER WIDGETS (Right Cols 9-12) */}
          <div className="md:col-span-3 space-y-6" data-purpose="lifestyle-services">
            {/* Games Mini-Hub */}
            <div className="border border-gray-200 rounded p-3 bg-gray-50">
              <div className="flex items-center justify-between border-b border-gray-200 pb-2 mb-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-black">NYT Games</h4>
                <button
                  onClick={() => setIsWordleOpen(true)}
                  className="text-[11px] text-[#326891] hover:underline"
                >
                  All Games ›
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2 text-center text-xs">
                {/* WORDLE */}
                <button
                  onClick={() => setIsWordleOpen(true)}
                  className="p-2.5 bg-white border border-gray-200 rounded hover:shadow-sm hover:border-gray-400 transition text-left cursor-pointer"
                >
                  <span className="font-black text-sm block tracking-wide text-black">WORDLE</span>
                  <span className="text-[10px] text-[#727272]">Guess the 5-letter word</span>
                </button>

                {/* CONNECTIONS */}
                <button
                  onClick={() => setIsConnectionsOpen(true)}
                  className="p-2.5 bg-white border border-gray-200 rounded hover:shadow-sm hover:border-gray-400 transition text-left cursor-pointer"
                >
                  <span className="font-black text-sm block tracking-wide text-black">CONNECTIONS</span>
                  <span className="text-[10px] text-[#727272]">Group common threads</span>
                </button>

                {/* SPELLING BEE */}
                <button
                  onClick={() => setIsSpellingBeeOpen(true)}
                  className="p-2.5 bg-white border border-gray-200 rounded hover:shadow-sm hover:border-gray-400 transition text-left cursor-pointer"
                >
                  <span className="font-black text-sm block tracking-wide text-black">SPELLING BEE</span>
                  <span className="text-[10px] text-[#727272]">Make words with 7 letters</span>
                </button>

                {/* THE MINI */}
                <button
                  onClick={() => setIsMiniOpen(true)}
                  className="p-2.5 bg-white border border-gray-200 rounded hover:shadow-sm hover:border-gray-400 transition text-left cursor-pointer"
                >
                  <span className="font-black text-sm block tracking-wide text-black">THE MINI</span>
                  <span className="text-[10px] text-[#727272]">Bite-sized crossword</span>
                </button>
              </div>
            </div>

            {/* Wirecutter Recommendations Mini-Hub */}
            <div className="border border-gray-200 rounded p-3">
              <div className="flex items-center justify-between border-b border-gray-200 pb-2 mb-2">
                <span className="text-xs font-bold tracking-wider uppercase text-black">Wirecutter</span>
                <span className="text-[10px] text-[#727272]">Tested &amp; Trusted</span>
              </div>
              <ul className="nyt-serif text-xs space-y-2 text-[#121212]">
                {WIRECUTTER_ITEMS.map(item => (
                  <li key={item.id}>
                    <button
                      onClick={() => {
                        setWirecutterSelectedId(item.id);
                        setIsWirecutterOpen(true);
                      }}
                      className="w-full hover:underline flex items-center justify-between text-left cursor-pointer"
                    >
                      <span>{item.title}</span>
                      <span className="text-[10px] text-gray-400">›</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Cooking Quick Teaser */}
            <div className="border-t border-gray-200 pt-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-orange-800">NYT Cooking</span>
              <div
                onClick={() => setIsCookingOpen(true)}
                className="group block mt-1 cursor-pointer"
              >
                <h5 className="nyt-serif text-sm font-bold text-black group-hover:underline">
                  Meatballs With Any Meat: The Flexible Weeknight Dinner Formula
                </h5>
              </div>
            </div>
          </div>
        </section>
      </main>
      {/* END: MainContent */}

      {/* BEGIN: SiteFooter */}
      <footer className="w-full max-w-[1240px] mx-auto px-4 mt-10 pt-6 border-t-2 border-black" data-purpose="site-footer">
        {/* Footer Brand and Nav Links */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-6 border-b border-gray-200">
          <a
            href="/"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="font-masthead text-3xl text-black select-none hover:opacity-80"
          >
            The New York Times
          </a>
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-[#121212] font-medium mt-3 md:mt-0">
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:underline">
              News
            </button>
            <a href="#opinion" className="hover:underline">
              Opinion
            </a>
            <button onClick={() => alert("Arts & Culture coverage.")} className="hover:underline">
              Arts
            </button>
            <button onClick={() => alert("Living & Style desk.")} className="hover:underline">
              Living
            </button>
            <button onClick={() => alert("Listings & Real Estate.")} className="hover:underline">
              Listings &amp; More
            </button>
            <button onClick={() => setIsCookingOpen(true)} className="hover:underline font-semibold text-orange-800">
              Cooking
            </button>
            <button onClick={() => { setWirecutterSelectedId('wc1'); setIsWirecutterOpen(true); }} className="hover:underline font-semibold">
              Wirecutter
            </button>
            <button onClick={() => alert("The Athletic sports journalism.")} className="hover:underline font-semibold">
              The Athletic
            </button>
            <button onClick={() => setIsWordleOpen(true)} className="hover:underline font-semibold text-emerald-800">
              Games
            </button>
          </div>
        </div>

        {/* Copyright & Legal Sub-footer */}
        <div className="py-4 text-[11px] text-[#727272] flex flex-col md:flex-row items-center justify-between space-y-2 md:space-y-0">
          <div>
            <p>© 2026 The New York Times Company</p>
          </div>
          <nav aria-label="Footer Legal Links" className="flex flex-wrap items-center justify-center gap-x-3 text-[11px]">
            <button onClick={() => alert("About The New York Times Company")} className="hover:underline">NYTCo</button>
            <button onClick={() => alert("Contact Customer Care & Newsroom")} className="hover:underline">Contact Us</button>
            <button onClick={() => alert("Accessibility Policy")} className="hover:underline">Accessibility</button>
            <button onClick={() => alert("Careers at The Times")} className="hover:underline">Work with us</button>
            <button onClick={() => alert("Advertising & Media Kit")} className="hover:underline">Advertise</button>
            <button onClick={() => alert("T Brand Studio Content Studio")} className="hover:underline">T Brand Studio</button>
            <button onClick={() => alert("Privacy Policy")} className="hover:underline">Privacy Policy</button>
            <button onClick={() => alert("Terms of Service")} className="hover:underline">Terms of Service</button>
            <button onClick={() => alert("Terms of Sale")} className="hover:underline">Terms of Sale</button>
            <button onClick={() => alert("Site Map Index")} className="hover:underline">Site Map</button>
            <button onClick={() => setIsSubscribeOpen(true)} className="hover:underline font-bold text-black">Subscriptions</button>
          </nav>
        </div>
      </footer>
      {/* END: SiteFooter */}

      {/* MODALS AND DRAWERS */}
      <ArticleModal
        article={activeArticle}
        isOpen={isArticleModalOpen}
        onClose={() => setIsArticleModalOpen(false)}
        isBookmarked={activeArticle ? savedArticleIds.includes(activeArticle.id) : false}
        onToggleBookmark={handleToggleBookmark}
        onOpenArticle={handleOpenArticle}
      />

      <WordleModal
        isOpen={isWordleOpen}
        onClose={() => setIsWordleOpen(false)}
      />

      <MiniCrosswordModal
        isOpen={isMiniOpen}
        onClose={() => setIsMiniOpen(false)}
      />

      <ConnectionsModal
        isOpen={isConnectionsOpen}
        onClose={() => setIsConnectionsOpen(false)}
      />

      <SpellingBeeModal
        isOpen={isSpellingBeeOpen}
        onClose={() => setIsSpellingBeeOpen(false)}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectArticle={handleOpenArticle}
      />

      <SubscribeModal
        isOpen={isSubscribeOpen}
        onClose={() => setIsSubscribeOpen(false)}
        onSubscribed={() => {
          setUserEmail('subscriber@nytimes.com');
        }}
      />

      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        userEmail={userEmail}
        onLogin={(em) => setUserEmail(em)}
        onLogout={() => setUserEmail(null)}
        savedCount={savedArticleIds.length}
        onOpenSaved={() => setIsSavedDrawerOpen(true)}
      />

      <WirecutterModal
        isOpen={isWirecutterOpen}
        onClose={() => setIsWirecutterOpen(false)}
        selectedId={wirecutterSelectedId}
      />

      <CookingModal
        isOpen={isCookingOpen}
        onClose={() => setIsCookingOpen(false)}
      />

      <TechTipModal
        isOpen={isTechTipOpen}
        onClose={() => setIsTechTipOpen(false)}
      />

      <SavedArticlesDrawer
        isOpen={isSavedDrawerOpen}
        onClose={() => setIsSavedDrawerOpen(false)}
        savedIds={savedArticleIds}
        onRemoveBookmark={handleToggleBookmark}
        onOpenArticle={handleOpenArticle}
      />

      <AudioBar
        isOpen={isAudioBarOpen}
        onClose={() => setIsAudioBarOpen(false)}
        title={audioTitle}
      />
    </div>
  );
}
