import { View } from "react-native"

import { FavouriteIdeas } from "~/components"

const Favorites: React.FC = () => {
  return (
    <View className="flex h-full w-full bg-white p-4">
      <FavouriteIdeas />
    </View>
  )
}

export default Favorites
