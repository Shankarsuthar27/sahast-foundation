import React, { useState, useEffect } from 'react';
import {
  Check,
  Upload,
  Smartphone,
  Monitor,
  Edit2,
  Plus,
  Image as ImageIcon,
  Play,
  ChevronDown,
  ChevronUp,
  CloudUpload,
  X,
  CheckCircle2,
  Heart,
  Sparkles,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  ExternalLink,
  RotateCcw
} from 'lucide-react';
import { useCms } from '../../../context/CmsContext';
import { uploadImageToStorage, deepMerge } from '../../../firebase/services';
import { HOMEPAGE_DEFAULT_SEED } from '../../../firebase/schema';

const SECTION_TABS = [
  { id: 'hero', number: '01', label: 'Hero Banner' },
  { id: 'about', number: '02', label: 'Spiritual Seva' },
  { id: 'pillars', number: '03', label: 'Three Pillars' },
  { id: 'commitment', number: '04', label: 'Sacred Commitment' },
  { id: 'priorities', number: '05', label: 'Our Priorities' },
  { id: 'impact', number: '06', label: 'Highlights & Video' },
  { id: 'gurukul', number: '07', label: 'Gurukul Campus' },
  { id: 'how-we-work', number: '08', label: 'How We Work' },
  { id: 'blogs', number: '09', label: 'Latest Blogs' },
  { id: 'contact', number: '10', label: 'Contact Us' },
  { id: 'footer', number: '11', label: 'Footer & Newsletter' }
];

