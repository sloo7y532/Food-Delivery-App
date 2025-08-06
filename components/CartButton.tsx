import { images } from "@/constant";
import { useCartStore } from "@/store/cart-store";
import { router } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

function CartButton() {
  const { getTotalItems } = useCartStore();
  const totalItems = getTotalItems();
  return (
    // the cart button
    <TouchableOpacity
      className="cart-btn"
      onPress={() => {
        router.push("/Cart");
      }}
    >
      <Image source={images.bag} className="size-5" resizeMode="contain" />
      {totalItems > 0 && (
        // the number above the bag
        <View className="cart-badge">
          <Text className="small-bold text-white">{totalItems}</Text>
        </View>
      )}
    </TouchableOpacity>
    // ==the cart button==
  );
}

export default CartButton;
