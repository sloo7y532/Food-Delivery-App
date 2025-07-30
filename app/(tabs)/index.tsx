import CartButton from "@/components/CartButton";
import { images, offers } from "@/constant";
import useAuthStore from "@/store/auth.store";
import cn from "clsx";
import {
  FlatList,
  Image,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const { user } = useAuthStore();
  console.log("USER:", JSON.stringify(user, null, 2));
  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* header */}
      <View className="flex-between flex-row w-full my-5 px-5">
        <View className="flex-start">
          <Text className="small-bold text-primary">DELIVER TO</Text>
          <TouchableOpacity className="flex-center gap-x-1 flex-row mt-0.5">
            <Text className="paragraph-bold text-dark-100">RIYADH</Text>
            <Image
              source={images.arrowDown}
              className="size-3"
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
        <CartButton />
      </View>
      {/* ==header== */}
      {/* offers */}
      <FlatList
        data={offers}
        renderItem={({ item, index }) => {
          const isEven = index % 2 === 0;
          return (
            <Pressable
              className={cn(
                "offer-card",
                isEven ? "flex-row-reverse" : "flex-row"
              )}
              style={{
                backgroundColor: item.color,
              }}
              android_ripple={{ color: "#fffff22" }}
            >
              {({ pressed }) => {
                return (
                  <>
                    {/* image */}
                    <View className={`h-full w-1/2`}>
                      <Image
                        source={item.image}
                        className="size-full"
                        resizeMode="contain"
                      />
                    </View>
                    {/* ==image== */}
                    {/* info */}
                    <View
                      className={cn(
                        `offer-card__info`,
                        isEven ? "pl-5" : "pr-5"
                      )}
                    >
                      <Text className="h1-bold text-white leading-tight">
                        {item.title}
                      </Text>
                      {/* arrow right */}
                      <Image
                        source={images.arrowRight}
                        className="size-10"
                        resizeMode="contain"
                        tintColor="white"
                      />
                      {/* ==arrow right== */}
                    </View>
                    {/* ==info== */}
                  </>
                );
              }}
            </Pressable>
          );
        }}
        contentContainerClassName="pb-28 px-5"
      />
      {/* ==offers== */}
    </SafeAreaView>
  );
}
