import { forwardRef, useImperativeHandle } from "react"
import { Text, View } from "react-native"
import { FlashList } from "@shopify/flash-list"

import { LoadingSpinner } from "~/components/base/loadingSpinner"
import { IdeaListItem } from "~/components/ideas/ideaListItem"
import { api } from "~/utils/api"

export interface TopWeeklyIdeasRef {
  refetch: () => Promise<void>
}

export const TopWeeklyIdeas: React.FC = forwardRef(function TopWeeklyIdeasInner(_, ref) {
  const { data, isLoading, isError, refetch } = api.ideas.weeklyTopIdeas.useQuery()

  useImperativeHandle(ref, () => ({ refetch }))

  return (
    <View className="min-h-32 w-full">
      <Text className="mb-6 text-center text-2xl font-light text-secondary">
        Najpopularniejsze w tym tygodniu
      </Text>
      {isLoading && <LoadingSpinner />}
      {isError && <ErrorView />}
      {data && data.length === 0 && <EmptyView />}
      {data && data.length > 0 && (
        <FlashList
          data={data}
          renderItem={({ item }) => <IdeaListItem item={item} />}
          estimatedItemSize={100}
        />
      )}
    </View>
  )
})

const ErrorView: React.FC = () => {
  return (
    <View>
      <Text className="text-center text-2xl">Coś poszło nie tak 😢</Text>
    </View>
  )
}

const EmptyView: React.FC = () => {
  return (
    <View>
      <Text className="text-center text-2xl">Brak pomysłów na ten tydzień 😢</Text>
    </View>
  )
}
