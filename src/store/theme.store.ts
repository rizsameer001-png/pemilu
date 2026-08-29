import { create } from 'zustand';
import { storage } from '../utils/storage';
import { ENV } from '../config/env';

type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeState {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => Promise<void>;
  toggleTheme: () => Promise<void>;
}

export const useThemeStore = create<ThemeState>((set, get) => ({
  mode: 'system',

  setMode: async (mode: ThemeMode) => {
    set({ mode });
    await storage.setItem(ENV.STORAGE_KEYS.THEME_MODE, mode);
  },

  toggleTheme: async () => {
    const current = get().mode;
    const next = current === 'dark' ? 'light' : 'dark';
    set({ mode: next });
    await storage.setItem(ENV.STORAGE_KEYS.THEME_MODE, next);
  },
}));
