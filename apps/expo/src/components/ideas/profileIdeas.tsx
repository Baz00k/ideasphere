import { View } from "react-native"
import { FlashList } from "@shopify/flash-list"

import { api } from "~/utils/api"
import { LoadingSpinner } from "../base"
import { IdeaGridItem } from "./ideaGridItem"

interface Props {
  mode: "public" | "private"
}

export const ProfileIdeas: React.FC<Props> = ({ mode }) => {
  const { data, isLoading, isRefetching, refetch, hasNextPage, fetchNextPage, isFetchingNextPage } =
    api.ideas.getProfileIdeas.useInfiniteQuery(
      { limit: 10, published: mode === "public" ? true : false },
      {
        getNextPageParam: (lastPage) => lastPage.nextPageCursor,
      },
    )

  const loadMore = () => {
    if (hasNextPage) {
      void fetchNextPage()
    }
  }

  return (
    <View className="h-full w-full pt-4">
      <FlashList
        data={data?.pages.map((page) => page.ideas).flat() ?? []}
        refreshing={isLoading || isRefetching}
        onRefresh={refetch}
        onEndReached={loadMore}
        onEndReachedThreshold={0.2}
        ListFooterComponent={isFetchingNextPage ? <LoadingSpinner /> : null}
        keyExtractor={(idea) => idea.id}
        numColumns={2}
        renderItem={({ item }) => <IdeaGridItem item={item} />}
        estimatedItemSize={96}
        // ListEmptyComponent={}
      />
    </View>
  )
}
