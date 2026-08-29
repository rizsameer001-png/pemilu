import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
  ViewStyle,
  TextStyle,
  TouchableOpacityProps,
} from 'react-native';
import { useAppTheme } from '../../hooks/useAppTheme';
import { CampaignTypography } from '../../theme/typography';
import { CampaignRadius, CampaignSpacing, CampaignElevation } from '../../theme/spacing';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'surface';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export function Button({
  title,
  variant = 'primary',
  size = 'md',
  loading = false,
  leftIcon,
  rightIcon,
  disabled,
  style,
  textStyle,
  ...rest
}: ButtonProps) {
  const { colors, brandColors } = useAppTheme();

  let bgColor: string = brandColors.primary;
  let textColor = '#FFFFFF';
  let borderColor = 'transparent';
  let borderWidth = 0;

  switch (variant) {
    case 'secondary':
      bgColor = brandColors.accentSaffron;
      textColor = '#FFFFFF';
      break;
    case 'outline':
      bgColor = 'transparent';
      textColor = colors.text;
      borderColor = colors.borderStrong;
      borderWidth = 1.5;
      break;
    case 'danger':
      bgColor = brandColors.crimson;
      textColor = '#FFFFFF';
      break;
    case 'surface':
      bgColor = colors.surfaceVariant;
      textColor = colors.text;
      borderColor = colors.border;
      borderWidth = 1;
      break;
    case 'primary':
    default:
      bgColor = brandColors.primary;
      textColor = '#FFFFFF';
      break;
  }

  const height = size === 'sm' ? 36 : size === 'lg' ? 52 : 44;
  const paddingHorizontal = size === 'sm' ? CampaignSpacing.md : size === 'lg' ? CampaignSpacing.xxl : CampaignSpacing.lg;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={disabled || loading}
      style={[
        styles.button,
        {
          backgroundColor: bgColor,
          borderColor,
          borderWidth,
          height,
          paddingHorizontal,
          opacity: disabled ? 0.5 : 1,
        },
        variant === 'primary' || variant === 'secondary' ? CampaignElevation.low : {},
        style,
      ]}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator size="small" color={textColor} />
      ) : (
        <>
          {leftIcon && <>{leftIcon}</>}
          <Text
            style={[
              styles.text,
              size === 'sm' ? CampaignTypography.labelMedium : CampaignTypography.labelLarge,
              { color: textColor, marginLeft: leftIcon ? 8 : 0, marginRight: rightIcon ? 8 : 0 },
              textStyle,
            ]}
          >
            {title}
          </Text>
          {rightIcon && <>{rightIcon}</>}
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: CampaignRadius.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 80,
  },
  text: {
    fontWeight: '600',
    textAlign: 'center',
  },
});
