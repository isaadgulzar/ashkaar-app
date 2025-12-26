import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Appearance } from 'react-native';
import { setStatusBarStyle } from 'expo-status-bar';

type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeColors {
  // Background gradients
  primaryGradient: string[];
  morningGradient: string[];
  eveningGradient: string[];

  // Text colors
  primaryText: string;
  secondaryText: string;
  accentText: string;

  // UI colors
  cardBackground: string;
  overlayBackground: string;
  borderColor: string;
  shadowColor: string;

  // Status colors
  successColor: string;
  warningColor: string;
  errorColor: string;

  // Interactive elements
  buttonBackground: string;
  buttonText: string;
  badgeBackground: string;
  badgeText: string;
}

interface ThemeContextType {
  mode: ThemeMode;
  isDark: boolean;
  colors: ThemeColors;
  setTheme: (theme: ThemeMode) => void;
}

const lightTheme: ThemeColors = {
  // Background gradients - keeping your beautiful warm tones
  primaryGradient: ['#FFD93D', '#FF9A56', '#A8D8EA'],
  morningGradient: ['#FFD93D', '#FF9A56', '#A8D8EA'],
  eveningGradient: ['#355C7D', '#6C5B7B', '#F67280'],

  // Text colors - your rich browns work great on light backgrounds
  primaryText: '#7C4A2C',
  secondaryText: '#B5793A',
  accentText: '#1f2937',

  // UI colors
  cardBackground: 'rgba(255, 255, 255, 0.7)',
  overlayBackground: 'rgba(255, 255, 255, 0.9)',
  borderColor: 'rgba(255, 255, 255, 0.8)',
  shadowColor: '#000',

  // Status colors
  successColor: '#10B981',
  warningColor: '#F59E0B',
  errorColor: '#EF4444',

  // Interactive elements
  buttonBackground: 'rgba(255, 255, 255, 0.95)',
  buttonText: '#374151',
  badgeBackground: 'rgba(255, 255, 255, 0.95)',
  badgeText: '#374151',
};

const darkTheme: ThemeColors = {
  // Background gradients - darker versions of your warm palette
  primaryGradient: ['#B8860B', '#CD853F', '#4682B4'],
  morningGradient: ['#B8860B', '#CD853F', '#4682B4'],
  eveningGradient: ['#2C3E50', '#34495E', '#E74C3C'],

  // Text colors - lighter versions for dark backgrounds
  primaryText: '#F4E4BC',
  secondaryText: '#E6D196',
  accentText: '#F9FAFB',

  // UI colors
  cardBackground: 'rgba(30, 30, 30, 0.8)',
  overlayBackground: 'rgba(20, 20, 20, 0.9)',
  borderColor: 'rgba(255, 255, 255, 0.2)',
  shadowColor: '#000',

  // Status colors - slightly muted for dark theme
  successColor: '#059669',
  warningColor: '#D97706',
  errorColor: '#DC2626',

  // Interactive elements
  buttonBackground: 'rgba(40, 40, 40, 0.9)',
  buttonText: '#F9FAFB',
  badgeBackground: 'rgba(60, 60, 60, 0.9)',
  badgeText: '#F3F4F6',
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [mode, setMode] = useState<ThemeMode>('system');
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Load saved theme preference
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem('theme');
        if (savedTheme && ['light', 'dark', 'system'].includes(savedTheme)) {
          setMode(savedTheme as ThemeMode);
        }
      } catch (error) {
        console.warn('Failed to load theme preference:', error);
      }
    };

    loadTheme();
  }, []);

  useEffect(() => {
    // Calculate isDark based on theme mode
    if (mode === 'system') {
      const systemColorScheme = Appearance.getColorScheme();
      setIsDark(systemColorScheme === 'dark');

      const subscription = Appearance.addChangeListener(({ colorScheme }) => {
        setIsDark(colorScheme === 'dark');
      });

      return () => subscription?.remove();
    } else {
      setIsDark(mode === 'dark');
    }
  }, [mode]);

  useEffect(() => {
    // Update status bar style based on theme
    setStatusBarStyle(isDark ? 'light' : 'dark');
  }, [isDark]);

  const setTheme = async (newTheme: ThemeMode) => {
    try {
      setMode(newTheme);
      await AsyncStorage.setItem('theme', newTheme);
    } catch (error) {
      console.warn('Failed to save theme preference:', error);
    }
  };

  const colors = isDark ? darkTheme : lightTheme;

  const value: ThemeContextType = {
    mode,
    isDark,
    colors,
    setTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Helper function to get card gradient colors with opacity
export const getCardGradient = (
  colors: ThemeColors,
  type: 'morning' | 'evening' | 'primary' = 'primary',
  opacity: number = 0.5
): string[] => {
  const baseGradient = type === 'morning'
    ? colors.morningGradient
    : type === 'evening'
    ? colors.eveningGradient
    : colors.primaryGradient;

  return baseGradient.map(color =>
    color.startsWith('rgba')
      ? color
      : `rgba(${parseInt(color.slice(1, 3), 16)}, ${parseInt(color.slice(3, 5), 16)}, ${parseInt(color.slice(5, 7), 16)}, ${opacity})`
  );
};