import React from 'react';
import { Text, StyleSheet, ScrollView } from 'react-native';
import { useAuth } from '../../hooks/useAuth';
import { useAppTheme } from '../../hooks/useAppTheme';
import { Card } from '../../components/common/Card';
import { EmptyState } from '../../components/common/EmptyState';
import { CampaignTypography } from '../../theme/typography';
import { CampaignSpacing } from '../../theme/spacing';

export function TasksView() {
  const { isManagerLevel } = useAuth();
  const { colors, brandColors } = useAppTheme();

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]} contentContainerStyle={styles.content}>
      {/* Tasks Overview Card */}
      <Card style={styles.headerCard} elevation="low" accentBorderColor={brandColors.emerald}>
        <Text style={[CampaignTypography.labelSmall, { color: colors.textSecondary }]}>
          FIELD DISPATCH & COORDINATION
        </Text>
        <Text style={[CampaignTypography.headlineMedium, { color: colors.text, marginTop: 2 }]}>
          Campaign Operations & Tasks
        </Text>
        <Text style={[CampaignTypography.bodySmall, { color: colors.textSecondary, marginTop: 4 }]}>
          Coordinate rally prep, booth agent deployment, voter slip distribution, and ground surveys.
        </Text>
      </Card>

      {/* Actionable Empty State */}
      <EmptyState
        icon={<Text style={{ fontSize: 36 }}>📋</Text>}
        title="Field Task Queue"
        description="Connect with backend task management endpoints to assign work orders to volunteers and track completion status in real-time."
        actionLabel={isManagerLevel ? "Dispatch New Task" : "Check for Assignments"}
        onAction={() => {}}
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
  headerCard: {
    padding: CampaignSpacing.lg,
  },
});
