import React, { useState } from 'react';
import { Mail, ArrowRight, ChevronsUp } from 'lucide-react';
import { useCms } from '../context/CmsContext';

export default function Footer({ onNavigate }) {
  const { homepageData } = useCms();
  const footerData = homepageData?.footer || homepageData?.contactAndFooter || {};
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 5000);
      setEmailInput('');
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <footer
        id="footer-section"
        style={{
          position: 'relative',
          backgroundColor: '#07122b',
          backgroundImage: 'linear-gradient(rgba(7, 18, 43, 0.95), rgba(7, 18, 43, 0.96)), url(/images/footer-bg.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          color: '#cbd5e1',
          padding: '70px 0 60px',
          overflow: 'hidden'
        }}
      >
        <div style={{ maxWidth: '1320px', margin: '0 auto', padding: '0 24px' }}>
          {/* 1. Newsletter Box Matching Reference Screenshot */}
          <div
            style={{
              textAlign: 'center',
              marginBottom: '65px',
              paddingBottom: '50px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
            }}
          >
            <h3
              style={{
                fontFamily: '"PT Sans", "Georgia", serif',
                fontSize: 'clamp(24px, 3.2vw, 32px)',
                fontWeight: 700,
                color: '#ffffff',
                marginBottom: '26px'
              }}
            >
              {footerData.newsletterHeading || 'Get Our Newsletter'}
            </h3>

            <form
              onSubmit={handleSubscribe}
              style={{
                maxWidth: '520px',
                margin: '0 auto',
                display: 'flex',
                alignItems: 'center',
                backgroundColor: 'rgba(7, 18, 43, 0.85)',
                border: '1.5px solid rgba(255, 255, 255, 0.22)',
                borderRadius: '50px',
                padding: '4px 4px 4px 18px',
                boxShadow: '0 8px 30px rgba(0, 0, 0, 0.3)'
              }}
            >
              <Mail size={18} color="#94a3b8" style={{ flexShrink: 0 }} />
              <span style={{ color: 'rgba(255, 255, 255, 0.3)', margin: '0 12px', userSelect: 'none' }}>|</span>
              <input
                type="email"
                placeholder="Enter your email address here"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                required
                style={{
                  flex: 1,
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  color: '#ffffff',
                  fontSize: '14.5px',
                  fontStyle: 'italic',
                  padding: '8px 0'
                }}
              />
              <button
                type="submit"
                style={{
                  backgroundColor: '#fabc3f',
                  color: '#07122b',
                  fontWeight: 700,
                  fontSize: '14px',
                  border: 'none',
                  borderRadius: '50px',
                  padding: '12px 26px',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s ease, transform 0.2s ease',
                  whiteSpace: 'nowrap',
                  flexShrink: 0
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#e5ab37';
                  e.currentTarget.style.transform = 'scale(1.02)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#fabc3f';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                {subscribed ? 'Subscribed' : 'Submit Now'}
              </button>
            </form>
          </div>

          {/* 2. Four Column Footer Layout */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '40px',
              alignItems: 'start'
            }}
          >
            {/* Column 1: Sahast Hindi Logo & Mission */}
            <div>
              <div style={{ marginBottom: '20px' }}>
                <a
                  href="/"
                  onClick={(e) => {
                    e.preventDefault();
                    if (onNavigate) onNavigate('home');
                  }}
                  style={{ display: 'inline-block' }}
                >
                  <img
                    src="/images/sahast-foundation-logo.png"
                    alt="सहस्त फाउंडेशन"
                    style={{ height: '64px', width: 'auto', objectFit: 'contain' }}
                    onError={(e) => {
                      e.currentTarget.src = '/home-page-image/sahast-foundation-logo.png';
                    }}
                  />
                </a>
              </div>

              <p
                style={{
                  fontSize: '15px',
                  lineHeight: '26px',
                  color: '#cbd5e1',
                  margin: 0,
                  maxWidth: '300px'
                }}
              >
                {footerData.aboutText ||
                  'Empowering lives through education, seva, and spiritual guidance under Pujya Shree Abhay Das Maharaj.'}
              </p>
            </div>

            {/* Column 2: Need to talk to us? */}
            <div>
              <h4
                style={{
                  fontFamily: '"PT Sans", "Georgia", serif',
                  fontSize: '19px',
                  fontWeight: 700,
                  color: '#ffffff',
                  marginBottom: '22px'
                }}
              >
                Need to talk to us?
              </h4>

              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '14px',
                  fontSize: '14.5px',
                  lineHeight: '24px'
                }}
              >
                <li>
                  <span style={{ color: '#e31937', fontStyle: 'italic', fontWeight: 600 }}>Email: </span>
                  <a
                    href={`mailto:${footerData.email || 'info@sahastfoundation.in'}`}
                    style={{ color: '#ffffff', textDecoration: 'none', transition: 'color 0.2s ease' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#fabc3f')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#ffffff')}
                  >
                    {footerData.email || 'info@sahastfoundation.in'}
                  </a>
                </li>

                <li>
                  <span style={{ color: '#e31937', fontStyle: 'italic', fontWeight: 600 }}>Phone: </span>
                  <a
                    href={`tel:${(footerData.phone || '+918696298489').replace(/\s+/g, '')}`}
                    style={{ color: '#ffffff', textDecoration: 'none', transition: 'color 0.2s ease' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#fabc3f')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#ffffff')}
                  >
                    {footerData.phone || '+91 8696298489'}
                  </a>
                </li>

                <li>
                  <span style={{ color: '#e31937', fontStyle: 'italic', fontWeight: 600 }}>Map: </span>
                  <span style={{ color: '#ffffff' }}>
                    {footerData.address || 'Shri Bharat Mata Statue Site, Shri Guru Puram Ashram, Takhatgarh, Pali'}
                  </span>
                </li>
              </ul>
            </div>

            {/* Column 3: About Us */}
            <div>
              <h4
                style={{
                  fontFamily: '"PT Sans", "Georgia", serif',
                  fontSize: '19px',
                  fontWeight: 700,
                  color: '#ffffff',
                  marginBottom: '22px'
                }}
              >
                About Us
              </h4>

              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  fontSize: '15px'
                }}
              >
                <li>
                  <a
                    href="/about"
                    onClick={(e) => {
                      e.preventDefault();
                      if (onNavigate) onNavigate('about');
                    }}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      color: '#cbd5e1',
                      textDecoration: 'none',
                      transition: 'color 0.2s ease'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#fabc3f')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#cbd5e1')}
                  >
                    <ArrowRight size={15} style={{ color: 'inherit' }} />
                    <span>About Us</span>
                  </a>
                </li>

                <li>
                  <a
                    href="/contact"
                    onClick={(e) => {
                      e.preventDefault();
                      if (onNavigate) onNavigate('contact');
                    }}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      color: '#cbd5e1',
                      textDecoration: 'none',
                      transition: 'color 0.2s ease'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#fabc3f')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#cbd5e1')}
                  >
                    <ArrowRight size={15} style={{ color: 'inherit' }} />
                    <span>Contact Us</span>
                  </a>
                </li>

                <li>
                  <a
                    href="/about"
                    onClick={(e) => {
                      e.preventDefault();
                      if (onNavigate) onNavigate('about');
                    }}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      color: '#cbd5e1',
                      textDecoration: 'none',
                      transition: 'color 0.2s ease'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#fabc3f')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#cbd5e1')}
                  >
                    <ArrowRight size={15} style={{ color: 'inherit' }} />
                    <span>Our Leadership</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 4: Our Stories */}
            <div>
              <h4
                style={{
                  fontFamily: '"PT Sans", "Georgia", serif',
                  fontSize: '19px',
                  fontWeight: 700,
                  color: '#ffffff',
                  marginBottom: '22px'
                }}
              >
                Our Stories
              </h4>

              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  fontSize: '15px'
                }}
              >
                <li>
                  <a
                    href="/gallery"
                    onClick={(e) => {
                      e.preventDefault();
                      if (onNavigate) onNavigate('gallery');
                    }}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      color: '#cbd5e1',
                      textDecoration: 'none',
                      transition: 'color 0.2s ease'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#fabc3f')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#cbd5e1')}
                  >
                    <ArrowRight size={15} style={{ color: 'inherit' }} />
                    <span>Gallery</span>
                  </a>
                </li>

                <li>
                  <a
                    href="/event"
                    onClick={(e) => {
                      e.preventDefault();
                      if (onNavigate) onNavigate('events');
                    }}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      color: '#cbd5e1',
                      textDecoration: 'none',
                      transition: 'color 0.2s ease'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#fabc3f')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#cbd5e1')}
                  >
                    <ArrowRight size={15} style={{ color: 'inherit' }} />
                    <span>Events</span>
                  </a>
                </li>

                <li>
                  <a
                    href="/#blogs"
                    onClick={(e) => {
                      e.preventDefault();
                      if (onNavigate) onNavigate('home', '#blogs');
                    }}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      color: '#cbd5e1',
                      textDecoration: 'none',
                      transition: 'color 0.2s ease'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#fabc3f')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#cbd5e1')}
                  >
                    <ArrowRight size={15} style={{ color: 'inherit' }} />
                    <span>Blog</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>

      {/* 3. Golden Copyright Strip */}
      <div
        style={{
          backgroundColor: '#fabc3f',
          color: '#07122b',
          padding: '18px 0',
          textAlign: 'center',
          fontSize: '14.5px',
          fontWeight: 600,
          letterSpacing: '0.2px'
        }}
      >
        <div style={{ maxWidth: '1320px', margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
          <span>{footerData.copyrightText || 'Copyright © 2026, Sahast Foundation All Rights Reserved.'}</span>
          <span style={{ opacity: 0.4 }}>•</span>
          <a
            href="/admin"
            onClick={(e) => {
              e.preventDefault();
              if (onNavigate) onNavigate('admin');
            }}
            style={{ color: '#07122b', textDecoration: 'none', fontWeight: 700, fontSize: '13px', display: 'inline-flex', alignItems: 'center', gap: '4px', opacity: 0.8 }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.8')}
            title="Open Admin CMS"
          >
            <span>Admin Portal</span>
          </a>
        </div>
      </div>

      {/* 4. Red Floating Scroll to Top Button */}
      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Scroll to top"
        style={{
          position: 'fixed',
          right: '24px',
          bottom: '24px',
          width: '44px',
          height: '44px',
          backgroundColor: '#e31937',
          color: '#ffffff',
          borderRadius: '4px',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 14px rgba(227, 25, 55, 0.35)',
          zIndex: 999,
          transition: 'transform 0.2s ease, background-color 0.2s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#cc142f';
          e.currentTarget.style.transform = 'translateY(-3px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = '#e31937';
          e.currentTarget.style.transform = 'translateY(0)';
        }}
      >
        <ChevronsUp size={20} strokeWidth={2.4} />
      </button>
    </>
  );
}
