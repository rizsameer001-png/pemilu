import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useAuth } from '../../hooks/useAuth';
import { useAppTheme } from '../../hooks/useAppTheme';
import { useBackendStatus } from '../../hooks/useBackendStatus';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { RoleSwitcherModal } from '../../components/common/RoleSwitcherModal';
import { CampaignTypography } from '../../theme/typography';
import { CampaignSpacing, CampaignRadius } from '../../theme/spacing';

export function ProfileView() {
  const { user, role, roleDescriptor, logout } = useAuth();
  const { colors, brandColors, mode, setMode } = useAppTheme();
  const { status: backendStatus, baseUrl, latencyMs, refetch } = useBackendStatus();
  const [isRoleModalVisible, setIsRoleModalVisible] = useState(false);

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]} contentContainerStyle={styles.content}>
      {/* Officer ID Profile Card */}
      <Card style={styles.profileCard} elevation="medium" accentBorderColor={roleDescriptor.badgeColor}>
        <View style={styles.avatarRow}>
          <View style={[styles.avatar, { backgroundColor: roleDescriptor.badgeColor }]}>
            <Text style={styles.avatarText}>
              {(user?.name || 'User').charAt(0).toUpperCase()}
            </Text>
          </View>
          <View style={styles.profileTextContainer}>
            <Text style={[CampaignTypography.headlineSmall, { color: colors.text }]}>
              {user?.name || 'Campaign Officer'}
            </Text>
            <Text style={[CampaignTypography.bodySmall, { color: colors.textSecondary }]}>
              {user?.email || user?.phone || 'chunav-officer@campaign.in'}
            </Text>
            <View style={styles.badgeWrap}>
              <Badge role={role} size="md" />
            </View>
          </View>
        </View>

        <View style={[styles.divider, { backgroundColor: colors.divider }]} />

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setIsRoleModalVisible(true)}
          style={[styles.switchRoleBtn, { backgroundColor: colors.surfaceVariant }]}
        >
          <Text style={[CampaignTypography.labelMedium, { color: brandColors.primary }]}>
            ⚙️ Change Active Command Role
          </Text>
          <Text style={[CampaignTypography.labelSmall, { color: colors.textMuted }]}>
            {roleDescriptor.label} ❯
          </Text>
        </TouchableOpacity>
      </Card>

      {/* OS & Display Theme Settings */}
      <Card style={styles.settingsCard} elevation="low">
        <Text style={[CampaignTypography.titleMedium, { color: colors.text, marginBottom: CampaignSpacing.md }]}>
          Theme & Display Preferences
        </Text>

        <View style={styles.themeSelector}>
          {(['system', 'light', 'dark'] as const).map((tMode) => {
            const isSelected = mode === tMode;
            return (
              <TouchableOpacity
                key={tMode}
                activeOpacity={0.7}
                onPress={() => setMode(tMode)}
                style={[
                  styles.themeOption,
                  {
                    backgroundColor: isSelected ? brandColors.primary : colors.surfaceVariant,
                    borderColor: isSelected ? brandColors.primary : colors.border,
                  },
                ]}
              >
                <Text
                  style={[
                    CampaignTypography.labelMedium,
                    { color: isSelected ? '#FFFFFF' : colors.text, textTransform: 'capitalize' },
                  ]}
                >
                  {tMode}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </Card>

      {/* Backend & Security Diagnostics */}
      <Card style={styles.settingsCard} elevation="low">
        <View style={styles.sectionHeader}>
          <Text style={[CampaignTypography.titleMedium, { color: colors.text }]}>
            Backend Diagnostics
          </Text>
          <TouchableOpacity onPress={() => refetch()}>
            <Text style={[CampaignTypography.labelSmall, { color: brandColors.primary }]}>
              Check 🔄
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.diagnosticRow}>
          <Text style={[CampaignTypography.bodySmall, { color: colors.textSecondary }]}>Host Base URL</Text>
          <Text style={[CampaignTypography.bodySmall, { color: colors.text, fontFamily: 'monospace' }]}>
            {baseUrl}
          </Text>
        </View>

        <View style={styles.diagnosticRow}>
          <Text style={[CampaignTypography.bodySmall, { color: colors.textSecondary }]}>Server Status</Text>
          <Badge
            variant={backendStatus === 'online' ? 'success' : 'warning'}
            label={backendStatus.toUpperCase()}
            size="sm"
          />
        </View>

        <View style={styles.diagnosticRow}>
          <Text style={[CampaignTypography.bodySmall, { color: colors.textSecondary }]}>Response Latency</Text>
          <Text style={[CampaignTypography.bodySmall, { color: colors.text }]}>
            {latencyMs !== undefined ? `${latencyMs} ms` : '—'}
          </Text>
        </View>
      </Card>

      {/* Logout Action */}
      <Button
        title="Sign Out from Command Center"
        variant="danger"
        onPress={() => logout()}
        style={{ marginTop: CampaignSpacing.sm }}
      />

      <RoleSwitcherModal
        visible={isRoleModalVisible}
        onClose={() => setIsRoleModalVisible(false)}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: CampaignSpacing.lg,
    paddingBottom: CampaignSpacing.xxxl,
    gap: CampaignSpacing.md,
    maxWidth: 600,
    alignSelf: 'center',
    width: '100%',
  },
  profileCard: {
    padding: CampaignSpacing.lg,
  },
  avatarRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: CampaignSpacing.md,
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '700',
  },
  profileTextContainer: {
    flex: 1,
  },
  badgeWrap: {
    marginTop: CampaignSpacing.xs,
  },
  divider: {
    height: 1,
    marginVertical: CampaignSpacing.md,
  },
  switchRoleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: CampaignSpacing.md,
    borderRadius: CampaignRadius.md,
  },
  settingsCard: {
    padding: CampaignSpacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: CampaignSpacing.md,
  },
  themeSelector: {
    flexDirection: 'row',
    gap: CampaignSpacing.sm,
  },
  themeOption: {
    flex: 1,
    paddingVertical: CampaignSpacing.sm,
    borderRadius: CampaignRadius.md,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  diagnosticRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: CampaignSpacing.xs,
  },
});
