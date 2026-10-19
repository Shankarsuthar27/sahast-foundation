import React, { useState } from 'react';

export default function MainHeader({ onOpenDonate, onOpenVolunteer, onOpenSearch }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="main-header header-one bgc-yellow">
      {/* 1. Top Bar (header-top-wrap) */}
      <div className="header-top-wrap">
        <div className="top-inner">
          {/* Left side flex-aligned unordered list */}
          <ul className="top-left">
            <li>
              <i className="far fa-exclamation-triangle" aria-hidden="true"></i>
              <span>Your Support Helps Us Serve More People</span>
            </li>
          </ul>

          {/* Right side flex-aligned unordered list */}
          <ul className="top-right">
            <li>
              <a 
                href="#volunteer" 
                onClick={(e) => { 
                  e.preventDefault(); 
                  if (onOpenVolunteer) onOpenVolunteer(); 
                }}
              >
                <i className="fal fa-hands-helping fas fa-hands-holding-circle" aria-hidden="true"></i>
                <b>Become Volunteer</b>
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* 2. Upper Header (header-upper) */}
      <div className="header-upper">
        <div className="upper-inner">
          {/* Logo Area (logo-outer) */}
          <div className="logo-outer">
            <a href="/" aria-label="Sahast Foundation Homepage">
              <img 
                src="/home-page-image/sahast-foundation-logo.png" 
                alt="Sahast Foundation Logo" 
                onError={(e) => {
                  e.currentTarget.src = "/images/img_1.png";
                }}
              />
            </a>
          </div>

          {/* Navigation Area (nav-outer) */}
          <div className="nav-outer">
            <nav className="main-menu navbar-expand-lg" aria-label="Main Navigation">
              {/* Mobile-specific logo header */}
              <div className="navbar-header">
                <a href="/" aria-label="Sahast Foundation Mobile Home">
                  <img 
                    src="/home-page-image/sahast-foundation-logo.png" 
                    alt="Sahast Foundation Mobile Logo" 
                    style={{ height: '42px', width: 'auto' }}
                  />
                </a>
              </div>

              {/* Main Desktop Navigation Links */}
              <ul className="navigation">
                <li className="current"><a href="#home">Home</a></li>
                <li><a href="#about">About Us</a></li>
                <li><a href="#priorities">Our Priorities</a></li>
                <li><a href="#gurukul">Gurukul</a></li>
                <li><a href="#how-we-work">How We Work</a></li>
                <li><a href="#blogs">Blogs</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </nav>

            {/* Action Buttons: Search & Donate */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <button
                type="button"
                onClick={onOpenSearch}
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: '#f3f4f6',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: '#444'
                }}
                aria-label="Search"
              >
                <i className="fas fa-search" aria-hidden="true"></i>
              </button>

              <button
                type="button"
                onClick={onOpenDonate}
                className="btn-primary"
                style={{
                  padding: '12px 24px',
                  fontSize: '15px',
                  backgroundColor: '#e31937',
                  borderRadius: '8px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 15px rgba(227, 25, 55, 0.35)',
                  color: '#fff',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: 700
                }}
              >
                <i className="fas fa-heart" aria-hidden="true"></i>
                <span>Donate Now</span>
              </button>

              {/* Mobile Hamburger Button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '10px 12px',
                  borderRadius: '8px',
                  backgroundColor: '#fabc3f',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#111'
                }}
                className="mobile-toggle-btn"
                aria-label="Toggle Navigation Menu"
              >
                <i className={mobileMenuOpen ? "fas fa-times" : "fas fa-bars"} style={{ fontSize: '18px' }} aria-hidden="true"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div 
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.6)',
            zIndex: 99999,
            display: 'flex',
            justifyContent: 'flex-end'
          }}
          onClick={() => setMobileMenuOpen(false)}
        >
          <div 
            style={{
              width: '300px',
              backgroundColor: '#ffffff',
              height: '100%',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              boxShadow: '-4px 0 25px rgba(0,0,0,0.15)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #eee', paddingBottom: '12px' }}>
              <img 
                src="/home-page-image/sahast-foundation-logo.png" 
                alt="Sahast Foundation" 
                style={{ height: '42px', width: 'auto' }} 
              />
              <button 
                onClick={() => setMobileMenuOpen(false)} 
                style={{ border: 'none', background: 'none', fontSize: '20px', cursor: 'pointer' }}
                aria-label="Close menu"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>

            <nav style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '10px' }}>
              {['Home', 'About Us', 'Our Priorities', 'Gurukul', 'How We Work', 'Blogs', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    fontSize: '16px',
                    fontWeight: 600,
                    color: '#333333',
                    padding: '8px 0',
                    borderBottom: '1px dashed #eee',
                    textDecoration: 'none'
                  }}
                >
                  {item}
                </a>
              ))}
            </nav>

            <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button
                onClick={() => { setMobileMenuOpen(false); onOpenDonate(); }}
                className="btn-primary"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                <i className="fas fa-heart"></i> Donate Now
              </button>
              <button
                onClick={() => { setMobileMenuOpen(false); onOpenVolunteer(); }}
                className="btn-gold"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                <i className="fal fa-hands-helping fas fa-hands-holding-circle"></i> Become Volunteer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Media query helper */}
      <style>{`
        @media (min-width: 992px) {
          .mobile-toggle-btn {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
}
