import React, { useState, useEffect } from 'react';

export default function Preloader() {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 600);
    const removeTimer = setTimeout(() => {
      setVisible(false);
    }, 1100);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className={`preloader-wrap ${fadeOut ? 'fade-out' : ''}`} aria-hidden={fadeOut}>
      <div className="custom-loader" role="status" aria-label="Loading Sahast Foundation website"></div>
      <div className="preloader-logo font-devanagari">सहस्त फाउंडेशन</div>
    </div>
  );
}
