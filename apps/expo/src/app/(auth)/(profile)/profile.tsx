import { Text, View } from "react-native"

import { LoadingSpinner } from "~/components"
import { api } from "~/utils/api"

const Profile: React.FC = () => {
  const { data, isLoading } = api.auth.getProfile.useQuery()

  return (
    <>
      {isLoading && (
        <View className="fixed z-10 flex h-full w-full items-center justify-center bg-white">
          <LoadingSpinner />
        </View>
      )}
      <View className="flex grow flex-col bg-white">
        <View className="flex w-full flex-col items-center gap-y-4">
          <View className="flex w-full items-center">
            <View className="flex aspect-square w-24 items-center justify-center rounded-full bg-primary">
              <Text className="mt-3 p-1 align-middle font-comfortaa_700 text-5xl text-secondary">
                {data?.username[0] ?? ""}
              </Text>
            </View>
          </View>
          <Text className="text-center text-xl text-primary">
            {data?.username ? `@${data.username}` : "username"}
          </Text>
          <View className="flex w-full flex-row items-center justify-center gap-x-4">
            <View className="flex flex-col items-center">
              <Text className="text-center text-2xl font-bold text-primary">
                {data?.ideas.length}
              </Text>
              <Text className="text-center text-gray-400">Pomysłów</Text>
            </View>
            <View className="h-8 w-px bg-gray-200" />
            <View className="flex flex-col items-center">
              <Text className="text-center text-2xl font-bold text-primary">
                {data?.favoritedIdeas.length}
              </Text>
              <Text className="text-center text-gray-400">Ulubionych</Text>
            </View>
          </View>
          <View className="mb-4 h-px w-full bg-gray-200" />
        </View>
      </View>
    </>
  )
}

export default Profile
