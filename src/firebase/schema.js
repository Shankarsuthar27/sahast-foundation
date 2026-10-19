/**
 * Official Firestore Database Schema & Initial Seed Data
 * Portal: Shree Abhay Das Ji Maharaj (shreeabhaydas.com)
 * 
 * Collections & Documents:
 * 1. Collection: cms -> Document: homepage
 *    (header, hero slides, about, kathas, campaigns, ticker, galleryPreview, videos, contactAndFooter)
 * 2. Collection: news -> Documents: auto-id
 *    (title, slug, category, excerpt, content, featuredImage, secondaryImages, status, author, publishedAt, createdAt)
 * 3. Collection: events -> Documents: auto-id
 *    (title, slug, startDate, endDate, timing, venue, location, googleMapsUrl, organizerContact, liveStreamUrl, status, createdAt)
 * 4. Collection: gallery -> Documents: auto-id
 *    (title, url, category, createdAt, featured)
 */

export const HOMEPAGE_DEFAULT_SEED = {
  header: {
    logo: '/home-page-image/sahast-foundation-logo.png',
    siteName: 'Shree Abhay Das Ji Maharaj',
    tagline: 'Official Spiritual Portal & Humanitarian Seva Mission',
    contactPhone: '+91 8696298489',
    contactEmail: 'info@shreeabhaydas.com',
    actionButtonText: 'Donate Now',
    actionButtonLink: '#donate',
    menuItems: [
      { id: 'm1', label: 'Home', href: '/' },
      { id: 'm2', label: 'About Guruji', href: '/about' },
      { id: 'm3', label: 'Spiritual Events', href: '/event' },
      { id: 'm4', label: 'Darshan Gallery', href: '/gallery' },
      { id: 'm5', label: 'Satsang & Seva', href: '/the-power-of-seva' },
      { id: 'm6', label: 'Contact Us', href: '/contact' }
    ]
  },

  hero: {
    slides: [
      {
        id: 'hero-1',
        badge: 'DIVINE BLESSINGS & SEVA',
        title: 'Transforming Lives Through Spiritual Wisdom & Compassion',
        description: 'Guided by Pujya Swami Shri Abhay Das Ji Maharaj, dedicated to uplifting tribal communities through Vedic Gurukul education, Gau Seva, and sacred humanitarian efforts.',
        imageUrl: '/home-page-image/guruji-1.jpeg',
        primaryCtaText: 'Donate for Seva',
        primaryCtaLink: '#donate',
        secondaryCtaText: 'Join as Volunteer',
        secondaryCtaLink: '#volunteer',
        videoUrl: 'https://www.youtube.com/watch?v=kW-T1J5QFdY',
        image1: '/home-page-image/WhatsApp-Image-2026-05-26-at-21.23.40-e1779954909287.jpeg',
        image2: '/home-page-image/WhatsApp-Image-2026-05-26-at-21.23.523-e1779814853502.jpeg',
        image3: '/home-page-image/WhatsApp-Image-2026-05-26-at-21.23.3866-e1779814834826.jpeg',
        buttonText: 'Donate Now',
        buttonSubtext: 'Donate Now'
      },
      {
        id: 'hero-2',
        badge: 'SHRIMAD BHAGWAT KATHA',
        title: 'Awakening Devotion Through Divine Katha Discourses',
        description: 'Immerse in timeless nectar of Shrimad Bhagwat and Ram Katha expounded by Pujya Maharaj Ji across sacred pilgrimage sites.',
        imageUrl: '/home-page-image/WhatsApp-Image-2026-05-28-at-13.31.06-e1779955352658.jpeg',
        primaryCtaText: 'View Katha Schedule',
        primaryCtaLink: '/event',
        secondaryCtaText: 'Watch Pravachan',
        secondaryCtaLink: 'https://youtube.com/@shreeabhaydas',
        videoUrl: 'https://www.youtube.com/watch?v=kW-T1J5QFdY',
        image1: '/home-page-image/WhatsApp-Image-2026-05-26-at-21.23.40-e1779954909287.jpeg',
        image2: '/home-page-image/WhatsApp-Image-2026-05-26-at-21.23.523-e1779814853502.jpeg',
        image3: '/home-page-image/WhatsApp-Image-2026-05-26-at-21.23.3866-e1779814834826.jpeg',
        buttonText: 'Donate Now',
        buttonSubtext: 'Donate Now'
      },
      {
        id: 'hero-3',
        badge: 'GAU SEVA & GURUKUL',
        title: 'Nurturing Indigenous Desi Cows & Vedic Gurukul Students',
        description: 'Empowering marginalized tribal children with character, morals, and contemporary education while providing shelter and care to sacred Gau Mata.',
        imageUrl: '/home-page-image/gurukul.png',
        primaryCtaText: 'Support Gurukul',
        primaryCtaLink: '#donate',
        secondaryCtaText: 'Darshan Gallery',
        secondaryCtaLink: '/gallery',
        videoUrl: 'https://www.youtube.com/watch?v=kW-T1J5QFdY',
        image1: '/home-page-image/WhatsApp-Image-2026-05-26-at-21.23.40-e1779954909287.jpeg',
        image2: '/home-page-image/WhatsApp-Image-2026-05-26-at-21.23.523-e1779814853502.jpeg',
        image3: '/home-page-image/WhatsApp-Image-2026-05-26-at-21.23.3866-e1779814834826.jpeg',
        buttonText: 'Donate Now',
        buttonSubtext: 'Donate Now'
      }
    ]
  },

  about: {
    badge: 'ABOUT SAHAST FOUNDATION',
    heading: 'Spiritual Enlightenment, Compassion & Seva',
    description: 'Pujya Swami Shri Abhay Das Ji Maharaj has dedicated his life to awakening Sanatan values, guiding thousands toward peace, righteous living, and selfless service. Through Shri Guru Puram Ashram at Takhatgarh, Rajasthan, numerous humanitarian initiatives flourish daily.',
    quote: 'The true essence of devotion is not confined to rituals, but manifests through love, kindness, and compassionate service to every suffering living being.',
    quoteAuthor: 'Pujya Swami Shri Abhay Das Ji Maharaj',
    artworkImage: '/home-page-image/ChatGPT-Image-May-29-2026-01_49_49-PM-1.png',
    sideImage: '/home-page-image/ChatGPT-Image-May-29-2026-01_49_49-PM-1.png',
    floatingImage: '/home-page-image/guruji.jpeg',
    videoModalUrl: 'https://www.youtube.com/watch?v=kW-T1J5QFdY',
    points: [
      'Nishkam Seva: 100% direct-to-beneficiary execution',
      'Free CBSE-accredited Gurukul schooling for 500+ tribal students',
      'Modern Gaushala sheltering 1,200+ desi cows',
      'Daily Annakshetra providing nutritious sanctified meals to hundreds'
    ]
  },

  pillars: [
    {
      id: 1,
      image: '/home-page-image/WhatsApp-Image-2026-05-26-at-21.23.3866-e1779814834826.jpeg',
      fallbackImage: '/home-page-image/WhatsApp-Image-2026-05-26-at-21.23.395-e1779955852314.jpeg',
      title: 'Annakshetra Seva',
      description: 'Serving wholesome, freshly-prepared satvik meals daily to hundreds of sadhus, pilgrims, and impoverished families.',
      action: 'Support Annadan'
    },
    {
      id: 2,
      image: '/home-page-image/WhatsApp-Image-2026-05-26-at-21.23.40-e1779954909287.jpeg',
      fallbackImage: '/home-page-image/WhatsApp-Image-2026-05-26-at-21.23.523-e1779814853502.jpeg',
      title: 'Mission & Values',
      description: 'Preserving Sanatan moral principles and spiritual traditions to awaken compassion, character, and harmony in every household.',
      action: 'Learn Our Values'
    },
    {
      id: 3,
      image: '/home-page-image/WhatsApp-Image-2026-05-28-at-13.35.48-e1779956288882.jpeg',
      fallbackImage: '/home-page-image/WhatsApp-Image-2026-05-26-at-21.24.2745-1-e1779955723374.jpeg',
      title: 'Child Education & Care',
      description: 'Sponsoring comprehensive Gurukul residential education, books, nutrition, and sanskars for 500+ rural and tribal youth.',
      action: 'Sponsor a Student'
    }
  ],

  commitment: {
    badge: 'A SACRED COMMITMENT',
    heading: 'We Are Committed to Transforming Thousands of Lives Through Education, Seva & Spiritual Guidance',
    description: 'Under the divine vision and leadership of Pujya Swami Shri Abhay Das Ji Maharaj, Sahast Foundation serves as a beacon of hope for remote tribal belts and underserved rural communities across western Rajasthan. By combining modern education with traditional Vedic wisdom, providing healthcare, nourishing the hungry, and championing cow welfare, we strive to build a more enlightened and compassionate world.',
    image: '/home-page-image/guruji-1.jpeg',
    statNumber: '1,00,000+',
    statLabel: 'Lives Positively Impacted',
    buttonText: 'Donate for Seva',
    guruName: 'Pujya Swami Shri Abhaydas Ji',
    guruTitle: '5th Acharya, Sadguru Trikam Das Ji Dham'
  },

  priorities: {
    badge: 'KEY INITIATIVES',
    heading: 'Our Priorities',
    subheading: 'Making lasting change through holistic support, education, and compassion.',
    items: [
      {
        id: 1,
        image: '/home-page-image/WhatsApp-Image-2026-05-28-at-16.38.59sss.jpeg',
        fallback: '/home-page-image/WhatsApp-Image-2026-05-26-at-21.23.395-e1779955852314.jpeg',
        title: 'Free Food / Annadaan',
        description: 'Distributing thousands of hot, nutritious meals every month to pilgrims, sadhus, and families facing food insecurity.',
        action: 'Learn More'
      },
      {
        id: 2,
        image: '/home-page-image/WhatsApp-Image-2026-05-28-at-16.39.00ds.jpeg',
        fallback: '/home-page-image/WhatsApp-Image-2026-05-26-at-21.23.400-e1779955447139.jpeg',
        title: 'Tribal Education',
        description: 'Empowering children from remote tribal belts with free residential schooling, books, computers, and moral character building.',
        action: 'Learn More'
      },
      {
        id: 3,
        image: '/home-page-image/WhatsApp-Image-2026-05-28-at-16.39.02ad.jpeg',
        fallback: '/home-page-image/WhatsApp-Image-2026-05-28-at-13.31.06-e1779955352658.jpeg',
        title: 'Relief & Ration Kits',
        description: 'Delivering essential dry rations, clean drinking water, warm blankets, and medical first-aid kits during emergencies.',
        action: 'Learn More'
      },
      {
        id: 4,
        image: '/home-page-image/WhatsApp-Image-2026-05-28-at-16.39.05fsf.jpeg',
        fallback: '/home-page-image/WhatsApp-Image-2026-05-26-at-21.23.523-e1779814853502.jpeg',
        title: 'Spiritual Guidance',
        description: 'Conducting regular Katha pravachans, family harmony discourses, and de-addiction workshops for youth across India.',
        action: 'Learn More'
      }
    ]
  },

  impact: {
    subTitle: 'Transforming Lives Through Guru Kripa',
    title: 'Sahast Foundation',
    description: 'At Sahast Foundation, we uplift lives through education, seva, and spiritual guidance under the blessings of Pujya Shree Abhay Das Maharaj - empowering children, supporting families, and building a value-driven society.',
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
  },

  gurukulCampus: {
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
  },

  howWeWork: {
    headingPrefix: 'How ',
    headingHighlight: 'We Work?',
    subheading: 'A transparent and compassionate 4-step framework ensuring every contribution transforms lives directly.',
    steps: [
      {
        id: 1,
        title: 'Identifying Needs',
        description: 'Grassroots surveys in remote tribal and drought-affected regions to identify families in severe need of food, water, and schooling.',
        iconImg: '/home-page-image/icon1.png'
      },
      {
        id: 2,
        title: 'Planning & Execution',
        description: 'Systematic logistical planning and volunteer coordination to ensure maximum impact with zero administrative overhead waste.',
        iconImg: '/home-page-image/icon2.png'
      },
      {
        id: 3,
        title: 'Transparent Delivery',
        description: 'Direct door-to-door and village-square distribution of cooked prasad, ration bags, school kits, and veterinary care.',
        iconImg: '/home-page-image/icon3.png'
      },
      {
        id: 4,
        title: 'Long-term Impact',
        description: 'Continuous monitoring through residential Gurukul education, monthly medical health camps, and sustainable gaushala ecosystems.',
        iconImg: '/home-page-image/icon4.png'
      }
    ]
  },

  latestBlogs: {
    badge: 'ARTICLES & PRAVACHAN',
    heading: 'Our Latest Blogs',
    subheading: 'Explore spiritual wisdom, educational insights, and service stories.',
    blogs: [
      {
        id: 1,
        image: '/home-page-image/meditation-1-e1780126777484.png',
        badge: 'Spiritual',
        bannerText: 'MEDITATION FOR YOUTH',
        title: 'Meditation and its Impact on Modern Youth',
        date: 'October 2026',
        excerpt: 'Discover how ancient dhyana techniques reduce anxiety, enhance mental clarity, and cultivate purpose in today\'s fast-paced digital world.',
        author: 'Pujya Abhaydas Ji'
      },
      {
        id: 2,
        image: '/home-page-image/gurukul.png',
        badge: 'Education',
        bannerText: 'GURUKUL EDUCATION',
        title: 'Why Gurukul Education is Relevant in Modern India',
        date: 'September 2026',
        excerpt: 'Blending timeless Vedic ethics with contemporary CBSE science prepares grounded youth for compassionate leadership and nation-building.',
        author: 'Dham Vidyalaya'
      },
      {
        id: 3,
        image: '/home-page-image/The-Power-of-Seva-Serving-Humanity-with-Compassion.png',
        badge: 'Social Welfare',
        bannerText: 'SEVA & HUMANITY',
        title: 'How Nishkam Seva Can Transform One\'s Life',
        date: 'August 2026',
        excerpt: 'Giving without expectation is the purest form of devotion, purifying our consciousness and awakening boundless contentment.',
        author: 'Seva Trust'
      }
    ]
  },

  contactSection: {
    badge: 'GET IN TOUCH',
    heading: 'Contact Sahast Foundation',
    subheading: 'Have queries regarding Gurukul admission, Gau Seva sponsorship, or attending spiritual Kathas? Send us an inquiry.',
    addressTitle: 'Dham Address',
    address: 'Shri Bharat Mata Statue Site, Shri Guru Puram Ashram, Takhatgarh, Pali',
    phoneTitle: 'Phone / WhatsApp',
    phone: '+91 8696298489',
    emailTitle: 'Email Address',
    email: 'info@sahastfoundation.in',
    formTitle: 'Send an Online Inquiry'
  },

  footer: {
    newsletterHeading: 'Get Our Newsletter',
    newsletterPlaceholder: 'Enter your email address here',
    logoText: 'सहस्त',
    logoSubtext: 'फाउंडेशन',
    aboutText: 'Sahast Foundation is dedicated to the social, cultural, and spiritual upliftment of humanity through Vedic Gurukul education, Gau Seva, and sacred humanitarian service under the divine guidance of Pujya Swami Shri Abhay Das Ji Maharaj.',
    address: 'Shri Bharat Mata Statue Site, Shri Guru Puram Ashram, Takhatgarh, Pali, Rajasthan, India - 306912',
    phone: '+91 8696298489',
    email: 'info@sahastfoundation.in',
    whatsapp: '+91 8696298489',
    copyrightText: '© 2026 Sahast Foundation. All Rights Reserved.',
    taxExemptText: 'All donations to Sahast Foundation are 100% tax exempt under Section 80G of the Income Tax Act.'
  },

  kathas: [
    {
      id: 'katha-1',
      title: '7-Day Shrimad Bhagwat Mahapuran Gyan Yajna',
      speaker: 'Pujya Swami Shri Abhay Das Ji Maharaj',
      date: 'November 01 - 07, 2026',
      location: 'Sadguru Trikam Das Ji Dham, Takhatgarh, Pali',
      thumbnail: '/home-page-image/WhatsApp-Image-2026-05-28-at-13.31.06-e1779955352658.jpeg',
      listenUrl: 'https://youtube.com/@shreeabhaydas',
      watchUrl: 'https://youtube.com/@shreeabhaydas',
      badge: 'Live Katha'
    },
    {
      id: 'katha-2',
      title: 'Shri Ram Katha Amrit Varsha',
      speaker: 'Pujya Swami Shri Abhay Das Ji Maharaj',
      date: 'December 12 - 20, 2026',
      location: 'Umaid Stadium Ground, Jodhpur, Rajasthan',
      thumbnail: '/home-page-image/WhatsApp-Image-2026-05-26-at-0-e1779814877129.jpeg',
      listenUrl: 'https://youtube.com/@shreeabhaydas',
      watchUrl: 'https://youtube.com/@shreeabhaydas',
      badge: 'Upcoming Yatra'
    },
    {
      id: 'katha-3',
      title: 'Nani Bai Ro Mayro & Bhakti Satsang',
      speaker: 'Pujya Swami Shri Abhay Das Ji Maharaj',
      date: 'January 14 - 16, 2027',
      location: 'Pushkar Tirth Kshetra, Ajmer, Rajasthan',
      thumbnail: '/home-page-image/meditation-1-e1780126777484.png',
      listenUrl: 'https://youtube.com/@shreeabhaydas',
      watchUrl: 'https://youtube.com/@shreeabhaydas',
      badge: 'Bhakti Yajna'
    }
  ],

  campaigns: [
    {
      id: 'camp-1',
      title: 'Vedic Gurukul Education for Tribal Children',
      description: 'Sponsor boarding, books, clothing, and holistic education for tribal youth in remote Rajasthan.',
      targetAmount: 2500000,
      raisedAmount: 1845000,
      upiId: 'shreeabhaydas@sbi',
      qrCodeUrl: '/home-page-image/sahast-foundation-logo.png',
      donorCount: 842,
      status: 'active'
    },
    {
      id: 'camp-2',
      title: 'Desi Gaushala Sanrakshan & Medical Seva',
      description: 'Providing green fodder, veterinary medical treatments, and shelter to over 450 abandoned indigenous cows.',
      targetAmount: 1500000,
      raisedAmount: 1210000,
      upiId: 'shreeabhaydas@sbi',
      qrCodeUrl: '/home-page-image/sahast-foundation-logo.png',
      donorCount: 615,
      status: 'active'
    },
    {
      id: 'camp-3',
      title: 'Daily Annakshetra Mahaprasad Seva',
      description: 'Serving hot, hygienic, sanctified meals daily to pilgrims, children, and sadhus without discrimination.',
      targetAmount: 1000000,
      raisedAmount: 780000,
      upiId: 'shreeabhaydas@sbi',
      qrCodeUrl: '/home-page-image/sahast-foundation-logo.png',
      donorCount: 520,
      status: 'active'
    }
  ],

  ticker: [
    '• Shrimad Bhagwad Katha Gyan Yajna Takhatgarh •',
    '• Pujya Swami Shri Abhay Das Ji Maharaj Pravachan Live on YouTube •',
    '• Support Gurukul Tribal Children Education •',
    '• Desi Gaushala Nitya Annakshetra Seva •',
    '• 100% Tax Exemption Under Section 80G •'
  ],

  galleryPreview: [
    '/home-page-image/WhatsApp-Image-2026-05-26-at-21.23.40-e1779954909287.jpeg',
    '/home-page-image/WhatsApp-Image-2026-05-26-at-21.23.386-e1780038882424.jpeg',
    '/home-page-image/WhatsApp-Image-2026-05-26-at-21.23.395-e1779955852314.jpeg',
    '/home-page-image/WhatsApp-Image-2026-05-26-at-21.23.400-e1779955447139.jpeg',
    '/home-page-image/WhatsApp-Image-2026-05-26-at-21.24.09.jpeg'
  ],

  videos: [
    {
      id: 'vid-1',
      title: 'Bhagwat Gita Saar - How to Overcome Mental Restlessness',
      youtubeId: 'kW-T1J5QFdY',
      date: '15 Oct 2026',
      viewCount: '48,500 views',
      duration: '42:15'
    },
    {
      id: 'vid-2',
      title: 'The Divine Power of Nishkam Karma & Seva',
      youtubeId: 'kW-T1J5QFdY',
      date: '02 Oct 2026',
      viewCount: '62,100 views',
      duration: '35:20'
    },
    {
      id: 'vid-3',
      title: 'Morning Satsang & Gurukul Chanting at Takhatgarh',
      youtubeId: 'kW-T1J5QFdY',
      date: '20 Sep 2026',
      viewCount: '29,800 views',
      duration: '28:40'
    }
  ],

  contactAndFooter: {
    siteName: 'Shree Abhay Das Ji Maharaj Portal',
    templeAddress: 'Shri Bharat Mata Statue Site, Shri Guru Puram Ashram, Takhatgarh, Pali, Rajasthan, India - 306912',
    phone: '+91 8696298489',
    email: 'info@shreeabhaydas.com',
    whatsapp: '+91 8696298489',
    socials: {
      youtube: 'https://youtube.com/@shreeabhaydas',
      facebook: 'https://facebook.com/shreeabhaydas',
      instagram: 'https://instagram.com/shreeabhaydas',
      whatsapp: 'https://wa.me/918696298489'
    },
    copyrightNote: '© 2026 Shree Abhay Das Ji Maharaj. All Rights Reserved.',
    taxExemptNote: 'All donations to Sahast Foundation are 100% tax exempt under Section 80G of the Income Tax Act.'
  },

  updatedAt: new Date().toISOString()
};

