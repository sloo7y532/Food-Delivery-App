import { images } from "@/constant";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { Image, TextInput, TouchableOpacity, View } from "react-native";

const Searchbar = () => {
  const params = useLocalSearchParams<{ query: string }>();
  const [query, setQuery] = useState(params.query);

  // Handle Search
  const handleSearch = (text: string) => {
    setQuery(text);

    // If no text, clear the query
    if (!text) router.setParams({ query: undefined });
  };

  // Handle Submit
  const handleSubmit = () => {
    // If there is text, set the query
    if (query.trim()) router.setParams({ query });
  };

  return (
    <View className="searchbar elevation-5 shadow-lg ">
      <TextInput
        className="flex-1 p-5"
        placeholder="Search for pizzas, burgers..."
        value={query}
        onChangeText={handleSearch}
        onSubmitEditing={handleSubmit}
        placeholderTextColor="#A0A0A0"
        returnKeyType="search"
      />
      <TouchableOpacity
        className="pr-5"
        onPress={() => router.setParams({ query })}
      >
        <Image
          source={images.search}
          className="size-6"
          resizeMode="contain"
          tintColor="#5D5F6D"
        />
      </TouchableOpacity>
    </View>
  );
};

export default Searchbar;
