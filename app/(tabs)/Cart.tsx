import CustomButton from "@/components/CustomButton";
import CustomHeader from "@/components/CustomeHeader";
import CartItems from "@/components/CartItems";
import { useCartStore } from "@/store/cart-store";
import { PaymentInfoStripeProps } from "@/type";
import React from "react";
import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const PaymentInfoStripe = ({
  label,
  value,
  labelStyle,
  valueStyle,
}: PaymentInfoStripeProps) => (
  <View className="flex-between flex-row my-1">
    <Text className={`paragraph-medium text-gray-200, ${labelStyle}`}>
      {label}
    </Text>
    <Text className={`paragraph-bold text-dark-100, ${valueStyle}`}>
      {value}
    </Text>
  </View>
);
const Cart = () => {
  const { items, getTotalItems, getTotalPrice } = useCartStore();

  // Get Total Items and Total Price
  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();

  return (
    <SafeAreaView className="h-full bg-white">
      <FlatList
        data={items}
        renderItem={({ item }) => <CartItems item={item} />}
        keyExtractor={(item) => item.id}
        contentContainerClassName="pb-28 px-5 pt-5"
        ListHeaderComponent={() => <CustomHeader title="Your Cart" />}
        ListEmptyComponent={() => (
          <View className="flex-1 items-center justify-center">
            <Text className="text-gray-500">No items in cart</Text>
          </View>
        )}
        ListFooterComponent={() =>
          totalItems > 0 && (
            <View className="gap-5">
              <View className="mt-6 border border-gray-200 p-5 rounded-2xl">
                <Text className="h3-bold text-dark-100 mb-5">
                  Payment Summary
                </Text>
                <PaymentInfoStripe
                  label={`Total Items (${totalItems})`}
                  value={`$${totalPrice.toFixed(2)}`}
                />
                <PaymentInfoStripe label={`Delivery Fee`} value={`$5.00`} />
                <PaymentInfoStripe
                  label={`Discount`}
                  value={`- $2.00`}
                  valueStyle="!text-success"
                />
                <View className="border-t border-gray-300 my-2"></View>
                <PaymentInfoStripe
                  label={`Total`}
                  value={`$${(totalPrice + 5 - 2).toFixed(2)}`}
                  valueStyle="!text-dark-100 base-bold !text-right"
                  labelStyle="!text-gray-100 base-bold"
                />
              </View>
              <CustomButton title="Order Now" textStyle="text-white-100"/>
            </View>
          )
        }
      />
    </SafeAreaView>
  );
};

export default Cart;