export const NEWS_DEFAULT_SEED = [
  {
    id: 'news-1',
    title: 'Divine Satsang & Spiritual Awakening Assembly in Takhatgarh',
    slug: 'divine-satsang-takhatgarh',
    category: 'Satsang',
    excerpt: 'Hundreds of devotees gathered at Shri Guru Puram Ashram as Pujya Maharaj Ji enlightened youth on Dhyana, ethical conduct, and Sanatan traditions.',
    content: '<p>Under the divine guidance of <strong>Pujya Swami Shri Abhay Das Ji Maharaj</strong>, a grand three-day spiritual assembly concluded at Takhatgarh. Devotees from Rajasthan, Gujarat, and Maharashtra experienced deep meditation and spiritual solace.</p><p>Maharaj Ji emphasized that real spirituality lies in moral integrity and compassionate service to humanity and cows.</p><blockquote>"When devotion touches action, society transforms from within."</blockquote>',
    featuredImage: '/home-page-image/WhatsApp-Image-2026-05-26-at-0-e1779814877129.jpeg',
    secondaryImages: [
      '/home-page-image/WhatsApp-Image-2026-05-26-at-21.23.386-e1780038882424.jpeg',
      '/home-page-image/WhatsApp-Image-2026-05-26-at-21.23.395-e1779955852314.jpeg'
    ],
    status: 'published',
    author: 'Shree Abhaydas Ji Ashram',
    publishedAt: '2026-10-18T10:00:00.000Z',
    createdAt: '2026-10-18T09:00:00.000Z'
  },
  {
    id: 'news-2',
    title: 'Expansion of Desi Gaushala Sanctuaries in Pali District',
    slug: 'expansion-desi-gaushala-sanctuaries-pali',
    category: 'Seva',
    excerpt: 'New eco-friendly cow shelters and dedicated veterinary healthcare facilities inaugurated to rehabilitate over 200 stray and distressed Desi cows.',
    content: '<p>The Gaushala initiative under Sahast Foundation has expanded its facilities with dedicated shelter sheds, organic fodder farms, and automated clean water drinkers.</p><p>Volunteers and veterinarians provide round-the-clock emergency medical rehabilitation for injured cows.</p>',
    featuredImage: '/home-page-image/WhatsApp-Image-2026-05-26-at-21.23.523-e1779814853502.jpeg',
    secondaryImages: [
      '/home-page-image/WhatsApp-Image-2026-05-28-at-13.35.48-e1779956288882.jpeg'
    ],
    status: 'published',
    author: 'Shree Abhaydas Ji Ashram',
    publishedAt: '2026-10-14T08:30:00.000Z',
    createdAt: '2026-10-14T08:00:00.000Z'
  },
  {
    id: 'news-3',
    title: 'Vedic Gurukul Celebrates Annual Achievers & Sanskrit Mahotsav',
    slug: 'vedic-gurukul-annual-achievers-sanskrit-mahotsav',
    category: 'Spiritual Discourse',
    excerpt: 'Tribal students demonstrated Vedic recitation alongside modern mathematics and science presentations, earning accolades from visiting scholars.',
    content: '<p>The students of Shri Guru Puram Gurukul showcased flawless Sanskrit shloka recitations, classical yoga demonstrations, and science projects.</p><p>Maharaj Ji blessed the meritorious students with scholarships and books for higher studies.</p>',
    featuredImage: '/home-page-image/gurukul.png',
    secondaryImages: [
      '/home-page-image/WhatsApp-Image-2026-05-26-at-21.23.40-e1779954909287.jpeg'
    ],
    status: 'published',
    author: 'Shree Abhaydas Ji Ashram',
    publishedAt: '2026-10-08T05:00:00.000Z',
    createdAt: '2026-10-08T04:30:00.000Z'
  },
  {
    id: 'news-4',
    title: 'Annakshetra Milestone: Over 350,000 Sanctified Meals Served',
    slug: 'annakshetra-milestone-meals-served',
    category: 'Press Release',
    excerpt: 'The non-stop free kitchen serves pure, sanctified meals daily to villagers, pilgrims, and hospital attendants in western Rajasthan.',
    content: '<p>Daily food distribution operates seamlessly through community support and voluntary contributions, ensuring no pilgrim or patient goes hungry.</p>',
    featuredImage: '/home-page-image/The-Power-of-Seva-Serving-Humanity-with-Compassion.png',
    secondaryImages: [],
    status: 'draft',
    author: 'Shree Abhaydas Ji Ashram',
    publishedAt: '2026-10-19T06:00:00.000Z',
    createdAt: '2026-10-19T06:00:00.000Z'
  }
];

