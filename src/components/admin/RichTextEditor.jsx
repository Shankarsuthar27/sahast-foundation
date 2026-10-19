import React, { useState } from 'react';
import { Bold, Italic, Heading2, Heading3, List, Quote, Eye, Edit3, Link2 } from 'lucide-react';

export default function RichTextEditor({
  label = 'Content',
  value = '',
  onChange,
  placeholder = 'Write content here...',
  rows = 8
}) {
  const [isPreview, setIsPreview] = useState(false);

  const insertTag = (before, after = '') => {
    const textarea = document.getElementById('rich-editor-area');
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = value.substring(start, end);
    const replacement = `${before}${selected || 'text'}${after}`;

    const newValue = value.substring(0, start) + replacement + value.substring(end);
    onChange(newValue);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, start + before.length + (selected ? selected.length : 4));
    }, 50);
  };

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-semibold text-slate-700">
          {label}
        </label>
        <button
          type="button"
          onClick={() => setIsPreview(!isPreview)}
          className="text-xs font-semibold px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 inline-flex items-center gap-1 transition-colors"
        >
          {isPreview ? <Edit3 size={13} /> : <Eye size={13} />}
          {isPreview ? 'Switch to Edit' : 'Preview Output'}
        </button>
      </div>

      <div className="border border-slate-300 rounded-lg overflow-hidden bg-white shadow-sm focus-within:ring-2 focus-within:ring-amber-500/20 focus-within:border-amber-500 transition-all">
        {/* Formatting Toolbar */}
        {!isPreview && (
          <div className="flex flex-wrap items-center gap-1 px-3 py-2 bg-slate-50 border-b border-slate-200 text-slate-700">
            <button
              type="button"
              onClick={() => insertTag('**', '**')}
              title="Bold"
              className="p-1.5 rounded hover:bg-slate-200 hover:text-slate-900 transition-colors"
            >
              <Bold size={15} />
            </button>
            <button
              type="button"
              onClick={() => insertTag('*', '*')}
              title="Italic"
              className="p-1.5 rounded hover:bg-slate-200 hover:text-slate-900 transition-colors"
            >
              <Italic size={15} />
            </button>
            <span className="w-px h-4 bg-slate-300 mx-1" />
            <button
              type="button"
              onClick={() => insertTag('\n## ', '\n')}
              title="Heading 2"
              className="p-1.5 rounded hover:bg-slate-200 hover:text-slate-900 transition-colors"
            >
              <Heading2 size={15} />
            </button>
            <button
              type="button"
              onClick={() => insertTag('\n### ', '\n')}
              title="Heading 3"
              className="p-1.5 rounded hover:bg-slate-200 hover:text-slate-900 transition-colors"
            >
              <Heading3 size={15} />
            </button>
            <span className="w-px h-4 bg-slate-300 mx-1" />
            <button
              type="button"
              onClick={() => insertTag('\n- ')}
              title="Bullet List"
              className="p-1.5 rounded hover:bg-slate-200 hover:text-slate-900 transition-colors"
            >
              <List size={15} />
            </button>
            <button
              type="button"
              onClick={() => insertTag('\n> ')}
              title="Blockquote"
              className="p-1.5 rounded hover:bg-slate-200 hover:text-slate-900 transition-colors"
            >
              <Quote size={15} />
            </button>
            <button
              type="button"
              onClick={() => insertTag('[', '](https://)')}
              title="Add Link"
              className="p-1.5 rounded hover:bg-slate-200 hover:text-slate-900 transition-colors"
            >
              <Link2 size={15} />
            </button>
          </div>
        )}

        {/* Editor or Preview Pane */}
        {isPreview ? (
          <div className="p-4 min-h-[180px] prose prose-sm max-w-none text-slate-800 bg-white">
            {value ? (
              <div
                dangerouslySetInnerHTML={{
                  __html: value
                    .replace(/\n\n/g, '<br/><br/>')
                    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                    .replace(/\*(.*?)\*/g, '<em>$1</em>')
                    .replace(/## (.*?)\n/g, '<h2 class="text-lg font-bold text-slate-900 my-2">$1</h2>')
                    .replace(/### (.*?)\n/g, '<h3 class="text-base font-semibold text-slate-900 my-1">$1</h3>')
                    .replace(/- (.*?)\n/g, '<li class="ml-4 list-disc">$1</li>')
                    .replace(/> (.*?)\n/g, '<blockquote class="border-l-4 border-amber-400 pl-3 italic my-2 text-slate-600">$1</blockquote>')
                }}
              />
            ) : (
              <p className="text-slate-400 italic">No content to preview.</p>
            )}
          </div>
        ) : (
          <textarea
            id="rich-editor-area"
            rows={rows}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full p-3.5 text-sm font-sans bg-white text-slate-800 placeholder-slate-400 focus:outline-none resize-y"
          />
        )}
      </div>
    </div>
  );
}
