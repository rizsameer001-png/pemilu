import { UserRole } from './roles';

export interface Constituency {
  id: string;
  code?: string;
  name: string;
  state?: string;
  district?: string;
  type?: 'Assembly' | 'Parliamentary' | 'Municipal';
  totalBooths?: number;
  totalVoters?: number;
  criticalBoothsCount?: number;
}

export interface VoterRecord {
  id: string;
  voterIdNumber?: string;
  fullName: string;
  relativeName?: string;
  relationType?: 'Father' | 'Husband' | 'Mother' | 'Other';
  age?: number;
  gender?: 'Male' | 'Female' | 'Other';
  boothNumber?: string;
  boothName?: string;
  sectionNumber?: string;
  houseNumber?: string;
  phone?: string;
  address?: string;
  votingStatus?: 'unmarked' | 'voted' | 'shifted' | 'deceased' | 'absent';
  supportStatus?: 'favorable' | 'neutral' | 'unfavorable' | 'undecided';
  category?: string;
  notes?: string;
}

export interface CampaignTask {
  id: string;
  title: string;
  description?: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  assignedToUserId?: string;
  assignedToName?: string;
  assignedRole?: UserRole;
  boothId?: string;
  dueDate?: string;
  createdAt?: string;
}

export interface GroundIntelSurvey {
  id: string;
  title: string;
  boothNumber?: string;
  sampleSize?: number;
  keyIssues?: string[];
  sentimentScore?: number;
  createdAt?: string;
}
