import CustomButton from "@/components/CustomButton";
import CustomHeader from "@/components/CustomeHeader";
import ProfileInfo from "@/components/ProfileInfo";
import { images } from "@/constant/index";
import React from "react";
import { Image, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Profile = () => {
  return (
    <SafeAreaView className="flex-1 bg-white-100 flex-col">
      {/* header */}
      <View className="flex-between w-full my-1 px-5">
        <CustomHeader title="Profile" />
      </View>

      {/* body */}
      <View className="flex-1 px-5 flex-col">
        {/* avatar */}
        <View className="flex-center">
          <View className="profile-avatar">
            <Image source={images.avatar} className="size-28 rounded-full" />
            <View className="profile-edit">
              <Image
                source={images.pencil}
                className="size-3"
                resizeMode="contain"
              />
            </View>
          </View>
        </View>
        {/* main info */}
        <View className="flex-col items-center mt-10 mx-1 bg-white rounded-2xl p-5 gap-3">
          <ProfileInfo label="Full Name" value="John Doe" icon={images.user} />
          <ProfileInfo
            label="Email"
            value="john.doe@example.com"
            icon={images.envelope}
          />
          <ProfileInfo
            label="Phone number"
            value="123-456-7890"
            icon={images.phone}
          />
          <ProfileInfo
            label="Address1 - (Home)"
            value="123 Main St, Anytown, USA"
            icon={images.location}
          />
          <ProfileInfo
            label="Address2 - (Work)"
            value="123 Main St, Anytown, USA"
            icon={images.location}
          />
        </View>
        {/* logout button */}
        <View className="w-full gap-3 mt-10">
          <CustomButton
            title="Edit Profile"
            style="w-full bg-white border border-1 border-primary"
            textStyle="text-primary"
          />
          <CustomButton
            title="Logout"
            style="w-full bg-white border border-1 border-red-500"
            textStyle="text-red-500"
            leftIcon={
              <Image
                source={images.logout}
                className="size-6 mr-1"
                resizeMode="contain"
              />
            }
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
