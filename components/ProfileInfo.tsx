import { ProfileFieldProps } from "@/type";
import React from "react";
import { Image, Text, View } from "react-native";

const ProfileInfo = ({ label, value, icon }: ProfileFieldProps) => {
  return (
    <View className="gap-2 flex-row w-full mb-3">
      <View className="flex-center border border-1 border-primary rounded-full px-3">
        <Image source={icon} className="size-5" resizeMode="contain" />
      </View>
      <View className="flex-col">
        <Text className="paragraph-regular text-gray-100">{label}</Text>
        <Text className="paragraph-bold text-dark-100">{value}</Text>
      </View>
    </View>
  );
};

export default ProfileInfo;
