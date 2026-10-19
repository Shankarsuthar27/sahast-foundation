import React, { useState, useEffect, useRef } from 'react';
import {
  Save,
  ArrowLeft,
  Upload,
  Image as ImageIcon,
  Plus,
  Trash2,
  Eye,
  Bold,
  Italic,
  Heading2,
  Heading3,
  Quote,
  List,
  ListOrdered,
  Sparkles,
  CheckCircle2,
  Globe
} from 'lucide-react';
import { uploadImageToStorage } from '../../../firebase/services';

const CATEGORIES = ['Satsang', 'Seva', 'Press Release', 'Spiritual Discourse'];

export default function NewsEditor({ article, onSave, onCancel }) {
  const [title, setTitle] = useState(article?.title || '');
  const [slug, setSlug] = useState(article?.slug || '');
  const [autoSlug, setAutoSlug] = useState(!article?.slug);
  const [category, setCategory] = useState(article?.category || 'Satsang');
  const [excerpt, setExcerpt] = useState(article?.excerpt || '');
  const [content, setContent] = useState(article?.content || '<p>Write your spiritual discourse or press release here...</p>');
  const [featuredImage, setFeaturedImage] = useState(article?.featuredImage || '/home-page-image/WhatsApp-Image-2026-05-26-at-0-e1779814877129.jpeg');
  const [secondaryImages, setSecondaryImages] = useState(article?.secondaryImages || []);
  const [status, setStatus] = useState(article?.status || 'published');
  const [author, setAuthor] = useState(article?.author || 'Shree Abhaydas Ji Ashram');
  const [isUploading, setIsUploading] = useState(false);
  const [activeTab, setActiveTab] = useState('edit'); // 'edit' or 'preview'

  const contentRef = useRef(null);

  // Auto-generate slug from title
  useEffect(() => {
    if (autoSlug && title) {
      const generated = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      setSlug(generated);
    }
  }, [title, autoSlug]);

  const handleFeaturedUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const url = await uploadImageToStorage(file, 'news');
      setFeaturedImage(url);
    } catch (err) {
      alert(`Image upload error: ${err.message}`);
    } finally {
      setIsUploading(false);
    }
  };

  const handleAddSecondaryImage = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const url = await uploadImageToStorage(file, 'news');
      setSecondaryImages((prev) => [...prev, url]);
    } catch (err) {
      alert(`Image upload error: ${err.message}`);
    } finally {
      setIsUploading(false);
    }
  };

  // WYSIWYG commands
  const applyFormat = (command, value = null) => {
    document.execCommand(command, false, value);
    if (contentRef.current) {
      setContent(contentRef.current.innerHTML);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('Article title is required');
      return;
    }

    const payload = {
      title,
      slug: slug || 'article',
      category,
      excerpt,
      content,
      featuredImage,
      secondaryImages,
      status,
      author,
      publishedAt: article?.publishedAt || new Date().toISOString()
    };

    onSave(payload);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex items-center justify-between bg-white rounded-3xl p-6 border border-slate-200 shadow-xs">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
          >
            <ArrowLeft size={18} />
          </button>
          <div>
            <h2 className="text-lg font-extrabold text-slate-900 tracking-tight">
              {article ? 'Edit News Article' : 'Compose New Article'}
            </h2>
            <p className="text-xs text-slate-500">
              Publish spiritual press releases, satsang reports, and seva news
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Status Toggle */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-bold">
            <button
              type="button"
              onClick={() => setStatus('draft')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                status === 'draft'
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Draft
            </button>
            <button
              type="button"
              onClick={() => setStatus('published')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                status === 'published'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Published
            </button>
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            className="px-5 py-2.5 bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white font-bold text-xs rounded-xl shadow-lg shadow-orange-600/25 flex items-center gap-2 cursor-pointer transition-all"
          >
            <Save size={15} />
            <span>Save Article</span>
          </button>
        </div>
      </div>

      {/* Editor & Preview Toggle Tabs */}
      <div className="flex gap-2 border-b border-slate-200 pb-2">
        <button
          type="button"
          onClick={() => setActiveTab('edit')}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
            activeTab === 'edit'
              ? 'bg-[#0f382c] text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Rich Article Editor
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('preview')}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 ${
            activeTab === 'preview'
              ? 'bg-[#0f382c] text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Eye size={14} />
          <span>Live SEO Preview</span>
        </button>
      </div>

      {activeTab === 'edit' ? (
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Article Content (2 cols) */}
          <div className="lg:col-span-2 space-y-5 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
            {/* Title */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Article Title *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                placeholder="e.g. Divine Satsang in Takhatgarh"
                className="w-full px-4 py-3 text-sm font-bold bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#0f382c] transition-all"
              />
            </div>

            {/* SEO Slug */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <Globe size={13} className="text-slate-400" />
                  <span>SEO Permanent URL Slug</span>
                </label>
                <label className="flex items-center gap-1.5 text-[11px] text-slate-500 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={autoSlug}
                    onChange={(e) => setAutoSlug(e.target.checked)}
                    className="rounded text-orange-600"
                  />
                  <span>Auto-generate from title</span>
                </label>
              </div>
              <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-500 font-mono">
                <span className="text-slate-400">shreeabhaydas.com/news/</span>
                <input
                  type="text"
                  value={slug}
                  disabled={autoSlug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="flex-1 bg-transparent border-none text-slate-800 font-bold focus:outline-none disabled:opacity-75"
                />
              </div>
            </div>

            {/* Excerpt */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Article Summary / Excerpt (SEO Meta Description)
              </label>
              <textarea
                rows={3}
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="Brief 1-2 sentence summary for article listing cards and search engines..."
                className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#0f382c]"
              />
            </div>

            {/* WYSIWYG Editor */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                WYSIWYG Article Content Body
              </label>

              {/* Toolbar */}
              <div className="flex flex-wrap items-center gap-1 p-2 bg-slate-100 rounded-t-2xl border border-slate-200 border-b-0">
                <button
                  type="button"
                  onClick={() => applyFormat('bold')}
                  className="p-1.5 rounded-lg text-slate-700 hover:bg-white hover:shadow-xs"
                  title="Bold"
                >
                  <Bold size={15} />
                </button>
                <button
                  type="button"
                  onClick={() => applyFormat('italic')}
                  className="p-1.5 rounded-lg text-slate-700 hover:bg-white hover:shadow-xs"
                  title="Italic"
                >
                  <Italic size={15} />
                </button>
                <div className="h-4 w-px bg-slate-300 mx-1" />
                <button
                  type="button"
                  onClick={() => applyFormat('formatBlock', '<h2>')}
                  className="p-1.5 rounded-lg text-slate-700 hover:bg-white hover:shadow-xs"
                  title="Heading 2"
                >
                  <Heading2 size={15} />
                </button>
                <button
                  type="button"
                  onClick={() => applyFormat('formatBlock', '<h3>')}
                  className="p-1.5 rounded-lg text-slate-700 hover:bg-white hover:shadow-xs"
                  title="Heading 3"
                >
                  <Heading3 size={15} />
                </button>
                <button
                  type="button"
                  onClick={() => applyFormat('formatBlock', '<p>')}
                  className="px-2 py-1 text-xs font-bold text-slate-700 hover:bg-white rounded-lg"
                  title="Normal Paragraph"
                >
                  P
                </button>
                <div className="h-4 w-px bg-slate-300 mx-1" />
                <button
                  type="button"
                  onClick={() => applyFormat('formatBlock', '<blockquote>')}
                  className="p-1.5 rounded-lg text-slate-700 hover:bg-white hover:shadow-xs"
                  title="Blockquote"
                >
                  <Quote size={15} />
                </button>
                <button
                  type="button"
                  onClick={() => applyFormat('insertUnorderedList')}
                  className="p-1.5 rounded-lg text-slate-700 hover:bg-white hover:shadow-xs"
                  title="Bullet List"
                >
                  <List size={15} />
                </button>
                <button
                  type="button"
                  onClick={() => applyFormat('insertOrderedList')}
                  className="p-1.5 rounded-lg text-slate-700 hover:bg-white hover:shadow-xs"
                  title="Numbered List"
                >
                  <ListOrdered size={15} />
                </button>
              </div>

              {/* Editable Area */}
              <div
                ref={contentRef}
                contentEditable
                suppressContentEditableWarning
                onInput={(e) => setContent(e.currentTarget.innerHTML)}
                dangerouslySetInnerHTML={{ __html: content }}
                className="w-full min-h-[260px] p-4 text-sm bg-white border border-slate-200 rounded-b-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 prose max-w-none"
              />
            </div>
          </div>

          {/* Right Sidebar Details (1 col) */}
          <div className="space-y-5">
            {/* Category & Author Card */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Category Picker
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#0f382c] font-semibold"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Author / Publisher
                </label>
                <input
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#0f382c]"
                />
              </div>
            </div>

            {/* Featured Image Card */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-3.5">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Featured Cover Image
              </label>

              {featuredImage && (
                <div className="relative rounded-2xl overflow-hidden aspect-video border border-slate-200 shadow-xs">
                  <img src={featuredImage} alt="Featured" className="w-full h-full object-cover" />
                </div>
              )}

              <div className="flex gap-2">
                <input
                  type="text"
                  value={featuredImage}
                  onChange={(e) => setFeaturedImage(e.target.value)}
                  placeholder="Image URL..."
                  className="flex-1 px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl"
                />
                <label className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer shrink-0">
                  <Upload size={13} />
                  <span>Upload</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFeaturedUpload}
                  />
                </label>
              </div>
            </div>

            {/* Secondary Images Array */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Secondary Images ({secondaryImages.length})
                </label>
                <label className="text-xs text-orange-600 hover:text-orange-700 font-bold flex items-center gap-1 cursor-pointer">
                  <Plus size={13} />
                  <span>Add Image</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleAddSecondaryImage}
                  />
                </label>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {secondaryImages.map((img, i) => (
                  <div key={i} className="relative aspect-square rounded-xl overflow-hidden border border-slate-200 group">
                    <img src={img} alt="Secondary" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => setSecondaryImages(secondaryImages.filter((_, idx) => idx !== i))}
                      className="absolute top-1 right-1 p-1 bg-red-600 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </form>
      ) : (
        /* Preview Tab */
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xs max-w-3xl mx-auto space-y-6">
          <div className="space-y-3 border-b border-slate-100 pb-6">
            <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-xs font-bold">
              {category}
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
              {title || 'Untitled Article'}
            </h1>
            <div className="flex items-center gap-3 text-xs text-slate-400">
              <span>By {author}</span>
              <span>•</span>
              <span>{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
            </div>
          </div>

          {featuredImage && (
            <div className="rounded-2xl overflow-hidden aspect-video border border-slate-200">
              <img src={featuredImage} alt="Cover" className="w-full h-full object-cover" />
            </div>
          )}

          {excerpt && (
            <p className="text-base text-slate-600 font-medium italic border-l-4 border-orange-500 pl-4 py-1">
              {excerpt}
            </p>
          )}

          <div
            className="prose max-w-none text-slate-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      )}
    </div>
  );
}
