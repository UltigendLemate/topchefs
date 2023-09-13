import { type Config } from "tailwindcss";
import {nextui} from "@nextui-org/react";


export default{
  content: [
    // ...
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        mont: 'Montserrat, sans-serif',
        pop: 'Poppins, sans-serif',
      },
    },
  },
  darkMode: "class",
  plugins: [nextui({
    addCommonColors: true,
  })],

} satisfies Config;