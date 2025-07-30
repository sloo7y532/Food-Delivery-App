import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import { createUser } from "@/lib/appwrite";
import useAuthStore from "@/store/auth.store";
import { User } from "@/type";
import * as Sentry from "@sentry/react-native";
import { Link, router } from "expo-router";
import React, { useState } from "react";
import { Alert, Text, View } from "react-native";

const SignUp = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const { setIsAuthenticated, setUser } = useAuthStore();

  // Handle Submit
  const handleSubmit = async () => {
    const { name, email, password } = form;
    if (!name || !email || !password) {
      Alert.alert("ERROR", "Please complete all fields");
      return;
    }

    // Set isSubmitting to true
    setIsSubmitting(true);

    try {
      // Create User
      const user = await createUser({ name, email, password });
      setUser(user as User);
      setIsAuthenticated(true);
      router.replace("/(tabs)");
    } catch (error) {
      Sentry.captureException(error);
      Alert.alert("ERROR", (error as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <View className="gap-10 bg-white rounded-lg p-5 mt-5">
      {/* Name input */}
      <CustomInput
        placeholder="Enter your full name"
        label="Full Name"
        value={form.name}
        onChangeText={(text) => {
          setForm((prev) => ({ ...prev, name: text }));
        }}
      />
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
        title="Sign up"
        onPress={handleSubmit}
        isLoading={isSubmitting}
      />

      {/* if user already have an account, show Sign in link */}
      <View className="flex-row gap-2 justify-center mt-1">
        <Text className="text-gray-100 base-regular">
          Already have an account?
        </Text>
        <Link href="/Sign-in" className="text-primary base-bold">
          Sign in
        </Link>
      </View>
    </View>
  );
};

export default SignUp;
