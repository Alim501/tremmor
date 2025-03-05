import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "brand-primary": "#1E40AF", // вот сюда добавляем кастомный цвет
      },
    },
  },
  plugins: [],
};

export default config;
