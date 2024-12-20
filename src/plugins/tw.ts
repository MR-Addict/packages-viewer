import plugin from "tailwindcss/plugin";

const gradient = plugin(function ({ addComponents }) {
  addComponents({
    ".c-gradient-100": {
      "@apply bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-800 dark:to-neutral-900": {}
    },
    ".c-gradient-200": {
      "@apply bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-700 dark:to-neutral-800": {}
    }
  });
});

const border = plugin(function ({ addComponents }) {
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

const background = plugin(function ({ addComponents }) {
  addComponents({
    ".c-bg-100": {
      "@apply bg-white dark:bg-neutral-900": {}
    },
    ".c-bg-200": {
      "@apply bg-neutral-200 dark:bg-neutral-800": {}
    },
    ".c-bg-300": {
      "@apply bg-neutral-300 dark:bg-neutral-700": {}
    },
    ".c-bg-800": {
      "@apply bg-neutral-800 dark:bg-neutral-200": {}
    },
    ".c-bg-900": {
      "@apply bg-neutral-900 dark:bg-neutral-100": {}
    }
  });
});

const text = plugin(function ({ addComponents }) {
  addComponents({
    ".c-text-100": {
      "@apply text-neutral-100 dark:text-neutral-900": {}
    },
    ".c-text-600": {
      "@apply text-neutral-600 dark:text-neutral-500": {}
    },
    ".c-text-700": {
      "@apply text-neutral-700 dark:text-neutral-400": {}
    },
    ".c-text-800": {
      "@apply text-neutral-800 dark:text-neutral-300": {}
    },
    ".c-text-900": {
      "@apply text-neutral-900 dark:text-neutral-100": {}
    }
  });
});

const tw = [gradient, border, background, text];

export default tw;
