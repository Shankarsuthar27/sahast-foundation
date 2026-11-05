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
  Underline,
  Heading2,
  Heading3,
  Quote,
  List,
  ListOrdered,
  RemoveFormatting,
  Link2,
  Code,
  Sparkles,
  CheckCircle2,
  Globe,
  Loader2,
  X
} from 'lucide-react';
import { uploadImageToStorage } from '../../../firebase/services';
import { useCms } from '../../../context/CmsContext';

const CATEGORIES = ['Satsang', 'Seva', 'Press Release', 'Spiritual Discourse', 'Gurukul', 'Annadan'];

const PRESET_IMAGES = [
  '/home-page-image/WhatsApp-Image-2026-05-26-at-0-e1779814877129.jpeg',
  '/home-page-image/WhatsApp-Image-2026-05-26-at-21.23.3866-e1779814834826.jpeg',
  '/home-page-image/WhatsApp-Image-2026-05-26-at-21.23.40-e1779954909287.jpeg',
  '/home-page-image/WhatsApp-Image-2026-05-28-at-13.35.48-e1779956288882.jpeg',
  '/home-page-image/WhatsApp-Image-2026-05-28-at-16.38.59sss.jpeg',
  '/home-page-image/WhatsApp-Image-2026-05-28-at-16.39.00ds.jpeg',
  '/home-page-image/WhatsApp-Image-2026-05-28-at-16.39.02ad.jpeg',
  '/home-page-image/WhatsApp-Image-2026-05-28-at-16.39.05fsf.jpeg',
  '/home-page-image/guruji-1.jpeg',
  '/home-page-image/gurukul.png',
  '/home-page-image/meditation-1-e1780126777484.png',
  '/home-page-image/The-Power-of-Seva-Serving-Humanity-with-Compassion.png'
];

// Helper to sanitize and normalize image paths (handles page-image/, home-page-image/, relative paths)
function normalizeImageUrl(url) {
  if (!url) return '';
  let trimmed = url.trim();
  if (trimmed.startsWith('page-image/')) {
    trimmed = '/home-page-image/' + trimmed.replace('page-image/', '');
  } else if (trimmed.startsWith('home-page-image/')) {
    trimmed = '/' + trimmed;
  } else if (
    !trimmed.startsWith('/') &&
    !trimmed.startsWith('http://') &&
    !trimmed.startsWith('https://') &&
    !trimmed.startsWith('data:')
  ) {
    trimmed = '/' + trimmed;
  }
  return trimmed;
}

