import useAuthStore from "@/store/auth.store";
import * as Sentry from "@sentry/react-native";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "../app/global.css";

Sentry.init({
  dsn: "https://55a376ab97094eb0df6a239530b16128@o4509750926573568.ingest.us.sentry.io/4509751006461952",

  // Adds more context data to events (IP address, cookies, user, etc.)
  // For more information, visit: https://docs.sentry.io/platforms/react-native/data-management/data-collected/
  sendDefaultPii: true,

  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // spotlight: __DEV__,
});

// Wrap the root layout with Sentry
export default Sentry.wrap(function RootLayout() {
  const [fontsLoaded, error] = useFonts({
    "Quicksand-Regular": require("../assets/fonts/Quicksand-Regular.ttf"),
    "Quicksand-Bold": require("../assets/fonts/Quicksand-Bold.ttf"),
    "Quicksand-SemiBold": require("../assets/fonts/Quicksand-SemiBold.ttf"),
    "Quicksand-Light": require("../assets/fonts/Quicksand-Light.ttf"),
    "Quicksand-Medium": require("../assets/fonts/Quicksand-Medium.ttf"),
  });

  const { isLoading, fetchAuthenticatedUser } = useAuthStore();
  // Hide the splash screen when the fonts are loaded
  useEffect(() => {
    if (error) throw error;
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, error]);

  // Fetch the authenticated user
  useEffect(() => {
    fetchAuthenticatedUser();
  }, []);

  // If the fonts are not loaded, the splash screen is shown
  if (!fontsLoaded && !error && !isLoading) {
    return null;
  }

  // If the fonts are loaded, the splash screen is hidden
  return (
    <SafeAreaProvider>
      <Stack initialRouteName="(tabs)" screenOptions={{ headerShown: false }} />
    </SafeAreaProvider>
  );
});
