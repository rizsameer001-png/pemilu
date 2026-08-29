import { useColorScheme } from 'react-native';
import { useThemeStore } from '../store/theme.store';
import { CampaignColors } from '../theme/colors';
import { customPaperLightTheme, customPaperDarkTheme } from '../theme/paperTheme';

export function useAppTheme() {
  const systemScheme = useColorScheme();
  const { mode, setMode, toggleTheme } = useThemeStore();

  const isDark = mode === 'system' ? systemScheme === 'dark' : mode === 'dark';
  const colors = isDark ? CampaignColors.dark : CampaignColors.light;
  const paperTheme = isDark ? customPaperDarkTheme : customPaperLightTheme;

  return {
    isDark,
    mode,
    colors,
    brandColors: CampaignColors,
    paperTheme,
    setMode,
    toggleTheme,
  };
}
