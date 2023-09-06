import { Pressable, Text, View } from "react-native"
import { Link } from "expo-router"
import { FlashList } from "@shopify/flash-list"

import { LoadingSpinner } from "~/components"
import { api } from "~/utils/api"

export const TopWeeklyIdeas: React.FC = () => {
  const { data, isLoading, isError } = api.ideas.weeklyTopIdeas.useQuery()

  return (
    <View className="min-h-32 w-full">
      <Text className="mb-6 text-center text-2xl font-light text-secondary">
        Najpopularniejsze w tym tygodniu
      </Text>
      {isLoading && <LoadingSpinner />}
      {isError && <ErrorView />}
      {data && data.length === 0 && <EmptyView />}
      {data && (
        <FlashList
          data={data}
          renderItem={({ item }) => (
            <Link
              href={{
                pathname: "/idea/[id]",
                params: { id: item.id },
              }}
              asChild
            >
              <Pressable className="mx-4 my-2 rounded-md bg-gray-100 px-4 py-2">
                <Text className="text-center text-xl font-bold">{item.title}</Text>
                <Text className="line-clamp-1 max-h-4 text-ellipsis text-center">
                  {item.description}
                </Text>
              </Pressable>
            </Link>
          )}
          estimatedItemSize={100}
        />
      )}
    </View>
  )
}

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
