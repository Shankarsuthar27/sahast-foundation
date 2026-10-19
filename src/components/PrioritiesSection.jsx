import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useCms } from '../context/CmsContext';

export default function PrioritiesSection({ onOpenDonate }) {
  const { homepageData } = useCms();
  const prioritiesData = homepageData?.priorities || {};

  const defaultPriorities = [
    {
      id: 1,
      image: '/home-page-image/WhatsApp-Image-2026-05-28-at-16.38.59sss.jpeg',
      fallback: '/home-page-image/WhatsApp-Image-2026-05-26-at-21.23.395-e1779955852314.jpeg',
      title: 'Free Food / Annadaan',
      description: 'Distributing thousands of hot, nutritious meals every month to pilgrims, sadhus, and families facing food insecurity.',
      action: 'Learn More'
    },
    {
      id: 2,
      image: '/home-page-image/WhatsApp-Image-2026-05-28-at-16.39.00ds.jpeg',
      fallback: '/home-page-image/WhatsApp-Image-2026-05-26-at-21.23.400-e1779955447139.jpeg',
      title: 'Tribal Education',
      description: 'Empowering children from remote tribal belts with free residential schooling, books, computers, and moral character building.',
      action: 'Learn More'
    },
    {
      id: 3,
      image: '/home-page-image/WhatsApp-Image-2026-05-28-at-16.39.02ad.jpeg',
      fallback: '/home-page-image/WhatsApp-Image-2026-05-28-at-13.31.06-e1779955352658.jpeg',
      title: 'Relief & Ration Kits',
      description: 'Delivering essential dry rations, clean drinking water, warm blankets, and medical first-aid kits during emergencies.',
      action: 'Learn More'
    },
    {
      id: 4,
      image: '/home-page-image/WhatsApp-Image-2026-05-28-at-16.39.05fsf.jpeg',
      fallback: '/home-page-image/WhatsApp-Image-2026-05-26-at-21.23.523-e1779814853502.jpeg',
      title: 'Spiritual Guidance',
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

  return (
    <section 
      id="priorities"
      style={{
        padding: '70px 0',
        backgroundColor: '#ffffff',
        position: 'relative'
      }}
    >
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
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '24px'
          }}
        >
          {priorities.map((item) => (
            <div
              key={item.id}
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
                    e.currentTarget.src = item.fallback;
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
                  <span>{item.action}</span>
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
