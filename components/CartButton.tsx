/**
 * Cart Button Component
 *
 * A floating cart button that displays the total number of items in the cart.
 * Provides quick access to the cart screen from anywhere in the app.
 *
 * Features:
 * - Shows cart icon with item count badge
 * - Badge only appears when cart has items
 * - Navigates to cart screen when pressed
 * - Real-time updates as items are added/removed
 */

import { images } from "@/constant";
import { useCartStore } from "@/store/cart-store";
import { router } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

/**
 * CartButton Component
 *
 * A persistent button that shows the current cart status and provides
 * quick navigation to the cart screen.
 */
function CartButton() {
  const { getTotalItems } = useCartStore();
  const totalItems = getTotalItems();

  return (
    <TouchableOpacity
      className="cart-btn"
      onPress={() => {
        // Navigate to the cart screen
        router.push("/Cart");
      }}
    >
      {/* Shopping bag icon */}
      <Image source={images.bag} className="size-5" resizeMode="contain" />

      {/* Item count badge (only shown when cart has items) */}
      {totalItems > 0 && (
        <View className="cart-badge">
          <Text className="small-bold text-white">{totalItems}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

export default CartButton;
