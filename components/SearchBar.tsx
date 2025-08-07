/**
 * Search Bar Component
 *
 * A search input component that allows users to search for menu items by name.
 * Provides real-time search functionality with URL parameter synchronization.
 *
 * Features:
 * - Real-time search input with debounced URL updates
 * - Search icon button for manual search trigger
 * - Keyboard search button support
 * - URL parameter synchronization for deep linking
 * - Auto-clear functionality when input is empty
 */

import { images } from "@/constant";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { Image, TextInput, TouchableOpacity, View } from "react-native";

/**
 * SearchBar Component
 *
 * Provides search functionality for menu items with URL synchronization.
 */
const Searchbar = () => {
  const params = useLocalSearchParams<{ query: string }>();
  // Initialize search query from URL parameters
  const [query, setQuery] = useState(params.query);

  /**
   * Handle search input changes
   *
   * Updates local state and clears URL parameters when input is empty.
   * This provides immediate feedback while preventing unnecessary API calls.
   *
   * @param text - The current search input text
   */
  const handleSearch = (text: string) => {
    setQuery(text);

    // Auto-clear search parameters when input is empty
    if (!text) router.setParams({ query: undefined });
  };

  /**
   * Handle search submission
   *
   * Triggered when user presses the keyboard search button or taps the search icon.
   * Updates URL parameters to trigger a new search API call.
   */
  const handleSubmit = () => {
    // Only update URL if there's actual search text
    if (query.trim()) router.setParams({ query });
  };

  return (
    <View className="searchbar elevation-5 shadow-lg ">
      {/* Search input field */}
      <TextInput
        className="flex-1 p-5"
        placeholder="Search for pizzas, burgers..."
        value={query}
        onChangeText={handleSearch} // Handle text input changes
        onSubmitEditing={handleSubmit} // Handle keyboard search button
        placeholderTextColor="#A0A0A0" // Consistent placeholder styling
        returnKeyType="search" // Show search button on keyboard
      />

      {/* Search button/icon */}
      <TouchableOpacity
        className="pr-5"
        onPress={() => router.setParams({ query })} // Manual search trigger
      >
        <Image
          source={images.search}
          className="size-6"
          resizeMode="contain"
          tintColor="#5D5F6D" // Subtle icon color
        />
      </TouchableOpacity>
    </View>
  );
};

export default Searchbar;
