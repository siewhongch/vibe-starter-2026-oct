import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Bookmark,
  Share2,
  Volume2,
  VolumeX,
  MessageSquare,
  ThumbsUp,
  Check,
  ArrowLeft,
  Send,
  Gift,
  Sun,
  Moon,
  Coffee,
  Play,
  Pause,
  Clock,
  Sparkles
} from 'lucide-react';
import { Article, Comment, ARTICLES } from '../data/newsData';

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
  const [theme, setTheme] = useState<'white' | 'sepia' | 'dark'>('white');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioSeconds, setAudioSeconds] = useState(12);
  const [audioDuration] = useState(240); // 4 minutes
  const [copied, setCopied] = useState(false);
  const [gifted, setGifted] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentsFilter, setCommentsFilter] = useState<'all' | 'picks'>('all');
  const [newComment, setNewComment] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [activeTab, setActiveTab] = useState<'article' | 'comments'>('article');
  const [likesMap, setLikesMap] = useState<Record<string, number>>({});
  const [scrollProgress, setScrollProgress] = useState(0);

  const contentRef = useRef<HTMLDivElement>(null);

  // Sync comments
  useEffect(() => {
    if (article) {
      setComments(article.comments || []);
      setScrollProgress(0);
      setIsPlayingAudio(false);
    }
  }, [article]);

  // Audio timer simulation
  useEffect(() => {
    let interval: any = null;
    if (isPlayingAudio) {
      interval = setInterval(() => {
        setAudioSeconds(s => (s >= audioDuration ? 0 : s + 1));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlayingAudio, audioDuration]);

  // Scroll progress listener
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollHeight > clientHeight) {
      const progress = (scrollTop / (scrollHeight - clientHeight)) * 100;
      setScrollProgress(progress);
    }
  };

  if (!isOpen || !article) return null;

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleGiftArticle = () => {
    navigator.clipboard.writeText(`${window.location.href}?gift=true`);
    setGifted(true);
    setTimeout(() => setGifted(false), 3000);
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

  const formatAudioTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec < 10 ? '0' : ''}${sec}`;
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

  const themeClasses = {
    white: {
      bg: 'bg-white text-[#121212]',
      modalBg: 'bg-white',
      headerBg: 'bg-white/95 border-gray-200',
      cardBg: 'bg-gray-50 border-gray-200',
      mutedText: 'text-gray-600',
      subtleText: 'text-[#727272]',
      quoteBorder: 'border-black'
    },
    sepia: {
      bg: 'bg-[#f8f5ee] text-[#2c2825]',
      modalBg: 'bg-[#f8f5ee]',
      headerBg: 'bg-[#f8f5ee]/95 border-[#e8e2d5]',
      cardBg: 'bg-[#efebe0] border-[#ded7c8]',
      mutedText: 'text-[#5c544e]',
      subtleText: 'text-[#7d736a]',
      quoteBorder: 'border-[#2c2825]'
    },
    dark: {
      bg: 'bg-[#121212] text-[#e8e8e8]',
      modalBg: 'bg-[#181818]',
      headerBg: 'bg-[#181818]/95 border-zinc-800',
      cardBg: 'bg-[#222222] border-zinc-700',
      mutedText: 'text-zinc-400',
      subtleText: 'text-zinc-500',
      quoteBorder: 'border-zinc-300'
    }
  }[theme];

  const filteredComments = commentsFilter === 'picks'
    ? comments.filter(c => c.isNYTPick)
    : comments;

  const relatedArticles = Object.values(ARTICLES)
    .filter(a => a.id !== article.id)
    .slice(0, 3);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex justify-center p-0 md:p-4">
      <div
        className={`${themeClasses.modalBg} ${themeClasses.bg} w-full max-w-4xl min-h-screen md:min-h-0 md:rounded-lg shadow-2xl overflow-hidden flex flex-col my-auto border border-stone-300 relative transition-colors duration-200`}
      >
        {/* Top Reading Progress Bar */}
        <div
          className="absolute top-0 left-0 h-1 bg-[#326891] z-50 transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />

        {/* Top Sticky Bar */}
        <div className={`sticky top-0 z-40 ${themeClasses.headerBg} backdrop-blur-xs border-b px-4 md:px-6 py-2.5 flex items-center justify-between`}>
          <div className="flex items-center space-x-3">
            <button
              onClick={onClose}
              className="flex items-center text-xs font-bold hover:opacity-75 transition cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              <span className="hidden sm:inline">Back to Front Page</span>
              <span className="sm:hidden">Back</span>
            </button>
            <span className="text-gray-300">|</span>
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#326891]">
              {article.section}
            </span>
          </div>

          <div className="flex items-center space-x-1.5 sm:space-x-2">
            {/* Theme switcher: White / Sepia / Dark */}
            <div className="flex items-center border border-gray-300 dark:border-zinc-700 rounded-md p-0.5 text-xs">
              <button
                onClick={() => setTheme('white')}
                className={`p-1 rounded ${theme === 'white' ? 'bg-gray-200 text-black' : 'text-gray-400 hover:text-black'}`}
                title="Light"
              >
                <Sun className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setTheme('sepia')}
                className={`p-1 rounded ${theme === 'sepia' ? 'bg-[#dfd8c7] text-[#2c2825]' : 'text-gray-400 hover:text-black'}`}
                title="Sepia Paper"
              >
                <Coffee className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setTheme('dark')}
                className={`p-1 rounded ${theme === 'dark' ? 'bg-zinc-800 text-white' : 'text-gray-400 hover:text-white'}`}
                title="Dark Mode"
              >
                <Moon className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Font size control */}
            <div className="hidden sm:flex items-center border border-gray-300 dark:border-zinc-700 rounded px-1.5 py-0.5 text-xs space-x-1">
              <button
                onClick={() => setFontSize('normal')}
                className={`px-1 py-0.5 font-serif rounded ${fontSize === 'normal' ? 'font-bold underline' : 'opacity-60'}`}
                title="Normal font"
              >
                A
              </button>
              <button
                onClick={() => setFontSize('large')}
                className={`px-1 py-0.5 font-serif rounded text-sm ${fontSize === 'large' ? 'font-bold underline' : 'opacity-60'}`}
                title="Large font"
              >
                A+
              </button>
              <button
                onClick={() => setFontSize('xlarge')}
                className={`px-1 py-0.5 font-serif rounded text-base ${fontSize === 'xlarge' ? 'font-bold underline' : 'opacity-60'}`}
                title="Extra large font"
              >
                A++
              </button>
            </div>

            {/* Gift Article (Subscriber perk) */}
            <button
              onClick={handleGiftArticle}
              className="p-1.5 rounded transition hover:bg-black/5 dark:hover:bg-white/10 flex items-center text-xs"
              title="Gift article link (Free for non-subscribers)"
            >
              {gifted ? <Check className="w-4 h-4 text-emerald-600" /> : <Gift className="w-4 h-4 text-amber-600" />}
            </button>

            {/* Bookmark */}
            <button
              onClick={() => onToggleBookmark(article.id)}
              className="p-1.5 rounded transition hover:bg-black/5 dark:hover:bg-white/10"
              title={isBookmarked ? 'Saved to reading list' : 'Save for later'}
            >
              <Bookmark className="w-4 h-4 text-amber-700" fill={isBookmarked ? 'currentColor' : 'none'} />
            </button>

            {/* Share */}
            <button
              onClick={handleShare}
              className="p-1.5 rounded hover:bg-black/5 dark:hover:bg-white/10 transition"
              title="Share story"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
            </button>

            {/* Close */}
            <button
              onClick={onClose}
              className="p-1.5 rounded hover:bg-black/5 dark:hover:bg-white/10 transition ml-1"
              title="Close article"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab switch between Article and Comments */}
        <div className={`flex border-b px-6 pt-2 text-xs font-bold ${themeClasses.headerBg}`}>
          <button
            onClick={() => setActiveTab('article')}
            className={`pb-2 px-3 border-b-2 transition ${
              activeTab === 'article'
                ? 'border-[#326891] text-[#326891]'
                : 'border-transparent opacity-60 hover:opacity-100'
            }`}
          >
            Article
          </button>
          <button
            onClick={() => setActiveTab('comments')}
            className={`pb-2 px-3 border-b-2 transition flex items-center space-x-1.5 ${
              activeTab === 'comments'
                ? 'border-[#326891] text-[#326891]'
                : 'border-transparent opacity-60 hover:opacity-100'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Comments ({comments.length + (article.commentsCount || 0)})</span>
          </button>
        </div>

        {activeTab === 'article' ? (
          <div
            ref={contentRef}
            onScroll={handleScroll}
            className="p-6 md:p-10 max-w-2xl mx-auto w-full overflow-y-auto max-h-[82vh]"
          >
            {/* Header kicker */}
            {article.kicker && (
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#b88b4a] mb-2 block">
                {article.kicker}
              </span>
            )}

            {/* Headline */}
            <h1 className="nyt-serif text-3xl sm:text-4xl lg:text-[42px] font-bold leading-tight mb-4 text-balance">
              {article.title}
            </h1>

            {/* Dek / Standfirst */}
            <p className={`nyt-serif text-lg sm:text-xl leading-snug mb-5 pb-4 border-b ${themeClasses.mutedText}`}>
              {article.dek}
            </p>

            {/* Byline & Date */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs mb-6 pb-4 border-b border-gray-200 dark:border-zinc-800 gap-2">
              <div>
                <span className="font-bold block text-sm">By {article.byline}</span>
                <span className={themeClasses.subtleText}>Published {article.date} · Updated 1 hour ago</span>
              </div>
              <div className={`flex items-center space-x-3 text-xs ${themeClasses.subtleText}`}>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> {article.readTime}
                </span>
                <span>•</span>
                <button
                  onClick={() => setActiveTab('comments')}
                  className="text-[#326891] hover:underline flex items-center space-x-1"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>{article.commentsCount || comments.length} Comments</span>
                </button>
              </div>
            </div>

            {/* Audio narration widget with simulated scrub bar */}
            <div className={`${themeClasses.cardBg} border rounded-lg p-3.5 mb-8 flex flex-col sm:flex-row items-center justify-between gap-3`}>
              <div className="flex items-center space-x-3 w-full sm:w-auto">
                <button
                  onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                  className="w-10 h-10 rounded-full bg-black text-white dark:bg-white dark:text-black flex items-center justify-center hover:opacity-85 transition shrink-0 shadow-sm"
                >
                  {isPlayingAudio ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
                </button>
                <div className="truncate">
                  <div className="flex items-center space-x-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600">Audio Narration</span>
                    <span className="text-[10px] opacity-60">• Read by NYT Audio Desk</span>
                  </div>
                  <span className="text-xs font-bold block truncate">Listen to this article</span>
                </div>
              </div>

              {/* Progress & Waveform */}
              <div className="flex items-center space-x-2 text-xs font-mono w-full sm:w-60">
                <span className="text-[10px] opacity-60">{formatAudioTime(audioSeconds)}</span>
                <div className="relative flex-1 h-1.5 bg-gray-300 dark:bg-zinc-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#326891] transition-all duration-300"
                    style={{ width: `${(audioSeconds / audioDuration) * 100}%` }}
                  />
                </div>
                <span className="text-[10px] opacity-60">{formatAudioTime(audioDuration)}</span>
              </div>
            </div>

            {/* Featured Image */}
            {article.imageUrl && (
              <figure className="mb-8">
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-auto max-h-[460px] object-cover rounded-sm shadow-xs"
                />
                {article.imageCaption && (
                  <figcaption className={`text-xs mt-2 text-right ${themeClasses.subtleText}`}>
                    {article.imageCaption}
                  </figcaption>
                )}
              </figure>
            )}

            {/* Bullets */}
            {article.bullets && article.bullets.length > 0 && (
              <div className={`${themeClasses.cardBg} border rounded-lg p-4 mb-6`}>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#b88b4a] block mb-2">
                  Key Takeaways
                </span>
                <ul className="list-disc pl-4 space-y-1.5 nyt-serif text-sm">
                  {article.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Article Body */}
            <div className={`nyt-serif space-y-5 ${getFontSizeClass()}`}>
              {article.body.map((para, idx) => (
                <p key={idx} className={idx === 0 ? 'nyt-article-dropcap' : ''}>
                  {para}
                </p>
              ))}
            </div>

            {/* Pull Quote */}
            {article.quote && (
              <blockquote className={`my-8 py-5 border-y-2 ${themeClasses.quoteBorder} text-center px-4`}>
                <p className="nyt-serif text-xl sm:text-2xl italic font-bold leading-snug">
                  “{article.quote.text}”
                </p>
                <cite className={`block text-xs font-sans uppercase tracking-widest ${themeClasses.subtleText} mt-2 font-bold not-italic`}>
                  — {article.quote.author}
                </cite>
              </blockquote>
            )}

            {/* Bottom Print Note and Comments Button */}
            <div className={`mt-10 pt-6 border-t-2 ${themeClasses.quoteBorder} flex flex-col sm:flex-row items-center justify-between gap-4`}>
              <div>
                <p className="text-sm font-bold">A version of this article appears in print.</p>
                <p className={`text-xs ${themeClasses.subtleText}`}>Section A, Page 1 of the New York edition.</p>
              </div>
              <button
                onClick={() => setActiveTab('comments')}
                className="bg-black text-white dark:bg-white dark:text-black hover:opacity-85 px-4 py-2 rounded text-xs font-bold transition flex items-center space-x-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Join Discussion ({comments.length + (article.commentsCount || 0)})</span>
              </button>
            </div>

            {/* Related Articles Strip */}
            <div className="mt-12 pt-8 border-t border-gray-200 dark:border-zinc-800">
              <span className="text-xs font-bold uppercase tracking-wider text-[#326891] block mb-4">
                More in {article.section}
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {relatedArticles.map(rel => (
                  <div
                    key={rel.id}
                    onClick={() => {
                      onOpenArticle(rel);
                      if (contentRef.current) contentRef.current.scrollTop = 0;
                    }}
                    className="cursor-pointer group"
                  >
                    <span className="text-[10px] text-gray-400 block mb-1">{rel.readTime}</span>
                    <h5 className="nyt-serif text-sm font-bold group-hover:underline leading-snug line-clamp-3">
                      {rel.title}
                    </h5>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Comments Tab */
          <div className="p-6 max-w-2xl mx-auto w-full flex-1 flex flex-col overflow-y-auto max-h-[82vh]">
            <div className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-zinc-800 mb-4">
              <div>
                <h3 className="text-lg font-bold">Reader Discussion</h3>
                <p className={`text-xs ${themeClasses.subtleText}`}>
                  {comments.length + (article.commentsCount || 0)} Comments on “{article.title}”
                </p>
              </div>

              {/* Filter: All vs NYT Picks */}
              <div className="flex items-center space-x-1 text-xs">
                <button
                  onClick={() => setCommentsFilter('all')}
                  className={`px-2 py-1 rounded font-bold transition ${
                    commentsFilter === 'all'
                      ? 'bg-black text-white dark:bg-white dark:text-black'
                      : 'text-gray-500 hover:text-black dark:hover:text-white'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setCommentsFilter('picks')}
                  className={`px-2 py-1 rounded font-bold transition ${
                    commentsFilter === 'picks'
                      ? 'bg-amber-100 text-amber-900'
                      : 'text-gray-500 hover:text-black dark:hover:text-white'
                  }`}
                >
                  NYT Picks
                </button>
              </div>
            </div>

            {/* Post comment form */}
            <form onSubmit={handleAddComment} className={`${themeClasses.cardBg} p-4 rounded-lg border mb-6`}>
              <span className="text-xs font-bold block mb-2">Write a comment</span>
              <div className="mb-2">
                <input
                  type="text"
                  placeholder="Your Name & City (e.g. Elena, Boston, MA)"
                  value={authorName}
                  onChange={e => setAuthorName(e.target.value)}
                  className="w-full text-xs px-3 py-1.5 rounded border border-gray-300 dark:border-zinc-700 focus:outline-none focus:border-black bg-white dark:bg-zinc-800"
                />
              </div>
              <textarea
                rows={3}
                placeholder="What do you think? Keep comments respectful and thoughtful."
                value={newComment}
                onChange={e => setNewComment(e.target.value)}
                className="w-full text-xs p-3 rounded border border-gray-300 dark:border-zinc-700 focus:outline-none focus:border-black bg-white dark:bg-zinc-800 resize-none"
              />
              <div className="flex justify-end mt-2">
                <button
                  type="submit"
                  disabled={!newComment.trim()}
                  className="bg-[#326891] hover:bg-[#254e6d] disabled:opacity-40 text-white text-xs font-bold px-4 py-1.5 rounded flex items-center space-x-1.5 transition"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Comment</span>
                </button>
              </div>
            </form>

            {/* Comments feed */}
            <div className="space-y-4">
              {filteredComments.map(c => {
                const totalLikes = c.likes + (likesMap[c.id] || 0);
                return (
                  <div key={c.id} className="border-b border-gray-200 dark:border-zinc-800 pb-4">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-xs">{c.author}</span>
                        <span className={`text-[11px] ${themeClasses.subtleText}`}>{c.location}</span>
                        {c.isNYTPick && (
                          <span className="text-[10px] font-bold bg-amber-100 text-amber-900 px-1.5 py-0.5 rounded">
                            NYT Pick
                          </span>
                        )}
                      </div>
                      <span className={`text-[10px] ${themeClasses.subtleText}`}>{c.timestamp}</span>
                    </div>
                    <p className="nyt-serif text-sm leading-relaxed mb-2">
                      {c.text}
                    </p>
                    <div className={`flex items-center space-x-3 text-xs ${themeClasses.subtleText}`}>
                      <button
                        onClick={() => handleLikeComment(c.id)}
                        className="flex items-center space-x-1 hover:text-[#326891] transition cursor-pointer"
                      >
                        <ThumbsUp className="w-3.5 h-3.5" />
                        <span>{totalLikes}</span>
                      </button>
                      <button className="hover:underline cursor-pointer">Reply</button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className={`px-6 py-3 border-t text-center text-xs ${themeClasses.subtleText} ${themeClasses.cardBg}`}>
          The New York Times • All rights reserved
        </div>
      </div>
    </div>
  );
};
