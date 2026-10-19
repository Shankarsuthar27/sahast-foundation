import React, { useState } from 'react';

export default function GiveWPDonationForm({ initialCause = 'Annakshetra', onSuccess }) {
  const [amount, setAmount] = useState(2100);
  const [customAmount, setCustomAmount] = useState('');
  const [selectedCause, setSelectedCause] = useState(initialCause);
  const [frequency, setFrequency] = useState('one-time');
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [donorPhone, setDonorPhone] = useState('');
  const [donorPan, setDonorPan] = useState('');
  const [formStatus, setFormStatus] = useState('idle'); // idle | loading | sent | failed | invalid
  const [errorMessage, setErrorMessage] = useState('');

  const presetAmounts = [500, 1100, 2100, 5100, 11000, 21000];
  const effectiveAmount = customAmount ? Number(customAmount) : amount;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!donorName.trim() || !donorEmail.trim() || !donorPhone.trim()) {
      setFormStatus('invalid');
      setErrorMessage('Please fill in all mandatory fields (Name, Email, Phone).');
      return;
    }

    if (effectiveAmount <= 0) {
      setFormStatus('invalid');
      setErrorMessage('Please enter a valid donation amount.');
      return;
    }

    setFormStatus('loading');
    setErrorMessage('');

    // Simulate GiveWP submission with loading animation
    setTimeout(() => {
      setFormStatus('sent');
      if (onSuccess) {
        onSuccess({
          amount: effectiveAmount,
          cause: selectedCause,
          donorName,
          donorEmail
        });
      }
    }, 1200);
  };

  return (
    <div className="give-form-wrap">
      <form 
        className={`give-fl-form give-form ${formStatus}`} 
        onSubmit={handleSubmit}
        noValidate
      >
        {/* Frequency Toggle */}
        <div style={{ display: 'flex', backgroundColor: '#f3f4f6', borderRadius: '12px', padding: '4px', marginBottom: '8px' }}>
          <button 
            type="button"
            onClick={() => setFrequency('one-time')}
            style={{
              flex: 1,
              padding: '10px',
              borderRadius: '10px',
              backgroundColor: frequency === 'one-time' ? '#ffffff' : 'transparent',
              boxShadow: frequency === 'one-time' ? '0 2px 8px rgba(0,0,0,0.08)' : 'none',
              fontWeight: 700,
              fontSize: '14.5px',
              color: frequency === 'one-time' ? '#e31937' : '#666',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            One-Time Seva
          </button>
          <button 
            type="button"
            onClick={() => setFrequency('monthly')}
            style={{
              flex: 1,
              padding: '10px',
              borderRadius: '10px',
              backgroundColor: frequency === 'monthly' ? '#ffffff' : 'transparent',
              boxShadow: frequency === 'monthly' ? '0 2px 8px rgba(0,0,0,0.08)' : 'none',
              fontWeight: 700,
              fontSize: '14.5px',
              color: frequency === 'monthly' ? '#e31937' : '#666',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            Monthly Supporter
          </button>
        </div>

        {/* Preset Amounts */}
        <div>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: 700, color: '#333', marginBottom: '8px' }}>
            Select Contribution Amount (₹)
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '12px' }}>
            {presetAmounts.map((amt) => (
              <button
                key={amt}
                type="button"
                onClick={() => { setAmount(amt); setCustomAmount(''); }}
                style={{
                  padding: '12px 10px',
                  borderRadius: '12px',
                  border: (amount === amt && !customAmount) ? '2px solid #e31937' : '1px solid #e5e7eb',
                  backgroundColor: (amount === amt && !customAmount) ? '#fff1f2' : '#ffffff',
                  fontWeight: 700,
                  fontSize: '16px',
                  color: (amount === amt && !customAmount) ? '#e31937' : '#111827',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                ₹{amt.toLocaleString('en-IN')}
              </button>
            ))}
          </div>

          <input
            type="number"
            placeholder="Or enter custom amount in ₹"
            value={customAmount}
            onChange={(e) => setCustomAmount(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 16px',
              borderRadius: '12px',
              border: customAmount ? '2px solid #e31937' : '1px solid #d1d5db',
              fontSize: '15px'
            }}
          />
        </div>

        {/* Cause Selection */}
        <div>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: 700, color: '#333', marginBottom: '6px' }}>
            Select Seva Initiative
          </label>
          <select
            value={selectedCause}
            onChange={(e) => setSelectedCause(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 14px',
              borderRadius: '10px',
              border: '1px solid #d1d5db',
              fontSize: '15px',
              backgroundColor: '#fff'
            }}
          >
            <option value="Annakshetra">Annakshetra & Bhandara Seva</option>
            <option value="Gaushala">Indigenous Gau Seva & Protection</option>
            <option value="Gurukul">Takhatgarh Tribal Vidyalaya (CBSE)</option>
            <option value="General">General Humanitarian Relief</option>
          </select>
        </div>

        {/* Donor Information */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '13.5px', fontWeight: 600, color: '#444', marginBottom: '4px' }}>
              Full Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Ramesh Kumar"
              value={donorName}
              onChange={(e) => setDonorName(e.target.value)}
              style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #d1d5db' }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13.5px', fontWeight: 600, color: '#444', marginBottom: '4px' }}>
                Email Address *
              </label>
              <input
                type="email"
                required
                placeholder="email@example.com"
                value={donorEmail}
                onChange={(e) => setDonorEmail(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #d1d5db' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '13.5px', fontWeight: 600, color: '#444', marginBottom: '4px' }}>
                Phone Number *
              </label>
              <input
                type="tel"
                required
                placeholder="+91 98765 43210"
                value={donorPhone}
                onChange={(e) => setDonorPhone(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #d1d5db' }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13.5px', fontWeight: 600, color: '#444', marginBottom: '4px' }}>
              PAN Number (Required for 80G Tax Exemption Certificate)
            </label>
            <input
              type="text"
              placeholder="ABCDE1234F"
              value={donorPan}
              onChange={(e) => setDonorPan(e.target.value.toUpperCase())}
              style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #d1d5db' }}
            />
          </div>
        </div>

        {/* Validation Error Message */}
        {formStatus === 'invalid' && (
          <div style={{ backgroundColor: '#fee2e2', color: '#b91c1c', padding: '10px 14px', borderRadius: '8px', fontSize: '14px', fontWeight: 600 }}>
            <i className="fas fa-exclamation-circle" style={{ marginRight: '6px' }}></i>
            {errorMessage}
          </div>
        )}

        {/* Success Message */}
        {formStatus === 'sent' && (
          <div style={{ backgroundColor: '#dcfce7', color: '#15803d', padding: '12px 16px', borderRadius: '8px', fontSize: '14.5px', fontWeight: 600 }}>
            <i className="fas fa-check-circle" style={{ marginRight: '6px' }}></i>
            Thank you for supporting Sahast Foundation! Your contribution of ₹{effectiveAmount.toLocaleString('en-IN')} has been recorded.
          </div>
        )}

        {/* Submit Button with give-loading-animation */}
        <button
          type="submit"
          disabled={formStatus === 'loading'}
          className="btn-primary"
          style={{
            width: '100%',
            padding: '14px',
            fontSize: '16px',
            justifyContent: 'center',
            backgroundColor: '#e31937',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            cursor: formStatus === 'loading' ? 'not-allowed' : 'pointer'
          }}
        >
          {formStatus === 'loading' ? (
            <>
              <span className="give-loading-animation"></span>
              <span>Processing Donation...</span>
            </>
          ) : (
            <>
              <i className="fas fa-heart"></i>
              <span>Donate ₹{effectiveAmount.toLocaleString('en-IN')} Now</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
