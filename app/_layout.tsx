/**
 * Root Layout Component
 *
 * This is the main entry point for the food delivery app. It handles:
 * - Error monitoring with Sentry
 * - Font loading and splash screen management
 * - Authentication state initialization
 * - Navigation stack configuration
 *
 * The layout uses Expo Router for navigation and wraps the entire app
 * in necessary providers for safe areas and error tracking.
 */

import useAuthStore from "@/store/auth.store";
import * as Sentry from "@sentry/react-native";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "../app/global.css";

// Initialize Sentry for error tracking and performance monitoring
Sentry.init({
  dsn: "https://55a376ab97094eb0df6a239530b16128@o4509750926573568.ingest.us.sentry.io/4509751006461952",

  // Adds more context data to events (IP address, cookies, user, etc.)
  // For more information, visit: https://docs.sentry.io/platforms/react-native/data-management/data-collected/
  sendDefaultPii: true,

  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // spotlight: __DEV__,
});

/**
 * Root Layout Component wrapped with Sentry for error tracking
 *
 * Manages app initialization, font loading, and authentication state.
 * Provides the navigation structure for the entire application.
 */
export default Sentry.wrap(function RootLayout() {
  // Load custom Quicksand fonts for consistent typography
  const [fontsLoaded, error] = useFonts({
    "Quicksand-Regular": require("../assets/fonts/Quicksand-Regular.ttf"),
    "Quicksand-Bold": require("../assets/fonts/Quicksand-Bold.ttf"),
    "Quicksand-SemiBold": require("../assets/fonts/Quicksand-SemiBold.ttf"),
    "Quicksand-Light": require("../assets/fonts/Quicksand-Light.ttf"),
    "Quicksand-Medium": require("../assets/fonts/Quicksand-Medium.ttf"),
  });

  const { isLoading, fetchAuthenticatedUser } = useAuthStore();

  // Handle splash screen visibility based on font loading
  useEffect(() => {
    if (error) throw error;
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, error]);

  // Initialize authentication state on app startup
  useEffect(() => {
    fetchAuthenticatedUser();
  }, []);

  // Show loading state while fonts are loading
  if (!fontsLoaded && !error && !isLoading) {
    return null;
  }

  // Main app structure with navigation stack
  return (
    <SafeAreaProvider>
      <Stack initialRouteName="(tabs)" screenOptions={{ headerShown: false }} />
    </SafeAreaProvider>
  );
});
