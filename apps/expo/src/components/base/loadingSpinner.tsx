import { ActivityIndicator, View } from "react-native"

import { colors } from "@ideasphere/tailwind-config/themeColors"

interface LoadingSpinnerProps {
  size?: "small" | "large"
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = "large" }) => {
  return (
    <View className="flex w-full items-center justify-center p-2">
      <ActivityIndicator size={size} color={colors.primary} />
    </View>
  )
}
