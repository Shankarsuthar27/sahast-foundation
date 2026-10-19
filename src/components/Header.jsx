import React, { useState, useEffect } from 'react';
import Logo from './Logo';
import { Phone, Mail, Clock, Search, Menu, X, Heart, Globe, MapPin } from 'lucide-react';

export default function Header({ onOpenDonate, onOpenSearch, onOpenVolunteer }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeLang, setActiveLang] = useState('hi');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About Us', href: '#about' },
    { label: 'Our Priorities', href: '#priorities' },
    { label: 'Gurukul', href: '#gurukul' },
    { label: 'How We Work', href: '#how-we-work' },
    { label: 'Blogs', href: '#blogs' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header style={{ width: '100%', position: 'sticky', top: 0, zIndex: 100, backgroundColor: '#ffffff', boxShadow: isScrolled ? '0 4px 20px rgba(0,0,0,0.08)' : 'none', transition: 'all 0.3s ease' }}>
      {/* Top Notification Bar - Golden Yellow Strip from Screenshot */}
      <div 
        style={{ 
          backgroundColor: '#fabc3f', 
          color: '#222222', 
          padding: '7px 0', 
          fontSize: '13.5px', 
          fontWeight: 600,
          borderBottom: '1px solid rgba(0,0,0,0.05)'
        }}
      >
        <div className="container-wide" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <MapPin size={14} color="#b80f27" />
              Shri Bharat Mata Statue Site, Shri Guru Puram Ashram, Takhatgarh, Pali
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Phone size={14} color="#b80f27" />
              <a href="tel:+918696298489" style={{ color: 'inherit' }}>+91 8696298489</a>
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Mail size={14} color="#b80f27" />
              <a href="mailto:info@sahastfoundation.in" style={{ color: 'inherit' }}>info@sahastfoundation.in</a>
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Clock size={14} color="#b80f27" />
              Darshan: 7:00 AM - 8:00 PM Daily
            </span>
            <div style={{ display: 'inline-flex', alignItems: 'center', background: 'rgba(255,255,255,0.4)', borderRadius: '14px', padding: '1px 8px', gap: '4px' }}>
              <Globe size={12} />
              <button 
                onClick={() => setActiveLang('hi')} 
                style={{ fontSize: '11.5px', fontWeight: activeLang === 'hi' ? 800 : 500, color: '#111' }}
                aria-label="Switch to Hindi"
              >
                हिंदी
              </button>
              <span style={{ opacity: 0.5 }}>|</span>
              <button 
                onClick={() => setActiveLang('en')} 
                style={{ fontSize: '11.5px', fontWeight: activeLang === 'en' ? 800 : 500, color: '#111' }}
                aria-label="Switch to English"
              >
                EN
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div style={{ borderBottom: '1px solid #f0f0f0', backgroundColor: '#ffffff' }}>
        <div className="container-wide" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 20px', minHeight: '84px' }}>
          
          {/* Logo Section */}
          <a href="#home" style={{ display: 'flex', alignItems: 'center' }} aria-label="Sahast Foundation Home">
            <Logo />
          </a>

          {/* Desktop Navigation Links */}
          <nav 
            style={{ 
              display: 'none', 
              alignItems: 'center', 
              gap: '30px',
              fontWeight: 600,
              fontSize: '15.5px'
            }}
            className="desktop-nav"
          >
            {navLinks.map((link) => (
              <a 
                key={link.label}
                href={link.href}
                style={{ 
                  color: '#333333', 
                  transition: 'color 0.2s',
                  position: 'relative',
                  padding: '6px 0'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#e31937'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#333333'}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Action Section matching Screenshot with Red Box CTA */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            {/* Search Icon */}
            <button
              onClick={onOpenSearch}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: '#f5f5f5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#444'
              }}
              aria-label="Search site content"
            >
              <Search size={18} />
            </button>

            {/* Red Block CTA from Screenshot */}
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <button
                onClick={onOpenDonate}
                className="btn-primary"
                style={{
                  padding: '12px 24px',
                  fontSize: '15px',
                  backgroundColor: '#e31937',
                  borderRadius: '6px 0 0 6px',
                  boxShadow: '0 4px 15px rgba(227, 25, 55, 0.35)',
                  borderRight: '1px solid rgba(255,255,255,0.2)'
                }}
                aria-label="Make a Donation"
              >
                <Heart size={16} fill="#ffffff" />
                <span>Donate</span>
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                style={{
                  backgroundColor: '#b80f27',
                  color: '#ffffff',
                  padding: '12px 14px',
                  borderRadius: '0 6px 6px 0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
                aria-label="Toggle menu"
              >
                <Menu size={20} color="#ffffff" />
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div 
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.6)',
            zIndex: 999,
            display: 'flex',
            justifyContent: 'flex-end'
          }}
          onClick={() => setMobileMenuOpen(false)}
        >
          <div 
            style={{
              width: '320px',
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
              <Logo size="small" />
              <button onClick={() => setMobileMenuOpen(false)} aria-label="Close menu">
                <X size={22} />
              </button>
            </div>

            <nav style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '10px' }}>
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    fontSize: '17px',
                    fontWeight: 600,
                    color: '#333333',
                    padding: '8px 0',
                    borderBottom: '1px dashed #eee'
                  }}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <button
                onClick={() => { setMobileMenuOpen(false); onOpenDonate(); }}
                className="btn-primary"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                <Heart size={16} fill="#ffffff" />
                Donate Now
              </button>
              <button
                onClick={() => { setMobileMenuOpen(false); onOpenVolunteer(); }}
                className="btn-gold"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                Join as Volunteer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Media query helper */}
      <style>{`
        @media (min-width: 992px) {
          .desktop-nav {
            display: flex !important;
          }
        }
      `}</style>
    </header>
  );
}
