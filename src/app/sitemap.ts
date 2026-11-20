import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_URL;
  const now = new Date();

  return [
    { url: `${baseUrl}/`, lastModified: now, changeFrequency: "daily", priority: 1.0 },
    { url: `${baseUrl}/horoscope`, lastModified: now, changeFrequency: "daily", priority: 0.98 },
    { url: `${baseUrl}/kundali`, lastModified: now, changeFrequency: "weekly", priority: 0.95 },
    { url: `${baseUrl}/kundali-matching`, lastModified: now, changeFrequency: "weekly", priority: 0.95 },
    { url: `${baseUrl}/services`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${baseUrl}/book`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${baseUrl}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.75 },
    { url: `${baseUrl}/privacy-policy`, lastModified: now, changeFrequency: "yearly", priority: 0.4 },
    { url: `${baseUrl}/terms-of-service`, lastModified: now, changeFrequency: "yearly", priority: 0.4 },
  ];
}
// END OF FILE
