import emptyState from "@/assets/images/empty-state.png";
import CartButton from "@/components/CartButton";
import Filter from "@/components/Filter";
import MenuCard from "@/components/MenuCard";
import SearchBar from "@/components/SearchBar";
import { getCategories, getMenu } from "@/lib/appwrite";
import useAppwrite from "@/lib/useAppwrite";
import { Category, MenuItem } from "@/type";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect } from "react";
import { FlatList, Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Search = () => {
  // Get Category and Query from URL

  const { category, query } = useLocalSearchParams<{
    query: string;
    category: string;
  }>();
  // Get Menu or fetch data from Appwrite
  const { data, refetch, loading } = useAppwrite({
    fn: getMenu,
    params: { category, query, limit: 10 },
  });
  // Get Categories or fetch data from Appwrite
  const { data: categories } = useAppwrite({ fn: getCategories });

  // Refetch Menu when Category or Query changes
  useEffect(() => {
    refetch({ category, query, limit: 10 });
  }, [category, query]);

  // Render
  return (
    <SafeAreaView className="h-full bg-white">
      <FlatList
        data={data}
        renderItem={({ item, index }) => {
          const isFirstRightColItem = index % 2 === 0;
          return (
            <View
              className={`flex-1 max-w-[48%] ${
                isFirstRightColItem ? "mt-10" : "mt-0"
              }`}
            >
              <MenuCard item={item as MenuItem} />
            </View>
          );
        }}
        keyExtractor={(item) => item.$id}
        numColumns={2}
        columnWrapperClassName="gap-7"
        contentContainerClassName="gap-7 px-5 pb-8"
        ListHeaderComponent={() => {
          return (
            <View className="my-5 gap-5">
              <View className="flex-between flex-row w-full">
                <View className="flex-start">
                  <Text className="small-bold uppercase text-primary">
                    Search
                  </Text>
                  <View className="flex-start flex-row gap-x-1 mt-0.5">
                    <Text className="paragraph-semibold text-dark-100">
                      Find your favorite food
                    </Text>
                  </View>
                </View>
                <CartButton />
              </View>
              <SearchBar />
              <Filter categories={categories as Category[]} />
            </View>
          );
        }}
        // If no results are found, show a message
        ListEmptyComponent={() => {
          return (
            <View className="flex-1 flex-center">
              <Image
                source={emptyState}
                resizeMode="contain"
                className="size-56"
              />
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default Search;
