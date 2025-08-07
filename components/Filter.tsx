/**
 * Filter Component
 *
 * A horizontal scrollable list of category filters for menu items.
 * Allows users to filter the menu by food categories like "All", "Burgers", "Pizza", etc.
 *
 * Features:
 * - Horizontal scrollable category list
 * - Visual feedback for active selection
 * - URL parameter synchronization
 * - Default "All" category to show all items
 * - Platform-specific shadow styling
 */

import { Category } from "@/type";
import { router } from "expo-router";
import { useLocalSearchParams } from "expo-router/build/hooks";
import { useState } from "react";
import { FlatList, Platform, Text, TouchableOpacity } from "react-native";

/**
 * Filter Component
 *
 * @param categories - Array of Category objects from the database
 */
const Filter = ({ categories }: { categories: Category[] }) => {
  const searchParams = useLocalSearchParams();
  // Initialize active filter from URL params or default to "all"
  const [active, setActive] = useState(searchParams.category || "all");

  /**
   * Handle category filter selection
   *
   * Updates the active filter state and URL parameters to reflect
   * the selected category. This triggers a re-fetch of menu items.
   *
   * @param id - The category ID to filter by ("all" for no filter)
   */
  const handlePress = (id: string) => {
    setActive(id);

    if (id === "all") {
      // Clear category filter to show all items
      router.setParams({ category: undefined });
    } else {
      // Set specific category filter
      router.setParams({ category: id });
    }
  };

  // Prepare filter data by adding "All" option at the beginning
  const FilterData: (Category | { $id: string; name: string })[] = categories
    ? [{ $id: "all", name: "All" }, ...categories]
    : [{ $id: "all", name: "All" }];
  return (
    <FlatList
      data={FilterData}
      keyExtractor={(item) => item.$id}
      horizontal // Enable horizontal scrolling
      showsHorizontalScrollIndicator={false} // Hide scroll indicator for cleaner look
      contentContainerClassName="gap-x-2 pb-3" // Add spacing between items
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => handlePress(item.$id)}
          key={item.$id}
          className={`filter ${
            // Dynamic styling based on selection state
            active === item.$id ? "bg-amber-500" : "bg-white"
          }`}
          style={
            // Add shadow for Android (iOS handles shadows via CSS)
            Platform.OS === "android"
              ? { elevation: 5, shadowColor: "#878787" }
              : {}
          }
        >
          <Text
            className={`body-medium ${
              // Dynamic text color based on selection state
              active === item.$id ? "text-white" : "text-gray-200"
            }`}
          >
            {item.name}
          </Text>
        </TouchableOpacity>
      )}
    />
  );
};

export default Filter;
