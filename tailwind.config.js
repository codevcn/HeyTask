/** @type {import('tailwindcss').Config} */
export default {
   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
   theme: {
      extend: {
         colors: {
            "regular-text-cl": "var(--ht-regular-text-cl)",
            "top-nav-bgcl": "var(--ht-top-nav-bgcl)",
            "hover-silver-bgcl": "var(--ht-hover-silver-bgcl)",
            "regular-border-cl": "var(--ht-regular-border-cl)",
            "secondary-text-cl": "var(--ht-secondary-text-cl)",
            "phase-bgcl": "var(--ht-phase-bgcl)",
            "modal-board-bgcl": "var(--ht-modal-board-bgcl)",
            "modal-btn-bgcl": "var(--ht-modal-btn-bgcl)",
            "modal-btn-hover-bgcl": "var(--ht-modal-btn-hover-bgcl)",
            "outline-cl": "var(--ht-outline-cl)",
            "confirm-btn-bgcl": "var(--ht-confirm-btn-bgcl)",
            "focused-textfield-bgcl": "var(--ht-focused-textfield-bgcl)",
            "rich-file-title-cl": "var(--ht-rich-file-title-cl)",
            "modal-popover-bgcl": "var(--ht-modal-popover-bgcl)",
            "delete-btn-bgcl": "var(--ht-delete-btn-bgcl)",
            "delete-btn-hover-bgcl": "var(--ht-delete-btn-hover-bgcl)",
            "confirm-btn-hover-bgcl": "var(--ht-confirm-btn-hover-bgcl)",
            "divider-cl": "var(--ht-divider-cl)",
            "modal-text-cl": "var(--ht-modal-text-cl)",
            "success-text-cl": "var(--ht-success-text-cl)",
            "radio-outline-cl": "var(--ht-radio-outline-cl)",
            "warning-text-cl": "var(--ht-warning-text-cl)",
         },
         height: {
            background: "calc(100% - var(--ht-top-nav-height))",
            "top-nav": "var(--ht-top-nav-height)",
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
