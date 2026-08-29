import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { UserRole } from '../../types/roles';
import { getRoleDescriptor } from '../../utils/roleUtils';
import { CampaignTypography } from '../../theme/typography';
import { CampaignRadius } from '../../theme/spacing';

interface BadgeProps {
  label?: string;
  role?: UserRole;
  variant?: 'role' | 'success' | 'warning' | 'danger' | 'info' | 'neutral';
  size?: 'sm' | 'md';
  style?: ViewStyle;
}

export function Badge({ label, role, variant = 'neutral', size = 'md', style }: BadgeProps) {
  let bgColor = '#E2E8F0';
  let textColor = '#334155';
  let text = label || 'Badge';

  if (role) {
    const descriptor = getRoleDescriptor(role);
    bgColor = descriptor.badgeColor;
    textColor = descriptor.badgeTextColor;
    text = label || descriptor.shortLabel;
  } else {
    switch (variant) {
      case 'success':
        bgColor = '#DCFCE7';
        textColor = '#166534';
        break;
      case 'warning':
        bgColor = '#FEF3C7';
        textColor = '#92400E';
        break;
      case 'danger':
        bgColor = '#FEE2E2';
        textColor = '#991B1B';
        break;
      case 'info':
        bgColor = '#DBEAFE';
        textColor = '#1E40AF';
        break;
      default:
        bgColor = '#F1F5F9';
        textColor = '#475569';
    }
  }

  const isSmall = size === 'sm';

  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor: bgColor,
          paddingHorizontal: isSmall ? 6 : 10,
          paddingVertical: isSmall ? 2 : 4,
        },
        style,
      ]}
    >
      <Text
        style={[
          styles.badgeText,
          isSmall ? CampaignTypography.labelSmall : CampaignTypography.labelMedium,
          { color: textColor },
        ]}
        numberOfLines={1}
      >
        {text}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    borderRadius: CampaignRadius.round,
    alignSelf: 'flex-start',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    fontWeight: '700',
  },
});
