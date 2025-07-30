import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import { signIn } from "@/lib/appwrite";
import useAuthStore from "@/store/auth.store";
import * as Sentry from "@sentry/react-native";
import { Link, router } from "expo-router";
import React, { useState } from "react";
import { Alert, Text, View } from "react-native";

const SignIn = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const { fetchAuthenticatedUser } = useAuthStore();

  const handleSubmit = async () => {
    const { email, password } = form;
    if (!email || !password) {
      Alert.alert("ERROR", "Please enter valid email address & password");
      return;
    }

    setIsSubmitting(true);

    try {
      await signIn({ email, password });
      await fetchAuthenticatedUser();
      router.replace("/(tabs)");
    } catch (error) {
      Sentry.captureException(error);
      Alert.alert("ERROR", "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <View className="gap-10 bg-white rounded-lg p-5 mt-5">
      {/* Email input */}
      <CustomInput
        placeholder="Enter your email"
        label="Email"
        value={form.email}
        onChangeText={(text) => {
          setForm((prev) => ({ ...prev, email: text }));
        }}
        keyboardType="email-address"
      />

      {/* Password input */}
      <CustomInput
        placeholder="Enter your password"
        label="Password"
        value={form.password}
        onChangeText={(text) => {
          setForm((prev) => ({ ...prev, password: text }));
        }}
        secureTextEntry={true}
      />

      {/* Sign in button */}
      <CustomButton
        title="Sign in"
        onPress={handleSubmit}
        isLoading={isSubmitting}
      />

      {/* if user dont have an account, show Sign up link */}
      <View className="flex-row gap-2 justify-center mt-1">
        <Text className="text-gray-100 base-regular">
          Don&apos;t have an account?
        </Text>
        <Link href="/Sign-up" className="text-primary base-bold">
          Sign up
        </Link>
      </View>
    </View>
  );
};

export default SignIn;
