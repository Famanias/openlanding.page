import { cacheLife } from "next/cache";
import { connection } from "next/server";

async function getRepositoryStars(): Promise<number> {
  "use cache";
  cacheLife({ stale: 300, revalidate: 300, expire: 86400 });

  const response = await fetch("https://api.github.com/repos/Famanias/openlanding.page", {
    headers: {
      Accept: "application/vnd.github+json",
      "User-Agent": "openlandingpage",
      "X-GitHub-Api-Version": "2026-03-10",
    },
    signal: AbortSignal.timeout(5000),
  });
  if (!response.ok) throw new Error("GitHub repository unavailable");

  const data = await response.json();
  if (!Number.isSafeInteger(data.stargazers_count) || data.stargazers_count < 0) {
    throw new Error("Invalid GitHub star count");
  }
  return data.stargazers_count;
}

export async function GET() {
  await connection();
  try {
    const stars = await getRepositoryStars();
    return Response.json({ stars }, {
      headers: { "Cache-Control": "public, max-age=300, s-maxage=300, stale-while-revalidate=3600" },
    });
  } catch {
    return Response.json({ error: "Star count unavailable" }, {
      status: 503,
      headers: { "Cache-Control": "no-store" },
    });
  }
}
