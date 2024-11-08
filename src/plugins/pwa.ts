import { app } from "../data/app";
import { VitePWA } from "vite-plugin-pwa";

const pwa = VitePWA({
  registerType: "autoUpdate",
  manifest: {
    name: app.name,
    short_name: app.name,
    theme_color: "#171717",
    background_color: "#171717",
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
        src: "images/screenshot-wide.jpeg",
        sizes: "2656x1436",
        type: "image/jpeg",
        form_factor: "wide",
        label: "wide scrrenshot of the home page"
      },
      {
        src: "images/screenshot-narrow.jpeg",
        sizes: "970x1570",
        type: "image/jpeg",
        form_factor: "narrow",
        label: "narrow scrrenshot of the home page"
      }
    ]
  }
});

export default pwa;
