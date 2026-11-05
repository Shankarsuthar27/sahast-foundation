import React, { useState, useRef } from 'react';
import {
  Utensils,
  HeartHandshake,
  GraduationCap,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Heart
} from 'lucide-react';
import { useCms } from '../context/CmsContext';

export default function PillarCards({ onOpenDonate }) {
  const { homepageData } = useCms();
  const customPillars = homepageData?.pillars;

  // Toggle between Option A (Image + Gradient Overlay) and Option B (Clean Card Below Image)
  const [cardOption, setCardOption] = useState('A');
  const carouselRef = useRef(null);

  const defaultPillars = [
    {
      id: 1,
      image: '/home-page-image/WhatsApp-Image-2026-05-26-at-21.23.3866-e1779814834826.jpeg',
      fallbackImage: '/home-page-image/WhatsApp-Image-2026-05-26-at-21.23.395-e1779955852314.jpeg',
      icon: <Utensils size={22} color="#ffffff" />,
      title: 'Annakshetra Seva',
      category: 'Annadan',
      readTime: 'Daily Satvik Seva',
      description: 'Serving wholesome, freshly-prepared satvik meals daily to hundreds of sadhus, pilgrims, and impoverished families.',
      action: 'Support Annadan'
    },
    {
      id: 2,
      image: '/home-page-image/WhatsApp-Image-2026-05-26-at-21.23.40-e1779954909287.jpeg',
      fallbackImage: '/home-page-image/WhatsApp-Image-2026-05-26-at-21.23.523-e1779814853502.jpeg',
      icon: <HeartHandshake size={22} color="#ffffff" />,
      title: 'Mission & Values',
      category: 'Sanatan Dharma',
      readTime: 'Spiritual Heritage',
      description: 'Preserving Sanatan moral principles and spiritual traditions to awaken compassion, character, and harmony in every household.',
      action: 'Learn Our Values'
    },
    {
      id: 3,
      image: '/home-page-image/WhatsApp-Image-2026-05-28-at-13.35.48-e1779956288882.jpeg',
      fallbackImage: '/home-page-image/WhatsApp-Image-2026-05-26-at-21.24.2745-1-e1779955723374.jpeg',
      icon: <GraduationCap size={22} color="#ffffff" />,
      title: 'Child Education & Care',
      category: 'Gurukul Shiksha',
      readTime: '500+ Students',
      description: 'Sponsoring comprehensive Gurukul residential education, books, nutrition, and sanskars for 500+ rural and tribal youth.',
      action: 'Sponsor a Student'
    }
  ];

  const parsedPillars = Array.isArray(customPillars)
    ? customPillars
    : (customPillars && typeof customPillars === 'object' ? Object.values(customPillars) : []);
  const pillars = parsedPillars.length > 0 ? parsedPillars : defaultPillars;

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
    <section className="py-8 md:py-14 bg-white relative">
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
            Our Core Seva
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
            {pillars.map((pillar, idx) => {
              const category = pillar.category || (idx === 0 ? 'Annadan' : idx === 1 ? 'Sanatan Dharma' : 'Gurukul Shiksha');
              const readTime = pillar.readTime || (idx === 0 ? 'Daily Satvik Meals' : idx === 1 ? 'Spiritual Heritage' : '500+ Students');
              const action = pillar.action || (idx === 0 ? 'Support Annadan' : idx === 1 ? 'Learn Our Values' : 'Sponsor a Student');

              return (
                <div
                  key={pillar.id || idx}
                  data-carousel-card
                  className="w-[78vw] sm:w-[280px] shrink-0 snap-center aspect-[4/5] rounded-2xl overflow-hidden shadow-md relative group/card flex flex-col bg-white"
                >
                  {/* Floating circular action/zoom icon in top-right corner */}
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
                        src={pillar.image}
                        alt={pillar.title}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-105"
                        onError={(e) => {
                          e.currentTarget.src = pillar.fallbackImage || defaultPillars[idx % defaultPillars.length].fallbackImage;
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
                          {pillar.title}
                        </h3>

                        {/* Description snippet */}
                        <p className="text-xs text-gray-200 line-clamp-2 mb-3 leading-relaxed opacity-95">
                          {pillar.description}
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
                          src={pillar.image}
                          alt={pillar.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = pillar.fallbackImage || defaultPillars[idx % defaultPillars.length].fallbackImage;
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
                            {pillar.title}
                          </h3>
                          <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                            {pillar.description}
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
      {/* 2. DESKTOP VIEW: Preserved Clean 3-Card Grid              */}
      {/* ========================================================= */}
      <div className="hidden md:block container mx-auto px-4" style={{ position: 'relative' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '28px'
          }}
        >
          {pillars.map((pillar, idx) => (
            <div
              key={pillar.id || idx}
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '20px',
                border: '1px solid #efefef',
                overflow: 'hidden',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.06)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                display: 'flex',
                flexDirection: 'column'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.boxShadow = '0 18px 40px rgba(0, 0, 0, 0.12)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.06)';
              }}
            >
              {/* Image with Circular Red Icon Overlapping */}
              <div style={{ position: 'relative', height: '210px', overflow: 'hidden' }}>
                <img
                  src={pillar.image}
                  alt={pillar.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => {
                    e.currentTarget.src = pillar.fallbackImage || defaultPillars[idx % defaultPillars.length].fallbackImage;
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.3) 0%, transparent 60%)'
                  }}
                />

                {/* Overlapping Red Circular Icon */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: '-22px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '46px',
                    height: '46px',
                    borderRadius: '50%',
                    backgroundColor: '#e31937',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 15px rgba(227, 25, 55, 0.45)',
                    border: '3px solid #ffffff',
                    zIndex: 2
                  }}
                >
                  {pillar.icon || <Utensils size={22} color="#ffffff" />}
                </div>
              </div>

              {/* Card Body */}
              <div style={{ padding: '34px 24px 26px', textAlign: 'center', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <h3
                  style={{
                    fontSize: '20px',
                    fontWeight: 700,
                    color: '#1a1a1a',
                    marginBottom: '10px'
                  }}
                >
                  {pillar.title}
                </h3>

                <p
                  style={{
                    fontSize: '15px',
                    color: '#666666',
                    lineHeight: '24px',
                    marginBottom: '20px',
                    flex: 1
                  }}
                >
                  {pillar.description}
                </p>

                <button
                  type="button"
                  onClick={onOpenDonate}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    color: '#e31937',
                    fontWeight: 700,
                    fontSize: '14.5px',
                    border: 'none',
                    background: 'none',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.textDecoration = 'underline')}
                  onMouseLeave={(e) => (e.currentTarget.style.textDecoration = 'none')}
                >
                  <span>{pillar.action || 'Support Seva'}</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
