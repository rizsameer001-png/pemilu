import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useAuth } from '@/hooks/useAuth';
import { useAppTheme } from '@/hooks/useAppTheme';
import { AppHeader } from '@/components/common/AppHeader';
import { CustomTabBar, TabKey } from '@/components/navigation/CustomTabBar';
import { LoadingState } from '@/components/common/LoadingState';
import {
  LoginScreen,
  RoleBasedDashboard,
  ConstituencyView,
  VotersView,
  TasksView,
  ProfileView,
} from '@/features';

export default function AppMainScreen() {
  const { isAuthenticated, isInitialized, isLoading } = useAuth();
  const { colors } = useAppTheme();
  const [activeTab, setActiveTab] = useState<TabKey>('dashboard');

  if (!isInitialized && isLoading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: colors.background }]}>
        <LoadingState message="Initializing ChunavAi OS..." subtext="Connecting secure storage and command services" />
      </View>
    );
  }

  if (!isAuthenticated) {
    return <LoginScreen onLoginSuccess={() => setActiveTab('dashboard')} />;
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* OS Command Center Header */}
      <AppHeader
        title={
          activeTab === 'dashboard'
            ? 'Command Center'
            : activeTab === 'constituency'
            ? 'Constituency'
            : activeTab === 'voters'
            ? 'Electoral Roll'
            : activeTab === 'tasks'
            ? 'Field Operations'
            : 'Officer Profile'
        }
      />

      {/* Main View Container */}
      <View style={styles.contentArea}>
        {activeTab === 'dashboard' && <RoleBasedDashboard onNavigateToTab={(t) => setActiveTab(t)} />}
        {activeTab === 'constituency' && <ConstituencyView />}
        {activeTab === 'voters' && <VotersView />}
        {activeTab === 'tasks' && <TasksView />}
        {activeTab === 'profile' && <ProfileView />}
      </View>

      {/* Primary 5-Tab Navigation Bar */}
      <CustomTabBar activeTab={activeTab} onTabPress={(tab) => setActiveTab(tab)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentArea: {
    flex: 1,
  },
});
