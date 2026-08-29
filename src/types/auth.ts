import { UserRole } from './roles';

export interface UserProfile {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  role: UserRole;
  rawRole?: string;
  constituencyId?: string;
  constituencyName?: string;
  partyName?: string;
  partySymbolUrl?: string;
  avatarUrl?: string;
  assignedBooths?: string[];
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface LoginCredentials {
  phoneOrEmail: string;
  password?: string;
  otp?: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken?: string;
  expiresIn?: number;
  tokenType?: string;
}

export interface AuthResponse {
  user: UserProfile;
  tokens: AuthTokens;
  message?: string;
}

export interface AuthState {
  user: UserProfile | null;
  token: string | null;
  refreshToken: string | null;
  role: UserRole;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}
