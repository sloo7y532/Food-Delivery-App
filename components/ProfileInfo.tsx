/**
 * Profile Info Component
 *
 * A reusable component for displaying user profile information in a consistent format.
 * Used in the profile screen to show user details like name, email, phone, etc.
 *
 * Features:
 * - Icon, label, and value display
 * - Consistent styling and spacing
 * - Flexible content through props
 * - Proper text hierarchy with different font weights
 */

import { ProfileFieldProps } from "@/type";
import React from "react";
import { Image, Text, View } from "react-native";

/**
 * ProfileInfo Component
 *
 * @param label - The field label (e.g., "Email", "Phone")
 * @param value - The field value (e.g., "user@example.com", "+1234567890")
 * @param icon - The icon to display next to the field
 */
const ProfileInfo = ({ label, value, icon }: ProfileFieldProps) => {
  return (
    <View className="gap-2 flex-row w-full mb-3">
      {/* Field icon container */}
      <View className="profile-field__icon">
        <Image source={icon} className="size-5" resizeMode="contain" />
      </View>

      {/* Field label and value */}
      <View className="flex-col">
        <Text className="paragraph-regular text-gray-100">{label}</Text>
        <Text className="paragraph-bold text-dark-100">{value}</Text>
      </View>
    </View>
  );
};

export default ProfileInfo;
