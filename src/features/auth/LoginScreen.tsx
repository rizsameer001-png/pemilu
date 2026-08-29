import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import { useAuth } from '../../hooks/useAuth';
import { useAppTheme } from '../../hooks/useAppTheme';
import { useBackendStatus } from '../../hooks/useBackendStatus';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { CampaignTypography } from '../../theme/typography';
import { CampaignSpacing } from '../../theme/spacing';
import { UserRole } from '../../types/roles';

interface LoginScreenProps {
  onLoginSuccess?: () => void;
}

export function LoginScreen({ onLoginSuccess }: LoginScreenProps) {
  const { login, isLoading, error, clearError, switchRole } = useAuth();
  const { colors, brandColors } = useAppTheme();
  const { status: backendStatus, latencyMs } = useBackendStatus();

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [isOtpMode, setIsOtpMode] = useState(false);
  const [otp, setOtp] = useState('');

  const handleLogin = async () => {
    if (!identifier.trim()) return;
    const success = await login(identifier, isOtpMode ? undefined : password, isOtpMode ? otp : undefined);
    if (success && onLoginSuccess) {
      onLoginSuccess();
    }
  };

  const handleQuickRolePreview = (role: UserRole) => {
    switchRole(role);
    if (onLoginSuccess) {
      onLoginSuccess();
    }
  };

  const isBackendOnline = backendStatus === 'online';

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        {/* Brand Banner */}
        <View style={styles.brandHeader}>
          <View style={[styles.emblem, { backgroundColor: brandColors.primary }]}>
            <Text style={styles.emblemText}>🏛️</Text>
          </View>
          <Text style={[styles.appTitle, CampaignTypography.displayMedium, { color: colors.text }]}>
            ChunavAi OS
          </Text>
          <Text style={[styles.appSubtitle, CampaignTypography.bodyMedium, { color: colors.textSecondary }]}>
            Election Campaign Operating System
          </Text>

          {/* Live Backend Connection Indicator */}
          <View
            style={[
              styles.statusPill,
              { backgroundColor: isBackendOnline ? brandColors.emeraldLight : brandColors.amberLight },
            ]}
          >
            <View
              style={[
                styles.statusDot,
                { backgroundColor: isBackendOnline ? brandColors.emerald : brandColors.amber },
              ]}
            />
            <Text
              style={[
                CampaignTypography.labelSmall,
                { color: isBackendOnline ? brandColors.emeraldDark : brandColors.amberDark },
              ]}
            >
              {isBackendOnline ? `Live Backend: ${latencyMs ?? 0}ms` : 'Connecting to chunavjsx backend...'}
            </Text>
          </View>
        </View>

        {/* Login Card */}
        <Card style={styles.loginCard} elevation="medium">
          <Text style={[styles.cardTitle, CampaignTypography.headlineSmall, { color: colors.text }]}>
            Command Center Sign In
          </Text>
          <Text style={[styles.cardSubtitle, CampaignTypography.bodySmall, { color: colors.textSecondary }]}>
            Authenticate with your campaign credentials
          </Text>

          <View style={styles.formContainer}>
            <Input
              label="Phone or Email"
              placeholder="e.g. +91 98765 43210 or user@campaign.in"
              value={identifier}
              onChangeText={(val) => {
                setIdentifier(val);
                if (error) clearError();
              }}
              autoCapitalize="none"
              keyboardType="email-address"
            />

            {isOtpMode ? (
              <Input
                label="Verification OTP"
                placeholder="6-digit OTP code"
                value={otp}
                onChangeText={(val) => {
                  setOtp(val);
                  if (error) clearError();
                }}
                keyboardType="number-pad"
                maxLength={6}
              />
            ) : (
              <Input
                label="Password"
                placeholder="Enter your security password"
                value={password}
                onChangeText={(val) => {
                  setPassword(val);
                  if (error) clearError();
                }}
                secureTextEntry
              />
            )}

            <TouchableOpacity
              onPress={() => setIsOtpMode(!isOtpMode)}
              style={styles.switchAuthType}
            >
              <Text style={[CampaignTypography.labelSmall, { color: brandColors.primary }]}>
                {isOtpMode ? 'Use Password instead' : 'Log in with Mobile OTP'}
              </Text>
            </TouchableOpacity>

            {error && (
              <View style={[styles.errorBanner, { backgroundColor: brandColors.crimsonLight }]}>
                <Text style={[CampaignTypography.bodySmall, { color: brandColors.crimson, fontWeight: '500' }]}>
                  {error}
                </Text>
              </View>
            )}

            <Button
              title="Authenticate & Enter OS"
              onPress={handleLogin}
              loading={isLoading}
              style={styles.submitBtn}
            />
          </View>
        </Card>

        {/* Quick Role Perspective Exploration */}
        <Card style={styles.roleExploreCard} elevation="none">
          <Text style={[CampaignTypography.titleMedium, { color: colors.text }]}>
            Preview Role Perspectives
          </Text>
          <Text style={[CampaignTypography.bodySmall, { color: colors.textSecondary, marginBottom: CampaignSpacing.md }]}>
            Inspect the command center UI tailored for each campaign hierarchy level:
          </Text>

          <View style={styles.rolesGrid}>
            <TouchableOpacity
              style={styles.roleChip}
              onPress={() => handleQuickRolePreview('super_admin')}
            >
              <Badge role="super_admin" size="sm" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.roleChip}
              onPress={() => handleQuickRolePreview('candidate')}
            >
              <Badge role="candidate" size="sm" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.roleChip}
              onPress={() => handleQuickRolePreview('campaign_manager')}
            >
              <Badge role="campaign_manager" size="sm" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.roleChip}
              onPress={() => handleQuickRolePreview('volunteer')}
            >
              <Badge role="volunteer" size="sm" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.roleChip}
              onPress={() => handleQuickRolePreview('survey_intelligence')}
            >
              <Badge role="survey_intelligence" size="sm" />
            </TouchableOpacity>
          </View>
        </Card>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: CampaignSpacing.lg,
    paddingTop: CampaignSpacing.xxxl,
    paddingBottom: CampaignSpacing.huge,
    maxWidth: 540,
    alignSelf: 'center',
    width: '100%',
  },
  brandHeader: {
    alignItems: 'center',
    marginBottom: CampaignSpacing.xl,
  },
  emblem: {
    width: 64,
    height: 64,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: CampaignSpacing.md,
  },
  emblemText: {
    fontSize: 32,
  },
  appTitle: {
    textAlign: 'center',
    fontWeight: '800',
  },
  appSubtitle: {
    textAlign: 'center',
    marginTop: 4,
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    marginTop: CampaignSpacing.md,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },
  loginCard: {
    padding: CampaignSpacing.xl,
    marginBottom: CampaignSpacing.lg,
  },
  cardTitle: {
    fontWeight: '700',
  },
  cardSubtitle: {
    marginTop: 2,
    marginBottom: CampaignSpacing.lg,
  },
  formContainer: {
    width: '100%',
  },
  switchAuthType: {
    alignSelf: 'flex-end',
    marginBottom: CampaignSpacing.md,
    marginTop: -CampaignSpacing.xs,
  },
  errorBanner: {
    padding: CampaignSpacing.sm,
    borderRadius: 8,
    marginBottom: CampaignSpacing.md,
  },
  submitBtn: {
    marginTop: CampaignSpacing.xs,
  },
  roleExploreCard: {
    padding: CampaignSpacing.lg,
  },
  rolesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: CampaignSpacing.sm,
  },
  roleChip: {
    marginRight: CampaignSpacing.xs,
    marginBottom: CampaignSpacing.xs,
  },
});
