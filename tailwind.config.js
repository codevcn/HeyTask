/** @type {import('tailwindcss').Config} */
export default {
   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
   theme: {
      extend: {
         colors: {
            "regular-text-cl": "var(--ht-regular-text-cl)",
            "top-nav-bgcl": "var(--ht-top-nav-bgcl)",
            "hover-silver-bgcl": "var(--ht-hover-silver-bgcl)",
            "divider-cl": "var(--ht-divider-cl)",
            "secondary-text-cl": "var(--ht-secondary-text-cl)",
            "list-bgcl": "var(--ht-list-bgcl)",
         },
         height: {
            "top-nav-height": "var(--ht-top-nav-height)",
         },
         width: {
            "left-side-nav-width": "var(--ht-left-side-nav-width)",
         },
      },
   },
   plugins: [],
}
