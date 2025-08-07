/**
 * Custom Header Component
 *
 * A reusable header component used across different screens in the app.
 * Provides consistent navigation and layout for screen headers.
 *
 * Features:
 * - Back navigation button
 * - Optional centered title
 * - Search icon (placeholder for future functionality)
 * - Consistent styling across screens
 */

import { useRouter } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";

import { images } from "@/constant";
import { CustomHeaderProps } from "@/type";

/**
 * CustomHeader Component
 *
 * @param title - Optional title text to display in the center of the header
 */
const CustomHeader = ({ title }: CustomHeaderProps) => {
  const router = useRouter();

  return (
    <View className="custom-header">
      {/* Back navigation button */}
      <TouchableOpacity onPress={() => router.back()}>
        <Image
          source={images.arrowBack}
          className="size-5"
          resizeMode="contain"
        />
      </TouchableOpacity>

      {/* Centered title (only shown if title prop is provided) */}
      {title && <Text className="base-semibold text-dark-100">{title}</Text>}

      {/* Search icon (placeholder for future search functionality) */}
      <Image source={images.search} className="size-5" resizeMode="contain" />
    </View>
  );
};

export default CustomHeader;
