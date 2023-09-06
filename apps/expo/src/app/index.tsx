import { SafeAreaView } from "react-native-safe-area-context"

import { LoadingSpinner } from "~/components"

const Index: React.FC = () => {
  // Show loading indicator while we're checking the user's auth state
  return (
    <SafeAreaView className="flex h-full w-full items-center justify-center bg-white">
      <LoadingSpinner />
    </SafeAreaView>
  )
}

export default Index
