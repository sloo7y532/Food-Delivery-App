/**
 * Customization Card Component
 *
 * Displays a customization option (topping, side dish, etc.) that can be added to menu items.
 * Used in the meal details screen to show available add-ons and customizations.
 *
 * Features:
 * - Visual card with food image and name
 * - Add button for selecting the customization
 * - Rich shadow styling for visual depth
 * - Consistent sizing and layout
 * - Support for selection states (through props)
 */

import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

/**
 * CustomizationCard Component
 *
 * @param food - The food/customization item data (name, image, etc.)
 * @param isSelected - Whether this customization is currently selected
 * @param onPress - Function to call when the add button is pressed
 * @param index - Index of this item in the list (for potential animations/keys)
 */
const CustomizationCard = ({ food, isSelected, onPress, index }: any) => {
  return (
    <View
      className="items-center min-w-[87px] bg-yellow-950 pb-2 rounded-xl h-30"
      style={{
        // Rich shadow styling for visual depth
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.8,
        shadowRadius: 8,
        elevation: 5, // Android shadow
      }}
    >
      {/* Image container with white background */}
      <View
        className={`w-full mb-3 flex-center bg-white rounded-xl p-1`}
        style={{
          height: 67,
        }}
      >
        <Image
          source={food.image}
          className="size-20 mt-2"
          resizeMode="contain"
        />
      </View>

      {/* Name and add button section */}
      <View className="flex-row items-center justify-between px-2">
        <Text className={`text-sm text-white`}>{food.name}</Text>

        {/* Add customization button */}
        <TouchableOpacity
          onPress={onPress}
          className="size-5 bg-red-500 rounded-full flex-center ml-2"
        >
          <Text className="text-white text-sm">+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomizationCard;
