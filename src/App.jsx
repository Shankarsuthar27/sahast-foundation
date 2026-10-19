import React, { useState, useEffect } from 'react';
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import HeroBanner from './components/HeroBanner';
import ServingHumanity from './components/ServingHumanity';
import PillarCards from './components/PillarCards';
import CommitmentSection from './components/CommitmentSection';
import PrioritiesSection from './components/PrioritiesSection';
import ImpactVideoSection from './components/ImpactVideoSection';
import GurukulCarousel from './components/GurukulCarousel';
import HowWeWorkSection from './components/HowWeWorkSection';
import LatestBlogsSection from './components/LatestBlogsSection';
import ContactSection from './components/ContactSection';
import AboutPage from './components/AboutPage';
import GalleryPage from './components/GalleryPage';
import EventsPage from './components/EventsPage';
import ContactPage from './components/ContactPage';
import BlogDetailPage from './components/BlogDetailPage';
import MeditationBlogPage from './components/MeditationBlogPage';
import GurukulBlogPage from './components/GurukulBlogPage';
import AdminApp from './admin/AdminApp';
import Footer from './components/Footer';
import {
  DonationModal,
  VideoPlayerModal,
  LightboxModal,
  VolunteerModal,
  SearchModal
} from './components/Modals';

function parseLocation() {
  if (typeof window === 'undefined') return { view: 'home', hash: '' };

  const path = window.location.pathname.toLowerCase().replace(/\/+$/, '');
  const hash = window.location.hash.toLowerCase();

  // Admin / Login Panel view
  if (
    hash === '#admin' ||
    hash === '#admin-panel' ||
    hash === '#wp-admin' ||
    hash === '#login' ||
    hash === '#wp-login' ||
    hash === '#wp-login.php' ||
    path === '/admin' ||
    path === '/wp-admin' ||
    path === '/login' ||
    path === '/wp-login' ||
    path === '/wp-login.php' ||
    path === '/admin-panel' ||
    path === '/cms' ||
    path.startsWith('/admin/') ||
    path.startsWith('/wp-admin/')
  ) {
    let subRoute = 'dashboard';
    if (path.includes('/homepage')) subRoute = 'homepage';
    else if (path.includes('/news')) subRoute = 'news';
    else if (path.includes('/events') || path.includes('/event')) subRoute = 'events';
    else if (path.includes('/gallery')) subRoute = 'gallery';

    return { view: 'admin', hash: '', subRoute };
  }

  // If hash is explicitly #home, user intends Home
  if (hash === '#home') {
    return { view: 'home', hash: '' };
  }

  // Blog article view: Meditation and Spiritual Practices for Youth
  if (
    hash === '#meditation-and-spiritual-practices-for-youth' ||
    hash === '#meditation-for-youth' ||
    hash === '#meditation' ||
    path === '/meditation-and-spiritual-practices-for-youth' ||
    path === '/meditation-for-youth' ||
    path === '/blog/meditation' ||
    path === '/blog/meditation-and-spiritual-practices-for-youth'
  ) {
    return { view: 'blog-meditation', hash: '' };
  }

  // Blog article view: Why Gurukul Education is Relevant in Modern India
  if (
    hash === '#why-gurukul-education-is-relevant-in-modern-india' ||
    hash === '#gurukul-education' ||
    path === '/why-gurukul-education-is-relevant-in-modern-india' ||
    path === '/gurukul-education' ||
    path === '/blog/gurukul' ||
    path === '/blog/why-gurukul-education-is-relevant-in-modern-india'
  ) {
    return { view: 'blog-gurukul', hash: '' };
  }

  // Blog article view: The Power of Seva
  if (
    hash === '#the-power-of-seva' ||
    hash === '#power-of-seva' ||
    path === '/the-power-of-seva' ||
    path === '/blog/the-power-of-seva' ||
    path === '/blog'
  ) {
    return { view: 'blog-seva', hash: '' };
  }

  // Contact view
  if (
    hash === '#contact' ||
    path === '/contact' ||
    path === '/contact-us'
  ) {
    return { view: 'contact', hash: '' };
  }

  // Events view
  if (
    hash === '#event' ||
    hash === '#events' ||
    path === '/event' ||
    path === '/events'
  ) {
    return { view: 'events', hash: '' };
  }

  // If hash is a section anchor on home
  if (['#priorities', '#gurukul', '#how-we-work', '#blogs'].includes(hash)) {
    return { view: 'home', hash };
  }

  // Gallery view
  if (
    hash === '#gallery' ||
    hash === '#stories' ||
    hash === '#our-stories' ||
    path === '/gallery' ||
    path === '/stories' ||
    path === '/our-stories'
  ) {
    return { view: 'gallery', hash: '' };
  }

  // About view
  if (hash === '#about' || path === '/about') {
    return { view: 'about', hash: '' };
  }

  return { view: 'home', hash: '' };
}

