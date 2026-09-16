import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://shreeshyamkitchenconsultancy.com/sitemap.xml",
    host: "https://shreeshyamkitchenconsultancy.com",
  };
}
