import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

/**
 * Universal safe storage for credentials and tokens.
 * Uses hardware-backed Expo SecureStore on Native (Android / iOS)
 * and localStorage with memory fallback on Web.
 */
class UniversalStorage {
  private memoryCache: Map<string, string> = new Map();

  async setItem(key: string, value: string): Promise<void> {
    try {
      this.memoryCache.set(key, value);
      if (Platform.OS === 'web') {
        if (typeof window !== 'undefined' && window.localStorage) {
          window.localStorage.setItem(key, value);
        }
      } else {
        await SecureStore.setItemAsync(key, value);
      }
    } catch (e) {
      console.warn(`[Storage] Failed to set key "${key}":`, e);
    }
  }

  async getItem(key: string): Promise<string | null> {
    try {
      if (Platform.OS === 'web') {
        if (typeof window !== 'undefined' && window.localStorage) {
          return window.localStorage.getItem(key);
        }
        return this.memoryCache.get(key) || null;
      } else {
        return await SecureStore.getItemAsync(key);
      }
    } catch (e) {
      console.warn(`[Storage] Failed to get key "${key}":`, e);
      return this.memoryCache.get(key) || null;
    }
  }

  async removeItem(key: string): Promise<void> {
    try {
      this.memoryCache.delete(key);
      if (Platform.OS === 'web') {
        if (typeof window !== 'undefined' && window.localStorage) {
          window.localStorage.removeItem(key);
        }
      } else {
        await SecureStore.deleteItemAsync(key);
      }
    } catch (e) {
      console.warn(`[Storage] Failed to remove key "${key}":`, e);
    }
  }

  async clear(): Promise<void> {
    this.memoryCache.clear();
    if (Platform.OS === 'web' && typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.clear();
    }
  }
}

export const storage = new UniversalStorage();
