import { useState } from "react"
import { Text, TouchableOpacity, View } from "react-native"
import { Link } from "expo-router"
import { FlashList } from "@shopify/flash-list"
import { throttle } from "lodash"

import { Input, LoadingSpinner } from "~/components"
import { api } from "~/utils/api"

const SEARCH_DEBOUNCE_TIME = 500

const Search: React.FC = () => {
  const [search, setSearch] = useState("")
  const { data, isLoading, isRefetching, refetch, hasNextPage, fetchNextPage, isFetchingNextPage } =
    api.ideas.search.useInfiniteQuery(
      { query: search, limit: 15 },
      {
        getNextPageParam: (lastPage) => lastPage.nextPageCursor,
      },
    )

  const loadMore = () => {
    if (hasNextPage) {
      void fetchNextPage()
    }
  }

  const throttledSetSearch = throttle(setSearch, SEARCH_DEBOUNCE_TIME)

  return (
    <View className="flex h-full w-full bg-white p-4">
      <Text className="text-center font-comfortaa_400 text-2xl">Wyszukaj</Text>
      <Input placeholder="Wyszukaj" value={search} onChangeText={throttledSetSearch} />

      <FlashList
        className="mt-4"
        data={data?.pages.map((page) => page.ideas).flat() ?? []}
        refreshing={isLoading || isRefetching}
        onRefresh={refetch}
        onEndReached={loadMore}
        onEndReachedThreshold={0.2}
        ListFooterComponent={isFetchingNextPage ? <LoadingSpinner /> : null}
        renderItem={({ item }) => (
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
                <Text className="font-comfortaa_700 text-xl" numberOfLines={1}>
                  {item.title}
                </Text>
                <Text className="font-comfortaa_300" numberOfLines={1}>
                  {item.description}
                </Text>
              </View>
            </TouchableOpacity>
          </Link>
        )}
        ListEmptyComponent={() => {
          if (isLoading) return

          return <Text className="text-center">Brak wyników</Text>
        }}
        keyExtractor={(item) => item.id}
        estimatedItemSize={100}
      />
    </View>
  )
}

export default Search
