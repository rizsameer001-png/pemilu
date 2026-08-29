import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { useAppTheme } from '../../hooks/useAppTheme';
import { CampaignTypography } from '../../theme/typography';
import { CampaignElevation } from '../../theme/spacing';

export type TabKey = 'dashboard' | 'constituency' | 'voters' | 'tasks' | 'profile';

interface CustomTabBarProps {
  activeTab: TabKey;
  onTabPress: (tab: TabKey) => void;
}

interface TabItem {
  key: TabKey;
  label: string;
  icon: string;
}

const TABS: TabItem[] = [
  { key: 'dashboard', label: 'Command', icon: '📊' },
  { key: 'constituency', label: 'Constituency', icon: '🏛️' },
  { key: 'voters', label: 'Voters', icon: '👥' },
  { key: 'tasks', label: 'Tasks', icon: '📋' },
  { key: 'profile', label: 'Profile', icon: '👤' },
];

export function CustomTabBar({ activeTab, onTabPress }: CustomTabBarProps) {
  const { colors, brandColors } = useAppTheme();

  return (
    <View
      style={[
        styles.bar,
        {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
        },
        CampaignElevation.medium,
      ]}
    >
      {TABS.map((tab) => {
        const isActive = activeTab === tab.key;

        return (
          <TouchableOpacity
            key={tab.key}
            activeOpacity={0.7}
            onPress={() => onTabPress(tab.key)}
            style={styles.tabButton}
          >
            <View
              style={[
                styles.iconContainer,
                isActive && {
                  backgroundColor: brandColors.primaryContainerLight,
                },
              ]}
            >
              <Text style={{ fontSize: 18 }}>{tab.icon}</Text>
            </View>

            <Text
              style={[
                styles.tabLabel,
                CampaignTypography.labelSmall,
                {
                  color: isActive ? colors.text : colors.textMuted,
                  fontWeight: isActive ? '700' : '500',
                },
              ]}
              numberOfLines={1}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    height: Platform.select({ ios: 78, android: 68, default: 68 }),
    paddingBottom: Platform.select({ ios: 20, default: 8 }),
    paddingTop: 6,
    borderTopWidth: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 2,
  },
  iconContainer: {
    width: 42,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 2,
  },
  tabLabel: {
    letterSpacing: 0.2,
    fontSize: 11,
  },
});
