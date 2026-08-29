import React, { useState } from 'react';
import { Text, StyleSheet, ScrollView } from 'react-native';
import { useAuth } from '../../hooks/useAuth';
import { useAppTheme } from '../../hooks/useAppTheme';
import { Card } from '../../components/common/Card';
import { Input } from '../../components/common/Input';
import { EmptyState } from '../../components/common/EmptyState';
import { CampaignTypography } from '../../theme/typography';
import { CampaignSpacing } from '../../theme/spacing';

export function VotersView() {
  const { isVolunteer } = useAuth();
  const { colors, brandColors } = useAppTheme();
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]} contentContainerStyle={styles.content}>
      {/* Voter Roll Search Header */}
      <Card style={styles.headerCard} elevation="low" accentBorderColor={brandColors.accentSaffron}>
        <Text style={[CampaignTypography.labelSmall, { color: colors.textSecondary }]}>
          ELECTORAL ROLL OS
        </Text>
        <Text style={[CampaignTypography.headlineMedium, { color: colors.text, marginTop: 2 }]}>
          Voter Directory & Verification
        </Text>
        <Text style={[CampaignTypography.bodySmall, { color: colors.textSecondary, marginTop: 4 }]}>
          Direct voter slip generation, family grouping, and field status tagging.
        </Text>
      </Card>

      {/* Search Input */}
      <Input
        placeholder="Search by EPIC Voter ID, Name, Phone, or House #..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        leftIcon={<Text style={{ fontSize: 16 }}>🔍</Text>}
      />

      {/* Voter Roll Ready / Empty State */}
      <EmptyState
        icon={<Text style={{ fontSize: 36 }}>👥</Text>}
        title="Voter Registry Integration"
        description="Ready to fetch verified voter roll records from backend chunavjsx endpoints. Field agents can search voter IDs and mark field visits."
        actionLabel={isVolunteer ? "Scan Voter Slip" : "Sync Voter Database"}
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
