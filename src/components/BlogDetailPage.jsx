import React, { useEffect } from 'react';
import { Home, ChevronRight, Calendar, User, Clock, ArrowLeft, Heart, UserCheck, Share2 } from 'lucide-react';

export default function BlogDetailPage({ onNavigate, onOpenDonate, onOpenVolunteer }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="blog-detail-page" style={{ backgroundColor: '#faf8f5', minHeight: '100vh', paddingTop: '40px' }}>
      <style>{`
        .bd-container {
          max-width: 920px;
          margin: 0 auto;
          padding: 0 24px;
        }

        .bd-card-content {
          background-color: #ffffff;
          border-radius: 24px;
          border: 1px solid #f0ede6;
          padding: 55px 52px;
          box-shadow: 0 10px 35px rgba(0, 0, 0, 0.04);
          margin-top: 40px;
          margin-bottom: 80px;
        }

        @media (max-width: 768px) {
          .bd-card-content {
            padding: 35px 22px;
            border-radius: 16px;
          }
        }

        .bd-article-body h3 {
          font-family: 'PT Sans', 'Georgia', serif;
          font-size: clamp(22px, 2.6vw, 28px);
          font-weight: 700;
          color: #0b231c;
          margin-top: 38px;
          margin-bottom: 16px;
          line-height: 1.3;
        }

        .bd-article-body p {
          font-size: 16.5px;
          line-height: 29px;
          color: #475569;
          margin-bottom: 20px;
        }

        .bd-bullet-list {
          list-style: none;
          padding: 0;
          margin: 0 0 24px 0;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .bd-bullet-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          font-size: 16px;
          line-height: 26px;
          color: #334155;
        }

        .bd-bullet-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background-color: #e31937;
          margin-top: 10px;
          flex-shrink: 0;
        }

        .bd-highlight-card {
          background-color: #fffdf5;
          border: 1px solid #fef3c7;
          border-radius: 14px;
          padding: 18px 24px;
          margin-bottom: 14px;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .bd-highlight-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 18px rgba(217, 119, 6, 0.08);
        }

        .bd-quote-box {
          background-color: #1e293b;
          background-image: linear-gradient(135deg, #111827 0%, #1e293b 100%);
          color: #ffffff;
          border-radius: 18px;
          padding: 34px 40px;
          text-align: center;
          margin: 40px 0;
          box-shadow: 0 10px 30px rgba(15, 23, 42, 0.18);
          position: relative;
        }

        .bd-quote-text {
          font-family: 'PT Sans', 'Georgia', serif;
          font-size: clamp(19px, 2.2vw, 23px);
          font-style: italic;
          line-height: 34px;
          margin: 0;
          color: #ffffff;
        }
      `}</style>

      <div className="bd-container">
        {/* Top Breadcrumb Navigation */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px', flexWrap: 'wrap', gap: '14px' }}>
          <button
            type="button"
            onClick={() => onNavigate && onNavigate('home', '#blogs')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: '#ffffff',
              border: '1px solid #e2e8f0',
              padding: '8px 16px',
              borderRadius: '50px',
              fontSize: '13.5px',
              fontWeight: 600,
              color: '#334155',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#0b231c';
              e.currentTarget.style.transform = 'translateX(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#e2e8f0';
              e.currentTarget.style.transform = 'translateX(0)';
            }}
          >
            <ArrowLeft size={15} />
            <span>Back to Blogs</span>
          </button>

          <nav aria-label="Breadcrumb" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#64748b' }}>
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                if (onNavigate) onNavigate('home');
              }}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: '#b45309', textDecoration: 'none', fontWeight: 600 }}
            >
              <Home size={14} />
              <span>Home</span>
            </a>
            <ChevronRight size={13} color="#94a3b8" />
            <a
              href="/#blogs"
              onClick={(e) => {
                e.preventDefault();
                if (onNavigate) onNavigate('home', '#blogs');
              }}
              style={{ color: '#64748b', textDecoration: 'none' }}
            >
              Blogs
            </a>
            <ChevronRight size={13} color="#94a3b8" />
            <span style={{ color: '#0f172a', fontWeight: 600 }}>The Power of Seva</span>
          </nav>
        </div>

        {/* Article Header */}
        <header style={{ textAlign: 'center', marginBottom: '32px' }}>
          {/* Yellow Category Badge */}
          <div style={{ marginBottom: '16px' }}>
            <span
              style={{
                display: 'inline-block',
                backgroundColor: '#fffbeb',
                color: '#b45309',
                border: '1px solid #fef3c7',
                fontSize: '12px',
                fontWeight: 800,
                letterSpacing: '1.2px',
                textTransform: 'uppercase',
                padding: '6px 18px',
                borderRadius: '50px'
              }}
            >
              Social Welfare
            </span>
          </div>

          {/* Main Title */}
          <h1
            style={{
              fontFamily: '"PT Sans", "Georgia", serif',
              fontSize: 'clamp(32px, 4.2vw, 46px)',
              fontWeight: 700,
              color: '#0b231c',
              margin: '0 0 10px',
              letterSpacing: '-0.5px',
              lineHeight: 1.2
            }}
          >
            The Power of Seva
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontFamily: '"PT Sans", serif',
              fontSize: 'clamp(18px, 2.2vw, 22px)',
              color: '#64748b',
              margin: '0 0 22px',
              fontStyle: 'italic'
            }}
          >
            How Selfless Service Transforms Lives
          </p>

          {/* Meta Info Badges */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexWrap: 'wrap',
              gap: '10px'
            }}
          >
            <span
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '50px',
                padding: '5px 16px',
                fontSize: '13.5px',
                fontWeight: 600,
                color: '#334155',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <User size={14} color="#e31937" />
              <span>Sahast Foundation</span>
            </span>

            <span
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '50px',
                padding: '5px 16px',
                fontSize: '13.5px',
                fontWeight: 500,
                color: '#475569',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Calendar size={14} color="#fabc3f" />
              <span>August 2026</span>
            </span>

            <span
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '50px',
                padding: '5px 16px',
                fontSize: '13.5px',
                fontWeight: 500,
                color: '#475569',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Clock size={14} color="#64748b" />
              <span>5 min read</span>
            </span>
          </div>

          {/* Featured Hero Banner Image matching reference screenshot */}
          <div
            style={{
              marginTop: '34px',
              borderRadius: '22px',
              overflow: 'hidden',
              boxShadow: '0 12px 35px rgba(0, 0, 0, 0.08)',
              backgroundColor: '#ffffff'
            }}
          >
            <img
              src="/images/The-Power-of-Seva-Serving-Humanity-with-Compassion.png"
              alt="The Power of Seva - How Selfless Service Transforms Lives"
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
                maxHeight: '480px',
                objectFit: 'cover'
              }}
              onError={(e) => {
                e.currentTarget.src = '/home-page-image/The-Power-of-Seva-Serving-Humanity-with-Compassion.png';
              }}
            />
          </div>
        </header>

        {/* Reading Body Card */}
        <article className="bd-card-content bd-article-body">
          {/* Intro Paragraphs */}
          <p style={{ fontSize: '18px', lineHeight: '31px', color: '#1e293b', fontWeight: 500 }}>
            In a world where people are often focused on personal success, material achievements, and individual goals, the value of selfless service has become more important than ever.
          </p>

          <p style={{ fontSize: '16.5px', lineHeight: '29px', color: '#475569' }}>
            Seva, an ancient tradition rooted in spiritual wisdom, is more than just helping others—it is a practice that can deeply transform human consciousness. From individual growth to societal harmony, the power of seva extends far beyond charity, making it a sacred path to inner peace and collective upliftment.
          </p>

          {/* Section: What is Seva? */}
          <h3>What is Seva?</h3>
          <p style={{ fontSize: '16.5px', lineHeight: '29px', color: '#475569' }}>
            Seva means selfless service performed without any expectation of reward, recognition, or personal gain. It is driven by pure compassion, love, and a sense of duty toward humanity, nature, and society.
          </p>

          <ul className="bd-bullet-list">
            <li className="bd-bullet-item">
              <span className="bd-bullet-dot" />
              <span>Helping someone in need</span>
            </li>
            <li className="bd-bullet-item">
              <span className="bd-bullet-dot" />
              <span>Supporting educational initiatives</span>
            </li>
            <li className="bd-bullet-item">
              <span className="bd-bullet-dot" />
              <span>Serving food to the hungry</span>
            </li>
            <li className="bd-bullet-item">
              <span className="bd-bullet-dot" />
              <span>Caring for animals</span>
            </li>
            <li className="bd-bullet-item">
              <span className="bd-bullet-dot" />
              <span>Participating in community development</span>
            </li>
            <li className="bd-bullet-item">
              <span className="bd-bullet-dot" />
              <span>Volunteering for social causes</span>
            </li>
          </ul>

          {/* Section: Why Seva Matters Today */}
          <h3>Why Seva Matters Today</h3>
          <p style={{ fontSize: '16.5px', lineHeight: '29px', color: '#475569' }}>
            Modern life often leads to stress, disconnection, and a sense of isolation. While achievements are important, true happiness comes from contributing to something larger than ourselves.
          </p>
          <p style={{ fontSize: '16.5px', lineHeight: '29px', color: '#475569' }}>
            Seva helps people move beyond personal concerns and discover a deeper connection with humanity, nature, and the Divine.
          </p>

          {/* 3 Highlight Cards */}
          <div style={{ margin: '26px 0 32px' }}>
            <div className="bd-highlight-card">
              <h4 style={{ fontSize: '17px', fontWeight: 700, color: '#0b231c', margin: '0 0 6px' }}>
                Compassion
              </h4>
              <p style={{ margin: 0, fontSize: '15px', color: '#475569', lineHeight: '24px' }}>
                Seva awakens empathy and connects us with others through kindness and compassion.
              </p>
            </div>

            <div className="bd-highlight-card">
              <h4 style={{ fontSize: '17px', fontWeight: 700, color: '#0b231c', margin: '0 0 6px' }}>
                Community
              </h4>
              <p style={{ margin: 0, fontSize: '15px', color: '#475569', lineHeight: '24px' }}>
                When people serve together, communities become stronger, harmonious, and united.
              </p>
            </div>

            <div className="bd-highlight-card">
              <h4 style={{ fontSize: '17px', fontWeight: 700, color: '#0b231c', margin: '0 0 6px' }}>
                Transformation
              </h4>
              <p style={{ margin: 0, fontSize: '15px', color: '#475569', lineHeight: '24px' }}>
                Selfless service transforms both the giver and the receiver through love and humility.
              </p>
            </div>
          </div>

          {/* Section: Seva as a Spiritual Practice */}
          <h3>Seva as a Spiritual Practice</h3>
          <p style={{ fontSize: '16.5px', lineHeight: '29px', color: '#475569' }}>
            In traditional spiritual wisdom, seva is considered a sacred path to inner growth. It teaches humility, dissolves ego, and cultivates unconditional love for all beings.
          </p>
          <p style={{ fontSize: '16.5px', lineHeight: '29px', color: '#475569' }}>
            When we serve others with purity of heart, we experience divine presence in everyday actions. It transforms work into worship and daily deeds into spiritual offerings.
          </p>

          {/* Section: How Seva Builds Character */}
          <h3>How Seva Builds Character</h3>
          <p style={{ fontSize: '16.5px', lineHeight: '29px', color: '#475569' }}>
            Character is built not through what we take, but what we give. Selfless service develops qualities that define a truly noble individual:
          </p>

          <ul className="bd-bullet-list">
            <li className="bd-bullet-item">
              <span className="bd-bullet-dot" />
              <span>Encourages humility</span>
            </li>
            <li className="bd-bullet-item">
              <span className="bd-bullet-dot" />
              <span>Builds inner emotional strength</span>
            </li>
            <li className="bd-bullet-item">
              <span className="bd-bullet-dot" />
              <span>Cultivates social responsibility</span>
            </li>
            <li className="bd-bullet-item">
              <span className="bd-bullet-dot" />
              <span>Inspires empathy and kindness</span>
            </li>
            <li className="bd-bullet-item">
              <span className="bd-bullet-dot" />
              <span>Guides individuals to live with purpose</span>
            </li>
          </ul>

          {/* Section: The Impact of Seva on Communities */}
          <h3>The Impact of Seva on Communities</h3>
          <p style={{ fontSize: '16.5px', lineHeight: '29px', color: '#475569' }}>
            Communities flourish when members care for each other. Selfless initiatives provide essential resources, education, healthcare, and emotional support to those who need it most.
          </p>
          <p style={{ fontSize: '16.5px', lineHeight: '29px', color: '#475569' }}>
            From disaster relief to daily nourishment programs, seva strengthens social bonds and fosters collective well-being.
          </p>

          {/* The Distinctive Quote Box from Screenshot */}
          <div className="bd-quote-box">
            <p className="bd-quote-text">
              “Small acts of kindness, when done with pure intention, can create big changes in the world.”
            </p>
          </div>

          {/* Section: Sahast Foundation's Commitment to Seva */}
          <h3>Sahast Foundation's Commitment to Seva</h3>
          <p style={{ fontSize: '16.5px', lineHeight: '29px', color: '#475569' }}>
            At Sahast Foundation, seva is the heart of every initiative. Through our Gurukul education, Sadhu Bhandara, Gaushala preservation, and health camps, we strive to bring positive change to rural and tribal communities.
          </p>
          <p style={{ fontSize: '16.5px', lineHeight: '29px', color: '#475569' }}>
            Guided by Pujya Swami Shri Abhay Das Ji Maharaj, our mission is to empower lives through education, spiritual wisdom, and humanitarian support.
          </p>

          {/* Section: Conclusion */}
          <h3>Conclusion</h3>
          <p style={{ fontSize: '16.5px', lineHeight: '29px', color: '#475569' }}>
            Seva is more than just an act—it is a way of living that transforms the heart, purifies the mind, and brings boundless joy. When we give selflessly, we discover true fulfillment and help build a compassionate world.
          </p>
          <p style={{ fontSize: '16.5px', lineHeight: '29px', color: '#475569' }}>
            Join Sahast Foundation in spreading love, seva, and education across communities. Together, we can make a difference.
          </p>

          {/* Interactive CTAs at bottom of post */}
          <div
            style={{
              marginTop: '45px',
              paddingTop: '35px',
              borderTop: '1px solid #f1f5f9',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '14px',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={onOpenVolunteer}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: '#0b231c',
                  color: '#ffffff',
                  padding: '12px 22px',
                  borderRadius: '8px',
                  fontWeight: 600,
                  fontSize: '14.5px',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#153c30')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#0b231c')}
              >
                <UserCheck size={16} />
                <span>Join as Volunteer</span>
              </button>

              <button
                type="button"
                onClick={onOpenDonate}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: '#e31937',
                  color: '#ffffff',
                  padding: '12px 22px',
                  borderRadius: '8px',
                  fontWeight: 600,
                  fontSize: '14.5px',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#cc142f')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#e31937')}
              >
                <Heart size={16} fill="currentColor" />
                <span>Support Our Seva</span>
              </button>
            </div>

            <button
              type="button"
              onClick={() => onNavigate && onNavigate('home', '#blogs')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: '#ffffff',
                color: '#334155',
                border: '1px solid #cbd5e1',
                padding: '12px 20px',
                borderRadius: '8px',
                fontWeight: 600,
                fontSize: '14px',
                cursor: 'pointer',
                transition: 'border-color 0.2s'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#0b231c')}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#cbd5e1')}
            >
              <ArrowLeft size={15} />
              <span>View All Blogs</span>
            </button>
          </div>
        </article>
      </div>
    </div>
  );
}
