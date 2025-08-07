/**
 * Cart Item Component
 *
 * Displays a single item in the shopping cart with quantity controls and removal option.
 * Used in the cart screen to show all added items with their customizations.
 *
 * Features:
 * - Shows item image, name, and price
 * - Quantity increase/decrease controls
 * - Remove item button
 * - Handles items with customizations properly
 * - Real-time cart updates
 */

import { images } from "@/constant";
import { useCartStore } from "@/store/cart-store";
import { CartItemType } from "@/type";
import { Image, Text, TouchableOpacity, View } from "react-native";

/**
 * CartItem Component
 *
 * @param item - CartItemType object containing item data, quantity, and customizations
 */
const CartItem = ({ item }: { item: CartItemType }) => {
  const { increaseQty, decreaseQty, removeItem } = useCartStore();

  return (
    <View className="cart-item">
      <View className="flex flex-row items-center gap-x-3">
        {/* Item image container */}
        <View className="cart-item__image">
          <Image
            source={{ uri: item.image_url }}
            className="size-4/5 rounded-lg"
            resizeMode="cover"
          />
        </View>

        {/* Item details and controls */}
        <View>
          {/* Item name and price */}
          <Text className="base-bold text-dark-100">{item.name}</Text>
          <Text className="paragraph-bold text-primary mt-1">
            ${item.price}
          </Text>

          {/* Quantity controls */}
          <View className="flex flex-row items-center gap-x-4 mt-2">
            {/* Decrease quantity button */}
            <TouchableOpacity
              onPress={() => decreaseQty(item.id, item.customizations!)}
              className="cart-item__actions"
            >
              <Image
                source={images.minus}
                className="size-1/2"
                resizeMode="contain"
                tintColor={"#FF9C01"} // Primary color for consistent theming
              />
            </TouchableOpacity>

            {/* Current quantity display */}
            <Text className="base-bold text-dark-100">{item.quantity}</Text>

            {/* Increase quantity button */}
            <TouchableOpacity
              onPress={() => increaseQty(item.id, item.customizations!)}
              className="cart-item__actions"
            >
              <Image
                source={images.plus}
                className="size-1/2"
                resizeMode="contain"
                tintColor={"#FF9C01"} // Primary color for consistent theming
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Remove item from cart button */}
      <TouchableOpacity
        onPress={() => removeItem(item.id, item.customizations!)}
        className="flex-center"
      >
        <Image source={images.trash} className="size-5" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

export default CartItem;
