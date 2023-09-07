import { useState } from "react"
import { Text, View } from "react-native"

import { Button, LoadingSpinner } from "~/components"
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
    data && (
      <View className="flex h-full w-full bg-white p-4">
        <View className="mb-4 flex w-full items-center">
          <View className="flex aspect-square w-1/3 items-center justify-center rounded-full bg-gray-100">
            <Text className="h-8 text-5xl text-secondary">{data.username[0]}</Text>
          </View>
        </View>
        <Text className="my-4 text-center text-xl font-medium text-secondary">{data.username}</Text>
        <Button
          onPress={handleSignOut}
          text="Wyloguj"
          loading={loading}
          className="my-10 mt-auto"
        />
      </View>
    )
  )
}

export default Profile
