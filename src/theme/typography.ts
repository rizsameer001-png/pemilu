import { TextStyle, Platform } from 'react-native';

const fontFamily = Platform.select({
  android: 'Roboto',
  ios: 'System',
  default: 'sans-serif',
});

export const CampaignTypography: Record<string, TextStyle> = {
  // Displays
  displayLarge: {
    fontFamily,
    fontSize: 32,
    lineHeight: 40,
    fontWeight: '700',
    letterSpacing: -0.5,
  },
  displayMedium: {
    fontFamily,
    fontSize: 28,
    lineHeight: 36,
    fontWeight: '700',
    letterSpacing: -0.25,
  },
  
  // Headlines
  headlineLarge: {
    fontFamily,
    fontSize: 24,
    lineHeight: 32,
    fontWeight: '700',
  },
  headlineMedium: {
    fontFamily,
    fontSize: 20,
    lineHeight: 28,
    fontWeight: '600',
  },
  headlineSmall: {
    fontFamily,
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '600',
  },

  // Titles
  titleLarge: {
    fontFamily,
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '600',
  },
  titleMedium: {
    fontFamily,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '600',
  },
  titleSmall: {
    fontFamily,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },

  // Body
  bodyLarge: {
    fontFamily,
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '400',
  },
  bodyMedium: {
    fontFamily,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400',
  },
  bodySmall: {
    fontFamily,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '400',
  },

  // Labels
  labelLarge: {
    fontFamily,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
  },
  labelMedium: {
    fontFamily,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '500',
  },
  labelSmall: {
    fontFamily,
    fontSize: 10,
    lineHeight: 14,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  mono: {
    fontFamily: Platform.select({ ios: 'Menlo', android: 'monospace', default: 'monospace' }),
    fontSize: 12,
    lineHeight: 16,
  },
};
