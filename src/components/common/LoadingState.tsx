import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet, ViewStyle } from 'react-native';
import { useAppTheme } from '../../hooks/useAppTheme';
import { CampaignTypography } from '../../theme/typography';
import { CampaignSpacing } from '../../theme/spacing';

interface LoadingStateProps {
  message?: string;
  subtext?: string;
  style?: ViewStyle;
}

export function LoadingState({ message = 'Loading campaign telemetry...', subtext, style }: LoadingStateProps) {
  const { colors, brandColors } = useAppTheme();

  return (
    <View style={[styles.container, style]}>
      <ActivityIndicator size="large" color={brandColors.primary} />
      <Text style={[styles.message, CampaignTypography.titleMedium, { color: colors.text }]}>
        {message}
      </Text>
      {subtext && (
        <Text style={[styles.subtext, CampaignTypography.bodySmall, { color: colors.textSecondary }]}>
          {subtext}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: CampaignSpacing.xxl,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 180,
  },
  message: {
    marginTop: CampaignSpacing.lg,
    textAlign: 'center',
  },
  subtext: {
    marginTop: CampaignSpacing.xs,
    textAlign: 'center',
  },
});
