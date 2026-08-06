import React, { useState } from 'react';
import { BLOG_POSTS } from '../data/clinicData';
import { BlogPost } from '../types';
import { FileText, Clock, User, ArrowRight, X, BookOpen, Share2 } from 'lucide-react';

interface BlogSectionProps {
  selectedBlogIdFromOutside?: string | null;
}

export const BlogSection: React.FC<BlogSectionProps> = ({
  selectedBlogIdFromOutside = null,
}) => {
  const [selectedArticle, setSelectedArticle] = useState<BlogPost | null>(
    selectedBlogIdFromOutside
      ? BLOG_POSTS.find((b) => b.id === selectedBlogIdFromOutside) || null
      : null
  );

  return (
    <section id="blog" className="py-20 lg:py-28 relative bg-slate-50 dark:bg-slate-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 text-xs font-semibold uppercase tracking-wider">
            <span>Medical Science & Longevity</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white font-display tracking-tight">
            Latest Health Insights
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg">
            Articles authored by LuminaCare's chief physicians on clinical breakthroughs, preventative cardiology, and longevity science.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post) => (
            <div
              key={post.id}
              onClick={() => setSelectedArticle(post)}
              className="glass-card glass-card-hover overflow-hidden cursor-pointer flex flex-col justify-between group"
            >
              <div>
                {/* Image Banner */}
                <div className="relative h-52 overflow-hidden bg-slate-100 dark:bg-slate-800">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/90 dark:bg-slate-900/90 text-[10px] font-bold text-sky-600 dark:text-sky-400 backdrop-blur-md">
                    {post.category}
                  </div>
                </div>

                {/* Article Info */}
                <div className="p-6 space-y-3">
                  <div className="flex items-center space-x-3 text-xs text-slate-400">
                    <span className="flex items-center">
                      <Clock className="w-3.5 h-3.5 mr-1 text-sky-500" />
                      {post.readTime}
                    </span>
                    <span>•</span>
                    <span>{post.publishedDate}</span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-sky-500 transition-colors font-display line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              {/* Author Footer */}
              <div className="p-6 pt-0 border-t border-slate-100 dark:border-slate-800/80 mt-4 flex items-center justify-between">
                <div className="flex items-center space-x-2.5 pt-4">
                  <img
                    src={post.authorImage}
                    alt={post.author}
                    referrerPolicy="no-referrer"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div>
                    <div className="text-xs font-bold text-slate-800 dark:text-slate-200">{post.author}</div>
                    <div className="text-[10px] text-slate-400">{post.authorRole}</div>
                  </div>
                </div>

                <div className="pt-4 text-xs font-semibold text-sky-500 group-hover:text-sky-600 flex items-center">
                  Read <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Full Article Reader Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl glass-modal p-6 sm:p-10 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedArticle(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-bold text-sky-500 uppercase tracking-widest">
                  {selectedArticle.category} • {selectedArticle.publishedDate}
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white font-display">
                  {selectedArticle.title}
                </h2>
              </div>

              {/* Author Bar */}
              <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                <div className="flex items-center space-x-3">
                  <img
                    src={selectedArticle.authorImage}
                    alt={selectedArticle.author}
                    referrerPolicy="no-referrer"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white">{selectedArticle.author}</div>
                    <div className="text-[11px] text-slate-500">{selectedArticle.authorRole}</div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({ title: selectedArticle.title, url: window.location.href });
                    }
                  }}
                  className="p-2 rounded-full text-slate-400 hover:text-sky-500"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>

              {/* Cover Image */}
              <div className="h-64 sm:h-80 rounded-2xl overflow-hidden">
                <img
                  src={selectedArticle.imageUrl}
                  alt={selectedArticle.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Body Content */}
              <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                {selectedArticle.content}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-100 dark:border-slate-800">
                {selectedArticle.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-full text-[11px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
