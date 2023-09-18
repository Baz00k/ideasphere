import type { Config } from "tailwindcss"

import { colors } from "./themeColors"

export default {
  content: [""],
  theme: {
    extend: {
      colors,
    },
    fontFamily: {
      comfortaa_next: ["var(--font-comfortaa)", "system-ui", "sans-serif"],
      comfortaa_300: "Comfortaa_300Light",
      comfortaa_400: "Comfortaa_400Regular",
      comfortaa_700: "Comfortaa_700Bold",
    },
  },
  plugins: [],
} satisfies Config
