import type { Config } from "tailwindcss"

import { colors } from "./themeColors"

export default {
  content: [""],
  theme: {
    extend: {
      colors,
    },
  },
  plugins: [],
} satisfies Config
