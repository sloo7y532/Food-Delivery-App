/**
 * Tab Navigation Layout
 *
 * This component defines the main tab navigation structure for authenticated users.
 * It includes authentication protection and creates the bottom tab bar with
 * Home, Search, Cart, and Profile screens.
 *
 * Features:
 * - Authentication guard (redirects to sign-in if not authenticated)
 * - Custom tab bar styling with rounded corners and shadows
 * - Dynamic icon colors based on focus state
 * - Floating tab bar design
 */

import { images } from "@/constant";
import useAuthStore from "@/store/auth.store";
import { TabBarIconProps } from "@/type";
import { Redirect, Tabs } from "expo-router";
import React from "react";
import { Image, Text, View } from "react-native";
import "../global.css";

/**
 * Custom Tab Bar Icon Component
 *
 * @param focused - Whether this tab is currently active
 * @param icon - The icon image source for this tab
 * @param title - The title text for this tab
 */
const TabBarIcon = ({ focused, icon, title }: TabBarIconProps) => (
  <View className="tab-icon">
    <Image
      source={icon}
      className="size-7"
      resizeMode="contain"
      tintColor={focused ? "#FE8C00" : "#5D5F6D"} // Primary color when active
    />
    <Text
      className={`text-sm font-bold ${focused ? "text-primary" : "text-gray-200"}`}
    >
      {title}
    </Text>
  </View>
);

/**
 * Main Tab Layout Component
 *
 * Provides the main navigation structure for authenticated users.
 * Redirects to sign-in if user is not authenticated.
 */
export default function TabsLayout() {
  const { isAuthenticated } = useAuthStore();

  // Protect authenticated routes - redirect to sign-in if not logged in
  if (!isAuthenticated) {
    return <Redirect href="/Sign-in" />;
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false, // Hide default headers (using custom headers)
        tabBarShowLabel: false, // Hide default tab labels (using custom TabBarIcon)
        tabBarStyle: {
          // Floating tab bar design with rounded corners
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
          borderBottomLeftRadius: 50,
          borderBottomRightRadius: 50,
          marginHorizontal: 20, // Side margins for floating effect
          height: 80, // Taller tab bar for better touch targets
          position: "absolute", // Float above content
          bottom: 30, // Margin from bottom of screen
          backgroundColor: "white",

          // Shadow styling for depth
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 10,
          elevation: 5, // Android shadow
        },
      }}
    >
      {/* Home Tab */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} icon={images.home} title="Home" />
          ),
        }}
      />

      {/* Search Tab */}
      <Tabs.Screen
        name="Search"
        options={{
          title: "Search",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} icon={images.search} title="Search" />
          ),
        }}
      />

      {/* Cart Tab */}
      <Tabs.Screen
        name="Cart"
        options={{
          title: "Cart",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} icon={images.bag} title="Cart" />
          ),
        }}
      />

      {/* Profile Tab */}
      <Tabs.Screen
        name="Profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              focused={focused}
              icon={images.person}
              title="Profile"
            />
          ),
        }}
      />
    </Tabs>
  );
}
