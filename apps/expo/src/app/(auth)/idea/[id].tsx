import { Pressable, ScrollView, Text, View } from "react-native"
import Animated, { BounceIn, FadeOut } from "react-native-reanimated"
import { SafeAreaView } from "react-native-safe-area-context"
import { useGlobalSearchParams } from "expo-router"
import { MaterialIcons } from "@expo/vector-icons"

import { colors } from "@ideasphere/tailwind-config/themeColors"

import { Button, IdeaView, LoadingSpinner } from "~/components"
import { api } from "~/utils/api"

export default function Idea() {
  const { id } = useGlobalSearchParams()
  if (!id || typeof id !== "string") throw new Error("Invalid id")

  const context = api.useContext()

  const { data, isLoading, isError } = api.ideas.byId.useQuery({ id })

  const invalidateIdea = () => {
    void context.ideas.byId.invalidate({ id })
  }

  const { mutate: favourite } = api.ideas.favourite.useMutation({
    onSuccess: invalidateIdea,

    onMutate: async (idea) => {
      await context.ideas.byId.cancel({ id })

      const previousData = context.ideas.byId.getData({ id })
      context.ideas.byId.setData({ id }, (data) => {
        if (data?.id === idea.id) {
          return {
            ...data,
            favoritedByMe: true,
            _count: {
              favoritedBy: data._count.favoritedBy + 1,
            },
          }
        }
        return data
      })

      return { previousData }
    },

    onError: (_, __, ctx) => {
      context.ideas.byId.setData({ id }, ctx?.previousData)
    },

    onSettled: invalidateIdea,
  })

  const { mutate: unfavourite } = api.ideas.unfavourite.useMutation({
    onSuccess: invalidateIdea,

    onMutate: async (idea) => {
      await context.ideas.byId.cancel({ id })

      const previousData = context.ideas.byId.getData({ id })
      context.ideas.byId.setData({ id }, (data) => {
        if (data?.id === idea.id) {
          return {
            ...data,
            favoritedByMe: false,
            _count: {
              favoritedBy: data._count.favoritedBy - 1,
            },
          }
        }
        return data
      })

      return { previousData }
    },

    onError: (_, __, ctx) => {
      context.ideas.byId.setData({ id }, ctx?.previousData)
    },

    onSettled: invalidateIdea,
  })

  return (
    <SafeAreaView
      className="relative h-full w-full bg-white"
      edges={{
        bottom: "off",
        top: "additive",
      }}
    >
      {isLoading && (
        <View className="fixed z-10 flex h-screen w-screen items-center justify-center bg-white">
          <LoadingSpinner />
        </View>
      )}
      <ScrollView>
        {((!isLoading && !data) || isError) && (
          <View>
            <Text className="p-4 text-center text-2xl">Coś poszło nie tak 😢</Text>
          </View>
        )}
        {data && <IdeaView idea={data} />}
      </ScrollView>

      <View className="absolute bottom-4 left-0 right-0 flex items-center">
        <View className="flex flex-row items-center gap-x-2 rounded-full bg-primary px-4 py-2">
          <Pressable
            onPress={() => (data?.favoritedByMe ? unfavourite({ id }) : favourite({ id }))}
          >
            {data?.favoritedByMe ? (
              <Animated.View entering={BounceIn.duration(200)} exiting={FadeOut.duration(200)}>
                <MaterialIcons name="favorite" size={24} color={colors.secondary} />
              </Animated.View>
            ) : (
              <MaterialIcons name="favorite-border" size={24} color={colors.secondary} />
            )}
          </Pressable>
          <Button>
            <MaterialIcons name="chat-bubble-outline" size={24} color={colors.secondary} />
          </Button>
        </View>
      </View>
    </SafeAreaView>
  )
}
