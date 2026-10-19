import React from 'react';
import { useCms } from '../context/CmsContext';

export default function HowWeWorkSection() {
  const { homepageData } = useCms();
  const workData = homepageData?.howWeWork || {};

  const defaultSteps = [
    {
      id: 1,
      iconImg: '/home-page-image/icon1.png',
      fallbackIcon: '/home-page-image/icon1-1.png',
      title: 'Identifying Needs',
      description: 'Grassroots surveys in remote tribal and drought-affected regions to identify families in severe need of food, water, and schooling.'
    },
    {
      id: 2,
      iconImg: '/home-page-image/icon2.png',
      fallbackIcon: '/home-page-image/icon2-1.png',
      title: 'Planning & Execution',
      description: 'Systematic logistical planning and volunteer coordination to ensure maximum impact with zero administrative overhead waste.'
    },
    {
      id: 3,
      iconImg: '/home-page-image/icon3.png',
      fallbackIcon: '/home-page-image/icon3-1.png',
      title: 'Transparent Delivery',
      description: 'Direct door-to-door and village-square distribution of cooked prasad, ration bags, school kits, and veterinary care.'
    },
    {
      id: 4,
      iconImg: '/home-page-image/icon4.png',
      fallbackIcon: '/home-page-image/icon1.png',
      title: 'Long-term Impact',
      description: 'Continuous monitoring through residential Gurukul education, monthly medical health camps, and sustainable gaushala ecosystems.'
    }
  ];

  const rawSteps = workData.steps;
  const stepsArray = Array.isArray(rawSteps)
    ? rawSteps
    : (rawSteps && typeof rawSteps === 'object')
      ? Object.values(rawSteps)
      : [];
  const steps = stepsArray.length > 0 ? stepsArray : defaultSteps;

  return (
    <section 
      id="how-we-work"
      style={{
        padding: '80px 0',
        backgroundColor: '#f8f8f8',
        backgroundImage: 'url(/home-page-image/work-process-bg.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        position: 'relative'
      }}
    >
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        
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
          <h2 
            style={{
              fontSize: 'clamp(28px, 3.2vw, 38px)',
              fontWeight: 800,
              color: '#1a1a1a',
              marginBottom: '10px'
            }}
          >
            {workData.headingPrefix || 'How '}
            <span style={{ color: '#d59a1a' }}>
              {workData.headingHighlight || 'We Work?'}
            </span>
          </h2>

          <p 
            style={{
              fontSize: '16px',
              color: '#666666',
              maxWidth: '620px',
              margin: '0 auto'
            }}
          >
            {workData.subheading ||
              'A transparent and compassionate 4-step framework ensuring every contribution transforms lives directly.'}
          </p>
        </div>

        {/* 2x2 Grid of Cards */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '24px',
            maxWidth: '960px',
            margin: '0 auto'
          }}
        >
          {steps.map((step) => (
            <div
              key={step.id}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(6px)',
                borderRadius: '18px',
                padding: '28px 24px',
                border: '1px solid #ebebeb',
                boxShadow: '0 8px 25px rgba(0, 0, 0, 0.05)',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '18px',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 14px 35px rgba(0, 0, 0, 0.09)';
                e.currentTarget.style.borderColor = '#d59a1a';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.04)';
                e.currentTarget.style.borderColor = '#ebebeb';
              }}
            >
              {/* Icon Image from home page image */}
              <div 
                style={{
                  width: '54px',
                  height: '54px',
                  borderRadius: '14px',
                  backgroundColor: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.08)',
                  border: '1px solid #eee'
                }}
              >
                <img 
                  src={step.iconImg} 
                  alt={step.title}
                  style={{ width: '32px', height: '32px', objectFit: 'contain' }}
                  onError={(e) => {
                    e.currentTarget.src = step.fallbackIcon;
                  }}
                />
              </div>

              {/* Text */}
              <div>
                <h3 
                  style={{
                    fontSize: '18px',
                    fontWeight: 700,
                    color: '#1a1a1a',
                    marginBottom: '6px'
                  }}
                >
                  {step.title}
                </h3>

                <p 
                  style={{
                    fontSize: '14.5px',
                    color: '#666666',
                    lineHeight: '23px'
                  }}
                >
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
