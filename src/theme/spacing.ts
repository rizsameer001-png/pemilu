import { ViewStyle, Platform } from 'react-native';

export const CampaignSpacing = {
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  huge: 48,
} as const;

export const CampaignRadius = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  round: 9999,
} as const;

export const CampaignElevation = {
  none: {
    elevation: 0,
    shadowColor: 'transparent',
  } as ViewStyle,
  low: {
    ...Platform.select({
      android: { elevation: 2 },
      ios: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 2,
      },
      default: {
        boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
      } as any,
    }),
  } as ViewStyle,
  medium: {
    ...Platform.select({
      android: { elevation: 4 },
      ios: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.12,
        shadowRadius: 6,
      },
      default: {
        boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)',
      } as any,
    }),
  } as ViewStyle,
  high: {
    ...Platform.select({
      android: { elevation: 8 },
      ios: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.18,
        shadowRadius: 12,
      },
      default: {
        boxShadow: '0 10px 15px -3px rgba(0,0,0,0.15)',
      } as any,
    }),
  } as ViewStyle,
};
