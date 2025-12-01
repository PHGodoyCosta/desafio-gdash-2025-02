import type { Config } from "tailwindcss";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#50E3C2",
        secundary: "#F4A153",
        accent: "#273A57",
        colorTest: "#50E3C2"
      },
    },
  },
  plugins: [],
} satisfies Config;
