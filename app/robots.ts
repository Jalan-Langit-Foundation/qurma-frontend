import type { MetadataRoute } from "next";
import { PROTECTED_ROUTE_PREFIXES } from "@/config/navigation";
import { SITE_CONFIG } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [...PROTECTED_ROUTE_PREFIXES, "/session", "/design-system"],
    },
    sitemap: `${SITE_CONFIG.url}/sitemap.xml`,
    host: SITE_CONFIG.url,
  };
}
