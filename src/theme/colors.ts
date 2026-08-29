/**
 * Premium Command-Center Palette for ChunavAi Election Campaign OS
 * Android-first, Material 3 compliant with high-contrast surfaces.
 */

export const CampaignColors = {
  // Brand / Command Primary
  primary: '#1E3A8A', // Deep Commander Navy
  primaryLight: '#3B82F6',
  primaryDark: '#172554',
  primaryContainerLight: '#DBEAFE',
  primaryContainerDark: '#1E293B',

  // Saffron / Energy Accent
  accentSaffron: '#EA580C',
  accentSaffronLight: '#FFEDD5',
  accentSaffronDark: '#7C2D12',

  // Emerald / Success / Verified
  emerald: '#059669',
  emeraldLight: '#D1FAE5',
  emeraldDark: '#064E3B',

  // Amber / Warning / Urgent
  amber: '#D97706',
  amberLight: '#FEF3C7',
  amberDark: '#78350F',

  // Crimson / Danger / Critical
  crimson: '#DC2626',
  crimsonLight: '#FEE2E2',
  crimsonDark: '#7F1D1D',

  // Role Color Badges
  roles: {
    super_admin: '#7C3AED',
    party: '#1D4ED8',
    candidate: '#EA580C',
    campaign_manager: '#0D9488',
    volunteer: '#059669',
    survey_intelligence: '#DB2777',
    unknown: '#6B7280',
  },

  light: {
    background: '#F8FAFC',
    surface: '#FFFFFF',
    surfaceVariant: '#F1F5F9',
    surfaceElevated: '#FFFFFF',
    card: '#FFFFFF',
    cardBorder: '#E2E8F0',
    border: '#E2E8F0',
    borderStrong: '#CBD5E1',
    text: '#0F172A',
    textSecondary: '#475569',
    textMuted: '#94A3B8',
    accent: '#2563EB',
    statusBar: 'dark-content' as const,
    divider: '#E2E8F0',
    inputBg: '#FFFFFF',
    inputBorder: '#CBD5E1',
    navBg: '#FFFFFF',
    navBorder: '#E2E8F0',
  },

  dark: {
    background: '#0B0F19',
    surface: '#111827',
    surfaceVariant: '#1F2937',
    surfaceElevated: '#1A2234',
    card: '#111827',
    cardBorder: '#1F2937',
    border: '#1F2937',
    borderStrong: '#374151',
    text: '#F8FAFC',
    textSecondary: '#94A3B8',
    textMuted: '#64748B',
    accent: '#3B82F6',
    statusBar: 'light-content' as const,
    divider: '#1F2937',
    inputBg: '#111827',
    inputBorder: '#374151',
    navBg: '#111827',
    navBorder: '#1F2937',
  },
} as const;

export type ThemeColors = typeof CampaignColors.light;
