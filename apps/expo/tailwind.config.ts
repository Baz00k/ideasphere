import { type Config } from "tailwindcss";

import baseConfig from "@ideasphere/tailwind-config";

export default {
  presets: [baseConfig],
  content: ["./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
} satisfies Config;
