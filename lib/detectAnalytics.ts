export function detectAnalytics(html: string) {
    const tools = [];

    if (html.includes("googletagmanager.com")) tools.push("Google Tag Manager");
    if (html.includes("google-analytics.com")) tools.push("Google Analytics");
    if (html.includes("hotjar")) tools.push("Hotjar");

    return tools;
}
