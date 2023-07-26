import { Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

const Home: React.FC = () => {
  return (
    <SafeAreaView className="h-full w-full bg-white p-2">
      <View className=" flex w-full flex-row flex-wrap">
        <View className="aspect-square w-1/2 p-2">
          <View className="h-full w-full rounded-3xl bg-primary"></View>
        </View>
        <View className="aspect-square w-1/2 p-2">
          <View className="h-full w-full rounded-3xl bg-primary"></View>
        </View>
        <View className="aspect-square w-1/2 p-2">
          <View className="h-full w-full rounded-3xl bg-primary"></View>
        </View>
        <View className="aspect-square w-1/2 p-2">
          <View className="h-full w-full rounded-3xl bg-primary"></View>
        </View>
      </View>
      <Text className="my-8 text-center text-3xl font-light text-secondary">
        Najpopularniejsze w tym tygodniu
      </Text>
    </SafeAreaView>
  )
}

export default Home
