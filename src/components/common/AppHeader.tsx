import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useAuth } from '../../hooks/useAuth';
import { useAppTheme } from '../../hooks/useAppTheme';
import { useBackendStatus } from '../../hooks/useBackendStatus';
import { Badge } from './Badge';
import { RoleSwitcherModal } from './RoleSwitcherModal';
import { CampaignTypography } from '../../theme/typography';
import { CampaignSpacing, CampaignRadius } from '../../theme/spacing';

interface AppHeaderProps {
  title?: string;
  subtitle?: string;
  showRoleBadge?: boolean;
}

export function AppHeader({
  title = 'ChunavAi OS',
  subtitle,
  showRoleBadge = true,
}: AppHeaderProps) {
  const { role } = useAuth();
  const { colors, brandColors, isDark, toggleTheme } = useAppTheme();
  const { status: backendStatus, latencyMs } = useBackendStatus();
  const [isRoleModalVisible, setIsRoleModalVisible] = useState(false);

  const isBackendOnline = backendStatus === 'online';

  return (
    <View
      style={[
        styles.header,
        {
          backgroundColor: colors.surface,
          borderBottomColor: colors.border,
        },
      ]}
    >
      <View style={styles.topRow}>
        <View style={styles.titleSection}>
          <Text style={[styles.title, CampaignTypography.headlineSmall, { color: colors.text }]}>
            {title}
          </Text>
          {subtitle ? (
            <Text style={[styles.subtitle, CampaignTypography.bodySmall, { color: colors.textSecondary }]}>
              {subtitle}
            </Text>
          ) : (
            <View style={styles.backendStatusRow}>
              <View
                style={[
                  styles.statusDot,
                  { backgroundColor: isBackendOnline ? brandColors.emerald : brandColors.amber },
                ]}
              />
              <Text style={[styles.statusText, CampaignTypography.labelSmall, { color: colors.textMuted }]}>
                {isBackendOnline ? `Backend Live (${latencyMs ?? 0}ms)` : 'Connecting to chunavjsx...'}
              </Text>
            </View>
          )}
        </View>

        <View style={styles.actionRow}>
          {showRoleBadge && (
            <TouchableOpacity activeOpacity={0.7} onPress={() => setIsRoleModalVisible(true)}>
              <Badge role={role} size="md" />
            </TouchableOpacity>
          )}

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={toggleTheme}
            style={[styles.themeBtn, { backgroundColor: colors.surfaceVariant, borderColor: colors.border }]}
          >
            <Text style={{ fontSize: 13 }}>{isDark ? '☀️' : '🌙'}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <RoleSwitcherModal
        visible={isRoleModalVisible}
        onClose={() => setIsRoleModalVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: CampaignSpacing.lg,
    paddingTop: CampaignSpacing.md,
    paddingBottom: CampaignSpacing.md,
    borderBottomWidth: 1,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleSection: {
    flex: 1,
    paddingRight: CampaignSpacing.sm,
  },
  title: {
    fontWeight: '700',
  },
  subtitle: {
    marginTop: 2,
  },
  backendStatusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },
  statusText: {
    textTransform: 'none',
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: CampaignSpacing.sm,
  },
  themeBtn: {
    width: 34,
    height: 34,
    borderRadius: CampaignRadius.md,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
