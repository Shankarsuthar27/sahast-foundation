import React, { useState, useEffect } from 'react';
import { useCms } from '../context/CmsContext';

export default function HeroBanner({ onOpenDonate }) {
  const { homepageData } = useCms();
  const rawSlides = homepageData?.hero?.slides;
  const slides = Array.isArray(rawSlides)
    ? rawSlides
    : (rawSlides && typeof rawSlides === 'object')
      ? Object.values(rawSlides)
      : [];
  const currentHeroSlide = slides[0] || homepageData?.hero || {};

  const heroBg =
    currentHeroSlide.imageUrl ||
    homepageData?.hero?.imageUrl ||
    '/home-page-image/guruji-1.jpeg';

  const [bgSrc, setBgSrc] = useState(heroBg);

  useEffect(() => {
    if (heroBg) {
      setBgSrc(heroBg);
    }
  }, [heroBg]);

  return (
    <>
      <style>{`
        /* Design Tokens specified */
        :root {
          --base-color: #666666;
          --heading-color: #333333;
          --main-color: #e31937;
          --secondary-color: #082151;
          --yellow-color: #ffde69;
          --bs-gutter-x: 30px;
          --bs-gutter-y: 0px;
        }

        /* Hero Area Section Root */
        .hero-area {
          position: relative;
          z-index: 1;
          font-family: Lato, sans-serif;
          font-size: 18px;
          line-height: 30px;
          text-align: left;
          color: var(--base-color, #666666);
          background-size: cover;
          background-position: 50% 50%;
          background-repeat: no-repeat;
          padding: 150px 0px 245px 0px;
          cursor: crosshair;
          transition: all;
          overflow: hidden;
        }

        .hero-area::before {
          content: "";
          display: block;
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0px;
          right: 0px;
          bottom: 0px;
          left: 0px;
          background-color: rgb(8, 33, 81);
          color: rgb(102, 102, 102);
          font-size: 18px;
          font-weight: 400;
          border-radius: 0px;
          border: 0px none rgb(102, 102, 102);
          opacity: 1;
          mix-blend-mode: multiply;
          z-index: 0;
        }

        .hero-area::after {
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

        /* Container 1000 */
        .hero-area .container-1000 {
          width: 100%;
          padding-right: 20px;
          padding-left: 20px;
          margin-right: auto;
          margin-left: auto;
          max-width: 1140px;
          position: relative;
          z-index: 2;
          box-sizing: border-box;
        }

        @media (min-width: 1200px) {
          .hero-area .container-1000 {
            max-width: 1140px;
          }
        }

        /* Side-by-Side 2-Column Row Layout: Left = Images, Right = Text */
        .hero-area .hero-grid-row {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          gap: 50px;
          box-sizing: border-box;
        }

        /* Left Column: Images */
        .hero-area .hero-col-images {
          flex: 1 1 50%;
          max-width: 50%;
          width: 50%;
          box-sizing: border-box;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        /* Right Column: Text Content */
        .hero-area .hero-col-content {
          flex: 1 1 50%;
          max-width: 50%;
          width: 50%;
          box-sizing: border-box;
        }

        /* Responsive Breakpoint: Stack vertically only on mobile screens */
        @media (max-width: 768px) {
          .hero-area .hero-grid-row {
            flex-direction: column;
            gap: 40px;
          }

          .hero-area .hero-col-images,
          .hero-area .hero-col-content {
            flex: 0 0 100%;
            max-width: 100%;
            width: 100%;
          }

          .hero-area {
            padding-top: 130px;
            padding-bottom: 120px;
          }
        }

        @media (max-width: 575px) {
          .hero-area {
            padding-top: 100px;
            padding-bottom: 90px;
          }
        }

        /* Hero Content */
        .hero-content {
          position: relative;
          z-index: 2;
        }

        .hero-content.text-white {
          color: #ffffff;
        }

        .hero-content .h6 {
          display: inline-block;
          margin-bottom: 10px;
          font-weight: 400;
          color: #ffffff;
          font-size: 18px;
          font-family: 'Lato', sans-serif;
          letter-spacing: 0.5px;
        }

        @media (min-width: 376px) {
          .hero-content .h6 {
            font-size: 22px;
          }
        }

        .hero-content .section-title {
          margin-bottom: 15px;
          z-index: 1;
          margin-top: -7px;
          position: relative;
        }

        .hero-content .section-title h2 {
          color: #ffffff;
          font-size: 46px;
          font-weight: 700;
          line-height: 1.2;
          font-family: 'PT Sans', sans-serif;
          margin: 0;
        }

        @media (min-width: 1200px) {
          .hero-content .section-title h2 {
            font-size: 50px;
          }
        }

        @media (max-width: 767px) {
          .hero-content .section-title h2 {
            font-size: 38px;
          }
        }

        @media (max-width: 479px) {
          .hero-content .section-title h2 {
            font-size: 30px;
            line-height: 1.3;
          }
        }

        .hero-content p {
          color: #ffffff;
          font-size: 18px;
          line-height: 30px;
          margin-bottom: 0;
          font-family: 'Lato', sans-serif;
          opacity: 0.95;
        }

        @media (min-width: 376px) {
          .hero-content p {
            font-size: 20px;
          }
        }

        /* Theme Button with Dual Text Hover Animation */
        .hero-area .theme-btn {
          overflow: hidden;
          position: relative;
          display: inline-block;
          vertical-align: middle;
          text-decoration: none;
          cursor: pointer;
          border: none;
          background: transparent;
          padding: 0;
          box-shadow: 0 4px 15px rgba(227, 25, 55, 0.35);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .hero-area .theme-btn:hover {
          box-shadow: 0 8px 25px rgba(227, 25, 55, 0.5);
          transform: translateY(-2px);
        }

        .hero-area .br-10 {
          border-radius: 10px;
        }

        .hero-area .mt-30 {
          margin-top: 30px;
        }

        .hero-area .theme-btn .btn-text {
          z-index: 1;
          cursor: pointer;
          transition: 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
          font-weight: 700;
          text-align: center;
          padding: 15px 38px;
          align-items: center;
          display: inline-flex;
          justify-content: center;
          font-family: 'PT Sans', sans-serif;
          font-size: 18px;
          text-transform: capitalize;
          box-sizing: border-box;
          white-space: nowrap;
          border-radius: 10px;
        }

        .hero-area .theme-btn .btn-text i {
          margin-right: 7px;
          font-size: 16px;
        }

        .hero-area .theme-btn .btn-text.normal {
          color: #ffffff;
          background: var(--main-color, #e31937);
        }

        .hero-area .theme-btn .btn-text.hover {
          z-index: 2;
          position: absolute;
          left: 0;
          top: 100%;
          width: 100%;
          height: 100%;
          color: var(--heading-color, #333333);
          background: var(--yellow-color, #ffde69);
        }

        .hero-area .theme-btn .btn-text.hover i {
          color: var(--heading-color, #333333);
        }

        .hero-area .theme-btn:hover .btn-text.normal {
          transform: translateY(-100%);
        }

        .hero-area .theme-btn:hover .btn-text.hover {
          top: 0;
        }

        @media (max-width: 575px) {
          .hero-area .theme-btn .btn-text {
            padding: 12px 25px;
            font-size: 16px;
          }
        }

        /* Hero Images Triple-Cluster */
        .hero-images {
          display: flex;
          flex-wrap: wrap;
          align-items: flex-start;
          justify-content: center;
          position: relative;
          width: 100%;
          max-width: 490px;
        }

        .hero-images img {
          width: 57%;
          border-radius: 28px;
          display: block;
          height: auto;
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4);
          transition: transform 0.4s ease, box-shadow 0.4s ease;
        }

        .hero-images img:hover {
          transform: scale(1.03);
          box-shadow: 0 20px 45px rgba(0, 0, 0, 0.5);
        }

        .hero-images img.one {
          position: relative;
          z-index: 1;
        }

        .hero-images img.two {
          margin-top: 14%;
          margin-left: -18%;
          position: relative;
          z-index: 2;
          border: 4px solid rgba(255, 255, 255, 0.2);
        }

        .hero-images img.three {
          margin-top: -12%;
          margin-left: 20%;
          position: relative;
          z-index: 3;
        }

        /* Animations */
        @keyframes heroFadeInUp {
          from {
            opacity: 0;
            transform: translateY(35px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes heroFadeInRight {
          from {
            opacity: 0;
            transform: translateX(45px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes heroFadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-45px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes heroFadeInDown {
          from {
            opacity: 0;
            transform: translateY(-35px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .hero-area .wow.animated {
          animation-duration: 0.8s;
          animation-fill-mode: both;
        }

        .hero-area .fadeInUp {
          animation-name: heroFadeInUp;
        }

        .hero-area .fadeInRight {
          animation-name: heroFadeInRight;
        }

        .hero-area .fadeInLeft {
          animation-name: heroFadeInLeft;
        }

        .hero-area .fadeInDown {
          animation-name: heroFadeInDown;
        }

        .hero-area .delay-0-2s {
          animation-delay: 0.2s;
        }

        .hero-area .delay-0-4s {
          animation-delay: 0.4s;
        }

        .hero-area .delay-0-6s {
          animation-delay: 0.6s;
        }

        .hero-area .delay-0-8s {
          animation-delay: 0.8s;
        }
      `}</style>

      {/* Hero Section Container */}
      <section
        id="home"
        className="hero-area bgs-cover pt-150 pb-245 rpt-130"
        style={{ backgroundImage: `url('${bgSrc}')` }}
        role="region"
        aria-label="DIVINE BLESSINGS & SEVA Transforming Lives Through Spiritual Wisdom & Compassion"
      >
        <div className="container container-1000">
          <div className="hero-grid-row row gap-80 align-items-center">
            {/* Left Column: Images Triple Cluster */}
            <div className="col-lg-6 hero-col-images">
              <div className="hero-images">
                <img
                  decoding="async"
                  className="one wow fadeInRight delay-0-2s animated"
                  src={
                    currentHeroSlide.image1 ||
                    homepageData?.hero?.image1 ||
                    '/home-page-image/WhatsApp-Image-2026-05-26-at-21.23.40-e1779954909287.jpeg'
                  }
                  alt="Pujya Maharaj Ji with village children and families"
                  style={{ visibility: 'visible', animationName: 'heroFadeInRight' }}
                  onError={(e) => {
                    e.currentTarget.src =
                      'https://sahastfoundation.in/wp-content/uploads/2026/05/WhatsApp-Image-2026-05-26-at-21.23.40-e1779954909287.jpeg';
                  }}
                />
                <img
                  decoding="async"
                  className="two wow fadeInLeft delay-0-4s animated"
                  src={
                    currentHeroSlide.image2 ||
                    homepageData?.hero?.image2 ||
                    '/home-page-image/WhatsApp-Image-2026-05-26-at-21.23.523-e1779814853502.jpeg'
                  }
                  alt="Pujya Maharaj Ji in satsang discourse"
                  style={{ visibility: 'visible', animationName: 'heroFadeInLeft' }}
                  onError={(e) => {
                    e.currentTarget.src =
                      'https://sahastfoundation.in/wp-content/uploads/2026/05/WhatsApp-Image-2026-05-26-at-21.23.523-e1779814853502.jpeg';
                  }}
                />
                <img
                  decoding="async"
                  className="three wow fadeInDown delay-0-6s animated"
                  src={
                    currentHeroSlide.image3 ||
                    homepageData?.hero?.image3 ||
                    '/home-page-image/WhatsApp-Image-2026-05-26-at-21.23.3866-e1779814834826.jpeg'
                  }
                  alt="Pujya Maharaj Ji giving blessings"
                  style={{ visibility: 'visible', animationName: 'heroFadeInDown' }}
                  onError={(e) => {
                    e.currentTarget.src =
                      'https://sahastfoundation.in/wp-content/uploads/2026/05/WhatsApp-Image-2026-05-26-at-21.23.3866-e1779814834826.jpeg';
                  }}
                />
              </div>
            </div>

            {/* Right Column: Text Content */}
            <div className="col-lg-6 hero-col-content">
              <div className="hero-content text-white rmb-50">
                <span
                  className="h6 d-inline-block mb-10 wow fadeInUp delay-0-2s animated"
                  style={{ visibility: 'visible', animationName: 'heroFadeInUp' }}
                >
                  {currentHeroSlide.badge || homepageData?.hero?.badge || 'DIVINE BLESSINGS & SEVA'}
                </span>

                <div
                  className="section-title mb-15 wow fadeInUp delay-0-4s animated"
                  style={{ visibility: 'visible', animationName: 'heroFadeInUp' }}
                >
                  <h2>
                    {currentHeroSlide.title ||
                      homepageData?.hero?.title ||
                      'Transforming Lives Through Spiritual Wisdom & Compassion'}
                  </h2>
                </div>

                <p
                  className="wow fadeInUp delay-0-6s animated"
                  style={{ visibility: 'visible', animationName: 'heroFadeInUp' }}
                >
                  {currentHeroSlide.description ||
                    homepageData?.hero?.description ||
                    'Guided by Pujya Swami Shri Abhay Das Ji Maharaj, dedicated to uplifting tribal communities through Vedic Gurukul education, Gau Seva, and sacred humanitarian efforts.'}
                </p>

                <a
                  href="#donateModal"
                  className="theme-btn br-10 mt-30 wow fadeInUp delay-0-8s animated"
                  data-bs-toggle="modal"
                  data-bs-target="#donateModal"
                  style={{ visibility: 'visible', animationName: 'heroFadeInUp' }}
                  onClick={(e) => {
                    e.preventDefault();
                    if (onOpenDonate) onOpenDonate();
                  }}
                  aria-label="Donate Now"
                >
                  <span className="btn-text normal">
                    <i className="fas fa-heart"></i>
                    {currentHeroSlide.buttonText || homepageData?.hero?.buttonText || 'Donate Now'}
                  </span>
                  <span className="btn-text hover">
                    <i className="fas fa-heart"></i>
                    {currentHeroSlide.buttonSubtext || homepageData?.hero?.buttonSubtext || currentHeroSlide.buttonText || homepageData?.hero?.buttonText || 'Donate Now'}
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
