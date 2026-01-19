import { detectCMS } from '../lib/detectCMS';

describe('detectCMS', () => {
  describe('WordPress detection', () => {
    it('should detect WordPress from wp-content', () => {
      const html = '<link rel="stylesheet" href="/wp-content/themes/style.css">';
      expect(detectCMS(html)).toContain('WordPress');
    });

    it('should detect WordPress from wp-includes', () => {
      const html = '<script src="/wp-includes/js/jquery.js"></script>';
      expect(detectCMS(html)).toContain('WordPress');
    });

    it('should detect WordPress from wordpress keyword', () => {
      const html = '<meta name="generator" content="WordPress 6.0">';
      expect(detectCMS(html)).toContain('WordPress');
    });

    it('should detect WordPress from /wp-admin/', () => {
      const html = '<a href="/wp-admin/">Admin</a>';
      expect(detectCMS(html)).toContain('WordPress');
    });

    it('should detect WordPress from wp-json', () => {
      const html = '<link rel="https://api.w.org/" href="/wp-json/">';
      expect(detectCMS(html)).toContain('WordPress');
    });

    it('should detect WordPress from generator meta tag', () => {
      const html = '<meta name="generator" content="WordPress">';
      expect(detectCMS(html)).toContain('WordPress');
    });

    it('should be case insensitive for WordPress', () => {
      const html = '<link href="/WP-CONTENT/style.css">';
      expect(detectCMS(html)).toContain('WordPress');
    });
  });

  describe('Shopify detection', () => {
    it('should detect Shopify from cdn.shopify.com', () => {
      const html = '<script src="https://cdn.shopify.com/s/files/1/script.js">';
      expect(detectCMS(html)).toContain('Shopify');
    });

    it('should detect Shopify from shopifycdn.com', () => {
      const html = '<link href="https://shopifycdn.com/assets/style.css">';
      expect(detectCMS(html)).toContain('Shopify');
    });

    it('should detect Shopify from shopify.theme', () => {
      const html = '<script>Shopify.theme.setup()</script>';
      expect(detectCMS(html)).toContain('Shopify');
    });

    it('should detect Shopify from shopify-analytics', () => {
      const html = '<script src="/shopify-analytics.js"></script>';
      expect(detectCMS(html)).toContain('Shopify');
    });

    it('should detect Shopify from shopify.settings', () => {
      const html = '<script>Shopify.settings.money_format</script>';
      expect(detectCMS(html)).toContain('Shopify');
    });
  });

  describe('Webflow detection', () => {
    it('should detect Webflow from webflow keyword', () => {
      const html = '<div class="w-webflow">Content</div>';
      expect(detectCMS(html)).toContain('Webflow');
    });

    it('should detect Webflow from webflow.com', () => {
      const html = '<script src="https://webflow.com/script.js"></script>';
      expect(detectCMS(html)).toContain('Webflow');
    });

    it('should detect Webflow from assets-global.website-files.com', () => {
      const html = '<img src="https://assets-global.website-files.com/image.jpg">';
      expect(detectCMS(html)).toContain('Webflow');
    });
  });

  describe('Ghost detection', () => {
    it('should detect Ghost from ghost.org', () => {
      const html = '<script src="https://ghost.org/script.js"></script>';
      expect(detectCMS(html)).toContain('Ghost');
    });

    it('should detect Ghost from ghost-admin', () => {
      const html = '<link href="/ghost-admin/style.css">';
      expect(detectCMS(html)).toContain('Ghost');
    });

    it('should detect Ghost from ghost.min.js', () => {
      const html = '<script src="/ghost.min.js"></script>';
      expect(detectCMS(html)).toContain('Ghost');
    });

    it('should detect Ghost from ghost-sdk', () => {
      const html = '<script src="/ghost-sdk.min.js"></script>';
      expect(detectCMS(html)).toContain('Ghost');
    });

    it('should detect Ghost from tryghost.org', () => {
      const html = '<a href="https://tryghost.org">Ghost</a>';
      expect(detectCMS(html)).toContain('Ghost');
    });

    it('should NOT detect Ghost from common word "ghost" in content', () => {
      const html = '<p>This is a ghost story about ghost buttons</p>';
      expect(detectCMS(html)).not.toContain('Ghost');
    });

    it('should NOT detect Ghost from CSS class "ghost-button"', () => {
      const html = '<button class="ghost-button">Click me</button>';
      expect(detectCMS(html)).not.toContain('Ghost');
    });
  });

  describe('Drupal detection', () => {
    it('should detect Drupal from drupal keyword', () => {
      const html = '<script>Drupal.settings = {}</script>';
      expect(detectCMS(html)).toContain('Drupal');
    });

    it('should detect Drupal from drupal.js', () => {
      const html = '<script src="/drupal.js"></script>';
      expect(detectCMS(html)).toContain('Drupal');
    });

    it('should detect Drupal from /sites/default/', () => {
      const html = '<link href="/sites/default/files/style.css">';
      expect(detectCMS(html)).toContain('Drupal');
    });
  });

  describe('Joomla detection', () => {
    it('should detect Joomla from joomla keyword', () => {
      const html = '<meta name="generator" content="Joomla">';
      expect(detectCMS(html)).toContain('Joomla');
    });

    it('should detect Joomla from joomla.org', () => {
      const html = '<a href="https://joomla.org">Joomla</a>';
      expect(detectCMS(html)).toContain('Joomla');
    });

    it('should detect Joomla from option=com_', () => {
      const html = '<a href="/index.php?option=com_content">Link</a>';
      expect(detectCMS(html)).toContain('Joomla');
    });
  });

  describe('Squarespace detection', () => {
    it('should detect Squarespace from squarespace keyword', () => {
      const html = '<meta name="generator" content="Squarespace">';
      expect(detectCMS(html)).toContain('Squarespace');
    });

    it('should detect Squarespace from sqsp-cdn.com', () => {
      const html = '<img src="https://sqsp-cdn.com/image.jpg">';
      expect(detectCMS(html)).toContain('Squarespace');
    });

    it('should detect Squarespace from squarespace-cdn.com', () => {
      const html = '<link href="https://squarespace-cdn.com/style.css">';
      expect(detectCMS(html)).toContain('Squarespace');
    });
  });

  describe('Wix detection', () => {
    it('should detect Wix from wix.com', () => {
      const html = '<script src="https://wix.com/script.js"></script>';
      expect(detectCMS(html)).toContain('Wix');
    });

    it('should detect Wix from wixstatic.com', () => {
      const html = '<img src="https://wixstatic.com/image.jpg">';
      expect(detectCMS(html)).toContain('Wix');
    });

    it('should detect Wix from wixpress.com', () => {
      const html = '<link href="https://wixpress.com/style.css">';
      expect(detectCMS(html)).toContain('Wix');
    });

    it('should detect Wix from wix-code', () => {
      const html = '<script src="/wix-code.js"></script>';
      expect(detectCMS(html)).toContain('Wix');
    });
  });

  describe('Headless CMS detection', () => {
    it('should detect Contentful', () => {
      const html = '<script src="https://cdn.contentful.com/script.js"></script>';
      expect(detectCMS(html)).toContain('Contentful');
    });

    it('should detect Strapi', () => {
      const html = '<script src="https://strapi.io/script.js"></script>';
      expect(detectCMS(html)).toContain('Strapi');
    });

    it('should detect Sanity', () => {
      const html = '<script src="https://cdn.sanity.io/script.js"></script>';
      expect(detectCMS(html)).toContain('Sanity');
    });

    it('should detect Prismic', () => {
      const html = '<script src="https://prismic.io/script.js"></script>';
      expect(detectCMS(html)).toContain('Prismic');
    });

    it('should detect DatoCMS', () => {
      const html = '<link href="https://datocms.com/style.css">';
      expect(detectCMS(html)).toContain('DatoCMS');
    });

    it('should detect ButterCMS', () => {
      const html = '<script src="https://buttercms.com/script.js"></script>';
      expect(detectCMS(html)).toContain('ButterCMS');
    });

    it('should detect Storyblok', () => {
      const html = '<script src="/storyblok.js"></script>';
      expect(detectCMS(html)).toContain('Storyblok');
    });

    it('should detect Kentico', () => {
      const html = '<link href="https://kenticocloud.com/style.css">';
      expect(detectCMS(html)).toContain('Kentico');
    });

    it('should detect Directus', () => {
      const html = '<script src="https://directus.io/script.js"></script>';
      expect(detectCMS(html)).toContain('Directus');
    });

    it('should detect Keystatic', () => {
      const html = '<link href="https://keystatic.com/style.css">';
      expect(detectCMS(html)).toContain('Keystatic');
    });
  });

  describe('Craft CMS detection', () => {
    it('should detect Craft CMS from craftcms', () => {
      const html = '<meta name="generator" content="CraftCMS">';
      expect(detectCMS(html)).toContain('Craft CMS');
    });

    it('should detect Craft CMS from craftcdn.com', () => {
      const html = '<img src="https://craftcdn.com/image.jpg">';
      expect(detectCMS(html)).toContain('Craft CMS');
    });

    it('should detect Craft CMS from craftcommerce', () => {
      const html = '<script src="/craftcommerce.js"></script>';
      expect(detectCMS(html)).toContain('Craft CMS');
    });

    it('should detect Craft CMS from craft.min.js', () => {
      const html = '<script src="/craft.min.js"></script>';
      expect(detectCMS(html)).toContain('Craft CMS');
    });

    it('should detect Craft CMS from craftcms.com', () => {
      const html = '<a href="https://craftcms.com">Craft</a>';
      expect(detectCMS(html)).toContain('Craft CMS');
    });

    it('should NOT detect Craft CMS from common word "craft"', () => {
      const html = '<p>This is a handcrafted, crafted item with excellent craftsmanship</p>';
      expect(detectCMS(html)).not.toContain('Craft CMS');
    });

    it('should NOT detect Craft CMS from CSS class "craft-button"', () => {
      const html = '<button class="craft-button">Craft</button>';
      expect(detectCMS(html)).not.toContain('Craft CMS');
    });

    it('should NOT detect Craft CMS from word "aircraft"', () => {
      const html = '<p>The aircraft is flying</p>';
      expect(detectCMS(html)).not.toContain('Craft CMS');
    });
  });

  describe('TYPO3 detection', () => {
    it('should detect TYPO3 from typo3 keyword', () => {
      const html = '<meta name="generator" content="TYPO3 CMS">';
      expect(detectCMS(html)).toContain('TYPO3');
    });

    it('should detect TYPO3 from typo3.org', () => {
      const html = '<a href="https://typo3.org">TYPO3</a>';
      expect(detectCMS(html)).toContain('TYPO3');
    });
  });

  describe('Magento detection', () => {
    it('should detect Magento from magento keyword', () => {
      const html = '<script>Magento.Customer</script>';
      expect(detectCMS(html)).toContain('Magento');
    });

    it('should detect Magento from /js/mage/', () => {
      const html = '<script src="/js/mage/admin.js"></script>';
      expect(detectCMS(html)).toContain('Magento');
    });

    it('should detect Magento from /skin/frontend/', () => {
      const html = '<link href="/skin/frontend/default/style.css">';
      expect(detectCMS(html)).toContain('Magento');
    });

    it('should detect Magento from magento- prefix', () => {
      const html = '<script src="/magento-core.js"></script>';
      expect(detectCMS(html)).toContain('Magento');
    });

    it('should detect Magento from mage/admin', () => {
      const html = '<script src="/mage/admin/script.js"></script>';
      expect(detectCMS(html)).toContain('Magento');
    });

    it('should detect Magento from mage/cookies', () => {
      const html = '<script src="/mage/cookies.js"></script>';
      expect(detectCMS(html)).toContain('Magento');
    });

    it('should detect Magento from var/www/html/magento', () => {
      const html = '<!-- Generated from /var/www/html/magento -->';
      expect(detectCMS(html)).toContain('Magento');
    });

    it('should NOT detect Magento from common word "image"', () => {
      const html = '<img src="/images/photo.jpg" alt="Image">';
      expect(detectCMS(html)).not.toContain('Magento');
    });

    it('should NOT detect Magento from word "damage"', () => {
      const html = '<p>Damage assessment</p>';
      expect(detectCMS(html)).not.toContain('Magento');
    });

    it('should NOT detect Magento from word "manage"', () => {
      const html = '<a href="/manage">Manage</a>';
      expect(detectCMS(html)).not.toContain('Magento');
    });
  });

  describe('E-commerce platforms detection', () => {
    it('should detect PrestaShop', () => {
      const html = '<meta name="generator" content="PrestaShop">';
      expect(detectCMS(html)).toContain('PrestaShop');
    });

    it('should detect BigCommerce', () => {
      const html = '<script src="https://cdn.bigcommerce.com/script.js"></script>';
      expect(detectCMS(html)).toContain('BigCommerce');
    });

    it('should detect Shopware', () => {
      const html = '<script src="https://shopware.com/script.js"></script>';
      expect(detectCMS(html)).toContain('Shopware');
    });

    it('should detect WooCommerce', () => {
      const html = '<script src="/wp-content/plugins/woocommerce/script.js"></script>';
      expect(detectCMS(html)).toContain('WooCommerce');
    });
  });

  describe('Static site CMS detection', () => {
    it('should detect Netlify CMS', () => {
      const html = '<script src="/netlify-cms.js"></script>';
      expect(detectCMS(html)).toContain('Netlify CMS');
    });

    it('should detect Decap CMS', () => {
      const html = '<script src="/decap-cms.js"></script>';
      expect(detectCMS(html)).toContain('Decap CMS');
    });

    it('should detect Payload CMS', () => {
      const html = '<script src="https://payloadcms.com/script.js"></script>';
      expect(detectCMS(html)).toContain('Payload CMS');
    });
  });

  describe('Multiple CMS detection', () => {
    it('should detect multiple CMSs when present', () => {
      const html = `
        <link href="/wp-content/style.css">
        <script src="https://cdn.shopify.com/script.js"></script>
      `;
      const result = detectCMS(html);
      expect(result).toContain('WordPress');
      expect(result).toContain('Shopify');
      expect(result.length).toBeGreaterThanOrEqual(2);
    });

    it('should detect WordPress and WooCommerce together', () => {
      const html = `
        <link href="/wp-content/style.css">
        <script src="/wp-content/plugins/woocommerce/script.js"></script>
      `;
      const result = detectCMS(html);
      expect(result).toContain('WordPress');
      expect(result).toContain('WooCommerce');
    });
  });

  describe('Edge cases', () => {
    it('should return empty array for empty string', () => {
      expect(detectCMS('')).toEqual([]);
    });

    it('should return empty array for HTML with no CMS indicators', () => {
      const html = '<html><body><h1>Hello World</h1></body></html>';
      expect(detectCMS(html)).toEqual([]);
    });

    it('should be case insensitive', () => {
      const html = '<META NAME="GENERATOR" CONTENT="WORDPRESS">';
      expect(detectCMS(html)).toContain('WordPress');
    });

    it('should handle HTML with special characters', () => {
      const html = '<script>WordPress &copy; 2024</script>';
      expect(detectCMS(html)).toContain('WordPress');
    });

    it('should handle very long HTML strings', () => {
      const longHtml = '<html>' + 'a'.repeat(100000) + '<link href="/wp-content/style.css"></html>';
      expect(detectCMS(longHtml)).toContain('WordPress');
    });

    it('should handle HTML with comments', () => {
      const html = '<!-- This site uses WordPress --><div>Content</div>';
      expect(detectCMS(html)).toContain('WordPress');
    });

    it('should handle malformed HTML', () => {
      const html = '<div><link href="/wp-content/ <script>broken';
      expect(detectCMS(html)).toContain('WordPress');
    });
  });

  describe('False positive prevention', () => {
    it('should not detect Ghost from unrelated content', () => {
      const html = '<p>Ghost of Christmas Past</p><div class="ghost-element">Styling</div>';
      expect(detectCMS(html)).not.toContain('Ghost');
    });

    it('should not detect Craft CMS from unrelated content', () => {
      const html = '<p>Aircraft pilot with craftsmanship skills</p>';
      expect(detectCMS(html)).not.toContain('Craft CMS');
    });

    it('should not detect Magento from unrelated paths', () => {
      const html = '<img src="/images/photo.jpg"><script src="/manage.js"></script>';
      expect(detectCMS(html)).not.toContain('Magento');
    });

    it('should not detect any CMS from generic HTML', () => {
      const html = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>My Site</title>
          <link rel="stylesheet" href="style.css">
        </head>
        <body>
          <h1>Welcome</h1>
          <p>This is a custom website</p>
        </body>
        </html>
      `;
      expect(detectCMS(html)).toEqual([]);
    });
  });

  describe('Real-world scenarios', () => {
    it('should detect WordPress from typical WordPress page', () => {
      const html = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta name="generator" content="WordPress 6.4">
          <link rel="stylesheet" href="/wp-content/themes/twenty-twenty-four/style.css">
        </head>
        <body>
          <header>Site Header</header>
          <main>Content</main>
        </body>
        </html>
      `;
      expect(detectCMS(html)).toContain('WordPress');
    });

    it('should detect Shopify from typical Shopify store', () => {
      const html = `
        <html>
        <head>
          <script src="https://cdn.shopify.com/s/files/1/javascript.js"></script>
          <script>Shopify.theme.config = {}</script>
        </head>
        <body>Shop content</body>
        </html>
      `;
      expect(detectCMS(html)).toContain('Shopify');
    });

    it('should detect multiple headless CMSs', () => {
      const html = `
        <script src="https://cdn.contentful.com/script.js"></script>
        <script src="https://cdn.sanity.io/script.js"></script>
      `;
      const result = detectCMS(html);
      expect(result).toContain('Contentful');
      expect(result).toContain('Sanity');
    });
  });
});
