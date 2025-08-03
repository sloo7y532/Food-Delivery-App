import { Category } from "@/type";
import { router } from "expo-router";
import { useLocalSearchParams } from "expo-router/build/hooks";
import { useState } from "react";
import { FlatList, Platform, Text, TouchableOpacity } from "react-native";

const Filter = ({ categories }: { categories: Category[] }) => {
  const searchParams = useLocalSearchParams();
  const [active, setActive] = useState(searchParams.category || "all");

  const handlePress = (id: string) => {
    setActive(id);

    if (id === "all") {
      router.setParams({ category: undefined });
    } else {
      router.setParams({ category: id });
    }
  };

  const FilterData: (Category | { $id: string; name: string })[] = categories
    ? [{ $id: "all", name: "All" }, ...categories]
    : [{ $id: "all", name: "All" }];
  return (
    <FlatList
      data={FilterData}
      keyExtractor={(item) => item.$id}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerClassName="gap-x-2 pb-3"
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => handlePress(item.$id)}
          key={item.$id}
          className={`filter ${
            active === item.$id ? "bg-amber-500" : "bg-white"
          }`}
          style={
            Platform.OS === "android"
              ? { elevation: 5, shadowColor: "#878787" }
              : {}
          }
        >
          <Text
            className={`body-medium ${active === item.$id ? "text-white" : "text-gray-200"}`}
          >
            {item.name}
          </Text>
        </TouchableOpacity>
      )}
    />
  );
};

export default Filter;
