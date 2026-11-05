import React, { useEffect } from 'react';
import { Home, ChevronRight, Calendar, User, Clock, ArrowLeft, Heart, UserCheck, Share2 } from 'lucide-react';
import { useCms } from '../context/CmsContext';

export default function ArticleDetailPage({ article, onNavigate, onOpenDonate, onOpenVolunteer }) {
  const { newsList } = useCms();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [article?.id]);

  // Fallback if accessed via direct URL without pre-selected article
  const currentArticle = article || (newsList && newsList[0]) || {
    title: 'Spiritual Discourse & Seva Article',
    category: 'Spiritual',
    excerpt: 'Preserving Sanatan moral principles and spiritual traditions.',
    content: '<p>Under the divine guidance of Pujya Swami Shri Abhaydas Ji Maharaj, thousands of devotees continue to be inspired through spiritual wisdom, Gurukul education, and humanitarian seva.</p>',
    featuredImage: '/home-page-image/gurukul.png',
    author: 'Sahast Foundation',
    publishedAt: new Date().toISOString()
  };

  // Format date
  let formattedDate = 'Recent';
  if (currentArticle.publishedAt || currentArticle.createdAt) {
    try {
      const d = new Date(currentArticle.publishedAt || currentArticle.createdAt);
      if (!isNaN(d.getTime())) {
        formattedDate = d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
      }
    } catch (_) {}
  }

  // Estimate read time
  const wordCount = (currentArticle.content || '').replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
  const readTime = Math.max(2, Math.ceil(wordCount / 180));

  return (
    <div className="article-detail-page" style={{ backgroundColor: '#faf8f5', minHeight: '100vh', paddingTop: '40px' }}>
      <style>{`
        .adp-container {
          max-width: 920px;
          margin: 0 auto;
          padding: 0 24px;
        }

        .adp-card-content {
          background-color: #ffffff;
          border-radius: 24px;
          border: 1px solid #f0ede6;
          padding: 55px 52px;
          box-shadow: 0 10px 35px rgba(0, 0, 0, 0.04);
          margin-top: 40px;
          margin-bottom: 80px;
        }

        @media (max-width: 768px) {
          .adp-card-content {
            padding: 32px 20px;
            border-radius: 16px;
          }
        }

        .adp-article-body h2 {
          font-family: 'PT Sans', 'Georgia', serif;
          font-size: clamp(24px, 2.8vw, 30px);
          font-weight: 700;
          color: #0b231c;
          margin-top: 38px;
          margin-bottom: 16px;
          line-height: 1.3;
        }

        .adp-article-body h3 {
          font-family: 'PT Sans', 'Georgia', serif;
          font-size: clamp(20px, 2.4vw, 26px);
          font-weight: 700;
          color: #0b231c;
          margin-top: 32px;
          margin-bottom: 14px;
          line-height: 1.3;
        }

        .adp-article-body p {
          font-size: 16.5px;
          line-height: 29px;
          color: #475569;
          margin-bottom: 20px;
        }

        .adp-article-body ul, .adp-article-body ol {
          padding-left: 24px;
          margin-bottom: 24px;
          color: #334155;
          font-size: 16px;
          line-height: 28px;
        }

        .adp-article-body li {
          margin-bottom: 8px;
        }

        .adp-article-body blockquote {
          background-color: #fffdf0;
          border-left: 4px solid #f59e0b;
          border-radius: 0 14px 14px 0;
          padding: 20px 26px;
          margin: 30px 0;
          font-family: 'PT Sans', 'Georgia', serif;
          font-style: italic;
          font-size: 17.5px;
          line-height: 28px;
          color: #78350f;
        }

        .adp-article-body img {
          max-width: 100%;
          height: auto;
          border-radius: 16px;
          margin: 24px 0;
        }
      `}</style>

      <div className="adp-container">
        {/* Top Breadcrumb Navigation */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px', flexWrap: 'wrap', gap: '14px' }}>
          <button
            type="button"
            onClick={() => onNavigate && onNavigate('pages')}
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
            <span>Back to All Blogs</span>
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
              href="/pages"
              onClick={(e) => {
                e.preventDefault();
                if (onNavigate) onNavigate('pages');
              }}
              style={{ color: '#64748b', textDecoration: 'none' }}
            >
              Pages
            </a>
            <ChevronRight size={13} color="#94a3b8" />
            <span style={{ color: '#0f172a', fontWeight: 600 }}>{currentArticle.category || 'Discourse'}</span>
          </nav>
        </div>

        {/* Article Header */}
        <header style={{ textAlign: 'center', marginBottom: '32px' }}>
          {/* Yellow / Amber Category Badge */}
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
              {currentArticle.category || 'Spiritual'}
            </span>
          </div>

          {/* Main Title */}
          <h1
            style={{
              fontFamily: '"PT Sans", "Georgia", serif',
              fontSize: 'clamp(28px, 4vw, 44px)',
              fontWeight: 700,
              color: '#0b231c',
              margin: '0 0 12px',
              letterSpacing: '-0.5px',
              lineHeight: 1.25
            }}
          >
            {currentArticle.title}
          </h1>

          {/* Excerpt / Subtitle if available */}
          {currentArticle.excerpt && (
            <p
              style={{
                fontFamily: '"PT Sans", serif',
                fontSize: 'clamp(16px, 1.9vw, 19.5px)',
                color: '#64748b',
                maxWidth: '740px',
                margin: '0 auto 22px',
                fontStyle: 'italic',
                lineHeight: 1.5
              }}
            >
              {currentArticle.excerpt}
            </p>
          )}

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
              <span>{currentArticle.author || 'Shree Abhaydas Ji Ashram'}</span>
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
              <span>{formattedDate}</span>
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
              <span>{readTime} min read</span>
            </span>
          </div>

          {/* Featured Hero Banner Image */}
          {currentArticle.featuredImage && (
            <div
              style={{
                marginTop: '34px',
                borderRadius: '22px',
                overflow: 'hidden',
                boxShadow: '0 12px 35px rgba(0, 0, 0, 0.08)',
                backgroundColor: '#ffffff',
                maxHeight: '480px'
              }}
            >
              <img
                src={currentArticle.featuredImage}
                alt={currentArticle.title}
                style={{ width: '100%', maxHeight: '480px', objectFit: 'cover', display: 'block' }}
                onError={(e) => {
                  e.currentTarget.src = '/home-page-image/gurukul.png';
                }}
              />
            </div>
          )}
        </header>

        {/* Article Body inside White Rounded Card */}
        <article className="adp-card-content">
          <div
            className="adp-article-body"
            dangerouslySetInnerHTML={{ __html: currentArticle.content || '<p>Article content coming soon.</p>' }}
          />

          {/* Secondary Images Gallery (if any) */}
          {Array.isArray(currentArticle.secondaryImages) && currentArticle.secondaryImages.length > 0 && (
            <div style={{ marginTop: '40px', paddingTop: '30px', borderTop: '1px solid #f1f5f9' }}>
              <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#0b231c', marginBottom: '16px' }}>
                Event & Satsang Photographs
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
                {currentArticle.secondaryImages.map((secImg, idx) => (
                  <div key={idx} style={{ borderRadius: '14px', overflow: 'hidden', height: '180px', boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}>
                    <img src={secImg} alt={`Secondary photo ${idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Article Footer & Action Buttons */}
          <div
            style={{
              marginTop: '50px',
              paddingTop: '32px',
              borderTop: '1px solid #f1f5f9',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '16px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
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

              {onOpenVolunteer && (
                <button
                  type="button"
                  onClick={onOpenVolunteer}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    backgroundColor: '#ffffff',
                    color: '#0b231c',
                    border: '1px solid #cbd5e1',
                    padding: '12px 20px',
                    borderRadius: '8px',
                    fontWeight: 600,
                    fontSize: '14px',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#0b231c')}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#cbd5e1')}
                >
                  <UserCheck size={16} color="#d59a1a" />
                  <span>Join as Volunteer</span>
                </button>
              )}
            </div>

            <button
              type="button"
              onClick={() => onNavigate && onNavigate('pages')}
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

