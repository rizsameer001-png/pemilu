import React, { useState } from 'react';
import { Text, StyleSheet, ScrollView } from 'react-native';
import { useAuth } from '../../hooks/useAuth';
import { useAppTheme } from '../../hooks/useAppTheme';
import { Card } from '../../components/common/Card';
import { Input } from '../../components/common/Input';
import { EmptyState } from '../../components/common/EmptyState';
import { CampaignTypography } from '../../theme/typography';
import { CampaignSpacing } from '../../theme/spacing';

export function ConstituencyView() {
  const { user, canModifyConstituency } = useAuth();
  const { colors, brandColors } = useAppTheme();
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]} contentContainerStyle={styles.content}>
      {/* Constituency Header Card */}
      <Card style={styles.headerCard} elevation="low" accentBorderColor={brandColors.primary}>
        <Text style={[CampaignTypography.labelSmall, { color: colors.textSecondary }]}>
          CONSTITUENCY JURISDICTION
        </Text>
        <Text style={[CampaignTypography.headlineMedium, { color: colors.text, marginTop: 2 }]}>
          {user?.constituencyName || 'Central Assembly (AC-042)'}
        </Text>
        <Text style={[CampaignTypography.bodySmall, { color: colors.textSecondary, marginTop: 4 }]}>
          Legislative Assembly Constituency • State Election Commission Registry
        </Text>
      </Card>

      {/* Search & Filter Bar */}
      <Input
        placeholder="Search booths by number, school, or landmark..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        leftIcon={<Text style={{ fontSize: 16 }}>🔍</Text>}
      />

      {/* Booths Directory Foundation */}
      <EmptyState
        icon={<Text style={{ fontSize: 36 }}>🏛️</Text>}
        title="Polling Booth Data Stream"
        description="Connect with the backend polling booth API to synchronize live voter lists, sensitive booth flags, and agent deployment."
        actionLabel={canModifyConstituency ? "Configure Booth Allocation" : "Refresh Registry"}
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
