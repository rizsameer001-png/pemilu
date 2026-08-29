import React from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useAuth } from '../../hooks/useAuth';
import { useAppTheme } from '../../hooks/useAppTheme';
import { UserRole, ROLE_DEFINITIONS } from '../../types/roles';
import { CampaignTypography } from '../../theme/typography';
import { CampaignRadius, CampaignSpacing, CampaignElevation } from '../../theme/spacing';
import { Badge } from './Badge';

interface RoleSwitcherModalProps {
  visible: boolean;
  onClose: () => void;
}

const AVAILABLE_ROLES: UserRole[] = [
  'super_admin',
  'party',
  'candidate',
  'campaign_manager',
  'volunteer',
  'survey_intelligence',
];

export function RoleSwitcherModal({ visible, onClose }: RoleSwitcherModalProps) {
  const { role: currentRole, switchRole } = useAuth();
  const { colors, brandColors } = useAppTheme();

  const handleSelectRole = (newRole: UserRole) => {
    switchRole(newRole);
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View
          style={[
            styles.container,
            { backgroundColor: colors.surface, borderColor: colors.border },
            CampaignElevation.high,
          ]}
        >
          <View style={styles.header}>
            <View>
              <Text style={[CampaignTypography.headlineSmall, { color: colors.text }]}>
                Switch Command Role
              </Text>
              <Text style={[CampaignTypography.bodySmall, { color: colors.textSecondary }]}>
                View the OS from different command & field hierarchies
              </Text>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Text style={[CampaignTypography.labelLarge, { color: colors.textMuted }]}>✕</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.scrollList} contentContainerStyle={styles.scrollContent}>
            {AVAILABLE_ROLES.map((roleKey) => {
              const def = ROLE_DEFINITIONS[roleKey];
              const isSelected = currentRole === roleKey;

              return (
                <TouchableOpacity
                  key={roleKey}
                  activeOpacity={0.7}
                  onPress={() => handleSelectRole(roleKey)}
                  style={[
                    styles.roleItem,
                    {
                      backgroundColor: isSelected ? colors.surfaceVariant : colors.card,
                      borderColor: isSelected ? brandColors.primary : colors.border,
                      borderWidth: isSelected ? 2 : 1,
                    },
                  ]}
                >
                  <View style={styles.roleHeader}>
                    <Badge role={roleKey} size="md" />
                    {isSelected && (
                      <View style={[styles.activeTag, { backgroundColor: brandColors.emeraldLight }]}>
                        <Text style={[CampaignTypography.labelSmall, { color: brandColors.emerald, fontWeight: '700' }]}>
                          ACTIVE
                        </Text>
                      </View>
                    )}
                  </View>

                  <Text style={[CampaignTypography.titleMedium, { color: colors.text, marginTop: 6 }]}>
                    {def.label}
                  </Text>
                  <Text style={[CampaignTypography.bodySmall, { color: colors.textSecondary, marginTop: 2 }]}>
                    {def.description}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'flex-end',
  },
  container: {
    borderTopLeftRadius: CampaignRadius.xxl,
    borderTopRightRadius: CampaignRadius.xxl,
    maxHeight: '80%',
    paddingTop: CampaignSpacing.lg,
    borderWidth: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: CampaignSpacing.lg,
    paddingBottom: CampaignSpacing.md,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(150,150,150,0.1)',
  },
  closeBtn: {
    padding: 4,
  },
  scrollList: {
    paddingHorizontal: CampaignSpacing.lg,
  },
  scrollContent: {
    paddingVertical: CampaignSpacing.md,
    gap: CampaignSpacing.md,
  },
  roleItem: {
    padding: CampaignSpacing.md,
    borderRadius: CampaignRadius.lg,
  },
  roleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  activeTag: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: CampaignRadius.xs,
  },
});
