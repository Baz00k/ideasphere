import { SafeAreaProvider } from "react-native-safe-area-context"
import { Stack } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { SessionContextProvider } from "@supabase/auth-helpers-react"

import { RouteProtector } from "~/components/auth/routeProtector"
import { TRPCProvider } from "~/utils/api"
import { supabase } from "~/utils/auth"

const RootLayout = () => {
  return (
    <SessionContextProvider supabaseClient={supabase}>
      <RouteProtector>
        <TRPCProvider>
          <SafeAreaProvider>
            {/*
              The Stack component displays the current page.
              It also allows you to configure your screens 
            */}
            <Stack
              screenOptions={{
                headerShown: false,
              }}
            />
            <StatusBar style="dark" animated />
          </SafeAreaProvider>
        </TRPCProvider>
      </RouteProtector>
    </SessionContextProvider>
  )
}

export default RootLayout
