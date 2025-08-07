/**
 * Menu Card Component
 * 
 * Displays a menu item in a card format with image, name, price, and actions.
 * Used in the main menu screen to show available food items.
 * 
 * Features:
 * - Displays menu item image with proper Appwrite URL formatting
 * - Shows item name and price
 * - Tap to view detailed item information
 * - Quick "Add to Cart" button for immediate ordering
 * - Platform-specific shadow styling for visual depth
 */

import { appwriteConfig } from "@/lib/appwrite";
import { useCartStore } from "@/store/cart-store";
import { MenuItem } from "@/type";
import { router } from "expo-router";
import React from "react";
import { Image, Platform, Text, TouchableOpacity } from "react-native";

/**
 * MenuCard Component
 * 
 * @param item - MenuItem object containing all menu item data from the database
 */
const MenuCard = ({
  item: { $id, image_url, name, price },
}: {
  item: MenuItem;
}) => {
  // Construct proper Appwrite image URL with project ID for authentication
  const imageURL = `${image_url}?project=${appwriteConfig.projectId}`;
  const { addItem } = useCartStore();
  
  return (
    <TouchableOpacity
      onPress={() => {
        // Navigate to detailed view of the menu item
        router.push({
          pathname: "/MealDetails",
          params: { id: $id },
        });
      }}
      className="menu-card"
      style={
        // Add elevation shadow for Android (iOS handles shadows via CSS)
        Platform.OS === "android"
          ? { elevation: 10, shadowColor: "#878787" }
          : {}
      }
    >
      {/* Menu item image positioned to overflow the card top */}
      <Image
        source={{ uri: imageURL }}
        className="size-32 absolute -top-10"
        resizeMode="contain"
      />
      
      {/* Menu item name with single line truncation */}
      <Text
        className="text-center base-bold text-dark-100 mb-2"
        numberOfLines={1}
      >
        {name}
      </Text>
      
      {/* Price display */}
      <Text className="body-regular text-gray-200 mb-4">From ${price}</Text>
      
      {/* Quick add to cart button */}
      <TouchableOpacity
        onPress={() => {
          // Add item to cart with default configuration (no customizations)
          addItem({ id: $id, name, price, image_url, customizations: [] });
        }}
      >
        <Text className="paragraph-bold text-primary">Add to Cart</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default MenuCard;
