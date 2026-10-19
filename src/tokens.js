// Design System Tokens for Sahast Foundation
// Strictly based on token-driven UI guidance requirements

export const tokens = {
  font: {
    family: {
      primary: 'Lato',
      stack: 'Lato, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      devanagari: '"Rozha One", "Tiro Devanagari Hindi", serif',
      heading: '"Cinzel", "Rozha One", serif'
    },
    size: {
      xs: '14px',
      sm: '15px',
      md: '15.5px',
      lg: '16px',
      xl: '17px',
      '2xl': '18px',
      '3xl': '20px',
      '4xl': '22px',
      '5xl': '28px',
      '6xl': '36px',
      '7xl': '44px',
      base: '18px'
    },
    weight: {
      light: 300,
      base: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 900
    },
    lineHeight: {
      tight: '22px',
      snug: '26px',
      base: '30px',
      relaxed: '34px',
      loose: '40px'
    }
  },
  color: {
    text: {
      primary: '#666666',
      secondary: '#333333',
      dark: '#111827',
      muted: '#777777',
      inverse: '#d5d5d5',
      white: '#ffffff',
      accent: '#e31937',
      gold: '#d59a1a'
    },
    border: {
      subtle: '#e5e7eb',
      default: '#dcdcdc',
      strong: '#ffffff',
      gold: '#d59a1a',
      red: '#e31937'
    },
    surface: {
      base: '#000000',
      raised: '#eeeeee',
      strong: '#e31937',
      pureWhite: '#ffffff',
      cream: '#faf8f4',
      warmPaper: '#f7f4ee',
      navy: '#08122d',
      navyDeep: '#050b1d',
      navySoft: '#101d42',
      gold: '#d59a1a',
      yellow: '#fabc3f',
      yellowLight: '#fff9e6'
    },
    brand: {
      red: '#e31937',
      redHover: '#c4142e',
      gold: '#d59a1a',
      goldHover: '#b88110',
      yellow: '#fabc3f',
      navy: '#08122d'
    }
  },
  space: {
    1: '5px',
    2: '8px',
    3: '10px',
    4: '14px',
    5: '15px',
    6: '16px',
    7: '20px',
    8: '22px',
    9: '28px',
    10: '36px',
    11: '48px',
    12: '64px',
    13: '80px'
  },
  radius: {
    xs: '5px',
    sm: '10px',
    md: '20px',
    lg: '22px',
    xl: '30px',
    '2xl': '50px',
    full: '9999px'
  },
  shadow: {
    1: 'rgba(0, 0, 0, 0.12) 0px 15px 35px 0px, rgba(0, 0, 0, 0.18) 0px 30px 70px 0px, rgba(213, 154, 26, 0.1) 0px 8px 20px 0px',
    2: 'rgba(0, 0, 0, 0.12) 0px 15px 40px 0px',
    3: 'rgba(0, 0, 0, 0.15) 0px 10px 25px 0px',
    subtle: '0 4px 12px rgba(0, 0, 0, 0.05)',
    card: '0 10px 30px rgba(0, 0, 0, 0.06)'
  },
  motion: {
    duration: {
      instant: '200ms',
      fast: '300ms',
      normal: '400ms',
      slow: '500ms',
      slower: '700ms'
    },
    easing: {
      standard: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
      bounce: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
    }
  }
};
