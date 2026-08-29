import React from 'react';

export const DefaultTheme = {
  dark: false,
  colors: {
    primary: '#1E3A8A',
    background: '#F8FAFC',
    card: '#FFFFFF',
    text: '#0F172A',
    border: '#E2E8F0',
    notification: '#DC2626',
  },
};

export const DarkTheme = {
  dark: true,
  colors: {
    primary: '#3B82F6',
    background: '#0B0F19',
    card: '#111827',
    text: '#F8FAFC',
    border: '#1F2937',
    notification: '#DC2626',
  },
};

export function ThemeProvider({ children }: { children: React.ReactNode; value?: any }) {
  return <>{children}</>;
}

export function useRouter() {
  return {
    push: (route: string) => {},
    replace: (route: string) => {},
    back: () => {},
  };
}

export function usePathname() {
  return '/';
}

export default {
  DefaultTheme,
  DarkTheme,
  ThemeProvider,
  useRouter,
  usePathname,
};
