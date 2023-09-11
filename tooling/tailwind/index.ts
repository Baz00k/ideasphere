import type { Config } from "tailwindcss"

import { colors } from "./themeColors"

export default {
  content: [""],
  theme: {
    extend: {
      colors,
    },
    fontFamily: {
      comfortaa: ["Comfortaa"],
    },
  },
  plugins: [],
} satisfies Config
