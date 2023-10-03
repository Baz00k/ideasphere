import { useEffect } from "react"
import { SplashScreen } from "expo-router"
import {
  Comfortaa_300Light,
  Comfortaa_400Regular,
  Comfortaa_700Bold,
  useFonts,
} from "@expo-google-fonts/comfortaa"

import { useProtectedRoutes } from "~/utils/auth"

SplashScreen.preventAutoHideAsync()

interface AssetsLoaderProps {
  children: React.ReactNode
}

export const AssetsLoader: React.FC<AssetsLoaderProps> = ({ children }) => {
  const navigationReady = useProtectedRoutes()

  const [fontsLoaded] = useFonts({
    Comfortaa_300Light,
    Comfortaa_400Regular,
    Comfortaa_700Bold,
  })

  useEffect(() => {
    if (navigationReady && fontsLoaded) {
      SplashScreen.hideAsync()
    }
  }, [navigationReady, fontsLoaded])

  // Don't render any UI until all assets have been loaded
  if (!fontsLoaded) return null

  // Navigation will be ready only after mounting the app, so we have to render something, even if splash screen is still visible
  return <>{children}</>
}
