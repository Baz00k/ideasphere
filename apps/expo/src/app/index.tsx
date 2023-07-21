import { ActivityIndicator } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

const Index: React.FC = () => {
  // Show loading indicator while we're checking the user's auth state
  return (
    <SafeAreaView className="flex h-full w-full items-center justify-center bg-white">
      <ActivityIndicator size={"large"} color="black" />
    </SafeAreaView>
  )
}

export default Index
