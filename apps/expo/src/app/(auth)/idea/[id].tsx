import { ScrollView, Text, View } from "react-native"
import { useGlobalSearchParams } from "expo-router"

import { IdeaView, LoadingSpinner } from "~/components"
import { api } from "~/utils/api"

export default function Idea() {
  const { id } = useGlobalSearchParams()
  if (!id || typeof id !== "string") throw new Error("Invalid id")

  const { data, isLoading, isError } = api.ideas.byId.useQuery({ id })

  return (
    <ScrollView className="w-full bg-white">
      {isLoading && (
        <View className="flex h-48 w-full items-center justify-center">
          <LoadingSpinner />
        </View>
      )}
      {((!isLoading && !data) || isError) && (
        <View>
          <Text className="p-4 text-center text-2xl">Coś poszło nie tak 😢</Text>
        </View>
      )}
      {data && <IdeaView idea={data} />}
    </ScrollView>
  )
}
