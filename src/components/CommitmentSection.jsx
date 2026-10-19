import React from 'react';
import { Heart, Sparkles } from 'lucide-react';
import { useCms } from '../context/CmsContext';

export default function CommitmentSection({ onOpenDonate }) {
  const { homepageData } = useCms();
  const c = homepageData?.commitment || {};

  return (
    <section 
      style={{
        padding: '80px 0',
        backgroundColor: '#faf8f4',
        position: 'relative',
        borderTop: '1px solid #f0ece1',
        borderBottom: '1px solid #f0ece1'
      }}
    >
      <div className="container" style={{ position: 'relative' }}>
        
        {/* Right side indicator ribbon */}
        <div 
          style={{
            position: 'absolute',
            right: '-12px',
            top: '45%',
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
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '50px',
            alignItems: 'center'
          }}
        >
          {/* Left Column: Full-Length Portrait of Maharaj Ji from home page image */}
          <div style={{ position: 'relative' }}>
            <div 
              style={{
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: '0 20px 45px rgba(0, 0, 0, 0.12)',
                border: '6px solid #ffffff',
                height: '520px',
                position: 'relative',
                backgroundColor: '#eee'
              }}
            >
              <img 
                src={c.image || "/home-page-image/guruji-1.jpeg"} 
                alt="Pujya Swami Shri Abhaydas Ji Maharaj"
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
                onError={(e) => {
                  e.currentTarget.src = "/home-page-image/guruji.jpeg";
                }}
              />
            </div>

            {/* Floating badge */}
            <div 
              style={{
                position: 'absolute',
                bottom: '24px',
                left: '24px',
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(8px)',
                padding: '10px 18px',
                borderRadius: '14px',
                boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <Sparkles size={18} color="#d59a1a" />
              <div>
                <div style={{ fontSize: '13px', fontWeight: 800, color: '#1a1a1a' }}>{c.guruName || 'Pujya Swami Shri Abhaydas Ji'}</div>
                <div style={{ fontSize: '11px', color: '#666666' }}>{c.guruTitle || '5th Acharya, Sadguru Trikam Das Ji Dham'}</div>
              </div>
            </div>
          </div>

          {/* Right Column: Commitment Text & Stat */}
          <div>
            <div 
              style={{
                display: 'inline-block',
                color: '#e31937',
                fontSize: '13.5px',
                fontWeight: 800,
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                marginBottom: '12px'
              }}
            >
              {c.badge || 'EMPOWERING COMMUNITIES'}
            </div>

            <h2 
              style={{
                fontSize: 'clamp(28px, 3.2vw, 40px)',
                fontWeight: 800,
                color: '#1a1a1a',
                lineHeight: 1.25,
                marginBottom: '20px'
              }}
            >
              {c.heading || 'We Are Committed to Transforming Thousands of Lives Through Education, Seva & Spiritual Guidance'}
            </h2>

            <p 
              style={{
                fontSize: '17px',
                color: '#555555',
                lineHeight: '29px',
                marginBottom: '24px'
              }}
            >
              {c.description ||
                'At the tender age of four, Pujya Abhaydas Ji Maharaj embraced the divine path of spiritual initiation under Acharya Shri Nirbhaydas Ji Maharaj Shri. Today, through Sahast Foundation, his vision brings holistic transformation: educating 500+ tribal students in Takhatgarh, serving thousands with daily annakshetra, and nurturing cows in dedicated gaushalas.'}
            </p>

            {/* Impressive Counter Stat from Screenshot */}
            <div 
              style={{
                marginBottom: '32px',
                paddingBottom: '20px',
                borderBottom: '2px dashed #e2ded4'
              }}
            >
              <div 
                style={{
                  fontSize: 'clamp(36px, 4vw, 48px)',
                  fontWeight: 900,
                  color: '#e31937',
                  lineHeight: 1.1,
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: '10px'
                }}
              >
                <span>{c.statNumber || '1,00,000+'}</span>
                <span style={{ fontSize: '20px', fontWeight: 700, color: '#1a1a1a' }}>{c.statLabel || 'Lives Impacted'}</span>
              </div>
              <p style={{ fontSize: '14.5px', color: '#777777', marginTop: '6px' }}>
                {c.statSubtext || 'Across Rajasthan, Gujarat, and nationwide community outreach programs.'}
              </p>
            </div>

            {/* Donate CTA Button with Heart */}
            <button
              onClick={onOpenDonate}
              className="btn-primary"
              style={{
                padding: '14px 34px',
                fontSize: '16px',
                backgroundColor: '#e31937',
                borderRadius: '10px',
                boxShadow: '0 6px 22px rgba(227, 25, 55, 0.4)'
              }}
            >
              <Heart size={18} fill="#ffffff" />
              <span>Donate Now</span>
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
