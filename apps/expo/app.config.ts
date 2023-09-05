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
  userInterfaceStyle: "light",
  splash: {
    image: "./assets/ideasphere_splash.png",
    backgroundColor: "#FFFFFF",
    resizeMode: "contain",
  },
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    supportsTablet: true,
    bundleIdentifier: "com.ideasphere.app",
    icon: "./assets/ideasphere_icon.png",
  },
  android: {
    package: "com.ideasphere.app",
    adaptiveIcon: {
      foregroundImage: "./assets/ideasphere_icon.png",
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
