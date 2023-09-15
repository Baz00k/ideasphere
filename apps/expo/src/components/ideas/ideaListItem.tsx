import { Pressable, Text, TouchableOpacity, View } from "react-native"
import Animated, { BounceIn, FadeOut } from "react-native-reanimated"
import { Link } from "expo-router"
import { MaterialIcons } from "@expo/vector-icons"
import type { inferRouterOutputs } from "@trpc/server"
import tailwindColors from "tailwindcss/colors"

import type { AppRouter } from "@ideasphere/api"
import { colors } from "@ideasphere/tailwind-config/themeColors"

interface IdeaListItemProps {
  item: inferRouterOutputs<AppRouter>["ideas"]["weeklyTopIdeas"][number]
  favourite: () => void
  unfavourite: () => void
}

export const IdeaListItem: React.FC<IdeaListItemProps> = ({ item, favourite, unfavourite }) => {
  return (
    <Link
      href={{
        pathname: "/idea/[id]",
        params: { id: item.id },
      }}
      asChild
    >
      <TouchableOpacity
        className="mx-2 my-1 flex flex-row items-center justify-between rounded-3xl bg-secondary px-4 py-3"
        activeOpacity={0.8}
      >
        <View className="flex-column ml-2 flex w-4/5 flex-shrink">
          <Text className="font-conmfortaa_700 text-xl" numberOfLines={1}>
            {item.title}
          </Text>
          <Text className="font-comfortaa_300" numberOfLines={1}>
            {item.description}
          </Text>
        </View>
        <Pressable
          className="flex-column flex flex-shrink px-2"
          onPress={() => (item.favoritedByMe ? unfavourite() : favourite())}
        >
          {item.favoritedByMe ? (
            <Animated.View entering={BounceIn.duration(200)} exiting={FadeOut.duration(200)}>
              <MaterialIcons name="favorite" size={24} color={tailwindColors.red[600]} />
            </Animated.View>
          ) : (
            <MaterialIcons name="favorite-border" size={24} color={colors.primary} />
          )}
          <Text className="text-center">
            {item._count.favoritedBy.toLocaleString("pl", {
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
              notation: "compact",
              compactDisplay: "short",
            })}
          </Text>
        </Pressable>
      </TouchableOpacity>
    </Link>
  )
}
