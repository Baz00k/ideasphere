import { useRef, useState } from "react"
import { RefreshControl, ScrollView, Text, View } from "react-native"
import { MaterialIcons } from "@expo/vector-icons"

import { colors } from "@ideasphere/tailwind-config/themeColors"

import { TopWeeklyIdeas } from "~/components"
import type { TopWeeklyIdeasRef } from "~/components"

const Home: React.FC = () => {
  const topWeeklyIdeasRef = useRef<TopWeeklyIdeasRef>(null)

  const [isRefreshing, setIsRefreshing] = useState(false)

  const refresh = async () => {
    setIsRefreshing(true)
    await topWeeklyIdeasRef.current?.refresh()
    setIsRefreshing(false)
  }

  return (
    <ScrollView
      className="h-full w-full bg-white px-2"
      refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={refresh} />}
    >
      <TopActions />
      <TopWeeklyIdeas ref={topWeeklyIdeasRef} />
    </ScrollView>
  )
}

export default Home

interface TopAction {
  label: string
  icon: React.ComponentProps<typeof MaterialIcons>["name"]
  href: string
}

const TopActionsArr: TopAction[] = [
  {
    label: "Wyszukaj pomysł",
    icon: "search",
    href: "/search",
  },
  {
    label: "Top pomysły",
    icon: "favorite",
    href: "/top",
  },
  {
    label: "Społeczność",
    icon: "groups",
    href: "/community",
  },
  {
    label: "Dodaj pomysł",
    icon: "add",
    href: "/add",
  },
]

const TopActions: React.FC = () => {
  return (
    <View className="my-4 flex w-full flex-row items-start justify-between">
      {TopActionsArr.map((action) => (
        <View key={action.label} className="m-2 flex w-1/5 flex-col justify-center gap-y-2">
          <View className="flex aspect-square w-full items-center justify-center rounded-full border-2 border-primary bg-gray-50">
            <MaterialIcons name={action.icon} size={32} color={colors.primary} />
          </View>
          <Text className="text-center text-xs font-medium text-primary">{action.label}</Text>
        </View>
      ))}
    </View>
  )
}
