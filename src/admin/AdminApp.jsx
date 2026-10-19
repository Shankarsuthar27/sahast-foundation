import React, { useState, useEffect } from 'react';
import AdminLayout from '../components/admin/AdminLayout';
import DashboardHome from '../components/admin/sections/DashboardHome';
import HomepageEditor from '../components/admin/sections/HomepageEditor';
import NewsManager from '../components/admin/sections/NewsManager';
import EventsManager from '../components/admin/sections/EventsManager';
import GalleryManager from '../components/admin/sections/GalleryManager';

// Parse initial subroute from window.location.pathname
function getInitialSubRoute() {
  if (typeof window === 'undefined') return 'dashboard';
  const path = window.location.pathname.toLowerCase();
  if (path.includes('/homepage')) return 'homepage';
  if (path.includes('/news')) return 'news';
  if (path.includes('/events') || path.includes('/event')) return 'events';
  if (path.includes('/gallery')) return 'gallery';
  return 'dashboard';
}

export default function AdminApp({ onNavigateHome, subRoute }) {
  const [activeSubRoute, setActiveSubRoute] = useState(() => subRoute || getInitialSubRoute());

  // Listen to popstate when browser back/forward buttons are clicked
  useEffect(() => {
    const handlePopState = () => {
      const nextSubRoute = getInitialSubRoute();
      setActiveSubRoute(nextSubRoute);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Update browser URL and state
  const handleNavigateSubRoute = (subRouteId) => {
    setActiveSubRoute(subRouteId);
    const targetPath = `/admin/${subRouteId}`;
    if (window.location.pathname !== targetPath) {
      window.history.pushState({ view: 'admin', subRoute: subRouteId }, '', targetPath);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AdminLayout
      activeSubRoute={activeSubRoute}
      onNavigateSubRoute={handleNavigateSubRoute}
      onViewLiveSite={onNavigateHome}
    >
      {activeSubRoute === 'dashboard' && (
        <DashboardHome
          onNavigateSubRoute={handleNavigateSubRoute}
          onViewLiveSite={onNavigateHome}
          onOpenNewArticle={() => handleNavigateSubRoute('news')}
          onOpenNewEvent={() => handleNavigateSubRoute('events')}
          onOpenUploader={() => handleNavigateSubRoute('gallery')}
        />
      )}

      {activeSubRoute === 'homepage' && (
        <HomepageEditor onViewLiveSite={onNavigateHome} />
      )}

      {activeSubRoute === 'news' && (
        <NewsManager />
      )}

      {activeSubRoute === 'events' && (
        <EventsManager />
      )}

      {activeSubRoute === 'gallery' && (
        <GalleryManager />
      )}
    </AdminLayout>
  );
}
