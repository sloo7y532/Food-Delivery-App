import CustomHeader from "@/components/CustomeHeader";
import CustomizationCard from "@/components/customizationCard";
import { images, sides, toppings } from "@/constant";
import { getMenuItemById } from "@/lib/appwrite";
import useAppwrite from "@/lib/useAppwrite";
import { useCartStore } from "@/store/cart-store";
import { CartCustomization } from "@/type";
import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const MealDetails = () => {
  const { id } = useLocalSearchParams();
  const { data: menuItem } = useAppwrite({
    fn: (params: { id: string }) => getMenuItemById(params.id),
    params: { id: id as string },
  });

  // quantity is the number of items in the cart
  const [quantity, setQuantity] = useState(1);
  // selectedToppings is the toppings that the user has selected
  const [selectedToppings, setSelectedToppings] = useState<CartCustomization[]>(
    []
  );
  // selectedSides is the sides that the user has selected
  const [selectedSides, setSelectedSides] = useState<CartCustomization[]>([]);
  // addItem is the function to add an item to the cart
  const { addItem } = useCartStore();

  // toggleTopping is the function to toggle a topping
  const toggleTopping = (topping: any, index: number) => {
    const customization: CartCustomization = {
      id: `topping-${index}`,
      name: topping.name,
      price: topping.price,
      type: "topping",
    };
    // setSelectedToppings is the function to set the selected toppings
    setSelectedToppings((prev) => {
      const exists = prev.find((t) => t.id === customization.id);
      if (exists) {
        return prev.filter((t) => t.id !== customization.id);
      } else {
        return [...prev, customization];
      }
    });
  };

  // toggleSide is the function to toggle a side
  const toggleSide = (side: any, index: number) => {
    const customization: CartCustomization = {
      id: `side-${index}`,
      name: side.name,
      price: side.price,
      type: "side",
    };
    // setSelectedSides is the function to set the selected sides
    setSelectedSides((prev) => {
      const exists = prev.find((s) => s.id === customization.id);
      if (exists) {
        return prev.filter((s) => s.id !== customization.id);
      } else {
        return [...prev, customization];
      }
    });
  };

  // calculateTotalPrice is the function to calculate the total price of the item
  const calculateTotalPrice = () => {
    const basePrice = menuItem?.price || 0;
    const toppingsPrice = selectedToppings.reduce((sum, t) => sum + t.price, 0);
    const sidesPrice = selectedSides.reduce((sum, s) => sum + s.price, 0);
    return (basePrice + toppingsPrice + sidesPrice) * quantity;
  };

  // handleAddToCart is the function to add an item to the cart
  const handleAddToCart = () => {
    if (!menuItem) return;

    const customizations = [...selectedToppings, ...selectedSides];
    const item = {
      id: menuItem.$id,
      name: menuItem.name,
      price: menuItem.price,
      image_url: menuItem.image_url,
      customizations,
    };

    for (let i = 0; i < quantity; i++) {
      addItem(item);
    }
  };

  // renderStars is the function to render the stars
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);

    for (let i = 0; i < 5; i++) {
      stars.push(
        <Image
          key={i}
          source={images.star}
          className="w-4 h-4"
          style={{ tintColor: i < fullStars ? "#FFA500" : "#E5E5E5" }}
          resizeMode="contain"
        />
      );
    }
    return stars;
  };

  return (
    <SafeAreaView className="flex-1 bg-white-100">
      {/* Header */}
      <View className="px-5 pt-3 pb-2">
        <CustomHeader />
      </View>
      {/* Main Content */}
      <ScrollView className="flex-1 mb-24" showsVerticalScrollIndicator={false}>
        {/* Main Content */}
        <View className="pl-5">
          <View className="flex-row justify-between mb-6">
            {/* Title and Rating Section and Price and Nutrition Info and Bun Type and Delivery Info */}
            <View className=" w-1/2">
              <Text className="text-2xl font-bold text-gray-900 mb-1">
                {menuItem?.name}
              </Text>
              <Text className="text-base text-gray-600 mb-2">
                {menuItem?.description}
              </Text>

              {/* Rating */}
              <View className="flex-row items-center mb-3">
                <View className="flex-row mr-2">
                  {renderStars(menuItem?.rating || 0)}
                </View>
                <Text className="text-sm font-medium text-gray-700">
                  {menuItem?.rating}/5
                </Text>
              </View>

              {/* Price */}
              <Text className="text-2xl font-bold mb-4 text-primary">
                $
                <Text className="text-2xl font-bold text-gray-900">
                  {menuItem?.price?.toFixed(2)}
                </Text>
              </Text>

              {/* Nutrition Info */}
              <View className="flex-row items-center mb-4">
                <View className="mr-6">
                  <Text className="text-sm text-gray-500">Calories</Text>
                  <Text className="text-base font-semibold">
                    {menuItem?.calories} Cal
                  </Text>
                </View>
                <View className="mr-6">
                  <Text className="text-sm text-gray-500">Protein</Text>
                  <Text className="text-base font-semibold">
                    {menuItem?.protein}g
                  </Text>
                </View>
              </View>

              {/* Bun Type */}
              <View className="mb-4">
                <Text className="text-sm text-gray-500">Bun Type</Text>
                <Text className="text-base font-semibold">Whole Wheat</Text>
              </View>
            </View>

            {/* Meal Image */}
            <View className=" overflow-hidden w-1/2 h-72 mt-8 ">
              <Image
                source={{ uri: menuItem?.image_url }}
                className="size-full "
                resizeMode="cover"
              />
            </View>
          </View>
          {/* Delivery Info */}
          <View className="flex-row justify-between bg-orange-50 px-5 py-3 rounded-3xl mb-6 mr-5">
            <View className="items-center flex-row gap-1">
              <Image
                source={images.dollar}
                className="size-6"
                resizeMode="contain"
              />
              <Text className="text-black text-sm font-medium">
                Free Delivery
              </Text>
            </View>
            <View className="items-center justify-center flex-row gap-2">
              <Image
                source={images.clock}
                className="size-4"
                resizeMode="contain"
              />
              <Text className="text-sm font-medium">20 - 30 mins</Text>
            </View>
            <View className="items-center justify-center flex-row gap-2">
              <Image
                source={images.star}
                className="size-6"
                resizeMode="contain"
              />
              <Text className="text-sm font-medium">4.5</Text>
            </View>
          </View>
          {/* Description */}
          <View className="mb-6 mr-4">
            <Text className="text-base text-gray-700 leading-6">
              The Cheeseburger Wendy&apos;s Burger is a classic fast food burger
              that packs a punch of flavor in every bite. Made with a juicy beef
              patty cooked to perfection, it&apos;s topped with melted American
              cheese, crispy lettuce, tomato, & crunchy pickles.
            </Text>
          </View>

          {/* Toppings Section */}
          <View className="mb-6">
            <Text className="text-lg font-semibold text-gray-900 mb-4">
              Toppings
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                gap: 25,
                paddingLeft: 10,
                paddingVertical: 15,
              }}
            >
              {toppings.map((topping, index) => {
                const isSelected = selectedToppings.find(
                  (t) => t.id === `topping-${index}`
                );
                return (
                  <CustomizationCard
                    key={`topping-${index}`}
                    food={topping}
                    isSelected={isSelected}
                    onPress={() => toggleTopping(topping, index)}
                    index={index}
                  />
                );
              })}
            </ScrollView>
          </View>

          {/* Side Options Section */}
          <View className="flex-row gap-3">
            <View className="mb-8">
              <Text className="text-xl font-bold text-gray-900 mb-4">
                Side options
              </Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                  gap: 25,
                  paddingLeft: 10,
                  paddingVertical: 15,
                }}
              >
                {sides.map((side, index) => {
                  const isSelected = selectedSides.find(
                    (s) => s.id === `side-${index}`
                  );
                  return (
                    <CustomizationCard
                      key={`side-${index}`}
                      food={side}
                      isSelected={isSelected}
                      onPress={() => toggleSide(side, index)}
                    />
                  );
                })}
              </ScrollView>
            </View>
          </View>
        </View>
        {/* Bottom Section - Quantity and Add to Cart */}
      </ScrollView>
      {/* Bottom Section - Quantity and Add to Cart */}
      <View className="p-4 mx-3 bg-white absolute bottom-9 left-1 right-1 rounded-3xl elevation-xl">
        <View className="flex-row items-center justify-between ">
          {/* Quantity Selector */}
          <View className="flex-row items-center">
            <TouchableOpacity
              onPress={() => quantity > 1 && setQuantity(quantity - 1)}
              className="w-10 h-10 rounded-full items-center justify-center"
            >
              <Image
                source={images.minus}
                className="size-6"
                resizeMode="contain"
              />
            </TouchableOpacity>
            <Text className="mx-4 text-3xl font-semibold text-gray-900">
              {quantity}
            </Text>
            <TouchableOpacity
              onPress={() => setQuantity(quantity + 1)}
              className="w-10 h-10 rounded-full items-center justify-center"
            >
              <Image
                source={images.plus}
                className="size-6"
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>

          {/* Add to Cart Button */}
          <TouchableOpacity
            onPress={handleAddToCart}
            className="flex-1 ml-6 bg-orange-500 rounded-full py-4 px-6 flex-row items-center justify-center gap-2"
          >
            <Image
              source={images.bag}
              className="size-4"
              resizeMode="contain"
            />
            <Text className="text-white text-center font-bold text-lg">
              Add to cart (${calculateTotalPrice()})
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default MealDetails;
