import { useEffect, type FC, type ReactNode } from "react"
import { SplashScreen } from "expo-router"

import { useProtectedRoutes } from "~/utils/auth"

interface RouteProtectorProps {
  children: ReactNode
}

/**
 * This component is used to protect routes that require authentication.
 * It will render the children only when the navigation is ready.
 * Otherwise, it will render nothing.
 *
 * This component should be used in the root component of your app.
 * This component requires supabase `SessionContextProvider` to be used higher up in the component tree.
 */
const RouteProtector: FC<RouteProtectorProps> = ({ children }) => {
  const navigationReady = useProtectedRoutes()

  SplashScreen.preventAutoHideAsync()

  useEffect(() => {
    if (navigationReady) {
      SplashScreen.hideAsync()
    }
  }, [navigationReady])

  return <>{children}</>
}

export { RouteProtector }
