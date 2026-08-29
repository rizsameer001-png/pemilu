import { useAuthStore } from '../store/auth.store';
import {
  isCommandLevel,
  isManagerLevel,
  canManageVolunteers,
  canAccessIntelligence,
  canModifyConstituency,
  getRoleDescriptor,
} from '../utils/roleUtils';

export function useAuth() {
  const {
    user,
    token,
    role,
    isAuthenticated,
    isLoading,
    isInitialized,
    error,
    login,
    logout,
    switchRole,
    clearError,
  } = useAuthStore();

  const descriptor = getRoleDescriptor(role);

  return {
    user,
    token,
    role,
    roleDescriptor: descriptor,
    isAuthenticated,
    isLoading,
    isInitialized,
    error,
    login,
    logout,
    switchRole,
    clearError,

    // Role checks
    isSuperAdmin: role === 'super_admin',
    isParty: role === 'party',
    isCandidate: role === 'candidate',
    isCampaignManager: role === 'campaign_manager',
    isVolunteer: role === 'volunteer',
    isSurveyIntel: role === 'survey_intelligence',

    // Permission checks
    isCommandLevel: isCommandLevel(role),
    isManagerLevel: isManagerLevel(role),
    canManageVolunteers: canManageVolunteers(role),
    canAccessIntelligence: canAccessIntelligence(role),
    canModifyConstituency: canModifyConstituency(role),
  };
}
