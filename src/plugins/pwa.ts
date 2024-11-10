import { appName } from "../data/app";
import { VitePWA } from "vite-plugin-pwa";

import colors from "tailwindcss/colors";

const themeColor = colors.neutral[900];

const pwa = VitePWA({
  registerType: "autoUpdate",
  manifest: {
    name: appName.name,
    short_name: appName.name,
    theme_color: themeColor,
    background_color: themeColor,
    display: "standalone",
    icons: [
      {
        src: "images/web-app-manifest-96x96.png",
        sizes: "96x96",
        type: "image/png",
        purpose: "any"
      },
      {
        src: "images/web-app-manifest-144x144.png",
        sizes: "144x144",
        type: "image/png",
        purpose: "any"
      },
      {
        src: "images/web-app-manifest-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any"
      },
      {
        src: "images/web-app-manifest-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any"
      }
    ],
    screenshots: [
      {
        src: "images/screenshot-wide-dark.png",
        sizes: "1680x1360",
        type: "image/png",
        form_factor: "wide",
        label: "dark mode of the home page wide screenshot"
      },
      {
        src: "images/screenshot-narrow-dark.png",
        sizes: "745x1360",
        type: "image/png",
        form_factor: "narrow",
        label: "dark mode of the home page narrow screenshot"
      },
      {
        src: "images/screenshot-wide-light.png",
        sizes: "1680x1360",
        type: "image/png",
        form_factor: "wide",
        label: "light mode of the home page wide screenshot"
      },
      {
        src: "images/screenshot-narrow-light.png",
        sizes: "745x1360",
        type: "image/png",
        form_factor: "narrow",
        label: "light mode of the home page narrow screenshot"
      }
    ]
  }
});

export default pwa;
