import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNetworkStatus } from '../../hooks/useNetworkStatus';
import { CampaignTypography } from '../../theme/typography';
import { CampaignSpacing } from '../../theme/spacing';

export function OfflineNotice() {
  const { isOffline } = useNetworkStatus();

  if (!isOffline) return null;

  return (
    <View style={styles.banner}>
      <Text style={[styles.text, CampaignTypography.labelMedium]}>
        Working Offline — Cached campaign data enabled
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    backgroundColor: '#DC2626',
    paddingVertical: CampaignSpacing.xs,
    paddingHorizontal: CampaignSpacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  text: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});
