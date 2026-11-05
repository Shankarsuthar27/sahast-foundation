import React, { useState, useRef } from 'react';
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Heart
} from 'lucide-react';
import { useCms } from '../context/CmsContext';

export default function PrioritiesSection({ onOpenDonate }) {
  const { homepageData } = useCms();
  const prioritiesData = homepageData?.priorities || {};

  // Toggle between Option A (Image + Gradient Overlay) and Option B (Clean Card Below Image)
  const [cardOption, setCardOption] = useState('A');
  const carouselRef = useRef(null);

  const defaultPriorities = [
    {
      id: 1,
      image: '/home-page-image/WhatsApp-Image-2026-05-28-at-16.38.59sss.jpeg',
      fallback: '/home-page-image/WhatsApp-Image-2026-05-26-at-21.23.395-e1779955852314.jpeg',
      title: 'Free Food / Annadaan',
      category: 'Annadaan Seva',
      readTime: 'Monthly Outreach',
      description: 'Distributing thousands of hot, nutritious meals every month to pilgrims, sadhus, and families facing food insecurity.',
      action: 'Learn More'
    },
    {
      id: 2,
      image: '/home-page-image/WhatsApp-Image-2026-05-28-at-16.39.00ds.jpeg',
      fallback: '/home-page-image/WhatsApp-Image-2026-05-26-at-21.23.400-e1779955447139.jpeg',
      title: 'Tribal Education',
      category: 'Tribal Gurukul',
      readTime: '500+ Students',
      description: 'Empowering children from remote tribal belts with free residential schooling, books, computers, and moral character building.',
      action: 'Learn More'
    },
    {
      id: 3,
      image: '/home-page-image/WhatsApp-Image-2026-05-28-at-16.39.02ad.jpeg',
      fallback: '/home-page-image/WhatsApp-Image-2026-05-28-at-13.31.06-e1779955352658.jpeg',
      title: 'Relief & Ration Kits',
      category: 'Emergency Relief',
      readTime: 'Direct Aid',
      description: 'Delivering essential dry rations, clean drinking water, warm blankets, and medical first-aid kits during emergencies.',
      action: 'Learn More'
    },
    {
      id: 4,
      image: '/home-page-image/WhatsApp-Image-2026-05-28-at-16.39.05fsf.jpeg',
      fallback: '/home-page-image/WhatsApp-Image-2026-05-26-at-21.23.523-e1779814853502.jpeg',
      title: 'Spiritual Guidance',
      category: 'Satsang & Katha',
      readTime: 'Pravachans',
      description: 'Conducting regular Katha pravachans, family harmony discourses, and de-addiction workshops for youth across India.',
      action: 'Learn More'
    }
  ];

  const rawItems = prioritiesData.items;
  const itemsArray = Array.isArray(rawItems)
    ? rawItems
    : (rawItems && typeof rawItems === 'object')
      ? Object.values(rawItems)
      : [];
  const priorities = itemsArray.length > 0 ? itemsArray : defaultPriorities;

  // Scroll carousel by exactly one card width + gap
  const scrollCarousel = (direction) => {
    if (!carouselRef.current) return;
    const card = carouselRef.current.querySelector('[data-carousel-card]');
    const scrollAmount = card ? card.offsetWidth + 16 : 280;
    carouselRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  return (
    <section 
      id="priorities"
      className="py-8 md:py-16 bg-white relative"
    >
      <style>{`
        /* Hide scrollbars for modern horizontal carousel */
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* ========================================================= */}
      {/* 1. MOBILE-ONLY VIEW: Modern Sliding Article Carousel      */}
      {/* ========================================================= */}
      <div className="block md:hidden">
        {/* Header: Centered, bold section title */}
        <div className="px-4 mb-4 text-center">
          <h2 className="text-xl font-bold text-gray-900 tracking-tight">
            {prioritiesData.heading || 'Our Priorities'}
          </h2>
        </div>

        {/* Carousel Container with Relative Controls */}
        <div className="relative group">
          {/* Floating Left Navigation Button */}
          <button
            type="button"
            onClick={() => scrollCarousel('left')}
            className="w-9 h-9 rounded-full bg-white/90 shadow-md flex items-center justify-center text-gray-700 active:bg-orange-500 active:text-white hover:bg-orange-500 hover:text-white transition-colors absolute left-2 top-1/2 -translate-y-1/2 z-20 cursor-pointer"
            aria-label="Previous card"
          >
            <ChevronLeft size={18} />
          </button>

          {/* Floating Right Navigation Button */}
          <button
            type="button"
            onClick={() => scrollCarousel('right')}
            className="w-9 h-9 rounded-full bg-white/90 shadow-md flex items-center justify-center text-gray-700 active:bg-orange-500 active:text-white hover:bg-orange-500 hover:text-white transition-colors absolute right-2 top-1/2 -translate-y-1/2 z-20 cursor-pointer"
            aria-label="Next card"
          >
            <ChevronRight size={18} />
          </button>

          {/* Single-row horizontal scroll container with smooth scroll and CSS scroll-snap */}
          <div
            ref={carouselRef}
            className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth gap-4 px-4 no-scrollbar py-2"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            {priorities.map((item, idx) => {
              const category = item.category || (idx === 0 ? 'Annadaan Seva' : idx === 1 ? 'Tribal Gurukul' : idx === 2 ? 'Emergency Relief' : 'Satsang & Katha');
              const readTime = item.readTime || (idx === 0 ? 'Monthly Outreach' : idx === 1 ? '500+ Students' : idx === 2 ? 'Direct Aid' : 'Pravachans');
              const action = item.action || 'Learn More';

              return (
                <div
                  key={item.id || idx}
                  data-carousel-card
                  className="w-[78vw] sm:w-[280px] shrink-0 snap-center aspect-[4/5] rounded-2xl overflow-hidden shadow-md relative group/card flex flex-col bg-white"
                >
                  {/* Floating circular action icon in top-right corner */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onOpenDonate) onOpenDonate();
                    }}
                    className="absolute top-3 right-3 z-10 bg-emerald-500 text-white rounded-full p-2 shadow-md hover:bg-emerald-600 active:scale-95 transition-all flex items-center justify-center cursor-pointer"
                    title={action}
                    aria-label={action}
                  >
                    <Heart size={14} fill="currentColor" />
                  </button>

                  {cardOption === 'A' ? (
                    /* OPTION A: Full-bleed Cover Image with Bottom Dark Gradient Overlay */
                    <div className="relative w-full h-full flex flex-col justify-end">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-105"
                        onError={(e) => {
                          e.currentTarget.src = item.fallback || defaultPriorities[idx % defaultPriorities.length].fallback;
                        }}
                      />

                      {/* Bottom dark gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent flex flex-col justify-end p-5 text-white pointer-events-none">
                        {/* Category badge */}
                        <span className="bg-orange-500 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider w-fit mb-2 shadow-xs pointer-events-auto">
                          {category}
                        </span>

                        {/* 2-line truncated title in white */}
                        <h3 className="text-lg font-bold text-white line-clamp-2 leading-snug mb-1 drop-shadow-xs">
                          {item.title}
                        </h3>

                        {/* Description snippet */}
                        <p className="text-xs text-gray-200 line-clamp-2 mb-3 leading-relaxed opacity-95">
                          {item.description}
                        </p>

                        {/* Action row & read time */}
                        <div className="flex items-center justify-between text-xs font-semibold pt-2 border-t border-white/20">
                          <button
                            type="button"
                            onClick={onOpenDonate}
                            className="inline-flex items-center gap-1.5 text-orange-400 hover:text-orange-300 active:text-orange-200 font-bold pointer-events-auto transition-colors cursor-pointer"
                          >
                            <span>{action}</span>
                            <ArrowRight size={13} />
                          </button>
                          <span className="text-gray-300 text-[11px] font-medium">{readTime}</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* OPTION B: Clean Card Below Image */
                    <div className="w-full h-full bg-white flex flex-col">
                      {/* Rounded image on top */}
                      <div className="relative h-[50%] w-full overflow-hidden bg-gray-100">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = item.fallback || defaultPriorities[idx % defaultPriorities.length].fallback;
                          }}
                        />
                      </div>

                      {/* Clean white content box below */}
                      <div className="h-[50%] p-4 flex flex-col justify-between bg-white">
                        <div>
                          <div className="flex items-center justify-between text-[11px] text-gray-500 mb-1">
                            <span className="text-orange-600 font-bold uppercase tracking-wider">{category}</span>
                            <span className="text-gray-400">{readTime}</span>
                          </div>
                          <h3 className="text-base font-bold text-gray-900 line-clamp-1 mb-1">
                            {item.title}
                          </h3>
                          <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                            {item.description}
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={onOpenDonate}
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-600 hover:text-orange-700 active:text-orange-800 transition-colors pt-2 border-t border-gray-100 cursor-pointer"
                        >
                          <span>{action}</span>
                          <ArrowRight size={13} />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 2. DESKTOP VIEW: Preserved Clean 4-Card Grid              */}
      {/* ========================================================= */}
      <div className="hidden md:block container mx-auto px-4" style={{ position: 'relative' }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '45px' }}>
          <div 
            style={{
              display: 'inline-block',
              color: '#d59a1a',
              fontSize: '13.5px',
              fontWeight: 800,
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              marginBottom: '8px'
            }}
          >
            {prioritiesData.badge || 'KEY INITIATIVES'}
          </div>

          <h2 
            style={{
              fontSize: 'clamp(28px, 3.2vw, 38px)',
              fontWeight: 800,
              color: '#1a1a1a',
              marginBottom: '10px'
            }}
          >
            {prioritiesData.heading || 'Our Priorities'}
          </h2>

          <p 
            style={{
              fontSize: '16px',
              color: '#666666',
              maxWidth: '600px',
              margin: '0 auto'
            }}
          >
            {prioritiesData.subheading ||
              'Making lasting change through holistic support, education, and compassion.'}
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '24px'
          }}
        >
          {priorities.map((item, idx) => (
            <div
              key={item.id || idx}
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '18px',
                border: '1px solid #ededed',
                overflow: 'hidden',
                boxShadow: '0 8px 25px rgba(0, 0, 0, 0.05)',
                transition: 'all 0.3s ease',
                display: 'flex',
                flexDirection: 'column'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.boxShadow = '0 16px 36px rgba(0, 0, 0, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.05)';
              }}
            >
              {/* Card Image */}
              <div style={{ height: '180px', overflow: 'hidden' }}>
                <img
                  src={item.image}
                  alt={item.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => {
                    e.currentTarget.src = item.fallback || defaultPriorities[idx % defaultPriorities.length].fallback;
                  }}
                />
              </div>

              {/* Content */}
              <div style={{ padding: '22px 20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <h3 
                  style={{
                    fontSize: '18px',
                    fontWeight: 700,
                    color: '#1a1a1a',
                    marginBottom: '8px'
                  }}
                >
                  {item.title}
                </h3>

                <p 
                  style={{
                    fontSize: '14.5px',
                    color: '#666666',
                    lineHeight: '23px',
                    marginBottom: '16px',
                    flex: 1
                  }}
                >
                  {item.description}
                </p>

                <button
                  type="button"
                  onClick={onOpenDonate}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    color: '#e31937',
                    fontWeight: 700,
                    fontSize: '14px',
                    border: 'none',
                    background: 'none',
                    cursor: 'pointer',
                    padding: 0
                  }}
                >
                  <span>{item.action || 'Learn More'}</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
