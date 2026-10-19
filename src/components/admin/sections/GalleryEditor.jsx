import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2, Loader2, Save, X, Image as ImageIcon } from 'lucide-react';
import { FormInput, FormTextarea } from '../FormInput';
import ImageUploader from '../ImageUploader';
import {
  getCollectionItems,
  addCollectionItem,
  updateCollectionItem,
  deleteCollectionItem
} from '../../../firebase/services';

export default function GalleryEditor() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [form, setForm] = useState({ title: '', caption: '', imageUrl: '' });
  const [saving, setSaving] = useState(false);

  const loadData = async () => {
    setLoading(true);
    const data = await getCollectionItems('gurukul_gallery');
    setItems(data);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const openCreateModal = () => {
    setEditingItem(null);
    setForm({ title: '', caption: '', imageUrl: '' });
    setModalOpen(true);
  };

  const openEditModal = (item) => {
    setEditingItem(item);
    setForm({
      title: item.title || '',
      caption: item.caption || '',
      imageUrl: item.imageUrl || ''
    });
    setModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!form.imageUrl) {
      alert('Please upload or provide an image URL for the gallery slide.');
      return;
    }
    setSaving(true);
    try {
      if (editingItem) {
        await updateCollectionItem('gurukul_gallery', editingItem.id, form);
      } else {
        await addCollectionItem('gurukul_gallery', form);
      }
      setModalOpen(false);
      await loadData();
    } catch (err) {
      alert('Error saving gallery item: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (item) => {
    if (!confirm(`Delete image "${item.title || 'Untitled'}" from Gurukul carousel?`)) return;
    try {
      await deleteCollectionItem('gurukul_gallery', item.id);
      await loadData();
    } catch (err) {
      alert('Error deleting gallery item: ' + err.message);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900">
            Gurukul Gallery Slider (gurukul_gallery)
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage photo slides and captions featured in the &quot;Have a Look at Our Gurukul&quot; carousel.
          </p>
        </div>
        <button
          type="button"
          onClick={openCreateModal}
          className="px-4 py-2 text-xs font-bold text-white bg-amber-600 hover:bg-amber-700 rounded-lg shadow-sm transition-all inline-flex items-center gap-1.5"
        >
          <Plus size={15} />
          <span>Add New Photo</span>
        </button>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="p-12 text-center text-slate-500 flex items-center justify-center gap-2">
          <Loader2 size={20} className="animate-spin text-amber-600" />
          <span>Loading gallery slides...</span>
        </div>
      ) : items.length === 0 ? (
        <div className="p-12 text-center text-slate-400">
          No photos found. Click &quot;Add New Photo&quot; to upload your first slide.
        </div>
      ) : (
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="group border border-slate-200 rounded-xl overflow-hidden bg-slate-50 hover:shadow-md transition-shadow flex flex-col"
            >
              <div className="relative h-48 bg-slate-200">
                <img
                  src={item.imageUrl}
                  alt={item.title || 'Gallery'}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = '/home-page-image/gurukul.png';
                  }}
                />
                <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => openEditModal(item)}
                    className="p-2 bg-white text-slate-800 rounded-lg shadow hover:bg-slate-100 transition-colors"
                    title="Edit Photo"
                  >
                    <Edit2 size={15} />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(item)}
                    className="p-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition-colors"
                    title="Delete Photo"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>

              <div className="p-3.5 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-slate-900 text-sm truncate">
                    {item.title || 'Untitled Photo'}
                  </h4>
                  {item.caption && (
                    <p className="text-xs text-slate-500 line-clamp-2 mt-1">
                      {item.caption}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="font-bold text-slate-900 text-base">
                {editingItem ? 'Edit Gallery Photo' : 'Upload Gallery Photo'}
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
                label="Photo Title / Label"
                value={form.title}
                onChange={(val) => setForm({ ...form, title: val })}
                placeholder="e.g. Gurukul Classrooms & Learning"
              />

              <FormTextarea
                label="Caption / Description (Optional)"
                value={form.caption}
                onChange={(val) => setForm({ ...form, caption: val })}
                placeholder="Brief note about the picture..."
                rows={2}
              />

              <ImageUploader
                label="Image File"
                value={form.imageUrl}
                onChange={(url) => setForm({ ...form, imageUrl: url })}
                folder="gallery_photos"
              />

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
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
                  <span>{saving ? 'Saving...' : 'Save Photo'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
