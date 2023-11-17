import { Text, View } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import { Link } from "expo-router"

interface Props {
  item: {
    id: string
    title: string
  }
}

export const IdeaGridItem: React.FC<Props> = ({ item }) => {
  return (
    <View className="w-full p-2">
      <Link
        href={{
          pathname: "/idea/[id]",
          params: { id: item.id },
        }}
        asChild
      >
        <TouchableOpacity
          className="flex h-24 w-full items-center justify-center overflow-hidden rounded-xl bg-secondary p-4"
          activeOpacity={0.8}
        >
          <Text className="text-center font-comfortaa_400" numberOfLines={3}>
            {item.title}
          </Text>
        </TouchableOpacity>
      </Link>
    </View>
  )
}
