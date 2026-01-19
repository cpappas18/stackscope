export function detectCMS(html: string): string[] {
    const cms: string[] = [];
    const lowerHtml = html.toLowerCase();

    if (
        lowerHtml.includes("wp-content") ||
        lowerHtml.includes("wp-includes") ||
        lowerHtml.includes("wordpress") ||
        lowerHtml.includes("/wp-admin/") ||
        lowerHtml.includes("wp-json") ||
        lowerHtml.includes("generator") && lowerHtml.includes("wordpress")
    ) {
        cms.push("WordPress");
    }

    if (
        lowerHtml.includes("cdn.shopify.com") ||
        lowerHtml.includes("shopifycdn.com") ||
        lowerHtml.includes("shopify.theme") ||
        lowerHtml.includes("shopify-analytics") ||
        lowerHtml.includes("shopify.settings")
    ) {
        cms.push("Shopify");
    }

    if (
        lowerHtml.includes("webflow") ||
        lowerHtml.includes("webflow.com") ||
        lowerHtml.includes("assets-global.website-files.com")
    ) {
        cms.push("Webflow");
    }

    if (
        lowerHtml.includes("ghost.org") ||
        lowerHtml.includes("ghost-admin") ||
        lowerHtml.includes("ghost.min.js") ||
        lowerHtml.includes("ghost-sdk") ||
        lowerHtml.includes("tryghost.org")
    ) {
        cms.push("Ghost");
    }

    if (
        lowerHtml.includes("drupal") ||
        lowerHtml.includes("drupal.js") ||
        lowerHtml.includes("/sites/default/")
    ) {
        cms.push("Drupal");
    }

    if (
        lowerHtml.includes("joomla") ||
        lowerHtml.includes("joomla.org") ||
        lowerHtml.includes("option=com_")
    ) {
        cms.push("Joomla");
    }

    if (
        lowerHtml.includes("squarespace") ||
        lowerHtml.includes("sqsp-cdn.com") ||
        lowerHtml.includes("squarespace-cdn.com")
    ) {
        cms.push("Squarespace");
    }

    if (
        lowerHtml.includes("wix.com") ||
        lowerHtml.includes("wixstatic.com") ||
        lowerHtml.includes("wixpress.com") ||
        lowerHtml.includes("wix-code")
    ) {
        cms.push("Wix");
    }

    if (
        lowerHtml.includes("contentful") ||
        lowerHtml.includes("ctfassets.net") ||
        lowerHtml.includes("contentful.com")
    ) {
        cms.push("Contentful");
    }

    if (
        lowerHtml.includes("strapi") ||
        lowerHtml.includes("strapi.io") ||
        lowerHtml.includes("strapi.min.js")
    ) {
        cms.push("Strapi");
    }

    if (
        lowerHtml.includes("sanity") ||
        lowerHtml.includes("sanity.io") ||
        lowerHtml.includes("cdn.sanity.io")
    ) {
        cms.push("Sanity");
    }

    if (
        lowerHtml.includes("prismic") ||
        lowerHtml.includes("prismic.io") ||
        lowerHtml.includes("prismic-dom")
    ) {
        cms.push("Prismic");
    }

    if (
        lowerHtml.includes("dato") ||
        lowerHtml.includes("datocms") ||
        lowerHtml.includes("datocms.com")
    ) {
        cms.push("DatoCMS");
    }

    if (
        lowerHtml.includes("buttercms") ||
        lowerHtml.includes("buttercms.com")
    ) {
        cms.push("ButterCMS");
    }

    if (
        lowerHtml.includes("storyblok") ||
        lowerHtml.includes("storyblok.com") ||
        lowerHtml.includes("storyblok.js")
    ) {
        cms.push("Storyblok");
    }

    if (
        lowerHtml.includes("kentico") ||
        lowerHtml.includes("kenticocloud.com")
    ) {
        cms.push("Kentico");
    }

    if (
        lowerHtml.includes("craftcms") ||
        lowerHtml.includes("craftcdn.com") ||
        lowerHtml.includes("craftcommerce") ||
        lowerHtml.includes("craft.min.js") ||
        lowerHtml.includes("craftcms.com")
    ) {
        cms.push("Craft CMS");
    }

    if (
        lowerHtml.includes("typo3") ||
        lowerHtml.includes("typo3.org")
    ) {
        cms.push("TYPO3");
    }

    if (
        lowerHtml.includes("magento") ||
        lowerHtml.includes("/js/mage/") ||
        lowerHtml.includes("/skin/frontend/") ||
        lowerHtml.includes("magento-") ||
        lowerHtml.includes("mage/admin") ||
        lowerHtml.includes("mage/cookies") ||
        lowerHtml.includes("var/www/html/magento")
    ) {
        cms.push("Magento");
    }

    if (
        lowerHtml.includes("prestashop") ||
        lowerHtml.includes("prestashop.com")
    ) {
        cms.push("PrestaShop");
    }

    if (
        lowerHtml.includes("bigcommerce") ||
        lowerHtml.includes("bigcommerce.com") ||
        lowerHtml.includes("cdn.bigcommerce.com")
    ) {
        cms.push("BigCommerce");
    }

    if (
        lowerHtml.includes("shopware") ||
        lowerHtml.includes("shopware.com")
    ) {
        cms.push("Shopware");
    }

    if (
        lowerHtml.includes("woocommerce") ||
        lowerHtml.includes("wc-") ||
        lowerHtml.includes("woocommerce-") ||
        lowerHtml.includes("/wp-content/plugins/woocommerce/")
    ) {
        cms.push("WooCommerce");
    }

    if (
        lowerHtml.includes("netlify cms") ||
        lowerHtml.includes("netlifycms") ||
        lowerHtml.includes("netlify-cms")
    ) {
        cms.push("Netlify CMS");
    }

    if (
        lowerHtml.includes("decap cms") ||
        lowerHtml.includes("decapcms") ||
        lowerHtml.includes("decap-cms")
    ) {
        cms.push("Decap CMS");
    }

    if (
        lowerHtml.includes("payload") ||
        lowerHtml.includes("payloadcms") ||
        lowerHtml.includes("payloadcms.com")
    ) {
        cms.push("Payload CMS");
    }

    if (
        lowerHtml.includes("directus") ||
        lowerHtml.includes("directus.io")
    ) {
        cms.push("Directus");
    }

    if (
        lowerHtml.includes("keystatic") ||
        lowerHtml.includes("keystatic.com")
    ) {
        cms.push("Keystatic");
    }

    return cms;
}