export default function HomepageEditor({ onViewLiveSite }) {
  const { homepageData, updateHomepageData, isSaving, galleryList } = useCms();
  const [formData, setFormData] = useState(() => deepMerge(HOMEPAGE_DEFAULT_SEED, homepageData || {}));
  const [activeTab, setActiveTab] = useState('hero');
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [deviceMode, setDeviceMode] = useState('desktop'); // 'desktop' | 'mobile'
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const [lastSavedMessage, setLastSavedMessage] = useState('Draft synced');
  const [subStatusMessage, setSubStatusMessage] = useState('All changes kept in memory');
  const [publishSuccess, setPublishSuccess] = useState(false);

  // Quick Inline Edit Modal state
  const [editModal, setEditModal] = useState({
    isOpen: false,
    title: '',
    value: '',
    fieldPath: '',
    type: 'text' // 'text' | 'textarea' | 'image'
  });

  // Keep form data synced with Firestore context
  useEffect(() => {
    if (homepageData) {
      setFormData((prev) => deepMerge(prev || HOMEPAGE_DEFAULT_SEED, homepageData));
    }
  }, [homepageData]);

  // Deep field update helper supporting arrays and hero dual-sync
  const updateField = (path, value) => {
    const keys = path.split('.');
    setFormData((prev) => {
      const copy = JSON.parse(JSON.stringify(prev || HOMEPAGE_DEFAULT_SEED));
      let current = copy;
      for (let i = 0; i < keys.length - 1; i++) {
        const k = keys[i];
        const nextKey = keys[i + 1];
        if (!current[k]) {
          current[k] = !isNaN(Number(nextKey)) ? [] : {};
        }
        current = current[k];
      }
      current[keys[keys.length - 1]] = value;

      // Two-way sync for hero top-level and hero.slides[0]
      if (keys[0] === 'hero') {
        if (!copy.hero) copy.hero = {};
        if (!Array.isArray(copy.hero.slides)) copy.hero.slides = [];
        if (!copy.hero.slides[0]) copy.hero.slides[0] = {};

        if (keys[1] === 'slides' && keys[2] === '0') {
          const heroProp = keys[3];
          if (heroProp) copy.hero[heroProp] = value;
        } else if (keys[1] && keys[1] !== 'slides') {
          copy.hero.slides[0][keys[1]] = value;
        }
      }

      return copy;
    });

    setLastSavedMessage('Draft synced');
    setSubStatusMessage(`${keys[0]} section updated`);
  };

  const handleOpenEdit = (title, fieldPath, currentValue, type = 'text') => {
    setEditModal({
      isOpen: true,
      title,
      fieldPath,
      value: currentValue ?? '',
      type
    });
  };

  const handleSaveModal = () => {
    updateField(editModal.fieldPath, editModal.value);
    setEditModal({ isOpen: false, title: '', value: '', fieldPath: '', type: 'text' });
  };

  // Image Upload handler for modal
  const handleModalImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const url = await uploadImageToStorage(file, 'homepage');
      setEditModal((prev) => ({ ...prev, value: url }));
    } catch (err) {
      alert(`Upload failed: ${err.message}`);
    }
  };

  // Publish to Firestore Live
  const handlePublish = async () => {
    try {
      await updateHomepageData(formData);
      setPublishSuccess(true);
      setLastSavedMessage('Published Live to Firebase');
      setSubStatusMessage('Changes published to live main home page');
      setTimeout(() => setPublishSuccess(false), 6000);
    } catch (err) {
      alert(`Publish failed: ${err.message}`);
    }
  };

  // -------------------------------------------------------------
  // Data Extraction with Safe Fallbacks for Every Section
  // -------------------------------------------------------------

  // 1. Hero
  const heroSlides = formData.hero?.slides || [
    {
      id: 'hero-1',
      badge: 'DIVINE BLESSINGS & SEVA',
      title: 'Transforming Lives Through Spiritual Wisdom & Compassion',
      description:
        'Guided by Pujya Swami Shri Abhay Das Ji Maharaj, dedicated to uplifting tribal communities through Vedic Gurukul education, Gau Seva, and sacred humanitarian efforts.',
      imageUrl: '/home-page-image/guruji-1.jpeg',
      image1: '/home-page-image/WhatsApp-Image-2026-05-26-at-21.23.40-e1779954909287.jpeg',
      image2: '/home-page-image/WhatsApp-Image-2026-05-26-at-21.23.523-e1779814853502.jpeg',
      image3: '/home-page-image/WhatsApp-Image-2026-05-26-at-21.23.3866-e1779814834826.jpeg',
      buttonText: 'Donate Now',
      buttonSubtext: 'Donate Now'
    }
  ];
  const currentSlide = heroSlides[activeSlideIndex] || heroSlides[0];

  // 2. About
  const about = formData.about || {
    badge: 'ABOUT SAHAST FOUNDATION',
    heading: 'Spiritual Enlightenment, Compassion & Seva',
    description:
      'Pujya Swami Shri Abhay Das Ji Maharaj has dedicated his life to awakening Sanatan values, guiding thousands toward peace, righteous living, and selfless service. Through Shri Guru Puram Ashram at Takhatgarh, Rajasthan, numerous humanitarian initiatives flourish daily.',
    artworkImage: '/home-page-image/ChatGPT-Image-May-29-2026-01_49_49-PM-1.png',
    points: [
      'Nishkam Seva: 100% direct-to-beneficiary execution',
      'Free CBSE-accredited Gurukul schooling for 500+ tribal students',
      'Modern Gaushala sheltering 1,200+ desi cows'
    ]
  };

  // 3. Pillars
  const pillars = formData.pillars || [
    {
      id: 1,
      image: '/home-page-image/WhatsApp-Image-2026-05-26-at-21.23.3866-e1779814834826.jpeg',
      title: 'Annakshetra Seva',
      description:
        'Serving wholesome, freshly-prepared satvik meals daily to hundreds of sadhus, pilgrims, and impoverished families.',
      action: 'Support Annadan'
    },
    {
      id: 2,
      image: '/home-page-image/WhatsApp-Image-2026-05-26-at-21.23.40-e1779954909287.jpeg',
      title: 'Mission & Values',
      description:
        'Preserving Sanatan moral principles and spiritual traditions to awaken compassion, character, and harmony in every household.',
      action: 'Learn Our Values'
    },
    {
      id: 3,
      image: '/home-page-image/WhatsApp-Image-2026-05-28-at-13.35.48-e1779956288882.jpeg',
      title: 'Child Education & Care',
      description:
        'Sponsoring comprehensive Gurukul residential education, books, nutrition, and sanskars for 500+ rural and tribal youth.',
      action: 'Sponsor a Student'
    }
  ];

  // 4. Commitment
  const commitment = formData.commitment || {
    badge: 'A SACRED COMMITMENT',
    heading:
      'We Are Committed to Transforming Thousands of Lives Through Education, Seva & Spiritual Guidance',
    description:
      'Under the divine vision and leadership of Pujya Swami Shri Abhay Das Ji Maharaj, Sahast Foundation serves as a beacon of hope for remote tribal belts and underserved rural communities across western Rajasthan.',
    image: '/home-page-image/guruji-1.jpeg',
    statNumber: '1,00,000+',
    statLabel: 'Lives Positively Impacted',
    buttonText: 'Donate for Seva',
    guruName: 'Pujya Swami Shri Abhaydas Ji',
    guruTitle: '5th Acharya, Sadguru Trikam Das Ji Dham'
  };

  // 5. Priorities
  const priorities = formData.priorities || {
    badge: 'KEY INITIATIVES',
    heading: 'Our Priorities',
    subheading: 'Making lasting change through holistic support, education, and compassion.',
    items: [
      {
        id: 1,
        image: '/home-page-image/WhatsApp-Image-2026-05-28-at-16.38.59sss.jpeg',
        title: 'Free Food / Annadaan',
        description:
          'Distributing thousands of hot, nutritious meals every month to pilgrims, sadhus, and families facing food insecurity.',
        action: 'Learn More'
      },
      {
        id: 2,
        image: '/home-page-image/WhatsApp-Image-2026-05-28-at-16.39.00ds.jpeg',
        title: 'Tribal Education',
        description:
          'Empowering children from remote tribal belts with free residential schooling, books, computers, and moral character building.',
        action: 'Learn More'
      },
      {
        id: 3,
        image: '/home-page-image/WhatsApp-Image-2026-05-28-at-16.39.02ad.jpeg',
        title: 'Relief & Ration Kits',
        description:
          'Delivering essential dry rations, clean drinking water, warm blankets, and medical first-aid kits during emergencies.',
        action: 'Learn More'
      },
      {
        id: 4,
        image: '/home-page-image/WhatsApp-Image-2026-05-28-at-16.39.05fsf.jpeg',
        title: 'Spiritual Guidance',
        description:
          'Conducting regular Katha pravachans, family harmony discourses, and de-addiction workshops for youth across India.',
        action: 'Learn More'
      }
    ]
  };

  // 6. Impact & Video
  const impact = formData.impact || {
    subTitle: 'Transforming Lives Through Guru Kripa',
    title: 'Sahast Foundation',
    description:
      'At Sahast Foundation, we uplift lives through education, seva, and spiritual guidance under the blessings of Pujya Shree Abhay Das Maharaj - empowering children, supporting families, and building a value-driven society.',
    stat1Count: '25,000+',
    stat1Label: 'Children Educated',
    stat2Count: '15,000+',
    stat2Label: 'People Provided Food & Essentials',
    stat3Count: '5,000+',
    stat3Label: 'Lives Transformed Through Seva',
    quoteSubTitle: 'Live With Dignity',
    quoteTitle: 'Every day, we help families move towards a better, self-reliant future',
    bgImage: '/home-page-image/guruji.jpeg',
    videoUrl: 'https://www.youtube.com/watch?v=kW-T1J5QFdY'
  };

  // 7. Gurukul Campus
  const gurukulCampus = formData.gurukulCampus || {
    badge: 'Our Spiritual Campus',
    heading: 'Have a Look at Our Gurukul',
    items: [
      {
        id: 'skydome',
        title: 'Sky Dome',
        desc: 'Sitting Capacity of 4000 People',
        image: '/home-page-image/WhatsApp-Image-2026-06-03-at-15.00.05s-e1780480281696.jpeg'
      },
      {
        id: 'temple',
        title: 'Temple',
        desc: 'Sacred Sanctum of Sadhana',
        image: '/home-page-image/WhatsApp-Image-2026-05-28-at-16.39.00ds.jpeg'
      },
      {
        id: 'kitchen',
        title: 'Kitchen',
        desc: 'Bhojan Shala & Annakshetra',
        image: '/home-page-image/WhatsApp-Image-2026-05-28-at-16.39.02ad.jpeg'
      },
      {
        id: 'yagyashala',
        title: 'Yagyashala',
        desc: 'Vedic Homa & Yajna Hall',
        image: '/home-page-image/ChatGPT-Image-May-29-2026-01_49_49-PM-1.png'
      },
      {
        id: 'meditation',
        title: 'Meditation Centre',
        desc: 'Peace & Dhyana Sanctuary',
        image: '/home-page-image/WhatsApp-Image-2026-05-28-at-16.38.59sss.jpeg'
      },
      {
        id: 'gaushala',
        title: 'Gaushala',
        desc: 'Care for Indigenous Desi Cows',
        image: '/home-page-image/WhatsApp-Image-2026-05-28-at-16.39.08ga.jpeg'
      },
      {
        id: 'gurukulam',
        title: 'Gurukulam Building',
        desc: 'Academic Classrooms & Dormitories',
        image: '/home-page-image/WhatsApp-Image-2026-05-28-at-16.39.05fsf.jpeg'
      }
    ]
  };

  // 8. How We Work
  const howWeWork = formData.howWeWork || {
    headingPrefix: 'How ',
    headingHighlight: 'We Work?',
    subheading:
      'A transparent and compassionate 4-step framework ensuring every contribution transforms lives directly.',
    steps: [
      {
        id: 1,
        title: 'Identifying Needs',
        description:
          'Grassroots surveys in remote tribal and drought-affected regions to identify families in severe need of food, water, and schooling.',
        iconImg: '/home-page-image/icon1.png'
      },
      {
        id: 2,
        title: 'Planning & Execution',
        description:
          'Systematic logistical planning and volunteer coordination to ensure maximum impact with zero administrative overhead waste.',
        iconImg: '/home-page-image/icon2.png'
      },
      {
        id: 3,
        title: 'Transparent Delivery',
        description:
          'Direct door-to-door and village-square distribution of cooked prasad, ration bags, school kits, and veterinary care.',
        iconImg: '/home-page-image/icon3.png'
      },
      {
        id: 4,
        title: 'Long-term Impact',
        description:
          'Continuous monitoring through residential Gurukul education, monthly medical health camps, and sustainable gaushala ecosystems.',
        iconImg: '/home-page-image/icon4.png'
      }
    ]
  };

  // 9. Latest Blogs
  const latestBlogs = formData.latestBlogs || {
    badge: 'ARTICLES & PRAVACHAN',
    heading: 'Our Latest Blogs',
    subheading: 'Insights, teachings, and updates from our initiatives and spiritual discourses.',
    blogs: [
      {
        id: 1,
        image: '/home-page-image/meditation-1-e1780126777484.png',
        badge: 'Spiritual',
        bannerText: 'MEDITATION FOR YOUTH',
        title: 'Meditation and its Impact on Modern Youth',
        date: 'October 2026',
        excerpt:
          'Discover how ancient dhyana techniques reduce anxiety, enhance mental clarity, and cultivate purpose in today\'s fast-paced digital world.'
      },
      {
        id: 2,
        image: '/home-page-image/gurukul.png',
        badge: 'Education',
        bannerText: 'GURUKUL EDUCATION',
        title: 'Why Gurukul Education is Relevant in Modern India',
        date: 'September 2026',
        excerpt:
          'Blending timeless Vedic ethics with contemporary CBSE science prepares grounded youth for compassionate leadership and nation-building.'
      },
      {
        id: 3,
        image: '/home-page-image/The-Power-of-Seva-Serving-Humanity-with-Compassion.png',
        badge: 'Social Welfare',
        bannerText: 'SEVA & HUMANITY',
        title: 'How Nishkam Seva Can Transform One\'s Life',
        date: 'August 2026',
        excerpt:
          'Giving without expectation is the purest form of devotion, purifying our consciousness and awakening boundless contentment.'
      }
    ]
  };

  // 10. Contact Us
  const contact = formData.contactSection || formData.contactAndFooter || {
    badge: 'GET IN TOUCH',
    heading: 'Contact Sahast Foundation',
    subheading:
      'Have queries regarding Gurukul admission, Gau Seva sponsorship, or attending spiritual Kathas? Send us an inquiry.',
    addressTitle: 'Dham Address',
    address: 'Shri Bharat Mata Statue Site, Shri Guru Puram Ashram, Takhatgarh, Pali',
    phoneTitle: 'Phone / WhatsApp',
    phone: '+91 8696298489',
    emailTitle: 'Email Address',
    email: 'info@sahastfoundation.in',
    formTitle: 'Send an Online Inquiry'
  };

  // 11. Footer
  const footer = formData.footer || formData.contactAndFooter || {
    newsletterHeading: 'Get Our Newsletter',
    aboutText:
      'Empowering lives through education, seva, and spiritual guidance under Pujya Shree Abhay Das Maharaj.',
    email: 'info@sahastfoundation.in',
    phone: '+91 8696298489',
    address: 'Shri Bharat Mata Statue Site, Shri Guru Puram Ashram, Takhatgarh, Pali',
    copyrightText: 'Copyright © 2026, Sahast Foundation All Rights Reserved.'
  };

  return (
    <div className="space-y-6 pb-28">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-[11px] font-bold text-sky-600 tracking-wider uppercase mb-1">
            HOMEPAGE CMS
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Live Visual Editor
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Click directly on any text or image in the preview canvas to edit immediately, then click &ldquo;Publish Changes Live&rdquo;.
          </p>
        </div>

        {onViewLiveSite && (
          <button
            type="button"
            onClick={onViewLiveSite}
            className="px-4 py-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-semibold text-xs rounded-xl shadow-2xs flex items-center gap-1.5 transition-colors self-start sm:self-auto cursor-pointer"
          >
            <ExternalLink size={14} className="text-slate-500" />
            <span>View Live Website</span>
          </button>
        )}
      </div>

      {/* 11 Section Tabs Navigation Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
        {SECTION_TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
                isActive
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200/80'
              }`}
            >
              <span
                className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                  isActive ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-500'
                }`}
              >
                {tab.number}
              </span>
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Visual Canvas Container */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden">
        {/* Visual Canvas Top Bar */}
        <div className="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-800">
              VISUAL CANVAS &bull; {SECTION_TABS.find((t) => t.id === activeTab)?.label}
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
            <Check size={14} className="stroke-[2.5]" />
            <span>DRAFT SYNCED</span>
          </div>
        </div>

        {/* Toolbar: Device Switcher (Desktop / Mobile) */}
        <div className="px-5 py-3 border-b border-slate-100 flex items-center justify-between bg-white">
          <div className="flex items-center bg-slate-100 p-1 rounded-xl">
            <button
              type="button"
              onClick={() => setDeviceMode('desktop')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                deviceMode === 'desktop'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
              title="Desktop View"
            >
              <Monitor size={15} />
              <span>Desktop</span>
            </button>
            <button
              type="button"
              onClick={() => setDeviceMode('mobile')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                deviceMode === 'mobile'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
              title="Mobile View"
            >
              <Smartphone size={15} />
              <span>Mobile</span>
            </button>
          </div>

          <div className="text-xs text-slate-400 font-medium hidden sm:block">
            Tip: Hover over any element and click to edit live
          </div>
        </div>

        {/* Canvas Body Viewport */}
        <div className={`p-4 sm:p-6 bg-slate-100/60 flex justify-center transition-all ${deviceMode === 'mobile' ? 'py-8' : ''}`}>
          <div
            className={`w-full transition-all duration-300 ${
              deviceMode === 'mobile'
                ? 'max-w-[420px] border-4 border-slate-800 rounded-3xl shadow-2xl overflow-hidden bg-white'
                : 'max-w-6xl'
            }`}
          >
            {/* ---------------------------------------------------- */}
            {/* SECTION 01: HERO BANNER */}
            {/* ---------------------------------------------------- */}
            {activeTab === 'hero' && (
              <div className="space-y-4">
                {/* Slide Selection Bar */}
                <div className="bg-[#082151] text-white px-4 py-2.5 rounded-t-xl flex items-center gap-2 overflow-x-auto text-xs font-semibold">
                  <span className="text-[11px] text-slate-300 uppercase tracking-wider font-bold mr-1">
                    SLIDE
                  </span>
                  {heroSlides.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveSlideIndex(idx)}
                      className={`w-7 h-7 rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center justify-center ${
                        activeSlideIndex === idx
                          ? 'bg-orange-600 text-white shadow-xs'
                          : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      {idx + 1}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => {
                      const newSlide = {
                        id: `hero-${Date.now()}`,
                        badge: 'DIVINE BLESSINGS & SEVA',
                        title: 'New Devotional Slide Headline',
                        description:
                          'Guided by Pujya Swami Shri Abhay Das Ji Maharaj, dedicated to uplifting tribal communities.',
                        imageUrl: '/home-page-image/guruji-1.jpeg',
                        image1: '/home-page-image/WhatsApp-Image-2026-05-26-at-21.23.40-e1779954909287.jpeg',
                        image2: '/home-page-image/WhatsApp-Image-2026-05-26-at-21.23.523-e1779814853502.jpeg',
                        image3: '/home-page-image/WhatsApp-Image-2026-05-26-at-21.23.3866-e1779814834826.jpeg',
                        buttonText: 'Donate Now',
                        buttonSubtext: 'Donate Now'
                      };
                      const updated = [...heroSlides, newSlide];
                      updateField('hero.slides', updated);
                      setActiveSlideIndex(updated.length - 1);
                    }}
                    className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <Plus size={13} />
                    <span>Add</span>
                  </button>
                </div>

                {/* Hero 2-Column Visual Card */}
                <div
                  className="relative rounded-b-xl overflow-hidden p-6 sm:p-10 text-white bg-cover bg-center shadow-lg"
                  style={{
                    backgroundColor: '#082151',
                    backgroundImage: `linear-gradient(rgba(8, 33, 81, 0.92), rgba(8, 33, 81, 0.94)), url(${currentSlide.imageUrl || '/home-page-image/guruji-1.jpeg'})`
                  }}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    {/* Left: 3-Image Cluster */}
                    <div className="relative">
                      <div className="text-[11px] font-bold text-sky-400 mb-2 flex items-center gap-1.5">
                        <ImageIcon size={13} />
                        <span>HERO 3-IMAGE CLUSTER (CLICK TO CHANGE)</span>
                      </div>
                      <div className="grid grid-cols-3 gap-3">
                        {/* Image 1 */}
                        <div
                          onClick={() =>
                            handleOpenEdit(
                              'Change Hero Image 1 (Left)',
                              `hero.slides.${activeSlideIndex}.image1`,
                              currentSlide.image1,
                              'image'
                            )
                          }
                          className="group relative rounded-xl overflow-hidden border-2 border-transparent hover:border-sky-400 cursor-pointer shadow-md bg-slate-800 h-28 sm:h-36"
                        >
                          <img
                            src={currentSlide.image1 || '/home-page-image/WhatsApp-Image-2026-05-26-at-21.23.40-e1779954909287.jpeg'}
                            alt="Cluster 1"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white text-[11px] font-bold">
                            <Edit2 size={14} className="mr-1" /> Edit
                          </div>
                        </div>

                        {/* Image 2 */}
                        <div
                          onClick={() =>
                            handleOpenEdit(
                              'Change Hero Image 2 (Center)',
                              `hero.slides.${activeSlideIndex}.image2`,
                              currentSlide.image2,
                              'image'
                            )
                          }
                          className="group relative rounded-xl overflow-hidden border-2 border-transparent hover:border-sky-400 cursor-pointer shadow-md bg-slate-800 h-28 sm:h-36"
                        >
                          <img
                            src={currentSlide.image2 || '/home-page-image/WhatsApp-Image-2026-05-26-at-21.23.523-e1779814853502.jpeg'}
                            alt="Cluster 2"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white text-[11px] font-bold">
                            <Edit2 size={14} className="mr-1" /> Edit
                          </div>
                        </div>

                        {/* Image 3 */}
                        <div
                          onClick={() =>
                            handleOpenEdit(
                              'Change Hero Image 3 (Right)',
                              `hero.slides.${activeSlideIndex}.image3`,
                              currentSlide.image3,
                              'image'
                            )
                          }
                          className="group relative rounded-xl overflow-hidden border-2 border-transparent hover:border-sky-400 cursor-pointer shadow-md bg-slate-800 h-28 sm:h-36"
                        >
                          <img
                            src={currentSlide.image3 || '/home-page-image/WhatsApp-Image-2026-05-26-at-21.23.3866-e1779814834826.jpeg'}
                            alt="Cluster 3"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white text-[11px] font-bold">
                            <Edit2 size={14} className="mr-1" /> Edit
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right: Text and CTA */}
                    <div className="space-y-4">
                      {/* Badge */}
                      <div
                        onClick={() =>
                          handleOpenEdit(
                            'Edit Devotional Badge',
                            `hero.slides.${activeSlideIndex}.badge`,
                            currentSlide.badge,
                            'text'
                          )
                        }
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-orange-600/90 hover:bg-orange-600 text-white text-xs font-bold border border-orange-400/40 cursor-pointer transition-all hover:scale-[1.02]"
                        title="Click to edit badge"
                      >
                        <span>{currentSlide.badge || 'DIVINE BLESSINGS & SEVA'}</span>
                        <Edit2 size={12} className="opacity-80" />
                      </div>

                      {/* Title */}
                      <div
                        onClick={() =>
                          handleOpenEdit(
                            'Edit Hero Headline',
                            `hero.slides.${activeSlideIndex}.title`,
                            currentSlide.title,
                            'text'
                          )
                        }
                        className="p-2 -ml-2 rounded-xl border border-dashed border-transparent hover:border-sky-400 hover:bg-sky-950/40 transition-all cursor-pointer group"
                        title="Click to edit headline"
                      >
                        <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight text-white group-hover:text-sky-200">
                          {currentSlide.title || 'Transforming Lives Through Spiritual Wisdom & Compassion'}
                        </h2>
                      </div>

                      {/* Description */}
                      <div
                        onClick={() =>
                          handleOpenEdit(
                            'Edit Hero Description',
                            `hero.slides.${activeSlideIndex}.description`,
                            currentSlide.description,
                            'textarea'
                          )
                        }
                        className="p-2 -ml-2 rounded-xl border border-dashed border-transparent hover:border-sky-400 hover:bg-sky-950/40 transition-all cursor-pointer group"
                        title="Click to edit description"
                      >
                        <p className="text-xs sm:text-sm text-slate-200 leading-relaxed group-hover:text-white">
                          {currentSlide.description ||
                            'Guided by Pujya Swami Shri Abhay Das Ji Maharaj, dedicated to uplifting tribal communities through Vedic Gurukul education, Gau Seva, and sacred humanitarian efforts.'}
                        </p>
                      </div>

                      {/* Button */}
                      <div className="pt-2">
                        <button
                          type="button"
                          onClick={() =>
                            handleOpenEdit(
                              'Edit Hero Button Text',
                              `hero.slides.${activeSlideIndex}.buttonText`,
                              currentSlide.buttonText,
                              'text'
                            )
                          }
                          className="px-5 py-2.5 rounded-xl bg-[#e31937] hover:bg-red-700 text-white font-bold text-xs flex items-center gap-2 shadow-md cursor-pointer transition-transform hover:scale-[1.02]"
                        >
                          <Heart size={14} fill="currentColor" />
                          <span>{currentSlide.buttonText || 'Donate Now'}</span>
                          <Edit2 size={12} className="opacity-80" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ---------------------------------------------------- */}
            {/* SECTION 02: SPIRITUAL SEVA (ABOUT) */}
            {/* ---------------------------------------------------- */}
            {activeTab === 'about' && (
              <div className="p-6 sm:p-10 bg-white rounded-xl shadow-md border border-slate-200">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  {/* Left Column Content */}
                  <div className="space-y-4">
                    <div
                      onClick={() => handleOpenEdit('Edit About Badge', 'about.badge', about.badge, 'text')}
                      className="inline-block text-[#e31937] text-xs font-extrabold tracking-wider uppercase p-1.5 -ml-1.5 rounded-lg border border-dashed border-transparent hover:border-red-400 hover:bg-red-50 cursor-pointer"
                    >
                      {about.badge || 'ABOUT SAHAST FOUNDATION'}
                      <Edit2 size={11} className="inline ml-1 opacity-70" />
                    </div>

                    <div
                      onClick={() => handleOpenEdit('Edit About Heading', 'about.heading', about.heading, 'text')}
                      className="p-2 -ml-2 rounded-xl border border-dashed border-transparent hover:border-sky-400 hover:bg-sky-50 cursor-pointer"
                    >
                      <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
                        {about.heading || 'Spiritual Enlightenment, Compassion & Seva'}
                      </h2>
                    </div>

                    <div
                      onClick={() => handleOpenEdit('Edit About Description', 'about.description', about.description, 'textarea')}
                      className="p-2 -ml-2 rounded-xl border border-dashed border-transparent hover:border-sky-400 hover:bg-sky-50 cursor-pointer"
                    >
                      <p className="text-sm text-slate-600 leading-relaxed">
                        {about.description ||
                          'Pujya Swami Shri Abhay Das Ji Maharaj has dedicated his life to awakening Sanatan values, guiding thousands toward peace, righteous living, and selfless service.'}
                      </p>
                    </div>

                    {/* Bullet Points */}
                    <div className="space-y-2 pt-2">
                      {(about.points || []).map((pt, idx) => (
                        <div
                          key={idx}
                          onClick={() =>
                            handleOpenEdit(`Edit Bullet Point ${idx + 1}`, `about.points.${idx}`, pt, 'text')
                          }
                          className="flex items-center gap-2.5 p-2 rounded-lg border border-dashed border-transparent hover:border-emerald-400 hover:bg-emerald-50 cursor-pointer text-xs font-semibold text-slate-800"
                        >
                          <CheckCircle2 size={16} className="text-[#e31937] shrink-0" />
                          <span>{pt}</span>
                          <Edit2 size={11} className="opacity-60 ml-auto" />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: Campus Image */}
                  <div>
                    <div className="text-[11px] font-bold text-slate-400 mb-2 uppercase">
                      Campus / Ashram Image
                    </div>
                    <div
                      onClick={() =>
                        handleOpenEdit('Replace Artwork Image', 'about.artworkImage', about.artworkImage, 'image')
                      }
                      className="group relative rounded-2xl overflow-hidden border-2 border-slate-200 hover:border-sky-500 cursor-pointer shadow-md bg-slate-100 h-64 sm:h-80"
                    >
                      <img
                        src={about.artworkImage || '/home-page-image/ChatGPT-Image-May-29-2026-01_49_49-PM-1.png'}
                        alt="Campus Artwork"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white font-bold text-xs">
                        <ImageIcon size={16} className="mr-1.5" /> Click to Change Image
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ---------------------------------------------------- */}
            {/* SECTION 03: THREE PILLARS */}
            {/* ---------------------------------------------------- */}
            {activeTab === 'pillars' && (
              <div className="p-6 sm:p-10 bg-white rounded-xl shadow-md border border-slate-200 space-y-6">
                <div>
                  <div className="text-xs font-bold text-[#e31937] uppercase tracking-wider">PILLARS OF SEVA</div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">
                    Three Pillars of Compassionate Action
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {pillars.map((pillar, idx) => (
                    <div
                      key={pillar.id || idx}
                      className="bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden flex flex-col justify-between"
                    >
                      {/* Image */}
                      <div
                        onClick={() =>
                          handleOpenEdit(`Edit Pillar ${idx + 1} Image`, `pillars.${idx}.image`, pillar.image, 'image')
                        }
                        className="group relative h-40 bg-slate-200 cursor-pointer overflow-hidden"
                      >
                        <img
                          src={pillar.image}
                          alt={pillar.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white text-xs font-bold">
                          <ImageIcon size={14} className="mr-1" /> Change Image
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                        <div>
                          <div
                            onClick={() =>
                              handleOpenEdit(`Edit Pillar ${idx + 1} Title`, `pillars.${idx}.title`, pillar.title, 'text')
                            }
                            className="p-1 -ml-1 rounded border border-dashed border-transparent hover:border-sky-400 hover:bg-sky-50 cursor-pointer font-bold text-sm text-slate-900"
                          >
                            {pillar.title} <Edit2 size={11} className="inline ml-1 opacity-60" />
                          </div>
                          <div
                            onClick={() =>
                              handleOpenEdit(`Edit Pillar ${idx + 1} Description`, `pillars.${idx}.description`, pillar.description, 'textarea')
                            }
                            className="p-1 -ml-1 rounded border border-dashed border-transparent hover:border-sky-400 hover:bg-sky-50 cursor-pointer text-xs text-slate-600 mt-1"
                          >
                            {pillar.description}
                          </div>
                        </div>

                        <div
                          onClick={() =>
                            handleOpenEdit(`Edit Pillar ${idx + 1} Button`, `pillars.${idx}.action`, pillar.action, 'text')
                          }
                          className="pt-2 text-xs font-bold text-[#e31937] flex items-center gap-1 cursor-pointer hover:underline"
                        >
                          <span>{pillar.action || 'Support Seva'}</span>
                          <ArrowRight size={13} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ---------------------------------------------------- */}
            {/* SECTION 04: SACRED COMMITMENT */}
            {/* ---------------------------------------------------- */}
            {activeTab === 'commitment' && (
              <div className="p-6 sm:p-10 bg-[#faf8f4] rounded-xl shadow-md border border-[#f0ece1]">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  {/* Portrait */}
                  <div className="relative">
                    <div
                      onClick={() =>
                        handleOpenEdit('Replace Guruji Full Portrait', 'commitment.image', commitment.image, 'image')
                      }
                      className="group relative rounded-2xl overflow-hidden border-4 border-white shadow-xl bg-slate-200 h-80 sm:h-96 cursor-pointer"
                    >
                      <img
                        src={commitment.image || '/home-page-image/guruji-1.jpeg'}
                        alt="Guruji"
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white text-xs font-bold">
                        <ImageIcon size={16} className="mr-1.5" /> Replace Portrait
                      </div>
                    </div>
                    {/* Badge */}
                    <div
                      onClick={() =>
                        handleOpenEdit('Edit Guru Title', 'commitment.guruName', commitment.guruName, 'text')
                      }
                      className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-xl shadow-md flex items-center gap-2 cursor-pointer border border-slate-200 hover:border-amber-400"
                    >
                      <Sparkles size={16} className="text-amber-500" />
                      <div>
                        <div className="text-xs font-bold text-slate-900">{commitment.guruName || 'Pujya Swami Shri Abhaydas Ji'}</div>
                        <div className="text-[10px] text-slate-500">{commitment.guruTitle || '5th Acharya, Sadguru Trikam Das Ji Dham'}</div>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-4">
                    <div
                      onClick={() => handleOpenEdit('Edit Commitment Badge', 'commitment.badge', commitment.badge, 'text')}
                      className="text-xs font-extrabold text-[#e31937] uppercase tracking-wider p-1.5 -ml-1.5 rounded-lg border border-dashed border-transparent hover:border-red-400 hover:bg-red-50 cursor-pointer inline-block"
                    >
                      {commitment.badge || 'A SACRED COMMITMENT'}
                    </div>

                    <div
                      onClick={() => handleOpenEdit('Edit Commitment Heading', 'commitment.heading', commitment.heading, 'text')}
                      className="p-2 -ml-2 rounded-xl border border-dashed border-transparent hover:border-sky-400 hover:bg-sky-50 cursor-pointer"
                    >
                      <h2 className="text-xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
                        {commitment.heading || 'We Are Committed to Transforming Thousands of Lives'}
                      </h2>
                    </div>

                    <div
                      onClick={() => handleOpenEdit('Edit Commitment Description', 'commitment.description', commitment.description, 'textarea')}
                      className="p-2 -ml-2 rounded-xl border border-dashed border-transparent hover:border-sky-400 hover:bg-sky-50 cursor-pointer"
                    >
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {commitment.description}
                      </p>
                    </div>

                    {/* Stat */}
                    <div className="pt-2">
                      <div
                        onClick={() => handleOpenEdit('Edit Stat Count', 'commitment.statNumber', commitment.statNumber, 'text')}
                        className="p-2 rounded-xl border border-dashed border-transparent hover:border-amber-400 hover:bg-amber-50 cursor-pointer inline-block"
                      >
                        <div className="text-3xl font-extrabold text-[#e31937]">
                          {commitment.statNumber || '1,00,000+'}
                        </div>
                        <div className="text-xs font-bold text-slate-700">
                          {commitment.statLabel || 'Lives Positively Impacted'}
                        </div>
                      </div>
                    </div>

                    <div>
                      <button
                        type="button"
                        onClick={() => handleOpenEdit('Edit Button Text', 'commitment.buttonText', commitment.buttonText, 'text')}
                        className="px-5 py-2.5 rounded-xl bg-[#e31937] hover:bg-red-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-md cursor-pointer"
                      >
                        <Heart size={14} fill="currentColor" />
                        <span>{commitment.buttonText || 'Donate for Seva'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ---------------------------------------------------- */}
            {/* SECTION 05: OUR PRIORITIES */}
            {/* ---------------------------------------------------- */}
            {activeTab === 'priorities' && (
              <div className="p-6 sm:p-10 bg-white rounded-xl shadow-md border border-slate-200 space-y-6">
                <div className="text-center max-w-xl mx-auto space-y-2">
                  <div
                    onClick={() => handleOpenEdit('Edit Priorities Badge', 'priorities.badge', priorities.badge, 'text')}
                    className="text-xs font-extrabold text-amber-600 uppercase tracking-wider p-1 rounded border border-dashed border-transparent hover:border-amber-400 cursor-pointer inline-block"
                  >
                    {priorities.badge || 'KEY INITIATIVES'}
                  </div>
                  <div
                    onClick={() => handleOpenEdit('Edit Priorities Heading', 'priorities.heading', priorities.heading, 'text')}
                    className="p-1 rounded border border-dashed border-transparent hover:border-sky-400 cursor-pointer"
                  >
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                      {priorities.heading || 'Our Priorities'}
                    </h2>
                  </div>
                  <div
                    onClick={() => handleOpenEdit('Edit Priorities Subtitle', 'priorities.subheading', priorities.subheading, 'text')}
                    className="p-1 rounded border border-dashed border-transparent hover:border-sky-400 cursor-pointer text-xs sm:text-sm text-slate-500"
                  >
                    {priorities.subheading || 'Making lasting change through holistic support, education, and compassion.'}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                  {(priorities.items || []).map((item, idx) => (
                    <div
                      key={item.id || idx}
                      className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs flex flex-col justify-between"
                    >
                      <div
                        onClick={() =>
                          handleOpenEdit(`Edit Initiative ${idx + 1} Image`, `priorities.items.${idx}.image`, item.image, 'image')
                        }
                        className="group relative h-36 bg-slate-100 cursor-pointer overflow-hidden"
                      >
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white text-xs font-bold">
                          <ImageIcon size={14} className="mr-1" /> Replace
                        </div>
                      </div>

                      <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                        <div>
                          <div
                            onClick={() =>
                              handleOpenEdit(`Edit Initiative ${idx + 1} Title`, `priorities.items.${idx}.title`, item.title, 'text')
                            }
                            className="font-bold text-xs text-slate-900 p-1 -ml-1 rounded border border-dashed border-transparent hover:border-sky-400 cursor-pointer"
                          >
                            {item.title}
                          </div>
                          <div
                            onClick={() =>
                              handleOpenEdit(`Edit Initiative ${idx + 1} Description`, `priorities.items.${idx}.description`, item.description, 'textarea')
                            }
                            className="text-[11px] text-slate-600 line-clamp-3 p-1 -ml-1 rounded border border-dashed border-transparent hover:border-sky-400 cursor-pointer"
                          >
                            {item.description}
                          </div>
                        </div>

                        <div className="pt-2 text-xs font-bold text-[#e31937]">
                          {item.action || 'Learn More'}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ---------------------------------------------------- */}
            {/* SECTION 06: HIGHLIGHTS & VIDEO */}
            {/* ---------------------------------------------------- */}
            {activeTab === 'impact' && (
              <div
                className="p-6 sm:p-10 rounded-xl shadow-lg border border-slate-200 relative overflow-hidden bg-cover bg-center"
                style={{
                  backgroundImage: `linear-gradient(to right, rgba(15, 23, 42, 0.94), rgba(15, 23, 42, 0.7)), url(${impact.bgImage || '/home-page-image/guruji.jpeg'})`
                }}
              >
                <div className="flex justify-end mb-4">
                  <button
                    type="button"
                    onClick={() => handleOpenEdit('Change Impact Background Image', 'impact.bgImage', impact.bgImage, 'image')}
                    className="px-3 py-1.5 rounded-lg bg-black/60 hover:bg-black text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer backdrop-blur-md"
                  >
                    <ImageIcon size={13} />
                    <span>Change Background Photo</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center text-white">
                  {/* Left: Yellow Content Shield */}
                  <div className="bg-[#ffc107] text-slate-900 p-6 sm:p-8 rounded-2xl shadow-xl space-y-4">
                    <div
                      onClick={() => handleOpenEdit('Edit Shield Subtitle', 'impact.subTitle', impact.subTitle, 'text')}
                      className="text-xs font-extrabold uppercase tracking-wider text-slate-800 p-1 -ml-1 rounded border border-dashed border-transparent hover:border-slate-800 cursor-pointer inline-block"
                    >
                      {impact.subTitle || 'Transforming Lives Through Guru Kripa'}
                    </div>

                    <div
                      onClick={() => handleOpenEdit('Edit Shield Title', 'impact.title', impact.title, 'text')}
                      className="p-1 -ml-1 rounded border border-dashed border-transparent hover:border-slate-800 cursor-pointer"
                    >
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                        {impact.title || 'Sahast Foundation'}
                      </h3>
                    </div>

                    <div
                      onClick={() => handleOpenEdit('Edit Shield Description', 'impact.description', impact.description, 'textarea')}
                      className="p-1 -ml-1 rounded border border-dashed border-transparent hover:border-slate-800 cursor-pointer text-xs sm:text-sm text-slate-800 leading-relaxed"
                    >
                      {impact.description}
                    </div>

                    {/* 3 Counters */}
                    <div className="grid grid-cols-3 gap-3 pt-3 border-t border-slate-900/10">
                      <div
                        onClick={() => handleOpenEdit('Edit Stat 1 (Children)', 'impact.stat1Count', impact.stat1Count, 'text')}
                        className="cursor-pointer hover:bg-white/30 p-1.5 rounded-lg"
                      >
                        <div className="text-lg font-black text-[#e31937]">{impact.stat1Count || '25,000+'}</div>
                        <div className="text-[10px] font-bold text-slate-800 leading-tight">{impact.stat1Label || 'Children Educated'}</div>
                      </div>

                      <div
                        onClick={() => handleOpenEdit('Edit Stat 2 (Food)', 'impact.stat2Count', impact.stat2Count, 'text')}
                        className="cursor-pointer hover:bg-white/30 p-1.5 rounded-lg"
                      >
                        <div className="text-lg font-black text-[#e31937]">{impact.stat2Count || '15,000+'}</div>
                        <div className="text-[10px] font-bold text-slate-800 leading-tight">{impact.stat2Label || 'Food & Essentials'}</div>
                      </div>

                      <div
                        onClick={() => handleOpenEdit('Edit Stat 3 (Transformed)', 'impact.stat3Count', impact.stat3Count, 'text')}
                        className="cursor-pointer hover:bg-white/30 p-1.5 rounded-lg"
                      >
                        <div className="text-lg font-black text-[#e31937]">{impact.stat3Count || '5,000+'}</div>
                        <div className="text-[10px] font-bold text-slate-800 leading-tight">{impact.stat3Label || 'Transformed'}</div>
                      </div>
                    </div>

                    {/* Video URL */}
                    <div
                      onClick={() => handleOpenEdit('Edit YouTube Video URL', 'impact.videoUrl', impact.videoUrl, 'text')}
                      className="pt-2 flex items-center gap-2 text-xs font-bold text-slate-900 cursor-pointer hover:underline"
                    >
                      <Play size={16} className="text-[#e31937] fill-current" />
                      <span>Video URL: {impact.videoUrl}</span>
                      <Edit2 size={12} className="opacity-70 ml-auto" />
                    </div>
                  </div>

                  {/* Right Quote */}
                  <div className="space-y-4">
                    <div
                      onClick={() => handleOpenEdit('Edit Quote Subtitle', 'impact.quoteSubTitle', impact.quoteSubTitle, 'text')}
                      className="text-xs font-bold text-amber-300 uppercase tracking-wider p-1 rounded border border-dashed border-transparent hover:border-amber-400 cursor-pointer inline-block"
                    >
                      {impact.quoteSubTitle || 'Live With Dignity'}
                    </div>

                    <div
                      onClick={() => handleOpenEdit('Edit Quote Heading', 'impact.quoteTitle', impact.quoteTitle, 'textarea')}
                      className="p-2 -ml-2 rounded-xl border border-dashed border-transparent hover:border-sky-400 cursor-pointer"
                    >
                      <h4 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                        {impact.quoteTitle || 'Every day, we help families move towards a better, self-reliant future'}
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ---------------------------------------------------- */}
            {/* SECTION 07: GURUKUL CAMPUS */}
            {/* ---------------------------------------------------- */}
            {activeTab === 'gurukul' && (
              <div className="p-6 sm:p-10 bg-white rounded-xl shadow-md border border-slate-200 space-y-6">
                <div className="text-center max-w-xl mx-auto space-y-2">
                  <div
                    onClick={() => handleOpenEdit('Edit Campus Badge', 'gurukulCampus.badge', gurukulCampus.badge, 'text')}
                    className="text-xs font-bold text-[#e31937] uppercase tracking-wider p-1 rounded border border-dashed border-transparent hover:border-red-400 cursor-pointer inline-block"
                  >
                    {gurukulCampus.badge || 'Our Spiritual Campus'}
                  </div>
                  <div
                    onClick={() => handleOpenEdit('Edit Campus Heading', 'gurukulCampus.heading', gurukulCampus.heading, 'text')}
                    className="p-1 rounded border border-dashed border-transparent hover:border-sky-400 cursor-pointer"
                  >
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                      {gurukulCampus.heading || 'Have a Look at Our Gurukul'}
                    </h2>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {(gurukulCampus.items || []).map((card, idx) => (
                    <div
                      key={card.id || idx}
                      className="bg-slate-50 border border-slate-200 rounded-xl overflow-hidden group shadow-2xs"
                    >
                      <div
                        onClick={() =>
                          handleOpenEdit(`Edit Campus ${idx + 1} Image`, `gurukulCampus.items.${idx}.image`, card.image, 'image')
                        }
                        className="relative h-28 bg-slate-200 cursor-pointer overflow-hidden"
                      >
                        <img
                          src={card.image}
                          alt={card.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white text-[11px] font-bold">
                          <ImageIcon size={13} className="mr-1" /> Replace
                        </div>
                      </div>
                      <div className="p-2.5">
                        <div
                          onClick={() =>
                            handleOpenEdit(`Edit Campus ${idx + 1} Title`, `gurukulCampus.items.${idx}.title`, card.title, 'text')
                          }
                          className="font-bold text-xs text-slate-900 p-1 -ml-1 rounded border border-dashed border-transparent hover:border-sky-400 cursor-pointer"
                        >
                          {card.title}
                        </div>
                        {card.desc && (
                          <div
                            onClick={() =>
                              handleOpenEdit(`Edit Campus ${idx + 1} Subtext`, `gurukulCampus.items.${idx}.desc`, card.desc, 'text')
                            }
                            className="text-[10px] text-slate-500 p-1 -ml-1 rounded border border-dashed border-transparent hover:border-sky-400 cursor-pointer"
                          >
                            {card.desc}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ---------------------------------------------------- */}
            {/* SECTION 08: HOW WE WORK */}
            {/* ---------------------------------------------------- */}
            {activeTab === 'how-we-work' && (
              <div className="p-6 sm:p-10 bg-[#f8f8f8] rounded-xl shadow-md border border-slate-200 space-y-6">
                <div className="text-center max-w-xl mx-auto space-y-2">
                  <div
                    onClick={() =>
                      handleOpenEdit('Edit Work Heading', 'howWeWork.headingHighlight', howWeWork.headingHighlight, 'text')
                    }
                    className="p-1 rounded border border-dashed border-transparent hover:border-sky-400 cursor-pointer"
                  >
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                      {howWeWork.headingPrefix || 'How '}{' '}
                      <span className="text-amber-600">{howWeWork.headingHighlight || 'We Work?'}</span>
                    </h2>
                  </div>
                  <div
                    onClick={() => handleOpenEdit('Edit Work Subtitle', 'howWeWork.subheading', howWeWork.subheading, 'text')}
                    className="p-1 rounded border border-dashed border-transparent hover:border-sky-400 cursor-pointer text-xs sm:text-sm text-slate-500"
                  >
                    {howWeWork.subheading}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
                  {(howWeWork.steps || []).map((step, idx) => (
                    <div
                      key={step.id || idx}
                      className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs flex gap-4 items-start"
                    >
                      <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-sm shrink-0">
                        {idx + 1}
                      </div>
                      <div className="space-y-1 flex-1">
                        <div
                          onClick={() =>
                            handleOpenEdit(`Edit Step ${idx + 1} Title`, `howWeWork.steps.${idx}.title`, step.title, 'text')
                          }
                          className="font-bold text-xs sm:text-sm text-slate-900 p-1 -ml-1 rounded border border-dashed border-transparent hover:border-sky-400 cursor-pointer"
                        >
                          {step.title}
                        </div>
                        <div
                          onClick={() =>
                            handleOpenEdit(`Edit Step ${idx + 1} Description`, `howWeWork.steps.${idx}.description`, step.description, 'textarea')
                          }
                          className="text-xs text-slate-600 leading-relaxed p-1 -ml-1 rounded border border-dashed border-transparent hover:border-sky-400 cursor-pointer"
                        >
                          {step.description}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ---------------------------------------------------- */}
            {/* SECTION 09: LATEST BLOGS */}
            {/* ---------------------------------------------------- */}
            {activeTab === 'blogs' && (
              <div className="p-6 sm:p-10 bg-white rounded-xl shadow-md border border-slate-200 space-y-6">
                <div className="text-center max-w-xl mx-auto space-y-2">
                  <div
                    onClick={() => handleOpenEdit('Edit Blogs Badge', 'latestBlogs.badge', latestBlogs.badge, 'text')}
                    className="text-xs font-bold text-amber-600 uppercase tracking-wider p-1 rounded border border-dashed border-transparent hover:border-amber-400 cursor-pointer inline-block"
                  >
                    {latestBlogs.badge || 'ARTICLES & PRAVACHAN'}
                  </div>
                  <div
                    onClick={() => handleOpenEdit('Edit Blogs Heading', 'latestBlogs.heading', latestBlogs.heading, 'text')}
                    className="p-1 rounded border border-dashed border-transparent hover:border-sky-400 cursor-pointer"
                  >
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                      {latestBlogs.heading || 'Our Latest Blogs'}
                    </h2>
                  </div>
                  <div
                    onClick={() => handleOpenEdit('Edit Blogs Subtitle', 'latestBlogs.subheading', latestBlogs.subheading, 'text')}
                    className="p-1 rounded border border-dashed border-transparent hover:border-sky-400 cursor-pointer text-xs sm:text-sm text-slate-500"
                  >
                    {latestBlogs.subheading}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {(latestBlogs.blogs || []).map((blog, idx) => (
                    <div
                      key={blog.id || idx}
                      className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs flex flex-col justify-between"
                    >
                      <div
                        onClick={() =>
                          handleOpenEdit(`Edit Blog ${idx + 1} Image`, `latestBlogs.blogs.${idx}.image`, blog.image, 'image')
                        }
                        className="group relative h-40 bg-slate-100 cursor-pointer overflow-hidden"
                      >
                        <img
                          src={blog.image}
                          alt={blog.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white text-xs font-bold">
                          <ImageIcon size={14} className="mr-1" /> Change Cover
                        </div>
                      </div>

                      <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="text-[10px] font-bold text-amber-600 uppercase">{blog.badge || 'Spiritual'}</div>
                          <div
                            onClick={() =>
                              handleOpenEdit(`Edit Blog ${idx + 1} Title`, `latestBlogs.blogs.${idx}.title`, blog.title, 'text')
                            }
                            className="font-bold text-xs text-slate-900 p-1 -ml-1 rounded border border-dashed border-transparent hover:border-sky-400 cursor-pointer mt-1"
                          >
                            {blog.title}
                          </div>
                          <div
                            onClick={() =>
                              handleOpenEdit(`Edit Blog ${idx + 1} Excerpt`, `latestBlogs.blogs.${idx}.excerpt`, blog.excerpt, 'textarea')
                            }
                            className="text-[11px] text-slate-600 line-clamp-3 p-1 -ml-1 rounded border border-dashed border-transparent hover:border-sky-400 cursor-pointer mt-1"
                          >
                            {blog.excerpt}
                          </div>
                        </div>

                        <div className="pt-2 text-xs font-bold text-[#e31937] flex items-center gap-1">
                          <span>Read Full Story</span>
                          <ArrowRight size={13} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ---------------------------------------------------- */}
            {/* SECTION 10: CONTACT US */}
            {/* ---------------------------------------------------- */}
            {activeTab === 'contact' && (
              <div className="p-6 sm:p-10 bg-[#faf8f4] rounded-xl shadow-md border border-slate-200 space-y-6">
                <div className="text-center max-w-xl mx-auto space-y-2">
                  <div
                    onClick={() => handleOpenEdit('Edit Contact Badge', 'contactSection.badge', contact.badge, 'text')}
                    className="text-xs font-bold text-amber-600 uppercase tracking-wider p-1 rounded border border-dashed border-transparent hover:border-amber-400 cursor-pointer inline-block"
                  >
                    {contact.badge || 'GET IN TOUCH'}
                  </div>
                  <div
                    onClick={() => handleOpenEdit('Edit Contact Heading', 'contactSection.heading', contact.heading, 'text')}
                    className="p-1 rounded border border-dashed border-transparent hover:border-sky-400 cursor-pointer"
                  >
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                      {contact.heading || 'Contact Sahast Foundation'}
                    </h2>
                  </div>
                  <div
                    onClick={() => handleOpenEdit('Edit Contact Subtitle', 'contactSection.subheading', contact.subheading, 'text')}
                    className="p-1 rounded border border-dashed border-transparent hover:border-sky-400 cursor-pointer text-xs sm:text-sm text-slate-500"
                  >
                    {contact.subheading}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Address */}
                  <div
                    onClick={() => handleOpenEdit('Edit Dham Address', 'contactSection.address', contact.address, 'textarea')}
                    className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-2 cursor-pointer hover:border-sky-400 transition-colors"
                  >
                    <div className="w-9 h-9 rounded-lg bg-red-50 text-[#e31937] flex items-center justify-center">
                      <MapPin size={18} />
                    </div>
                    <div className="font-bold text-xs text-slate-900">
                      {contact.addressTitle || 'Dham Address'} <Edit2 size={11} className="inline ml-1 opacity-60" />
                    </div>
                    <div className="text-xs text-slate-600 leading-relaxed">
                      {contact.address}
                    </div>
                  </div>

                  {/* Phone */}
                  <div
                    onClick={() => handleOpenEdit('Edit Phone Number', 'contactSection.phone', contact.phone, 'text')}
                    className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-2 cursor-pointer hover:border-sky-400 transition-colors"
                  >
                    <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                      <Phone size={18} />
                    </div>
                    <div className="font-bold text-xs text-slate-900">
                      {contact.phoneTitle || 'Phone / WhatsApp'} <Edit2 size={11} className="inline ml-1 opacity-60" />
                    </div>
                    <div className="text-xs text-slate-600 font-semibold">
                      {contact.phone}
                    </div>
                  </div>

                  {/* Email */}
                  <div
                    onClick={() => handleOpenEdit('Edit Email Address', 'contactSection.email', contact.email, 'text')}
                    className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-2 cursor-pointer hover:border-sky-400 transition-colors"
                  >
                    <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                      <Mail size={18} />
                    </div>
                    <div className="font-bold text-xs text-slate-900">
                      {contact.emailTitle || 'Email Address'} <Edit2 size={11} className="inline ml-1 opacity-60" />
                    </div>
                    <div className="text-xs text-slate-600 font-semibold">
                      {contact.email}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ---------------------------------------------------- */}
            {/* SECTION 11: FOOTER & NEWSLETTER */}
            {/* ---------------------------------------------------- */}
            {activeTab === 'footer' && (
              <div className="bg-[#07122b] text-slate-300 rounded-xl shadow-lg border border-slate-800 overflow-hidden">
                {/* Newsletter Box */}
                <div className="p-6 sm:p-10 border-b border-slate-800 text-center space-y-4">
                  <div
                    onClick={() => handleOpenEdit('Edit Newsletter Headline', 'footer.newsletterHeading', footer.newsletterHeading, 'text')}
                    className="p-1 rounded border border-dashed border-transparent hover:border-amber-400 cursor-pointer inline-block"
                  >
                    <h3 className="text-xl sm:text-2xl font-bold text-white">
                      {footer.newsletterHeading || 'Get Our Newsletter'}
                    </h3>
                  </div>

                  <div className="max-w-md mx-auto flex items-center bg-[#07122b] border border-slate-700 rounded-full p-1 pl-4">
                    <Mail size={16} className="text-slate-400 shrink-0" />
                    <span className="mx-2 text-slate-600">|</span>
                    <span className="text-xs text-slate-500 italic flex-1 text-left">
                      Enter your email address here
                    </span>
                    <span className="px-4 py-2 bg-amber-400 text-slate-900 rounded-full font-bold text-xs">
                      Submit Now
                    </span>
                  </div>
                </div>

                {/* Footer Columns Preview */}
                <div className="p-6 sm:p-10 grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
                  {/* Mission */}
                  <div className="space-y-2">
                    <div className="text-sm font-bold text-white">सहस्त फाउंडेशन</div>
                    <div
                      onClick={() => handleOpenEdit('Edit Footer Mission Description', 'footer.aboutText', footer.aboutText, 'textarea')}
                      className="p-1 -ml-1 rounded border border-dashed border-transparent hover:border-sky-400 cursor-pointer text-slate-400 leading-relaxed"
                    >
                      {footer.aboutText}
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="space-y-2">
                    <div className="text-sm font-bold text-white">Contact Info</div>
                    <div
                      onClick={() => handleOpenEdit('Edit Footer Email', 'footer.email', footer.email, 'text')}
                      className="cursor-pointer hover:text-white"
                    >
                      <span className="text-red-400 font-bold">Email: </span>
                      <span>{footer.email}</span>
                    </div>
                    <div
                      onClick={() => handleOpenEdit('Edit Footer Phone', 'footer.phone', footer.phone, 'text')}
                      className="cursor-pointer hover:text-white"
                    >
                      <span className="text-red-400 font-bold">Phone: </span>
                      <span>{footer.phone}</span>
                    </div>
                    <div
                      onClick={() => handleOpenEdit('Edit Footer Address', 'footer.address', footer.address, 'textarea')}
                      className="cursor-pointer hover:text-white"
                    >
                      <span className="text-red-400 font-bold">Map: </span>
                      <span>{footer.address}</span>
                    </div>
                  </div>

                  {/* Quick links summary */}
                  <div className="space-y-2">
                    <div className="text-sm font-bold text-white">Navigation</div>
                    <div className="text-slate-400 space-y-1">
                      <div>&bull; About Guruji</div>
                      <div>&bull; Darshan Gallery</div>
                      <div>&bull; Events &amp; Kathas</div>
                      <div>&bull; Contact Us</div>
                    </div>
                  </div>
                </div>

                {/* Golden Strip */}
                <div
                  onClick={() => handleOpenEdit('Edit Copyright Bar', 'footer.copyrightText', footer.copyrightText, 'text')}
                  className="bg-[#fabc3f] text-[#07122b] py-3 px-6 text-center text-xs font-bold cursor-pointer hover:bg-amber-400 transition-colors"
                >
                  {footer.copyrightText || 'Copyright © 2026, Sahast Foundation All Rights Reserved.'}
                  <Edit2 size={11} className="inline ml-1 opacity-70" />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Collapsible Accordion: All Form Fields for Active Section */}
        <div className="border-t border-slate-200">
          <button
            type="button"
            onClick={() => setIsAccordionOpen(!isAccordionOpen)}
            className="w-full px-5 py-3.5 flex items-center justify-between text-xs font-bold text-slate-700 bg-slate-50/70 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <span>
              All Form Fields for {SECTION_TABS.find((t) => t.id === activeTab)?.label}
            </span>
            <div className="flex items-center gap-1 text-slate-500">
              <span className="text-[11px] font-normal">
                {isAccordionOpen ? 'Hide form fields' : 'Show full field inputs'}
              </span>
              {isAccordionOpen ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
            </div>
          </button>

          {isAccordionOpen && (
            <div className="p-6 bg-white space-y-4 border-t border-slate-100 text-xs">
              {activeTab === 'hero' && (
                <div className="space-y-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Slide Badge</label>
                    <input
                      type="text"
                      value={currentSlide.badge || ''}
                      onChange={(e) => updateField(`hero.slides.${activeSlideIndex}.badge`, e.target.value)}
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Slide Title</label>
                    <input
                      type="text"
                      value={currentSlide.title || ''}
                      onChange={(e) => updateField(`hero.slides.${activeSlideIndex}.title`, e.target.value)}
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Slide Description</label>
                    <textarea
                      rows={3}
                      value={currentSlide.description || ''}
                      onChange={(e) => updateField(`hero.slides.${activeSlideIndex}.description`, e.target.value)}
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Button Text</label>
                      <input
                        type="text"
                        value={currentSlide.buttonText || ''}
                        onChange={(e) => updateField(`hero.slides.${activeSlideIndex}.buttonText`, e.target.value)}
                        className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Background Image URL</label>
                      <input
                        type="text"
                        value={currentSlide.imageUrl || ''}
                        onChange={(e) => updateField(`hero.slides.${activeSlideIndex}.imageUrl`, e.target.value)}
                        className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'about' && (
                <div className="space-y-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">About Badge</label>
                    <input
                      type="text"
                      value={about.badge || ''}
                      onChange={(e) => updateField('about.badge', e.target.value)}
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Heading</label>
                    <input
                      type="text"
                      value={about.heading || ''}
                      onChange={(e) => updateField('about.heading', e.target.value)}
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Description</label>
                    <textarea
                      rows={3}
                      value={about.description || ''}
                      onChange={(e) => updateField('about.description', e.target.value)}
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Artwork Image URL</label>
                    <input
                      type="text"
                      value={about.artworkImage || ''}
                      onChange={(e) => updateField('about.artworkImage', e.target.value)}
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                    />
                  </div>
                </div>
              )}

              {activeTab === 'commitment' && (
                <div className="space-y-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Heading</label>
                    <input
                      type="text"
                      value={commitment.heading || ''}
                      onChange={(e) => updateField('commitment.heading', e.target.value)}
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Description</label>
                    <textarea
                      rows={3}
                      value={commitment.description || ''}
                      onChange={(e) => updateField('commitment.description', e.target.value)}
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Stat Number</label>
                      <input
                        type="text"
                        value={commitment.statNumber || ''}
                        onChange={(e) => updateField('commitment.statNumber', e.target.value)}
                        className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Stat Label</label>
                      <input
                        type="text"
                        value={commitment.statLabel || ''}
                        onChange={(e) => updateField('commitment.statLabel', e.target.value)}
                        className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'contact' && (
                <div className="space-y-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Dham Address</label>
                    <input
                      type="text"
                      value={contact.address || ''}
                      onChange={(e) => updateField('contactSection.address', e.target.value)}
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Phone</label>
                      <input
                        type="text"
                        value={contact.phone || ''}
                        onChange={(e) => updateField('contactSection.phone', e.target.value)}
                        className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Email</label>
                      <input
                        type="text"
                        value={contact.email || ''}
                        onChange={(e) => updateField('contactSection.email', e.target.value)}
                        className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'footer' && (
                <div className="space-y-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Newsletter Heading</label>
                    <input
                      type="text"
                      value={footer.newsletterHeading || ''}
                      onChange={(e) => updateField('footer.newsletterHeading', e.target.value)}
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Mission About Text</label>
                    <textarea
                      rows={2}
                      value={footer.aboutText || ''}
                      onChange={(e) => updateField('footer.aboutText', e.target.value)}
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Copyright Note</label>
                    <input
                      type="text"
                      value={footer.copyrightText || ''}
                      onChange={(e) => updateField('footer.copyrightText', e.target.value)}
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                    />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Bottom Sticky Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 py-3.5 px-6 shadow-2xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <Check size={18} className="stroke-[2.5]" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900">{lastSavedMessage}</div>
            <div className="text-[11px] text-slate-500">{subStatusMessage}</div>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => {
              if (window.confirm('Discard unsaved draft changes and reload current saved data?')) {
                setFormData(homepageData || {});
              }
            }}
            className="px-3.5 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <RotateCcw size={13} />
            <span>Discard Changes</span>
          </button>

          {onViewLiveSite && (
            <button
              type="button"
              onClick={onViewLiveSite}
              className={`px-4 py-2.5 text-xs font-bold rounded-xl border transition-all flex items-center gap-1.5 cursor-pointer shadow-xs ${
                publishSuccess
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-600 animate-pulse'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
              }`}
              title="Open the live main home page to see your published changes"
            >
              <ExternalLink size={13} />
              <span>{publishSuccess ? 'View on Main Home Page ↗' : 'View Home Page'}</span>
            </button>
          )}

          <button
            type="button"
            onClick={handlePublish}
            disabled={isSaving}
            className="px-5 py-2.5 bg-[#e31937] hover:bg-red-700 disabled:opacity-50 text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer hover:scale-[1.02]"
          >
            {isSaving ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Publishing to Firestore...</span>
              </>
            ) : publishSuccess ? (
              <>
                <CheckCircle2 size={15} />
                <span>Published Live!</span>
              </>
            ) : (
              <>
                <CloudUpload size={15} />
                <span>Publish Changes Live</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Quick Edit Modal */}
      {editModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div>
                <h3 className="text-sm font-bold text-slate-900">{editModal.title}</h3>
                <span className="text-[10px] text-slate-400 font-mono">{editModal.fieldPath}</span>
              </div>
              <button
                type="button"
                onClick={() => setEditModal({ isOpen: false, title: '', value: '', fieldPath: '', type: 'text' })}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            <div className="space-y-3">
              {editModal.type === 'textarea' ? (
                <textarea
                  rows={4}
                  value={editModal.value}
                  onChange={(e) => setEditModal({ ...editModal, value: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-sky-500 font-sans"
                  autoFocus
                />
              ) : editModal.type === 'image' ? (
                <div className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Image URL (Paste direct URL or select file below)
                    </label>
                    <input
                      type="text"
                      value={editModal.value}
                      onChange={(e) => setEditModal({ ...editModal, value: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-sky-500 font-sans"
                      autoFocus
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Upload from Computer
                    </label>
                    <label className="w-full p-3 border-2 border-dashed border-slate-200 hover:border-sky-400 rounded-xl text-center flex flex-col items-center justify-center gap-1 cursor-pointer bg-slate-50 hover:bg-sky-50/50 transition-colors">
                      <Upload size={18} className="text-slate-400" />
                      <span className="text-xs font-semibold text-slate-700">Choose file</span>
                      <span className="text-[10px] text-slate-400">PNG, JPG, WEBP up to 10MB</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleModalImageUpload}
                      />
                    </label>
                  </div>

                  {galleryList && galleryList.length > 0 && (
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        Or Pick from Existing Media
                      </label>
                      <div className="flex gap-2 overflow-x-auto py-1">
                        {galleryList.slice(0, 6).map((img, idx) => (
                          <img
                            key={idx}
                            src={img.url}
                            alt={img.title || 'photo'}
                            onClick={() => setEditModal({ ...editModal, value: img.url })}
                            className="w-14 h-14 object-cover rounded-lg border border-slate-200 cursor-pointer hover:border-sky-500 shrink-0"
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {editModal.value && (
                    <div className="pt-1">
                      <div className="text-[10px] text-slate-400 font-bold uppercase mb-1">Live Preview</div>
                      <img
                        src={editModal.value}
                        alt="Preview"
                        className="w-full h-32 object-cover rounded-xl border border-slate-200"
                      />
                    </div>
                  )}
                </div>
              ) : (
                <input
                  type="text"
                  value={editModal.value}
                  onChange={(e) => setEditModal({ ...editModal, value: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-sky-500 font-sans"
                  autoFocus
                />
              )}
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setEditModal({ isOpen: false, title: '', value: '', fieldPath: '', type: 'text' })}
                className="px-3.5 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveModal}
                className="px-4 py-1.5 bg-[#e31937] hover:bg-red-700 text-white text-xs font-semibold rounded-xl shadow-xs cursor-pointer"
              >
                Apply Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
