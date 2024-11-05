import plugin from "tailwindcss/plugin";

export const gradient = plugin(function ({ addComponents }) {
  addComponents({
    ".c-gradient-100": {
      "@apply bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-800 dark:to-neutral-900": {}
    },
    ".c-gradient-200": {
      "@apply bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-700 dark:to-neutral-800": {}
    }
  });
});

export const border = plugin(function ({ addComponents }) {
  addComponents({
    ".c-border": {
      "@apply border border-neutral-300 dark:border-neutral-700": {}
    },
    ".c-border-t": {
      "@apply border-t border-neutral-300 dark:border-neutral-700": {}
    },
    ".c-border-b": {
      "@apply border-b border-neutral-300 dark:border-neutral-700": {}
    },
    ".c-border-l": {
      "@apply border-l border-neutral-300 dark:border-neutral-700": {}
    },
    ".c-border-r": {
      "@apply border-r border-neutral-300 dark:border-neutral-700": {}
    }
  });
});
