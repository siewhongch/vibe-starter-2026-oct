import React, { useState, useMemo } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { ARTICLES, Article } from '../data/newsData';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectArticle: (article: Article) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onSelectArticle }) => {
  const [query, setQuery] = useState('');
  const [selectedSection, setSelectedSection] = useState<string>('All');

  const allArticles = useMemo(() => Object.values(ARTICLES), []);

  const filteredArticles = useMemo(() => {
    return allArticles.filter(a => {
      const matchesSection = selectedSection === 'All' || a.section.toLowerCase() === selectedSection.toLowerCase();
      const q = query.toLowerCase().trim();
      if (!q) return matchesSection;

      const inTitle = a.title.toLowerCase().includes(q);
      const inDek = a.dek.toLowerCase().includes(q);
      const inByline = a.byline.toLowerCase().includes(q);
      const inSection = a.section.toLowerCase().includes(q);

      return matchesSection && (inTitle || inDek || inByline || inSection);
    });
  }, [allArticles, query, selectedSection]);

  if (!isOpen) return null;

  const sections = ['All', 'U.S.', 'World', 'Business', 'Technology', 'Opinion', 'Lifestyle', 'Cooking'];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 backdrop-blur-xs p-4 pt-16">
      <div className="bg-white w-full max-w-2xl rounded-lg shadow-2xl border border-gray-200 overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-gray-200 flex items-center space-x-3 bg-gray-50">
          <Search className="w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Search news, opinion, topics, authors..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            autoFocus
            className="w-full bg-transparent text-base text-black placeholder-gray-400 focus:outline-none"
          />
          {query && (
            <button onClick={() => setQuery('')} className="text-xs text-gray-400 hover:text-black">
              Clear
            </button>
          )}
          <button onClick={onClose} className="p-1 text-gray-500 hover:text-black rounded">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Section Filter Pills */}
        <div className="px-4 py-2 border-b border-gray-100 flex items-center space-x-2 overflow-x-auto no-scrollbar text-xs">
          <span className="text-gray-400 font-bold uppercase text-[10px]">Filter:</span>
          {sections.map(sec => (
            <button
              key={sec}
              onClick={() => setSelectedSection(sec)}
              className={`px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap transition ${
                selectedSection === sec
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {sec}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-4 divide-y divide-gray-100">
          {filteredArticles.length === 0 ? (
            <div className="py-12 text-center text-gray-500 text-sm">
              No results found for “{query}”. Try searching for “Trump”, “Ukraine”, “AI”, or “Opinion”.
            </div>
          ) : (
            filteredArticles.map(a => (
              <div
                key={a.id}
                onClick={() => {
                  onSelectArticle(a);
                  onClose();
                }}
                className="py-3 cursor-pointer group hover:bg-gray-50 px-2 rounded transition"
              >
                <div className="flex items-center space-x-2 text-[11px] text-gray-500 mb-1">
                  <span className="font-extrabold uppercase text-nytBlue tracking-wider">{a.section}</span>
                  <span>•</span>
                  <span>{a.date}</span>
                  <span>•</span>
                  <span>{a.readTime}</span>
                </div>
                <h4 className="nyt-serif text-base font-bold text-black group-hover:text-nytBlue transition leading-snug">
                  {a.title}
                </h4>
                <p className="nyt-serif text-xs text-gray-600 line-clamp-2 mt-1">
                  {a.dek}
                </p>
                <div className="flex items-center justify-between text-[11px] text-gray-400 mt-2">
                  <span>By {a.byline}</span>
                  <span className="flex items-center text-nytBlue group-hover:underline">
                    Read Story <ArrowRight className="w-3 h-3 ml-1" />
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2 bg-gray-50 border-t border-gray-200 text-right text-[11px] text-gray-500">
          Showing {filteredArticles.length} stories
        </div>
      </div>
    </div>
  );
};
