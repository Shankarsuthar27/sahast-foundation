import React from 'react';
import { Heart, CheckCircle2, ArrowRight } from 'lucide-react';
import { useCms } from '../context/CmsContext';

export default function ServingHumanity({ onOpenDonate, onNavigateAbout }) {
  const { homepageData } = useCms();
  const about = homepageData?.about || {};

  return (
    <section 
      id="about"
      style={{
        padding: '70px 0 50px',
        backgroundColor: '#ffffff',
        position: 'relative'
      }}
    >
      <div className="container">
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '40px',
            alignItems: 'center'
          }}
        >
          {/* Left Card with Serving Humanity Content */}
          <div 
            style={{
              backgroundColor: '#ffffff',
              border: '1px solid #ebebeb',
              borderRadius: '24px',
              padding: '42px 36px',
              boxShadow: '0 12px 35px rgba(0, 0, 0, 0.06)',
              position: 'relative'
            }}
          >
            {/* Top Tag */}
            <div 
              style={{
                display: 'inline-block',
                color: '#e31937',
                fontSize: '13.5px',
                fontWeight: 800,
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                marginBottom: '14px',
                cursor: onNavigateAbout ? 'pointer' : 'default'
              }}
              onClick={onNavigateAbout}
            >
              {about.badge || 'ABOUT SAHAST FOUNDATION'}
            </div>

            <h2 
              style={{
                fontSize: 'clamp(26px, 3vw, 36px)',
                fontWeight: 800,
                color: '#1a1a1a',
                lineHeight: 1.25,
                marginBottom: '18px'
              }}
            >
              {about.heading || 'Serving Humanity with Devotion'}
            </h2>

            <p 
              style={{
                fontSize: '17px',
                color: '#666666',
                lineHeight: '28px',
                marginBottom: '24px'
              }}
            >
              {about.description ||
                'Make a difference today by supporting our humanitarian initiatives across India. Rooted in the sacred tradition of Sadguru Trikam Das Ji Dham, we uplift tribal children, protect indigenous cows, and distribute daily meals to all who seek shelter.'}
            </p>

            {/* Key Service Highlights */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '30px' }}>
              {(() => {
                const rawPoints = about.points;
                const parsedPoints = Array.isArray(rawPoints)
                  ? rawPoints
                  : (rawPoints && typeof rawPoints === 'object' ? Object.values(rawPoints) : []);
                const pointsList = parsedPoints.length > 0 ? parsedPoints : [
                  'Nishkam Seva: 100% direct-to-beneficiary execution',
                  'Free CBSE-accredited Gurukul schooling for 500+ tribal students',
                  'Modern Gaushala sheltering 1,200+ desi cows'
                ];
                return pointsList.map((point, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '15.5px', color: '#333333' }}>
                    <CheckCircle2 size={18} color="#e31937" style={{ flexShrink: 0 }} />
                    <span>{point}</span>
                  </div>
                ));
              })()}
            </div>

            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
              <button 
                onClick={onOpenDonate}
                className="btn-primary"
                style={{
                  padding: '12px 28px',
                  fontSize: '15px'
                }}
              >
                <Heart size={16} fill="#ffffff" />
                <span>Contribute to Seva</span>
                <ArrowRight size={16} />
              </button>
              {onNavigateAbout && (
                <button
                  type="button"
                  onClick={onNavigateAbout}
                  className="btn-outline"
                  style={{
                    padding: '12px 24px',
                    fontSize: '15px',
                    borderColor: '#fabc3f',
                    color: '#1a1a1a'
                  }}
                >
                  <span>Know More About Us</span>
                  <ArrowRight size={16} />
                </button>
              )}
            </div>
          </div>

          {/* Right Image: Maharaj Ji with Village Children & Families from home page image */}
          <div style={{ position: 'relative' }}>
            <div 
              style={{
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: '0 20px 45px rgba(0, 0, 0, 0.12)',
                border: '4px solid #ffffff',
                height: '420px',
                position: 'relative'
              }}
            >
              <img 
                src={about.artworkImage || about.sideImage || "/home-page-image/WhatsApp-Image-2026-05-26-at-21.23.386-e1780038882424.jpeg"} 
                alt="Pujya Maharaj Ji"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={(e) => {
                  e.currentTarget.src = "/home-page-image/WhatsApp-Image-2026-05-26-at-21.23.523-e1779814853502.jpeg";
                }}
              />
              <div 
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 40%)'
                }} 
              />
            </div>

            {/* Right Ribbon Indicator from Screenshot */}
            <div 
              style={{
                position: 'absolute',
                right: '-12px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '14px',
                height: '38px',
                backgroundColor: '#e31937',
                borderRadius: '4px 0 0 4px',
                boxShadow: '0 2px 8px rgba(227, 25, 55, 0.5)'
              }}
            />
          </div>

        </div>
      </div>
    </section>
  );
}
