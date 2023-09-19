import { Text, View } from "react-native"
import { MaterialIcons } from "@expo/vector-icons"
import { FlashList } from "@shopify/flash-list"
import type { inferRouterOutputs } from "@trpc/server"

import type { AppRouter } from "@ideasphere/api"

import { SupabaseImage } from "../base"

interface IdeaViewProps {
  idea: NonNullable<inferRouterOutputs<AppRouter>["ideas"]["byId"]>
}

const IdeaView: React.FC<IdeaViewProps> = ({ idea }) => {
  return (
    <View className="flex flex-col gap-y-4">
      <View>
        <View className="flex w-full flex-row flex-wrap justify-between gap-2 px-4 pt-4">
          <Text className="font-comfortaa_400 text-3xl text-primary">{idea.title}</Text>
          <View className="flex-shrink">
            <View className="flex flex-row items-center gap-x-2">
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
        </View>
      </View>

      <View className="flex-column flex w-full gap-y-4 p-4">
        <Text className="font-comfortaa_400 text-xl">Opis</Text>
        <Text className="ml-2 text-lg">{idea.description}</Text>
      </View>

      {idea.images && idea.images.length > 0 && (
        <View className="flex-column flex w-full gap-y-4">
          <Text className="ml-4 font-comfortaa_400 text-xl">Zdjęcia</Text>
          <View className="h-48 w-full">
            <FlashList
              data={idea.images}
              horizontal
              renderItem={({ item }) => (
                <SupabaseImage
                  source={item}
                  className="h-full rounded-md bg-gray-100"
                  preserveRatio
                />
              )}
              contentContainerStyle={{ paddingHorizontal: 16 }}
              ItemSeparatorComponent={() => <View className="w-4" />}
              bounces={false}
              showsHorizontalScrollIndicator={false}
              centerContent
              snapToAlignment="center"
              estimatedItemSize={100}
            />
          </View>
        </View>
      )}
    </View>
  )
}

export { IdeaView }
