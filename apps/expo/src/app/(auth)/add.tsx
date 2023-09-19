import { useState } from "react"
import { ScrollView, Text, View } from "react-native"
import { Image } from "expo-image"
import * as ImagePicker from "expo-image-picker"
import { PermissionStatus } from "expo-image-picker"
import type { ImagePickerAsset } from "expo-image-picker"
import { FlashList } from "@shopify/flash-list"
import { decode } from "base64-arraybuffer"

import { SUPABASE_IMAGES_BUCKET } from "@ideasphere/consts"

import { Button, Input } from "~/components"
import { api } from "~/utils/api"
import { supabase } from "~/utils/auth"

const Add: React.FC = () => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [images, setImages] = useState<ImagePickerAsset[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const context = api.useContext()

  const {
    isLoading: isMutationLoading,
    error: mutationError,
    mutateAsync,
  } = api.ideas.createOrUpdate.useMutation({
    async onSuccess() {
      await context.ideas.invalidate()
    },
  })

  const selectImages = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
      if (status !== PermissionStatus.GRANTED) {
        alert("Musisz zezwolić na dostęp do galerii, aby móc dodać zdjęcia")
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
        setImages(result.assets)
      }
    } catch (error) {
      alert("Wystąpił błąd podczas dodawania zdjęć")
    }
  }

  const createIdea = async () => {
    try {
      setIsLoading(true)

      const { id } = await mutateAsync({
        title,
        description,
        published: !(images.length > 0),
      })

      if (images.length === 0) return

      const promises = images.map((image) => {
        const fileType = "image/png"
        const fileName = (image.assetId ?? image.fileName ?? new Date().getTime())
          .toString()
          .replaceAll(/[:/\\]/g, "-")

        const file = decode(image.base64!)

        return supabase.storage.from(SUPABASE_IMAGES_BUCKET).upload(`${id}/${fileName}`, file, {
          contentType: fileType,
        })
      })

      const results = await Promise.all(promises)

      results.forEach((result) => {
        if (result.error) {
          throw result.error
        }
      })

      await mutateAsync({
        id,
        title,
        description,
        published: true,
        images: results.map((result) => result.data!.path),
      })

      setImages([])
    } catch (error) {
      console.error(error)
      alert("Wystąpił błąd podczas dodawania atrakcji")
    } finally {
      setTitle("")
      setDescription("")
      setIsLoading(false)
      alert("Atrakcja została dodana")
    }
  }

  return (
    <ScrollView className="h-full bg-white">
      <View className="flex w-full flex-col items-center gap-y-2 p-4">
        <Text className="mb-4 w-full text-center font-comfortaa_400 text-2xl">
          Dodaj nowe atrakcje
        </Text>
        <Input
          className="bg-gray-100"
          placeholder="Tytuł"
          value={title}
          onChangeText={setTitle}
          error={mutationError?.data?.zodError?.fieldErrors?.title}
        />
        <Input
          className="h-32 bg-gray-100"
          placeholder="Opis"
          value={description}
          onChangeText={setDescription}
          multiline
          textAlignVertical="top"
          error={mutationError?.data?.zodError?.fieldErrors?.description}
        />
        {images.length > 0 && (
          <View className="h-48 w-full">
            <FlashList
              data={images}
              horizontal
              renderItem={({ item }) => (
                <Image
                  source={{ uri: item.uri }}
                  className="h-full rounded-md"
                  style={{ aspectRatio: item.width / item.height }}
                />
              )}
              ItemSeparatorComponent={() => <View className="w-4" />}
              bounces={false}
              showsHorizontalScrollIndicator={false}
              centerContent
              snapToAlignment="center"
              estimatedItemSize={100}
            />
          </View>
        )}
        <View className="flex flex-row flex-wrap justify-center gap-x-4">
          <Button
            onPress={selectImages}
            text={images.length > 0 ? "Zmień zdjęcia" : "Dodaj zdjęcia"}
            type="outline"
          />
          {images.length > 0 && (
            <Button onPress={() => setImages([])} text="Usuń zdjęcia" type="outline" />
          )}
        </View>
      </View>
      <Button
        onPress={createIdea}
        text="Dodaj"
        loading={isLoading || isMutationLoading}
        className="mx-auto mb-4 mt-8 w-48"
        disabled={!title || !description}
      />
    </ScrollView>
  )
}

export default Add
