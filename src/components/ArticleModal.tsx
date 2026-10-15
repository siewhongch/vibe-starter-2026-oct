import React, { useState } from 'react';
import { X, Bookmark, Share2, Volume2, VolumeX, MessageSquare, ThumbsUp, Check, ArrowLeft, Send } from 'lucide-react';
import { Article, Comment } from '../data/newsData';

interface ArticleModalProps {
  article: Article | null;
  isOpen: boolean;
  onClose: () => void;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
  onOpenArticle: (article: Article) => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({
  article,
  isOpen,
  onClose,
  isBookmarked,
  onToggleBookmark,
  onOpenArticle
}) => {
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [copied, setCopied] = useState(false);
  const [comments, setComments] = useState<Comment[]>(article ? article.comments : []);
  const [newComment, setNewComment] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [activeTab, setActiveTab] = useState<'article' | 'comments'>('article');
  const [likesMap, setLikesMap] = useState<Record<string, number>>({});

  // Sync comments if article changes
  React.useEffect(() => {
    if (article) {
      setComments(article.comments || []);
    }
  }, [article]);

  if (!isOpen || !article) return null;

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLikeComment = (cId: string) => {
    setLikesMap(prev => ({
      ...prev,
      [cId]: (prev[cId] || 0) + 1
    }));
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const newC: Comment = {
      id: 'c_' + Date.now(),
      author: authorName.trim() || 'Reader from New York',
      location: 'New York, NY',
      timestamp: 'Just now',
      text: newComment.trim(),
      likes: 0
    };

    setComments([newC, ...comments]);
    setNewComment('');
  };

  const getFontSizeClass = () => {
    switch (fontSize) {
      case 'large':
        return 'text-[19px] leading-[1.8]';
      case 'xlarge':
        return 'text-[22px] leading-[1.9]';
      default:
        return 'text-[17px] leading-[1.7]';
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex justify-center p-0 md:p-4">
      <div className="bg-white w-full max-w-4xl min-h-screen md:min-h-0 md:rounded-lg shadow-2xl overflow-hidden flex flex-col my-auto border border-gray-200">
        {/* Top Sticky Bar */}
        <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-xs border-b border-gray-200 px-4 md:px-6 py-2.5 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={onClose}
              className="flex items-center text-xs font-bold text-gray-700 hover:text-black transition"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              <span>Back to Front Page</span>
            </button>
            <span className="hidden sm:inline-block text-gray-300">|</span>
            <span className="hidden sm:inline-block text-[11px] font-extrabold uppercase tracking-wider text-nytBlue">
              {article.section}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            {/* Font size control */}
            <div className="hidden sm:flex items-center border border-gray-300 rounded px-1.5 py-0.5 text-xs text-gray-700 space-x-1">
              <button
                onClick={() => setFontSize('normal')}
                className={`px-1 py-0.5 font-serif rounded ${fontSize === 'normal' ? 'font-bold text-black bg-gray-100' : 'text-gray-500'}`}
                title="Normal font"
              >
                A
              </button>
              <button
                onClick={() => setFontSize('large')}
                className={`px-1 py-0.5 font-serif rounded text-sm ${fontSize === 'large' ? 'font-bold text-black bg-gray-100' : 'text-gray-500'}`}
                title="Large font"
              >
                A+
              </button>
              <button
                onClick={() => setFontSize('xlarge')}
                className={`px-1 py-0.5 font-serif rounded text-base ${fontSize === 'xlarge' ? 'font-bold text-black bg-gray-100' : 'text-gray-500'}`}
                title="Extra large font"
              >
                A++
              </button>
            </div>

            {/* Bookmark */}
            <button
              onClick={() => onToggleBookmark(article.id)}
              className={`p-1.5 rounded transition ${
                isBookmarked ? 'text-amber-700 bg-amber-50' : 'text-gray-500 hover:text-black hover:bg-gray-100'
              }`}
              title={isBookmarked ? 'Saved to reading list' : 'Save for later'}
            >
              <Bookmark className="w-4 h-4" fill={isBookmarked ? 'currentColor' : 'none'} />
            </button>

            {/* Share */}
            <button
              onClick={handleShare}
              className="p-1.5 text-gray-500 hover:text-black rounded hover:bg-gray-100 transition relative"
              title="Share story"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
            </button>

            {/* Close */}
            <button
              onClick={onClose}
              className="p-1.5 text-gray-500 hover:text-black rounded hover:bg-gray-100 transition"
              title="Close article"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab switch on mobile / dual views */}
        <div className="flex border-b border-gray-200 px-6 pt-2 bg-gray-50 text-xs font-bold text-gray-600">
          <button
            onClick={() => setActiveTab('article')}
            className={`pb-2 px-3 border-b-2 transition ${
              activeTab === 'article' ? 'border-black text-black' : 'border-transparent hover:text-black'
            }`}
          >
            Article
          </button>
          <button
            onClick={() => setActiveTab('comments')}
            className={`pb-2 px-3 border-b-2 transition flex items-center space-x-1.5 ${
              activeTab === 'comments' ? 'border-black text-black' : 'border-transparent hover:text-black'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Comments ({comments.length + (article.commentsCount || 0)})</span>
          </button>
        </div>

        {activeTab === 'article' ? (
          <div className="p-6 md:p-10 max-w-2xl mx-auto w-full">
            {/* Header kicker */}
            {article.kicker && (
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-nytGold mb-2 block">
                {article.kicker}
              </span>
            )}

            {/* Headline */}
            <h1 className="nyt-serif text-3xl sm:text-4xl lg:text-[42px] font-bold leading-tight text-nytBlack mb-4">
              {article.title}
            </h1>

            {/* Dek / Standfirst */}
            <p className="nyt-serif text-lg sm:text-xl text-gray-700 leading-snug mb-5 pb-4 border-b border-gray-200">
              {article.dek}
            </p>

            {/* Byline & Date */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-nytSubtleGray mb-6 pb-4 border-b border-gray-100 gap-2">
              <div>
                <span className="font-bold text-black block text-sm">By {article.byline}</span>
                <span>Published {article.date}</span>
              </div>
              <div className="flex items-center space-x-3 text-xs">
                <span>{article.readTime}</span>
                <span>•</span>
                <button
                  onClick={() => setActiveTab('comments')}
                  className="text-nytBlue hover:underline flex items-center space-x-1"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>{article.commentsCount || comments.length} Comments</span>
                </button>
              </div>
            </div>

            {/* Audio narration widget */}
            <div className="bg-gray-50 border border-gray-200 rounded p-3 mb-8 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                  className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-800 transition"
                >
                  {isPlayingAudio ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
                <div>
                  <span className="text-xs font-bold text-black block">Listen to this article</span>
                  <span className="text-[11px] text-gray-500">
                    {isPlayingAudio ? 'Playing automated narration...' : '4 min narration • Narrated for The Times'}
                  </span>
                </div>
              </div>
              {isPlayingAudio && (
                <div className="flex items-center space-x-1">
                  <span className="w-1 h-3 bg-black animate-pulse" />
                  <span className="w-1 h-5 bg-black animate-pulse delay-75" />
                  <span className="w-1 h-2 bg-black animate-pulse delay-150" />
                </div>
              )}
            </div>

            {/* Featured Image if present */}
            {article.imageUrl && (
              <figure className="mb-8">
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  className="w-full h-auto max-h-[460px] object-cover rounded-sm shadow-xs"
                />
                {article.imageCaption && (
                  <figcaption className="text-xs text-nytSubtleGray mt-2 text-right">
                    {article.imageCaption}
                  </figcaption>
                )}
              </figure>
            )}

            {/* Bullets if present */}
            {article.bullets && article.bullets.length > 0 && (
              <div className="bg-amber-50/60 border-l-4 border-nytGold p-4 mb-6 rounded-r">
                <span className="text-[11px] font-bold uppercase tracking-wider text-nytBlack block mb-2">Key Takeaways</span>
                <ul className="list-disc pl-4 space-y-1.5 nyt-serif text-sm text-gray-800">
                  {article.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Article Body */}
            <div className={`nyt-serif text-nytBlack space-y-5 ${getFontSizeClass()}`}>
              {article.body.map((para, idx) => (
                <p key={idx} className={idx === 0 ? 'nyt-article-dropcap' : ''}>
                  {para}
                </p>
              ))}
            </div>

            {/* Pull Quote */}
            {article.quote && (
              <blockquote className="my-8 py-5 border-y-2 border-black text-center px-4">
                <p className="nyt-serif text-xl sm:text-2xl italic font-bold text-nytBlack leading-snug">
                  “{article.quote.text}”
                </p>
                <cite className="block text-xs font-sans uppercase tracking-widest text-gray-500 mt-2 font-bold not-italic">
                  — {article.quote.author}
                </cite>
              </blockquote>
            )}

            {/* Bottom Divider and Comments CTA */}
            <div className="mt-10 pt-6 border-t-2 border-black flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <p className="text-sm font-bold text-black">A version of this article appears in print.</p>
                <p className="text-xs text-gray-500">Section A, Page 1 of the New York edition.</p>
              </div>
              <button
                onClick={() => setActiveTab('comments')}
                className="bg-black text-white hover:bg-gray-800 px-4 py-2 rounded text-xs font-bold transition flex items-center space-x-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Join Discussion ({comments.length + (article.commentsCount || 0)})</span>
              </button>
            </div>
          </div>
        ) : (
          /* Comments Tab */
          <div className="p-6 max-w-2xl mx-auto w-full flex-1 flex flex-col">
            <div className="flex items-center justify-between pb-4 border-b border-gray-200 mb-4">
              <div>
                <h3 className="text-lg font-bold text-black">Reader Discussion</h3>
                <p className="text-xs text-gray-500">
                  {comments.length + (article.commentsCount || 0)} Comments on “{article.title}”
                </p>
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-nytGold bg-amber-50 px-2 py-1 rounded">
                NYT Community Standards
              </span>
            </div>

            {/* Post comment form */}
            <form onSubmit={handleAddComment} className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6">
              <span className="text-xs font-bold text-black block mb-2">Write a comment</span>
              <div className="mb-2">
                <input
                  type="text"
                  placeholder="Your Name & City (e.g. Elena, Boston, MA)"
                  value={authorName}
                  onChange={e => setAuthorName(e.target.value)}
                  className="w-full text-xs px-3 py-1.5 rounded border border-gray-300 focus:outline-none focus:border-black bg-white"
                />
              </div>
              <textarea
                rows={3}
                placeholder="What do you think? Keep comments respectful and thoughtful."
                value={newComment}
                onChange={e => setNewComment(e.target.value)}
                className="w-full text-xs p-3 rounded border border-gray-300 focus:outline-none focus:border-black bg-white resize-none"
              />
              <div className="flex justify-end mt-2">
                <button
                  type="submit"
                  disabled={!newComment.trim()}
                  className="bg-nytBlue hover:bg-nytBlueHover disabled:bg-gray-300 text-white text-xs font-bold px-4 py-1.5 rounded flex items-center space-x-1.5 transition"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Comment</span>
                </button>
              </div>
            </form>

            {/* Comments feed */}
            <div className="space-y-4">
              {comments.map(c => {
                const totalLikes = c.likes + (likesMap[c.id] || 0);
                return (
                  <div key={c.id} className="border-b border-gray-200 pb-4">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-xs text-black">{c.author}</span>
                        <span className="text-[11px] text-gray-500">{c.location}</span>
                        {c.isNYTPick && (
                          <span className="text-[10px] font-bold bg-amber-100 text-amber-900 px-1.5 py-0.5 rounded">
                            NYT Pick
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-gray-400">{c.timestamp}</span>
                    </div>
                    <p className="nyt-serif text-sm text-gray-800 leading-relaxed mb-2">
                      {c.text}
                    </p>
                    <div className="flex items-center space-x-3 text-xs text-gray-500">
                      <button
                        onClick={() => handleLikeComment(c.id)}
                        className="flex items-center space-x-1 hover:text-black transition"
                      >
                        <ThumbsUp className="w-3.5 h-3.5" />
                        <span>{totalLikes}</span>
                      </button>
                      <button className="hover:underline">Reply</button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="bg-gray-100 px-6 py-3 border-t border-gray-200 text-center text-xs text-gray-500">
          The New York Times • All rights reserved
        </div>
      </div>
    </div>
  );
};
