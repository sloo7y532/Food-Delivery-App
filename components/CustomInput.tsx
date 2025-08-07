/**
 * Custom Input Field Component
 *
 * A reusable text input component with consistent styling and focus states.
 * Used in forms throughout the app (sign in, sign up, search, etc.).
 *
 * Features:
 * - Dynamic focus styling (label and border color changes)
 * - Support for different keyboard types
 * - Secure text entry for passwords
 * - Consistent placeholder styling
 * - Automatic capitalization and correction disabled for better UX
 */

import { CustomInputProps } from "@/type";
import React, { useState } from "react";
import { Text, TextInput, View } from "react-native";

/**
 * CustomInput Component
 *
 * @param placeholder - Placeholder text shown when input is empty
 * @param value - Current value of the input
 * @param onChangeText - Function called when text changes
 * @param label - Label text displayed above the input
 * @param secureTextEntry - Whether to hide input text (for passwords)
 * @param keyboardType - Type of keyboard to show (email, numeric, etc.)
 */
const CustomInput = ({
  placeholder = "Enter text",
  value,
  onChangeText,
  label,
  secureTextEntry = false,
  keyboardType = "default",
}: CustomInputProps) => {
  // Track focus state for dynamic styling
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View className="w-full">
      {/* Label that changes color based on focus state */}
      <Text className={`label ${isFocused ? "text-primary" : "text-gray-500"}`}>
        {label}
      </Text>

      {/* Text input with focus-based border styling */}
      <TextInput
        autoCapitalize="none" // Disable auto-capitalization for better UX
        autoCorrect={false} // Disable auto-correction for cleaner input
        placeholder={placeholder}
        placeholderTextColor={"#888"} // Consistent placeholder color
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry} // Hide text for password fields
        keyboardType={keyboardType} // Show appropriate keyboard
        onFocus={() => {
          setIsFocused(true); // Update focus state when input gains focus
        }}
        onBlur={() => {
          setIsFocused(false); // Update focus state when input loses focus
        }}
        className={`input ${isFocused ? "border-primary" : "border-gray-300"}`}
      />
    </View>
  );
};

export default CustomInput;
