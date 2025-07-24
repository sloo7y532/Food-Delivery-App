import { images } from "@/constant";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

function CartButton() {
  const totalItems = 5;
  return (
    // the cart button
    <TouchableOpacity className="cart-btn" onPress={() => {}}>
      <Image source={images.bag} className="size-5" resizeMode="contain" />
      {totalItems > 0 && (
        // the naumber above the bag
        <View className="cart-badge">
          <Text className="small-bold text-white">{totalItems}</Text>
        </View>
      )}
    </TouchableOpacity>
    // ==the cart button==
  );
}

export default CartButton;
