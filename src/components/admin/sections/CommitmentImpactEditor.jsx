import React, { useState, useEffect } from 'react';
import { Save, Loader2, CheckCircle2, RotateCcw, Plus, Trash2 } from 'lucide-react';
import { FormInput, FormTextarea } from '../FormInput';
import ImageUploader from '../ImageUploader';
import { getDocumentData, saveDocumentData } from '../../../firebase/services';
import { INITIAL_DATABASE_SEED } from '../../../firebase/schema';

export default function CommitmentImpactEditor() {
  const [activeTab, setActiveTab] = useState('commitment'); // 'commitment' | 'impact'
  const [commitment, setCommitment] = useState(INITIAL_DATABASE_SEED.commitment_section);
  const [impact, setImpact] = useState(INITIAL_DATABASE_SEED.impact_stats);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  // New counter draft
  const [newStatLabel, setNewStatLabel] = useState('');
  const [newStatValue, setNewStatValue] = useState('');

  useEffect(() => {
    async function load() {
      setLoading(true);
      const [cRes, iRes] = await Promise.all([
        getDocumentData('commitment_section'),
        getDocumentData('impact_stats')
      ]);
      if (cRes) setCommitment(cRes);
      if (iRes) setImpact(iRes);
      setLoading(false);
    }
    load();
  }, []);

  const handleSaveCommitment = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await saveDocumentData('commitment_section', commitment);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2500);
    } catch (err) {
      alert('Error saving Commitment section: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleSaveImpact = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await saveDocumentData('impact_stats', impact);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2500);
    } catch (err) {
      alert('Error saving Impact Stats: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleAddCounter = () => {
    if (!newStatLabel.trim() || !newStatValue.trim()) return;
    const counters = Array.isArray(impact.counters) ? [...impact.counters] : [];
    counters.push({
      id: `stat-${Date.now()}`,
      label: newStatLabel.trim(),
      value: newStatValue.trim()
    });
    setImpact({ ...impact, counters });
    setNewStatLabel('');
    setNewStatValue('');
  };

  const handleRemoveCounter = (index) => {
    const counters = [...(impact.counters || [])];
    counters.splice(index, 1);
    setImpact({ ...impact, counters });
  };

  const handleCounterChange = (index, field, val) => {
    const counters = [...(impact.counters || [])];
    counters[index] = { ...counters[index], [field]: val };
    setImpact({ ...impact, counters });
  };

  if (loading) {
    return (
      <div className="p-12 text-center text-slate-500 flex items-center justify-center gap-2">
        <Loader2 size={20} className="animate-spin text-amber-600" />
        <span>Loading section data...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Switcher */}
      <div className="flex bg-white p-1.5 rounded-xl border border-slate-200 shadow-xs max-w-md">
        <button
          type="button"
          onClick={() => setActiveTab('commitment')}
          className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
            activeTab === 'commitment'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Commitment (1,00,000+ Stat)
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('impact')}
          className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
            activeTab === 'impact'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Impact Stats & Video
        </button>
      </div>

      {success && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs flex items-center gap-2">
          <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
          <span className="font-medium">Data saved successfully to Firestore!</span>
        </div>
      )}

      {/* 1. Commitment Section Editor */}
      {activeTab === 'commitment' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Commitment Section (commitment_section)
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Edit the highlighted &apos;1,00,000+&apos; counter, discourse quote, and Maharaj Ji visual.
              </p>
            </div>
            <button
              type="button"
              onClick={handleSaveCommitment}
              disabled={saving}
              className="px-4 py-2 text-xs font-bold text-white bg-amber-600 hover:bg-amber-700 rounded-lg shadow-sm transition-all inline-flex items-center gap-1.5 disabled:opacity-70"
            >
              {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
              <span>{saving ? 'Saving...' : 'Save Commitment'}</span>
            </button>
          </div>

          <form onSubmit={handleSaveCommitment} className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormInput
                label="Section Badge"
                value={commitment.badge || ''}
                onChange={(val) => setCommitment({ ...commitment, badge: val })}
              />
              <FormInput
                label="Main Section Title"
                value={commitment.title || ''}
                onChange={(val) => setCommitment({ ...commitment, title: val })}
                required
              />
            </div>

            <FormTextarea
              label="Description Text"
              value={commitment.description || ''}
              onChange={(val) => setCommitment({ ...commitment, description: val })}
              rows={3}
            />

            {/* Highlighted Statistic Box */}
            <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-xl grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput
                label="Main Numeric Stat (e.g. 1,00,000+)"
                value={commitment.mainStatValue || ''}
                onChange={(val) => setCommitment({ ...commitment, mainStatValue: val })}
                required
              />
              <FormInput
                label="Stat Caption / Label"
                value={commitment.mainStatLabel || ''}
                onChange={(val) => setCommitment({ ...commitment, mainStatLabel: val })}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 border-t border-slate-100">
              <div className="space-y-4">
                <FormTextarea
                  label="Discourse Quote"
                  value={commitment.quoteText || ''}
                  onChange={(val) => setCommitment({ ...commitment, quoteText: val })}
                  rows={3}
                />
                <FormInput
                  label="Quote Author"
                  value={commitment.quoteAuthor || ''}
                  onChange={(val) => setCommitment({ ...commitment, quoteAuthor: val })}
                />
              </div>

              <div>
                <ImageUploader
                  label="Featured Maharaj Ji Portrait / Seva Photo"
                  value={commitment.mainImageUrl || ''}
                  onChange={(url) => setCommitment({ ...commitment, mainImageUrl: url })}
                  folder="commitment_images"
                />
              </div>
            </div>
          </form>
        </div>
      )}

      {/* 2. Impact Stats & Video Editor */}
      {activeTab === 'impact' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Impact Stats & Video (impact_stats)
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Update the 4 numeric counters array (Children Educated, Meals Served, etc.) and YouTube video.
              </p>
            </div>
            <button
              type="button"
              onClick={handleSaveImpact}
              disabled={saving}
              className="px-4 py-2 text-xs font-bold text-white bg-amber-600 hover:bg-amber-700 rounded-lg shadow-sm transition-all inline-flex items-center gap-1.5 disabled:opacity-70"
            >
              {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
              <span>{saving ? 'Saving...' : 'Save Impact'}</span>
            </button>
          </div>

          <form onSubmit={handleSaveImpact} className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormInput
                label="Section Badge"
                value={impact.badge || ''}
                onChange={(val) => setImpact({ ...impact, badge: val })}
              />
              <FormInput
                label="Section Title"
                value={impact.title || ''}
                onChange={(val) => setImpact({ ...impact, title: val })}
                required
              />
            </div>

            <FormTextarea
              label="Description Text"
              value={impact.description || ''}
              onChange={(val) => setImpact({ ...impact, description: val })}
              rows={2}
            />

            {/* Video Controls */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput
                label="YouTube Embed / Video URL"
                value={impact.videoUrl || ''}
                onChange={(val) => setImpact({ ...impact, videoUrl: val })}
                placeholder="https://www.youtube.com/embed/..."
              />
              <ImageUploader
                label="Video Thumbnail Image"
                value={impact.videoThumbnail || ''}
                onChange={(url) => setImpact({ ...impact, videoThumbnail: url })}
                folder="video_thumbs"
              />
            </div>

            {/* Dynamic Numeric Counters Array */}
            <div className="pt-2 border-t border-slate-100 space-y-3">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-semibold text-slate-700">
                  Numeric Counters (Array of Objects)
                </label>
                <span className="text-xs text-slate-400">
                  {impact.counters?.length || 0} Counters Configured
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {(impact.counters || []).map((cnt, idx) => (
                  <div
                    key={cnt.id || idx}
                    className="p-3 bg-white border border-slate-200 rounded-xl flex items-center justify-between gap-3 shadow-xs"
                  >
                    <div className="flex-1 space-y-1.5">
                      <input
                        type="text"
                        value={cnt.value}
                        onChange={(e) => handleCounterChange(idx, 'value', e.target.value)}
                        placeholder="Value (e.g. 25,000+)"
                        className="w-full text-base font-bold text-amber-700 border-b border-dashed border-slate-300 pb-0.5 focus:outline-none"
                      />
                      <input
                        type="text"
                        value={cnt.label}
                        onChange={(e) => handleCounterChange(idx, 'label', e.target.value)}
                        placeholder="Label (e.g. Active Volunteers)"
                        className="w-full text-xs text-slate-600 focus:outline-none"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveCounter(idx)}
                      className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Remove Counter"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>

              {/* Add New Counter Bar */}
              <div className="p-3 bg-slate-50 border border-dashed border-slate-300 rounded-xl flex flex-wrap items-center gap-3">
                <input
                  type="text"
                  value={newStatValue}
                  onChange={(e) => setNewStatValue(e.target.value)}
                  placeholder="Stat Number (e.g. 10,000+)"
                  className="px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg flex-1 min-w-[120px]"
                />
                <input
                  type="text"
                  value={newStatLabel}
                  onChange={(e) => setNewStatLabel(e.target.value)}
                  placeholder="Stat Description (e.g. Tree Plantations)"
                  className="px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg flex-2 min-w-[180px]"
                />
                <button
                  type="button"
                  onClick={handleAddCounter}
                  className="px-3 py-1.5 text-xs font-bold bg-slate-800 hover:bg-slate-900 text-white rounded-lg inline-flex items-center gap-1 transition-colors"
                >
                  <Plus size={14} /> Add Counter
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
