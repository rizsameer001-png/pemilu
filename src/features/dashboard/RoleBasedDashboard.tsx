import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useAuth } from '../../hooks/useAuth';
import { useAppTheme } from '../../hooks/useAppTheme';
import { useBackendStatus } from '../../hooks/useBackendStatus';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { CampaignTypography } from '../../theme/typography';
import { CampaignSpacing, CampaignRadius } from '../../theme/spacing';

interface RoleBasedDashboardProps {
  onNavigateToTab: (tab: 'constituency' | 'voters' | 'tasks' | 'profile') => void;
}

export function RoleBasedDashboard({ onNavigateToTab }: RoleBasedDashboardProps) {
  const { user, role, roleDescriptor, isSuperAdmin, isCandidate, isVolunteer, isSurveyIntel } = useAuth();
  const { colors, brandColors } = useAppTheme();
  const { status: backendStatus, latencyMs, refetch } = useBackendStatus();

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]} contentContainerStyle={styles.content}>
      {/* Active Commander Banner */}
      <Card style={styles.commanderCard} elevation="medium" accentBorderColor={roleDescriptor.badgeColor}>
        <View style={styles.roleBannerRow}>
          <View style={styles.commanderInfo}>
            <Text style={[CampaignTypography.labelSmall, { color: colors.textSecondary }]}>
              CAMPAIGN OS / COMMAND TIER
            </Text>
            <Text style={[CampaignTypography.headlineMedium, { color: colors.text, marginTop: 2 }]}>
              {user?.name || 'Campaign Officer'}
            </Text>
            <View style={styles.badgeRow}>
              <Badge role={role} size="md" />
              {user?.constituencyName && (
                <View style={[styles.constituencyPill, { backgroundColor: colors.surfaceVariant }]}>
                  <Text style={[CampaignTypography.labelSmall, { color: colors.textSecondary }]}>
                    📍 {user.constituencyName}
                  </Text>
                </View>
              )}
            </View>
          </View>
        </View>

        <Text style={[CampaignTypography.bodySmall, { color: colors.textSecondary, marginTop: CampaignSpacing.md }]}>
          {roleDescriptor.description}
        </Text>
      </Card>

      {/* Real Backend Status & Health Telemetry */}
      <Card style={styles.telemetryCard} elevation="low">
        <View style={styles.sectionHeader}>
          <Text style={[CampaignTypography.titleMedium, { color: colors.text }]}>
            Backend Telemetry
          </Text>
          <TouchableOpacity onPress={() => refetch()} style={styles.refreshBtn}>
            <Text style={[CampaignTypography.labelSmall, { color: brandColors.primary }]}>
              Ping Server 🔄
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.telemetryRow}>
          <View style={styles.telemetryItem}>
            <Text style={[CampaignTypography.labelSmall, { color: colors.textMuted }]}>STATUS</Text>
            <View style={styles.statusLine}>
              <View
                style={[
                  styles.statusDot,
                  { backgroundColor: backendStatus === 'online' ? brandColors.emerald : brandColors.amber },
                ]}
              />
              <Text
                style={[
                  CampaignTypography.labelLarge,
                  { color: backendStatus === 'online' ? brandColors.emerald : brandColors.amber },
                ]}
              >
                {backendStatus.toUpperCase()}
              </Text>
            </View>
          </View>

          <View style={styles.telemetryItem}>
            <Text style={[CampaignTypography.labelSmall, { color: colors.textMuted }]}>LATENCY</Text>
            <Text style={[CampaignTypography.labelLarge, { color: colors.text }]}>
              {latencyMs !== undefined ? `${latencyMs} ms` : '—'}
            </Text>
          </View>

          <View style={styles.telemetryItem}>
            <Text style={[CampaignTypography.labelSmall, { color: colors.textMuted }]}>HOST</Text>
            <Text style={[CampaignTypography.labelSmall, { color: colors.textSecondary, fontFamily: 'monospace' }]}>
              onrender.com
            </Text>
          </View>
        </View>
      </Card>

      {/* Role-Specific Command Actions */}
      <View style={styles.quickAccessSection}>
        <Text style={[CampaignTypography.titleMedium, { color: colors.text, marginBottom: CampaignSpacing.md }]}>
          {roleDescriptor.label} Operations
        </Text>

        <View style={styles.actionsGrid}>
          <TouchableOpacity
            style={[styles.actionCard, { backgroundColor: colors.card, borderColor: colors.border }]}
            onPress={() => onNavigateToTab('constituency')}
          >
            <Text style={styles.actionIcon}>🏛️</Text>
            <Text style={[CampaignTypography.titleSmall, { color: colors.text }]}>Constituency</Text>
            <Text style={[CampaignTypography.bodySmall, { color: colors.textMuted }]}>
              Booths, mapping & boundaries
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionCard, { backgroundColor: colors.card, borderColor: colors.border }]}
            onPress={() => onNavigateToTab('voters')}
          >
            <Text style={styles.actionIcon}>👥</Text>
            <Text style={[CampaignTypography.titleSmall, { color: colors.text }]}>Voter Roll</Text>
            <Text style={[CampaignTypography.bodySmall, { color: colors.textMuted }]}>
              Voter registry & verification
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionCard, { backgroundColor: colors.card, borderColor: colors.border }]}
            onPress={() => onNavigateToTab('tasks')}
          >
            <Text style={styles.actionIcon}>📋</Text>
            <Text style={[CampaignTypography.titleSmall, { color: colors.text }]}>Field Tasks</Text>
            <Text style={[CampaignTypography.bodySmall, { color: colors.textMuted }]}>
              Volunteer dispatch & tracking
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionCard, { backgroundColor: colors.card, borderColor: colors.border }]}
            onPress={() => onNavigateToTab('profile')}
          >
            <Text style={styles.actionIcon}>👤</Text>
            <Text style={[CampaignTypography.titleSmall, { color: colors.text }]}>OS Config</Text>
            <Text style={[CampaignTypography.bodySmall, { color: colors.textMuted }]}>
              Roles, theme & diagnostics
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Role Context Modules (No fake numbers - strictly clean actionable containers) */}
      {isSuperAdmin && (
        <Card style={styles.roleDetailCard} elevation="low">
          <Text style={[CampaignTypography.titleMedium, { color: colors.text }]}>
            Super Admin Control Center
          </Text>
          <Text style={[CampaignTypography.bodySmall, { color: colors.textSecondary, marginTop: 4 }]}>
            Global telemetry, tenant isolation, and backend orchestration ready. Connect with backend campaign endpoints to populate multi-state tenant streams.
          </Text>
        </Card>
      )}

      {isCandidate && (
        <Card style={styles.roleDetailCard} elevation="low">
          <Text style={[CampaignTypography.titleMedium, { color: colors.text }]}>
            Candidate War Room
          </Text>
          <Text style={[CampaignTypography.bodySmall, { color: colors.textSecondary, marginTop: 4 }]}>
            Constituency-wide real-time reporting center. Use the Voters module to view ground booth coverage and the Tasks module to coordinate key campaign events.
          </Text>
        </Card>
      )}

      {isVolunteer && (
        <Card style={styles.roleDetailCard} elevation="low">
          <Text style={[CampaignTypography.titleMedium, { color: colors.text }]}>
            Field Volunteer Ground Dispatch
          </Text>
          <Text style={[CampaignTypography.bodySmall, { color: colors.textSecondary, marginTop: 4 }]}>
            Door-to-door voter verification kit. Use the Voters search and Booth list to mark voter presence and distribute official slips.
          </Text>
        </Card>
      )}

      {isSurveyIntel && (
        <Card style={styles.roleDetailCard} elevation="low">
          <Text style={[CampaignTypography.titleMedium, { color: colors.text }]}>
            Survey & Ground Intelligence OS
          </Text>
          <Text style={[CampaignTypography.bodySmall, { color: colors.textSecondary, marginTop: 4 }]}>
            Ground sentiment polling, voter issue cataloging, and swing booth analytics feed ready.
          </Text>
        </Card>
      )}
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
    gap: CampaignSpacing.lg,
    maxWidth: 600,
    alignSelf: 'center',
    width: '100%',
  },
  commanderCard: {
    padding: CampaignSpacing.lg,
  },
  roleBannerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  commanderInfo: {
    flex: 1,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: CampaignSpacing.sm,
    marginTop: CampaignSpacing.sm,
  },
  constituencyPill: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: CampaignRadius.xs,
  },
  telemetryCard: {
    padding: CampaignSpacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: CampaignSpacing.md,
  },
  refreshBtn: {
    padding: 4,
  },
  telemetryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  telemetryItem: {
    flex: 1,
  },
  statusLine: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  quickAccessSection: {
    width: '100%',
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: CampaignSpacing.md,
  },
  actionCard: {
    width: '47.5%',
    padding: CampaignSpacing.md,
    borderRadius: CampaignRadius.lg,
    borderWidth: 1,
  },
  actionIcon: {
    fontSize: 24,
    marginBottom: CampaignSpacing.xs,
  },
  roleDetailCard: {
    padding: CampaignSpacing.lg,
  },
});
