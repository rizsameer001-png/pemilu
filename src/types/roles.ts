/**
 * Typed Role Definitions for ChunavAi Election Campaign OS
 * Supports flexible backend role identifiers with safe parsing and type-guards.
 */

export type UserRole =
  | 'super_admin'
  | 'party'
  | 'candidate'
  | 'campaign_manager'
  | 'volunteer'
  | 'survey_intelligence'
  | 'unknown';

export interface RoleDescriptor {
  key: UserRole;
  label: string;
  shortLabel: string;
  description: string;
  badgeColor: string;
  badgeTextColor: string;
  hierarchyLevel: number;
}

export const ROLE_DEFINITIONS: Record<UserRole, RoleDescriptor> = {
  super_admin: {
    key: 'super_admin',
    label: 'Super Admin',
    shortLabel: 'Admin',
    description: 'Full system orchestration, tenant provisioning, and global telemetry',
    badgeColor: '#7C3AED',
    badgeTextColor: '#FFFFFF',
    hierarchyLevel: 100,
  },
  party: {
    key: 'party',
    label: 'Party High Command',
    shortLabel: 'Party',
    description: 'State/National party strategic oversight and multi-constituency tracking',
    badgeColor: '#1D4ED8',
    badgeTextColor: '#FFFFFF',
    hierarchyLevel: 80,
  },
  candidate: {
    key: 'candidate',
    label: 'Candidate',
    shortLabel: 'Candidate',
    description: 'Constituency command center, personal schedule, and key voter outreach',
    badgeColor: '#EA580C',
    badgeTextColor: '#FFFFFF',
    hierarchyLevel: 70,
  },
  campaign_manager: {
    key: 'campaign_manager',
    label: 'Campaign Manager',
    shortLabel: 'Manager',
    description: 'Field operations, booth management, volunteer dispatch, and resource control',
    badgeColor: '#0D9488',
    badgeTextColor: '#FFFFFF',
    hierarchyLevel: 50,
  },
  volunteer: {
    key: 'volunteer',
    label: 'Ground Volunteer',
    shortLabel: 'Volunteer',
    description: 'Door-to-door voter verification, slip distribution, and ground reporting',
    badgeColor: '#059669',
    badgeTextColor: '#FFFFFF',
    hierarchyLevel: 20,
  },
  survey_intelligence: {
    key: 'survey_intelligence',
    label: 'Survey & Intelligence',
    shortLabel: 'Intel/Survey',
    description: 'Voter sentiment tracking, swing analysis, and ground intelligence polling',
    badgeColor: '#DB2777',
    badgeTextColor: '#FFFFFF',
    hierarchyLevel: 40,
  },
  unknown: {
    key: 'unknown',
    label: 'Unassigned Role',
    shortLabel: 'Member',
    description: 'General access awaiting specific campaign role assignment',
    badgeColor: '#6B7280',
    badgeTextColor: '#FFFFFF',
    hierarchyLevel: 0,
  },
};

/**
 * Normalizes any backend role string to standard UserRole
 */
export function normalizeRole(roleInput?: string | null): UserRole {
  if (!roleInput || typeof roleInput !== 'string') return 'unknown';

  const sanitized = roleInput.trim().toLowerCase().replace(/[\s\-_]+/g, '_');

  if (sanitized.includes('super') && sanitized.includes('admin')) return 'super_admin';
  if (sanitized === 'superadmin' || sanitized === 'admin') return 'super_admin';
  if (sanitized === 'party' || sanitized === 'party_admin' || sanitized === 'party_head') return 'party';
  if (sanitized === 'candidate' || sanitized === 'mla' || sanitized === 'mp' || sanitized === 'leader') return 'candidate';
  if (sanitized.includes('manager') || sanitized === 'campaign_manager' || sanitized === 'war_room') return 'campaign_manager';
  if (sanitized.includes('volunteer') || sanitized === 'karyakarta' || sanitized === 'worker' || sanitized === 'field_agent') return 'volunteer';
  if (sanitized.includes('survey') || sanitized.includes('intelligence') || sanitized.includes('intel') || sanitized === 'analyst') return 'survey_intelligence';

  return 'unknown';
}
