import { useRef, useState } from "react"
import { RefreshControl, ScrollView } from "react-native"

import { TopWeeklyIdeas } from "~/components"
import type { TopWeeklyIdeasRef } from "~/components"

const Home: React.FC = () => {
  const topWeeklyIdeasRef = useRef<TopWeeklyIdeasRef>(null)

  const [isRefreshing, setIsRefreshing] = useState(false)

  const refresh = async () => {
    setIsRefreshing(true)
    await Promise.allSettled([topWeeklyIdeasRef.current?.refetch()])
    setIsRefreshing(false)
  }

  return (
    <ScrollView
      className="h-full w-full bg-white px-2"
      refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={refresh} />}
    >
      <TopWeeklyIdeas ref={topWeeklyIdeasRef} />
    </ScrollView>
  )
}

export default Home
