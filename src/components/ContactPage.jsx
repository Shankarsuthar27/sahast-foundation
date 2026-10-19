import React, { useState, useEffect } from 'react';
import { Home, ChevronRight, CheckCircle, Send } from 'lucide-react';

export default function ContactPage({ onNavigate }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSubmitted(false), 6000);
    }, 600);
  };

  return (
    <div className="contact-page-wrapper" style={{ backgroundColor: '#ffffff', minHeight: '100vh' }}>
      <style>{`
        /* Contact Page Styles matching reference screenshot */
        .cp-banner {
          position: relative;
          background-size: cover;
          background-position: center center;
          padding: 135px 0 95px;
          background-repeat: no-repeat;
          z-index: 1;
        }
        .cp-banner::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(8, 20, 50, 0.88) 0%, rgba(12, 28, 68, 0.84) 100%);
          z-index: -1;
        }
        .cp-banner-inner {
          max-width: 1320px;
          margin: 0 auto;
          padding: 0 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 20px;
        }
        .cp-page-title {
          font-family: 'PT Sans', 'Georgia', serif;
          font-size: clamp(34px, 4.5vw, 48px);
          font-weight: 700;
          color: #ffffff;
          margin: 0;
          letter-spacing: -0.5px;
          position: relative;
          display: inline-block;
        }
        .cp-title-underline {
          position: absolute;
          left: 0;
          bottom: -10px;
          width: 65px;
          height: 3px;
          background-color: #e31937;
          border-radius: 2px;
        }
        .cp-breadcrumb {
          display: flex;
          align-items: center;
          gap: 10px;
          list-style: none;
          margin: 0;
          padding: 0;
          font-size: 15px;
          font-weight: 600;
        }
        .cp-breadcrumb a {
          color: #fabc3f;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: opacity 0.2s ease;
        }
        .cp-breadcrumb a:hover {
          opacity: 0.85;
        }

        /* Map Embed Container */
        .cp-map-section {
          width: 100%;
          line-height: 0;
          position: relative;
        }
        .cp-map-iframe {
          width: 100%;
          height: 480px;
          border: 0;
          display: block;
        }

        /* Form Controls */
        .cp-form-input {
          width: 100%;
          padding: 15px 20px;
          background-color: #f7f7f7;
          border: 1px solid #eaeaea;
          border-radius: 8px;
          font-size: 14.5px;
          color: #333333;
          margin-bottom: 20px;
          outline: none;
          transition: border-color 0.2s, background-color 0.2s;
          font-family: inherit;
        }
        .cp-form-input:focus {
          border-color: #e31937;
          background-color: #ffffff;
        }
        .cp-form-input::placeholder {
          color: #888888;
          font-style: italic;
        }

        /* Submit Button */
        .cp-submit-btn {
          background-color: #e31937;
          color: #ffffff;
          border: none;
          border-radius: 6px;
          padding: 14px 34px;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          transition: background-color 0.2s, transform 0.2s;
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }
        .cp-submit-btn:hover {
          background-color: #cc142f;
          transform: translateY(-2px);
        }

        /* Floating Yellow Info Card */
        .cp-yellow-card {
          background-color: #fed049;
          border-radius: 28px;
          padding: 55px 45px 50px;
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.08);
          margin-top: -190px;
          position: relative;
          z-index: 10;
        }

        @media (max-width: 991px) {
          .cp-yellow-card {
            margin-top: 30px;
            padding: 40px 30px;
          }
          .cp-map-iframe {
            height: 380px;
          }
        }
      `}</style>

      {/* 1. Header Banner & Breadcrumb */}
      <section
        className="cp-banner"
        style={{
          backgroundImage: `url(/images/page-banner.jpg)`
        }}
      >
        <div className="cp-banner-inner">
          {/* Page Title with Red Accent Bar */}
          <div>
            <h1 className="cp-page-title">
              Contact Us
              <span className="cp-title-underline" />
            </h1>
          </div>

          {/* Breadcrumb Navigation: Home > Contact Us */}
          <nav aria-label="Breadcrumb">
            <ol className="cp-breadcrumb">
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
                Contact Us
              </li>
            </ol>
          </nav>
        </div>
      </section>

      {/* 2. Google Maps Embed Section */}
      <section className="cp-map-section" aria-label="Location Map">
        <iframe
          loading="lazy"
          className="cp-map-iframe"
          src="https://maps.google.com/maps?q=Shri%20Bharat%20Mata%20Statue%20Site%2C%20Shri%20Guru%20Puram%20Ashram%2C%20Takhatgarh%2C%20Pali%2C%20Rajasthan&t=m&z=10&output=embed&iwloc=near"
          title="Shri Bharat Mata Statue Site, Shri Guru Puram Ashram, Takhatgarh, Pali, Rajasthan"
          aria-label="Location Map of Shri Guru Puram Ashram, Takhatgarh"
        />
      </section>

      {/* 3. Main Content: Form & Floating Yellow Card */}
      <section style={{ padding: '40px 0 110px', backgroundColor: '#ffffff' }}>
        <div style={{ maxWidth: '1320px', margin: '0 auto', padding: '0 24px' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '60px',
              alignItems: 'start'
            }}
          >
            {/* Left Side: Contact Form */}
            <div style={{ paddingTop: '20px' }}>
              <div style={{ marginBottom: '28px' }}>
                <h2
                  style={{
                    fontFamily: '"PT Sans", "Georgia", serif',
                    fontSize: 'clamp(26px, 3.2vw, 34px)',
                    fontWeight: 700,
                    color: '#0b231c',
                    margin: 0
                  }}
                >
                  Have Question? Drop A Line
                </h2>
              </div>

              {submitted && (
                <div
                  style={{
                    backgroundColor: '#ecfdf5',
                    border: '1px solid #a7f3d0',
                    color: '#065f46',
                    padding: '16px 20px',
                    borderRadius: '8px',
                    marginBottom: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    fontSize: '15px'
                  }}
                >
                  <CheckCircle size={20} color="#059669" />
                  <span>Thank you! Your message has been sent successfully. Our team will contact you shortly.</span>
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate>
                <div>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Full Name"
                    className="cp-form-input"
                  />
                </div>

                <div>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email Address"
                    className="cp-form-input"
                  />
                </div>

                <div>
                  <input
                    type="text"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Subject"
                    className="cp-form-input"
                  />
                </div>

                <div>
                  <textarea
                    name="message"
                    rows="6"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Message"
                    className="cp-form-input"
                    style={{ resize: 'vertical', minHeight: '150px' }}
                  />
                </div>

                <div>
                  <button type="submit" disabled={isSubmitting} className="cp-submit-btn">
                    {isSubmitting ? (
                      <span>Sending...</span>
                    ) : (
                      <>
                        <Send size={16} />
                        <span>Submit Now</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* Right Side: Floating Yellow Card */}
            <div>
              <div className="cp-yellow-card">
                <h3
                  style={{
                    fontFamily: '"PT Sans", "Georgia", serif',
                    fontSize: 'clamp(24px, 2.6vw, 32px)',
                    fontWeight: 700,
                    color: '#0b231c',
                    marginTop: 0,
                    marginBottom: '20px',
                    lineHeight: '1.25'
                  }}
                >
                  Get In Touch With Sahast Foundation
                </h3>

                <p
                  style={{
                    fontSize: '15.5px',
                    lineHeight: '27px',
                    color: '#2d3748',
                    marginBottom: '36px'
                  }}
                >
                  We are always open to connect with people who wish to support, volunteer, donate, or learn more about our seva activities. Whether you have a question, want to join our mission, or need guidance, feel free to reach out to us.
                </p>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '24px'
                  }}
                >
                  {/* Address info item */}
                  <div>
                    <h4
                      style={{
                        fontSize: '15px',
                        fontWeight: 700,
                        color: '#0b231c',
                        marginBottom: '8px'
                      }}
                    >
                      Address:
                    </h4>
                    <p
                      style={{
                        fontStyle: 'italic',
                        fontSize: '14.5px',
                        lineHeight: '24px',
                        color: '#334155',
                        margin: 0
                      }}
                    >
                      Shri Bharat Mata Statue Site,
                      <br />
                      Shri Guru Puram Ashram,
                      <br />
                      Takhatgarh, Pali,
                      <br />
                      Rajasthan
                    </p>
                  </div>

                  {/* Website & Phone info items */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
                    <div>
                      <h4
                        style={{
                          fontSize: '15px',
                          fontWeight: 700,
                          color: '#0b231c',
                          marginBottom: '6px'
                        }}
                      >
                        Website:
                      </h4>
                      <p style={{ margin: 0 }}>
                        <a
                          href="https://sahastfoundation.in"
                          target="_blank"
                          rel="noreferrer"
                          style={{
                            color: '#e31937',
                            fontWeight: 700,
                            fontStyle: 'italic',
                            textDecoration: 'none',
                            fontSize: '14.5px',
                            textTransform: 'uppercase',
                            letterSpacing: '0.3px'
                          }}
                        >
                          SAHASTFOUNDATION.IN
                        </a>
                      </p>
                    </div>

                    <div>
                      <h4
                        style={{
                          fontSize: '15px',
                          fontWeight: 700,
                          color: '#0b231c',
                          marginBottom: '6px'
                        }}
                      >
                        Phone:
                      </h4>
                      <p style={{ margin: 0 }}>
                        <a
                          href="tel:+918696298489"
                          style={{
                            color: '#e31937',
                            fontWeight: 700,
                            fontStyle: 'italic',
                            textDecoration: 'none',
                            fontSize: '15px'
                          }}
                        >
                          +91 8696298489
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
