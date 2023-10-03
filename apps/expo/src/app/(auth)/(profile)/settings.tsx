import { useState } from "react"
import { Text } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

import { Button } from "~/components"
import { signOut } from "~/utils/auth"

const Settings: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false)

  const onSignOut = async () => {
    setIsLoading(true)
    await signOut()
    setIsLoading(false)
  }

  return (
    <SafeAreaView className="h-full w-full bg-white p-8">
      <Text className="font-comfortaa_400 text-3xl text-primary">Ustawienia</Text>
      <Button
        text="Wyloguj"
        type="outline"
        className="mt-auto"
        onPress={onSignOut}
        loading={isLoading}
      />
    </SafeAreaView>
  )
}

export default Settings
