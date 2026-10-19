import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2, Loader2, Save, X } from 'lucide-react';
import { FormInput, FormTextarea } from '../FormInput';
import {
  getCollectionItems,
  addCollectionItem,
  updateCollectionItem,
  deleteCollectionItem
} from '../../../firebase/services';

export default function WorkflowEditor() {
  const [steps, setSteps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [form, setForm] = useState({ stepNumber: '01', title: '', description: '' });
  const [saving, setSaving] = useState(false);

  const loadData = async () => {
    setLoading(true);
    const data = await getCollectionItems('workflow_steps');
    setSteps(data);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const openCreateModal = () => {
    setEditingItem(null);
    setForm({
      stepNumber: `0${steps.length + 1}`,
      title: '',
      description: ''
    });
    setModalOpen(true);
  };

  const openEditModal = (item) => {
    setEditingItem(item);
    setForm({
      stepNumber: item.stepNumber || '01',
      title: item.title || '',
      description: item.description || ''
    });
    setModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingItem) {
        await updateCollectionItem('workflow_steps', editingItem.id, form);
      } else {
        await addCollectionItem('workflow_steps', form);
      }
      setModalOpen(false);
      await loadData();
    } catch (err) {
      alert('Error saving workflow step: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (item) => {
    if (!confirm(`Delete step "${item.title}"?`)) return;
    try {
      await deleteCollectionItem('workflow_steps', item.id);
      await loadData();
    } catch (err) {
      alert('Error deleting step: ' + err.message);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900">
            &quot;How We Work&quot; Steps (workflow_steps)
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage the sequential action steps explaining the Sahast Foundation humanitarian process.
          </p>
        </div>
        <button
          type="button"
          onClick={openCreateModal}
          className="px-4 py-2 text-xs font-bold text-white bg-amber-600 hover:bg-amber-700 rounded-lg shadow-sm transition-all inline-flex items-center gap-1.5"
        >
          <Plus size={15} />
          <span>Add New Step</span>
        </button>
      </div>

      {/* Steps List */}
      {loading ? (
        <div className="p-12 text-center text-slate-500 flex items-center justify-center gap-2">
          <Loader2 size={20} className="animate-spin text-amber-600" />
          <span>Loading workflow steps...</span>
        </div>
      ) : steps.length === 0 ? (
        <div className="p-12 text-center text-slate-400">
          No steps found. Click &quot;Add New Step&quot; to create one.
        </div>
      ) : (
        <div className="p-6 divide-y divide-slate-100">
          {steps.map((step) => (
            <div
              key={step.id}
              className="py-4 first:pt-0 last:pb-0 flex items-start justify-between gap-4"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 font-extrabold text-base flex items-center justify-center shrink-0 border border-amber-200">
                  {step.stepNumber}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm mb-1">
                    {step.title}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed max-w-2xl">
                    {step.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                <button
                  type="button"
                  onClick={() => openEditModal(step)}
                  className="p-2 text-slate-500 hover:text-amber-600 hover:bg-slate-50 rounded-lg transition-colors"
                  title="Edit Step"
                >
                  <Edit2 size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(step)}
                  className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Delete Step"
                >
                  <Trash2 size={16} />
                </button>
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
                {editingItem ? 'Edit Step' : 'Add Workflow Step'}
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
                label="Step Number (e.g. 01, 02)"
                value={form.stepNumber}
                onChange={(val) => setForm({ ...form, stepNumber: val })}
                required
              />

              <FormInput
                label="Step Title"
                value={form.title}
                onChange={(val) => setForm({ ...form, title: val })}
                required
              />

              <FormTextarea
                label="Detailed Description"
                value={form.description}
                onChange={(val) => setForm({ ...form, description: val })}
                rows={3}
                required
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
                  <span>{saving ? 'Saving...' : 'Save Step'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
