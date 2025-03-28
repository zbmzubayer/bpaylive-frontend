import { ENV_CLIENT } from "@/config";
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/admin",
        "/admin/dashboard",
        "/admin/user",
        "/admin/advertisement",
        "/admin/match",
        "/admin/sport",
        "/admin/channel",
      ],
    },
    sitemap: `${ENV_CLIENT.NEXT_PUBLIC_BASE_URL}/sitemap.xml`,
  };
}
