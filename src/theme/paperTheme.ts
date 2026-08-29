import { MD3LightTheme, MD3DarkTheme, MD3Theme } from 'react-native-paper';
import { CampaignColors } from './colors';

export const customPaperLightTheme: MD3Theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: CampaignColors.primary,
    onPrimary: '#FFFFFF',
    primaryContainer: CampaignColors.primaryContainerLight,
    onPrimaryContainer: CampaignColors.primaryDark,
    secondary: CampaignColors.accentSaffron,
    onSecondary: '#FFFFFF',
    background: CampaignColors.light.background,
    surface: CampaignColors.light.surface,
    surfaceVariant: CampaignColors.light.surfaceVariant,
    outline: CampaignColors.light.borderStrong,
    elevation: {
      level0: 'transparent',
      level1: '#FFFFFF',
      level2: '#F8FAFC',
      level3: '#F1F5F9',
      level4: '#E2E8F0',
      level5: '#CBD5E1',
    },
  },
};

export const customPaperDarkTheme: MD3Theme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: CampaignColors.primaryLight,
    onPrimary: '#FFFFFF',
    primaryContainer: CampaignColors.primaryContainerDark,
    onPrimaryContainer: '#DBEAFE',
    secondary: CampaignColors.accentSaffron,
    onSecondary: '#FFFFFF',
    background: CampaignColors.dark.background,
    surface: CampaignColors.dark.surface,
    surfaceVariant: CampaignColors.dark.surfaceVariant,
    outline: CampaignColors.dark.borderStrong,
    elevation: {
      level0: 'transparent',
      level1: '#111827',
      level2: '#161F30',
      level3: '#1F2937',
      level4: '#283548',
      level5: '#374151',
    },
  },
};
