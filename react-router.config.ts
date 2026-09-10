import type { Config } from "@react-router/dev/config";

export default {
  // Statik hosting: runtime SSR yok, ana sayfa build'de HTML olarak üretilir (SEO).
  ssr: false,
  prerender: ["/"],
} satisfies Config;
