// constants/colors.ts

export const Colors = {
    morning: {
      primary: '#FF9A56',      // Soft orange
      secondary: '#FFD93D',    // Golden yellow
      accent: '#A8D8EA',       // Light sky blue
      gradient: ['#FFD93D', '#FF9A56', '#A8D8EA'],
      gradientStart: { x: 0, y: 0 },
      gradientEnd: { x: 1, y: 1 },
      text: '#7C4A2C',
      textLight: '#B5793A',
    },
    evening: {
      primary: '#6C5B7B',      // Deep purple
      secondary: '#355C7D',    // Warm indigo
      accent: '#F67280',       // Dusky orange
      gradient: ['#355C7D', '#6C5B7B', '#F67280'],
      gradientStart: { x: 0, y: 0 },
      gradientEnd: { x: 1, y: 1 },
      text: '#E9D5FF',
      textLight: '#C4B5FD',
    },
    common: {
      white: '#FFFFFF',
      black: '#000000',
      success: '#10b981',
      error: '#ef4444',
    }
  };
  
  export const Shadows = {
    small: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    medium: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 12,
      elevation: 4,
    },
    large: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.2,
      shadowRadius: 24,
      elevation: 8,
    },
    xlarge: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 12 },
      shadowOpacity: 0.25,
      shadowRadius: 30,
      elevation: 12,
    },
  };