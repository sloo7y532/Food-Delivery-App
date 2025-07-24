import { router } from "expo-router";
import React from "react";
import { Button, Text, View } from "react-native";

const SignIn = () => {
  return (
    <View>
      <Text>Sign-in</Text>
      <Button
        title="Sign-Up"
        onPress={() => {
          router.push("/Sign-up");
        }}
      />
    </View>
  );
};

export default SignIn;
