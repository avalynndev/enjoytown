"use server";

import { env } from "@/env.mjs";

export async function getDramaDownload(episode: any) {
    const res = await fetch(`${env.DOWNLOAD_API_URL}/episode/${episode}`, {
      next: { revalidate: 21600 },
    });
    const data = await res.json();
    return data;
  }