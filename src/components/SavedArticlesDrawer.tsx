import React from 'react';
import { X, Bookmark, Trash2, ArrowRight } from 'lucide-react';
import { Article, ARTICLES } from '../data/newsData';

interface SavedArticlesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedIds: string[];
  onRemoveBookmark: (id: string) => void;
  onOpenArticle: (article: Article) => void;
}

export const SavedArticlesDrawer: React.FC<SavedArticlesDrawerProps> = ({
  isOpen,
  onClose,
  savedIds,
  onRemoveBookmark,
  onOpenArticle
}) => {
  if (!isOpen) return null;

  const savedArticles = savedIds
    .map(id => ARTICLES[id])
    .filter(Boolean);

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs">
      <div className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col animate-slide-left">
        {/* Drawer Header */}
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Bookmark className="w-5 h-5 text-amber-700" fill="currentColor" />
            <h3 className="font-bold text-sm text-black uppercase tracking-wider">Reading List</h3>
            <span className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full font-bold">
              {savedArticles.length}
            </span>
          </div>
          <button onClick={onClose} className="p-1 text-gray-500 hover:text-black rounded">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 flex-1 overflow-y-auto divide-y divide-gray-100">
          {savedArticles.length === 0 ? (
            <div className="text-center py-16 text-gray-500">
              <Bookmark className="w-8 h-8 mx-auto mb-2 text-gray-300" />
              <p className="text-sm font-bold text-black">Your reading list is empty</p>
              <p className="text-xs text-gray-500 mt-1">
                Save stories as you browse by clicking the bookmark icon on any article.
              </p>
            </div>
          ) : (
            savedArticles.map(a => (
              <div key={a.id} className="py-3.5 group">
                <div className="flex items-center justify-between text-[10px] text-gray-400 mb-1">
                  <span className="font-extrabold uppercase text-nytBlue">{a.section}</span>
                  <button
                    onClick={() => onRemoveBookmark(a.id)}
                    className="text-gray-400 hover:text-red-600 transition p-1"
                    title="Remove from saved"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <h4
                  onClick={() => {
                    onOpenArticle(a);
                    onClose();
                  }}
                  className="nyt-serif text-base font-bold text-black group-hover:text-nytBlue cursor-pointer transition leading-snug"
                >
                  {a.title}
                </h4>
                <p className="nyt-serif text-xs text-gray-600 line-clamp-2 mt-1">
                  {a.dek}
                </p>
                <div className="flex items-center justify-between text-[11px] text-gray-400 mt-2">
                  <span>{a.readTime}</span>
                  <button
                    onClick={() => {
                      onOpenArticle(a);
                      onClose();
                    }}
                    className="text-nytBlue font-bold text-xs flex items-center hover:underline"
                  >
                    Read now <ArrowRight className="w-3 h-3 ml-1" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-50 border-t border-gray-200 text-xs text-center text-gray-500">
          Articles saved here are synchronized across your devices.
        </div>
      </div>
    </div>
  );
};
