import type { ExpoConfig } from "@expo/config";

const defineConfig = (): ExpoConfig => ({
  name: "IdeaSphere",
  slug: "ideasphere",
  owner: "gustavson",
  scheme: "is",
  version: "1.0.0",
  orientation: "portrait",
  //TODO: Change to square icon
  icon: "./assets/ideasphere_logo.png",
  userInterfaceStyle: "automatic",
  splash: {
    image: "./assets/ideasphere_logo.png",
    resizeMode: "contain",
    backgroundColor: "#FFFFFF",
  },
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    supportsTablet: true,
    bundleIdentifier: "your.bundle.identifier",
  },
  android: {
    adaptiveIcon: {
      //TODO: Change to square icon
      foregroundImage: "./assets/ideasphere_logo.png",
      backgroundColor: "#FFFFFF",
    },
  },
  extra: {
    eas: {
      projectId: "343d47b1-d06f-4fbf-81a3-ce1c430e0f6b",
    },
  },
  plugins: ["./expo-plugins/with-modify-gradle.js"],
});

export default defineConfig;
