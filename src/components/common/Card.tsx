import React from 'react';
import { View, StyleSheet, ViewProps } from 'react-native';
import { useAppTheme } from '../../hooks/useAppTheme';
import { CampaignRadius, CampaignElevation, CampaignSpacing } from '../../theme/spacing';

interface CardProps extends ViewProps {
  elevation?: 'none' | 'low' | 'medium' | 'high';
  accentBorderColor?: string;
  noPadding?: boolean;
}

export function Card({
  children,
  elevation = 'low',
  accentBorderColor,
  noPadding = false,
  style,
  ...rest
}: CardProps) {
  const { colors } = useAppTheme();

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.card,
          borderColor: accentBorderColor || colors.cardBorder,
          borderLeftColor: accentBorderColor || colors.cardBorder,
          borderLeftWidth: accentBorderColor ? 4 : 1,
          padding: noPadding ? 0 : CampaignSpacing.lg,
        },
        CampaignElevation[elevation],
        style,
      ]}
      {...rest}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: CampaignRadius.lg,
    borderWidth: 1,
    overflow: 'hidden',
  },
});
