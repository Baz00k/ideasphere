import type { Config } from "tailwindcss"

import baseConfig from "@ideasphere/tailwind-config"

export default {
  presets: [baseConfig],
  content: ["./src/**/*.{ts,tsx}"],
} satisfies Config
