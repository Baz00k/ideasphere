import { useState } from "react"
import { Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

import { Button, FavouriteIdeas, LoadingSpinner } from "~/components"
import { api } from "~/utils/api"
import { signOut } from "~/utils/auth"

const Profile: React.FC = () => {
  const { data, isLoading } = api.auth.getProfile.useQuery()

  const [loading, setLoading] = useState<boolean>(false)

  const handleSignOut = async () => {
    setLoading(true)
    await signOut()
    setLoading(false)
  }

  if (isLoading)
    return (
      <View className="flex h-full w-full items-center justify-center">
        <LoadingSpinner />
      </View>
    )

  return (
    <SafeAreaView className="flex h-full w-full bg-white p-4">
      {loading && (
        <View className="fixed z-10 flex h-screen w-screen items-center justify-center bg-white">
          <LoadingSpinner />
        </View>
      )}
      <View className="flex flex-col">
        <View className="mb-8 flex w-full flex-col items-center gap-y-4">
          <View className="flex w-full items-center">
            <View className="flex aspect-square w-28 items-center justify-center rounded-full bg-gray-100">
              <Text className="mt-3 align-middle text-5xl text-primary">
                {data?.username[0] ?? ""}
              </Text>
            </View>
          </View>
          <Text className="text-center text-xl text-primary">
            {data?.username ? `@${data.username}` : "username"}
          </Text>
        </View>
        <FavouriteIdeas />
        <Button
          onPress={handleSignOut}
          text="Wyloguj"
          loading={loading}
          type="outline"
          className="mb-4 mt-auto"
        />
      </View>
    </SafeAreaView>
  )
}

export default Profile
