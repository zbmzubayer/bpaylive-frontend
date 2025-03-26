import { heroui } from "@heroui/react";
import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}", "./node_modules/@heroui/theme/dist/**/*.js"],
  theme: {
    extend: {
      container: {
        center: true,
        padding: "2rem",
      },
      colors: {
        accent: "hsl(var(--accent))",
        border: "hsl(var(--border))",
      },
    },
  },
  darkMode: "class",
  plugins: [heroui()],
} satisfies Config;
