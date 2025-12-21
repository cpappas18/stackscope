export function detectFrameworks(html: string) {
    const tech: string[] = [];
    const lowerHtml = html.toLowerCase();

    if (
        lowerHtml.includes("__next_data__") ||
        lowerHtml.includes("_next/static") ||
        lowerHtml.includes("next.js") ||
        lowerHtml.includes("__nextjs_original-stack-frames")
    ) {
        tech.push("Next.js");
    }

    if (
        lowerHtml.includes("react-dom") ||
        lowerHtml.includes("react/") ||
        lowerHtml.includes("data-reactroot") ||
        lowerHtml.includes("data-react") ||
        lowerHtml.includes("react.development.js") ||
        lowerHtml.includes("react.production.js") ||
        lowerHtml.includes("__reactcontainer") ||
        lowerHtml.includes("react-helmet")
    ) {
        tech.push("React");
    }

    if (
        lowerHtml.includes("ng-version") ||
        lowerHtml.includes("ng-app") ||
        lowerHtml.includes("@angular/") ||
        lowerHtml.includes("angular.js") ||
        lowerHtml.includes("angular.min.js")
    ) {
        tech.push("Angular");
    }

    if (
        lowerHtml.includes("data-v-") ||
        lowerHtml.includes("vue.js") ||
        lowerHtml.includes("vue.min.js") ||
        lowerHtml.includes("@vitejs/plugin-vue") ||
        lowerHtml.includes("vue/dist/")
    ) {
        tech.push("Vue.js");
    }

    if (
        lowerHtml.includes("svelte") ||
        lowerHtml.includes("__svelte")
    ) {
        tech.push("Svelte");
    }

    if (
        lowerHtml.includes("preact") ||
        lowerHtml.includes("/preact/")
    ) {
        tech.push("Preact");
    }

    if (
        lowerHtml.includes("gatsby") ||
        lowerHtml.includes("___gatsby") ||
        lowerHtml.includes("gatsbyjs")
    ) {
        tech.push("Gatsby");
    }

    if (
        lowerHtml.includes("nuxt") ||
        lowerHtml.includes("__nuxt") ||
        lowerHtml.includes("_nuxt/")
    ) {
        tech.push("Nuxt.js");
    }

    if (
        lowerHtml.includes("remix") ||
        lowerHtml.includes("__remix")
    ) {
        tech.push("Remix");
    }

    if (
        lowerHtml.includes("sveltekit") ||
        lowerHtml.includes("@sveltejs/kit")
    ) {
        tech.push("SvelteKit");
    }

    return tech;
}
