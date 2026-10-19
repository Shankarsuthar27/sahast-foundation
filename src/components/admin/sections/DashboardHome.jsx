import React from 'react';
import {
  FileText,
  Calendar,
  Image as ImageIcon,
  ArrowRight,
  SlidersHorizontal,
  PenTool,
  UploadCloud,
  Database,
  Key,
  ShieldCheck,
  User
} from 'lucide-react';
import { useCms } from '../../../context/CmsContext';
import { firebaseConfig } from '../../../firebase/config';

export default function DashboardHome({
  onNavigateSubRoute,
  onOpenNewArticle,
  onOpenNewEvent,
  onOpenUploader
}) {
  const { newsList, eventsList, galleryList } = useCms();

  return (
    <div className="space-y-8">
      {/* Page Title & Subtitle */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Dashboard
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Overview and quick management of portal content and media.
        </p>
      </div>

      {/* Top 3 Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* News Stat Card */}
        <div
          onClick={() => onNavigateSubRoute('news')}
          className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-2xs hover:shadow-xs transition-all cursor-pointer flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-600">
                <FileText size={19} />
              </div>
              <span className="px-2.5 py-1 text-[11px] font-semibold text-slate-600 bg-slate-50 rounded-lg border border-slate-100">
                News
              </span>
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-1">
              {newsList.length}
            </div>
            <div className="text-xs font-medium text-slate-500">
              Published Articles
            </div>
          </div>
          <div className="mt-5 pt-3 border-t border-slate-50 flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-sky-600">
            <span>Manage articles</span>
            <ArrowRight size={14} />
          </div>
        </div>

        {/* Events Stat Card */}
        <div
          onClick={() => onNavigateSubRoute('events')}
          className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-2xs hover:shadow-xs transition-all cursor-pointer flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-600">
                <Calendar size={19} />
              </div>
              <span className="px-2.5 py-1 text-[11px] font-semibold text-slate-600 bg-slate-50 rounded-lg border border-slate-100">
                Events
              </span>
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-1">
              {eventsList.length}
            </div>
            <div className="text-xs font-medium text-slate-500">
              Scheduled Yatras & Events
            </div>
          </div>
          <div className="mt-5 pt-3 border-t border-slate-50 flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-sky-600">
            <span>Manage events</span>
            <ArrowRight size={14} />
          </div>
        </div>

        {/* Gallery Stat Card */}
        <div
          onClick={() => onNavigateSubRoute('gallery')}
          className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-2xs hover:shadow-xs transition-all cursor-pointer flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-600">
                <ImageIcon size={19} />
              </div>
              <span className="px-2.5 py-1 text-[11px] font-semibold text-slate-600 bg-slate-50 rounded-lg border border-slate-100">
                Gallery
              </span>
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-1">
              {galleryList.length}
            </div>
            <div className="text-xs font-medium text-slate-500">
              Uploaded Photos
            </div>
          </div>
          <div className="mt-5 pt-3 border-t border-slate-50 flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-sky-600">
            <span>Manage photos</span>
            <ArrowRight size={14} />
          </div>
        </div>
      </div>

      {/* Main Grid: Quick Actions (Left) and System Status (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Left Column: Quick Actions */}
        <div className="space-y-4">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Quick Actions
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Create and manage content with one click
            </p>
          </div>

          <div className="space-y-3">
            {/* Action 1: Homepage CMS (Highlighted with left orange bar) */}
            <div
              onClick={() => onNavigateSubRoute('homepage')}
              className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-2xs hover:border-orange-300 transition-all cursor-pointer flex items-center justify-between relative overflow-hidden group"
            >
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-orange-500 rounded-l-2xl" />
              <div className="flex items-center gap-3.5 pl-2">
                <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
                  <SlidersHorizontal size={18} />
                </div>
                <div>
                  <div className="font-bold text-slate-900 text-xs sm:text-sm group-hover:text-orange-600 transition-colors">
                    Homepage CMS (All 12 Sections)
                  </div>
                  <div className="text-[11px] sm:text-xs text-slate-500 mt-0.5">
                    Edit hero, kathas, donations, gallery, footer & more
                  </div>
                </div>
              </div>
              <ArrowRight size={16} className="text-slate-400 group-hover:text-slate-700 transition-transform group-hover:translate-x-0.5 shrink-0" />
            </div>

            {/* Action 2: Write New Article */}
            <div
              onClick={() => {
                if (onOpenNewArticle) onOpenNewArticle();
                else onNavigateSubRoute('news');
              }}
              className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-2xs hover:border-slate-300 transition-all cursor-pointer flex items-center justify-between group"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-slate-50 text-slate-600 flex items-center justify-center shrink-0">
                  <PenTool size={18} />
                </div>
                <div>
                  <div className="font-bold text-slate-900 text-xs sm:text-sm group-hover:text-sky-600 transition-colors">
                    Write New Article
                  </div>
                  <div className="text-[11px] sm:text-xs text-slate-500 mt-0.5">
                    Add headline, rich story content, and cover image
                  </div>
                </div>
              </div>
              <ArrowRight size={16} className="text-slate-400 group-hover:text-slate-700 transition-transform group-hover:translate-x-0.5 shrink-0" />
            </div>

            {/* Action 3: Schedule Event */}
            <div
              onClick={() => {
                if (onOpenNewEvent) onOpenNewEvent();
                else onNavigateSubRoute('events');
              }}
              className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-2xs hover:border-slate-300 transition-all cursor-pointer flex items-center justify-between group"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-slate-50 text-slate-600 flex items-center justify-center shrink-0">
                  <Calendar size={18} />
                </div>
                <div>
                  <div className="font-bold text-slate-900 text-xs sm:text-sm group-hover:text-sky-600 transition-colors">
                    Schedule Event
                  </div>
                  <div className="text-[11px] sm:text-xs text-slate-500 mt-0.5">
                    Set date, location, venue, and descriptions
                  </div>
                </div>
              </div>
              <ArrowRight size={16} className="text-slate-400 group-hover:text-slate-700 transition-transform group-hover:translate-x-0.5 shrink-0" />
            </div>

            {/* Action 4: Upload Gallery Media */}
            <div
              onClick={() => {
                if (onOpenUploader) onOpenUploader();
                else onNavigateSubRoute('gallery');
              }}
              className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-2xs hover:border-slate-300 transition-all cursor-pointer flex items-center justify-between group"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-slate-50 text-slate-600 flex items-center justify-center shrink-0">
                  <UploadCloud size={18} />
                </div>
                <div>
                  <div className="font-bold text-slate-900 text-xs sm:text-sm group-hover:text-sky-600 transition-colors">
                    Upload Gallery Media
                  </div>
                  <div className="text-[11px] sm:text-xs text-slate-500 mt-0.5">
                    Add photos to Firebase Storage CDN
                  </div>
                </div>
              </div>
              <ArrowRight size={16} className="text-slate-400 group-hover:text-slate-700 transition-transform group-hover:translate-x-0.5 shrink-0" />
            </div>
          </div>
        </div>

        {/* Right Column: System Status */}
        <div className="space-y-4">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              System Status
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Firebase cloud infrastructure details
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-2xs space-y-5">
            {/* Database Row */}
            <div className="flex items-center justify-between py-2 border-b border-slate-100">
              <div className="flex items-center gap-2.5 text-xs text-slate-600">
                <Database size={16} className="text-slate-400" />
                <span>Database</span>
              </div>
              <div className="font-mono text-xs font-semibold text-slate-800">
                Firestore (NoSQL)
              </div>
            </div>

            {/* Project ID Row */}
            <div className="flex items-center justify-between py-2 border-b border-slate-100">
              <div className="flex items-center gap-2.5 text-xs text-slate-600">
                <Key size={16} className="text-slate-400" />
                <span>Project ID</span>
              </div>
              <div className="font-mono text-xs text-slate-700">
                {firebaseConfig.projectId || 'sahast-foundation'}
              </div>
            </div>

            {/* Access Row */}
            <div className="flex items-center justify-between py-2 border-b border-slate-100">
              <div className="flex items-center gap-2.5 text-xs text-slate-600">
                <ShieldCheck size={16} className="text-slate-400" />
                <span>Access</span>
              </div>
              <div>
                <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200/80 rounded-md text-[11px] font-bold">
                  Administrator
                </span>
              </div>
            </div>

            {/* Admin User Row */}
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-2.5 text-xs text-slate-600">
                <User size={16} className="text-slate-400" />
                <span>Admin User</span>
              </div>
              <div className="font-mono text-xs font-bold text-slate-900">
                admin2233
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
