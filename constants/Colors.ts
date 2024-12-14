/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

// Base palette
const palette = {
  // Primary colors
  primary: {
    light: '#0A84FF', // iOS blue
    dark: '#0A84FF',
  },
  // Neutrals
  neutral: {
    50: '#F8F9FA',
    100: '#F1F3F5',
    200: '#E9ECEF',
    300: '#DEE2E6',
    400: '#CED4DA',
    500: '#ADB5BD',
    600: '#868E96',
    700: '#495057',
    800: '#343A40',
    900: '#212529',
  },
  // Semantic colors
  success: {
    light: '#32D74B',
    dark: '#32D74B',
  },
  warning: {
    light: '#FFD60A',
    dark: '#FFD60A',
  },
  error: {
    light: '#FF453A',
    dark: '#FF453A',
  },
  // Category colors
  categories: {
    work: '#FF6B6B',
    personal: '#4ECDC4',
    shopping: '#FFD93D',
    health: '#95E1D3',
  },
};

// Theme-specific colors
export const Colors = {
  light: {
    // Base colors
    text: palette.neutral[900],
    textSecondary: palette.neutral[600],
    background: '#FFFFFF',
    tint: palette.primary.light,
    
    // UI Elements
    card: palette.neutral[50],
    cardBorder: palette.neutral[200],
    input: palette.neutral[100],
    inputBorder: palette.neutral[200],
    
    // Tab Bar
    tabBar: 'rgba(255, 255, 255, 0.9)',
    tabBarBorder: 'rgba(0, 0, 0, 0.1)',
    tabIconDefault: palette.neutral[500],
    tabIconSelected: palette.primary.light,
    
    // Status
    success: palette.success.light,
    warning: palette.warning.light,
    error: palette.error.light,
  },
  dark: {
    // Base colors
    text: '#FFFFFF',
    textSecondary: palette.neutral[400],
    background: palette.neutral[900],
    tint: palette.primary.dark,
    
    // UI Elements
    card: 'rgba(255, 255, 255, 0.05)',
    cardBorder: 'rgba(255, 255, 255, 0.1)',
    input: 'rgba(255, 255, 255, 0.05)',
    inputBorder: 'rgba(255, 255, 255, 0.1)',
    
    // Tab Bar
    tabBar: 'rgba(30, 30, 30, 0.9)',
    tabBarBorder: 'rgba(255, 255, 255, 0.1)',
    tabIconDefault: palette.neutral[500],
    tabIconSelected: '#FFFFFF',
    
    // Status
    success: palette.success.dark,
    warning: palette.warning.dark,
    error: palette.error.dark,
  },
  // Shared colors
  categories: palette.categories,
};
