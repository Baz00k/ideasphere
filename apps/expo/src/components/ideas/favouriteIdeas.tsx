import { Text, TouchableOpacity, View } from "react-native"
import { Link } from "expo-router"
import { FlashList } from "@shopify/flash-list"

import { api } from "~/utils/api"
import { LoadingSpinner } from "../base"

const FavouriteIdeas: React.FC = () => {
  const { data, isLoading, refetch, isRefetching } = api.ideas.myFavouriteIdeas.useQuery()

  return (
    <View className="mb-8 flex h-full w-full flex-col gap-y-4">
      <Text className="text-center font-comfortaa_400 text-xl text-primary">
        Polubione przez Ciebie
      </Text>
      {isLoading && <LoadingSpinner />}
      <View className="h-full w-full">
        <FlashList
          data={data}
          keyExtractor={(idea) => idea.id}
          refreshing={isRefetching}
          onRefresh={refetch}
          numColumns={2}
          renderItem={({ item }) => (
            <Link
              href={{
                pathname: "/idea/[id]",
                params: { id: item.id },
              }}
              asChild
            >
              <TouchableOpacity
                className="mx-auto my-2 flex h-24 w-36 items-center justify-center rounded-xl bg-secondary"
                activeOpacity={0.8}
              >
                <Text className="font-comfortaa_400">{item.title}</Text>
              </TouchableOpacity>
            </Link>
          )}
          estimatedItemSize={96}
        />
      </View>
    </View>
  )
}

export { FavouriteIdeas }
