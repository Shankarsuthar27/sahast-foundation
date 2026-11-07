import React, { useEffect } from 'react';
import { Home, ChevronRight, Calendar, MapPin, Clock, Heart, UserCheck, ArrowRight } from 'lucide-react';
import { useCms } from '../context/CmsContext';

export default function EventsPage({ onNavigate, onOpenDonate, onOpenVolunteer }) {
  const { eventsList } = useCms();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const defaultEvents = [
    {
      id: 1,
      title: '7-Day Shrimad Bhagwat Gyan Yagna Mahotsav',
      date: '2026-11-01 — 2026-11-07',
      time: '02:00 PM - 06:00 PM Daily',
      location: 'Sadguru Trikam Das Ji Dham • Takhatgarh, Pali, Rajasthan',
      description: 'Organized by: Shri Guru Puram Trust (+91 8696298489)',
      badge: 'Spiritual Yatra',
      badgeColor: '#0f382c',
      featuredImage: '/home-page-image/WhatsApp-Image-2026-05-28-at-13.31.06-e1779955352658.jpeg'
    },
    {
      id: 2,
      title: 'Gau Seva Mahasammelan & Vedic Havan',
      date: '2026-11-18 — 2026-11-19',
      time: '08:00 AM - 01:00 PM',
      location: 'Shri Guru Puram Gaushala Complex • Takhatgarh, Pali, Rajasthan',
      description: 'Organized by: Ashram Seva Samiti (+91 8696298489)',
      badge: 'Spiritual Yatra',
      badgeColor: '#0f382c',
      featuredImage: '/home-page-image/WhatsApp-Image-2026-05-26-at-21.23.523-e1779814853502.jpeg'
    },
    {
      id: 3,
      title: 'Youth Meditation & Character Building Camp',
      date: '2026-10-18 — 2026-10-21',
      time: '06:00 AM - 08:30 PM Daily',
      location: 'Dhyana Mandapam, Ashram Campus • Takhatgarh, Pali, Rajasthan',
      description: 'Organized by: Vedic Gurukul Faculty (+91 8696298489)',
      badge: 'Ongoing Live',
      badgeColor: '#ea580c',
      featuredImage: '/home-page-image/meditation-1-e1780126777484.png'
    },
    {
      id: 4,
      title: 'Sharad Purnima Mahotsav & Ras Utsav',
      date: '2026-10-10 — 2026-10-11',
      time: '07:00 PM - 11:30 PM',
      location: 'Main Temple Courtyard • Takhatgarh, Pali, Rajasthan',
      description: 'Organized by: Pujya Maharaj Ji Seva Mandal (+91 8696298489)',
      badge: 'Spiritual Yatra',
      badgeColor: '#0f382c',
      featuredImage: '/home-page-image/WhatsApp-Image-2026-05-26-at-0-e1779814877129.jpeg'
    },
    {
      id: 5,
      title: 'diwali',
      date: '2026-11-07 — 2026-11-14',
      time: '02:00 PM - 06:00 PM Daily',
      location: 'Sadguru Trikam Das Ji Dham • Takhatgarh, Pali, Rajasthan',
      description: 'Organized by: Shri Guru Puram Trust (+91 8696298489)',
      badge: 'Spiritual Yatra',
      badgeColor: '#0f382c',
      featuredImage: '/home-page-image/WhatsApp-Image-2026-05-26-at-21.23.386-e1780038882424.jpeg'
    }
  ];

  const getFallbackImage = (title = '', idx = 0) => {
    const t = (title || '').toLowerCase();
    if (t.includes('bhagwat') || t.includes('yagna') || t.includes('katha') || t.includes('gyan')) {
      return '/home-page-image/WhatsApp-Image-2026-05-28-at-13.31.06-e1779955352658.jpeg';
    }
    if (t.includes('gau') || t.includes('cow') || t.includes('havan')) {
      return '/home-page-image/WhatsApp-Image-2026-05-26-at-21.23.523-e1779814853502.jpeg';
    }
    if (t.includes('meditation') || t.includes('dhyan') || t.includes('youth') || t.includes('gurukul')) {
      return '/home-page-image/meditation-1-e1780126777484.png';
    }
    if (t.includes('sharad') || t.includes('purnima') || t.includes('ras') || t.includes('utsav')) {
      return '/home-page-image/WhatsApp-Image-2026-05-26-at-0-e1779814877129.jpeg';
    }
    if (t.includes('diwali') || t.includes('deepotsav')) {
      return '/home-page-image/WhatsApp-Image-2026-05-26-at-21.23.386-e1780038882424.jpeg';
    }
    const fallbacks = [
      '/home-page-image/WhatsApp-Image-2026-05-28-at-13.31.06-e1779955352658.jpeg',
      '/home-page-image/WhatsApp-Image-2026-05-26-at-21.23.523-e1779814853502.jpeg',
      '/home-page-image/meditation-1-e1780126777484.png',
      '/home-page-image/WhatsApp-Image-2026-05-26-at-0-e1779814877129.jpeg',
      '/home-page-image/WhatsApp-Image-2026-05-26-at-21.23.386-e1780038882424.jpeg'
    ];
    return fallbacks[idx % fallbacks.length];
  };

  const upcomingEvents = eventsList && eventsList.length > 0
    ? eventsList.map((e, idx) => ({
        id: e.id || idx,
        title: e.title,
        date: e.startDate ? (e.endDate && e.endDate !== e.startDate ? `${e.startDate} — ${e.endDate}` : e.startDate) : 'Upcoming',
        time: e.timing || '02:00 PM - 06:00 PM',
        location: `${e.venue || ''}${e.location ? ` • ${e.location}` : ''}`,
        description: e.organizerContact ? `Organized by: ${e.organizerContact}` : 'Divine spiritual discourse and satsang program under Pujya Maharaj Ji.',
        badge: e.status === 'ongoing' ? 'Ongoing Live' : 'Spiritual Yatra',
        badgeColor: e.status === 'ongoing' ? '#ea580c' : '#0f382c',
        liveStreamUrl: e.liveStreamUrl,
        featuredImage: e.featuredImage || getFallbackImage(e.title, idx)
      }))
    : defaultEvents;

  return (
    <div className="events-page-wrapper" style={{ backgroundColor: '#ffffff', minHeight: '100vh' }}>
      <style>{`
        .events-banner {
          position: relative;
          background-size: cover;
          background-position: center center;
          padding: 135px 0 95px;
          background-repeat: no-repeat;
          z-index: 1;
        }
        .events-banner::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(8, 20, 50, 0.88) 0%, rgba(12, 28, 68, 0.84) 100%);
          z-index: -1;
        }
        .events-banner-inner {
          max-width: 1320px;
          margin: 0 auto;
          padding: 0 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 20px;
        }
        .events-title {
          font-family: 'PT Sans', 'Georgia', serif;
          font-size: clamp(34px, 4.5vw, 48px);
          font-weight: 700;
          color: #ffffff;
          margin: 0;
          letter-spacing: -0.5px;
          position: relative;
          display: inline-block;
        }
        .events-title-underline {
          position: absolute;
          left: 0;
          bottom: -10px;
          width: 65px;
          height: 3px;
          background-color: #e31937;
          border-radius: 2px;
        }
        .events-breadcrumb {
          display: flex;
          align-items: center;
          gap: 10px;
          list-style: none;
          margin: 0;
          padding: 0;
          font-size: 15px;
          font-weight: 600;
        }
        .events-breadcrumb a {
          color: #fabc3f;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: opacity 0.2s ease;
        }
        .events-breadcrumb a:hover {
          opacity: 0.85;
        }
        .events-card {
          border: 1px solid #edf2f7;
          border-radius: 18px;
          background: #ffffff;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
          transition: transform 0.28s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.28s cubic-bezier(0.16, 1, 0.3, 1);
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }
        .events-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 36px rgba(11, 35, 28, 0.12);
        }
        .events-card-img-box {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 10;
          overflow: hidden;
          background-color: #f1f5f9;
        }
        .events-card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.5s ease;
        }
        .events-card:hover .events-card-img {
          transform: scale(1.06);
        }
        .events-card-badge {
          position: absolute;
          top: 14px;
          left: 14px;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 14px;
          border-radius: 50px;
          font-size: 11.5px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
          z-index: 2;
        }
        .events-card-body {
          padding: 24px 24px 26px;
          display: flex;
          flex-direction: column;
          flex: 1;
        }
      `}</style>

      {/* 1. Page Banner Matching Exact Image */}
      <section
        className="events-banner"
        style={{
          backgroundImage: `url(/images/page-banner.jpg)`
        }}
      >
        <div className="events-banner-inner">
          {/* Page Title with Red Accent Bar under "Events" */}
          <div>
            <h1 className="events-title">
              Our Events
              <span className="events-title-underline" />
            </h1>
          </div>

          {/* Breadcrumb Navigation: Home > Our Events */}
          <nav aria-label="Breadcrumb">
            <ol className="events-breadcrumb">
              <li>
                <a
                  href="/"
                  onClick={(e) => {
                    e.preventDefault();
                    if (onNavigate) onNavigate('home');
                  }}
                >
                  <Home size={16} />
                  <span>Home</span>
                </a>
              </li>
              <li style={{ color: 'rgba(255, 255, 255, 0.45)', display: 'inline-flex', alignItems: 'center' }}>
                <ChevronRight size={14} />
              </li>
              <li style={{ color: '#ffffff', fontWeight: 600 }}>
                Our Events
              </li>
            </ol>
          </nav>
        </div>
      </section>

      {/* 2. Main Content Area matching reference screenshot */}
      <section
        style={{
          padding: '80px 0 100px',
          backgroundColor: '#ffffff'
        }}
      >
        <div
          style={{
            maxWidth: '1240px',
            margin: '0 auto',
            padding: '0 24px'
          }}
        >
          {/* Header Notice */}
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                backgroundColor: '#fff1f2',
                color: '#e31937',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px',
                boxShadow: '0 6px 20px rgba(227, 25, 55, 0.12)'
              }}
            >
              <Calendar size={30} strokeWidth={2.2} />
            </div>

            <h2
              style={{
                fontSize: 'clamp(26px, 3.2vw, 36px)',
                fontWeight: 700,
                color: '#0b231c',
                marginBottom: '12px',
                fontFamily: '"PT Sans", "Georgia", serif'
              }}
            >
              Upcoming Gatherings & Seva Programs
            </h2>

            <p
              style={{
                fontSize: '16px',
                lineHeight: '27px',
                color: '#64748b',
                maxWidth: '680px',
                margin: '0 auto'
              }}
            >
              Join us in divine communion, humanitarian seva, and educational initiatives under the divine guidance of Pujya Swami Shri Abhay Das Ji Maharaj.
            </p>
          </div>

          {/* Events Schedule Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '30px',
              marginBottom: '60px'
            }}
          >
            {upcomingEvents.map((evt) => (
              <div key={evt.id} className="events-card">
                {/* Event Image Banner with floating Badge */}
                <div className="events-card-img-box">
                  <img
                    src={evt.featuredImage || '/home-page-image/WhatsApp-Image-2026-05-28-at-13.31.06-e1779955352658.jpeg'}
                    alt={evt.title}
                    className="events-card-img"
                    onError={(e) => {
                      e.currentTarget.src = '/home-page-image/WhatsApp-Image-2026-05-28-at-13.31.06-e1779955352658.jpeg';
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(180deg, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0) 45%, rgba(0,0,0,0.45) 100%)',
                      pointerEvents: 'none'
                    }}
                  />
                  <div
                    className="events-card-badge"
                    style={{
                      backgroundColor: evt.badge === 'Ongoing Live' ? '#ea580c' : '#0f382c',
                      color: '#ffffff'
                    }}
                  >
                    {evt.badge === 'Ongoing Live' && (
                      <span
                        style={{
                          width: '7px',
                          height: '7px',
                          borderRadius: '50%',
                          backgroundColor: '#ffffff',
                          display: 'inline-block'
                        }}
                      />
                    )}
                    <span>{evt.badge}</span>
                  </div>

                  {evt.liveStreamUrl && (
                    <a
                      href={evt.liveStreamUrl}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        position: 'absolute',
                        top: '14px',
                        right: '14px',
                        backgroundColor: '#e31937',
                        color: '#ffffff',
                        padding: '5px 12px',
                        borderRadius: '50px',
                        fontSize: '11px',
                        fontWeight: 700,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '5px',
                        textDecoration: 'none',
                        boxShadow: '0 4px 12px rgba(227, 25, 55, 0.35)',
                        zIndex: 2
                      }}
                    >
                      <span>Watch Live</span>
                    </a>
                  )}
                </div>

                {/* Event Card Content */}
                <div className="events-card-body">
                  <h3
                    style={{
                      fontSize: '20px',
                      fontWeight: 700,
                      color: '#0b231c',
                      lineHeight: '28px',
                      marginBottom: '12px',
                      fontFamily: '"PT Sans", serif'
                    }}
                  >
                    {evt.title}
                  </h3>

                  <p
                    style={{
                      fontSize: '14.5px',
                      lineHeight: '23px',
                      color: '#64748b',
                      marginBottom: '18px',
                      flex: 1
                    }}
                  >
                    {evt.description}
                  </p>

                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '9px',
                      paddingTop: '16px',
                      borderTop: '1px solid #f1f5f9',
                      fontSize: '13.5px',
                      color: '#475569',
                      marginBottom: '22px'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Calendar size={15} color="#e31937" style={{ flexShrink: 0 }} />
                      <div><strong style={{ color: '#1e293b' }}>Date:</strong> {evt.date}</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Clock size={15} color="#fabc3f" style={{ flexShrink: 0 }} />
                      <div><strong style={{ color: '#1e293b' }}>Time:</strong> {evt.time}</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                      <MapPin size={15} color="#0b231c" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span><strong style={{ color: '#1e293b' }}>Location:</strong> {evt.location}</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    <button
                      type="button"
                      onClick={onOpenVolunteer}
                      style={{
                        flex: 1,
                        minWidth: '130px',
                        padding: '10px 16px',
                        backgroundColor: '#0b231c',
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: '8px',
                        fontWeight: 600,
                        fontSize: '13.5px',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        transition: 'background-color 0.2s'
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#153c30')}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#0b231c')}
                    >
                      <UserCheck size={15} />
                      <span>Volunteer</span>
                    </button>

                    <button
                      type="button"
                      onClick={onOpenDonate}
                      style={{
                        flex: 1,
                        minWidth: '130px',
                        padding: '10px 16px',
                        backgroundColor: '#e31937',
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: '8px',
                        fontWeight: 600,
                        fontSize: '13.5px',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        transition: 'background-color 0.2s'
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#cc142f')}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#e31937')}
                    >
                      <Heart size={15} fill="currentColor" />
                      <span>Support</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Seva Action Strip */}
          <div
            style={{
              backgroundColor: '#faf8f5',
              borderRadius: '16px',
              padding: '36px 30px',
              border: '1px solid #f1ece4',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '24px'
            }}
          >
            <div>
              <h4
                style={{
                  fontSize: '20px',
                  fontWeight: 700,
                  color: '#0b231c',
                  margin: '0 0 6px',
                  fontFamily: '"PT Sans", serif'
                }}
              >
                Would you like to organize or sponsor a Seva event?
              </h4>
              <p style={{ margin: 0, fontSize: '15px', color: '#64748b' }}>
                Contact us to arrange Annakshetra, Gaushala Seva, or medical assistance camps in your region.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={() => onNavigate && onNavigate('home', '#contact')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: '#0b231c',
                  color: '#ffffff',
                  padding: '12px 22px',
                  borderRadius: '8px',
                  fontWeight: 600,
                  fontSize: '14px',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'opacity 0.2s ease'
                }}
              >
                <span>Contact Ashram</span>
                <ArrowRight size={16} />
              </button>

              <button
                type="button"
                onClick={() => onNavigate && onNavigate('gallery')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: '#ffffff',
                  color: '#0b231c',
                  padding: '12px 22px',
                  borderRadius: '8px',
                  fontWeight: 600,
                  fontSize: '14px',
                  border: '1px solid #cbd5e1',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s ease'
                }}
              >
                <span>View Past Stories</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
