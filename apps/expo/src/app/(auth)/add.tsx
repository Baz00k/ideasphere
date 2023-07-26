import React from "react"
import { Text } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

const Add: React.FC = () => {
  return (
    <SafeAreaView className="flex h-full w-full items-center justify-center bg-white">
      <Text className="text-2xl font-bold">Dodaj nowe atrakcje</Text>
    </SafeAreaView>
  )
}

export default Add
