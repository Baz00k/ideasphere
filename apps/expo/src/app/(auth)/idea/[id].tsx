import { ScrollView, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useGlobalSearchParams } from "expo-router"

import { IdeaView, LoadingSpinner } from "~/components"
import { api } from "~/utils/api"

export default function Idea() {
  const { id } = useGlobalSearchParams()
  if (!id || typeof id !== "string") throw new Error("Invalid id")

  const { data, isLoading, isError } = api.ideas.byId.useQuery({ id })

  return (
    <SafeAreaView className="h-full w-full bg-white pt-2">
      {isLoading && (
        <View className="fixed z-10 flex h-screen w-screen items-center justify-center bg-white">
          <LoadingSpinner />
        </View>
      )}
      <ScrollView>
        {((!isLoading && !data) || isError) && (
          <View>
            <Text className="p-4 text-center text-2xl">Coś poszło nie tak 😢</Text>
          </View>
        )}
        {data && <IdeaView idea={data} />}
      </ScrollView>
    </SafeAreaView>
  )
}
