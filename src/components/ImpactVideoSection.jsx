import React, { useState, useEffect, useRef } from 'react';
import { useCms } from '../context/CmsContext';

export default function ImpactVideoSection({ onOpenVideo }) {
  const { homepageData } = useCms();
  const impactData = homepageData?.impact || {};
  const sectionRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [counts, setCounts] = useState({
    c1: 0,
    c2: 0,
    c3: 0
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const duration = 2400; // 2.4s
          const startTime = performance.now();

          const step = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease-out cubic
            const ease = 1 - Math.pow(1 - progress, 3);

            setCounts({
              c1: Math.floor(ease * 25000),
              c2: Math.floor(ease * 15000),
              c3: Math.floor(ease * 5000)
            });

            if (progress < 1) {
              requestAnimationFrame(step);
            } else {
              setCounts({
                c1: 25000,
                c2: 15000,
                c3: 5000
              });
            }
          };

          requestAnimationFrame(step);
        }
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <>
      <style>{`
        /* Section Root as Specified */
        .video-area {
          position: relative;
          z-index: 1;
          font-family: 'Lato', sans-serif;
          font-size: 18px;
          line-height: 30px;
          text-align: left;
          color: var(--base-color, #666666);
          padding: 80px 0px 80px 0px;
          cursor: crosshair;
          transition: all 0.3s ease;
          overflow: hidden;
        }

        .video-area::after {
          content: "";
          display: block;
          position: static;
          width: 100%;
          height: 0px;
          background-color: rgba(0, 0, 0, 0);
          color: rgb(102, 102, 102);
          font-size: 18px;
          font-weight: 400;
          border-radius: 0px;
          border: 0px none rgb(102, 102, 102);
          opacity: 1;
          clear: both;
        }

        /* Background Section */
        .video-section-bg {
          position: absolute;
          right: 0;
          bottom: 0;
          top: 0;
          z-index: -1;
          overflow: hidden;
          width: 65%;
          height: 100%;
          background-size: cover;
          border-radius: 50px 0 0 50px;
          background-position: center center;
          background-repeat: no-repeat;
        }

        .video-section-bg:before {
          content: '';
          width: 100%;
          height: 100%;
          position: absolute;
          left: 0;
          top: 0;
          opacity: 0.42;
          background: #07040b;
        }

        @media only screen and (max-width: 991px) {
          .video-section-bg {
            width: 100%;
            height: 55%;
            top: auto;
            bottom: 0;
            border-radius: 36px 36px 0 0;
          }
        }

        /* Container & Grid System */
        .video-area .container {
          max-width: 1200px;
          margin: 0 auto;
          padding-left: 15px;
          padding-right: 15px;
          position: relative;
          z-index: 2;
          box-sizing: border-box;
        }

        .video-area .row {
          display: flex;
          flex-wrap: wrap;
          margin-right: -15px;
          margin-left: -15px;
        }

        .video-area .align-items-end {
          align-items: flex-end;
        }

        .video-area .col-lg-7 {
          flex: 0 0 58.333333%;
          max-width: 58.333333%;
          padding-right: 15px;
          padding-left: 15px;
          box-sizing: border-box;
        }

        .video-area .col-lg-5 {
          flex: 0 0 41.666667%;
          max-width: 41.666667%;
          padding-right: 15px;
          padding-left: 15px;
          box-sizing: border-box;
        }

        @media only screen and (max-width: 991px) {
          .video-area .col-lg-7,
          .video-area .col-lg-5 {
            flex: 0 0 100%;
            max-width: 100%;
          }
        }

        /* Left Yellow Box Component */
        .video-left-part {
          position: relative;
          z-index: 1;
          padding: 100px 100px 100px 0;
        }

        .video-left-part:after {
          content: '';
          position: absolute;
          right: 0;
          top: 0;
          bottom: 0;
          z-index: -1;
          border-radius: 50px;
          background: var(--yellow-color, #fabc3f);
          width: calc(100% + 100px);
          height: 100%;
          box-shadow: 0 16px 45px rgba(0, 0, 0, 0.12);
        }

        @media only screen and (max-width: 1199px) {
          .video-left-part {
            padding-right: 70px;
          }
        }

        @media only screen and (max-width: 991px) {
          .video-left-part {
            margin-right: 50px;
            margin-bottom: 55px;
            padding-top: 60px;
            padding-bottom: 60px;
          }
        }

        @media only screen and (max-width: 575px) {
          .video-left-part {
            margin-right: 0;
            padding: 40px 25px 45px 25px;
          }
          .video-left-part:after {
            width: 100%;
            border-radius: 30px;
          }
        }

        /* Typography */
        .section-title {
          position: relative;
          z-index: 1;
        }

        .section-title.mb-15 {
          margin-bottom: 15px;
        }

        .section-title .sub-title {
          display: inline-block;
          color: var(--main-color, #e31937);
          font-family: 'PT Sans', sans-serif;
          font-weight: 700;
          font-size: 16px;
          letter-spacing: 0.4px;
        }

        .section-title .sub-title.mb-5 {
          margin-bottom: 5px;
        }

        .section-title .sub-title.mb-10 {
          margin-bottom: 10px;
        }

        .video-left-part h3 {
          font-family: 'PT Sans', sans-serif;
          font-size: 45px;
          font-weight: 700;
          color: #333333;
          line-height: 1.25;
          margin: 0;
        }

        .video-left-part h3 span {
          color: var(--main-color, #e31937);
        }

        @media only screen and (max-width: 767px) {
          .video-left-part h3 {
            font-size: 35px;
          }
        }
        @media only screen and (max-width: 479px) {
          .video-left-part h3 {
            font-size: 30px;
          }
        }

        .video-left-part p {
          color: #666666;
          font-family: 'Lato', sans-serif;
          font-size: 18px;
          line-height: 30px;
          margin-top: 15px;
          margin-bottom: 25px;
        }

        /* Counter Inner Wrap */
        .counter-inner-wrap {
          display: flex;
          flex-wrap: wrap;
          align-items: flex-start;
        }

        .counter-text-wrap {
          margin-top: 25px;
        }

        @media only screen and (min-width: 376px) {
          .counter-inner-wrap .counter-text-wrap:not(:last-child) {
            margin-right: 30px;
            padding-right: 30px;
            border-right: 1px solid #cbae45;
          }
        }

        @media only screen and (max-width: 375px) {
          .counter-inner-wrap .counter-text-wrap {
            width: 100%;
            margin-top: 18px;
            padding-bottom: 16px;
            border-bottom: 1px dashed #d1b74f;
          }
        }

        .count-text {
          display: block;
          font-size: 40px;
          font-weight: 700;
          color: var(--main-color, #e31937);
          font-family: 'PT Sans', sans-serif;
          line-height: 1.1;
        }

        .count-text.m:after {
          content: '+';
          font-size: 30px;
          margin-left: 2px;
        }

        .counter-title {
          color: #333333;
          font-size: 16px;
          line-height: 22px;
          margin-bottom: 0;
          font-style: italic;
          display: block;
          margin-top: 6px;
          font-weight: 500;
        }

        /* Video Play Button */
        .video-play {
          color: #ffffff;
          font-size: 65px;
          text-align: center;
          border-radius: 30px;
          width: 140px;
          height: 135px;
          line-height: 135px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: var(--main-color, #e31937);
          position: absolute;
          right: 0;
          top: 115px;
          transform: translate(50%);
          z-index: 5;
          box-shadow: 0 12px 35px rgba(227, 25, 55, 0.45);
          cursor: pointer;
          border: none;
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .video-play:hover {
          color: #ffffff;
          background: #cc142f;
          transform: translate(50%) scale(1.06);
          box-shadow: 0 18px 45px rgba(227, 25, 55, 0.6);
        }

        .video-play svg {
          transition: transform 0.3s ease;
        }

        .video-play:hover svg {
          transform: scale(1.1);
        }

        @media only screen and (max-width: 767px) {
          .video-play {
            width: 80px;
            height: 75px;
            font-size: 26px;
            line-height: 75px;
            border-radius: 15px;
          }
        }

        @media only screen and (max-width: 575px) {
          .video-left-part .video-play {
            top: auto;
            bottom: -25px;
            right: 25px;
            transform: none;
          }
          .video-left-part .video-play:hover {
            transform: scale(1.06);
          }
        }

        /* Right Part */
        .video-right-part {
          max-width: 375px;
          margin-bottom: 55px;
        }

        @media only screen and (min-width: 992px) {
          .video-right-part {
            margin-left: 65px;
          }
        }

        .video-right-part.text-white {
          color: #ffffff;
        }

        .video-right-part .sub-title {
          color: #ffde69;
          font-family: 'PT Sans', sans-serif;
          font-weight: 700;
          font-size: 16px;
        }

        .video-right-part h4 {
          font-family: 'PT Sans', sans-serif;
          font-size: 36px;
          font-weight: 700;
          color: #ffffff;
          line-height: 1.35;
          margin: 0;
          text-shadow: 0 2px 14px rgba(0, 0, 0, 0.6);
        }

        @media only screen and (max-width: 767px) {
          .video-right-part h4 {
            font-size: 30px;
          }
        }
      `}</style>

      {/* section — .video-area (Matches live element exact specifications) */}
      <section 
        ref={sectionRef}
        className="video-area py-80 rpt-0 rpb-25 rel z-1"
        role="region"
        aria-label="Transforming Lives Through Guru Kripa"
      >
        <div className="container">
          <div className="row align-items-end">
            {/* Left Column: Yellow Content Shield */}
            <div className="col-lg-7">
              <div 
                className="video-left-part rel z-1 rmb-55 wow fadeInLeft delay-0-2s animated"
                style={{ visibility: 'visible', animationName: 'fadeInLeft' }}
              >
                <div className="section-title mb-15">
                  <span className="sub-title mb-5">{impactData.subTitle || 'Transforming Lives Through Guru Kripa'}</span>
                  <h3>
                    <span>{impactData.title || 'Sahast Foundation'}</span>
                  </h3>
                </div>

                <p>
                  {impactData.description ||
                    'At Sahast Foundation, we uplift lives through education, seva, and spiritual guidance under the blessings of Pujya Shree Abhay Das Maharaj - empowering children, supporting families, and building a value-driven society.'}
                </p>

                {/* Animated Counters */}
                <div className="counter-inner-wrap">
                  <div className={`counter-text-wrap ${hasAnimated ? 'counted' : ''}`}>
                    <span 
                      className="count-text m" 
                      data-speed="3000" 
                      data-stop="25000"
                    >
                      {impactData.stat1Count ? impactData.stat1Count.replace('+', '') : counts.c1.toLocaleString()}
                    </span>
                    <i className="counter-title">{impactData.stat1Label || 'Children Educated'}</i>
                  </div>

                  <div className={`counter-text-wrap ${hasAnimated ? 'counted' : ''}`}>
                    <span 
                      className="count-text m" 
                      data-speed="3000" 
                      data-stop="15,000"
                    >
                      {impactData.stat2Count ? impactData.stat2Count.replace('+', '') : counts.c2.toLocaleString()}
                    </span>
                    <i className="counter-title">{impactData.stat2Label || 'People Provided Food & Essentials'}</i>
                  </div>

                  <div className={`counter-text-wrap ${hasAnimated ? 'counted' : ''}`}>
                    <span 
                      className="count-text m" 
                      data-speed="3000" 
                      data-stop="5,000"
                    >
                      {impactData.stat3Count ? impactData.stat3Count.replace('+', '') : counts.c3.toLocaleString()}
                    </span>
                    <i className="counter-title">{impactData.stat3Label || 'Lives Transformed Through Seva'}</i>
                  </div>
                </div>

                {/* Video Play Button */}
                <button
                  type="button"
                  onClick={onOpenVideo}
                  className="mfp-iframe video-play"
                  aria-label="Play Video"
                  title="Watch Video"
                >
                  <svg 
                    width="56" 
                    height="56" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="1.8" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <polygon points="10 8 16 12 10 16 10 8" fill="currentColor" stroke="none" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Right Column: Maharaj Ji Quote & Live With Dignity */}
            <div className="col-lg-5">
              <div 
                className="video-right-part text-white mb-55 wow fadeInRight delay-0-2s animated"
                style={{ visibility: 'visible', animationName: 'fadeInRight' }}
              >
                <div className="section-title">
                  <span className="sub-title mb-10">{impactData.quoteSubTitle || 'Live With Dignity'}</span>
                  <h4>
                    {impactData.quoteTitle ||
                      'Every day, we help families move towards a better, self-reliant future'}
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Video Section Background Image with Overlay */}
        <div 
          className="video-section-bg" 
          style={{ 
            backgroundImage: `url('${impactData.bgImage || '/home-page-image/guruji.jpeg'}')` 
          }}
          onError={(e) => {
            e.currentTarget.style.backgroundImage = "url('https://sahastfoundation.in/wp-content/uploads/2026/05/guruji.jpeg')";
          }}
        />
      </section>
    </>
  );
}
