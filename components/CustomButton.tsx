import { CustomButtonProps } from "@/type";
import React from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
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
      disabled={isLoading}
    >
      {/* if leftIcon is provided show it */}
      {leftIcon}
      {/* if loading show loading indicator else show title */}
      <View className="flex-row flex-centre">
        {isLoading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text className={`paragraph-semibold ${textStyle}`}>
            {title}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default CustomButton;
