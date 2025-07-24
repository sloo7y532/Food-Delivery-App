import { Redirect, Slot } from "expo-router";
import React from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function _Layout() {
  const isAuthnticated = true;
  if (isAuthnticated) {
    return <Redirect href="../(tabs)/Cart.tsx" />;
  }
  return (
    <SafeAreaView className="flex-1 bg-white">
      <Text>Auth-Layout</Text>
      <Slot />
    </SafeAreaView>
  );
}
