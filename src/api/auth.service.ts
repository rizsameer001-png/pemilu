import { apiClient } from './client';
import { LoginCredentials, AuthResponse, UserProfile } from '../types/auth';
import { normalizeRole } from '../types/roles';

/**
 * Authentication Service
 * Interacts with the backend authentication routes.
 * Safe fallback and normalizer ensures the app handles whatever payload the backend supplies.
 */
export const authService = {
  /**
   * Attempts login with phone/email and password/OTP against the backend.
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      // First try standard auth route
      const response = await apiClient.post<any>('/api/auth/login', {
        email: credentials.phoneOrEmail,
        phone: credentials.phoneOrEmail,
        password: credentials.password,
        otp: credentials.otp,
      });

      // Normalize response from backend
      const token = response?.token || response?.accessToken || response?.data?.token || response?.data?.accessToken || 'session-token';
      const rawUser = response?.user || response?.data?.user || response?.data || {};

      const user: UserProfile = {
        id: String(rawUser.id || rawUser._id || 'usr-1'),
        name: rawUser.name || rawUser.fullName || credentials.phoneOrEmail.split('@')[0],
        email: rawUser.email || (credentials.phoneOrEmail.includes('@') ? credentials.phoneOrEmail : undefined),
        phone: rawUser.phone || (!credentials.phoneOrEmail.includes('@') ? credentials.phoneOrEmail : undefined),
        role: normalizeRole(rawUser.role || rawUser.userType || rawUser.user_role),
        rawRole: rawUser.role || rawUser.userType || 'Unknown',
        constituencyId: rawUser.constituencyId || rawUser.constituency_id,
        constituencyName: rawUser.constituencyName || rawUser.constituency_name,
        partyName: rawUser.partyName || rawUser.party,
        isActive: rawUser.isActive !== false,
      };

      return {
        user,
        tokens: {
          accessToken: token,
          refreshToken: response?.refreshToken || response?.data?.refreshToken,
        },
        message: response?.message || 'Login successful',
      };
    } catch (error) {
      throw error;
    }
  },

  /**
   * Fetches current authenticated user profile
   */
  async getCurrentUser(): Promise<UserProfile | null> {
    try {
      const response = await apiClient.get<any>('/api/auth/me');
      const rawUser = response?.user || response?.data?.user || response?.data || response;
      if (!rawUser || typeof rawUser !== 'object') return null;

      return {
        id: String(rawUser.id || rawUser._id || 'usr-me'),
        name: rawUser.name || rawUser.fullName || 'Campaign Member',
        email: rawUser.email,
        phone: rawUser.phone,
        role: normalizeRole(rawUser.role || rawUser.userType),
        rawRole: rawUser.role || rawUser.userType,
        constituencyId: rawUser.constituencyId,
        constituencyName: rawUser.constituencyName,
        partyName: rawUser.partyName,
        isActive: rawUser.isActive !== false,
      };
    } catch {
      return null;
    }
  },

  /**
   * Logs out from backend session
   */
  async logout(): Promise<void> {
    try {
      await apiClient.post('/api/auth/logout', {});
    } catch {
      // Ignore network failures on logout
    }
  },
};
