import React, { useState } from 'react';
import { AlertTriangle, X, CheckCircle, Copy, Check } from 'lucide-react';

// 1. Donation Modal (GiveWP Modal pixel-perfect replica from screenshot)
export function DonationModal({ isOpen, onClose }) {
  const [amount, setAmount] = useState('0');
  const [paymentMode, setPaymentMode] = useState('manual'); // 'manual' (Test Donation) | 'offline'
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copiedField, setCopiedField] = useState('');

  if (!isOpen) return null;

  const handleCopy = (text, field) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(''), 2000);
    }
  };

  const handleDonateSubmit = (e) => {
    if (e) e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 900);
  };

  const handleReset = () => {
    setSubmitted(false);
    setLoading(false);
    onClose();
  };

  return (
    <>
      <style>{`
        .givewp-modal-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.72);
          z-index: 99999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          animation: givewpFadeIn 0.2s ease-out;
          overflow-y: auto;
        }

        @keyframes givewpFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .givewp-modal-card {
          background-color: #ffffff;
          border-radius: 26px;
          position: relative;
          width: 100%;
          max-width: 780px;
          padding: 34px 34px 38px;
          box-shadow: 0 25px 65px rgba(0, 0, 0, 0.4);
          animation: givewpScaleUp 0.24s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes givewpScaleUp {
          from { transform: scale(0.96); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }

        .givewp-yellow-close {
          position: absolute;
          top: -14px;
          right: -14px;
          width: 46px;
          height: 46px;
          background-color: #fabc3f;
          border-radius: 13px;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: #111111;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.18);
          transition: transform 0.15s ease, background-color 0.15s ease;
          z-index: 20;
        }

        .givewp-yellow-close:hover {
          background-color: #f59e0b;
          transform: scale(1.05);
        }

        .givewp-inner-panel {
          background-color: #f7f9fa;
          border-radius: 18px;
          padding: 36px 36px 40px;
          border: 1px solid #f0f3f6;
        }

        @media (max-width: 768px) {
          .givewp-modal-card {
            padding: 22px 16px 26px;
            border-radius: 20px;
          }
          .givewp-yellow-close {
            top: -10px;
            right: -10px;
            width: 40px;
            height: 40px;
            border-radius: 10px;
          }
          .givewp-inner-panel {
            padding: 22px 18px 26px;
            border-radius: 14px;
          }
        }
      `}</style>

      <div className="givewp-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
        <div className="givewp-modal-card" onClick={(e) => e.stopPropagation()}>
          {/* Prominent Yellow Close Button matching screenshot */}
          <button
            type="button"
            className="givewp-yellow-close"
            onClick={onClose}
            aria-label="Close donation modal"
          >
            <X size={24} strokeWidth={2.6} />
          </button>

          {!submitted ? (
            /* Main Form View matching screenshot exactly */
            <div className="givewp-inner-panel">
              {/* Top Warning / Notice Banner */}
              <div
                style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '4px',
                  padding: '12px 16px',
                  marginBottom: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    borderLeft: '3px solid #fabc3f',
                    paddingLeft: '8px'
                  }}
                >
                  <AlertTriangle size={18} color="#f59e0b" fill="#fef3c7" />
                </div>
                <div style={{ fontSize: '13.5px', color: '#475569', lineHeight: '20px' }}>
                  <strong style={{ color: '#1e293b' }}>Notice:</strong> Test mode is enabled. While in test mode no live donations are processed.
                </div>
              </div>

              {/* Amount Input Row: Currency Box & Value Input */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '14px' }}>
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    backgroundColor: '#ffffff',
                    border: '1px solid #d1d5db',
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '15px',
                    fontWeight: 600,
                    color: '#374151'
                  }}
                >
                  ₹
                </div>
                <input
                  type="text"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0"
                  style={{
                    width: '90px',
                    height: '38px',
                    backgroundColor: '#ffffff',
                    border: '1px solid #d1d5db',
                    borderRadius: '4px',
                    padding: '0 10px',
                    fontSize: '15px',
                    color: '#1f2937',
                    outline: 'none',
                    textAlign: 'left'
                  }}
                />
              </div>

              {/* Small Gray Donate Now Button */}
              <div>
                <button
                  type="button"
                  style={{
                    backgroundColor: '#f1f5f9',
                    border: '1px solid #d1d5db',
                    color: '#374151',
                    fontSize: '13px',
                    fontWeight: 500,
                    padding: '5px 14px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    marginBottom: '20px'
                  }}
                >
                  Donate Now
                </button>
              </div>

              {/* Payment Method Section */}
              <div
                style={{
                  fontSize: '16.5px',
                  fontWeight: 700,
                  color: '#1e293b',
                  marginBottom: '14px'
                }}
              >
                Select Payment Method
              </div>

              {/* Radio Options: Test Donation vs Offline Donation */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '28px', marginBottom: '22px', flexWrap: 'wrap' }}>
                <label style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '14.5px', color: '#334155' }}>
                  <input
                    type="radio"
                    name="payment-mode"
                    value="manual"
                    checked={paymentMode === 'manual'}
                    onChange={() => setPaymentMode('manual')}
                    style={{ accentColor: '#3b82f6', width: '16px', height: '16px', cursor: 'pointer' }}
                  />
                  <span>Test Donation</span>
                </label>

                <label style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '14.5px', color: '#334155' }}>
                  <input
                    type="radio"
                    name="payment-mode"
                    value="offline"
                    checked={paymentMode === 'offline'}
                    onChange={() => setPaymentMode('offline')}
                    style={{ accentColor: '#3b82f6', width: '16px', height: '16px', cursor: 'pointer' }}
                  />
                  <span>Offline Donation</span>
                </label>
              </div>

              {/* If Offline Donation is Selected, show Sahast Foundation Official Bank & UPI details */}
              {paymentMode === 'offline' && (
                <div
                  style={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '10px',
                    padding: '18px 20px',
                    marginBottom: '20px',
                    fontSize: '13.5px',
                    color: '#475569',
                    lineHeight: '23px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
                  }}
                >
                  <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: '8px', fontSize: '14px' }}>
                    Sahast Foundation Bank & UPI Details:
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <span><strong>A/C Name:</strong> Sahast Foundation</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <span><strong>Bank:</strong> State Bank of India (Takhatgarh Branch)</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <span><strong>A/C No:</strong> 42109876543</span>
                    <button
                      type="button"
                      onClick={() => handleCopy('42109876543', 'acc')}
                      style={{ border: 'none', background: 'transparent', color: '#e31937', cursor: 'pointer', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}
                    >
                      {copiedField === 'acc' ? <Check size={13} color="#16a34a" /> : <Copy size={13} />}
                      <span>{copiedField === 'acc' ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <span><strong>IFSC:</strong> SBIN0001234</span>
                    <button
                      type="button"
                      onClick={() => handleCopy('SBIN0001234', 'ifsc')}
                      style={{ border: 'none', background: 'transparent', color: '#e31937', cursor: 'pointer', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}
                    >
                      {copiedField === 'ifsc' ? <Check size={13} color="#16a34a" /> : <Copy size={13} />}
                      <span>{copiedField === 'ifsc' ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <span><strong>UPI ID:</strong> info@sahastfoundation.in</span>
                    <button
                      type="button"
                      onClick={() => handleCopy('info@sahastfoundation.in', 'upi')}
                      style={{ border: 'none', background: 'transparent', color: '#e31937', cursor: 'pointer', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}
                    >
                      {copiedField === 'upi' ? <Check size={13} color="#16a34a" /> : <Copy size={13} />}
                      <span>{copiedField === 'upi' ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <div style={{ fontSize: '12.5px', color: '#64748b', borderTop: '1px dashed #e2e8f0', paddingTop: '8px', marginTop: '6px' }}>
                    Please send transfer confirmation to <strong>+91 8696298489</strong> or <strong>info@sahastfoundation.in</strong> to obtain your official 80G tax deduction receipt.
                  </div>
                </div>
              )}

              {/* Horizontal Divider Line matching screenshot */}
              <div style={{ borderTop: '1px solid #e5e7eb', margin: '22px 0 20px 0' }} />

              {/* Red Donate Now Button */}
              <div>
                <button
                  type="button"
                  onClick={handleDonateSubmit}
                  disabled={loading}
                  style={{
                    backgroundColor: '#e31937',
                    color: '#ffffff',
                    fontSize: '15px',
                    fontWeight: 700,
                    padding: '10px 24px',
                    borderRadius: '6px',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    boxShadow: '0 2px 8px rgba(227, 25, 55, 0.25)',
                    transition: 'background-color 0.15s ease'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#cc142f')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#e31937')}
                >
                  {loading ? (
                    <>
                      <span className="give-loading-animation" style={{ width: '16px', height: '16px', borderWidth: '2px', borderTopColor: '#ffffff', borderColor: 'rgba(255,255,255,0.3)' }} />
                      <span>Processing...</span>
                    </>
                  ) : (
                    'Donate Now'
                  )}
                </button>
              </div>
            </div>
          ) : (
            /* Post-Submission Confirmation View */
            <div className="givewp-inner-panel" style={{ textAlign: 'center', padding: '30px 20px' }}>
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  backgroundColor: '#dcfce7',
                  color: '#16a34a',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px'
                }}
              >
                <CheckCircle size={32} />
              </div>

              <h3 style={{ fontSize: '24px', fontWeight: 800, color: '#111827', marginBottom: '8px' }}>
                Jai Sadguru Dev! Thank You!
              </h3>

              <p style={{ fontSize: '15px', color: '#475569', marginBottom: '22px', maxWidth: '520px', margin: '0 auto 22px' }}>
                {paymentMode === 'offline' ? (
                  <>Your offline donation intention has been recorded. Please complete the bank transfer or UPI payment to receive your 80G tax receipt.</>
                ) : (
                  <>Your test donation of <strong>₹{amount === '0' || !amount ? '1,100' : amount}</strong> has been received in test mode with deep gratitude.</>
                )}
              </p>

              <div
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '14px',
                  padding: '20px',
                  textAlign: 'left',
                  border: '1px solid #e2e8f0',
                  marginBottom: '24px',
                  maxWidth: '520px',
                  margin: '0 auto 24px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '13.5px', color: '#64748b' }}>
                  <span>Transaction Reference:</span>
                  <span style={{ fontWeight: 700, color: '#0f172a' }}>SAHAST-TEST-{Math.floor(100000 + Math.random() * 900000)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '13.5px', color: '#64748b' }}>
                  <span>Payment Gateway:</span>
                  <span style={{ fontWeight: 600, color: '#0f172a' }}>{paymentMode === 'offline' ? 'Offline Manual' : 'Test Mode (Simulated)'}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '13.5px', color: '#64748b' }}>
                  <span>80G Tax Exemption:</span>
                  <span style={{ fontWeight: 700, color: '#16a34a' }}>Eligible (100% Tax Relief)</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleReset}
                style={{
                  backgroundColor: '#fabc3f',
                  color: '#111827',
                  fontWeight: 700,
                  fontSize: '15px',
                  padding: '12px 32px',
                  borderRadius: '8px',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(250, 188, 63, 0.35)'
                }}
              >
                Close Receipt
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

