import React, { useState, useEffect } from 'react';
import Logo from './Logo';
import { Phone, Mail, Clock, Search, Menu, X, Heart, Globe, MapPin, ChevronRight } from 'lucide-react';

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

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'Home', href: '#home', emoji: '🏠' },
    { label: 'About Us', href: '#about', emoji: '🙏' },
    { label: 'Our Priorities', href: '#priorities', emoji: '⭐' },
    { label: 'Gurukul', href: '#gurukul', emoji: '📚' },
    { label: 'How We Work', href: '#how-we-work', emoji: '💡' },
    { label: 'Blogs', href: '#blogs', emoji: '📝' },
    { label: 'Contact', href: '#contact', emoji: '📞' },
  ];

  const closeMobile = () => setMobileMenuOpen(false);

  return (
    <header style={{
      width: '100%',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      backgroundColor: '#ffffff',
      boxShadow: isScrolled ? '0 4px 20px rgba(0,0,0,0.10)' : '0 1px 0 #f0f0f0',
      transition: 'box-shadow 0.3s ease'
    }}>

      {/* ── Top Notification Bar ── */}
      <div className="header-topbar">
        <div className="container-wide" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '6px' }}>
          {/* Left info items */}
          <div className="topbar-left">
            <span className="topbar-item topbar-hide-xs">
              <MapPin size={13} color="#b80f27" />
              Shri Guru Puram Ashram, Takhatgarh, Pali
            </span>
            <span className="topbar-item">
              <Phone size={13} color="#b80f27" />
              <a href="tel:+918696298489" style={{ color: 'inherit' }}>+91 8696298489</a>
            </span>
            <span className="topbar-item topbar-hide-sm">
              <Mail size={13} color="#b80f27" />
              <a href="mailto:info@sahastfoundation.in" style={{ color: 'inherit' }}>info@sahastfoundation.in</a>
            </span>
          </div>

          {/* Right info items */}
          <div className="topbar-right">
            <span className="topbar-item topbar-hide-sm">
              <Clock size={13} color="#b80f27" />
              Darshan: 7:00 AM – 8:00 PM
            </span>
            <div style={{ display: 'inline-flex', alignItems: 'center', background: 'rgba(255,255,255,0.4)', borderRadius: '14px', padding: '1px 8px', gap: '4px' }}>
              <Globe size={11} />
              <button
                onClick={() => setActiveLang('hi')}
                style={{ fontSize: '11px', fontWeight: activeLang === 'hi' ? 800 : 500, color: '#111', background: 'none', border: 'none', cursor: 'pointer' }}
                aria-label="Switch to Hindi"
              >
                हिंदी
              </button>
              <span style={{ opacity: 0.5 }}>|</span>
              <button
                onClick={() => setActiveLang('en')}
                style={{ fontSize: '11px', fontWeight: activeLang === 'en' ? 800 : 500, color: '#111', background: 'none', border: 'none', cursor: 'pointer' }}
                aria-label="Switch to English"
              >
                EN
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main Navbar ── */}
      <div style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #f0f0f0' }}>
        <div className="container-wide" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 20px', minHeight: '72px' }}>

          {/* Logo */}
          <a href="#home" style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }} aria-label="Sahast Foundation Home">
            <Logo />
          </a>

          {/* Desktop Nav */}
          <nav className="desktop-nav" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="desktop-nav-link"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right CTAs */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
            {/* Search - hidden on tiny screens */}
            <button
              onClick={onOpenSearch}
              className="search-btn-header"
              aria-label="Search"
            >
              <Search size={17} />
            </button>

            {/* Donate button */}
            <button
              onClick={onOpenDonate}
              className="btn-primary header-donate-btn"
              aria-label="Make a Donation"
              style={{ padding: '10px 20px', fontSize: '14px', borderRadius: '6px 0 0 6px', borderRight: '1px solid rgba(255,255,255,0.2)', boxShadow: 'none' }}
            >
              <Heart size={15} fill="#ffffff" />
              <span>Donate</span>
            </button>

            {/* Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{
                backgroundColor: '#b80f27',
                color: '#ffffff',
                padding: '10px 13px',
                borderRadius: '0 6px 6px 0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                border: 'none',
                transition: 'background-color 0.2s ease',
                minWidth: '44px',
                minHeight: '44px'
              }}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={20} color="#ffffff" /> : <Menu size={20} color="#ffffff" />}
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile Drawer Overlay ── */}
      <div
        className={`mobile-overlay ${mobileMenuOpen ? 'mobile-overlay--open' : ''}`}
        onClick={closeMobile}
        aria-hidden="true"
      />

      {/* ── Mobile Drawer Panel ── */}
      <div
        className={`mobile-drawer ${mobileMenuOpen ? 'mobile-drawer--open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation Menu"
      >
        {/* Drawer Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid #f0f0f0',
          paddingBottom: '16px',
          marginBottom: '8px'
        }}>
          <Logo size="small" />
          <button
            onClick={closeMobile}
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              backgroundColor: '#f5f5f5',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#333'
            }}
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* Nav Links */}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={closeMobile}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '16px',
                fontWeight: 600,
                color: '#1a1a1a',
                padding: '13px 14px',
                borderRadius: '10px',
                textDecoration: 'none',
                transition: 'background 0.18s, color 0.18s',
                backgroundColor: 'transparent'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#fff1f3';
                e.currentTarget.style.color = '#e31937';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#1a1a1a';
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '17px' }}>{link.emoji}</span>
                {link.label}
              </span>
              <ChevronRight size={15} color="#ccc" />
            </a>
          ))}
        </nav>

        {/* Contact info in drawer */}
        <div style={{
          marginTop: '20px',
          padding: '16px',
          backgroundColor: '#faf8f4',
          borderRadius: '12px',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px'
        }}>
          <a href="tel:+918696298489" style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13.5px', color: '#333', textDecoration: 'none' }}>
            <Phone size={15} color="#e31937" />
            +91 8696298489
          </a>
          <a href="mailto:info@sahastfoundation.in" style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13.5px', color: '#333', textDecoration: 'none' }}>
            <Mail size={15} color="#e31937" />
            info@sahastfoundation.in
          </a>
        </div>

        {/* Bottom CTAs */}
        <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '10px', paddingTop: '20px' }}>
          <button
            onClick={() => { closeMobile(); onOpenDonate(); }}
            className="btn-primary"
            style={{ width: '100%', justifyContent: 'center', padding: '14px', fontSize: '15px' }}
          >
            <Heart size={16} fill="#ffffff" />
            Donate Now
          </button>
          <button
            onClick={() => { closeMobile(); if (onOpenVolunteer) onOpenVolunteer(); }}
            className="btn-gold"
            style={{ width: '100%', justifyContent: 'center', padding: '14px', fontSize: '15px' }}
          >
            Join as Volunteer
          </button>
        </div>
      </div>

      {/* Inline responsive styles */}
      <style>{`
        /* ── Top Bar ── */
        .header-topbar {
          background-color: #fabc3f;
          color: #222222;
          padding: 6px 0;
          font-size: 12.5px;
          font-weight: 600;
          border-bottom: 1px solid rgba(0,0,0,0.05);
        }
        .topbar-left, .topbar-right {
          display: flex;
          align-items: center;
          gap: 18px;
          flex-wrap: wrap;
        }
        .topbar-item {
          display: flex;
          align-items: center;
          gap: 5px;
        }
        .topbar-item a { color: inherit; text-decoration: none; }

        /* ── Desktop Nav ── */
        .desktop-nav {
          display: none;
          align-items: center;
          gap: 26px;
          font-weight: 600;
          font-size: 14.5px;
        }
        .desktop-nav-link {
          color: #333333;
          text-decoration: none;
          padding: 6px 0;
          transition: color 0.2s;
          position: relative;
          white-space: nowrap;
        }
        .desktop-nav-link:hover { color: #e31937; }
        .desktop-nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background: #e31937;
          transition: width 0.25s ease;
          border-radius: 2px;
        }
        .desktop-nav-link:hover::after { width: 100%; }

        /* ── Search Button ── */
        .search-btn-header {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: #f5f5f5;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #444;
          cursor: pointer;
          transition: background 0.2s;
          flex-shrink: 0;
        }
        .search-btn-header:hover { background: #e8e8e8; }

        /* ── Mobile Overlay ── */
        .mobile-overlay {
          display: none;
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0);
          z-index: 1100;
          transition: background 0.35s ease;
        }
        .mobile-overlay--open {
          display: block;
          background: rgba(0, 0, 0, 0.55);
          backdrop-filter: blur(2px);
        }

        /* ── Mobile Drawer ── */
        .mobile-drawer {
          position: fixed;
          top: 0;
          right: 0;
          width: min(340px, 92vw);
          height: 100%;
          background: #ffffff;
          z-index: 1200;
          padding: 24px 20px;
          display: flex;
          flex-direction: column;
          box-shadow: -6px 0 40px rgba(0,0,0,0.15);
          transform: translateX(100%);
          transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
          overflow-y: auto;
        }
        .mobile-drawer--open {
          transform: translateX(0);
        }

        /* ── Header Donate Button ── */
        .header-donate-btn { display: inline-flex; }

        /* ── Responsive Breakpoints ── */
        @media (min-width: 992px) {
          .desktop-nav { display: flex !important; }
        }

        /* Hide topbar items on small screens */
        @media (max-width: 640px) {
          .topbar-hide-sm { display: none !important; }
          .topbar-left { gap: 10px; }
          .topbar-right { gap: 8px; }
        }
        @media (max-width: 400px) {
          .topbar-hide-xs { display: none !important; }
          .header-donate-btn { display: none !important; }
        }
      `}</style>
    </header>
  );
}
