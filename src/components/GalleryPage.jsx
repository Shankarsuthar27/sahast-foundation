import React, { useState, useEffect } from 'react';
import { Home, ChevronRight, X, ChevronLeft, Eye } from 'lucide-react';
import galleryData from '../galleryItems.json';
import { useCms } from '../context/CmsContext';

export default function GalleryPage({ onNavigate, onOpenLightbox }) {
  const { galleryList } = useCms();
  const [selectedIdx, setSelectedIdx] = useState(null);

  // Merge live gallery photos with static items
  const dynamicPhotos = (galleryList || []).map((p, idx) => ({
    id: p.id || `live-${idx}`,
    title: p.title,
    category: p.category,
    image: p.url,
    alt: p.title
  }));
  const allGalleryItems = [...dynamicPhotos, ...galleryData];

  // Keyboard navigation for Lightbox
  useEffect(() => {
    if (selectedIdx === null) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedIdx(null);
      } else if (e.key === 'ArrowRight') {
        setSelectedIdx((prev) => (prev + 1) % allGalleryItems.length);
      } else if (e.key === 'ArrowLeft') {
        setSelectedIdx((prev) => (prev - 1 + allGalleryItems.length) % allGalleryItems.length);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIdx, allGalleryItems.length]);

  // Distribute items into 4 columns
  const columns = [[], [], [], []];
  allGalleryItems.forEach((item, index) => {
    columns[index % 4].push({ ...item, originalIndex: index });
  });

  const activeItem = selectedIdx !== null ? allGalleryItems[selectedIdx] : null;

  return (
    <div className="gallery-page" style={{ backgroundColor: '#ffffff', minHeight: '100vh' }}>
      {/* 1. Header Banner & Breadcrumb */}
      <section
        style={{
          position: 'relative',
          padding: '85px 0 80px',
          backgroundImage: `linear-gradient(rgba(7, 18, 43, 0.88), rgba(7, 18, 43, 0.90)), url(/gallery/breadcrumb-03.jpg)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: '#ffffff',
          overflow: 'hidden',
          borderBottom: '3px solid #fabc3f'
        }}
      >
        <div
          style={{
            maxWidth: '1320px',
            margin: '0 auto',
            padding: '0 24px',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '20px'
          }}
        >
          <div>
            <h1
              style={{
                fontSize: 'clamp(32px, 4.5vw, 48px)',
                fontWeight: 700,
                letterSpacing: '-0.5px',
                margin: 0,
                color: '#ffffff',
                fontFamily: '"PT Sans", "Georgia", serif'
              }}
            >
              Our Stories
            </h1>
          </div>

          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              fontSize: '15px',
              fontWeight: 500
            }}
          >
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                if (onNavigate) onNavigate('home');
              }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                color: '#fabc3f',
                textDecoration: 'none',
                transition: 'opacity 0.2s ease'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
            >
              <Home size={16} />
              <span>Home</span>
            </a>
            <ChevronRight size={14} style={{ color: 'rgba(255, 255, 255, 0.45)' }} />
            <span style={{ color: '#ffffff', fontWeight: 600 }}>Our Stories</span>
          </nav>
        </div>
      </section>

      {/* 2. Photo Gallery Grid (Exact 4-Column Layout from Screenshot) */}
      <section
        style={{
          padding: '60px 0 80px',
          backgroundColor: '#fafbfc'
        }}
      >
        <div
          style={{
            maxWidth: '1360px',
            margin: '0 auto',
            padding: '0 20px'
          }}
        >
          <div className="gallery-masonry-container">
            {columns.map((colItems, colIdx) => (
              <div key={colIdx} className="gallery-masonry-col">
                {colItems.map((item) => (
                  <div
                    key={item.id}
                    className="gallery-card"
                    onClick={() => {
                      if (onOpenLightbox) {
                        onOpenLightbox(item.image, item.title);
                      }
                      setSelectedIdx(item.originalIndex);
                    }}
                    role="button"
                    tabIndex={0}
                    aria-label={item.title}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        setSelectedIdx(item.originalIndex);
                      }
                    }}
                  >
                    <div className="gallery-img-wrapper">
                      <img
                        src={item.image}
                        alt={item.title}
                        loading="lazy"
                        onError={(e) => {
                          if (item.remoteUrl && e.currentTarget.src !== item.remoteUrl) {
                            e.currentTarget.src = item.remoteUrl;
                          } else {
                            e.currentTarget.src = '/home-page-image/guruji-1.jpeg';
                          }
                        }}
                      />
                      <div className="gallery-overlay">
                        <div className="gallery-overlay-icon">
                          <Eye size={22} strokeWidth={2.2} />
                        </div>
                        <div className="gallery-overlay-title">
                          {item.title}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Interactive Fullscreen Lightbox Modal */}
      {selectedIdx !== null && activeItem && (
        <div
          className="gallery-lightbox-overlay"
          onClick={() => setSelectedIdx(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="gallery-lightbox-modal"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Toolbar */}
            <div className="gallery-lightbox-topbar">
              <span className="gallery-lightbox-counter">
                Photo {selectedIdx + 1} of {galleryData.length}
              </span>
              <button
                type="button"
                className="gallery-lightbox-close"
                onClick={() => setSelectedIdx(null)}
                aria-label="Close"
              >
                <X size={22} />
              </button>
            </div>

            {/* Main Lightbox Image Viewport */}
            <div className="gallery-lightbox-viewport">
              {/* Prev Button */}
              <button
                type="button"
                className="gallery-lightbox-nav prev"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedIdx((prev) => (prev - 1 + galleryData.length) % galleryData.length);
                }}
                aria-label="Previous Photo"
              >
                <ChevronLeft size={30} />
              </button>

              <img
                src={activeItem.image}
                alt={activeItem.title}
                className="gallery-lightbox-img"
                onError={(e) => {
                  if (activeItem.remoteUrl) {
                    e.currentTarget.src = activeItem.remoteUrl;
                  }
                }}
              />

              {/* Next Button */}
              <button
                type="button"
                className="gallery-lightbox-nav next"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedIdx((prev) => (prev + 1) % galleryData.length);
                }}
                aria-label="Next Photo"
              >
                <ChevronRight size={30} />
              </button>
            </div>

            {/* Bottom Caption */}
            <div className="gallery-lightbox-caption">
              <h3 style={{ margin: '0 0 4px', fontSize: '18px', fontWeight: 600, color: '#ffffff' }}>
                {activeItem.title}
              </h3>
              <p style={{ margin: 0, fontSize: '13px', color: '#fabc3f' }}>
                Sahast Foundation • Seva & Spiritual Journey
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Embedded Responsive Styles */}
      <style>{`
        .gallery-masonry-container {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 14px;
          align-items: start;
        }

        .gallery-masonry-col {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .gallery-card {
          border-radius: 8px;
          overflow: hidden;
          background: #ffffff;
          box-shadow: 0 3px 12px rgba(11, 35, 28, 0.06);
          cursor: pointer;
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease;
          position: relative;
        }

        .gallery-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 28px rgba(11, 35, 28, 0.16);
        }

        .gallery-img-wrapper {
          position: relative;
          overflow: hidden;
          width: 100%;
          background: #e2e8f0;
        }

        .gallery-img-wrapper img {
          width: 100%;
          height: auto;
          display: block;
          transition: transform 0.45s ease;
        }

        .gallery-card:hover .gallery-img-wrapper img {
          transform: scale(1.04);
        }

        .gallery-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(7, 18, 43, 0.85) 0%, rgba(7, 18, 43, 0.2) 60%, transparent 100%);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-end;
          padding: 16px;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .gallery-card:hover .gallery-overlay {
          opacity: 1;
        }

        .gallery-overlay-icon {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: rgba(250, 188, 63, 0.95);
          color: #07122b;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 12px;
          transform: scale(0.8);
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 4px 14px rgba(0,0,0,0.25);
        }

        .gallery-card:hover .gallery-overlay-icon {
          transform: scale(1);
        }

        .gallery-overlay-title {
          color: #ffffff;
          font-size: 13.5px;
          font-weight: 600;
          text-align: center;
          line-height: 1.35;
          text-shadow: 0 2px 4px rgba(0,0,0,0.6);
        }

        /* Lightbox Styles */
        .gallery-lightbox-overlay {
          position: fixed;
          inset: 0;
          z-index: 99999;
          background: rgba(5, 12, 28, 0.95);
          backdrop-filter: blur(10px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          animation: glbFadeIn 0.25s ease;
        }

        @keyframes glbFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .gallery-lightbox-modal {
          max-width: 1000px;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
        }

        .gallery-lightbox-topbar {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 12px;
        }

        .gallery-lightbox-counter {
          color: #fabc3f;
          font-size: 14px;
          font-weight: 600;
          background: rgba(255, 255, 255, 0.1);
          padding: 4px 12px;
          border-radius: 20px;
        }

        .gallery-lightbox-close {
          background: rgba(255, 255, 255, 0.15);
          border: none;
          color: #ffffff;
          width: 38px;
          height: 38px;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s ease, transform 0.2s ease;
        }

        .gallery-lightbox-close:hover {
          background: #e31937;
          transform: scale(1.05);
        }

        .gallery-lightbox-viewport {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          max-height: 75vh;
        }

        .gallery-lightbox-img {
          max-width: 100%;
          max-height: 75vh;
          object-fit: contain;
          border-radius: 8px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.6);
        }

        .gallery-lightbox-nav {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(7, 18, 43, 0.7);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: #ffffff;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
          z-index: 10;
        }

        .gallery-lightbox-nav:hover {
          background: #fabc3f;
          color: #07122b;
          border-color: #fabc3f;
        }

        .gallery-lightbox-nav.prev {
          left: -20px;
        }

        .gallery-lightbox-nav.next {
          right: -20px;
        }

        .gallery-lightbox-caption {
          margin-top: 16px;
          text-align: center;
        }

        /* Responsive Breakpoints */
        @media (max-width: 1100px) {
          .gallery-masonry-container {
            grid-template-columns: repeat(3, 1fr);
          }
          .gallery-lightbox-nav.prev { left: 10px; }
          .gallery-lightbox-nav.next { right: 10px; }
        }

        @media (max-width: 768px) {
          .gallery-masonry-container {
            grid-template-columns: repeat(2, 1fr);
            gap: 10px;
          }
          .gallery-masonry-col {
            gap: 10px;
          }
        }

        @media (max-width: 480px) {
          .gallery-masonry-container {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
