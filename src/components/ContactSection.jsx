import React from 'react';
import ContactForm7 from './ContactForm7';
import { useCms } from '../context/CmsContext';

export default function ContactSection() {
  const { homepageData } = useCms();
  const contact = homepageData?.contactSection || homepageData?.contactAndFooter || {};

  return (
    <section 
      id="contact"
      style={{
        padding: '75px 0 85px',
        backgroundColor: '#faf8f4',
        borderTop: '1px solid #eee',
        position: 'relative'
      }}
    >
      <div className="container">
        
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
            {contact.badge || 'GET IN TOUCH'}
          </div>

          <h2 
            style={{
              fontSize: 'clamp(28px, 3.2vw, 38px)',
              fontWeight: 800,
              color: '#1a1a1a',
              marginBottom: '10px'
            }}
          >
            {contact.heading || 'Contact Sahast Foundation'}
          </h2>

          <p 
            style={{
              fontSize: '16px',
              color: '#666666',
              maxWidth: '620px',
              margin: '0 auto'
            }}
          >
            {contact.subheading ||
              'Have queries regarding Gurukul admission, Gau Seva sponsorship, or attending spiritual Kathas? Send us an inquiry.'}
          </p>
        </div>

        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '40px',
            alignItems: 'flex-start'
          }}
        >
          {/* Left Column: Direct Info Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div 
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '16px',
                padding: '24px',
                border: '1px solid #eaeaea',
                boxShadow: '0 4px 15px rgba(0,0,0,0.04)',
                display: 'flex',
                gap: '16px',
                alignItems: 'flex-start'
              }}
            >
              <div 
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '12px',
                  backgroundColor: '#fff1f2',
                  color: '#e31937',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '20px',
                  flexShrink: 0
                }}
              >
                <i className="fas fa-map-marker-alt"></i>
              </div>
              <div>
                <h4 style={{ fontSize: '17px', fontWeight: 700, color: '#111', marginBottom: '4px' }}>
                  {contact.addressTitle || 'Dham Address'}
                </h4>
                <p style={{ fontSize: '14.5px', color: '#666', lineHeight: '22px' }}>
                  {contact.address || contact.templeAddress || 'Shri Bharat Mata Statue Site, Shri Guru Puram Ashram, Takhatgarh, Pali'}
                </p>
              </div>
            </div>

            <div 
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '16px',
                padding: '24px',
                border: '1px solid #eaeaea',
                boxShadow: '0 4px 15px rgba(0,0,0,0.04)',
                display: 'flex',
                gap: '16px',
                alignItems: 'flex-start'
              }}
            >
              <div 
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '12px',
                  backgroundColor: '#fffbeb',
                  color: '#d59a1a',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '20px',
                  flexShrink: 0
                }}
              >
                <i className="fas fa-phone-alt"></i>
              </div>
              <div>
                <h4 style={{ fontSize: '17px', fontWeight: 700, color: '#111', marginBottom: '4px' }}>
                  {contact.phoneTitle || 'Phone / WhatsApp'}
                </h4>
                <p style={{ fontSize: '14.5px', color: '#666', lineHeight: '22px' }}>
                  <a href={`tel:${(contact.phone || '+918696298489').replace(/\s+/g, '')}`} style={{ color: 'inherit' }}>
                    {contact.phone || '+91 8696298489'}
                  </a>
                </p>
              </div>
            </div>

            <div 
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '16px',
                padding: '24px',
                border: '1px solid #eaeaea',
                boxShadow: '0 4px 15px rgba(0,0,0,0.04)',
                display: 'flex',
                gap: '16px',
                alignItems: 'flex-start'
              }}
            >
              <div 
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '12px',
                  backgroundColor: '#eff6ff',
                  color: '#2563eb',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '20px',
                  flexShrink: 0
                }}
              >
                <i className="fas fa-envelope"></i>
              </div>
              <div>
                <h4 style={{ fontSize: '17px', fontWeight: 700, color: '#111', marginBottom: '4px' }}>
                  {contact.emailTitle || 'Email Address'}
                </h4>
                <p style={{ fontSize: '14.5px', color: '#666', lineHeight: '22px' }}>
                  <a href={`mailto:${contact.email || 'info@sahastfoundation.in'}`} style={{ color: 'inherit' }}>
                    {contact.email || 'info@sahastfoundation.in'}
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form 7 implementation */}
          <div 
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '20px',
              padding: '32px',
              border: '1px solid #e5e7eb',
              boxShadow: '0 10px 30px rgba(0,0,0,0.05)'
            }}
          >
            <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#111', marginBottom: '18px' }}>
              {contact.formTitle || 'Send an Online Inquiry'}
            </h3>
            <ContactForm7 />
          </div>

        </div>

      </div>
    </section>
  );
}
