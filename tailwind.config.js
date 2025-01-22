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
            "phase-bgcl": "var(--ht-phase-bgcl)",
            "modal-board-bgcl": "var(--ht-modal-board-bgcl)",
            "modal-btn-bgcl": "var(--ht-modal-btn-bgcl)",
            "modal-btn-hover-bgcl": "var(--ht-modal-btn-hover-bgcl)",
            "outline-cl": "var(--ht-outline-cl)",
            "dark-outline-cl": "var(--ht-dark-outline-cl)",
            "focused-textfield-bgcl": "var(--ht-focused-textfield-bgcl)",
         },
         height: {
            "top-nav": "var(--ht-top-nav-height)",
            background: "calc(100% - var(--ht-top-nav-height))",
         },
         width: {
            "left-side-nav": "var(--ht-left-side-nav-width)",
            "main-board": "calc(100% - var(--ht-left-side-nav-width))",
            "task-modal": "var(--ht-task-modal-width)",
         },
      },
   },
   plugins: [],
}
