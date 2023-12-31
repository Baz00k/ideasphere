import { useEffect, useState } from "react"
import { useRootNavigation, useRouter, useSegments } from "expo-router"
import { useSessionContext } from "@supabase/auth-helpers-react"

import { supabase } from "~/utils/auth/supabase"

const signOut = async () => {
  const response = await supabase.auth.signOut()

  return response
}

/**
 * Redirects the user to the login screen if they are not logged in
 * and redirects them to the home screen if they are logged in.
 * This hook should be used in the root component of your app.
 * This component requires supabase `SessionContextProvider` to be used higher up in the component tree.
 *
 * @example
 * const App = () => {
 *   const navigationReady = useProtectedRoutes()
 *   return navigationReady ? <Component /> : null
 * }
 *
 * @returns boolean - true if navigation is ready, false otherwise
 */
const useProtectedRoutes = () => {
  const sessionContext = useSessionContext()
  const router = useRouter()
  const segments = useSegments()
  const rootNavigation = useRootNavigation()

  const [navigationReady, setNavigationReady] = useState(false)

  useEffect(() => {
    // Check if navigation is ready (it is not ready on the first render causing an error)
    // See: https://github.com/expo/router/issues/740
    if (!rootNavigation || !rootNavigation.isReady()) {
      return
    }

    setNavigationReady(true)

    if (sessionContext.isLoading) return

    const inAuthGroup = segments[0] === "(auth)"
    const inPublicGroup = segments[0] === "(public)"

    const inNavigationRoot = !inAuthGroup && !inPublicGroup

    const user = sessionContext.session?.user

    // If the user is not logged in and they are trying to access an auth route
    if (!user && inAuthGroup) {
      // Redirect them to the auth screen
      router.replace("/logIn")
    } else if (user && inNavigationRoot) {
      // User already logged in, redirect them to auth home
      router.replace("/home")
    } else if (!user && inNavigationRoot) {
      // User not logged in, redirect them to auth screen
      router.replace("/logIn")
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionContext, segments])

  return navigationReady
}

export { signOut, useProtectedRoutes }
