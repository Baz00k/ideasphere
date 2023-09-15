import { useState } from "react"
import { ScrollView, Text, View } from "react-native"

import { Button, Input } from "~/components"
import { api } from "~/utils/api"

const Add: React.FC = () => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  const context = api.useContext()

  const { mutate, isLoading, error } = api.ideas.create.useMutation({
    async onSuccess() {
      setTitle("")
      setDescription("")
      await context.ideas.invalidate()
    },
  })

  return (
    <ScrollView className="bg-white p-4">
      <View className="flex w-full flex-col items-center gap-y-2">
        <Text className="mb-4 w-full font-conmfortaa_700 text-2xl">Dodaj nowe atrakcje</Text>
        <Input
          className="bg-gray-100"
          placeholder="Tytuł"
          value={title}
          onChangeText={setTitle}
          error={error?.data?.zodError?.fieldErrors?.title}
        />
        <Input
          className="h-32 bg-gray-100"
          placeholder="Opis"
          value={description}
          onChangeText={setDescription}
          multiline
          textAlignVertical="top"
          error={error?.data?.zodError?.fieldErrors?.description}
        />
        <Button
          onPress={() => mutate({ title, description, published: true })}
          text="Dodaj"
          loading={isLoading}
          className="w-48"
          disabled={!title || !description}
        />
      </View>
    </ScrollView>
  )
}

export default Add
