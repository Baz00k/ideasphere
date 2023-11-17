import { Text, View } from "react-native"
import { FlashList } from "@shopify/flash-list"

import { api } from "~/utils/api"
import { LoadingSpinner } from "../base"
import { IdeaGridItem } from "./ideaGridItem"

const FavouriteIdeas: React.FC = () => {
  const { data, isLoading, refetch, isRefetching } = api.ideas.getProfileFavouriteIdeas.useQuery()

  return (
    <View className="mb-8 flex h-full w-full flex-col gap-y-4">
      <Text className="text-center font-comfortaa_400 text-2xl text-primary">
        Polubione przez Ciebie
      </Text>
      {isLoading && (
        <View className="py-8">
          <LoadingSpinner />
        </View>
      )}
      <View className="h-full w-full">
        <FlashList
          data={data}
          keyExtractor={(idea) => idea.id}
          refreshing={isRefetching}
          onRefresh={refetch}
          numColumns={2}
          renderItem={({ item }) => <IdeaGridItem item={item} />}
          estimatedItemSize={96}
        />
      </View>
    </View>
  )
}

export { FavouriteIdeas }
