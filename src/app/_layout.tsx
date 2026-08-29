import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { QueryClientProvider } from '@tanstack/react-query';
import { DarkTheme, DefaultTheme, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StyleSheet } from 'react-native';

import { queryClient } from '@/config/queryClient';
import { useAppTheme } from '@/hooks/useAppTheme';
import { useAuthStore } from '@/store/auth.store';
import { OfflineNotice } from '@/components/common/OfflineNotice';
import AppMainScreen from './index';

// Prevent splash screen auto-hiding while fonts / auth initializes
SplashScreen.preventAutoHideAsync().catch(() => {});

function RootAppContainer() {
  const { isDark, paperTheme, colors } = useAppTheme();
  const { initializeAuth } = useAuthStore();

  useEffect(() => {
    initializeAuth().finally(() => {
      SplashScreen.hideAsync().catch(() => {});
    });
  }, [initializeAuth]);

  return (
    <PaperProvider theme={paperTheme}>
      <ThemeProvider value={isDark ? DarkTheme : DefaultTheme}>
        <SafeAreaView style={[styles.root, { backgroundColor: colors.background }]} edges={['top', 'left', 'right']}>
          <StatusBar style={isDark ? 'light' : 'dark'} />
          <OfflineNotice />
          <AppMainScreen />
        </SafeAreaView>
      </ThemeProvider>
    </PaperProvider>
  );
}

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <RootAppContainer />
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
