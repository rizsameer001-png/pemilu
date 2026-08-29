import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { useAppTheme } from '../../hooks/useAppTheme';
import { CampaignTypography } from '../../theme/typography';
import { CampaignSpacing, CampaignRadius } from '../../theme/spacing';
import { Button } from './Button';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  style?: ViewStyle;
}

export function EmptyState({
  icon,
  title,
  description,
  actionLabel,
  onAction,
  style,
}: EmptyStateProps) {
  const { colors } = useAppTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.surfaceVariant,
          borderColor: colors.border,
        },
        style,
      ]}
    >
      {icon && <View style={styles.iconWrapper}>{icon}</View>}

      <Text style={[styles.title, CampaignTypography.titleLarge, { color: colors.text }]}>
        {title}
      </Text>

      <Text style={[styles.description, CampaignTypography.bodyMedium, { color: colors.textSecondary }]}>
        {description}
      </Text>

      {actionLabel && onAction && (
        <View style={styles.actionContainer}>
          <Button title={actionLabel} onPress={onAction} size="sm" />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: CampaignSpacing.xxl,
    borderRadius: CampaignRadius.xl,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: CampaignSpacing.md,
  },
  iconWrapper: {
    marginBottom: CampaignSpacing.md,
    opacity: 0.8,
  },
  title: {
    textAlign: 'center',
    marginBottom: CampaignSpacing.xs,
  },
  description: {
    textAlign: 'center',
    maxWidth: 320,
    lineHeight: 20,
  },
  actionContainer: {
    marginTop: CampaignSpacing.lg,
  },
});
