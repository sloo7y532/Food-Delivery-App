/**
 * Authentication State Store
 *
 * This file manages the global authentication state using Zustand.
 * It handles user authentication status, user data, and provides
 * methods for managing authentication state throughout the app.
 */

import { getCurrentUser } from "@/lib/appwrite";
import { User } from "@/type";
import { create } from "zustand";

/**
 * Authentication state interface
 * Defines the structure of the auth store state and methods
 */
type AuthState = {
  // State properties
  isAuthenticated: boolean; // Whether user is currently authenticated
  user: User | null; // Current user data or null if not authenticated
  isLoading: boolean; // Loading state for async auth operations

  // State setters
  setIsAuthenticated: (value: boolean) => void; // Manually set authentication status
  setUser: (user: User) => void; // Set current user data
  setIsLoading: (value: boolean) => void; // Set loading state

  // Async operations
  fetchAuthenticatedUser: () => Promise<void>; // Fetch and validate current user
};

/**
 * Authentication Store Implementation
 *
 * Creates a Zustand store that manages authentication state globally.
 * This store persists throughout the app lifecycle and provides
 * centralized authentication management.
 */
const useAuthStore = create<AuthState>((set) => ({
  // Initial state: user is not authenticated
  isAuthenticated: false,
  user: null,
  isLoading: false,

  // Simple state setters
  setIsAuthenticated: (value) => set({ isAuthenticated: value }),
  setUser: (user) => set({ user }),
  setIsLoading: (value) => set({ isLoading: value }),

  /**
   * Fetch and validate the currently authenticated user
   *
   * This method checks with Appwrite backend to verify if there's
   * a valid session and retrieves the user data. It's typically
   * called on app startup to restore authentication state.
   */
  fetchAuthenticatedUser: async () => {
    set({ isLoading: true });

    try {
      // Attempt to get current user from Appwrite
      const user = await getCurrentUser();

      if (user) {
        // User session is valid: update state with user data
        set({
          user: user as User,
          isAuthenticated: true,
        });
      } else {
        // No valid session: clear authentication state
        set({
          isAuthenticated: false,
          user: null,
        });
      }
    } catch (error) {
      // Error occurred (network, invalid session, etc.): clear auth state
      console.log("Error fetching authenticated user", error);
      set({
        isAuthenticated: false,
        user: null,
      });
    } finally {
      // Always clear loading state when operation completes
      set({ isLoading: false });
    }
  },
}));

export default useAuthStore;
