/** @type {import('tailwindcss').Config} */
export default {
   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
   theme: {
      extend: {
         colors: {
            "regular-cl": "var(--ht-regular-cl)",
            "regular-text-cl": "var(--ht-regular-text-cl)",
         },
      },
   },
   plugins: [],
}
