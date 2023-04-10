/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme")

module.exports = {
    content: ["./src/**/*.{html,js}", "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}"],
    theme: {
        screens: {
            xs: "400px",
            ms: "550px",
            sm: "640px",
            md: "768px",
            lg: "1024px",
            xl: "1280px",
            xxl: "1326px",
            "2xl": "1536px",
            "3xl": "3000px"
        },
        extend: {
            fontFamily: {
                sansSerif: ["sans-serif"],
                pecita: ["pecita"],
                plus_jakarta_sans: ["plus_jakarta_sans", ...defaultTheme.fontFamily.sans]
            }
        }
    },
    plugins: [require("tailwind-scrollbar-hide"), require("flowbite/plugin"), require("@tailwindcss/line-clamp")]
}
