import { useState } from "react"
import { Text, View } from "react-native"
import { useUser } from "@supabase/auth-helpers-react"

import { Button } from "~/components"
import { signOut } from "~/utils/auth"

const Profile: React.FC = () => {
  const user = useUser()

  const [loading, setLoading] = useState<boolean>(false)

  const handleSignOut = async () => {
    setLoading(true)
    await signOut()
    setLoading(false)
  }

  return (
    user && (
      <View className="flex h-full w-full bg-white p-4">
        <View className="mb-4 flex w-full items-center">
          <View className="aspect-square w-1/3 rounded-full bg-gray-200"></View>
        </View>
        <Text className="my-8 text-center text-xl font-medium text-secondary">
          Zalogowano jako {user.email}
        </Text>
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
