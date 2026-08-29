import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { useAppTheme } from '../../hooks/useAppTheme';
import { CampaignTypography } from '../../theme/typography';
import { CampaignSpacing, CampaignRadius } from '../../theme/spacing';
import { Button } from './Button';

interface ErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  style?: ViewStyle;
}

export function ErrorState({
  title = 'Sync Disruption',
  message,
  onRetry,
  style,
}: ErrorStateProps) {
  const { colors, brandColors } = useAppTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.card,
          borderColor: brandColors.crimson,
        },
        style,
      ]}
    >
      <View
        style={[
          styles.badge,
          { backgroundColor: brandColors.crimsonLight },
        ]}
      >
        <Text style={[CampaignTypography.labelSmall, { color: brandColors.crimson, fontWeight: '700' }]}>
          SYSTEM ALERT
        </Text>
      </View>

      <Text style={[styles.title, CampaignTypography.titleLarge, { color: colors.text }]}>
        {title}
      </Text>

      <Text style={[styles.message, CampaignTypography.bodyMedium, { color: colors.textSecondary }]}>
        {message}
      </Text>

      {onRetry && (
        <View style={styles.actionContainer}>
          <Button title="Retry Connection" variant="outline" onPress={onRetry} size="sm" />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: CampaignSpacing.lg,
    borderRadius: CampaignRadius.lg,
    borderLeftWidth: 4,
    borderWidth: 1,
    marginVertical: CampaignSpacing.md,
  },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: CampaignRadius.xs,
    marginBottom: CampaignSpacing.sm,
  },
  title: {
    marginBottom: CampaignSpacing.xs,
  },
  message: {
    lineHeight: 20,
  },
  actionContainer: {
    marginTop: CampaignSpacing.md,
    alignSelf: 'flex-start',
  },
});
