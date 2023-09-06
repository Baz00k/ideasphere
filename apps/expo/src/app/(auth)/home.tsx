import { ScrollView, Text, View } from "react-native"
import { MaterialIcons } from "@expo/vector-icons"

import { TopWeeklyIdeas } from "~/components/ideas/topWeeklyIdeas"

interface TopAction {
  label: string
  icon: React.ComponentProps<typeof MaterialIcons>["name"]
  href: string
}

const TopActions: TopAction[] = [
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

const Home: React.FC = () => {
  return (
    <ScrollView className="h-full w-full bg-white px-2">
      <View className="my-4 flex w-full flex-row justify-between">
        {TopActions.map((action) => (
          <View key={action.label} className="m-2 flex w-1/5 flex-col justify-center gap-y-2">
            <View className="flex aspect-square w-full items-center justify-center rounded-full border-2 border-gray-500 bg-gray-50">
              <MaterialIcons name={action.icon} size={32} color="black" />
            </View>
            <Text className="text-center text-xs font-medium text-secondary">{action.label}</Text>
          </View>
        ))}
      </View>

      <TopWeeklyIdeas />
    </ScrollView>
  )
}

export default Home
