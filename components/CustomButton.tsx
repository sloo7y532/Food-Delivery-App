/**
 * Custom Button Component
 *
 * A reusable button component with consistent styling and loading states.
 * Used throughout the app for actions like sign in, add to cart, etc.
 *
 * Features:
 * - Loading state with spinner
 * - Optional left icon
 * - Customizable styling
 * - Automatic disable during loading
 */

import { CustomButtonProps } from "@/type";
import React from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";

/**
 * CustomButton Component
 *
 * @param title - Button text (default: "click me")
 * @param onPress - Function to call when button is pressed
 * @param style - Additional CSS classes for button styling
 * @param textStyle - Additional CSS classes for text styling
 * @param leftIcon - Optional React element to display before the text
 * @param isLoading - Whether to show loading spinner instead of text
 */
const CustomButton = ({
  title = "click me",
  onPress,
  style,
  textStyle,
  leftIcon,
  isLoading = false,
}: CustomButtonProps) => {
  return (
    <TouchableOpacity
      className={`custom-btn ${style}`}
      onPress={onPress}
      disabled={isLoading} // Prevent multiple taps during loading
    >
      {/* Display optional left icon (e.g., for social login buttons) */}
      {leftIcon}

      {/* Button content: either loading spinner or text */}
      <View className="flex-row flex-centre">
        {isLoading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text className={`paragraph-semibold ${textStyle}`}>{title}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default CustomButton;
