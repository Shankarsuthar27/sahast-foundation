import React from 'react';
import { Calendar, ArrowRight } from 'lucide-react';
import { useCms } from '../context/CmsContext';

export default function LatestBlogsSection({ onSelectBlog }) {
  const { homepageData } = useCms();
  const blogsData = homepageData?.latestBlogs || {};

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

  const rawBlogs = blogsData.blogs;
  const parsedBlogs = Array.isArray(rawBlogs)
    ? rawBlogs
    : (rawBlogs && typeof rawBlogs === 'object' ? Object.values(rawBlogs) : []);
  const blogs = parsedBlogs.length > 0 ? parsedBlogs : defaultBlogs;

  return (
    <section 
      id="blogs"
      style={{
        padding: '75px 0 85px',
        backgroundColor: '#ffffff',
        position: 'relative'
      }}
    >
      <div className="container" style={{ position: 'relative' }}>
        
        {/* Right side indicator ribbon */}
        <div 
          style={{
            position: 'absolute',
            right: '-12px',
            top: '40%',
            width: '14px',
            height: '38px',
            backgroundColor: '#e31937',
            borderRadius: '4px 0 0 4px',
            boxShadow: '0 2px 8px rgba(227, 25, 55, 0.4)'
          }}
        />

        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '45px' }}>
          <div 
            style={{
              display: 'inline-block',
              color: '#d59a1a',
              fontSize: '13.5px',
              fontWeight: 800,
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              marginBottom: '8px'
            }}
          >
            {blogsData.badge || 'ARTICLES & PRAVACHAN'}
          </div>

          <h2 
            style={{
              fontSize: 'clamp(28px, 3.2vw, 38px)',
              fontWeight: 800,
              color: '#1a1a1a',
              marginBottom: '10px'
            }}
          >
            {blogsData.heading || 'Our Latest Blogs'}
          </h2>

          <p 
            style={{
              fontSize: '16px',
              color: '#666666',
              maxWidth: '620px',
              margin: '0 auto'
            }}
          >
            {blogsData.subheading ||
              'Insights, teachings, and updates from our initiatives and spiritual discourses.'}
          </p>
        </div>

        {/* 3 Blog Cards */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))',
            gap: '28px'
          }}
        >
          {blogs.map((blog) => (
            <article
              key={blog.id}
              onClick={() => onSelectBlog && onSelectBlog(blog)}
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '20px',
                border: '1px solid #ededed',
                overflow: 'hidden',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)',
                transition: 'all 0.3s ease',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.boxShadow = '0 18px 40px rgba(0, 0, 0, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.05)';
              }}
            >
              {/* Image with Tag & Header Banner */}
              <div style={{ position: 'relative', height: '210px', overflow: 'hidden' }}>
                <img
                  src={blog.image}
                  alt={blog.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => {
                    e.currentTarget.src = blog.fallback;
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
                    padding: '3px 10px',
                    borderRadius: '12px',
                    fontSize: '11px',
                    fontWeight: 700
                  }}
                >
                  {blog.badge}
                </div>
              </div>

              {/* Card Content */}
              <div style={{ padding: '24px 22px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#888888', marginBottom: '10px' }}>
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

      </div>
    </section>
  );
}
