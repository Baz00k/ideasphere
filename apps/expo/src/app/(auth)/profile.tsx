import { useState } from "react"
import { Text } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useUser } from "@supabase/auth-helpers-react"

import { signOut } from "~/utils/auth"
import { Button } from "~/components"

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
      <SafeAreaView className="h-full w-full bg-white p-4">
        <Text className="my-8 text-center text-2xl font-medium text-secondary">
          Signed in as {user.email}
        </Text>
        <Button onPress={handleSignOut} text="Wyloguj" loading={loading} />
      </SafeAreaView>
    )
  )
}

export default Profile
