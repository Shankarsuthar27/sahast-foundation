import React, { useEffect } from 'react';
import { Home, ChevronRight, Calendar, User, Clock, ArrowLeft, Heart, UserCheck } from 'lucide-react';

export default function MeditationBlogPage({ onNavigate, onOpenDonate, onOpenVolunteer }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="meditation-blog-page" style={{ backgroundColor: '#faf8f5', minHeight: '100vh', paddingTop: '40px' }}>
      <style>{`
        .mb-container {
          max-width: 920px;
          margin: 0 auto;
          padding: 0 24px;
        }

        .mb-card-content {
          background-color: #ffffff;
          border-radius: 24px;
          border: 1px solid #f0ede6;
          padding: 55px 52px;
          box-shadow: 0 10px 35px rgba(0, 0, 0, 0.04);
          margin-top: 40px;
          margin-bottom: 80px;
        }

        @media (max-width: 768px) {
          .mb-card-content {
            padding: 35px 22px;
            border-radius: 16px;
          }
        }

        .mb-article-body h3 {
          font-family: 'PT Sans', 'Georgia', serif;
          font-size: clamp(22px, 2.6vw, 28px);
          font-weight: 700;
          color: #0b231c;
          margin-top: 38px;
          margin-bottom: 16px;
          line-height: 1.3;
        }

        .mb-article-body p {
          font-size: 16.5px;
          line-height: 29px;
          color: #475569;
          margin-bottom: 20px;
        }

        .mb-bullet-list {
          list-style: none;
          padding: 0;
          margin: 0 0 24px 0;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .mb-bullet-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          font-size: 16px;
          line-height: 26px;
          color: #334155;
        }

        .mb-bullet-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background-color: #e31937;
          margin-top: 10px;
          flex-shrink: 0;
        }

        .mb-highlight-card {
          background-color: #fffdf5;
          border: 1px solid #fef3c7;
          border-radius: 14px;
          padding: 18px 24px;
          margin-bottom: 14px;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .mb-highlight-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 18px rgba(217, 119, 6, 0.08);
        }

        .mb-quote-box {
          background-color: #1e293b;
          background-image: linear-gradient(135deg, #111827 0%, #1e293b 100%);
          color: #ffffff;
          border-radius: 18px;
          padding: 34px 40px;
          text-align: center;
          margin: 40px 0;
          box-shadow: 0 10px 30px rgba(15, 23, 42, 0.18);
        }

        .mb-quote-text {
          font-family: 'PT Sans', 'Georgia', serif;
          font-size: clamp(18px, 2.2vw, 22px);
          font-style: italic;
          line-height: 34px;
          margin: 0 0 14px;
          color: #ffffff;
        }

        .mb-blessing-box {
          background-color: #fffdf5;
          border: 1px solid #fde68a;
          border-radius: 14px;
          padding: 20px 28px;
          margin: 20px auto 26px;
          max-width: 740px;
          box-shadow: 0 4px 16px rgba(217, 119, 6, 0.06);
          text-align: center;
        }
      `}</style>

      <div className="mb-container">
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
            <span style={{ color: '#0f172a', fontWeight: 600 }}>Meditation for Youth</span>
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
              Spiritual Wisdom & Meditation
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
            Meditation and Spiritual Practices for Youth
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontFamily: '"PT Sans", serif',
              fontSize: 'clamp(17px, 2vw, 21px)',
              color: '#64748b',
              margin: '0 0 16px',
              fontStyle: 'italic'
            }}
          >
            Inspired by the teachings and guidance of H.H. Pujya Abhaydas Ji Maharaj
          </p>

          {/* Golden Quote Box Below Subtitle */}
          <div className="mb-blessing-box">
            <h4
              style={{
                fontFamily: '"PT Sans", serif',
                fontSize: '15px',
                fontWeight: 700,
                color: '#b45309',
                margin: '0 0 6px',
                textTransform: 'uppercase',
                letterSpacing: '0.6px'
              }}
            >
              Pujya Swami Abhaydas Ji Maharaj Says:
            </h4>
            <p
              style={{
                fontSize: '14.5px',
                lineHeight: '23px',
                color: '#475569',
                fontStyle: 'italic',
                margin: 0
              }}
            >
              “As the youth represents our nation's future, we must ensure our values are preserved. Youth must embrace spiritual values alongside modern education, for character-building and inner peace. By instilling these core values, we can build a strong and prosperous nation.”
            </p>
          </div>

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
              <span>October 2026</span>
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
              <span>6 min read</span>
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
              src="/home-page-image/meditation-1-e1780126777484.png"
              alt="Meditation and Spiritual Practices for Youth"
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
                maxHeight: '480px',
                objectFit: 'cover'
              }}
              onError={(e) => {
                e.currentTarget.src = '/images/meditation-1-e1780126777484.png';
              }}
            />
          </div>
        </header>

        {/* Reading Body Card */}
        <article className="mb-card-content mb-article-body">
          {/* Intro Paragraphs */}
          <p style={{ fontSize: '18px', lineHeight: '31px', color: '#1e293b', fontWeight: 500 }}>
            In today's fast-paced world, young people face increasing pressures from academics, career expectations, social media, and emotional uncertainties. Stress, anxiety, lack of concentration, and emotional challenges have become common among students and young professionals.
          </p>

          <p style={{ fontSize: '16.5px', lineHeight: '29px', color: '#475569' }}>
            H.H. Pujya Abhaydas Ji Maharaj has always emphasized the importance of balancing modern education with spiritual growth. Meditation and spiritual practices help youth build inner strength, clarity of thought, discipline, and emotional stability.
          </p>

          {/* Section: Why Meditation is Important for Youth */}
          <h3>Why Meditation is Important for Youth</h3>
          <p style={{ fontSize: '16.5px', lineHeight: '29px', color: '#475569' }}>
            Youth is the stage where character is built and values are formed. Meditation helps young minds remain focused, calm, and confident while facing life's challenges:
          </p>

          <ul className="mb-bullet-list">
            <li className="mb-bullet-item">
              <span className="mb-bullet-dot" />
              <span>Improves concentration and focus</span>
            </li>
            <li className="mb-bullet-item">
              <span className="mb-bullet-dot" />
              <span>Reduces stress and anxiety</span>
            </li>
            <li className="mb-bullet-item">
              <span className="mb-bullet-dot" />
              <span>Enhances emotional balance</span>
            </li>
            <li className="mb-bullet-item">
              <span className="mb-bullet-dot" />
              <span>Boosts self-confidence</span>
            </li>
            <li className="mb-bullet-item">
              <span className="mb-bullet-dot" />
              <span>Improves decision-making skills</span>
            </li>
            <li className="mb-bullet-item">
              <span className="mb-bullet-dot" />
              <span>Enhances creativity and learning ability</span>
            </li>
            <li className="mb-bullet-item">
              <span className="mb-bullet-dot" />
              <span>Promotes inner peace and positivity</span>
            </li>
          </ul>

          {/* Section: The Role of Spiritual Practices */}
          <h3>The Role of Spiritual Practices</h3>
          <p style={{ fontSize: '16.5px', lineHeight: '29px', color: '#475569' }}>
            Spiritual practices cultivate values like compassion, truthfulness, humility, and purpose in life. Simple daily practices create a strong inner foundation for personal and academic excellence:
          </p>

          {/* 3 Highlight Cards */}
          <div style={{ margin: '26px 0 32px' }}>
            <div className="mb-highlight-card">
              <h4 style={{ fontSize: '17px', fontWeight: 700, color: '#0b231c', margin: '0 0 6px' }}>
                Daily Prayer
              </h4>
              <p style={{ margin: 0, fontSize: '15px', color: '#475569', lineHeight: '24px' }}>
                Starting the day with gratitude and prayer brings positive energy, mental peace, and focus on noble goals.
              </p>
            </div>

            <div className="mb-highlight-card">
              <h4 style={{ fontSize: '17px', fontWeight: 700, color: '#0b231c', margin: '0 0 6px' }}>
                Reading Spiritual Literature
              </h4>
              <p style={{ margin: 0, fontSize: '15px', color: '#475569', lineHeight: '24px' }}>
                Reading inspiring stories and scriptures develops wisdom, moral clarity, and mental strength.
              </p>
            </div>

            <div className="mb-highlight-card">
              <h4 style={{ fontSize: '17px', fontWeight: 700, color: '#0b231c', margin: '0 0 6px' }}>
                Self-Reflection
              </h4>
              <p style={{ margin: 0, fontSize: '15px', color: '#475569', lineHeight: '24px' }}>
                Taking a few minutes daily to reflect on actions, thoughts, and personal values helps nurture self-discipline.
              </p>
            </div>
          </div>

          {/* Section: How Meditation Improves Academic Performance */}
          <h3>How Meditation Improves Academic Performance</h3>
          <p style={{ fontSize: '16.5px', lineHeight: '29px', color: '#475569' }}>
            One of the major challenges students face today is distractions caused by digital devices, exam pressure, and constant mental chatter.
          </p>
          <p style={{ fontSize: '16.5px', lineHeight: '29px', color: '#475569' }}>
            Regular meditation clears mental clutter, improves memory retention, sharpens focus, and increases cognitive endurance, helping students learn faster and perform better.
          </p>

          {/* Section: Simple Meditation Practice for Beginners */}
          <h3>Simple Meditation Practice for Beginners</h3>
          <p style={{ fontSize: '16.5px', lineHeight: '29px', color: '#475569' }}>
            Pujya Maharaj Ji encourages youth to start with simple daily techniques:
          </p>

          <ul className="mb-bullet-list">
            <li className="mb-bullet-item">
              <span className="mb-bullet-dot" />
              <span>Sit comfortably in a quiet place</span>
            </li>
            <li className="mb-bullet-item">
              <span className="mb-bullet-dot" />
              <span>Close your eyes and relax your body</span>
            </li>
            <li className="mb-bullet-item">
              <span className="mb-bullet-dot" />
              <span>Focus on your breathing</span>
            </li>
            <li className="mb-bullet-item">
              <span className="mb-bullet-dot" />
              <span>Take slow and deep breaths</span>
            </li>
            <li className="mb-bullet-item">
              <span className="mb-bullet-dot" />
              <span>If thoughts arise, gently bring focus back to breathing</span>
            </li>
            <li className="mb-bullet-item">
              <span className="mb-bullet-dot" />
              <span>Practice daily and gradually increase the duration</span>
            </li>
          </ul>

          {/* Section: The Gurukul Approach to Growth */}
          <h3>The Gurukul Approach to Growth</h3>
          <p style={{ fontSize: '16.5px', lineHeight: '29px', color: '#475569' }}>
            At Sahast Foundation, education is not just about textbooks—it is about holistic development. Through Gurukul discipline, meditation, seva (service), and support for nature and animals, students learn values that build noble character.
          </p>
          <p style={{ fontSize: '16.5px', lineHeight: '29px', color: '#475569' }}>
            Sahast Foundation continues to promote these timeless principles under the divine leadership of Pujya Swami Shri Abhay Das Ji Maharaj across Rajasthan and India.
          </p>

          {/* The Distinctive Quote Box from Screenshot */}
          <div className="mb-quote-box">
            <p className="mb-quote-text">
              “Yuvaon ko keval pustakon ka gyan hi nahi, balki dhyan, sadachar aur adhyatmik mulyon ka gyan bhi prapt karna chahiye. Yahi safal aur sukhi jeevan ka sachcha marg hai.”
            </p>
            <div style={{ color: '#fabc3f', fontWeight: 600, fontStyle: 'italic', fontSize: '15px' }}>
              — H.H. Pujya Abhaydas Ji Maharaj
            </div>
          </div>

          {/* Section: Conclusion */}
          <h3>Conclusion</h3>
          <p style={{ fontSize: '16.5px', lineHeight: '29px', color: '#475569' }}>
            Meditation and spiritual practices are timeless tools that help young people navigate the challenges of modern life. They strengthen character, improve mental well-being, and provide a strong foundation for lifelong success.
          </p>
          <p style={{ fontSize: '16.5px', lineHeight: '29px', color: '#475569' }}>
            Through value-based education and spiritual awareness, Sahast Foundation aims to nurture responsible, confident, and compassionate future leaders.
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