export const EVENTS_DEFAULT_SEED = [
  {
    id: 'event-1',
    title: '7-Day Shrimad Bhagwat Gyan Yagna Mahotsav',
    slug: 'shrimad-bhagwat-gyan-yagna',
    startDate: '2026-11-01',
    endDate: '2026-11-07',
    timing: '02:00 PM - 06:00 PM Daily',
    venue: 'Sadguru Trikam Das Ji Dham',
    location: 'Takhatgarh, Pali, Rajasthan',
    googleMapsUrl: 'https://maps.google.com/?q=Takhatgarh,Rajasthan',
    organizerContact: 'Shri Guru Puram Trust (+91 8696298489)',
    liveStreamUrl: 'https://youtube.com/live/shreeabhaydas',
    status: 'upcoming',
    featuredImage: '/home-page-image/WhatsApp-Image-2026-05-28-at-13.31.06-e1779955352658.jpeg',
    createdAt: '2026-10-15T09:00:00.000Z'
  },
  {
    id: 'event-2',
    title: 'Gau Seva Mahasammelan & Vedic Havan',
    slug: 'gau-seva-mahasammelan-vedic-havan',
    startDate: '2026-11-18',
    endDate: '2026-11-19',
    timing: '08:00 AM - 01:00 PM',
    venue: 'Shri Guru Puram Gaushala Complex',
    location: 'Takhatgarh, Pali, Rajasthan',
    googleMapsUrl: 'https://maps.google.com/?q=Takhatgarh,Rajasthan',
    organizerContact: 'Ashram Seva Samiti (+91 8696298489)',
    liveStreamUrl: 'https://youtube.com/live/shreeabhaydas',
    status: 'upcoming',
    featuredImage: '/home-page-image/WhatsApp-Image-2026-05-26-at-21.23.523-e1779814853502.jpeg',
    createdAt: '2026-10-12T11:00:00.000Z'
  },
  {
    id: 'event-3',
    title: 'Youth Meditation & Character Building Camp',
    slug: 'youth-meditation-camp',
    startDate: '2026-10-18',
    endDate: '2026-10-21',
    timing: '06:00 AM - 08:30 PM Daily',
    venue: 'Dhyana Mandapam, Ashram Campus',
    location: 'Takhatgarh, Pali, Rajasthan',
    googleMapsUrl: 'https://maps.google.com/?q=Takhatgarh,Rajasthan',
    organizerContact: 'Vedic Gurukul Faculty (+91 8696298489)',
    liveStreamUrl: '',
    status: 'ongoing',
    featuredImage: '/home-page-image/meditation-1-e1780126777484.png',
    createdAt: '2026-10-01T10:00:00.000Z'
  },
  {
    id: 'event-4',
    title: 'Sharad Purnima Mahotsav & Ras Utsav',
    slug: 'sharad-purnima-mahotsav',
    startDate: '2026-10-10',
    endDate: '2026-10-11',
    timing: '07:00 PM - 11:30 PM',
    venue: 'Main Temple Courtyard',
    location: 'Takhatgarh, Pali, Rajasthan',
    googleMapsUrl: 'https://maps.google.com/?q=Takhatgarh,Rajasthan',
    organizerContact: 'Pujya Maharaj Ji Seva Mandal (+91 8696298489)',
    liveStreamUrl: 'https://youtube.com/live/shreeabhaydas',
    status: 'completed',
    featuredImage: '/home-page-image/WhatsApp-Image-2026-05-26-at-0-e1779814877129.jpeg',
    createdAt: '2026-09-25T08:00:00.000Z'
  }
];