export default function NewsEditor({ article, onSave, onCancel }) {
  const { galleryList, addGalleryPhoto } = useCms();

  const [title, setTitle] = useState(article?.title || '');
  const [slug, setSlug] = useState(article?.slug || '');
  const [autoSlug, setAutoSlug] = useState(!article?.slug);
  const [category, setCategory] = useState(article?.category || 'Satsang');
  const [excerpt, setExcerpt] = useState(article?.excerpt || '');
  const initialContent = (
    article?.content &&
    article.content !== '<p>Write your spiritual discourse or press release here...</p>' &&
    article.content !== 'Write your spiritual discourse or press release here...'
  ) ? article.content : '';

  const [content, setContent] = useState(initialContent);
  const [featuredImage, setFeaturedImage] = useState(
    normalizeImageUrl(article?.featuredImage) || '/home-page-image/WhatsApp-Image-2026-05-26-at-0-e1779814877129.jpeg'
  );
  const [secondaryImages, setSecondaryImages] = useState(article?.secondaryImages || []);
  const [status, setStatus] = useState(article?.status || 'published');
  const [author, setAuthor] = useState(article?.author || 'Shree Abhaydas Ji Ashram');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadPercent, setUploadPercent] = useState(0);
  const [isUploadingSecondary, setIsUploadingSecondary] = useState(false);
  const [isSavingArticle, setIsSavingArticle] = useState(false);
  const [activeTab, setActiveTab] = useState('edit'); // 'edit' or 'preview'
  const [editorMode, setEditorMode] = useState('visual'); // 'visual' or 'code'
  const [showPresetPicker, setShowPresetPicker] = useState(false);

  const contentRef = useRef(null);
  const isInitializedRef = useRef(false);

  // Initialize contentEditable only once or when article prop changes
  useEffect(() => {
    if (contentRef.current && (!isInitializedRef.current || article)) {
      contentRef.current.innerHTML = initialContent || '';
      isInitializedRef.current = true;
    }
  }, [article, initialContent]);

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

  // Handle Featured Image Upload
  const handleFeaturedUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadPercent(0);
    try {
      const url = await uploadImageToStorage(file, 'gallery', (pct) => {
        setUploadPercent(pct);
      });
      const cleanUrl = normalizeImageUrl(url);
      setFeaturedImage(cleanUrl);

      // Also register photo in Gallery so it's reusable across the CMS
      if (addGalleryPhoto && cleanUrl) {
        addGalleryPhoto({
          title: file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '),
          url: cleanUrl,
          category: 'Pravachan',
          createdAt: Date.now(),
          featured: false
        }).catch(() => {});
      }
    } catch (err) {
      alert(`Image upload error: ${err.message}`);
    } finally {
      setIsUploading(false);
      setUploadPercent(0);
      try {
        e.target.value = '';
      } catch (_) {}
    }
  };

  // Handle Secondary Images Upload
  const handleAddSecondaryImage = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingSecondary(true);
    try {
      const url = await uploadImageToStorage(file, 'gallery');
      const cleanUrl = normalizeImageUrl(url);
      setSecondaryImages((prev) => [...prev, cleanUrl]);

      if (addGalleryPhoto && cleanUrl) {
        addGalleryPhoto({
          title: file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '),
          url: cleanUrl,
          category: 'Pravachan',
          createdAt: Date.now(),
          featured: false
        }).catch(() => {});
      }
    } catch (err) {
      alert(`Image upload error: ${err.message}`);
    } finally {
      setIsUploadingSecondary(false);
      try {
        e.target.value = '';
      } catch (_) {}
    }
  };

  // Safe formatting command without losing cursor focus
  const applyFormat = (command, value = null) => {
    if (editorMode === 'code') return;
    if (contentRef.current) {
      contentRef.current.focus();
    }
    document.execCommand(command, false, value);
    if (contentRef.current) {
      setContent(contentRef.current.innerHTML);
    }
  };

  const handleLinkPrompt = () => {
    const url = window.prompt('Enter link destination URL:', 'https://');
    if (url) {
      applyFormat('createLink', url);
    }
  };

  // Sync content input without React DOM wipe
  const handleContentInput = (e) => {
    const html = e.currentTarget.innerHTML;
    // Normalize empty tags produced by browsers on backspace
    if (!html || html === '<br>' || html === '<p><br></p>' || html.trim() === '') {
      if (e.currentTarget.innerHTML !== '') {
        e.currentTarget.innerHTML = '';
      }
      setContent('');
      return;
    }
    setContent(html);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('Article title is required');
      return;
    }

    const cleanContent = (!content || content === '<p><br></p>' || content === '<br>') ? '' : content;

    const payload = {
      title,
      slug: slug || 'article',
      category,
      excerpt,
      content: cleanContent,
      featuredImage: normalizeImageUrl(featuredImage),
      secondaryImages: secondaryImages.map(normalizeImageUrl),
      status,
      author,
      publishedAt: article?.publishedAt || new Date().toISOString()
    };

    onSave(payload);
  };

  // Available images to pick from (Gallery + Presets)
  const availableImages = [
    ...(galleryList || []).map((g) => g.url),
    ...PRESET_IMAGES
  ].filter(Boolean);
  const uniqueImages = Array.from(new Set(availableImages));

  return (
    <div className="space-y-6">
      <style>{`
        /* ContentEditable Placeholder */
        .wysiwyg-area[contenteditable]:empty:before {
          content: attr(data-placeholder);
          color: #94a3b8;
          pointer-events: none;
          display: block;
        }
        .wysiwyg-area[contenteditable]:focus:empty:before {
          color: #cbd5e1;
        }
      `}</style>

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
          className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
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
          className={`px-4 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
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

            {/* ==================================================== */}
            {/* WYSIWYG ARTICLE CONTENT BODY (FIXED & ENHANCED)     */}
            {/* ==================================================== */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  WYSIWYG Article Content Body
                </label>
                {/* Visual vs Code Editor Switcher */}
                <div className="flex items-center bg-slate-100 p-0.5 rounded-lg text-[11px] font-semibold text-slate-600">
                  <button
                    type="button"
                    onClick={() => {
                      setEditorMode('visual');
                      if (contentRef.current) {
                        contentRef.current.innerHTML = content || '';
                      }
                    }}
                    className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                      editorMode === 'visual'
                        ? 'bg-white text-slate-900 shadow-2xs font-bold'
                        : 'hover:text-slate-900'
                    }`}
                  >
                    Visual Editor
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (contentRef.current) {
                        setContent(contentRef.current.innerHTML);
                      }
                      setEditorMode('code');
                    }}
                    className={`px-2.5 py-1 rounded-md transition-colors flex items-center gap-1 cursor-pointer ${
                      editorMode === 'code'
                        ? 'bg-white text-slate-900 shadow-2xs font-bold'
                        : 'hover:text-slate-900'
                    }`}
                  >
                    <Code size={12} />
                    <span>HTML Source</span>
                  </button>
                </div>
              </div>

              {/* Formatting Toolbar */}
              {editorMode === 'visual' ? (
                <>
                  <div className="flex flex-wrap items-center gap-1 p-2 bg-slate-100 rounded-t-2xl border border-slate-200 border-b-0">
                    <button
                      type="button"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => applyFormat('bold')}
                      className="p-1.5 rounded-lg text-slate-700 hover:bg-white hover:shadow-xs transition-colors cursor-pointer"
                      title="Bold (Ctrl+B)"
                    >
                      <Bold size={15} />
                    </button>
                    <button
                      type="button"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => applyFormat('italic')}
                      className="p-1.5 rounded-lg text-slate-700 hover:bg-white hover:shadow-xs transition-colors cursor-pointer"
                      title="Italic (Ctrl+I)"
                    >
                      <Italic size={15} />
                    </button>
                    <button
                      type="button"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => applyFormat('underline')}
                      className="p-1.5 rounded-lg text-slate-700 hover:bg-white hover:shadow-xs transition-colors cursor-pointer"
                      title="Underline (Ctrl+U)"
                    >
                      <Underline size={15} />
                    </button>

                    <div className="h-4 w-px bg-slate-300 mx-1" />

                    <button
                      type="button"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => applyFormat('formatBlock', '<h2>')}
                      className="p-1.5 rounded-lg text-slate-700 hover:bg-white hover:shadow-xs transition-colors cursor-pointer"
                      title="Heading 2"
                    >
                      <Heading2 size={15} />
                    </button>
                    <button
                      type="button"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => applyFormat('formatBlock', '<h3>')}
                      className="p-1.5 rounded-lg text-slate-700 hover:bg-white hover:shadow-xs transition-colors cursor-pointer"
                      title="Heading 3"
                    >
                      <Heading3 size={15} />
                    </button>
                    <button
                      type="button"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => applyFormat('formatBlock', '<p>')}
                      className="px-2 py-1 text-xs font-bold text-slate-700 hover:bg-white rounded-lg hover:shadow-xs transition-colors cursor-pointer"
                      title="Normal Paragraph"
                    >
                      P
                    </button>

                    <div className="h-4 w-px bg-slate-300 mx-1" />

                    <button
                      type="button"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => applyFormat('formatBlock', '<blockquote>')}
                      className="p-1.5 rounded-lg text-slate-700 hover:bg-white hover:shadow-xs transition-colors cursor-pointer"
                      title="Blockquote"
                    >
                      <Quote size={15} />
                    </button>
                    <button
                      type="button"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => applyFormat('insertUnorderedList')}
                      className="p-1.5 rounded-lg text-slate-700 hover:bg-white hover:shadow-xs transition-colors cursor-pointer"
                      title="Bullet List"
                    >
                      <List size={15} />
                    </button>
                    <button
                      type="button"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => applyFormat('insertOrderedList')}
                      className="p-1.5 rounded-lg text-slate-700 hover:bg-white hover:shadow-xs transition-colors cursor-pointer"
                      title="Numbered List"
                    >
                      <ListOrdered size={15} />
                    </button>

                    <div className="h-4 w-px bg-slate-300 mx-1" />

                    <button
                      type="button"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={handleLinkPrompt}
                      className="p-1.5 rounded-lg text-slate-700 hover:bg-white hover:shadow-xs transition-colors cursor-pointer"
                      title="Insert Hyperlink"
                    >
                      <Link2 size={15} />
                    </button>
                    <button
                      type="button"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => applyFormat('removeFormat')}
                      className="p-1.5 rounded-lg text-slate-700 hover:bg-white hover:shadow-xs transition-colors cursor-pointer"
                      title="Clear Formatting"
                    >
                      <RemoveFormatting size={15} />
                    </button>
                  </div>

                  {/* Visual ContentEditable Area without cursor jump */}
                  <div
                    ref={contentRef}
                    contentEditable
                    suppressContentEditableWarning
                    data-placeholder="Write your spiritual discourse or press release here..."
                    onInput={handleContentInput}
                    className="wysiwyg-area w-full min-h-[300px] p-4 text-sm bg-white border border-slate-200 rounded-b-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 prose max-w-none text-slate-800 leading-relaxed"
                  />
                </>
              ) : (
                /* Raw HTML Code Editor Mode */
                <textarea
                  value={content}
                  onChange={(e) => {
                    setContent(e.target.value);
                    if (contentRef.current) contentRef.current.innerHTML = e.target.value;
                  }}
                  rows={14}
                  placeholder="<p>Write your raw HTML article content here...</p>"
                  className="w-full p-4 text-xs font-mono bg-slate-900 text-emerald-400 border border-slate-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/30 leading-relaxed resize-y"
                />
              )}
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

            {/* ==================================================== */}
            {/* FEATURED COVER IMAGE CARD (FIXED & ENHANCED)        */}
            {/* ==================================================== */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-3.5">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Featured Cover Image
                </label>
                <button
                  type="button"
                  onClick={() => setShowPresetPicker(!showPresetPicker)}
                  className="text-xs text-orange-600 hover:text-orange-700 font-semibold cursor-pointer"
                >
                  {showPresetPicker ? 'Hide Gallery' : 'Pick from Media'}
                </button>
              </div>

              {/* Cover Image Preview */}
              {featuredImage && (
                <div className="relative rounded-2xl overflow-hidden aspect-video border border-slate-200 shadow-xs group bg-slate-100">
                  <img
                    src={featuredImage}
                    alt="Featured"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = '/home-page-image/WhatsApp-Image-2026-05-26-at-0-e1779814877129.jpeg';
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setFeaturedImage('')}
                    className="absolute top-2 right-2 p-1 bg-red-600/90 hover:bg-red-600 text-white rounded-lg shadow-sm opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                    title="Remove Image"
                  >
                    <X size={13} />
                  </button>
                </div>
              )}

              {/* URL Input & Upload Button */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={featuredImage}
                  onChange={(e) => setFeaturedImage(e.target.value)}
                  onBlur={(e) => setFeaturedImage(normalizeImageUrl(e.target.value))}
                  placeholder="Image URL or /home-page-image/..."
                  className="flex-1 px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-orange-500 font-mono"
                />
                <label
                  className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shrink-0 transition-colors ${
                    isUploading
                      ? 'bg-orange-50 text-orange-600 border border-orange-200 cursor-not-allowed'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {isUploading ? (
                    <>
                      <Loader2 size={13} className="animate-spin text-orange-600" />
                      <span>Uploading...</span>
                    </>
                  ) : (
                    <>
                      <Upload size={13} />
                      <span>Upload</span>
                    </>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    disabled={isUploading}
                    className="hidden"
                    onChange={handleFeaturedUpload}
                  />
                </label>
              </div>

              {/* Media Gallery Quick Picker */}
              {showPresetPicker && (
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                  <div className="text-[11px] font-bold text-slate-600">Click to select photo:</div>
                  <div className="grid grid-cols-4 gap-1.5 max-h-40 overflow-y-auto p-1">
                    {uniqueImages.slice(0, 16).map((img, i) => (
                      <img
                        key={i}
                        src={img}
                        alt="Media option"
                        onClick={() => {
                          setFeaturedImage(img);
                          setShowPresetPicker(false);
                        }}
                        className={`w-full aspect-square object-cover rounded-lg border-2 cursor-pointer transition-all hover:scale-105 ${
                          featuredImage === img ? 'border-orange-500 ring-2 ring-orange-200' : 'border-transparent'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Secondary Images Array */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Secondary Images ({secondaryImages.length})
                </label>
                <label className="text-xs text-orange-600 hover:text-orange-700 font-bold flex items-center gap-1 cursor-pointer">
                  {isUploadingSecondary ? (
                    <>
                      <Loader2 size={13} className="animate-spin text-orange-600" />
                      <span>Uploading...</span>
                    </>
                  ) : (
                    <>
                      <Plus size={13} />
                      <span>Add Image</span>
                    </>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    disabled={isUploadingSecondary}
                    className="hidden"
                    onChange={handleAddSecondaryImage}
                  />
                </label>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {secondaryImages.map((img, i) => (
                  <div key={i} className="relative aspect-square rounded-xl overflow-hidden border border-slate-200 group bg-slate-50">
                    <img src={img} alt="Secondary" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => setSecondaryImages(secondaryImages.filter((_, idx) => idx !== i))}
                      className="absolute top-1 right-1 p-1 bg-red-600 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer shadow-sm"
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
            <div className="rounded-2xl overflow-hidden aspect-video border border-slate-200 bg-slate-100">
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
