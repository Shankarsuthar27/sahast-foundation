import React from 'react';
import { Utensils, HeartHandshake, GraduationCap, ArrowRight } from 'lucide-react';
import { useCms } from '../context/CmsContext';

export default function PillarCards({ onOpenDonate }) {
  const { homepageData } = useCms();
  const customPillars = homepageData?.pillars;

  const defaultPillars = [

    {
      id: 1,
      image: '/home-page-image/WhatsApp-Image-2026-05-26-at-21.23.3866-e1779814834826.jpeg',
      fallbackImage: '/home-page-image/WhatsApp-Image-2026-05-26-at-21.23.395-e1779955852314.jpeg',
      icon: <Utensils size={22} color="#ffffff" />,
      title: 'Annakshetra Seva',
      description: 'Serving wholesome, freshly-prepared satvik meals daily to hundreds of sadhus, pilgrims, and impoverished families.',
      action: 'Support Annadan'
    },
    {
      id: 2,
      image: '/home-page-image/WhatsApp-Image-2026-05-26-at-21.23.40-e1779954909287.jpeg',
      fallbackImage: '/home-page-image/WhatsApp-Image-2026-05-26-at-21.23.523-e1779814853502.jpeg',
      icon: <HeartHandshake size={22} color="#ffffff" />,
      title: 'Mission & Values',
      description: 'Preserving Sanatan moral principles and spiritual traditions to awaken compassion, character, and harmony in every household.',
      action: 'Learn Our Values'
    },
    {
      id: 3,
      image: '/home-page-image/WhatsApp-Image-2026-05-28-at-13.35.48-e1779956288882.jpeg',
      fallbackImage: '/home-page-image/WhatsApp-Image-2026-05-26-at-21.24.2745-1-e1779955723374.jpeg',
      icon: <GraduationCap size={22} color="#ffffff" />,
      title: 'Child Education & Care',
      description: 'Sponsoring comprehensive Gurukul residential education, books, nutrition, and sanskars for 500+ rural and tribal youth.',
      action: 'Sponsor a Student'
    }
  ];

  const parsedPillars = Array.isArray(customPillars)
    ? customPillars
    : (customPillars && typeof customPillars === 'object' ? Object.values(customPillars) : []);
  const pillars = parsedPillars.length > 0 ? parsedPillars : defaultPillars;

  return (
    <section style={{ padding: '30px 0 60px', backgroundColor: '#ffffff', position: 'relative' }}>
      <div className="container" style={{ position: 'relative' }}>
        
        {/* Right side indicator ribbon */}
        <div 
          style={{
            position: 'absolute',
            right: '-12px',
            top: '40%',
            width: '14px',
            height: '38px',
            backgroundColor: '#e31937',
            borderRadius: '4px 0 0 4px',
            boxShadow: '0 2px 8px rgba(227, 25, 55, 0.4)'
          }}
        />

        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
            gap: '28px'
          }}
        >
          {pillars.map((pillar) => (
            <div
              key={pillar.id}
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
                    e.currentTarget.src = pillar.fallbackImage;
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
                  {pillar.icon}
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
                  onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
                  onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}
                >
                  <span>{pillar.action}</span>
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