// 2. Video Player Modal (Magnific Popup mfp-iframe-holder)
export function VideoPlayerModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <>
      <div className="mfp-bg" onClick={onClose}></div>
      <div className="mfp-wrap" onClick={onClose} role="dialog" aria-modal="true" aria-label="Foundation Video Player">
        <div className="mfp-container" style={{ maxWidth: '850px' }} onClick={(e) => e.stopPropagation()}>
          <div className="mfp-content" style={{ padding: '0', backgroundColor: '#000', borderRadius: '16px', overflow: 'hidden' }}>
            <button type="button" className="mfp-close" onClick={onClose} aria-label="Close video" style={{ color: '#fff', backgroundColor: 'rgba(0,0,0,0.5)' }}>
              ×
            </button>
            <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
              <iframe 
                src="https://www.youtube-nocookie.com/embed/kW-T1J5QFdY?autoplay=1"
                title="Sahast Foundation Video - Pujya Swami Shri Abhaydas Ji Maharaj"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  border: 0
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// 3. Image Lightbox Modal (Magnific Popup mfp-image-holder)
export function LightboxModal({ isOpen, onClose, image, title }) {
  if (!isOpen) return null;

  return (
    <>
      <div className="mfp-bg" onClick={onClose}></div>
      <div className="mfp-wrap" onClick={onClose} role="dialog" aria-modal="true" aria-label={title || "Gallery Preview"}>
        <div className="mfp-container" style={{ maxWidth: '900px' }} onClick={(e) => e.stopPropagation()}>
          <div className="mfp-content" style={{ padding: '16px', backgroundColor: '#111', borderRadius: '16px' }}>
            <button type="button" className="mfp-close" onClick={onClose} aria-label="Close image" style={{ color: '#fff', backgroundColor: 'rgba(255,255,255,0.2)' }}>
              ×
            </button>
            <div style={{ textAlign: 'center' }}>
              <img 
                src={image} 
                alt={title || "Gurukul Preview"} 
                style={{ width: '100%', maxHeight: '75vh', objectFit: 'contain', borderRadius: '8px' }} 
              />
              {title && (
                <div style={{ color: '#ffffff', textAlign: 'center', marginTop: '14px', fontSize: '18px', fontWeight: 700 }}>
                  {title}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// 4. Volunteer Sign-up Modal
export function VolunteerModal({ isOpen, onClose }) {
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2800);
  };

  return (
    <>
      <div className="mfp-bg" onClick={onClose}></div>
      <div className="mfp-wrap" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="volunteer-title">
        <div className="mfp-container" style={{ maxWidth: '520px' }} onClick={(e) => e.stopPropagation()}>
          <div className="mfp-content">
            <button type="button" className="mfp-close" onClick={onClose} aria-label="Close popup">
              ×
            </button>

            {!submitted ? (
              <form onSubmit={handleSubmit}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', backgroundColor: '#fef3c7', color: '#b45309', padding: '4px 12px', borderRadius: '14px', fontSize: '13px', fontWeight: 700, marginBottom: '12px' }}>
                  <i className="fal fa-hands-helping fas fa-hands-holding-circle"></i>
                  <span>Nishkam Seva Dal</span>
                </div>

                <h3 id="volunteer-title" style={{ fontSize: '24px', fontWeight: 800, color: '#111', marginBottom: '8px' }}>
                  Become a Volunteer
                </h3>
                <p style={{ fontSize: '14.5px', color: '#666', marginBottom: '20px' }}>
                  Join our selfless mission to serve the needy across Rajasthan and India.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '22px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '13.5px', fontWeight: 600, color: '#444', marginBottom: '4px' }}>Full Name *</label>
                    <input required type="text" placeholder="Your Name" style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #d1d5db' }} />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '13.5px', fontWeight: 600, color: '#444', marginBottom: '4px' }}>Phone *</label>
                      <input required type="tel" placeholder="+91 ..." style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #d1d5db' }} />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '13.5px', fontWeight: 600, color: '#444', marginBottom: '4px' }}>City *</label>
                      <input required type="text" placeholder="City / Town" style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #d1d5db' }} />
                    </div>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '13.5px', fontWeight: 600, color: '#444', marginBottom: '4px' }}>Interest Area</label>
                    <select style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #d1d5db', backgroundColor: '#fff' }}>
                      <option>Annakshetra Meal Distribution</option>
                      <option>Indigenous Gaushala Seva</option>
                      <option>Gurukulam Teaching & Mentoring</option>
                      <option>Event Management & Live Broadcast</option>
                    </select>
                  </div>
                </div>

                <button type="submit" className="btn-gold" style={{ width: '100%', justifyContent: 'center', padding: '12px' }}>
                  Submit Volunteer Application
                </button>
              </form>
            ) : (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <div style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: '#dcfce7', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', fontSize: '24px' }}>
                  <i className="fas fa-check"></i>
                </div>
                <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#111', marginBottom: '6px' }}>Application Received!</h3>
                <p style={{ fontSize: '15px', color: '#666' }}>Our seva coordinator will reach out to you within 24 hours.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

// 5. Search Modal
export function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const quickLinks = [
    { title: 'Takhatgarh Gurukulam for Tribal Children', href: '#gurukul' },
    { title: 'Annakshetra & Daily Bhandara', href: '#priorities' },
    { title: 'Indigenous Gaushala Seva & Cow Care', href: '#gurukul' },
    { title: 'How We Work: Transparent 4-Step Model', href: '#how-we-work' },
    { title: 'Meditation and its Impact on Youth', href: '#blogs' },
    { title: '80G Tax Exemption Donation Details', href: '#contact' },
  ];

  return (
    <>
      <div className="mfp-bg" onClick={onClose}></div>
      <div className="mfp-wrap" onClick={onClose} role="dialog" aria-modal="true" aria-label="Search site">
        <div className="mfp-container" style={{ maxWidth: '560px', marginTop: '60px' }} onClick={(e) => e.stopPropagation()}>
          <div className="mfp-content" style={{ padding: '0', overflow: 'hidden' }}>
            <div style={{ display: 'flex', alignItems: 'center', padding: '16px 20px', borderBottom: '1px solid #eee' }}>
              <input
                type="text"
                autoFocus
                placeholder="Search teachings, seva initiatives, gurukul..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                style={{ width: '100%', border: 'none', outline: 'none', fontSize: '17px' }}
              />
              <button onClick={onClose} style={{ border: 'none', background: 'none', fontSize: '20px', cursor: 'pointer', color: '#888' }} aria-label="Close search">
                ×
              </button>
            </div>

            <div style={{ padding: '20px' }}>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#888', textTransform: 'uppercase', marginBottom: '10px' }}>
                Suggested Topics
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {quickLinks
                  .filter((item) => item.title.toLowerCase().includes(query.toLowerCase()))
                  .map((item, idx) => (
                    <a
                      key={idx}
                      href={item.href}
                      onClick={onClose}
                      style={{
                        padding: '10px 14px',
                        borderRadius: '8px',
                        backgroundColor: '#f9fafb',
                        fontSize: '15px',
                        color: '#1f2937',
                        fontWeight: 500,
                        textDecoration: 'none'
                      }}
                    >
                      {item.title}
                    </a>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
