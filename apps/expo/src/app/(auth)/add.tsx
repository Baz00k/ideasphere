import { useState } from "react"
import { ScrollView, Text, View } from "react-native"

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
    <ScrollView className="bg-white p-4">
      <View className="flex w-full flex-col items-center gap-y-4">
        <Text className="mb-4 w-full font-conmfortaa_700 text-2xl">Dodaj nowe atrakcje</Text>
        <Input
          className="mx-8 my-2 w-full bg-gray-50"
          placeholder="Tytuł"
          value={title}
          onChangeText={setTitle}
        />
        <Input
          className="mx-8 my-2 h-24 max-h-48 w-full bg-gray-50"
          placeholder="Opis"
          value={description}
          onChangeText={setDescription}
          multiline
        />
        <Button
          className="m-4 w-48"
          onPress={() => mutate({ title, description, published: true })}
          loading={isLoading}
        >
          <Text>Dodaj</Text>
        </Button>
      </View>
    </ScrollView>
  )
}

export default Add
