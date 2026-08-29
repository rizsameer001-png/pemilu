/**
 * Centralized Configuration for ChunavAi Election Campaign OS (Pemilu)
 * Single Source of Truth for API endpoints and Environment configurations.
 */

export const ENV = {
  APP_NAME: 'ChunavAi Election Campaign OS',
  APP_SLUG: 'pemilu',
  VERSION: '1.0.0',
  
  /**
   * Centralized backend base URL.
   * NEVER duplicate this URL elsewhere in the codebase.
   */
  BASE_URL: 'https://chunavjsx.onrender.com',
  
  API_TIMEOUT_MS: 15000,
  
  STORAGE_KEYS: {
    AUTH_TOKEN: 'chunav_auth_token',
    REFRESH_TOKEN: 'chunav_refresh_token',
    USER_PROFILE: 'chunav_user_profile',
    ACTIVE_ROLE: 'chunav_active_role',
    THEME_MODE: 'chunav_theme_mode',
    CONSTITUENCY_ID: 'chunav_selected_constituency',
  },
} as const;

export type StorageKey = (typeof ENV.STORAGE_KEYS)[keyof typeof ENV.STORAGE_KEYS];
