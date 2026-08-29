import React from 'react';
import { View, Text, TextInput, TextInputProps, StyleSheet, ViewStyle } from 'react-native';
import { useAppTheme } from '../../hooks/useAppTheme';
import { CampaignTypography } from '../../theme/typography';
import { CampaignRadius, CampaignSpacing } from '../../theme/spacing';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string | null;
  helperText?: string;
  containerStyle?: ViewStyle;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export function Input({
  label,
  error,
  helperText,
  containerStyle,
  leftIcon,
  rightIcon,
  style,
  ...rest
}: InputProps) {
  const { colors, brandColors } = useAppTheme();

  const borderColor = error ? brandColors.crimson : colors.inputBorder;

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Text style={[styles.label, CampaignTypography.labelMedium, { color: colors.textSecondary }]}>
          {label}
        </Text>
      )}

      <View
        style={[
          styles.inputWrapper,
          {
            backgroundColor: colors.inputBg,
            borderColor,
          },
        ]}
      >
        {leftIcon && <View style={styles.iconContainer}>{leftIcon}</View>}

        <TextInput
          placeholderTextColor={colors.textMuted}
          style={[
            styles.input,
            CampaignTypography.bodyMedium,
            { color: colors.text },
            style,
          ]}
          {...rest}
        />

        {rightIcon && <View style={styles.iconContainer}>{rightIcon}</View>}
      </View>

      {error ? (
        <Text style={[styles.errorText, CampaignTypography.labelSmall, { color: brandColors.crimson }]}>
          {error}
        </Text>
      ) : helperText ? (
        <Text style={[styles.helperText, CampaignTypography.labelSmall, { color: colors.textMuted }]}>
          {helperText}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: CampaignSpacing.md,
    width: '100%',
  },
  label: {
    marginBottom: CampaignSpacing.xs,
    fontWeight: '600',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderRadius: CampaignRadius.md,
    height: 48,
    paddingHorizontal: CampaignSpacing.md,
  },
  input: {
    flex: 1,
    height: '100%',
  },
  iconContainer: {
    marginRight: CampaignSpacing.sm,
  },
  errorText: {
    marginTop: CampaignSpacing.xs,
    fontWeight: '500',
  },
  helperText: {
    marginTop: CampaignSpacing.xs,
  },
});
