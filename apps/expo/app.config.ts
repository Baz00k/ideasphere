import type { ExpoConfig } from "@expo/config"

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const skipEnvValidation =
  !!process.env.CI || !!process.env.SKIP_ENV_VALIDATION || process.env.npm_lifecycle_event === "npx"

if (!skipEnvValidation && (!SUPABASE_URL || !SUPABASE_ANON_KEY)) {
  throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY")
}

const defineConfig = (): ExpoConfig => ({
  name: "IdeaSphere",
  slug: "ideasphere",
  owner: "gustavson",
  scheme: "is",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/ideasphere_icon.png",
  userInterfaceStyle: "automatic",
  splash: {
    image: "./assets/ideasphere_splash.jpg",
    backgroundColor: "#FFFFFF",
    resizeMode: "contain",
  },
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    supportsTablet: true,
    bundleIdentifier: "dev.buzuk.ideasphere.app",
    icon: "./assets/appIcons/ios.png",
  },
  android: {
    package: "dev.buzuk.ideasphere.app",
    adaptiveIcon: {
      foregroundImage: "./assets/appIcons/android.png",
      backgroundColor: "#FFFFFF",
    },
    softwareKeyboardLayoutMode: "resize",
  },
  extra: {
    eas: {
      projectId: "343d47b1-d06f-4fbf-81a3-ce1c430e0f6b",
    },
    SUPABASE_URL,
    SUPABASE_ANON_KEY,
  },
  plugins: ["expo-router", "./expo-plugins/with-modify-gradle.js", "expo-apple-authentication"],
  experiments: {
    tsconfigPaths: true,
  },
})

export default defineConfig
