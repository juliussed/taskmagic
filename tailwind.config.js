/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
      xxl: "1840px",
      xxxl: "2400px",
    },
    fontFamily: {
      cereal: ["Airbnb Cereal App", "sans-serif"],
    },
    extend: {
      colors: {
        danger: "#FF0606",
        primary: "#0166FF",
        secondary: "#FFFFFF",
        danger_accent: "#FFEBEB",
        kyc_active: "#E5EFFF",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".scrollbar-none": {
          "&::-webkit-scrollbar": { display: "none" },
          "scrollbar-width": "none",
          "-ms-overflow-style": "none",
        },
      });
    },
  ],
};
