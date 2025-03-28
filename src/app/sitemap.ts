import { ENV_CLIENT } from "@/config";
import { MatchWithSportAndChannel } from "@/types";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const res = await fetch(`${ENV_CLIENT.NEXT_PUBLIC_API_BASE_URL}/match`);
  const data = await res.json();
  const matches: MatchWithSportAndChannel[] = data?.data;
  const matchEntries: MetadataRoute.Sitemap = matches.map((match) => ({
    url: match.url,
    lastModified: new Date(match.updatedAt),
  }));

  return [
    {
      url: `${ENV_CLIENT.NEXT_PUBLIC_BASE_URL}`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    ...matchEntries,
  ];
}
