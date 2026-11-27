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
    {
      url: `${SITE_CONFIG.url}${ROUTES.fullPayment}`,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_CONFIG.url}${ROUTES.terms}`,
      changeFrequency: "monthly",
      priority: 0.3,
    },
  ];
}
