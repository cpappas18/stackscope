export interface HeaderInfo {
    server?: string;
    poweredBy?: string;
    framework?: string;
    security?: Record<string, string>;
    caching?: Record<string, string>;
    csp?: string;
    cors?: string;
    all: Record<string, string>;
}

export function detectHeaders(headers: Record<string, string>): HeaderInfo {
    const normalizedHeaders: Record<string, string> = {};
    
    Object.entries(headers).forEach(([key, value]) => {
        normalizedHeaders[key.toLowerCase()] = value.trim();
    });

    const result: HeaderInfo = {
        all: Object.fromEntries(
            Object.entries(headers).map(([key, value]) => [key, value.trim()])
        ),
    };

    if (normalizedHeaders["server"]) {
        result.server = normalizedHeaders["server"].trim();
    }

    if (normalizedHeaders["x-powered-by"]) {
        result.poweredBy = normalizedHeaders["x-powered-by"].trim();
    }

    if (normalizedHeaders["x-framework"]) {
        result.framework = normalizedHeaders["x-framework"].trim();
    }

    const securityHeaders: Record<string, string> = {};
    const securityHeaderKeys = [
        "strict-transport-security",
        "x-frame-options",
        "x-content-type-options",
        "x-xss-protection",
        "referrer-policy",
        "permissions-policy",
        "content-security-policy",
        "public-key-pins",
        "expect-ct",
    ];

    securityHeaderKeys.forEach((key) => {
        if (normalizedHeaders[key]) {
            securityHeaders[key] = normalizedHeaders[key].trim();
        }
    });

    if (Object.keys(securityHeaders).length > 0) {
        result.security = securityHeaders;
    }

    if (normalizedHeaders["content-security-policy"]) {
        result.csp = normalizedHeaders["content-security-policy"].trim();
    }

    const cachingHeaders: Record<string, string> = {};
    const cachingHeaderKeys = [
        "cache-control",
        "etag",
        "expires",
        "last-modified",
        "age",
    ];

    cachingHeaderKeys.forEach((key) => {
        if (normalizedHeaders[key]) {
            cachingHeaders[key] = normalizedHeaders[key].trim();
        }
    });

    if (Object.keys(cachingHeaders).length > 0) {
        result.caching = cachingHeaders;
    }

    if (normalizedHeaders["access-control-allow-origin"] || 
        normalizedHeaders["access-control-allow-methods"] ||
        normalizedHeaders["access-control-allow-headers"]) {
        result.cors = "Enabled";
    }

    return result;
}
