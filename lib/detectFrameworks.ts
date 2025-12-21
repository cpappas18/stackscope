export function detectFrameworks(html: string) {
    const tech = [];

    if (html.includes("__NEXT_DATA__")) tech.push("Next.js");
    if (html.includes("data-reactroot")) tech.push("React");
    if (html.includes("ng-version")) tech.push("Angular");
    if (html.includes("data-v-")) tech.push("Vue");

    return tech;
}
