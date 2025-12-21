import { NextResponse } from "next/server";
import { chromium } from "playwright";
import { z } from "zod";
import { detectFrameworks } from "@/lib/detectFrameworks";
import { detectCMS } from "@/lib/detectCMS";
import { detectAnalytics } from "@/lib/detectAnalytics";
import { detectHeaders } from "@/lib/detectHeaders";
import { detectSignIn } from "@/lib/detectSignIn";

const schema = z.object({
    url: z.string(),
});

function normalizeUrl(input: string): string {
    if (!input.startsWith("http://") && !input.startsWith("https://")) {
        return `https://${input}`;
    }
    return input;
}

function getBrowserlessEndpoint(): string {
    const wsEndpoint = process.env.BROWSERLESS_WS_ENDPOINT;
    if (wsEndpoint) return wsEndpoint;

    const token = process.env.BROWSERLESS_TOKEN;
    if (token) {
        return `wss://chrome.browserless.io?token=${token}`;
    }

    throw new Error(
        "BROWSERLESS_WS_ENDPOINT or BROWSERLESS_TOKEN environment variable is required"
    );
}

export async function POST(req: Request) {
    const startedAt = Date.now();

    let browser;
    let html = "";
    let headers: Record<string, string> = {};

    try {
        const body = await req.json();
        const parsed = schema.parse(body);
        const url = normalizeUrl(parsed.url);

        browser = await chromium.connectOverCDP(getBrowserlessEndpoint());

        const context = await browser.newContext({
            userAgent: "StackScopeBot/1.0",
        });

        const page = await context.newPage();
        const response = await page.goto(url, {
            waitUntil: "networkidle",
            timeout: 30_000,
        });

        if (!response) {
            throw new Error("Failed to load page");
        }

        await page.waitForLoadState("domcontentloaded");
        await page.waitForLoadState("networkidle");
        await page.waitForTimeout(1000);

        html = await page.content();
        
        const scriptsHtml = await page.evaluate(() => {
            const scripts = Array.from(document.querySelectorAll("script"));
            return scripts.map(script => script.innerHTML || script.src || script.textContent || "").join(" ");
        });

        const windowProps = await page.evaluate(() => {
            const props: string[] = [];
            if ((window as any).React) props.push("react");
            if ((window as any).__NEXT_DATA__) props.push("nextjs");
            if ((window as any).__NUXT__) props.push("nuxt");
            if ((window as any).__REACT_DEVTOOLS_GLOBAL_HOOK__) props.push("react");
            if ((window as any).ng) props.push("angular");
            if ((window as any).Vue) props.push("vue");
            if ((window as any).svelte) props.push("svelte");
            return props.join(" ");
        }).catch(() => "");

        html = html + " " + scriptsHtml + " " + windowProps;
        headers = response.headers();

        await page.close();
        await context.close();
    } catch (error) {
        const message =
            error instanceof Error ? error.message : "An unknown error occurred";

        return NextResponse.json(
            {
                error: "SCAN_FAILED",
                message,
            },
            { status: 500 }
        );
    } finally {
        if (browser) {
            await browser.close();
        }
    }

    return NextResponse.json({
        scannedAt: new Date().toISOString(),
        durationMs: Date.now() - startedAt,
        renderMode: "js-rendered",
        frameworks: detectFrameworks(html),
        cms: detectCMS(html),
        analytics: detectAnalytics(html),
        signIn: detectSignIn(html),
        headers: detectHeaders(headers),
    });
}
