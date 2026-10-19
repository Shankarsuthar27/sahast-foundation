import React, { useState } from 'react';
import {
  Plus,
  Search,
  RotateCw,
  FileText,
  Sparkles,
  Tag,
  Newspaper,
  Edit2,
  Trash2,
  Calendar
} from 'lucide-react';
import { useCms } from '../../../context/CmsContext';
import NewsEditor from './NewsEditor';

const CATEGORIES = ['All Categories', 'Satsang', 'Seva', 'Press Release', 'Spiritual Discourse'];

export default function NewsManager() {
  const { newsList, addNews, updateNews, deleteNews } = useCms();
  const [editingArticle, setEditingArticle] = useState(null);
  const [isComposing, setIsComposing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Filtered news items
  const filteredArticles = newsList.filter((item) => {
    const matchesCategory =
      categoryFilter === 'All Categories' || item.category === categoryFilter;
    const matchesSearch =
      !searchQuery.trim() ||
      item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.excerpt?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 600);
  };

  const handleSaveArticle = async (payload) => {
    if (editingArticle) {
      await updateNews(editingArticle.id, payload);
    } else {
      await addNews(payload);
    }
    setEditingArticle(null);
    setIsComposing(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this article?')) {
      await deleteNews(id);
    }
  };

  // If in editor view
  if (isComposing || editingArticle) {
    return (
      <NewsEditor
        article={editingArticle}
        onSave={handleSaveArticle}
        onCancel={() => {
          setEditingArticle(null);
          setIsComposing(false);
        }}
      />
    );
  }

  return (
    <div className="space-y-8">
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            News & Press Releases
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage official announcements, spiritual news, and media releases for shreeabhaydas.com.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={handleRefresh}
            className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
          >
            <RotateCw size={14} className={isRefreshing ? 'animate-spin' : ''} />
            <span>Refresh</span>
          </button>

          <button
            type="button"
            onClick={() => setIsComposing(true)}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-xl shadow-sm flex items-center gap-1.5 cursor-pointer transition-all"
          >
            <Plus size={15} />
            <span>Write New Article</span>
          </button>
        </div>
      </div>

      {/* 3 Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Card 1: Total */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-600">
              <FileText size={18} />
            </div>
            <span className="px-2.5 py-1 text-[11px] font-semibold text-slate-600 bg-slate-50 rounded-lg border border-slate-100">
              Total
            </span>
          </div>
          <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-1">
            {newsList.length}
          </div>
          <div className="text-xs font-medium text-slate-500">
            Published Articles
          </div>
        </div>

        {/* Card 2: Featured */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-600">
              <Sparkles size={18} />
            </div>
            <span className="px-2.5 py-1 text-[11px] font-semibold text-slate-600 bg-slate-50 rounded-lg border border-slate-100">
              Featured
            </span>
          </div>
          <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-1">
            {newsList.filter((n) => n.featured).length}
          </div>
          <div className="text-xs font-medium text-slate-500">
            Homepage Featured
          </div>
        </div>

        {/* Card 3: TipTap + AI */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-600">
              <Tag size={18} />
            </div>
            <span className="px-2.5 py-1 text-[11px] font-semibold text-slate-600 bg-slate-50 rounded-lg border border-slate-100">
              Editor
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-1">
            TipTap + AI
          </div>
          <div className="text-xs font-medium text-slate-500">
            Rich Story Canvas
          </div>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white rounded-2xl p-3 border border-slate-200/80 shadow-2xs flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 flex items-center">
          <Search size={16} className="absolute left-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search by article title, headline, or keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs bg-slate-50/60 border border-slate-100 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-slate-300"
          />
        </div>

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-4 py-2 text-xs bg-slate-50/60 border border-slate-100 rounded-xl text-slate-700 focus:outline-none focus:bg-white font-medium cursor-pointer shrink-0"
        >
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Articles Container */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-xs font-bold text-slate-800">
            Articles in Firestore ({newsList.length})
          </h2>
          <span className="text-[11px] text-slate-400">
            {filteredArticles.length} Filtered
          </span>
        </div>

        {filteredArticles.length === 0 ? (
          /* Empty State */
          <div className="py-20 px-6 text-center space-y-4">
            <div className="w-12 h-12 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center mx-auto border border-slate-100">
              <Newspaper size={24} />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-800">No articles found</div>
              <div className="text-xs text-slate-400 mt-1">
                Click "Write New Article" above to create your first article.
              </div>
            </div>
            <div>
              <button
                type="button"
                onClick={() => setIsComposing(true)}
                className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white text-xs font-semibold rounded-xl shadow-xs inline-flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                <Plus size={15} />
                <span>Write New Article</span>
              </button>
            </div>
          </div>
        ) : (
          /* Table / List of articles */
          <div className="divide-y divide-slate-100">
            {filteredArticles.map((article) => (
              <div
                key={article.id}
                className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-sky-50 text-sky-700 border border-sky-100">
                      {article.category || 'Article'}
                    </span>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Calendar size={12} />
                      {article.publishedAt ? new Date(article.publishedAt).toLocaleDateString() : 'Draft'}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900">
                    {article.title}
                  </h3>
                  {article.excerpt && (
                    <p className="text-xs text-slate-500 line-clamp-1 max-w-2xl">
                      {article.excerpt}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => setEditingArticle(article)}
                    className="p-2 text-slate-600 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-colors"
                    title="Edit article"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(article.id)}
                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete article"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
