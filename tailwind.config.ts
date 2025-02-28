import { heroui } from "@heroui/react";
import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}", "./node_modules/@heroui/theme/dist/**/*.js"],
  theme: {},
  darkMode: "class",
  plugins: [heroui()],
} satisfies Config;
