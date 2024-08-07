# PWA

install

`yarn add @ducanh2912/next-pwa && yarn add -D webpack`

next.config.mjs

```js
import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
});

export default withPWA({
  // Your Next.js config
});
```

app/manifest.json

```json
{
    "name": "wibu example",
    "id": "makuro.bip.wibu.example",
    "dir": "auto",
    "short_name": "WXM",
    "description": "wibu example",
    "lang": "en",
    "scope": "/",
    "version": "0.0.1",
    "prefer_related_applications": true,
    "handle_links": "preferred",
    "launch_handler": {
      "client_mode": ["navigate-existing", "auto"]
    },
    "edge_side_panel": {
      "preferred_width": 400
    },
    "scope_extensions": [
      {
        "origin": "*.ravenstone.cloud"
      }
    ],
    "categories": ["utility"],
    "display_override": ["fullscreen", "standalone", "window-controls-overlay"],
    "screenshots": [
      {
        "src": "/icons/base.png",
        "sizes": "1280x720",
        "type": "image/jpg",
        "platform": "wide"
      }
    ],
    "shortcuts": [
      {
        "name": "Home",
        "url": "/"
      }
    ],
    "protocol_handlers": [
      {
        "protocol": "web+music",
        "url": "/play?track=%s"
      }
    ],
    "iarc_rating_id": "e58c174a-81d2-5c3c-32cc-34b8de4a52e9",
    "related_applications": [
      {
        "platform": "windows",
        "url": "https://www.example-app.com",
        "id": "example.ExampleApp"
      },
      {
        "platform": "play",
        "url": "https://www.example-app-2.com"
      }
    ],
    "icons": [
      {
        "src": "/icons/manifest-icon-192.maskable.png",
        "sizes": "192x192",
        "type": "image/png",
        "purpose": "any"
      },
      {
        "src": "/icons/manifest-icon-192.maskable.png",
        "sizes": "192x192",
        "type": "image/png",
        "purpose": "maskable"
      },
      {
        "src": "/icons/manifest-icon-512.maskable.png",
        "sizes": "512x512",
        "type": "image/png",
        "purpose": "any"
      },
      {
        "src": "/icons/manifest-icon-512.maskable.png",
        "sizes": "512x512",
        "type": "image/png",
        "purpose": "maskable"
      }
    ],
    "theme_color": "#FFFFFF",
    "background_color": "#FFFFFF",
    "start_url": "/",
    "display": "fullscreen",
    "orientation": "portrait"
  }
```

update metadata layout.tsx

```tsx
import type { Metadata, Viewport } from "next";

const APP_NAME = "PWA App";
const APP_DEFAULT_TITLE = "My Awesome PWA App";
const APP_TITLE_TEMPLATE = "%s - PWA App";
const APP_DESCRIPTION = "Best PWA app in the world!";

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
};
```