export default function App() {
  const [donateModalOpen, setDonateModalOpen] = useState(false);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [volunteerModalOpen, setVolunteerModalOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [lightboxData, setLightboxData] = useState({ isOpen: false, image: '', title: '' });

  const [currentView, setCurrentView] = useState(() => {
    return parseLocation().view;
  });
  const [adminSubRoute, setAdminSubRoute] = useState(() => {
    return parseLocation().subRoute || 'dashboard';
  });

  useEffect(() => {
    const syncRouteAndCleanUrl = () => {
      const { view, hash, subRoute } = parseLocation();
      setCurrentView(view);
      if (subRoute) setAdminSubRoute(subRoute);

      const path = window.location.pathname.toLowerCase();
      const rawHash = window.location.hash;

      // Clean up malformed endpoint patterns (e.g. /gallery#home, /gallery#gallery, /about#home)
      if (view === 'home') {
        if (hash) {
          if (path !== '/' || rawHash !== hash) {
            window.history.replaceState({ view: 'home', hash }, '', `/${hash}`);
          }
          setTimeout(() => {
            const el = document.querySelector(hash);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }, 80);
        } else {
          if (path !== '/' || rawHash) {
            window.history.replaceState({ view: 'home' }, '', '/');
          }
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      } else if (view === 'gallery') {
        if (path !== '/gallery' || rawHash) {
          window.history.replaceState({ view: 'gallery' }, '', '/gallery');
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (view === 'about') {
        if (path !== '/about' || rawHash) {
          window.history.replaceState({ view: 'about' }, '', '/about');
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (view === 'events') {
        if (path !== '/event' || rawHash) {
          window.history.replaceState({ view: 'events' }, '', '/event');
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (view === 'contact') {
        if (path !== '/contact' || rawHash) {
          window.history.replaceState({ view: 'contact' }, '', '/contact');
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (view === 'blog-meditation') {
        if (path !== '/meditation-and-spiritual-practices-for-youth' || rawHash) {
          window.history.replaceState({ view: 'blog-meditation' }, '', '/meditation-and-spiritual-practices-for-youth');
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (view === 'blog-gurukul') {
        if (path !== '/why-gurukul-education-is-relevant-in-modern-india' || rawHash) {
          window.history.replaceState({ view: 'blog-gurukul' }, '', '/why-gurukul-education-is-relevant-in-modern-india');
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (view === 'blog-seva') {
        if (path !== '/the-power-of-seva' || rawHash) {
          window.history.replaceState({ view: 'blog-seva' }, '', '/the-power-of-seva');
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (view === 'admin') {
        const targetSub = subRoute || 'dashboard';
        const targetPath = `/admin/${targetSub}`;
        if (path !== targetPath && path !== '/admin' && path !== '/wp-admin') {
          window.history.replaceState({ view: 'admin', subRoute: targetSub }, '', targetPath);
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    // Run on mount to immediately sanitize the URL
    syncRouteAndCleanUrl();

    window.addEventListener('popstate', syncRouteAndCleanUrl);
    window.addEventListener('hashchange', syncRouteAndCleanUrl);
    return () => {
      window.removeEventListener('popstate', syncRouteAndCleanUrl);
      window.removeEventListener('hashchange', syncRouteAndCleanUrl);
    };
  }, []);

  const handleNavigate = (view, targetHash, targetSubRoute = 'dashboard') => {
    setCurrentView(view);

    if (view === 'about') {
      window.history.pushState({ view: 'about' }, '', '/about');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (view === 'gallery' || view === 'stories' || view === 'our-stories') {
      window.history.pushState({ view: 'gallery' }, '', '/gallery');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (view === 'events' || view === 'event') {
      window.history.pushState({ view: 'events' }, '', '/event');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (view === 'contact') {
      window.history.pushState({ view: 'contact' }, '', '/contact');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (view === 'blog-meditation' || view === 'meditation-and-spiritual-practices-for-youth' || view === 'meditation-for-youth') {
      window.history.pushState({ view: 'blog-meditation' }, '', '/meditation-and-spiritual-practices-for-youth');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (view === 'blog-gurukul' || view === 'why-gurukul-education-is-relevant-in-modern-india' || view === 'gurukul-education') {
      window.history.pushState({ view: 'blog-gurukul' }, '', '/why-gurukul-education-is-relevant-in-modern-india');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (view === 'blog-seva' || view === 'the-power-of-seva') {
      window.history.pushState({ view: 'blog-seva' }, '', '/the-power-of-seva');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (view === 'admin' || view === 'admin-panel' || view === 'cms') {
      const sub = targetSubRoute || 'dashboard';
      setAdminSubRoute(sub);
      window.history.pushState({ view: 'admin', subRoute: sub }, '', `/admin/${sub}`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Home view
      if (targetHash) {
        window.history.pushState({ view: 'home', hash: targetHash }, '', `/${targetHash}`);
        setTimeout(() => {
          const el = document.querySelector(targetHash);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 80);
      } else {
        window.history.pushState({ view: 'home' }, '', '/');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const handleOpenDonate = () => setDonateModalOpen(true);
  const handleOpenVideo = () => setVideoModalOpen(true);
  const handleOpenVolunteer = () => setVolunteerModalOpen(true);
  const handleOpenSearch = () => setSearchModalOpen(true);

  const handleOpenLightbox = (image, title) => {
    setLightboxData({ isOpen: true, image, title });
  };

  const handleCloseLightbox = () => {
    setLightboxData({ isOpen: false, image: '', title: '' });
  };

  // If viewing the Admin Panel, render full-screen AdminApp
  if (currentView === 'admin') {
    return (
      <AdminApp
        onNavigateHome={() => handleNavigate('home')}
        subRoute={adminSubRoute}
      />
    );
  }

  return (
    <div className="page-wrapper">
      {/* 1. Preloader Component with custom-loader */}
      <Preloader />

      {/* 2. Navbar — pixel-perfect match to the reference design */}
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        onOpenDonate={handleOpenDonate}
        onOpenVolunteer={handleOpenVolunteer}
        onOpenSearch={handleOpenSearch}
      />

      {/* Main Content Area */}
      <main id="main-content">
        {currentView === 'about' ? (
          /* Full About Us Page matching reference screenshot */
          <AboutPage
            onNavigate={handleNavigate}
            onOpenDonate={handleOpenDonate}
            onOpenVolunteer={handleOpenVolunteer}
            onOpenVideo={handleOpenVideo}
          />
        ) : currentView === 'gallery' ? (
          /* Full Our Stories / Gallery Page matching reference screenshot */
          <GalleryPage
            onNavigate={handleNavigate}
            onOpenLightbox={handleOpenLightbox}
          />
        ) : currentView === 'events' ? (
          /* Full Our Events Page matching reference screenshot */
          <EventsPage
            onNavigate={handleNavigate}
            onOpenDonate={handleOpenDonate}
            onOpenVolunteer={handleOpenVolunteer}
          />
        ) : currentView === 'contact' ? (
          /* Full Contact Us Page matching reference screenshot */
          <ContactPage
            onNavigate={handleNavigate}
          />
        ) : currentView === 'blog-meditation' ? (
          /* Full Meditation and Spiritual Practices for Youth Article Page matching reference screenshot */
          <MeditationBlogPage
            onNavigate={handleNavigate}
            onOpenDonate={handleOpenDonate}
            onOpenVolunteer={handleOpenVolunteer}
          />
        ) : currentView === 'blog-gurukul' ? (
          /* Full Why Gurukul Education is Relevant in Modern India Article Page */
          <GurukulBlogPage
            onNavigate={handleNavigate}
            onOpenDonate={handleOpenDonate}
            onOpenVolunteer={handleOpenVolunteer}
          />
        ) : currentView === 'blog-seva' ? (
          /* Full The Power of Seva Article Page matching reference screenshot */
          <BlogDetailPage
            onNavigate={handleNavigate}
            onOpenDonate={handleOpenDonate}
            onOpenVolunteer={handleOpenVolunteer}
          />
        ) : (
          /* Standard Homepage sections */
          <>
            {/* Hero Section: Transforming Lives Through Spiritual Devotion */}
            <HeroBanner
              onOpenDonate={handleOpenDonate}
              onOpenVolunteer={handleOpenVolunteer}
            />

            {/* Serving Humanity with Devotion */}
            <ServingHumanity
              onOpenDonate={handleOpenDonate}
              onNavigateAbout={() => handleNavigate('about')}
            />

            {/* Three Pillar Cards with Red Circular Badges */}
            <PillarCards
              onOpenDonate={handleOpenDonate}
            />

            {/* We Are Committed to Transforming Thousands of Lives */}
            <CommitmentSection
              onOpenDonate={handleOpenDonate}
            />

            {/* Our Priorities (4 Cards Grid) */}
            <PrioritiesSection
              onOpenDonate={handleOpenDonate}
            />

            {/* Impact & Video Highlight Section */}
            <ImpactVideoSection
              onOpenVideo={handleOpenVideo}
            />

            {/* Have a Look at Our Gurukul (Owl Carousel) */}
            <GurukulCarousel
              onOpenLightbox={handleOpenLightbox}
            />

            {/* How We Work? (4 Steps with Watermark Background) */}
            <HowWeWorkSection />

            {/* Our Latest Blogs */}
            <LatestBlogsSection
              onSelectBlog={(blog) => {
                if (blog.id === 1) {
                  handleNavigate('blog-meditation');
                } else if (blog.id === 2) {
                  handleNavigate('blog-gurukul');
                } else if (blog.id === 3) {
                  handleNavigate('blog-seva');
                } else {
                  handleNavigate('blog-gurukul');
                }
              }}
            />

            {/* Contact Section featuring Contact Form 7 */}
            <ContactSection />
          </>
        )}
      </main>

      {/* Footer & Newsletter */}
      <Footer
        onOpenDonate={handleOpenDonate}
        onOpenVolunteer={handleOpenVolunteer}
        onNavigate={handleNavigate}
      />

      {/* Modals & Dialogs (GiveWP, Magnific Popup) */}
      <DonationModal
        isOpen={donateModalOpen}
        onClose={() => setDonateModalOpen(false)}
      />

      <VideoPlayerModal
        isOpen={videoModalOpen}
        onClose={() => setVideoModalOpen(false)}
      />

      <VolunteerModal
        isOpen={volunteerModalOpen}
        onClose={() => setVolunteerModalOpen(false)}
      />

      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
      />

      <LightboxModal
        isOpen={lightboxData.isOpen}
        image={lightboxData.image}
        title={lightboxData.title}
        onClose={handleCloseLightbox}
      />
    </div>
  );
}
