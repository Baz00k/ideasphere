import { ScrollView, Text, View } from "react-native"
import { MaterialIcons } from "@expo/vector-icons"
import type { inferRouterOutputs } from "@trpc/server"

import type { AppRouter } from "@ideasphere/api"

interface IdeaViewProps {
  idea: NonNullable<inferRouterOutputs<AppRouter>["ideas"]["byId"]>
}

const IdeaView: React.FC<IdeaViewProps> = ({ idea }) => {
  return (
    <View className="flex flex-col gap-y-4">
      <View className="flex w-full flex-row flex-wrap justify-between px-4 pt-4">
        <Text className="font-comfortaa_400 text-3xl text-primary">{idea.title}</Text>
        <View className="flex flex-shrink flex-row items-center gap-x-2">
          <MaterialIcons name="favorite" size={24} color="red" />
          <Text className="font-comfortaa_300 text-sm">
            {idea._count.favoritedBy.toLocaleString("pl", {
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
              notation: "compact",
              compactDisplay: "short",
            })}{" "}
            polubień
          </Text>
        </View>
      </View>

      <View className="flex-column flex w-full gap-y-4 p-4">
        <Text className="font-comfortaa_400 text-xl">Opis</Text>
        <Text className="ml-2 text-lg">{idea.description}</Text>
      </View>

      <View className="flex-column flex w-full gap-y-4">
        <Text className="ml-4 font-comfortaa_400 text-xl">Zdjęcia</Text>
        <ScrollView className="flex h-48 flex-row flex-nowrap gap-x-4 px-4" horizontal>
          {Array.from({ length: 10 }).map((_, i) => (
            <View
              key={i}
              className="flex h-full w-64 flex-shrink-0 flex-col rounded-xl bg-gray-100"
            />
          ))}
        </ScrollView>
      </View>
    </View>
  )
}

export { IdeaView }
