import { NextResponse } from "next/server";
import * as cheerio from "cheerio";
import { z } from "zod";
import { detectFrameworks } from "@/lib/detectFrameworks";
import { detectCMS } from "@/lib/detectCMS";
import { detectAnalytics } from "@/lib/detectAnalytics";
import { detectHeaders } from "@/lib/detectHeaders";

const schema = z.object({
  url: z.string().url(),
});

export async function POST(req: Request) {
  const body = await req.json();
  const { url } = schema.parse(body);

  const res = await fetch(url, {
    headers: { "User-Agent": "StackScopeBot/1.0" },
  });

  const html = await res.text();
  const headers = Object.fromEntries(res.headers.entries());

  const $ = cheerio.load(html);

  return NextResponse.json({
    frameworks: detectFrameworks(html),
    cms: detectCMS(html),
    analytics: detectAnalytics(html),
    headers: detectHeaders(headers),
  });
}
