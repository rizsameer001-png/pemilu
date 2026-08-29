import { UserRole, ROLE_DEFINITIONS } from '../types/roles';

export function getRoleDescriptor(role: UserRole) {
  return ROLE_DEFINITIONS[role] || ROLE_DEFINITIONS.unknown;
}

export function isCommandLevel(role: UserRole): boolean {
  return role === 'super_admin' || role === 'party' || role === 'candidate';
}

export function isManagerLevel(role: UserRole): boolean {
  return isCommandLevel(role) || role === 'campaign_manager';
}

export function canManageVolunteers(role: UserRole): boolean {
  return isManagerLevel(role);
}

export function canAccessIntelligence(role: UserRole): boolean {
  return isManagerLevel(role) || role === 'survey_intelligence';
}

export function canModifyConstituency(role: UserRole): boolean {
  return role === 'super_admin' || role === 'party' || role === 'candidate';
}
