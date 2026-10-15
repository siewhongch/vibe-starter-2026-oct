import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Download, Printer, BookOpen, ExternalLink } from 'lucide-react';
import { Article, ARTICLES } from '../data/newsData';

interface TodaysPaperModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectArticle: (article: Article) => void;
}

export const TodaysPaperModal: React.FC<TodaysPaperModalProps> = ({
  isOpen,
  onClose,
  onSelectArticle
}) => {
  const [selectedSection, setSelectedSection] = useState<'A' | 'B' | 'C' | 'D'>('A');

  if (!isOpen) return null;

  const sectionPages = {
    A: {
      name: 'Section A: Main News & International',
      stories: [
        ARTICLES['trump-women-departures'],
        ARTICLES['press-secretary-attorney'],
        ARTICLES['ukraine-satellite-restricted'],
        ARTICLES['guilfoyle-fall'],
        ARTICLES['texas-senate-race']
      ]
    },
    B: {
      name: 'Section B: Business Day & Technology',
      stories: [
        ARTICLES['anthropic-revenue'],
        ARTICLES['ai-dinner-party'],
        ARTICLES['trump-diesel-putin']
      ]
    },
    C: {
      name: 'Section C: Arts & Culture',
      stories: [
        ARTICLES['sally-rooney-britain'],
        ARTICLES['battle-the-pierre'],
        ARTICLES['the-great-read-shelly']
      ]
    },
    D: {
      name: 'Section D: Opinion & Editorial',
      stories: [
        ARTICLES['opinion-democrats'],
        ARTICLES['opinion-ebola'],
        ARTICLES['opinion-manifestoes'],
        ARTICLES['opinion-tom-cruise']
      ]
    }
  };

  const current = sectionPages[selectedSection];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4">
      <div className="bg-[#fcfbf9] text-nytBlack w-full max-w-4xl rounded-lg shadow-2xl border border-stone-300 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Archival Header Bar */}
        <div className="bg-[#1c1917] text-stone-200 px-6 py-3 flex items-center justify-between border-b border-stone-800">
          <div className="flex items-center space-x-3">
            <BookOpen className="w-5 h-5 text-stone-400" />
            <div>
              <span className="font-masthead text-xl tracking-tight text-white block leading-none">
                The New York Times
              </span>
              <span className="text-[10px] text-stone-400 uppercase tracking-widest font-sans">
                Today’s Paper Replica · Vol. CLXXV No. 60,314
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-3 text-xs">
            <button
              onClick={() => window.print()}
              className="hidden sm:flex items-center space-x-1 hover:text-white transition px-2 py-1 rounded hover:bg-stone-800"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Broadsheet</span>
            </button>
            <button onClick={onClose} className="p-1 text-stone-400 hover:text-white rounded">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Section Navigation Tabs */}
        <div className="bg-stone-100 border-b border-stone-300 px-6 py-2 flex items-center justify-between">
          <div className="flex items-center space-x-2 text-xs font-serif">
            {(['A', 'B', 'C', 'D'] as const).map(sec => (
              <button
                key={sec}
                onClick={() => setSelectedSection(sec)}
                className={`px-3 py-1 font-bold rounded transition ${
                  selectedSection === sec
                    ? 'bg-black text-white shadow-xs'
                    : 'text-stone-700 hover:bg-stone-200'
                }`}
              >
                Section {sec}
              </button>
            ))}
          </div>
          <span className="text-xs text-stone-500 font-serif italic hidden md:inline">
            {current.name}
          </span>
        </div>

        {/* Broadsheet Page Preview */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
          <div className="border-b-2 border-black pb-3 text-center">
            <span className="text-[11px] uppercase tracking-widest font-bold text-stone-500 block mb-1">
              THE NEW YORK EDITION · WEDNESDAY, OCTOBER 14, 2026
            </span>
            <h2 className="nyt-serif text-2xl md:text-3xl font-bold text-black">{current.name}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 divide-y md:divide-y-0 md:divide-x divide-stone-300">
            {/* Left page lead */}
            <div className="space-y-6 pr-0 md:pr-6">
              {current.stories.slice(0, 2).map((art, idx) => (
                <div
                  key={art.id}
                  onClick={() => {
                    onSelectArticle(art);
                    onClose();
                  }}
                  className="cursor-pointer group pb-4 border-b border-stone-200 last:border-0"
                >
                  <span className="text-[10px] font-sans font-bold text-stone-500 uppercase tracking-widest block mb-1">
                    Page {selectedSection}{idx + 1} · {art.kicker || art.section}
                  </span>
                  <h3 className="nyt-serif text-xl font-bold leading-snug group-hover:underline text-black">
                    {art.title}
                  </h3>
                  <p className="nyt-serif text-xs text-stone-700 mt-1.5 leading-relaxed line-clamp-3">
                    {art.dek}
                  </p>
                  <span className="text-[11px] font-sans text-stone-500 mt-2 block">
                    By {art.byline}
                  </span>
                </div>
              ))}
            </div>

            {/* Right page secondary stories */}
            <div className="space-y-4 pt-4 md:pt-0 pl-0 md:pl-6">
              {current.stories.slice(2).map((art, idx) => (
                <div
                  key={art.id}
                  onClick={() => {
                    onSelectArticle(art);
                    onClose();
                  }}
                  className="cursor-pointer group pb-3 border-b border-stone-200 last:border-0"
                >
                  <span className="text-[10px] font-sans font-bold text-stone-500 uppercase tracking-widest block">
                    Page {selectedSection}{idx + 3}
                  </span>
                  <h4 className="nyt-serif text-base font-bold text-black group-hover:underline leading-snug">
                    {art.title}
                  </h4>
                  <p className="nyt-serif text-xs text-stone-600 line-clamp-2 mt-1">
                    {art.dek}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-stone-200/60 border-t border-stone-300 flex items-center justify-between text-xs text-stone-600">
          <span>Digital facsimile of the late city final edition.</span>
          <button
            onClick={onClose}
            className="font-bold text-black hover:underline"
          >
            Close Replica
          </button>
        </div>
      </div>
    </div>
  );
};
