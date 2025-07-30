import { getCurrentUser } from "@/lib/appwrite";
import { User } from "@/type";
import { create } from "zustand";

// Define the type for the auth state
type AuthState = {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;

  setIsAuthenticated: (value: boolean) => void;
  setUser: (user: User) => void;
  setIsLoading: (value: boolean) => void;

  fetchAuthenticatedUser: () => Promise<void>;
};

// Create the auth store => it's like an object that contains the state of the auth
const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  isLoading: false,
  setIsAuthenticated: (value) => set({ isAuthenticated: value }),
  setUser: (user) => set({ user }),
  setIsLoading: (value) => set({ isLoading: value }),
  // Fetch the authenticated user
  fetchAuthenticatedUser: async () => {
    set({ isLoading: true });
    try {
      // Get the current user
      const user = await getCurrentUser();
      // If the user is found, set the user and isAuthenticated to true
      if (user) {
        set({ user: user as User, isAuthenticated: true });
      } else {
        // If the user is not found, set the user and isAuthenticated to false
        set({ isAuthenticated: false, user: null });
      }
    } catch (error) {
      // If there is an error, set the user and isAuthenticated to false
      console.log("Error fetching authenticated user", error);
      set({ isAuthenticated: false, user: null });
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useAuthStore;
