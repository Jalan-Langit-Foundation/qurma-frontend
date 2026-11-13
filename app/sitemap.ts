import type { MetadataRoute } from "next";
import { ROUTES } from "@/config/navigation";
import { SITE_CONFIG } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE_CONFIG.url}${ROUTES.home}`,
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
