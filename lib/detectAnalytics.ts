export function detectAnalytics(html: string): string[] {
    const tools: string[] = [];
    const lowerHtml = html.toLowerCase();

    if (
        lowerHtml.includes("googletagmanager.com") ||
        lowerHtml.includes("googletagmanager") ||
        lowerHtml.includes("gtag(") ||
        lowerHtml.includes("gtm.js") ||
        lowerHtml.includes("data-gtm")
    ) {
        tools.push("Google Tag Manager");
    }

    if (
        lowerHtml.includes("google-analytics.com") ||
        lowerHtml.includes("googleanalytics") ||
        lowerHtml.includes("ga.js") ||
        lowerHtml.includes("analytics.js") ||
        lowerHtml.includes("gtag.js") ||
        lowerHtml.includes("ga('create") ||
        lowerHtml.includes("ga('send") ||
        lowerHtml.includes("gtag('config") ||
        lowerHtml.includes("_gaq") ||
        lowerHtml.includes("__ga") ||
        lowerHtml.includes("ga-") ||
        lowerHtml.includes("google-analytics")
    ) {
        tools.push("Google Analytics");
    }

    if (
        lowerHtml.includes("hotjar") ||
        lowerHtml.includes("hotjar.com") ||
        lowerHtml.includes("hj(") ||
        lowerHtml.includes("hjid")
    ) {
        tools.push("Hotjar");
    }

    if (
        lowerHtml.includes("mixpanel") ||
        lowerHtml.includes("mixpanel.com") ||
        lowerHtml.includes("mixpanel.track") ||
        lowerHtml.includes("mixpanel.init")
    ) {
        tools.push("Mixpanel");
    }

    if (
        lowerHtml.includes("segment.io") ||
        lowerHtml.includes("segment.com") ||
        lowerHtml.includes("analytics.js") && lowerHtml.includes("segment") ||
        lowerHtml.includes("segmentcdn.com")
    ) {
        tools.push("Segment");
    }

    if (
        lowerHtml.includes("amplitude") ||
        lowerHtml.includes("amplitude.com") ||
        lowerHtml.includes("amplitude.init") ||
        lowerHtml.includes("amplitude.getInstance")
    ) {
        tools.push("Amplitude");
    }

    if (
        lowerHtml.includes("omniture") ||
        lowerHtml.includes("adobe analytics") ||
        lowerHtml.includes("adobedtm.com") ||
        lowerHtml.includes("omniture.com") ||
        lowerHtml.includes("s_code.js") ||
        lowerHtml.includes("appmeasurement.js")
    ) {
        tools.push("Adobe Analytics");
    }

    if (
        lowerHtml.includes("matomo") ||
        lowerHtml.includes("piwik") ||
        lowerHtml.includes("piwik.js") ||
        lowerHtml.includes("matomo.js")
    ) {
        tools.push("Matomo");
    }

    if (
        lowerHtml.includes("facebook pixel") ||
        lowerHtml.includes("fbq(") ||
        lowerHtml.includes("facebook.com/tr") ||
        lowerHtml.includes("connect.facebook.net/en_US/fbevents.js")
    ) {
        tools.push("Facebook Pixel");
    }

    if (
        lowerHtml.includes("linkedin insight") ||
        lowerHtml.includes("snap.licdn.com") ||
        lowerHtml.includes("_linkedin_partner_id")
    ) {
        tools.push("LinkedIn Insight Tag");
    }

    if (
        lowerHtml.includes("pinterest") ||
        lowerHtml.includes("pintrk(") ||
        lowerHtml.includes("pinterest.com/ct") ||
        lowerHtml.includes("pinimg.com/js/pinit_main.js")
    ) {
        tools.push("Pinterest Pixel");
    }

    if (
        lowerHtml.includes("twitter pixel") ||
        lowerHtml.includes("twq(") ||
        lowerHtml.includes("ads-twitter.com") ||
        lowerHtml.includes("analytics.twitter.com")
    ) {
        tools.push("Twitter Pixel");
    }

    if (
        lowerHtml.includes("tiktok pixel") ||
        lowerHtml.includes("tiktok.com/analytics") ||
        lowerHtml.includes("analytics.tiktok.com")
    ) {
        tools.push("TikTok Pixel");
    }

    if (
        lowerHtml.includes("clarity") ||
        lowerHtml.includes("clarity.ms") ||
        lowerHtml.includes("clarity.js")
    ) {
        tools.push("Microsoft Clarity");
    }

    if (
        lowerHtml.includes("fullstory") ||
        lowerHtml.includes("fullstory.com") ||
        lowerHtml.includes("fs.js")
    ) {
        tools.push("FullStory");
    }

    if (
        lowerHtml.includes("logrocket") ||
        lowerHtml.includes("logrocket.io") ||
        lowerHtml.includes("logrocket.js")
    ) {
        tools.push("LogRocket");
    }

    if (
        lowerHtml.includes("sentry.io") ||
        lowerHtml.includes("sentry-cdn.com") ||
        lowerHtml.includes("sentry.init")
    ) {
        tools.push("Sentry");
    }

    if (
        lowerHtml.includes("datadog") ||
        lowerHtml.includes("datadoghq.com") ||
        lowerHtml.includes("datadoghq-browser-agent")
    ) {
        tools.push("Datadog");
    }

    if (
        lowerHtml.includes("new relic") ||
        lowerHtml.includes("newrelic.com") ||
        lowerHtml.includes("nr-loader") ||
        lowerHtml.includes("newrelic")
    ) {
        tools.push("New Relic");
    }

    if (
        lowerHtml.includes("cloudflare analytics") ||
        lowerHtml.includes("cloudflareinsights.com") ||
        lowerHtml.includes("beacon.cloudflare.com")
    ) {
        tools.push("Cloudflare Analytics");
    }

    if (
        lowerHtml.includes("plausible") ||
        lowerHtml.includes("plausible.io") ||
        lowerHtml.includes("plausible.js")
    ) {
        tools.push("Plausible Analytics");
    }

    if (
        lowerHtml.includes("fathom") ||
        lowerHtml.includes("fathomanalytics.com") ||
        lowerHtml.includes("fathom.js")
    ) {
        tools.push("Fathom Analytics");
    }

    if (
        lowerHtml.includes("simple analytics") ||
        lowerHtml.includes("simpleanalytics.com") ||
        lowerHtml.includes("scripts.simpleanalyticscdn.com")
    ) {
        tools.push("Simple Analytics");
    }

    if (
        lowerHtml.includes("posthog") ||
        lowerHtml.includes("posthog.com") ||
        lowerHtml.includes("posthog.init") ||
        lowerHtml.includes("posthog-js")
    ) {
        tools.push("PostHog");
    }

    if (
        lowerHtml.includes("heap") ||
        lowerHtml.includes("heap.io") ||
        lowerHtml.includes("heapanalytics.com")
    ) {
        tools.push("Heap Analytics");
    }

    if (
        lowerHtml.includes("crazy egg") ||
        lowerHtml.includes("crazyegg.com") ||
        lowerHtml.includes("cetrk.com")
    ) {
        tools.push("Crazy Egg");
    }

    if (
        lowerHtml.includes("mouseflow") ||
        lowerHtml.includes("mouseflow.com") ||
        lowerHtml.includes("mouseflow.js")
    ) {
        tools.push("Mouseflow");
    }

    if (
        lowerHtml.includes("lucky orange") ||
        lowerHtml.includes("luckyorange.com") ||
        lowerHtml.includes("luckyorange.js")
    ) {
        tools.push("Lucky Orange");
    }

    if (
        lowerHtml.includes("smartlook") ||
        lowerHtml.includes("smartlook.com") ||
        lowerHtml.includes("smartlook.js")
    ) {
        tools.push("Smartlook");
    }

    if (
        lowerHtml.includes("sessionstack") ||
        lowerHtml.includes("sessionstack.com") ||
        lowerHtml.includes("sessionstack.io")
    ) {
        tools.push("SessionStack");
    }

    if (
        lowerHtml.includes("crisp") ||
        lowerHtml.includes("crisp.chat") ||
        lowerHtml.includes("crisp.js")
    ) {
        tools.push("Crisp");
    }

    if (
        lowerHtml.includes("intercom") ||
        lowerHtml.includes("intercom.io") ||
        lowerHtml.includes("intercom(") ||
        lowerHtml.includes("widget.intercom.io")
    ) {
        tools.push("Intercom");
    }

    if (
        lowerHtml.includes("drift") ||
        lowerHtml.includes("drift.com") ||
        lowerHtml.includes("js.driftt.com")
    ) {
        tools.push("Drift");
    }

    if (
        lowerHtml.includes("zendesk chat") ||
        lowerHtml.includes("zopim.com") ||
        lowerHtml.includes("zendesk.com/web-sdk")
    ) {
        tools.push("Zendesk Chat");
    }

    if (
        lowerHtml.includes("customer.io") ||
        lowerHtml.includes("customer.io/track.js")
    ) {
        tools.push("Customer.io");
    }

    if (
        lowerHtml.includes("rudderstack") ||
        lowerHtml.includes("rudderstack.com") ||
        lowerHtml.includes("rudderanalytics.com")
    ) {
        tools.push("RudderStack");
    }

    if (
        lowerHtml.includes("google optimize") ||
        lowerHtml.includes("googleoptimize.com") ||
        lowerHtml.includes("optimize.google.com")
    ) {
        tools.push("Google Optimize");
    }

    if (
        lowerHtml.includes("optimizely") ||
        lowerHtml.includes("optimizely.com") ||
        lowerHtml.includes("cdn.optimizely.com")
    ) {
        tools.push("Optimizely");
    }

    if (
        lowerHtml.includes("vwo") ||
        lowerHtml.includes("visual website optimizer") ||
        lowerHtml.includes("dev.visualwebsiteoptimizer.com")
    ) {
        tools.push("VWO");
    }

    if (
        lowerHtml.includes("adobe target") ||
        lowerHtml.includes("adobetarget.com") ||
        lowerHtml.includes("tt.omtrdc.net")
    ) {
        tools.push("Adobe Target");
    }

    return tools;
}
