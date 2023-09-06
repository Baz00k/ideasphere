import { Text, View } from "react-native"
import { useGlobalSearchParams } from "expo-router"

import { LoadingSpinner } from "~/components"
import { api } from "~/utils/api"

export default function Idea() {
  const { id } = useGlobalSearchParams()
  if (!id || typeof id !== "string") throw new Error("Invalid id")

  const { data, isLoading, isError } = api.ideas.byId.useQuery({ id })

  if (isLoading) {
    return (
      <View className="flex h-full w-full items-center justify-center">
        <LoadingSpinner />
      </View>
    )
  }

  if (!data || isError) {
    return (
      <View>
        <Text className="text-center text-2xl">Coś poszło nie tak 😢</Text>
      </View>
    )
  }

  return (
    <View className="flex gap-4 p-4">
      <Text className="py-2 text-center text-3xl font-bold">{data.title}</Text>
      <Text className="py-4">{data.description}</Text>
    </View>
  )
}
