import { create } from 'zustand';
import { UserProfile, UserRole } from '../types';
import { storage } from '../utils/storage';
import { ENV } from '../config/env';
import { apiClient } from '../api/client';
import { authService } from '../api/auth.service';
import { normalizeRole } from '../types/roles';

interface AuthStoreState {
  user: UserProfile | null;
  token: string | null;
  role: UserRole;
  isAuthenticated: boolean;
  isLoading: boolean;
  isInitialized: boolean;
  error: string | null;

  // Actions
  initializeAuth: () => Promise<void>;
  login: (phoneOrEmail: string, password?: string, otp?: string) => Promise<boolean>;
  logout: () => Promise<void>;
  setUser: (user: UserProfile | null, token?: string | null) => void;
  switchRole: (newRole: UserRole) => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthStoreState>((set, get) => ({
  user: null,
  token: null,
  role: 'unknown',
  isAuthenticated: false,
  isLoading: true,
  isInitialized: false,
  error: null,

  initializeAuth: async () => {
    try {
      set({ isLoading: true, error: null });
      const storedToken = await storage.getItem(ENV.STORAGE_KEYS.AUTH_TOKEN);
      const storedUserJson = await storage.getItem(ENV.STORAGE_KEYS.USER_PROFILE);

      if (storedToken) {
        apiClient.setAuthToken(storedToken);
        let parsedUser: UserProfile | null = null;
        if (storedUserJson) {
          try {
            parsedUser = JSON.parse(storedUserJson);
          } catch {
            parsedUser = null;
          }
        }

        // Try validating with backend
        const remoteUser = await authService.getCurrentUser();
        const activeUser = remoteUser || parsedUser;

        if (activeUser) {
          set({
            token: storedToken,
            user: activeUser,
            role: activeUser.role || normalizeRole(activeUser.rawRole),
            isAuthenticated: true,
            isLoading: false,
            isInitialized: true,
          });
          return;
        }
      }

      set({
        token: null,
        user: null,
        role: 'unknown',
        isAuthenticated: false,
        isLoading: false,
        isInitialized: true,
      });
    } catch {
      set({
        token: null,
        user: null,
        role: 'unknown',
        isAuthenticated: false,
        isLoading: false,
        isInitialized: true,
      });
    }
  },

  login: async (phoneOrEmail: string, password?: string, otp?: string) => {
    try {
      set({ isLoading: true, error: null });
      const response = await authService.login({ phoneOrEmail, password, otp });

      if (response.tokens.accessToken) {
        await storage.setItem(ENV.STORAGE_KEYS.AUTH_TOKEN, response.tokens.accessToken);
        await storage.setItem(ENV.STORAGE_KEYS.USER_PROFILE, JSON.stringify(response.user));
        apiClient.setAuthToken(response.tokens.accessToken);

        set({
          user: response.user,
          token: response.tokens.accessToken,
          role: response.user.role,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });
        return true;
      }
      set({ isLoading: false, error: 'Authentication failed' });
      return false;
    } catch (err: any) {
      set({
        isLoading: false,
        error: err?.message || 'Login failed. Please check credentials or backend availability.',
      });
      return false;
    }
  },

  logout: async () => {
    set({ isLoading: true });
    await authService.logout();
    await storage.removeItem(ENV.STORAGE_KEYS.AUTH_TOKEN);
    await storage.removeItem(ENV.STORAGE_KEYS.USER_PROFILE);
    apiClient.setAuthToken(null);
    set({
      user: null,
      token: null,
      role: 'unknown',
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });
  },

  setUser: (user, token) => {
    if (token !== undefined) {
      apiClient.setAuthToken(token);
    }
    set({
      user,
      token: token ?? get().token,
      role: user ? user.role : 'unknown',
      isAuthenticated: !!user,
    });
  },

  switchRole: (newRole: UserRole) => {
    const currentUser = get().user;
    if (currentUser) {
      const updatedUser: UserProfile = {
        ...currentUser,
        role: newRole,
      };
      set({ user: updatedUser, role: newRole });
      storage.setItem(ENV.STORAGE_KEYS.USER_PROFILE, JSON.stringify(updatedUser));
    } else {
      // Create guest profile with selected role for previewing role-based command views
      const mockProfile: UserProfile = {
        id: 'usr-role-preview',
        name: `${newRole.replace(/_/g, ' ').toUpperCase()} Lead`,
        role: newRole,
        constituencyName: '042 - Central Assembly',
        partyName: 'Democratic Campaign Coalition',
      };
      set({ user: mockProfile, role: newRole, isAuthenticated: true });
    }
  },

  clearError: () => set({ error: null }),
}));
