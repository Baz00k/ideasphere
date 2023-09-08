import { Text, TouchableOpacity, View } from "react-native"
import { Link } from "expo-router"
import { MaterialIcons } from "@expo/vector-icons"
import type { inferRouterOutputs } from "@trpc/server"

import type { AppRouter } from "@ideasphere/api"

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
        className="mx-4 my-1 flex flex-row items-center justify-between rounded-2xl bg-primary px-6 py-3"
        activeOpacity={0.8}
      >
        <View className="flex-column flex w-4/5 flex-shrink">
          <Text className="text-xl font-bold">{item.title}</Text>
          <Text className="line-clamp-1 max-h-4 text-ellipsis">{item.description}</Text>
        </View>
        <View className="flex-column flex flex-shrink">
          {item.favoritedBy.length > 0 ? (
            <MaterialIcons name="favorite" size={24} color="red" onPress={unfavourite} />
          ) : (
            <MaterialIcons name="favorite-border" size={24} color="black" onPress={favourite} />
          )}
          <Text className="text-center">{item._count.favoritedBy}</Text>
        </View>
      </TouchableOpacity>
    </Link>
  )
}
