import { useState } from "react"
import { Text } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

import { Button, Input } from "~/components"
import { api } from "~/utils/api"

const Add: React.FC = () => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  const context = api.useContext()

  const { mutate, error, isLoading } = api.ideas.create.useMutation({
    async onSuccess() {
      setTitle("")
      setDescription("")
      await context.ideas.invalidate()
    },
  })

  return (
    <SafeAreaView className="flex h-full w-full items-center bg-white text-center">
      <Text className="text-2xl font-bold">Dodaj nowe atrakcje</Text>
      <Input className="mt-4" placeholder="Tytuł" value={title} onChangeText={setTitle} />
      <Input
        className="mt-4"
        placeholder="Opis"
        value={description}
        onChangeText={setDescription}
      />
      <Button
        className="mt-4"
        onPress={() => mutate({ title, description, published: true })}
        loading={isLoading}
      >
        <Text>Dodaj</Text>
      </Button>

      {error && <Text className="text-center text-lg text-red-500">{error.message}</Text>}
    </SafeAreaView>
  )
}

export default Add
