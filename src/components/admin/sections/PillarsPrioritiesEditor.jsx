import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Loader2, Save, X, ExternalLink } from 'lucide-react';
import { FormInput, FormTextarea } from '../FormInput';
import ImageUploader from '../ImageUploader';
import {
  getCollectionItems,
  addCollectionItem,
  updateCollectionItem,
  deleteCollectionItem
} from '../../../firebase/services';

export default function PillarsPrioritiesEditor() {
  const [activeSubTab, setActiveSubTab] = useState('pillars'); // 'pillars' | 'priorities'
  const [pillars, setPillars] = useState([]);
  const [priorities, setPriorities] = useState([]);
  const [loading, setLoading] = useState(true);

  // Edit/Create Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [modalForm, setModalForm] = useState({
    title: '',
    description: '',
    imageUrl: '',
    link: '',
    number: '01'
  });
  const [savingItem, setSavingItem] = useState(false);

  const loadData = async () => {
    setLoading(true);
    const [pList, prList] = await Promise.all([
      getCollectionItems('pillars'),
      getCollectionItems('priorities')
    ]);
    setPillars(pList);
    setPriorities(prList);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const openCreateModal = () => {
    setEditingItem(null);
    setModalForm({
      title: '',
      description: '',
      imageUrl: '',
      link: '/',
      number: `0${(activeSubTab === 'pillars' ? pillars.length : priorities.length) + 1}`
    });
    setModalOpen(true);
  };

  const openEditModal = (item) => {
    setEditingItem(item);
    setModalForm({
      title: item.title || '',
      description: item.description || '',
      imageUrl: item.imageUrl || '',
      link: item.link || '/',
      number: item.number || '01'
    });
    setModalOpen(true);
  };

  const handleSaveModal = async (e) => {
    e.preventDefault();
    setSavingItem(true);
    const targetCollection = activeSubTab === 'pillars' ? 'pillars' : 'priorities';

    try {
      if (editingItem) {
        await updateCollectionItem(targetCollection, editingItem.id, modalForm);
      } else {
        await addCollectionItem(targetCollection, modalForm);
      }
      setModalOpen(false);
      await loadData();
    } catch (err) {
      alert('Error saving item: ' + err.message);
    } finally {
      setSavingItem(false);
    }
  };

  const handleDelete = async (item) => {
    if (!confirm(`Are you sure you want to delete "${item.title}"?`)) return;
    const targetCollection = activeSubTab === 'pillars' ? 'pillars' : 'priorities';
    try {
      await deleteCollectionItem(targetCollection, item.id);
      await loadData();
    } catch (err) {
      alert('Error deleting item: ' + err.message);
    }
  };

  const currentList = activeSubTab === 'pillars' ? pillars : priorities;

  return (
    <div className="space-y-6">
      {/* Tab Switcher */}
      <div className="flex bg-white p-1.5 rounded-xl border border-slate-200 shadow-xs max-w-md">
        <button
          type="button"
          onClick={() => setActiveSubTab('pillars')}
          className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
            activeSubTab === 'pillars'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Three Pillars Cards ({pillars.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveSubTab('priorities')}
          className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
            activeSubTab === 'priorities'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Our Priorities ({priorities.length})
        </button>
      </div>

      {/* Main Card Container */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Top Header */}
        <div className="p-6 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              {activeSubTab === 'pillars' ? 'Pillars Collection (pillars)' : 'Priorities Collection (priorities)'}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {activeSubTab === 'pillars'
                ? 'Manage the 3 main circular badge feature cards displayed prominently on the homepage.'
                : 'Manage the 4 strategic priority cards guiding Sahast Foundation missions.'}
            </p>
          </div>
          <button
            type="button"
            onClick={openCreateModal}
            className="px-4 py-2 text-xs font-bold text-white bg-amber-600 hover:bg-amber-700 rounded-lg shadow-sm transition-all inline-flex items-center gap-1.5"
          >
            <Plus size={15} />
            <span>Add New Card</span>
          </button>
        </div>

        {/* List Content */}
        {loading ? (
          <div className="p-12 text-center text-slate-500 flex items-center justify-center gap-2">
            <Loader2 size={20} className="animate-spin text-amber-600" />
            <span>Loading items from Firestore...</span>
          </div>
        ) : currentList.length === 0 ? (
          <div className="p-12 text-center text-slate-400">
            No items found. Click &quot;Add New Card&quot; to create one.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {currentList.map((item) => (
              <div
                key={item.id}
                className="border border-slate-200 rounded-xl overflow-hidden bg-slate-50 flex flex-col hover:shadow-md transition-shadow"
              >
                <div className="h-44 relative bg-slate-200">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = '/home-page-image/gurukul.png';
                    }}
                  />
                  {item.number && (
                    <span className="absolute top-3 left-3 w-8 h-8 rounded-full bg-red-600 text-white font-bold text-xs flex items-center justify-center shadow">
                      {item.number}
                    </span>
                  )}
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm line-clamp-1 mb-1">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-3">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400 truncate max-w-[120px]">
                      {item.link || '#'}
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => openEditModal(item)}
                        className="p-1.5 text-slate-600 hover:text-amber-600 hover:bg-white rounded transition-colors"
                        title="Edit Item"
                      >
                        <Edit2 size={15} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(item)}
                        className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-white rounded transition-colors"
                        title="Delete Item"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Edit / Add Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
              <h3 className="font-bold text-slate-900 text-base">
                {editingItem ? 'Edit Item' : 'Add New Item'}
              </h3>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="text-slate-400 hover:text-slate-700"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="space-y-4">
              {activeSubTab === 'pillars' && (
                <FormInput
                  label="Badge Number (e.g. 01, 02)"
                  value={modalForm.number}
                  onChange={(val) => setModalForm({ ...modalForm, number: val })}
                />
              )}

              <FormInput
                label="Card Title"
                value={modalForm.title}
                onChange={(val) => setModalForm({ ...modalForm, title: val })}
                required
              />

              <FormTextarea
                label="Description"
                value={modalForm.description}
                onChange={(val) => setModalForm({ ...modalForm, description: val })}
                rows={3}
                required
              />

              <FormInput
                label="Redirect Link URL"
                value={modalForm.link}
                onChange={(val) => setModalForm({ ...modalForm, link: val })}
                placeholder="/about or #donate"
              />

              <ImageUploader
                label="Card Photography"
                value={modalForm.imageUrl}
                onChange={(url) => setModalForm({ ...modalForm, imageUrl: url })}
                folder="card_images"
              />

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingItem}
                  className="px-5 py-2 text-xs font-bold text-white bg-amber-600 hover:bg-amber-700 rounded-lg shadow-sm transition-all inline-flex items-center gap-1.5"
                >
                  {savingItem ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
                  <span>{savingItem ? 'Saving...' : 'Save Card'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
