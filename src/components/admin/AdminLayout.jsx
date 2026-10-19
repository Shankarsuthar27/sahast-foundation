import React, { useState } from 'react';
import {
  LayoutGrid,
  SlidersHorizontal,
  Newspaper,
  Calendar,
  Image as ImageIcon,
  Globe,
  LogOut,
  Menu,
  X,
  MoreHorizontal,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  RefreshCw
} from 'lucide-react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { useCms } from '../../context/CmsContext';
import AdminLogin from './AdminLogin';

export const ADMIN_NAV_ITEMS = [
  {
    id: 'dashboard',
    route: '/admin/dashboard',
    label: 'Dashboard',
    icon: LayoutGrid
  },
  {
    id: 'homepage',
    route: '/admin/homepage',
    label: 'Homepage CMS',
    icon: SlidersHorizontal
  },
  {
    id: 'news',
    route: '/admin/news',
    label: 'News & Press',
    icon: Newspaper
  },
  {
    id: 'events',
    route: '/admin/events',
    label: 'Events & Yatras',
    icon: Calendar
  },
  {
    id: 'gallery',
    route: '/admin/gallery',
    label: 'Photo Gallery',
    icon: ImageIcon
  }
];

export default function AdminLayout({
  activeSubRoute,
  onNavigateSubRoute,
  onViewLiveSite,
  children
}) {
  const { user, loading, logout, isAuthenticated } = useAdminAuth();
  const { isSyncLive, isSaving } = useCms();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // 1. Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center p-6 text-slate-700 text-center">
        <div className="w-12 h-12 rounded-2xl bg-white shadow-md border border-slate-200 flex items-center justify-center mb-4">
          <RefreshCw size={24} className="text-sky-600 animate-spin" />
        </div>
        <h2 className="text-base font-bold text-slate-800">Loading Shree Abhaydas Portal...</h2>
      </div>
    );
  }

  // 2. Auth Guard: If unauthenticated, show AdminLogin
  if (!isAuthenticated) {
    return <AdminLogin onCancel={onViewLiveSite} />;
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] flex font-sans antialiased text-slate-800 selection:bg-sky-100 selection:text-sky-900">
      {/* Mobile Backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-900/40 z-40 lg:hidden backdrop-blur-xs transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200/80 flex flex-col justify-between transition-transform duration-200 ease-in-out lg:static lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div>
          {/* Sidebar Top Branding */}
          <div className="h-16 px-6 flex items-center justify-between border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-slate-900 text-white font-extrabold flex items-center justify-center text-xs tracking-wider shadow-sm">
                SA
              </div>
              <div>
                <div className="font-bold text-slate-900 text-sm leading-tight">
                  Shree Abhaydas
                </div>
                <div className="text-[11px] text-slate-400 font-medium">
                  Admin Portal
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1.5 text-slate-400 hover:text-slate-700"
            >
              <X size={18} />
            </button>
          </div>

          {/* Navigation Items */}
          <div className="p-4 space-y-6">
            <div>
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-3 mb-2.5">
                NAVIGATION
              </div>

              <nav className="space-y-1">
                {ADMIN_NAV_ITEMS.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeSubRoute === item.id;

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        onNavigateSubRoute(item.id);
                        setSidebarOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer text-left ${
                        isActive
                          ? 'bg-[#edf5fd] text-slate-900 font-bold'
                          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                      }`}
                    >
                      <Icon
                        size={17}
                        className={isActive ? 'text-sky-600' : 'text-slate-400'}
                      />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>
        </div>

        {/* Sidebar Bottom Controls */}
        <div className="p-4 border-t border-slate-100 space-y-2">
          <button
            type="button"
            onClick={onViewLiveSite}
            className="w-full flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-slate-200 transition-colors cursor-pointer"
          >
            <Globe size={15} className="text-slate-400" />
            <span>Public Website</span>
          </button>

          <button
            type="button"
            onClick={logout}
            className="w-full flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-red-600 hover:bg-red-50/50 border border-slate-200 transition-colors cursor-pointer"
          >
            <LogOut size={15} className="text-slate-400" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Body */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-slate-200/80 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30 shadow-2xs">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
              aria-label="Open sidebar"
            >
              <Menu size={20} />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-slate-900 text-white font-bold flex items-center justify-center text-[11px] shadow-xs">
                SA
              </div>
              <div>
                <div className="font-bold text-slate-900 text-xs sm:text-sm leading-none">
                  Shree Abhayadas
                </div>
                <div className="text-[10px] sm:text-[11px] text-slate-400 font-medium leading-none mt-1">
                  Admin portal
                </div>
              </div>
            </div>
          </div>

          {/* Right Header Status & Menu */}
          <div className="flex items-center gap-3 relative">
            {/* Green Online Dot */}
            <div className="flex items-center gap-1.5" title="System Online & Synchronized">
              <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-xs" />
            </div>

            {/* Three Dots Menu Button */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setMenuOpen(!menuOpen)}
                className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                aria-label="Options"
              >
                <MoreHorizontal size={20} />
              </button>

              {menuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50 text-xs font-medium text-slate-700">
                  <div className="px-3.5 py-1.5 border-b border-slate-100 text-[11px] text-slate-400">
                    Logged in as <strong>{user?.username || 'admin2233'}</strong>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setMenuOpen(false);
                      onNavigateSubRoute('homepage');
                    }}
                    className="w-full text-left px-3.5 py-2 hover:bg-slate-50 flex items-center gap-2"
                  >
                    <SlidersHorizontal size={14} className="text-slate-400" />
                    <span>Homepage CMS</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setMenuOpen(false);
                      onViewLiveSite();
                    }}
                    className="w-full text-left px-3.5 py-2 hover:bg-slate-50 flex items-center gap-2"
                  >
                    <ExternalLink size={14} className="text-slate-400" />
                    <span>View Public Site</span>
                  </button>
                  <div className="h-px bg-slate-100 my-1" />
                  <button
                    type="button"
                    onClick={() => {
                      setMenuOpen(false);
                      logout();
                    }}
                    className="w-full text-left px-3.5 py-2 hover:bg-red-50 text-red-600 flex items-center gap-2"
                  >
                    <LogOut size={14} />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content Viewport */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-8 bg-[#f8fafc]">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
