import React, { useState } from 'react';

export default function ContactForm7() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState('idle'); // idle | loading | sent | failed | invalid
  const [statusText, setStatusText] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (status !== 'idle') setStatus('idle');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus('invalid');
      setStatusText('One or more fields have an error. Please check and try again.');
      return;
    }

    setStatus('loading');
    setStatusText('');

    // Simulate Contact Form 7 transmission
    setTimeout(() => {
      setStatus('sent');
      setStatusText('Thank you for your message. It has been sent successfully to the Sahast Foundation team.');
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1200);
  };

  return (
    <div className="wpcf7" id="wpcf7-f1-p1-o1">
      <form 
        className={`wpcf7-form init ${status}`} 
        onSubmit={handleSubmit}
        noValidate
      >
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '13.5px', fontWeight: 600, color: '#333', marginBottom: '4px' }}>
              Your Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Anand Sharma"
              required
              className="wpcf7-form-control wpcf7-text"
              style={{
                width: '100%',
                padding: '12px 14px',
                borderRadius: '8px',
                border: '1px solid #d1d5db',
                fontSize: '15px'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13.5px', fontWeight: 600, color: '#333', marginBottom: '4px' }}>
              Your Email *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="anand@example.com"
              required
              className="wpcf7-form-control wpcf7-text wpcf7-email"
              style={{
                width: '100%',
                padding: '12px 14px',
                borderRadius: '8px',
                border: '1px solid #d1d5db',
                fontSize: '15px'
              }}
            />
          </div>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '13.5px', fontWeight: 600, color: '#333', marginBottom: '4px' }}>
            Subject
          </label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Inquiry regarding Gurukul or Seva"
            className="wpcf7-form-control wpcf7-text"
            style={{
              width: '100%',
              padding: '12px 14px',
              borderRadius: '8px',
              border: '1px solid #d1d5db',
              fontSize: '15px'
            }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '13.5px', fontWeight: 600, color: '#333', marginBottom: '4px' }}>
            Your Message *
          </label>
          <textarea
            name="message"
            rows={4}
            value={formData.message}
            onChange={handleChange}
            placeholder="How can we assist you?"
            required
            className="wpcf7-form-control wpcf7-textarea"
            style={{
              width: '100%',
              padding: '12px 14px',
              borderRadius: '8px',
              border: '1px solid #d1d5db',
              fontSize: '15px',
              resize: 'vertical'
            }}
          />
        </div>

        {/* Submit Button & Spinner */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginTop: '6px' }}>
          <button
            type="submit"
            disabled={status === 'loading'}
            className="wpcf7-form-control wpcf7-submit btn-gold"
            style={{
              padding: '12px 28px',
              fontSize: '15.5px',
              fontWeight: 700,
              borderRadius: '8px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              cursor: status === 'loading' ? 'not-allowed' : 'pointer'
            }}
          >
            <span>Send Message</span>
            <i className="fas fa-paper-plane" aria-hidden="true"></i>
          </button>

          {status === 'loading' && <span className="wpcf7-spinner" role="status" aria-label="Sending message..."></span>}
        </div>

        {/* Response Output Status Banner */}
        {statusText && (
          <div className="wpcf7-response-output" aria-live="polite">
            {statusText}
          </div>
        )}
      </form>
    </div>
  );
}
