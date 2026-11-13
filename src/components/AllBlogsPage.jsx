import React, { useState, useEffect } from 'react';
import { Home, ChevronRight, Calendar, User, ArrowRight, Search, Tag, Sparkles } from 'lucide-react';
import { useCms } from '../context/CmsContext';

export default function AllBlogsPage({ onNavigate, onSelectBlog }) {
  const { homepageData, newsList } = useCms();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const defaultBlogs = [
    {
      id: 1,
      image: '/home-page-image/meditation-1-e1780126777484.png',
      fallback: '/images/img_20.jpg',
      badge: 'Spiritual',
      bannerText: 'MEDITATION FOR YOUTH',
      title: 'Meditation and its Impact on Modern Youth',
      date: 'October 2026',
      excerpt: 'Discover how ancient dhyana techniques reduce anxiety, enhance mental clarity, and cultivate purpose in today\'s fast-paced digital world.',
      author: 'Pujya Abhaydas Ji'
    },
    {
      id: 2,
      image: '/home-page-image/gurukul.png',
      fallback: '/images/img_26.jpg',
      badge: 'Education',
      bannerText: 'GURUKUL EDUCATION',
      title: 'Why Gurukul Education is Relevant in Modern India',
      date: 'September 2026',
      excerpt: 'Blending timeless Vedic ethics with contemporary CBSE science prepares grounded youth for compassionate leadership and nation-building.',
      author: 'Dham Vidyalaya'
    },
    {
      id: 3,
      image: '/home-page-image/The-Power-of-Seva-Serving-Humanity-with-Compassion.png',
      fallback: '/images/img_17.jpg',
      badge: 'Social Welfare',
      bannerText: 'SEVA & HUMANITY',
      title: 'How Nishkam Seva Can Transform One\'s Life',
      date: 'August 2026',
      excerpt: 'Giving without expectation is the purest form of devotion, purifying our consciousness and awakening boundless contentment.',
      author: 'Seva Trust'
    }
  ];

  // Map CMS news articles to live blog cards
  const publishedArticles = (newsList || []).filter(
    (a) => !a.status || a.status === 'published'
  );

  // Sort articles newest first
  const sortedArticles = [...publishedArticles].sort((a, b) => {
    const timeA = new Date(a.publishedAt || a.createdAt || 0).getTime();
    const timeB = new Date(b.publishedAt || b.createdAt || 0).getTime();
    return timeB - timeA;
  });

  const dynamicArticleBlogs = sortedArticles.map((article) => {
    let formattedDate = 'Recent';
    if (article.publishedAt || article.createdAt) {
      try {
        const d = new Date(article.publishedAt || article.createdAt);
        if (!isNaN(d.getTime())) {
          formattedDate = d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
        }
      } catch (_) {}
    }

    const plainExcerpt =
      article.excerpt ||
      (article.content
        ? article.content.replace(/<[^>]+>/g, ' ').trim().slice(0, 150) + '...'
        : '');

    return {
      id: article.id,
      isArticle: true,
      articleData: article,
      image: article.featuredImage || '/home-page-image/gurukul.png',
      fallback: '/home-page-image/gurukul.png',
      badge: article.category || 'Spiritual',
      bannerText: (article.category || 'ARTICLE').toUpperCase(),
      title: article.title,
      date: formattedDate,
      excerpt: plainExcerpt,
      author: article.author || 'Shree Abhaydas Ji Ashram'
    };
  });

  // Combine all blogs without slicing
  const allBlogsMap = new Map();
  dynamicArticleBlogs.forEach((b) => allBlogsMap.set(b.title.toLowerCase().trim(), b));
  defaultBlogs.forEach((b) => {
    if (!allBlogsMap.has(b.title.toLowerCase().trim())) {
      allBlogsMap.set(b.title.toLowerCase().trim(), b);
    }
  });

  const allBlogs = Array.from(allBlogsMap.values());

  // Extract unique categories
  const categories = ['All', ...Array.from(new Set(allBlogs.map((b) => b.badge).filter(Boolean)))];

  // Filter by category and search
  const filteredBlogs = allBlogs.filter((blog) => {
    const matchesCategory =
      selectedCategory === 'All' ||
      blog.badge?.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch =
      !searchQuery.trim() ||
      blog.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.excerpt?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.author?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCardClick = (blog) => {
    if (onSelectBlog) {
      onSelectBlog(blog);
    } else if (onNavigate) {
      if (blog.isArticle && blog.articleData) {
        onNavigate('article', null, null, blog.articleData);
      } else if (blog.id === 1) {
        onNavigate('blog-meditation');
      } else if (blog.id === 2) {
        onNavigate('blog-gurukul');
      } else if (blog.id === 3) {
        onNavigate('blog-seva');
      } else {
        onNavigate('article', null, null, blog.articleData || blog);
      }
    }
  };

  return (
    <div className="all-blogs-page" style={{ backgroundColor: '#faf8f5', minHeight: '100vh' }}>
      <style>{`
        .ab-container {
          max-width: 1240px;
          margin: 0 auto;
          padding: 0 24px;
        }

        .ab-hero-banner {
          position: relative;
          background: linear-gradient(135deg, rgba(8, 20, 50, 0.92) 0%, rgba(12, 28, 68, 0.88) 100%), url(/images/breadcrumb-03.jpg);
          background-size: cover;
          background-position: center;
          padding: 95px 0 85px;
          color: #ffffff;
          border-bottom: 3px solid #fabc3f;
        }

        .ab-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 32px;
          margin-top: 40px;
          margin-bottom: 80px;
        }

        @media (max-width: 768px) {
          .ab-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }
        }

        .ab-card {
          background-color: #ffffff;
          border-radius: 20px;
          border: 1px solid #ededed;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
          cursor: pointer;
        }

        .ab-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 18px 40px rgba(0, 0, 0, 0.1);
        }
      `}</style>

      {/* Hero Banner with Breadcrumbs */}
      <section className="ab-hero-banner">
        <div className="ab-container" style={{ textAlign: 'center' }}>
          {/* Top Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              padding: '6px 18px',
              borderRadius: '50px',
              marginBottom: '20px',
              fontSize: '13.5px',
              backdropFilter: 'blur(4px)'
            }}
          >
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                if (onNavigate) onNavigate('home');
              }}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: '#fabc3f', textDecoration: 'none', fontWeight: 600 }}
            >
              <Home size={13} />
              <span>Home</span>
            </a>
            <ChevronRight size={13} color="rgba(255,255,255,0.6)" />
            <span style={{ color: 'rgba(255,255,255,0.85)' }}>Pages</span>
            <ChevronRight size={13} color="rgba(255,255,255,0.6)" />
            <span style={{ color: '#ffffff', fontWeight: 700 }}>All Articles & Blogs</span>
          </nav>

          <div
            style={{
              color: '#fabc3f',
              fontSize: '13px',
              fontWeight: 800,
              letterSpacing: '2px',
              textTransform: 'uppercase',
              marginBottom: '10px'
            }}
          >
            ARTICLES & PRAVACHAN ARCHIVE
          </div>

          <h1
            style={{
              fontSize: 'clamp(32px, 4vw, 46px)',
              fontWeight: 800,
              color: '#ffffff',
              margin: '0 0 14px',
              letterSpacing: '-0.5px'
            }}
          >
            Spiritual Articles & Blogs
          </h1>

          <p
            style={{
              fontSize: '16.5px',
              color: '#cbd5e1',
              maxWidth: '640px',
              margin: '0 auto',
              lineHeight: 1.6
            }}
          >
            Explore spiritual wisdom, educational insights, and service stories from Shree Abhaydas Ji Ashram and Sahast Foundation.
          </p>
        </div>
      </section>

      {/* Main Body */}
      <div className="ab-container" style={{ paddingTop: '50px', paddingBottom: '70px' }}>
        {/* Controls: Search & Category Filter */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
          {/* Search bar */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: '560px'
              }}
            >
              <Search
                size={18}
                color="#94a3b8"
                style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }}
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles by title, author, or keyword..."
                style={{
                  width: '100%',
                  padding: '13px 18px 13px 46px',
                  borderRadius: '50px',
                  border: '1px solid #e2e8f0',
                  backgroundColor: '#ffffff',
                  fontSize: '14.5px',
                  outline: 'none',
                  boxShadow: '0 4px 18px rgba(0,0,0,0.04)',
                  transition: 'border-color 0.2s'
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = '#d59a1a')}
                onBlur={(e) => (e.currentTarget.style.borderColor = '#e2e8f0')}
              />
            </div>
          </div>

          {/* Category Filter Pills */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexWrap: 'wrap',
              gap: '10px'
            }}
          >
            {categories.map((cat) => {
              const isActive = selectedCategory.toLowerCase() === cat.toLowerCase();
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    padding: '8px 20px',
                    borderRadius: '50px',
                    fontSize: '13.5px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    border: isActive ? '1px solid #d59a1a' : '1px solid #e2e8f0',
                    backgroundColor: isActive ? '#0b231c' : '#ffffff',
                    color: isActive ? '#ffffff' : '#475569',
                    boxShadow: isActive ? '0 4px 14px rgba(11,35,28,0.15)' : 'none'
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Counter */}
        <div style={{ marginTop: '30px', textAlign: 'center', fontSize: '13.5px', color: '#64748b', fontWeight: 600 }}>
          Showing {filteredBlogs.length} {filteredBlogs.length === 1 ? 'article' : 'articles'}
          {selectedCategory !== 'All' ? ` in "${selectedCategory}"` : ''}
        </div>

        {/* Blog Cards Grid */}
        {filteredBlogs.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              padding: '60px 20px',
              backgroundColor: '#ffffff',
              borderRadius: '20px',
              border: '1px dashed #cbd5e1',
              marginTop: '30px'
            }}
          >
            <p style={{ fontSize: '16px', color: '#64748b', margin: 0 }}>
              No articles found matching &quot;{searchQuery}&quot;.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              style={{
                marginTop: '16px',
                padding: '8px 20px',
                backgroundColor: '#0b231c',
                color: '#ffffff',
                borderRadius: '50px',
                fontSize: '13px',
                fontWeight: 700,
                border: 'none',
                cursor: 'pointer'
              }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="ab-grid">
            {filteredBlogs.map((blog) => (
              <article
                key={blog.id}
                className="ab-card"
                onClick={() => handleCardClick(blog)}
              >
                {/* Image with Tag */}
                <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
                  <img
                    src={blog.image}
                    alt={blog.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(e) => {
                      e.currentTarget.src = blog.fallback || '/home-page-image/gurukul.png';
                    }}
                  />

                  {/* Category Pill */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '12px',
                      right: '12px',
                      backgroundColor: '#e31937',
                      color: '#ffffff',
                      padding: '4px 12px',
                      borderRadius: '12px',
                      fontSize: '11px',
                      fontWeight: 700,
                      boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
                    }}
                  >
                    {blog.badge}
                  </div>
                </div>

                {/* Card Content */}
                <div style={{ padding: '24px 22px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '13px',
                      color: '#888888',
                      marginBottom: '10px'
                    }}
                  >
                    <Calendar size={14} color="#d59a1a" />
                    <span>{blog.date}</span>
                    <span style={{ margin: '0 4px' }}>•</span>
                    <span>{blog.author}</span>
                  </div>

                  <h3
                    style={{
                      fontSize: '19px',
                      fontWeight: 700,
                      color: '#1a1a1a',
                      lineHeight: 1.35,
                      marginBottom: '10px'
                    }}
                  >
                    {blog.title}
                  </h3>

                  <p
                    style={{
                      fontSize: '14.5px',
                      color: '#666666',
                      lineHeight: '24px',
                      marginBottom: '20px',
                      flex: 1
                    }}
                  >
                    {blog.excerpt}
                  </p>

                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      color: '#e31937',
                      fontWeight: 700,
                      fontSize: '14.5px',
                      padding: 0
                    }}
                  >
                    <span>Read Full Article</span>
                    <ArrowRight size={15} />
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

