export function detectCMS(html: string) {
    if (html.includes("wp-content")) return ["WordPress"];
    if (html.includes("cdn.shopify.com")) return ["Shopify"];
    if (html.includes("webflow")) return ["Webflow"];
    return [];
}
