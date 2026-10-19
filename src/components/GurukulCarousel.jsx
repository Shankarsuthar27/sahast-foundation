import React, { useState, useEffect, useRef } from 'react';
import { useCms } from '../context/CmsContext';

const GURUKUL_CARDS = [
  {
    id: 'skydome',
    title: 'Sky Dome',
    desc: 'Sitting Capacity of 4000 People',
    image: '/home-page-image/WhatsApp-Image-2026-06-03-at-15.00.05s-e1780480281696.jpeg',
    remoteImage: 'https://sahastfoundation.in/wp-content/uploads/2026/06/WhatsApp-Image-2026-06-03-at-15.00.05s-e1780480281696.jpeg',
    alt: 'Sky Dome'
  },
  {
    id: 'temple',
    title: 'Temple',
    desc: '',
    image: '/home-page-image/WhatsApp-Image-2026-05-28-at-16.39.00ds.jpeg',
    remoteImage: 'https://sahastfoundation.in/wp-content/uploads/2026/05/WhatsApp-Image-2026-05-28-at-16.39.00ds.jpeg',
    alt: 'Temple'
  },
  {
    id: 'kitchen',
    title: 'Kitchen',
    desc: 'Bhojan Shala',
    image: '/home-page-image/WhatsApp-Image-2026-05-28-at-16.39.02ad.jpeg',
    remoteImage: 'https://sahastfoundation.in/wp-content/uploads/2026/05/WhatsApp-Image-2026-05-28-at-16.39.02ad.jpeg',
    alt: 'Kitchen Bhojan Shala'
  },
  {
    id: 'yagyashala',
    title: 'Yagyashala',
    desc: '',
    image: '/home-page-image/ChatGPT-Image-May-29-2026-01_49_49-PM-1.png',
    remoteImage: 'https://sahastfoundation.in/wp-content/uploads/2026/05/ChatGPT-Image-May-29-2026-01_49_49-PM-1.png',
    alt: 'Temple'
  },
  {
    id: 'meditation',
    title: 'Meditation Centre',
    desc: '',
    image: '/home-page-image/WhatsApp-Image-2026-05-28-at-16.38.59sss.jpeg',
    remoteImage: 'https://sahastfoundation.in/wp-content/uploads/2026/05/WhatsApp-Image-2026-05-28-at-16.38.59sss.jpeg',
    alt: 'Meditation Centre'
  },
  {
    id: 'gaushala',
    title: 'Gaushala',
    desc: '',
    image: '/home-page-image/WhatsApp-Image-2026-05-28-at-16.39.08ga.jpeg',
    remoteImage: 'https://sahastfoundation.in/wp-content/uploads/2026/05/WhatsApp-Image-2026-05-28-at-16.39.08ga.jpeg',
    alt: 'Gaushala'
  },
  {
    id: 'gurukulam',
    title: 'Gurukulam Building',
    desc: '',
    image: '/home-page-image/WhatsApp-Image-2026-05-28-at-16.39.05fsf.jpeg',
    remoteImage: 'https://sahastfoundation.in/wp-content/uploads/2026/05/WhatsApp-Image-2026-05-28-at-16.39.05fsf.jpeg',
    alt: 'Gurukulam Building'
  }
];

