import React, { useState, useEffect } from 'react';
import { Save, Loader2, CheckCircle2, RotateCcw } from 'lucide-react';
import { FormInput, FormTextarea } from '../FormInput';
import ImageUploader from '../ImageUploader';
import { getDocumentData, saveDocumentData } from '../../../firebase/services';
import { INITIAL_DATABASE_SEED } from '../../../firebase/schema';

export default function HeroEditor() {
  const [data, setData] = useState(INITIAL_DATABASE_SEED.homepage_hero);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const res = await getDocumentData('homepage_hero');
      if (res) setData(res);
      setLoading(false);
    }
    load();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await saveDocumentData('homepage_hero', data);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2500);
    } catch (err) {
      alert('Error saving Hero section: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleResetToDefault = () => {
    if (confirm('Reset Hero Section to default values?')) {
      setData(INITIAL_DATABASE_SEED.homepage_hero);
    }
  };

  if (loading) {
    return (
      <div className="p-12 text-center text-slate-500 flex items-center justify-center gap-2">
        <Loader2 size={20} className="animate-spin text-amber-600" />
        <span>Loading Hero Section data...</span>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Hero Section (homepage_hero)</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage the top banner heading, subtitle, buttons, and prominent hero photography.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleResetToDefault}
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
          <span className="font-medium">Hero section updated successfully in Firestore!</span>
        </div>
      )}

      {/* Form Content */}
      <form onSubmit={handleSave} className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormInput
            label="Top Tagline / Badge"
            value={data.badge || ''}
            onChange={(val) => setData({ ...data, badge: val })}
            placeholder="e.g. HUMANITY & DEVOTION"
          />

          <FormInput
            label="Floating Stat Badge Text"
            value={data.statBadgeText || ''}
            onChange={(val) => setData({ ...data, statBadgeText: val })}
            placeholder="e.g. 25+ Years of Dedicated Seva"
          />
        </div>

        <FormInput
          label="Main Heading"
          value={data.mainHeading || ''}
          onChange={(val) => setData({ ...data, mainHeading: val })}
          placeholder="Main banner headline"
          required
        />

        <FormTextarea
          label="Subheading Description"
          value={data.subheading || ''}
          onChange={(val) => setData({ ...data, subheading: val })}
          placeholder="Introductory paragraph under heading"
          rows={3}
          required
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 border-t border-slate-100">
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Primary Action Button
            </h4>
            <FormInput
              label="Button Text"
              value={data.primaryButtonText || ''}
              onChange={(val) => setData({ ...data, primaryButtonText: val })}
              placeholder="e.g. Donate Now"
            />
            <FormInput
              label="Button Link / Anchor"
              value={data.primaryButtonLink || ''}
              onChange={(val) => setData({ ...data, primaryButtonLink: val })}
              placeholder="e.g. #donate"
            />
          </div>

          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Secondary Action Button
            </h4>
            <FormInput
              label="Button Text"
              value={data.secondaryButtonText || ''}
              onChange={(val) => setData({ ...data, secondaryButtonText: val })}
              placeholder="e.g. Become Volunteer"
            />
            <FormInput
              label="Button Link / Anchor"
              value={data.secondaryButtonLink || ''}
              onChange={(val) => setData({ ...data, secondaryButtonLink: val })}
              placeholder="e.g. #volunteer"
            />
          </div>
        </div>

        {/* Media */}
        <div className="pt-2 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-6">
          <ImageUploader
            label="Main Hero Image (Maharaj Ji Portrait)"
            value={data.heroImage || ''}
            onChange={(url) => setData({ ...data, heroImage: url })}
            folder="hero_images"
            helperText="Suggested: Portrait / Transparant background JPG/PNG"
          />

          <ImageUploader
            label="Background Watermark / Badge Image"
            value={data.bgBadgeImage || ''}
            onChange={(url) => setData({ ...data, bgBadgeImage: url })}
            folder="hero_images"
            helperText="Suggested: Sahast Foundation Emblem / Logo"
          />
        </div>
      </form>
    </div>
  );
}
