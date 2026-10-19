import React, { useEffect } from 'react';
import { Home, ChevronRight, Calendar, User, Clock, ArrowLeft, Heart, UserCheck } from 'lucide-react';

export default function GurukulBlogPage({ onNavigate, onOpenDonate, onOpenVolunteer }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="gurukul-blog-page" style={{ backgroundColor: '#faf8f5', minHeight: '100vh', paddingTop: '40px' }}>
      <style>{`
        .gb-container {
          max-width: 920px;
          margin: 0 auto;
          padding: 0 24px;
        }

        .gb-card-content {
          background-color: #ffffff;
          border-radius: 24px;
          border: 1px solid #f0ede6;
          padding: 55px 52px;
          box-shadow: 0 10px 35px rgba(0, 0, 0, 0.04);
          margin-top: 40px;
          margin-bottom: 80px;
        }

        @media (max-width: 768px) {
          .gb-card-content {
            padding: 35px 22px;
            border-radius: 16px;
          }
        }

        .gb-article-body h3 {
          font-family: 'PT Sans', 'Georgia', serif;
          font-size: clamp(22px, 2.6vw, 28px);
          font-weight: 700;
          color: #0b231c;
          margin-top: 38px;
          margin-bottom: 16px;
          line-height: 1.3;
        }

        .gb-article-body p {
          font-size: 16.5px;
          line-height: 29px;
          color: #475569;
          margin-bottom: 20px;
        }

        .gb-bullet-list {
          list-style: none;
          padding: 0;
          margin: 0 0 24px 0;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .gb-bullet-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          font-size: 16px;
          line-height: 26px;
          color: #334155;
        }

        .gb-bullet-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background-color: #e31937;
          margin-top: 10px;
          flex-shrink: 0;
        }

        .gb-highlight-card {
          background-color: #fffdf5;
          border: 1px solid #fef3c7;
          border-radius: 14px;
          padding: 20px 24px;
          margin-bottom: 14px;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .gb-highlight-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 18px rgba(217, 119, 6, 0.08);
        }

        /* Yellow/Amber Quote Box for Maharaj Ji's Teachings */
        .gb-quote-card-yellow {
          background-color: #fffdf0;
          border: 1px solid #fde68a;
          border-radius: 14px;
          padding: 18px 24px;
          margin: 26px 0;
          box-shadow: 0 4px 16px rgba(217, 119, 6, 0.05);
        }

        .gb-quote-card-yellow h4 {
          font-family: 'PT Sans', serif;
          font-size: 13px;
          font-weight: 800;
          color: #b45309;
          margin: 0 0 6px;
          text-transform: uppercase;
          letter-spacing: 0.8px;
        }

        .gb-quote-card-yellow p {
          font-size: 15px;
          line-height: 24px;
          color: #475569;
          font-style: italic;
          margin: 0 !important;
        }

        /* Dark Charcoal Quote Box */
        .gb-quote-box-dark {
          background-color: #1e293b;
          background-image: linear-gradient(135deg, #111827 0%, #1e293b 100%);
          color: #ffffff;
          border-radius: 18px;
          padding: 34px 40px;
          text-align: center;
          margin: 40px 0;
          box-shadow: 0 10px 30px rgba(15, 23, 42, 0.18);
        }

        .gb-quote-box-dark .gb-quote-text {
          font-family: 'PT Sans', 'Georgia', serif;
          font-size: clamp(18px, 2.2vw, 22px);
          font-style: italic;
          line-height: 34px;
          margin: 0 0 14px;
          color: #ffffff;
        }
      `}</style>

      <div className="gb-container">
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
            <span style={{ color: '#0f172a', fontWeight: 600 }}>Gurukul Education</span>
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
              Gurukul Education
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
            Why Gurukul Education is Relevant in Modern India
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontFamily: '"PT Sans", serif',
              fontSize: 'clamp(17px, 2vw, 21px)',
              color: '#64748b',
              margin: '0 0 20px',
              fontStyle: 'italic'
            }}
          >
            Inspired by the teachings and guidance of H.H. Pujya Abhaydas Ji Maharaj
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
              <span>September 2026</span>
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
              src="/home-page-image/gurukul.png"
              alt="Why Gurukul Education is Relevant in Modern India"
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
                maxHeight: '480px',
                objectFit: 'cover'
              }}
              onError={(e) => {
                e.currentTarget.src = '/images/img_26.jpg';
              }}
            />
          </div>
        </header>

        {/* Reading Body Card */}
        <article className="gb-card-content gb-article-body">
          {/* Intro Paragraphs */}
          <p style={{ fontSize: '18px', lineHeight: '31px', color: '#1e293b', fontWeight: 500 }}>
            Education is not only about books, marks, and degrees... True education builds character, discipline, and prepares students to live responsibly in society.
          </p>

          <p style={{ fontSize: '16.5px', lineHeight: '29px', color: '#475569' }}>
            In modern India, where youth face moral challenges, fast-paced lifestyles, and growing pressures, the need for value-based education is more important than ever. Gurukul education offers a balanced solution to combine modern education with traditional Indian values.
          </p>

          {/* Section: What is Gurukul Education? */}
          <h3>What is Gurukul Education?</h3>
          <p style={{ fontSize: '16.5px', lineHeight: '29px', color: '#475569' }}>
            Gurukul is an ancient Indian system of education where students learn under the guidance of a Guru. It focuses on the complete development of a person, covering physical, mental, and spiritual growth.
          </p>

          <ul className="gb-bullet-list">
            <li className="gb-bullet-item">
              <span className="gb-bullet-dot" />
              <span>Moral values</span>
            </li>
            <li className="gb-bullet-item">
              <span className="gb-bullet-dot" />
              <span>Self-discipline</span>
            </li>
            <li className="gb-bullet-item">
              <span className="gb-bullet-dot" />
              <span>Respect for elders</span>
            </li>
            <li className="gb-bullet-item">
              <span className="gb-bullet-dot" />
              <span>Simple living</span>
            </li>
            <li className="gb-bullet-item">
              <span className="gb-bullet-dot" />
              <span>Cultural awareness</span>
            </li>
            <li className="gb-bullet-item">
              <span className="gb-bullet-dot" />
              <span>Compassion for society</span>
            </li>
          </ul>

          {/* Quote Card 1 */}
          <div className="gb-quote-card-yellow">
            <h4>HH PUJYA ABHAYDAS JI MAHARAJ SAYS:</h4>
            <p>
              “Gyan vahi sarthak hai jo manushya ko vinamra, kartavyanishth aur samaj ke prati samarpit banaye.”
            </p>
          </div>

          {/* Section: Why Modern India Needs Gurukul Values */}
          <h3>Why Modern India Needs Gurukul Values</h3>
          <p style={{ fontSize: '16.5px', lineHeight: '29px', color: '#475569' }}>
            Today, young people are often caught up in cutthroat competition, peer pressure, and digital distractions, which can lead to stress, anxiety, and a loss of personal values and cultural identity.
          </p>
          <p style={{ fontSize: '16.5px', lineHeight: '29px', color: '#475569' }}>
            Gurukul values provide a strong foundation to help students remain grounded, build inner resilience, and develop positive habits like mindfulness, gratitude, and seva (service).
          </p>

          {/* 3 Highlight Cards */}
          <div style={{ margin: '26px 0 28px' }}>
            <div className="gb-highlight-card">
              <h4 style={{ fontSize: '17px', fontWeight: 700, color: '#0b231c', margin: '0 0 6px' }}>
                Character Building
              </h4>
              <p style={{ margin: 0, fontSize: '15px', color: '#475569', lineHeight: '24px' }}>
                Gurukul values help students develop integrity, honesty, and empathy, preparing them to be responsible citizens.
              </p>
            </div>

            <div className="gb-highlight-card">
              <h4 style={{ fontSize: '17px', fontWeight: 700, color: '#0b231c', margin: '0 0 6px' }}>
                Discipline and Self-Control
              </h4>
              <p style={{ margin: 0, fontSize: '15px', color: '#475569', lineHeight: '24px' }}>
                A disciplined routine fosters mental focus and helps students overcome bad habits and distractions.
              </p>
            </div>

            <div className="gb-highlight-card">
              <h4 style={{ fontSize: '17px', fontWeight: 700, color: '#0b231c', margin: '0 0 6px' }}>
                Connection with Indian Culture
              </h4>
              <p style={{ margin: 0, fontSize: '15px', color: '#475569', lineHeight: '24px' }}>
                Students learn Indian values, traditions, and culture, keeping them connected to their roots.
              </p>
            </div>
          </div>

          {/* Quote Card 2 */}
          <div className="gb-quote-card-yellow">
            <h4>HH PUJYA ABHAYDAS JI MAHARAJ SAYS:</h4>
            <p>
              “Sanskaron ke bina shiksha adhuri hai. Sanatan sanskriti hi jeevan ka sachcha aadhar hai.”
            </p>
          </div>

          {/* Section: Importance of Spiritual Growth */}
          <h3>Importance of Spiritual Growth</h3>
          <p style={{ fontSize: '16.5px', lineHeight: '29px', color: '#475569' }}>
            Spiritual education encourages introspection and inner peace. It helps students navigate emotional turmoil, develop emotional resilience, and make wise, compassionate decisions.
          </p>

          {/* Quote Card 3 */}
          <div className="gb-quote-card-yellow">
            <h4>HH PUJYA ABHAYDAS JI MAHARAJ SAYS:</h4>
            <p>
              “Adhyatmik gyan man ko shanti aur jeevan ko sahi disha deta hai.”
            </p>
          </div>

          {/* Section: Practical Learning and Life Skills */}
          <h3>Practical Learning and Life Skills</h3>
          <p style={{ fontSize: '16.5px', lineHeight: '29px', color: '#475569' }}>
            Gurukul education goes beyond bookish knowledge. Students learn essential life skills and practical abilities that make them capable and independent:
          </p>

          <ul className="gb-bullet-list">
            <li className="gb-bullet-item">
              <span className="gb-bullet-dot" />
              <span>Environment conservation</span>
            </li>
            <li className="gb-bullet-item">
              <span className="gb-bullet-dot" />
              <span>Leading responsibly</span>
            </li>
            <li className="gb-bullet-item">
              <span className="gb-bullet-dot" />
              <span>Developing leadership qualities</span>
            </li>
            <li className="gb-bullet-item">
              <span className="gb-bullet-dot" />
              <span>Communication and social skills</span>
            </li>
            <li className="gb-bullet-item">
              <span className="gb-bullet-dot" />
              <span>Living with discipline and simplicity</span>
            </li>
          </ul>

          {/* Section: Gurukul Education and Modern Learning */}
          <h3>Gurukul Education and Modern Learning</h3>
          <p style={{ fontSize: '16.5px', lineHeight: '29px', color: '#475569' }}>
            Gurukul education does not mean ignoring modern education. Modern Gurukuls combine science, mathematics, technology, and languages with ancient values to prepare well-rounded global citizens.
          </p>

          {/* Quote Card 4 */}
          <div className="gb-quote-card-yellow">
            <h4>HH PUJYA ABHAYDAS JI MAHARAJ SAYS:</h4>
            <p>
              “Aadunik shiksha ke sath-sath sanskar aur adhyatmik gyan ka samavesh hi purna shiksha hai.”
            </p>
          </div>

          {/* The Distinctive Dark Quote Box */}
          <div className="gb-quote-box-dark">
            <p className="gb-quote-text">
              “Modern knowledge becomes truly powerful when it is guided by values, discipline, and wisdom.”
            </p>
            <div style={{ color: '#fabc3f', fontWeight: 600, fontStyle: 'italic', fontSize: '15px' }}>
              — H.H. Pujya Abhaydas Ji Maharaj
            </div>
          </div>

          {/* Section: Sahast Foundation's Vision */}
          <h3>Sahast Foundation's Vision</h3>
          <p style={{ fontSize: '16.5px', lineHeight: '29px', color: '#475569' }}>
            Sahast Foundation is committed to reviving the Gurukul ethos through spiritual learning, education, and social welfare programs.
          </p>
          <p style={{ fontSize: '16.5px', lineHeight: '29px', color: '#475569' }}>
            Through Gurukul Vidyalayas and seva initiatives, Sahast Foundation nurtures young minds, helping them become educated, respectful, and responsible leaders of a modern, harmonious nation.
          </p>

          {/* Quote Card 5 */}
          <div className="gb-quote-card-yellow">
            <h4>HH PUJYA ABHAYDAS JI MAHARAJ SAYS:</h4>
            <p>
              “Har bacche ko aisi shiksha mile jo use gyanvan ke sath-sath gunvan aur charitravan banaye, yahi hamari prathmikta hai.”
            </p>
          </div>

          {/* Section: Conclusion */}
          <h3>Conclusion</h3>
          <p style={{ fontSize: '16.5px', lineHeight: '29px', color: '#475569' }}>
            Gurukul education is not a concept of the past; it is a timeless philosophy needed more than ever in today's fast-changing world. By blending ancient Indian wisdom with modern education, we can prepare youth to build a bright and prosperous future.
          </p>
          <p style={{ fontSize: '16.5px', lineHeight: '29px', color: '#475569' }}>
            Sahast Foundation continues this divine mission under the divine leadership and inspiration of H.H. Pujya Swami Shri Abhay Das Ji Maharaj.
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
