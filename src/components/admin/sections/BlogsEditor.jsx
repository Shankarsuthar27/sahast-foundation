import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Loader2, Save, X, FileText, Calendar, User, Search } from 'lucide-react';
import { FormInput, FormTextarea } from '../FormInput';
import RichTextEditor from '../RichTextEditor';
import ImageUploader from '../ImageUploader';
import {
  getCollectionItems,
  addCollectionItem,
  updateCollectionItem,
  deleteCollectionItem
} from '../../../firebase/services';

export default function BlogsEditor() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    title: '',
    author: 'Sahast Foundation',
    date: 'October 2026',
    excerpt: '',
    content: '',
    imageUrl: '',
    slug: ''
  });

  const loadData = async () => {
    setLoading(true);
    const data = await getCollectionItems('blogs');
    setBlogs(data);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const openCreateModal = () => {
    setEditingItem(null);
    setForm({
      title: '',
      author: 'Sahast Foundation',
      date: 'October 2026',
      excerpt: '',
      content: '',
      imageUrl: '/home-page-image/gurukul.png',
      slug: ''
    });
    setModalOpen(true);
  };

  const openEditModal = (item) => {
    setEditingItem(item);
    setForm({
      title: item.title || '',
      author: item.author || 'Sahast Foundation',
      date: item.date || 'October 2026',
      excerpt: item.excerpt || '',
      content: item.content || '',
      imageUrl: item.imageUrl || '',
      slug: item.slug || ''
    });
    setModalOpen(true);
  };

  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  };

  const handleTitleChange = (val) => {
    setForm((prev) => ({
      ...prev,
      title: val,
      slug: !editingItem ? generateSlug(val) : prev.slug
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) {
      alert('Please provide a title for the blog post.');
      return;
    }
    setSaving(true);
    try {
      const payload = {
        ...form,
        slug: form.slug.trim() || generateSlug(form.title)
      };

      if (editingItem) {
        await updateCollectionItem('blogs', editingItem.id, payload);
      } else {
        await addCollectionItem('blogs', payload);
      }
      setModalOpen(false);
      await loadData();
    } catch (err) {
      alert('Error saving blog: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (item) => {
    if (!confirm(`Delete blog post "${item.title}"?`)) return;
    try {
      await deleteCollectionItem('blogs', item.id);
      await loadData();
    } catch (err) {
      alert('Error deleting blog: ' + err.message);
    }
  };

  const filtered = blogs.filter((b) =>
    (b.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (b.author || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900">
            Articles & Blogs Manager (blogs collection)
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Create, edit, or publish spiritual discourses and educational articles.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search posts..."
              className="pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:ring-1 focus:ring-amber-500 w-44"
            />
          </div>
          <button
            type="button"
            onClick={openCreateModal}
            className="px-4 py-2 text-xs font-bold text-white bg-amber-600 hover:bg-amber-700 rounded-lg shadow-sm transition-all inline-flex items-center gap-1.5"
          >
            <Plus size={15} />
            <span>Write New Post</span>
          </button>
        </div>
      </div>

      {/* Blogs List */}
      {loading ? (
        <div className="p-12 text-center text-slate-500 flex items-center justify-center gap-2">
          <Loader2 size={20} className="animate-spin text-amber-600" />
          <span>Loading articles from Firestore...</span>
        </div>
      ) : filtered.length === 0 ? (
        <div className="p-12 text-center text-slate-400">
          No articles match your search. Click &quot;Write New Post&quot; to publish one.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-slate-700 font-bold uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3 px-6">Thumbnail & Title</th>
                <th className="py-3 px-4">Author</th>
                <th className="py-3 px-4">Publish Date</th>
                <th className="py-3 px-4">URL Slug</th>
                <th className="py-3 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((blog) => (
                <tr key={blog.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-4 px-6 flex items-center gap-3">
                    <img
                      src={blog.imageUrl}
                      alt={blog.title}
                      className="w-12 h-10 object-cover rounded-md bg-slate-200 shrink-0"
                      onError={(e) => {
                        e.currentTarget.src = '/home-page-image/gurukul.png';
                      }}
                    />
                    <div>
                      <div className="font-bold text-slate-900 text-sm line-clamp-1">
                        {blog.title}
                      </div>
                      <div className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                        {blog.excerpt || 'No excerpt provided'}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1 text-slate-700">
                      <User size={12} className="text-slate-400" />
                      {blog.author || 'Sahast Foundation'}
                    </span>
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1 text-slate-700">
                      <Calendar size={12} className="text-slate-400" />
                      {blog.date || 'October 2026'}
                    </span>
                  </td>
                  <td className="py-4 px-4 font-mono text-[11px] text-slate-500 whitespace-nowrap">
                    /{blog.slug || 'article'}
                  </td>
                  <td className="py-4 px-6 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        type="button"
                        onClick={() => openEditModal(blog)}
                        className="p-1.5 text-slate-600 hover:text-amber-600 hover:bg-white rounded transition-colors"
                        title="Edit Article"
                      >
                        <Edit2 size={15} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(blog)}
                        className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-white rounded transition-colors"
                        title="Delete Article"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Editor Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-100 max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="font-bold text-slate-900 text-base">
                {editingItem ? 'Edit Article' : 'Write New Article'}
              </h3>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="text-slate-400 hover:text-slate-700"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <FormInput
                label="Article Title"
                value={form.title}
                onChange={handleTitleChange}
                placeholder="e.g. Meditation and Spiritual Practices for Youth"
                required
              />

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <FormInput
                  label="Author"
                  value={form.author}
                  onChange={(val) => setForm({ ...form, author: val })}
                  placeholder="Sahast Foundation"
                />
                <FormInput
                  label="Publication Date"
                  value={form.date}
                  onChange={(val) => setForm({ ...form, date: val })}
                  placeholder="October 2026"
                />
                <FormInput
                  label="URL Slug"
                  value={form.slug}
                  onChange={(val) => setForm({ ...form, slug: val })}
                  placeholder="article-slug"
                />
              </div>

              <FormTextarea
                label="Brief Summary / Excerpt"
                value={form.excerpt}
                onChange={(val) => setForm({ ...form, excerpt: val })}
                rows={2}
                placeholder="1-2 sentences shown on homepage card..."
              />

              {/* Rich Text Editor for full article body */}
              <RichTextEditor
                label="Full Article Content"
                value={form.content}
                onChange={(val) => setForm({ ...form, content: val })}
                rows={7}
                placeholder="Detailed article body, discourses, bullet points, and quotes..."
              />

              <ImageUploader
                label="Article Thumbnail Image"
                value={form.imageUrl}
                onChange={(url) => setForm({ ...form, imageUrl: url })}
                folder="blog_thumbnails"
              />

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 text-xs font-bold text-white bg-amber-600 hover:bg-amber-700 rounded-lg shadow-sm inline-flex items-center gap-1.5"
                >
                  {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
                  <span>{saving ? 'Publishing...' : 'Save Article'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
