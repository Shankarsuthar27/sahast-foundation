import React, { useState, useEffect } from 'react';
import { Play, Check, ChevronRight } from 'lucide-react';

export default function AboutPage({ onNavigate, onOpenDonate, onOpenVolunteer, onOpenVideo }) {
  const [bannerBg, setBannerBg] = useState('/images/breadcrumb-03.jpg');

  useEffect(() => {
    const img = new Image();
    img.src = 'https://charitxa.lohatheme.com/wp-content/uploads/2024/02/banner.jpg';
    img.onload = () => setBannerBg('https://charitxa.lohatheme.com/wp-content/uploads/2024/02/banner.jpg');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="about-page-wrapper">
      <style>{`
        /* Global & Scoped styles for About Page */
        .about-page-wrapper {
          font-family: 'Lato', sans-serif;
          color: #666666;
          overflow-x: hidden;
        }

        /* 1. Page Banner */
        .ab-page-banner {
          position: relative;
          background-size: cover;
          background-position: center center;
          padding: 135px 0 95px;
          background-repeat: no-repeat;
          z-index: 1;
        }

        .ab-page-banner::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(8, 20, 50, 0.92) 0%, rgba(12, 28, 68, 0.88) 100%);
          z-index: -1;
        }

        .ab-banner-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 20px;
        }

        .ab-page-title {
          font-family: 'PT Sans', sans-serif;
          font-size: clamp(34px, 4.5vw, 50px);
          font-weight: 700;
          color: #ffffff;
          margin: 0;
          letter-spacing: -0.5px;
        }

        .ab-breadcrumb {
          display: flex;
          align-items: center;
          gap: 10px;
          list-style: none;
          margin: 0;
          padding: 0;
          font-size: 15px;
          font-weight: 600;
        }

        .ab-breadcrumb-item a {
          color: #fabc3f;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: color 0.2s;
        }

        .ab-breadcrumb-item a:hover {
          color: #ffffff;
        }

        .ab-breadcrumb-sep {
          color: rgba(255, 255, 255, 0.6);
          font-size: 14px;
        }

        .ab-breadcrumb-item.active {
          color: #ffffff;
        }

        /* 2. Chance to Learn / About Sahast Foundation */
        .ab-chance-section {
          padding: 95px 0;
          background-color: #ffffff;
        }

        .ab-chance-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
        }

        @media (max-width: 991px) {
          .ab-chance-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
        }

        .ab-tag {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: #e31937;
          font-size: 14px;
          font-weight: 700;
          text-transform: capitalize;
          margin-bottom: 12px;
          letter-spacing: 0.5px;
        }

        .ab-tag-bar {
          width: 3px;
          height: 16px;
          background-color: #e31937;
          border-radius: 2px;
        }

        .ab-heading {
          font-family: 'PT Sans', sans-serif;
          font-size: clamp(28px, 3.4vw, 40px);
          font-weight: 800;
          line-height: 1.25;
          color: #1e2430;
          margin-bottom: 20px;
        }

        .ab-heading span {
          color: #e31937;
        }

        .ab-lead-text {
          font-size: 16.5px;
          line-height: 29px;
          color: #555555;
          margin-bottom: 25px;
        }

        .ab-check-list {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .ab-check-item {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 15.5px;
          font-weight: 600;
          color: #2b313d;
        }

        .ab-check-icon {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background-color: #fee2e2;
          color: #e31937;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          flex-shrink: 0;
        }

        .ab-portrait-wrap {
          text-align: center;
          position: relative;
        }

        .ab-portrait-img {
          width: 100%;
          max-width: 480px;
          border-radius: 24px;
          box-shadow: 0 16px 45px rgba(0, 0, 0, 0.12);
          object-fit: cover;
          display: block;
          margin: 0 auto;
          transition: transform 0.4s ease;
          border: 4px solid #ffffff;
        }

        .ab-portrait-img:hover {
          transform: translateY(-5px);
        }

        /* 3. Counter Area / Compassionate Community */
        .ab-counter-section {
          padding: 85px 0 75px;
          background-color: #faf9f6;
          border-top: 1px solid #f0eee6;
          border-bottom: 1px solid #f0eee6;
          text-align: center;
        }

        .ab-counter-subtitle {
          color: #e31937;
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 1px;
          margin-bottom: 14px;
          text-transform: capitalize;
        }

        .ab-counter-main-title {
          font-family: 'PT Sans', sans-serif;
          font-size: clamp(24px, 3vw, 36px);
          font-weight: 800;
          color: #1a1a1a;
          line-height: 1.38;
          max-width: 860px;
          margin: 0 auto 55px;
        }

        .ab-highlight-pill {
          background-color: #ffde69;
          color: #1a1a1a;
          padding: 2px 14px;
          border-radius: 6px;
          display: inline-block;
          font-weight: 800;
          box-shadow: 0 2px 8px rgba(255, 222, 105, 0.4);
        }

        .ab-counter-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
          max-width: 980px;
          margin: 0 auto;
        }

        @media (max-width: 767px) {
          .ab-counter-grid {
            grid-template-columns: 1fr;
            gap: 35px;
          }
        }

        .ab-counter-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 10px 15px;
        }

        .ab-counter-number {
          font-family: 'PT Sans', sans-serif;
          font-size: 58px;
          font-weight: 900;
          color: #e31937;
          line-height: 1;
          margin-bottom: 10px;
        }

        .ab-counter-desc {
          font-size: 15px;
          line-height: 22px;
          color: #555555;
          font-style: italic;
          max-width: 240px;
        }

        /* 4. Our Inspiration & UN Impact Video Section */
        .ab-video-section {
          padding: 90px 0;
          background-color: #ffffff;
        }

        .ab-video-composition {
          display: grid;
          grid-template-columns: 1fr 1.15fr;
          gap: 40px;
          align-items: center;
          position: relative;
        }

        @media (max-width: 991px) {
          .ab-video-composition {
            grid-template-columns: 1fr;
            gap: 45px;
          }
        }

        .ab-yellow-card {
          background: #ffde69;
          border-radius: 28px;
          padding: 45px 38px;
          box-shadow: 0 15px 40px rgba(255, 222, 105, 0.25);
          position: relative;
          z-index: 2;
        }

        .ab-yc-tag {
          font-size: 13px;
          font-weight: 800;
          color: #e31937;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 10px;
        }

        .ab-yc-title {
          font-family: 'PT Sans', sans-serif;
          font-size: clamp(24px, 2.6vw, 32px);
          font-weight: 800;
          line-height: 1.28;
          color: #1a1a1a;
          margin-bottom: 18px;
        }

        .ab-yc-title span {
          color: #e31937;
        }

        .ab-yc-text {
          font-size: 14.5px;
          line-height: 25px;
          color: #2e2e2e;
          margin-bottom: 14px;
        }

        .ab-yc-stat {
          font-family: 'PT Sans', sans-serif;
          font-size: 40px;
          font-weight: 800;
          color: #e31937;
          margin-top: 15px;
          line-height: 1;
        }

        /* Overlapping Play Button */
        .ab-play-btn-circle {
          position: absolute;
          right: -32px;
          top: 50%;
          transform: translateY(-50%);
          width: 68px;
          height: 68px;
          border-radius: 50%;
          background: #e31937;
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 4px solid #ffffff;
          box-shadow: 0 8px 25px rgba(227, 25, 55, 0.45);
          cursor: pointer;
          z-index: 10;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .ab-play-btn-circle:hover {
          transform: translateY(-50%) scale(1.12);
          box-shadow: 0 12px 30px rgba(227, 25, 55, 0.6);
        }

        @media (max-width: 991px) {
          .ab-play-btn-circle {
            right: 25px;
            top: auto;
            bottom: -34px;
            transform: none;
          }
          .ab-play-btn-circle:hover {
            transform: scale(1.12);
          }
        }

        .ab-un-box {
          position: relative;
          border-radius: 28px;
          overflow: hidden;
          box-shadow: 0 18px 45px rgba(0, 0, 0, 0.15);
          height: 480px;
        }

        .ab-un-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .ab-un-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0, 0, 0, 0.88) 0%, rgba(0, 0, 0, 0.35) 45%, transparent 100%);
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 35px 32px;
          color: #ffffff;
        }

        .ab-un-sub {
          color: #ffde69;
          font-size: 13.5px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 8px;
        }

        .ab-un-title {
          font-family: 'PT Sans', sans-serif;
          font-size: clamp(20px, 2.4vw, 26px);
          font-weight: 700;
          line-height: 1.35;
          color: #ffffff;
          margin: 0;
        }

        /* 5. Our Priorities (sahast-priorities) */
        .ab-priorities-section {
          background: #ffffff;
          padding: 95px 20px;
          position: relative;
        }

        .ab-sp-container {
          max-width: 1200px;
          margin: auto;
        }

        .ab-sp-heading {
          text-align: center;
          margin-bottom: 60px;
          position: relative;
        }

        .ab-sp-heading .ab-star-mark {
          position: absolute;
          left: 50%;
          top: -24px;
          transform: translateX(-50%);
          font-size: 85px;
          color: #ffc928;
          opacity: 0.65;
          line-height: 1;
          z-index: 0;
          pointer-events: none;
        }

        .ab-sp-heading h2 {
          position: relative;
          z-index: 1;
          font-family: 'PT Sans', sans-serif;
          font-size: clamp(32px, 3.8vw, 48px);
          font-weight: 800;
          color: #2f2f2f;
          margin: 0 0 10px;
        }

        .ab-sp-heading p {
          position: relative;
          z-index: 1;
          font-size: 17px;
          color: #666666;
          margin: 0;
        }

        .ab-sp-heading:after {
          content: "";
          width: 45px;
          height: 3.5px;
          background: #e51b35;
          display: block;
          margin: 22px auto 0;
          border-radius: 20px;
        }

        .ab-sp-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 30px;
        }

        @media (max-width: 1024px) {
          .ab-sp-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 575px) {
          .ab-sp-grid {
            grid-template-columns: 1fr;
            gap: 35px;
          }
        }

        .ab-sp-card {
          text-align: center;
          transition: transform 0.4s ease;
        }

        .ab-sp-card:hover {
          transform: translateY(-8px);
        }

        .ab-sp-image-wrap {
          overflow: hidden;
          border-radius: 24px;
          position: relative;
          box-shadow: 0 8px 22px rgba(0, 0, 0, 0.08);
          transition: box-shadow 0.4s ease;
        }

        .ab-sp-card:hover .ab-sp-image-wrap {
          box-shadow: 0 25px 55px rgba(0, 0, 0, 0.18), 0 10px 25px rgba(229, 27, 53, 0.12);
        }

        .ab-sp-image-wrap img {
          width: 100%;
          aspect-ratio: 1 / 1;
          object-fit: cover;
          object-position: center;
          display: block;
          transition: transform 0.7s cubic-bezier(0.17, 0.67, 0.38, 1.05);
        }

        .ab-sp-card:hover img {
          transform: scale(1.09) rotate(1deg);
          filter: brightness(1.04);
        }

        .ab-sp-card h3 {
          font-family: 'PT Sans', sans-serif;
          font-size: 22px;
          line-height: 1.3;
          color: #333333;
          font-weight: 800;
          margin: 22px 0 10px;
        }

        .ab-sp-card p {
          font-size: 15px;
          line-height: 1.7;
          color: #b74a4a;
          margin: 0 auto;
          max-width: 260px;
        }

        /* 6. Testimonial Quote Banner & Red Box */
        .ab-quote-section {
          position: relative;
          padding: 100px 0;
          background-size: cover;
          background-position: center center;
          background-repeat: no-repeat;
          z-index: 1;
        }

        .ab-quote-section::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(10, 18, 42, 0.88) 0%, rgba(14, 25, 58, 0.85) 100%);
          z-index: -1;
        }

        .ab-quote-grid {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 50px;
          align-items: center;
        }

        @media (max-width: 991px) {
          .ab-quote-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
        }

        .ab-quote-left {
          text-align: center;
          color: #ffffff;
          padding: 20px;
        }

        .ab-quote-icon {
          font-size: 42px;
          color: #ffde69;
          margin-bottom: 20px;
          line-height: 1;
        }

        .ab-quote-text {
          font-family: 'PT Sans', sans-serif;
          font-size: clamp(22px, 2.4vw, 29px);
          font-style: italic;
          line-height: 1.55;
          color: #ffffff;
          font-weight: 500;
          margin: 0 0 25px;
        }

        .ab-quote-author {
          font-size: 16px;
          color: rgba(255, 255, 255, 0.85);
        }

        .ab-quote-author span {
          color: #ffde69;
          font-weight: 700;
        }

        .ab-red-cta-box {
          background-color: #e31937;
          border-radius: 24px;
          padding: 55px 42px;
          color: #ffffff;
          box-shadow: 0 20px 50px rgba(227, 25, 55, 0.35);
          cursor: pointer;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .ab-red-cta-box:hover {
          transform: translateY(-4px);
          box-shadow: 0 25px 60px rgba(227, 25, 55, 0.5);
        }

        .ab-red-cta-title {
          font-family: 'PT Sans', sans-serif;
          font-size: clamp(24px, 2.7vw, 32px);
          font-weight: 800;
          line-height: 1.35;
          color: #ffffff;
          margin-bottom: 18px;
        }

        .ab-red-cta-sub {
          font-size: 16px;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.95);
          text-decoration: underline;
          text-underline-offset: 4px;
          margin: 0;
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }
      `}</style>

      {/* 1. Page Banner */}
      <section 
        className="ab-page-banner"
        style={{ backgroundImage: `url('${bannerBg}')` }}
      >
        <div className="container">
          <div className="ab-banner-inner">
            <h1 className="ab-page-title">About Us</h1>
            <nav aria-label="breadcrumb">
              <ol className="ab-breadcrumb">
                <li className="ab-breadcrumb-item">
                  <a 
                    href="#home" 
                    onClick={(e) => {
                      e.preventDefault();
                      if (onNavigate) onNavigate('home');
                    }}
                  >
                    <i className="fas fa-home-lg-alt"></i> Home
                  </a>
                </li>
                <li className="ab-breadcrumb-sep">
                  <ChevronRight size={14} />
                </li>
                <li className="ab-breadcrumb-item active" aria-current="page">
                  About Us
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </section>

      {/* 2. Chance To Learn / About Sahast Foundation */}
      <section className="ab-chance-section">
        <div className="container">
          <div className="ab-chance-grid">
            {/* Left Content */}
            <div>
              <div className="ab-tag">
                <span className="ab-tag-bar"></span>
                <span>About Sahast Foundation</span>
              </div>
              
              <h2 className="ab-heading">
                Serving Humanity Through Education, Seva &amp;{' '}
                <span>Spiritual Guidance</span>
              </h2>

              <p className="ab-lead-text">
                Sahast Foundation is dedicated to empowering lives through education, social support, Seva, and spiritual values. Under the guidance and inspiration of Pujya Shree Abhay Das Maharaj, we work to support people with dignity, kindness, and responsibility.
              </p>

              <ul className="ab-check-list">
                <li className="ab-check-item">
                  <span className="ab-check-icon"><Check size={13} strokeWidth={3} /></span>
                  <span>Basic Seva &amp; Education</span>
                </li>
                <li className="ab-check-item">
                  <span className="ab-check-icon"><Check size={13} strokeWidth={3} /></span>
                  <span>Spiritual &amp; Moral Values</span>
                </li>
                <li className="ab-check-item">
                  <span className="ab-check-icon"><Check size={13} strokeWidth={3} /></span>
                  <span>Support for Needy Families</span>
                </li>
              </ul>
            </div>

            {/* Right Photo of Pujya Maharaj Ji */}
            <div className="ab-portrait-wrap">
              <img 
                decoding="async"
                src="/images/guruji-1.jpeg" 
                alt="Pujya Swami Shri Abhay Das Ji Maharaj" 
                className="ab-portrait-img"
                onError={(e) => {
                  e.currentTarget.src = "https://sahastfoundation.in/wp-content/uploads/2026/03/shree-abhay-das-ji-maharaj.jpeg";
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Counter Area / Compassionate Community */}
      <section className="ab-counter-section">
        <div className="container">
          <div className="ab-counter-subtitle">
            Building a Better Tomorrow Through Seva &amp; Spiritual Values
          </div>
          
          <h2 className="ab-counter-main-title">
            We're creating a{' '}
            <span className="ab-highlight-pill">compassionate community</span>{' '}
            where education, seva, and humanity come together to support every life.
          </h2>

          <div className="ab-counter-grid">
            <div className="ab-counter-card">
              <div className="ab-counter-number">100</div>
              <p className="ab-counter-desc">
                people connected through seva activities
              </p>
            </div>

            <div className="ab-counter-card">
              <div className="ab-counter-number">10+</div>
              <p className="ab-counter-desc">
                community support initiatives
              </p>
            </div>

            <div className="ab-counter-card">
              <div className="ab-counter-number">1+</div>
              <p className="ab-counter-desc">
                mission to serve humanity with compassion
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Our Inspiration & UN Impact Video Section */}
      <section className="ab-video-section">
        <div className="container">
          <div className="ab-video-composition">
            {/* Left Sunny Yellow Card */}
            <div className="ab-yellow-card">
              <div className="ab-yc-tag">Our Inspiration</div>
              <h3 className="ab-yc-title">
                <span>Guided</span> by Seva, Humanity &amp; Spiritual Values
              </h3>
              
              <p className="ab-yc-text">
                Sahast Foundation is inspired by the teachings and compassion of Pujya Shree Abhay Das Maharaj.
              </p>
              <p className="ab-yc-text">
                His vision encourages people to live with kindness, serve society, respect human values, and support those who are in need. The foundation follows this path by combining social service with spiritual awareness and moral responsibility.
              </p>
              <p className="ab-yc-text">
                Our work is rooted in the belief that serving humanity is one of the highest forms of service.
              </p>

              <div className="ab-yc-stat">0</div>

              {/* Overlapping Play Button */}
              <button 
                type="button" 
                className="ab-play-btn-circle"
                onClick={onOpenVideo}
                aria-label="Play Inspirational Video"
                title="Watch Video"
              >
                <Play size={26} fill="currentColor" strokeWidth={0} />
              </button>
            </div>

            {/* Right UN Volunteers & Community Photo */}
            <div className="ab-un-box">
              <img 
                src="/images/news_yoga_un.jpg" 
                alt="United Nations Seva Mission & Outreach" 
                className="ab-un-img"
                onError={(e) => {
                  e.currentTarget.src = "https://sahastfoundation.in/wp-content/uploads/2026/03/IMG_5729-scaled.jpg";
                }}
              />
              <div className="ab-un-overlay">
                <span className="ab-un-sub">Live Another Day</span>
                <h4 className="ab-un-title">
                  Every 60 seconds a family receives the tools to overcome poverty
                </h4>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Our Priorities Grid */}
      <section className="ab-priorities-section">
        <div className="ab-sp-container">
          <div className="ab-sp-heading">
            <span className="ab-star-mark">✦</span>
            <h2>Our Priorities</h2>
            <p>Serving people with care, dignity and meaningful community support.</p>
          </div>

          <div className="ab-sp-grid">
            {/* Card 1: Education Support */}
            <div className="ab-sp-card">
              <div className="ab-sp-image-wrap">
                <img 
                  decoding="async" 
                  src="/home-page-image/WhatsApp-Image-2026-05-26-at-21.23.386-e1780038882424.jpeg" 
                  alt="Education Support" 
                  onError={(e) => {
                    e.currentTarget.src = "https://sahastfoundation.in/wp-content/uploads/2026/05/WhatsApp-Image-2026-05-26-at-21.23.386-e1780038882424.jpeg";
                  }}
                />
              </div>
              <h3>Education Support</h3>
              <p>Helping students and youth with learning support, guidance, and opportunities for a better future.</p>
            </div>

            {/* Card 2: Women Empowerment */}
            <div className="ab-sp-card">
              <div className="ab-sp-image-wrap">
                <img 
                  decoding="async" 
                  src="/home-page-image/WhatsApp-Image-2026-05-26-at-21.24.093.jpeg" 
                  alt="Women Empowerment" 
                  onError={(e) => {
                    e.currentTarget.src = "https://sahastfoundation.in/wp-content/uploads/2026/05/WhatsApp-Image-2026-05-26-at-21.24.093.jpeg";
                  }}
                />
              </div>
              <h3>Women Empowerment</h3>
              <p>Supporting women through awareness, confidence building, self-growth, and equal opportunities.</p>
            </div>

            {/* Card 3: Health & Wellness */}
            <div className="ab-sp-card">
              <div className="ab-sp-image-wrap">
                <img 
                  decoding="async" 
                  src="/home-page-image/WhatsApp-Image-2026-05-26-at-21.24.09.jpeg" 
                  alt="Health & Wellness" 
                  onError={(e) => {
                    e.currentTarget.src = "https://sahastfoundation.in/wp-content/uploads/2026/05/WhatsApp-Image-2026-05-26-at-21.24.09.jpeg";
                  }}
                />
              </div>
              <h3>Health & Wellness</h3>
              <p>Promoting health awareness, medical support, camps, and wellness activities for the community.</p>
            </div>

            {/* Card 4: Food & Relief Support */}
            <div className="ab-sp-card">
              <div className="ab-sp-image-wrap">
                <img 
                  decoding="async" 
                  src="/home-page-image/WhatsApp-Image-2026-05-28-at-13.35.48-e1779956288882.jpeg" 
                  alt="Food & Relief Support" 
                  onError={(e) => {
                    e.currentTarget.src = "https://sahastfoundation.in/wp-content/uploads/2026/05/WhatsApp-Image-2026-05-28-at-13.35.48-e1779956288882.jpeg";
                  }}
                />
              </div>
              <h3>Food & Relief Support</h3>
              <p>Providing food, basic needs, and emergency help to families during difficult times.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Testimonial Quote Banner & Red Call to Action Box */}
      <section 
        className="ab-quote-section"
        style={{ backgroundImage: `url('/home-page-image/WhatsApp-Image-2026-05-26-at-21.23.395-e1779955852314.jpeg')` }}
      >
        <div className="container">
          <div className="ab-quote-grid">
            {/* Left Inspirational Quote */}
            <div className="ab-quote-left">
              <div className="ab-quote-icon">
                <i className="fas fa-quote-left"></i>
              </div>
              <blockquote className="ab-quote-text">
                “Seva is not only about helping someone for a moment, it is about bringing hope, dignity, and strength into their life.”
              </blockquote>
              <div className="ab-quote-author">
                Inspired by <span>Pujya Shree Abhay Das Maharaj</span>
              </div>
            </div>

            {/* Right Vibrant Red Box */}
            <div 
              className="ab-red-cta-box"
              onClick={onOpenVolunteer}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  if (onOpenVolunteer) onOpenVolunteer();
                }
              }}
            >
              <h3 className="ab-red-cta-title">
                Your time, support, and kindness can bring real change in someone's life.
              </h3>
              <p className="ab-red-cta-sub">
                Join Our Seva Journey and Serve Humanity
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
