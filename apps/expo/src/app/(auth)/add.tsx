import { useState } from "react"
import { Image, ScrollView, Text, View } from "react-native"
import * as FileSystem from "expo-file-system"
import * as ImagePicker from "expo-image-picker"
import { PermissionStatus } from "expo-image-picker"
import { FlashList } from "@shopify/flash-list"

import { Button, Input } from "~/components"
import { api } from "~/utils/api"
import { supabase } from "~/utils/auth"

interface Image {
  base64: string
  aspectRatio: number
}

const Add: React.FC = () => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [base64Images, setBase64Images] = useState<Image[]>([])
  console.log(base64Images.map((image) => image.aspectRatio))

  const context = api.useContext()

  const { mutate, isLoading, error } = api.ideas.create.useMutation({
    async onSuccess() {
      setTitle("")
      setDescription("")
      await context.ideas.invalidate()
    },
  })

  const selectImages = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (status !== PermissionStatus.GRANTED) {
      alert("Sorry, we need camera roll permissions to make this work!")
      return
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
      allowsMultipleSelection: true,
      exif: false,
      base64: true,
      selectionLimit: 10,
    })

    if (!result.canceled) {
      setBase64Images(
        result?.assets?.map((image) => {
          return {
            base64: `data:image/jpeg;base64,${image.base64}`,
            aspectRatio: image.width / image.height,
          }
        }) ?? [],
      )
    }
  }

  return (
    <ScrollView className="h-full bg-white">
      <View className="flex w-full flex-col items-center gap-y-2 p-4">
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
        <View className="h-48 w-full bg-red-200">
          <FlashList
            data={base64Images}
            horizontal
            renderItem={({ item }) => (
              <Image source={{ uri: item.base64 }} className="aspect-auto h-48 object-contain" />
            )}
            ItemSeparatorComponent={() => <View className="w-4" />}
            ListEmptyComponent={
              <View className="flex h-full w-full flex-col items-center justify-center">
                <Text className="text-xl text-gray-400">Brak zdjęć</Text>
              </View>
            }
            bounces={false}
            centerContent
            showsHorizontalScrollIndicator
            snapToAlignment="center"
            estimatedItemSize={100}
          />
        </View>
        <Button onPress={selectImages} text="Dodaj zdjęcia" className="w-48" type="outline" />
      </View>
      <Button
        onPress={() => mutate({ title, description, published: true })}
        text="Dodaj"
        loading={isLoading}
        className="mx-auto mb-4 mt-8 w-48"
        disabled={!title || !description}
      />
    </ScrollView>
  )
}

export default Add