export default function GurukulCarousel({ onOpenLightbox }) {
  const { homepageData } = useCms();
  const campusData = homepageData?.gurukulCampus || {};
  const rawItems = campusData.items;
  const parsedItems = Array.isArray(rawItems)
    ? rawItems
    : (rawItems && typeof rawItems === 'object' ? Object.values(rawItems) : []);
  const cards = parsedItems.length > 0 ? parsedItems : GURUKUL_CARDS;

  const [current, setCurrent] = useState(0);
  const isHoveredRef = useRef(false);

  const total = cards.length;

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % total);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + total) % total);
  };

  // Auto slide every 3.5s (pauses on hover)
  useEffect(() => {
    const timer = setInterval(() => {
      if (!isHoveredRef.current) {
        setCurrent((prev) => (prev + 1) % total);
      }
    }, 3500);

    return () => clearInterval(timer);
  }, [total]);

  const getCardClass = (index) => {
    const prev = (current - 1 + total) % total;
    const next = (current + 1) % total;
    const prev2 = (current - 2 + total) % total;
    const next2 = (current + 2) % total;

    if (index === current) return 'gs-card active';
    if (index === prev) return 'gs-card prev';
    if (index === next) return 'gs-card next';
    if (index === prev2) return 'gs-card prev2';
    if (index === next2) return 'gs-card next2';
    return 'gs-card';
  };

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Poppins:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />

      <style>{`
        .gurukul-showcase-section {
          padding: 50px 20px;
          background: #ffffff;
          overflow: hidden;
          font-family: 'Poppins', sans-serif;
          position: relative;
        }

        .gs-heading {
          text-align: center;
          margin-bottom: 55px;
        }

        .gs-heading span {
          color: #D59A1A;
          font-size: 15px;
          font-weight: 600;
          letter-spacing: 1.5px;
          text-transform: uppercase;
        }

        .gs-heading h2 {
          font-size: 48px;
          color: #111111;
          margin: 10px 0 0;
          font-weight: 700;
        }

        .gs-slider {
          position: relative;
          max-width: 1350px;
          height: 430px;
          margin: auto;
        }

        /* .gs-track element as specified */
        .gs-track {
          position: relative;
          width: 100%;
          height: 100%;
          font-family: 'Poppins', sans-serif;
          font-size: 18px;
          line-height: 30px;
          color: var(--base-color, #666666);
          cursor: crosshair;
          transition: all 0.3s ease;
        }

        .gs-card {
          position: absolute;
          top: 20px;
          left: 50%;
          width: 620px;
          height: 360px;
          overflow: hidden;
          opacity: 0;
          transform: translateX(-50%) scale(.75);
          transition: all 0.7s cubic-bezier(0.25, 0.8, 0.25, 1);
          z-index: 1;
          border-radius: 22px;
          background: #eeeeee;
          box-shadow:
            0 15px 35px rgba(0, 0, 0, 0.12),
            0 30px 70px rgba(0, 0, 0, 0.18),
            0 8px 20px rgba(213, 154, 26, 0.10);
          cursor: pointer;
        }

        .gs-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          display: block;
          transition: 0.8s ease;
        }

        .gs-card.active {
          opacity: 1;
          transform: translateX(-50%) scale(1);
          z-index: 6;
          pointer-events: auto;
        }

        .gs-card.prev {
          opacity: 1;
          transform: translateX(-95%) scale(.88);
          z-index: 5;
          pointer-events: auto;
        }

        .gs-card.next {
          opacity: 1;
          transform: translateX(-5%) scale(.88);
          z-index: 5;
          pointer-events: auto;
        }

        .gs-card.prev2 {
          opacity: 0.60;
          transform: translateX(-145%) scale(.78);
          z-index: 3;
          pointer-events: auto;
        }

        .gs-card.next2 {
          opacity: 0.60;
          transform: translateX(45%) scale(.78);
          z-index: 3;
          pointer-events: auto;
        }

        .gs-card:hover {
          box-shadow:
            0 25px 60px rgba(0, 0, 0, 0.20),
            0 40px 100px rgba(0, 0, 0, 0.28),
            0 10px 30px rgba(213, 154, 26, 0.18);
        }

        .gs-card:hover img {
          transform: scale(1.08);
        }

        .gs-overlay {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          padding: 30px;
          background: linear-gradient(
            to top,
            rgba(0, 0, 0, 0.88),
            rgba(0, 0, 0, 0.35),
            transparent
          );
        }

        .gs-overlay h3 {
          margin: 0;
          font-size: 48px;
          line-height: 1;
          font-family: 'Cormorant Garamond', serif;
          font-weight: 600;
          color: #ffffff;
          letter-spacing: 0.5px;
          text-shadow:
            0 2px 8px rgba(0, 0, 0, 0.25),
            0 4px 20px rgba(0, 0, 0, 0.35);
        }

        .gs-overlay p {
          margin: 8px 0 0;
          font-size: 15px;
          color: rgba(255, 255, 255, 0.92);
          font-family: 'Poppins', sans-serif;
          font-weight: 400;
        }

        .gs-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 52px;
          height: 52px;
          border: none;
          border-radius: 50%;
          background: #ffffff;
          color: #222222;
          font-size: 36px;
          cursor: pointer;
          z-index: 20;
          transition: all 0.3s ease;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          line-height: 1;
          user-select: none;
        }

        .gs-btn:hover {
          background: #D59A1A;
          color: #ffffff;
        }

        .gs-prev {
          left: 5px;
        }

        .gs-next {
          right: 5px;
        }

        @media (max-width: 768px) {
          .gurukul-showcase-section {
            padding: 70px 10px;
          }

          .gs-heading h2 {
            font-size: 32px;
          }

          .gs-slider {
            height: 260px;
          }

          .gs-card {
            width: 300px;
            height: 190px;
            border-radius: 16px;
          }

          .gs-card.prev {
            transform: translateX(-90%) scale(.82);
          }

          .gs-card.next {
            transform: translateX(-10%) scale(.82);
          }

          .gs-card.prev2,
          .gs-card.next2 {
            opacity: 0;
          }

          .gs-overlay {
            padding: 18px 20px;
          }

          .gs-overlay h3 {
            font-size: 28px;
          }

          .gs-overlay p {
            font-size: 12px;
          }

          .gs-btn {
            width: 40px;
            height: 40px;
            font-size: 28px;
          }
        }
      `}</style>

      <section className="gurukul-showcase-section" id="gurukul">
        <div className="gs-heading">
          <span>{campusData.badge || 'Our Spiritual Campus'}</span>
          <h2>{campusData.heading || 'Have a Look at Our Gurukul'}</h2>
        </div>

        <div
          className="gs-slider"
          onMouseEnter={() => { isHoveredRef.current = true; }}
          onMouseLeave={() => { isHoveredRef.current = false; }}
        >
          <button
            type="button"
            className="gs-btn gs-prev"
            onClick={prevSlide}
            aria-label="Previous slide"
          >
            ‹
          </button>

          {/* .gs-track container matching exact specification */}
          <div className="gs-track">
            {cards.map((card, index) => {
              const cardClass = getCardClass(index);
              const isActive = index === current;

              return (
                <div
                  key={card.id || index}
                  className={cardClass}
                  onClick={() => {
                    if (isActive) {
                      if (onOpenLightbox) {
                        onOpenLightbox(card.image, card.title);
                      }
                    } else {
                      setCurrent(index);
                    }
                  }}
                >
                  <img
                    decoding="async"
                    src={card.image}
                    alt={card.alt || card.title}
                    onError={(e) => {
                      if (card.remoteImage) e.currentTarget.src = card.remoteImage;
                    }}
                  />
                  <div className="gs-overlay">
                    <h3>{card.title}</h3>
                    {card.desc && <p>{card.desc}</p>}
                  </div>
                </div>
              );
            })}
          </div>

          <button
            type="button"
            className="gs-btn gs-next"
            onClick={nextSlide}
            aria-label="Next slide"
          >
            ›
          </button>
        </div>
      </section>
    </>
  );
}
