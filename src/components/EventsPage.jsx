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
      title: '7-Day Shrimad Bhagwat Mahapuran Gyan Yagna',
      date: 'November 01 - 07, 2026',
      time: '02:00 PM - 06:00 PM Daily',
      location: 'Sadguru Trikam Das Ji Dham, Takhatgarh, Pali (Rajasthan)',
      description: 'Divine spiritual discourse and pravachan under the benign presence of Pujya Swami Shri Abhay Das Ji Maharaj, followed by daily Maha Prasad Bhandara.',
      badge: 'Spiritual Discourse',
      badgeColor: '#e31937'
    },
    {
      id: 2,
      title: 'Gau Seva Mahasammelan & Vedic Havan',
      date: 'November 18 - 19, 2026',
      time: '08:00 AM - 01:00 PM',
      location: 'Shri Guru Puram Gaushala Complex, Takhatgarh, Pali',
      description: 'Massive cow protection gathering, veterinary healthcare camp, and Vedic havan for global peace and environmental harmony.',
      badge: 'Gau Seva',
      badgeColor: '#0b231c'
    },
    {
      id: 3,
      title: 'Youth Meditation & Character Building Camp',
      date: 'December 12 - 15, 2026',
      time: '06:00 AM - 08:30 PM Daily',
      location: 'Dhyana Mandapam, Ashram Campus, Takhatgarh, Pali',
      description: 'Value-based character empowerment, Dhyana techniques, and Vedic chanting for rural and tribal youth.',
      badge: 'Youth Satsang',
      badgeColor: '#fabc3f'
    }
  ];

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
        liveStreamUrl: e.liveStreamUrl
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
          border-radius: 14px;
          background: #ffffff;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .events-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.09);
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
              <div
                key={evt.id}
                className="events-card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '30px',
                  borderTop: `4px solid ${evt.badgeColor}`
                }}
              >
                <div style={{ marginBottom: '14px' }}>
                  <span
                    style={{
                      display: 'inline-block',
                      backgroundColor: evt.badge === 'Gurukulam Celebration' ? '#fff8e6' : evt.badge === 'Health Seva' ? '#ecfdf5' : '#fff1f2',
                      color: evt.badgeColor === '#fabc3f' ? '#b45309' : evt.badgeColor,
                      fontSize: '12.5px',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                      padding: '5px 12px',
                      borderRadius: '50px'
                    }}
                  >
                    {evt.badge}
                  </span>
                </div>

                <h3
                  style={{
                    fontSize: '20px',
                    fontWeight: 700,
                    color: '#0b231c',
                    lineHeight: '28px',
                    marginBottom: '14px',
                    fontFamily: '"PT Sans", serif'
                  }}
                >
                  {evt.title}
                </h3>

                <p
                  style={{
                    fontSize: '14.5px',
                    lineHeight: '24px',
                    color: '#64748b',
                    marginBottom: '20px',
                    flex: 1
                  }}
                >
                  {evt.description}
                </p>

                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    paddingTop: '16px',
                    borderTop: '1px solid #f1f5f9',
                    fontSize: '13.5px',
                    color: '#475569',
                    marginBottom: '22px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Calendar size={15} color="#e31937" style={{ flexShrink: 0 }} />
                    <strong style={{ color: '#1e293b' }}>Date:</strong> {evt.date}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Clock size={15} color="#fabc3f" style={{ flexShrink: 0 }} />
                    <strong style={{ color: '#1e293b' }}>Time:</strong> {evt.time}
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
                      minWidth: '140px',
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
                      minWidth: '140px',
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
