import React, { useState, useRef } from 'react';
import { UploadCloud, X, Check, Image as ImageIcon, Loader2, Link2 } from 'lucide-react';
import { uploadImageToStorage } from '../../firebase/services';

export default function ImageUploader({
  label = 'Upload Image',
  value = '',
  onChange,
  folder = 'homepage_images',
  helperText = 'Recommended format: JPG, PNG, WEBP (Max 5MB)'
}) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [customUrl, setCustomUrl] = useState('');
  const fileInputRef = useRef(null);

  const handleFileSelect = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file (PNG, JPG, WEBP).');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('File size exceeds 5MB limit.');
      return;
    }

    setError('');
    setUploading(true);
    setProgress(0);

    try {
      const downloadUrl = await uploadImageToStorage(file, folder, (percent) => {
        setProgress(percent);
      });
      onChange(downloadUrl);
    } catch (err) {
      console.error('Upload failed:', err);
      setError('Upload failed. Please check your network or Firebase rules.');
    } finally {
      setUploading(false);
      setProgress(0);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const fakeEvent = { target: { files: [file] } };
      handleFileSelect(fakeEvent);
    }
  };

  const handleApplyCustomUrl = (e) => {
    e.preventDefault();
    if (customUrl.trim()) {
      onChange(customUrl.trim());
      setCustomUrl('');
      setShowUrlInput(false);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-semibold text-slate-700">
          {label}
        </label>
        <button
          type="button"
          onClick={() => setShowUrlInput(!showUrlInput)}
          className="text-xs text-amber-700 hover:text-amber-800 font-medium inline-flex items-center gap-1 transition-colors"
        >
          <Link2 size={13} />
          {showUrlInput ? 'Hide URL input' : 'Paste Image URL'}
        </button>
      </div>

      {showUrlInput && (
        <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-lg flex items-center gap-2">
          <input
            type="text"
            value={customUrl}
            onChange={(e) => setCustomUrl(e.target.value)}
            placeholder="e.g. /home-page-image/guruji.jpeg or https://..."
            className="flex-1 px-3 py-1.5 text-xs bg-white border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-amber-500"
          />
          <button
            type="button"
            onClick={handleApplyCustomUrl}
            className="px-3 py-1.5 text-xs font-semibold bg-amber-600 hover:bg-amber-700 text-white rounded transition-colors"
          >
            Apply
          </button>
        </div>
      )}

      {/* Image Preview Box if Value exists */}
      {value ? (
        <div className="relative group border border-slate-200 rounded-xl overflow-hidden bg-slate-50 flex items-center justify-center p-2 max-h-64">
          <img
            src={value}
            alt={label}
            className="max-h-56 w-auto object-contain rounded-lg shadow-sm"
            onError={(e) => {
              e.currentTarget.src = '/home-page-image/sahast-foundation-logo.png';
            }}
          />
          <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-3 py-1.5 text-xs font-medium bg-white text-slate-800 rounded-lg shadow hover:bg-slate-100 transition-colors"
            >
              Replace
            </button>
            <button
              type="button"
              onClick={() => onChange('')}
              className="px-3 py-1.5 text-xs font-medium bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition-colors flex items-center gap-1"
            >
              <X size={14} /> Remove
            </button>
          </div>
        </div>
      ) : (
        /* Dropzone Box */
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all ${
            uploading
              ? 'border-amber-400 bg-amber-50/40'
              : 'border-slate-300 hover:border-amber-500 hover:bg-slate-50'
          }`}
        >
          {uploading ? (
            <div className="space-y-3">
              <Loader2 size={32} className="mx-auto text-amber-600 animate-spin" />
              <div className="text-sm font-medium text-slate-700">
                Uploading to Firebase Storage ({progress}%)...
              </div>
              <div className="w-48 h-2 bg-slate-200 rounded-full mx-auto overflow-hidden">
                <div
                  className="h-full bg-amber-500 transition-all duration-200"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mx-auto">
                <UploadCloud size={24} />
              </div>
              <div className="text-sm font-semibold text-slate-700">
                Click to upload <span className="font-normal text-slate-500">or drag and drop</span>
              </div>
              <p className="text-xs text-slate-500">{helperText}</p>
            </div>
          )}
        </div>
      )}

      {error && <p className="text-xs text-red-600 font-medium">{error}</p>}

      {/* Hidden native input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  );
}
