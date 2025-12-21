export function detectHeaders(headers: Record<string, string>) {
    const tech = [];

    if (headers["x-powered-by"]) tech.push(headers["x-powered-by"]);
    if (headers["server"]) tech.push(`Server: ${headers["server"]}`);

    return tech;
}
