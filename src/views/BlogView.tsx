import React, { useState } from 'react';
import { ChevronRight, ArrowLeft, Clock, Calendar, User, Tag, Share2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { BLOG_POSTS } from '../data/mockData';
import { BlogPost } from '../types';

export const BlogView: React.FC = () => {
  const { selectedBlogPost, setSelectedBlogPost, setCurrentView, language } = useApp();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const isUrdu = language === 'ur';

  const categories = ['all', 'Buying Guides', 'Market Advice', 'Hardware & Power'];

  const filteredPosts =
    activeCategory === 'all'
      ? BLOG_POSTS
      : BLOG_POSTS.filter((p) => p.category === activeCategory);

  // Single Blog Post Reader
  if (selectedBlogPost) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        <button
          onClick={() => setSelectedBlogPost(null)}
          className="text-xs font-bold text-blue-700 hover:text-blue-900 flex items-center gap-1"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Guides</span>
        </button>

        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs p-6 sm:p-10 space-y-6">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
              <span className="bg-blue-50 text-blue-800 font-bold px-2.5 py-0.5 rounded">
                {selectedBlogPost.category}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {selectedBlogPost.date}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {selectedBlogPost.readTime}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
              {isUrdu ? selectedBlogPost.titleUrdu : selectedBlogPost.title}
            </h1>

            <div className="flex items-center gap-2 text-xs text-slate-600 pt-1">
              <div className="w-7 h-7 rounded-full bg-blue-900 text-white flex items-center justify-center font-bold text-[10px] tracking-tighter">
                SIT
              </div>
              <span className="font-semibold">{selectedBlogPost.author}</span>
            </div>
          </div>

          <div className="h-64 sm:h-80 rounded-xl overflow-hidden bg-slate-100">
            <img
              src={selectedBlogPost.image}
              alt={selectedBlogPost.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-700 leading-relaxed space-y-4 whitespace-pre-line">
            {selectedBlogPost.content}
          </div>

          <div className="pt-6 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-1.5">
              {selectedBlogPost.tags.map((t, i) => (
                <span
                  key={i}
                  className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-[11px] font-medium"
                >
                  #{t}
                </span>
              ))}
            </div>

            <button
              onClick={() => setCurrentView('shop')}
              className="bg-blue-800 hover:bg-blue-900 text-white font-bold px-4 py-2 rounded-lg text-xs"
            >
              Browse Recommended Hardware
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Articles List
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          {isUrdu ? 'آئی ٹی خریدنے کی مکمل رہنمائی اور مضامین' : 'IT Market Buying Guides & Tech Articles'}
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Honest hardware testing advice from Hafeez Centre engineers. Budget laptops, SSD comparisons, and power backup.
        </p>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-semibold">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setActiveCategory(c)}
            className={`px-3 py-1.5 rounded-lg capitalize transition ${
              activeCategory === c
                ? 'bg-blue-800 text-white shadow-2xs'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredPosts.map((post) => (
          <div
            key={post.id}
            onClick={() => setSelectedBlogPost(post)}
            className="bg-white rounded-xl border border-slate-200 hover:border-blue-500 shadow-2xs hover:shadow-md transition overflow-hidden cursor-pointer flex flex-col justify-between group"
          >
            <div>
              <div className="h-48 overflow-hidden bg-slate-100">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
              </div>

              <div className="p-5 space-y-2.5">
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span className="text-blue-700 font-bold uppercase">{post.category}</span>
                  <span>{post.readTime}</span>
                </div>

                <h3 className="font-bold text-slate-900 text-sm group-hover:text-blue-800 transition line-clamp-2">
                  {isUrdu ? post.titleUrdu : post.title}
                </h3>

                <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>
            </div>

            <div className="p-5 pt-0 text-xs font-bold text-blue-700 flex items-center gap-1">
              <span>Read Full Guide</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
