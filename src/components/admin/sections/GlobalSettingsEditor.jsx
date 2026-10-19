import React, { useState, useEffect } from 'react';
import { Save, Loader2, CheckCircle2, RotateCcw } from 'lucide-react';
import { FormInput, FormTextarea } from '../FormInput';
import { getDocumentData, saveDocumentData } from '../../../firebase/services';
import { INITIAL_DATABASE_SEED } from '../../../firebase/schema';

export default function GlobalSettingsEditor() {
  const [data, setData] = useState(INITIAL_DATABASE_SEED.site_settings);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const res = await getDocumentData('site_settings');
      if (res) setData(res);
      setLoading(false);
    }
    load();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await saveDocumentData('site_settings', data);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2500);
    } catch (err) {
      alert('Error saving settings: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleSocialChange = (key, val) => {
    setData((prev) => ({
      ...prev,
      socials: {
        ...(prev.socials || {}),
        [key]: val
      }
    }));
  };

  if (loading) {
    return (
      <div className="p-12 text-center text-slate-500 flex items-center justify-center gap-2">
        <Loader2 size={20} className="animate-spin text-amber-600" />
        <span>Loading global site settings...</span>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900">
            Global Site Settings (site_settings)
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Configure contact coordinates, footer text, newsletter call-to-action, and social media handles.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setData(INITIAL_DATABASE_SEED.site_settings)}
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
            <span>{saving ? 'Saving...' : 'Save Settings'}</span>
          </button>
        </div>
      </div>

      {success && (
        <div className="m-6 mb-0 p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs flex items-center gap-2">
          <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
          <span className="font-medium">Site settings updated in Firestore!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="p-6 space-y-6">
        {/* Basic Brand Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormInput
            label="Organization Name"
            value={data.siteName || ''}
            onChange={(val) => setData({ ...data, siteName: val })}
            required
          />
          <FormInput
            label="Tagline / Motto"
            value={data.tagline || ''}
            onChange={(val) => setData({ ...data, tagline: val })}
          />
          <FormInput
            label="Spiritual Patron"
            value={data.patronName || ''}
            onChange={(val) => setData({ ...data, patronName: val })}
          />
        </div>

        {/* Contact Coordinates */}
        <div className="pt-2 border-t border-slate-100">
          <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">
            Contact Coordinates (Phone, Email, Physical Address)
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <FormInput
              label="Official Email Address"
              value={data.email || ''}
              onChange={(val) => setData({ ...data, email: val })}
              placeholder="info@sahastfoundation.in"
              required
            />
            <FormInput
              label="Official Phone / WhatsApp"
              value={data.phone || ''}
              onChange={(val) => setData({ ...data, phone: val })}
              placeholder="+91 8696298489"
              required
            />
          </div>
          <FormTextarea
            label="Ashram & Foundation Address (Map info)"
            value={data.address || ''}
            onChange={(val) => setData({ ...data, address: val })}
            rows={2}
            placeholder="Shri Bharat Mata Statue Site, Shri Guru Puram Ashram, Takhatgarh, Pali"
          />
        </div>

        {/* Social Media Links */}
        <div className="pt-2 border-t border-slate-100">
          <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">
            Official Social Media Handles
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormInput
              label="Facebook URL"
              value={data.socials?.facebook || ''}
              onChange={(val) => handleSocialChange('facebook', val)}
              placeholder="https://facebook.com/..."
            />
            <FormInput
              label="Twitter / X URL"
              value={data.socials?.twitter || ''}
              onChange={(val) => handleSocialChange('twitter', val)}
              placeholder="https://x.com/..."
            />
            <FormInput
              label="Instagram URL"
              value={data.socials?.instagram || ''}
              onChange={(val) => handleSocialChange('instagram', val)}
              placeholder="https://instagram.com/..."
            />
            <FormInput
              label="YouTube Channel URL"
              value={data.socials?.youtube || ''}
              onChange={(val) => handleSocialChange('youtube', val)}
              placeholder="https://youtube.com/@..."
            />
          </div>
        </div>

        {/* Newsletter & Footer */}
        <div className="pt-2 border-t border-slate-100">
          <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">
            Newsletter & Footer Disclaimers
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <FormInput
              label="Newsletter Title"
              value={data.newsletterTitle || ''}
              onChange={(val) => setData({ ...data, newsletterTitle: val })}
            />
            <FormInput
              label="Footer Tax Exemption Notice"
              value={data.footerNotice || ''}
              onChange={(val) => setData({ ...data, footerNotice: val })}
            />
          </div>
          <FormTextarea
            label="Newsletter Description"
            value={data.newsletterSubtitle || ''}
            onChange={(val) => setData({ ...data, newsletterSubtitle: val })}
            rows={2}
          />
        </div>
      </form>
    </div>
  );
}
