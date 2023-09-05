import { ActivityIndicator, Text, View } from "react-native"

import { api } from "~/utils/api"

export const TopWeeklyIdeas: React.FC = () => {
  const { data, isLoading } = api.ideas.getWeeklyTopIdeas.useQuery()

  if (isLoading) {
    return (
      <View className="flex w-full items-center justify-center">
        <ActivityIndicator size={"large"} color={"black"} />
      </View>
    )
  }

  if (data?.length === 0) {
    return (
      <View>
        <Text className="text-center text-2xl">Brak pomysłów na ten tydzień 😢</Text>
      </View>
    )
  }

  return (
    <View>
      {data?.map((idea) => (
        <View key={idea.id} className="m-4 rounded-md bg-gray-200 px-4 py-2">
          <Text className="text-center text-xl font-bold">{idea.title}</Text>
          <Text className="text-center text-lg">{idea.description}</Text>
        </View>
      ))}
    </View>
  )
}
