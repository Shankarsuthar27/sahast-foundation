import React, { useState } from 'react';
import {
  UploadCloud,
  Images,
  Trash2,
  Edit2,
  Eye,
  CheckCircle2,
  X,
  Search,
  Filter,
  AlertCircle,
  Sparkles,
  Plus,
  Save,
  Check,
  Star
} from 'lucide-react';
import { useCms } from '../../../context/CmsContext';
import { uploadImageToStorage } from '../../../firebase/services';

const CATEGORIES = ['Darshan', 'Pravachan', 'Gau Seva', 'Gurukul'];

export default function GalleryManager() {
  const { galleryList, addGalleryPhoto, bulkAddPhotos, updateGalleryPhoto, deleteGalleryPhoto, toggleGalleryFeatured } = useCms();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [lightboxImage, setLightboxImage] = useState(null);
  const [editingPhoto, setEditingPhoto] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  // Bulk Upload states
  const [isDropActive, setIsDropActive] = useState(false);
  const [uploadCategory, setUploadCategory] = useState('Darshan');
  const [uploadQueue, setUploadQueue] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  // Filter photos
  const filteredPhotos = galleryList.filter((item) => {
    const matchesCat =
      selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch =
      !searchQuery.trim() ||
      item.title?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  // Handle file drop / input
  const handleFilesSelected = async (filesList) => {
    const files = Array.from(filesList).filter((f) => f.type.startsWith('image/'));
    if (!files.length) return;

    setIsUploading(true);
    const queue = files.map((file, idx) => ({
      id: `${Date.now()}_${idx}`,
      file,
      name: file.name,
      progress: 0,
      status: 'pending' // 'pending', 'uploading', 'done', 'error'
    }));
    setUploadQueue(queue);

    const newlyCreated = [];

    for (let i = 0; i < queue.length; i++) {
      const current = queue[i];
      current.status = 'uploading';
      setUploadQueue([...queue]);

      try {
        const downloadUrl = await uploadImageToStorage(
          current.file,
          'gallery',
          (prog) => {
            current.progress = prog;
            setUploadQueue([...queue]);
          }
        );

        const photoMeta = {
          title: current.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '),
          url: downloadUrl,
          category: uploadCategory,
          createdAt: Date.now(),
          featured: false
        };

        const created = await addGalleryPhoto(photoMeta);
        newlyCreated.push(created);
        current.status = 'done';
        current.progress = 100;
        setUploadQueue([...queue]);
      } catch (err) {
        console.error('Upload failed for', current.name, err);
        current.status = 'error';
        setUploadQueue([...queue]);
      }
    }

    setIsUploading(false);
    setTimeout(() => {
      setUploadQueue([]);
    }, 4000);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDropActive(false);
    if (e.dataTransfer.files) {
      handleFilesSelected(e.dataTransfer.files);
    }
  };

  const handleDelete = async (id) => {
    await deleteGalleryPhoto(id);
    setDeleteConfirmId(null);
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    if (!editingPhoto) return;
    await updateGalleryPhoto(editingPhoto.id, {
      title: editingPhoto.title,
      category: editingPhoto.category
    });
    setEditingPhoto(null);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
              Photo Darshan Gallery Manager
            </h2>
            <span className="px-2.5 py-0.5 text-xs font-bold bg-amber-100 text-amber-800 rounded-full">
              {galleryList.length} Photos
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Batch upload darshan photos to Firebase Cloud Storage bucket <code className="text-orange-700 bg-orange-50 px-1 py-0.5 rounded font-mono">gallery/</code> and organize categories.
          </p>
        </div>

        {/* Target Category for Upload */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-600">Upload as:</span>
          <select
            value={uploadCategory}
            onChange={(e) => setUploadCategory(e.target.value)}
            className="px-3 py-2 text-xs font-bold bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:border-[#0f382c]"
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 1. Bulk Dropzone */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDropActive(true);
        }}
        onDragLeave={() => setIsDropActive(false)}
        onDrop={handleDrop}
        className={`bg-white rounded-3xl p-8 border-2 border-dashed transition-all text-center relative overflow-hidden ${
          isDropActive
            ? 'border-orange-500 bg-orange-50/50 shadow-inner scale-[0.99]'
            : 'border-slate-300 hover:border-slate-400 bg-slate-50/50'
        }`}
      >
        <div className="max-w-md mx-auto space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center mx-auto shadow-xs">
            <UploadCloud size={28} />
          </div>
          <h3 className="text-sm font-bold text-slate-800">
            Drag & Drop Batch Photos Here, or Browse
          </h3>
          <p className="text-xs text-slate-500">
            Multi-file upload automatically optimizes, uploads directly to Firebase Storage bucket <code className="font-mono text-orange-700">gallery/</code>, and creates Firestore documents.
          </p>

          <label className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white font-bold text-xs rounded-xl shadow-lg shadow-orange-600/25 transition-all cursor-pointer">
            <Plus size={15} />
            <span>Select Multiple Images</span>
            <input
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFilesSelected(e.target.files)}
            />
          </label>
        </div>
      </div>

      {/* Upload Progress Queue */}
      {uploadQueue.length > 0 && (
        <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700">
            <span>Uploading Batch ({uploadQueue.filter((q) => q.status === 'done').length}/{uploadQueue.length})</span>
            {isUploading && <span className="text-orange-600 animate-pulse">Syncing to Firebase...</span>}
          </div>

          <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
            {uploadQueue.map((item) => (
              <div key={item.id} className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/80 text-xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-800 truncate max-w-xs">{item.name}</span>
                  <span className="font-mono text-[11px] text-slate-500">{item.progress}%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                  <div
                    className={`h-full transition-all duration-200 ${
                      item.status === 'done' ? 'bg-emerald-500' : 'bg-orange-600'
                    }`}
                    style={{ width: `${item.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. Gallery Filter & Search Header */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search photo titles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#0f382c] transition-all"
          />
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 p-1 rounded-xl text-xs font-bold">
          {['All', ...CATEGORIES].map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Responsive Gallery Cards Grid */}
      {filteredPhotos.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {filteredPhotos.map((photo) => (
            <div
              key={photo.id}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-md transition-all group relative flex flex-col"
            >
              {/* Image Preview Box */}
              <div className="relative aspect-square bg-slate-100 overflow-hidden cursor-pointer" onClick={() => setLightboxImage(photo)}>
                <img
                  src={photo.url}
                  alt={photo.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Category Pill */}
                <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-black/60 text-white text-[10px] font-bold backdrop-blur-xs">
                  {photo.category}
                </span>

                {/* Homepage Featured Star */}
                {photo.featured && (
                  <span className="absolute top-2.5 right-2.5 w-6 h-6 rounded-full bg-orange-600 text-white flex items-center justify-center text-xs shadow-md">
                    ★
                  </span>
                )}

                {/* Hover Action Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setLightboxImage(photo);
                    }}
                    className="p-2 rounded-xl bg-white text-slate-800 hover:bg-orange-50 hover:text-orange-600 shadow-md transition-colors"
                    title="Fullscreen Lightbox"
                  >
                    <Eye size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditingPhoto(photo);
                    }}
                    className="p-2 rounded-xl bg-white text-slate-800 hover:bg-emerald-50 hover:text-emerald-700 shadow-md transition-colors"
                    title="Edit Metadata"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setDeleteConfirmId(photo.id);
                    }}
                    className="p-2 rounded-xl bg-white text-slate-800 hover:bg-red-50 hover:text-red-600 shadow-md transition-colors"
                    title="Delete Photo"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              {/* Bottom Card Strip */}
              <div className="p-3 flex items-center justify-between gap-2 border-t border-slate-100">
                <span className="text-xs font-bold text-slate-800 truncate" title={photo.title}>
                  {photo.title}
                </span>

                <button
                  type="button"
                  onClick={() => toggleGalleryFeatured(photo.id)}
                  title={photo.featured ? 'Featured on Homepage strip' : 'Click to feature on Homepage'}
                  className={`p-1 rounded text-xs transition-colors cursor-pointer ${
                    photo.featured ? 'text-orange-600 font-bold' : 'text-slate-300 hover:text-slate-500'
                  }`}
                >
                  <Star size={15} fill={photo.featured ? 'currentColor' : 'none'} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
          <Images size={36} className="text-slate-300 mx-auto mb-3" />
          <h3 className="text-sm font-bold text-slate-700">No photos in this category</h3>
          <p className="text-xs text-slate-400 mt-1">
            Drop photos into the upload box above to populate the gallery.
          </p>
        </div>
      )}

      {/* Edit Photo Metadata Modal */}
      {editingPhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-slate-100 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h3 className="text-sm font-bold text-slate-900">Edit Photo Metadata</h3>
              <button
                type="button"
                onClick={() => setEditingPhoto(null)}
                className="p-1 text-slate-400 hover:text-slate-700"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Photo Title</label>
                <input
                  type="text"
                  value={editingPhoto.title || ''}
                  onChange={(e) => setEditingPhoto({ ...editingPhoto, title: e.target.value })}
                  required
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0f382c]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Category</label>
                <select
                  value={editingPhoto.category || 'Darshan'}
                  onChange={(e) => setEditingPhoto({ ...editingPhoto, category: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0f382c]"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingPhoto(null)}
                  className="px-3 py-1.5 text-xs font-bold text-slate-600 bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs font-bold text-white bg-orange-600 hover:bg-orange-700 rounded-lg shadow-sm"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-slate-100 text-center space-y-4">
            <div className="w-12 h-12 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center mx-auto">
              <AlertCircle size={24} />
            </div>
            <h3 className="text-base font-bold text-slate-900">Delete Photo?</h3>
            <p className="text-xs text-slate-500">
              Are you sure you want to permanently delete this photo from the darshan gallery?
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleDelete(deleteConfirmId)}
                className="px-4 py-2 text-xs font-bold text-white bg-red-600 hover:bg-red-700 rounded-xl shadow-md"
              >
                Delete Photo
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div
          onClick={() => setLightboxImage(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-4xl max-h-[90vh] bg-slate-950 rounded-3xl overflow-hidden shadow-2xl border border-white/10 flex flex-col"
          >
            <div className="p-4 flex items-center justify-between text-white border-b border-white/10">
              <div>
                <h4 className="text-sm font-bold">{lightboxImage.title}</h4>
                <span className="text-[11px] text-orange-400">{lightboxImage.category}</span>
              </div>
              <button
                type="button"
                onClick={() => setLightboxImage(null)}
                className="p-1 text-slate-400 hover:text-white rounded-lg"
              >
                <X size={20} />
              </button>
            </div>
            <div className="flex-1 overflow-hidden p-2 flex items-center justify-center">
              <img
                src={lightboxImage.url}
                alt={lightboxImage.title}
                className="max-w-full max-h-[75vh] object-contain rounded-xl"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
