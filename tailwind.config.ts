import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        RalewayBold: ["RalewayBold"],
        RalewayExtraBold: ["RalewayExtraBold"],
        RalewayExtraLight: ["RalewayExtraLight"],
        RalewayLight: ["RalewayLight"],
        RalewayMedium: ["RalewayMedium"],
        RalewayRegular: ["RalewayRegular"],
        RalewaySemiBold: ["RalewaySemiBold"],
      },
      colors: {
        'dark-blue': '#124CC0',
        'pale-blue': '#E8F0FE',
        'background-blue': '#F6F9FF',
      },
    },
  },
  plugins: [],
};
export default config;