export const GALLERY_DEFAULT_SEED = [
  {
    id: 'gal-1',
    title: 'Maharaj Ji Morning Aarti Darshan',
    url: '/home-page-image/guruji-1.jpeg',
    category: 'Darshan',
    featured: true,
    createdAt: Date.now() - 86400000 * 5
  },
  {
    id: 'gal-2',
    title: 'Divine Pravachan on Shrimad Bhagwat Gita',
    url: '/home-page-image/WhatsApp-Image-2026-05-28-at-13.31.06-e1779955352658.jpeg',
    category: 'Pravachan',
    featured: true,
    createdAt: Date.now() - 86400000 * 4
  },
  {
    id: 'gal-3',
    title: 'Loving Gau Mata Seva & Feeding in Gaushala',
    url: '/home-page-image/WhatsApp-Image-2026-05-26-at-21.23.523-e1779814853502.jpeg',
    category: 'Gau Seva',
    featured: true,
    createdAt: Date.now() - 86400000 * 3
  },
  {
    id: 'gal-4',
    title: 'Tribal Students in Gurukul Classroom Session',
    url: '/home-page-image/gurukul.png',
    category: 'Gurukul',
    featured: true,
    createdAt: Date.now() - 86400000 * 2
  },
  {
    id: 'gal-5',
    title: 'Pujya Maharaj Ji Blessing Devotees at Takhatgarh',
    url: '/home-page-image/WhatsApp-Image-2026-05-26-at-0-e1779814877129.jpeg',
    category: 'Darshan',
    featured: true,
    createdAt: Date.now() - 86400000 * 1
  },
  {
    id: 'gal-6',
    title: 'Daily Annakshetra Sanctified Prasadam Preparation',
    url: '/home-page-image/The-Power-of-Seva-Serving-Humanity-with-Compassion.png',
    category: 'Pravachan',
    featured: false,
    createdAt: Date.now() - 86400000 * 6
  },
  {
    id: 'gal-7',
    title: 'Morning Yoga and Vedic Dhyana by Youth',
    url: '/home-page-image/meditation-1-e1780126777484.png',
    category: 'Gurukul',
    featured: false,
    createdAt: Date.now() - 86400000 * 7
  },
  {
    id: 'gal-8',
    title: 'Sacred Indigenous Desi Calves in Green Sanctuary',
    url: '/home-page-image/WhatsApp-Image-2026-05-28-at-13.35.48-e1779956288882.jpeg',
    category: 'Gau Seva',
    featured: false,
    createdAt: Date.now() - 86400000 * 8
  }
];
