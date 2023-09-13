import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react"
import { LayoutAnimation, Text, View } from "react-native"
import { FlashList } from "@shopify/flash-list"
import type { inferRouterOutputs } from "@trpc/server"

import type { AppRouter } from "@ideasphere/api"

import { LoadingSpinner } from "~/components/base/loadingSpinner"
import { IdeaListItem } from "~/components/ideas/ideaListItem"
import { api } from "~/utils/api"

export interface TopWeeklyIdeasRef {
  refetch: () => Promise<unknown>
}

type FlashListData = inferRouterOutputs<AppRouter>["ideas"]["weeklyTopIdeas"][number]

export const TopWeeklyIdeas = forwardRef<TopWeeklyIdeasRef>(function TopWeeklyIdeasInner(_, ref) {
  useImperativeHandle(ref, () => ({ refetch }))

  const listRef = useRef<FlashList<FlashListData>>(null)
  const [listData, setListData] = useState<typeof data>()

  const utils = api.useContext()
  const invalidateTopWeeklyIdeas = async () => {
    await utils.ideas.weeklyTopIdeas.invalidate()
  }

  const { data, isLoading, isError, refetch } = api.ideas.weeklyTopIdeas.useQuery()
  const { mutate: favourite } = api.ideas.favourite.useMutation({
    onSuccess: invalidateTopWeeklyIdeas,

    // Optimistic update - add a fake favorite to the list
    onMutate: async (idea) => {
      await utils.ideas.weeklyTopIdeas.cancel()

      const previousData = utils.ideas.weeklyTopIdeas.getData()
      utils.ideas.weeklyTopIdeas.setData(undefined, (data) => {
        return data?.map((item) => {
          if (item.id === idea.id) {
            return {
              ...item,
              favoritedByMe: true,
              _count: {
                favoritedBy: item._count.favoritedBy + 1,
              },
            }
          }
          return item
        })
      })

      return { previousData }
    },

    onError: (_, __, context) => {
      utils.ideas.weeklyTopIdeas.setData(undefined, context?.previousData)
    },

    onSettled: () => {
      void utils.ideas.weeklyTopIdeas.invalidate()
    },
  })

  const { mutate: unfavourite } = api.ideas.unfavourite.useMutation({
    onSuccess: invalidateTopWeeklyIdeas,

    // Optimistic update - remove a fake favorite from the list
    onMutate: async (idea) => {
      await utils.ideas.weeklyTopIdeas.cancel()

      const previousData = utils.ideas.weeklyTopIdeas.getData()
      utils.ideas.weeklyTopIdeas.setData(undefined, (data) => {
        return data?.map((item) => {
          if (item.id === idea.id) {
            return {
              ...item,
              favoritedByMe: false,
              _count: {
                favoritedBy: item._count.favoritedBy - 1,
              },
            }
          }
          return item
        })
      })

      return { previousData }
    },

    onError: (_, __, context) => {
      utils.ideas.weeklyTopIdeas.setData(undefined, context?.previousData)
    },

    onSettled: () => {
      void utils.ideas.weeklyTopIdeas.invalidate()
    },
  })

  useEffect(() => {
    setListData(data)
    listRef.current?.prepareForLayoutAnimationRender()
    LayoutAnimation.configureNext({
      duration: 200,
      create: {
        type: LayoutAnimation.Types.easeInEaseOut,
        property: LayoutAnimation.Properties.opacity,
      },
      update: {
        type: LayoutAnimation.Types.easeInEaseOut,
      },
      delete: {
        type: LayoutAnimation.Types.easeInEaseOut,
        property: LayoutAnimation.Properties.opacity,
      },
    })
  }, [data])

  return (
    <View className="min-h-full w-full">
      <Text className="mb-6 text-center font-comfortaa_400 text-xl text-primary">
        Najpopularniejsze w tym tygodniu
      </Text>
      {isLoading && <LoadingSpinner />}
      {isError && <ErrorView />}
      {listData && (
        <FlashList
          ref={listRef}
          data={listData}
          renderItem={({ item }) => (
            <IdeaListItem
              item={item}
              favourite={() => favourite({ id: item.id })}
              unfavourite={() => unfavourite({ id: item.id })}
            />
          )}
          keyExtractor={(item) => item.id}
          estimatedItemSize={100}
          ListEmptyComponent={EmptyView}
        />
      )}
    </View>
  )
})

const ErrorView: React.FC = () => {
  return (
    <View>
      <Text className="text-center text-2xl">Coś poszło nie tak 😢</Text>
    </View>
  )
}

const EmptyView: React.FC = () => {
  return (
    <View>
      <Text className="text-center text-2xl">Brak pomysłów na ten tydzień 😢</Text>
    </View>
  )
}
