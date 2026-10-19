import React, { useState, useEffect } from 'react';
import { Save, Loader2, CheckCircle2, RotateCcw, Plus, Trash2 } from 'lucide-react';
import { FormInput } from '../FormInput';
import RichTextEditor from '../RichTextEditor';
import ImageUploader from '../ImageUploader';
import { getDocumentData, saveDocumentData } from '../../../firebase/services';
import { INITIAL_DATABASE_SEED } from '../../../firebase/schema';

export default function AboutEditor() {
  const [data, setData] = useState(INITIAL_DATABASE_SEED.homepage_about);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [newBullet, setNewBullet] = useState('');

  useEffect(() => {
    async function load() {
      setLoading(true);
      const res = await getDocumentData('homepage_about');
      if (res) setData(res);
      setLoading(false);
    }
    load();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await saveDocumentData('homepage_about', data);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2500);
    } catch (err) {
      alert('Error saving About section: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleAddBullet = () => {
    if (!newBullet.trim()) return;
    const bullets = Array.isArray(data.bulletPoints) ? [...data.bulletPoints] : [];
    bullets.push(newBullet.trim());
    setData({ ...data, bulletPoints: bullets });
    setNewBullet('');
  };

  const handleRemoveBullet = (index) => {
    const bullets = [...(data.bulletPoints || [])];
    bullets.splice(index, 1);
    setData({ ...data, bulletPoints: bullets });
  };

  const handleBulletChange = (index, value) => {
    const bullets = [...(data.bulletPoints || [])];
    bullets[index] = value;
    setData({ ...data, bulletPoints: bullets });
  };

  if (loading) {
    return (
      <div className="p-12 text-center text-slate-500 flex items-center justify-center gap-2">
        <Loader2 size={20} className="animate-spin text-amber-600" />
        <span>Loading About Us section data...</span>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900">About Section (homepage_about)</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Configure the Serving Humanity narrative, bullet points list, and side photography.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setData(INITIAL_DATABASE_SEED.homepage_about)}
            className="px-3 py-2 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors inline-flex items-center gap-1.5"
          >
            <RotateCcw size={13} />
            <span>Reset</span>
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="px-4 py-2 text-xs font-bold text-white bg-amber-600 hover:bg-amber-700 rounded-lg shadow-sm transition-all inline-flex items-center gap-1.5 disabled:opacity-70"
          >
            {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
            <span>{saving ? 'Saving...' : 'Save Changes'}</span>
          </button>
        </div>
      </div>

      {success && (
        <div className="m-6 mb-0 p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs flex items-center gap-2">
          <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
          <span className="font-medium">About section saved to Firestore!</span>
        </div>
      )}

      {/* Form Content */}
      <form onSubmit={handleSave} className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormInput
            label="Section Top Badge"
            value={data.sectionBadge || ''}
            onChange={(val) => setData({ ...data, sectionBadge: val })}
            placeholder="e.g. SERVING HUMANITY IS SERVING GOD"
          />

          <FormInput
            label="Section Main Title"
            value={data.sectionTitle || ''}
            onChange={(val) => setData({ ...data, sectionTitle: val })}
            placeholder="e.g. Transforming Lives Through Spiritual Wisdom & Seva"
            required
          />
        </div>

        {/* WYSIWYG / Rich Content for Main Paragraph */}
        <RichTextEditor
          label="Main Narrative Paragraph"
          value={data.mainParagraph || ''}
          onChange={(val) => setData({ ...data, mainParagraph: val })}
          rows={5}
        />

        {/* Dynamic Bullet Points List */}
        <div className="pt-2 border-t border-slate-100 space-y-3">
          <label className="block text-sm font-semibold text-slate-700">
            Key Highlights / Bullet Points (Array)
          </label>
          <div className="space-y-2">
            {(data.bulletPoints || []).map((bullet, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 text-xs font-bold flex items-center justify-center shrink-0">
                  {idx + 1}
                </span>
                <input
                  type="text"
                  value={bullet}
                  onChange={(e) => handleBulletChange(idx, e.target.value)}
                  className="flex-1 px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveBullet(idx)}
                  className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 pt-1">
            <input
              type="text"
              value={newBullet}
              onChange={(e) => setNewBullet(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddBullet();
                }
              }}
              placeholder="Add another highlight bullet point..."
              className="flex-1 px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
            <button
              type="button"
              onClick={handleAddBullet}
              className="px-3.5 py-2 text-xs font-bold bg-slate-800 hover:bg-slate-900 text-white rounded-lg inline-flex items-center gap-1.5 transition-colors"
            >
              <Plus size={14} /> Add Bullet
            </button>
          </div>
        </div>

        {/* Button Links & Side Image */}
        <div className="pt-2 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Call to Action Buttons
            </h4>
            <FormInput
              label="Explore Button Label"
              value={data.exploreButtonText || ''}
              onChange={(val) => setData({ ...data, exploreButtonText: val })}
              placeholder="Read More About Us"
            />
            <FormInput
              label="Explore Button Link"
              value={data.exploreButtonLink || ''}
              onChange={(val) => setData({ ...data, exploreButtonLink: val })}
              placeholder="/about"
            />
            <FormInput
              label="Support Button Label"
              value={data.supportButtonText || ''}
              onChange={(val) => setData({ ...data, supportButtonText: val })}
              placeholder="Support Our Mission"
            />
            <FormInput
              label="Support Button Link"
              value={data.supportButtonLink || ''}
              onChange={(val) => setData({ ...data, supportButtonLink: val })}
              placeholder="#donate"
            />
          </div>

          <div>
            <ImageUploader
              label="Side Visual Photography"
              value={data.sideImage || ''}
              onChange={(url) => setData({ ...data, sideImage: url })}
              folder="about_images"
              helperText="Photo showing Pujya Maharaj Ji / Seva activities"
            />
          </div>
        </div>
      </form>
    </div>
  );
}
