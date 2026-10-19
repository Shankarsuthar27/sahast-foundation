import React from 'react';

export default function Logo({ size = 'default', light = false, className = '' }) {
  const isLarge = size === 'large';
  const isSmall = size === 'small';

  const height = isLarge ? '75px' : isSmall ? '42px' : '62px';

  return (
    <div className={`sahast-logo-wrap ${className}`} style={{ display: 'inline-flex', alignItems: 'center' }}>
      <img
        src="/home-page-image/sahast-foundation-logo.png"
        alt="सहस्त फाउंडेशन - Sahast Foundation"
        style={{
          height: height,
          width: 'auto',
          objectFit: 'contain',
          filter: light ? 'brightness(0) invert(1)' : 'none',
          transition: 'transform 0.2s ease'
        }}
        onError={(e) => {
          // Fallback if path differs
          e.currentTarget.src = "/images/sahast-foundation-logo.png";
        }}
      />
    </div>
  );
}
