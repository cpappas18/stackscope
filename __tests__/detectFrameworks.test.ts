import { detectFrameworks } from '../lib/detectFrameworks';

describe('detectFrameworks', () => {
  describe('Next.js detection', () => {
    it('should detect Next.js from __next_data__', () => {
      const html = '<script>__next_data__ = {}</script>';
      expect(detectFrameworks(html)).toContain('Next.js');
    });

    it('should detect Next.js from _next/static', () => {
      const html = '<script src="/_next/static/chunks/main.js"></script>';
      expect(detectFrameworks(html)).toContain('Next.js');
    });

    it('should detect Next.js from next.js keyword', () => {
      const html = '<meta name="generator" content="Next.js 14.0">';
      expect(detectFrameworks(html)).toContain('Next.js');
    });

    it('should detect Next.js from __nextjs_original-stack-frames', () => {
      const html = '<script>__nextjs_original-stack-frames</script>';
      expect(detectFrameworks(html)).toContain('Next.js');
    });

    it('should be case insensitive for Next.js', () => {
      const html = '<script>__NEXT_DATA__ = {}</script>';
      expect(detectFrameworks(html)).toContain('Next.js');
    });
  });

  describe('React detection', () => {
    it('should detect React from react-dom', () => {
      const html = '<script src="/react-dom.production.min.js"></script>';
      expect(detectFrameworks(html)).toContain('React');
    });

    it('should detect React from react/ path', () => {
      const html = '<script src="/react/react.js"></script>';
      expect(detectFrameworks(html)).toContain('React');
    });

    it('should detect React from data-reactroot', () => {
      const html = '<div data-reactroot>Content</div>';
      expect(detectFrameworks(html)).toContain('React');
    });

    it('should detect React from data-react attribute', () => {
      const html = '<div data-react-class="Component">Content</div>';
      expect(detectFrameworks(html)).toContain('React');
    });

    it('should detect React from react.development.js', () => {
      const html = '<script src="/react.development.js"></script>';
      expect(detectFrameworks(html)).toContain('React');
    });

    it('should detect React from react.production.js', () => {
      const html = '<script src="/react.production.js"></script>';
      expect(detectFrameworks(html)).toContain('React');
    });

    it('should detect React from __reactcontainer', () => {
      const html = '<div id="__reactcontainer">Content</div>';
      expect(detectFrameworks(html)).toContain('React');
    });

    it('should detect React from react-helmet', () => {
      const html = '<script src="/react-helmet.js"></script>';
      expect(detectFrameworks(html)).toContain('React');
    });
  });

  describe('Angular detection', () => {
    it('should detect Angular from ng-version', () => {
      const html = '<html ng-version="15.0.0">';
      expect(detectFrameworks(html)).toContain('Angular');
    });

    it('should detect Angular from ng-app', () => {
      const html = '<html ng-app="myApp">';
      expect(detectFrameworks(html)).toContain('Angular');
    });

    it('should detect Angular from @angular/ path', () => {
      const html = '<script src="/@angular/core/bundles/core.umd.js"></script>';
      expect(detectFrameworks(html)).toContain('Angular');
    });

    it('should detect Angular from angular.js', () => {
      const html = '<script src="/angular.js"></script>';
      expect(detectFrameworks(html)).toContain('Angular');
    });

    it('should detect Angular from angular.min.js', () => {
      const html = '<script src="/angular.min.js"></script>';
      expect(detectFrameworks(html)).toContain('Angular');
    });
  });

  describe('Vue.js detection', () => {
    it('should detect Vue.js from data-v- attribute', () => {
      const html = '<div data-v-1234abc>Content</div>';
      expect(detectFrameworks(html)).toContain('Vue.js');
    });

    it('should detect Vue.js from vue.js', () => {
      const html = '<script src="/vue.js"></script>';
      expect(detectFrameworks(html)).toContain('Vue.js');
    });

    it('should detect Vue.js from vue.min.js', () => {
      const html = '<script src="/vue.min.js"></script>';
      expect(detectFrameworks(html)).toContain('Vue.js');
    });

    it('should detect Vue.js from @vitejs/plugin-vue', () => {
      const html = '<!-- Generated with @vitejs/plugin-vue -->';
      expect(detectFrameworks(html)).toContain('Vue.js');
    });

    it('should detect Vue.js from vue/dist/', () => {
      const html = '<script src="/vue/dist/vue.js"></script>';
      expect(detectFrameworks(html)).toContain('Vue.js');
    });
  });

  describe('Svelte detection', () => {
    it('should detect Svelte from svelte keyword', () => {
      const html = '<script src="/svelte/internal.js"></script>';
      expect(detectFrameworks(html)).toContain('Svelte');
    });

    it('should detect Svelte from __svelte', () => {
      const html = '<div class="__svelte-123">Content</div>';
      expect(detectFrameworks(html)).toContain('Svelte');
    });
  });

  describe('Preact detection', () => {
    it('should detect Preact from preact keyword', () => {
      const html = '<script src="/preact/preact.js"></script>';
      expect(detectFrameworks(html)).toContain('Preact');
    });

    it('should detect Preact from /preact/ path', () => {
      const html = '<script src="/preact/hooks.js"></script>';
      expect(detectFrameworks(html)).toContain('Preact');
    });
  });

  describe('Gatsby detection', () => {
    it('should detect Gatsby from gatsby keyword', () => {
      const html = '<script>window.gatsby = {}</script>';
      expect(detectFrameworks(html)).toContain('Gatsby');
    });

    it('should detect Gatsby from ___gatsby', () => {
      const html = '<div id="___gatsby">Content</div>';
      expect(detectFrameworks(html)).toContain('Gatsby');
    });

    it('should detect Gatsby from gatsbyjs', () => {
      const html = '<meta name="generator" content="GatsbyJS">';
      expect(detectFrameworks(html)).toContain('Gatsby');
    });
  });

  describe('Nuxt.js detection', () => {
    it('should detect Nuxt.js from nuxt keyword', () => {
      const html = '<script>window.__NUXT__ = {}</script>';
      expect(detectFrameworks(html)).toContain('Nuxt.js');
    });

    it('should detect Nuxt.js from __nuxt', () => {
      const html = '<div id="__nuxt">Content</div>';
      expect(detectFrameworks(html)).toContain('Nuxt.js');
    });

    it('should detect Nuxt.js from _nuxt/ path', () => {
      const html = '<script src="/_nuxt/app.js"></script>';
      expect(detectFrameworks(html)).toContain('Nuxt.js');
    });
  });

  describe('Remix detection', () => {
    it('should detect Remix from remix keyword', () => {
      const html = '<script src="/build/remix.js"></script>';
      expect(detectFrameworks(html)).toContain('Remix');
    });

    it('should detect Remix from __remix', () => {
      const html = '<script>window.__remix = {}</script>';
      expect(detectFrameworks(html)).toContain('Remix');
    });
  });

  describe('SvelteKit detection', () => {
    it('should detect SvelteKit from sveltekit keyword', () => {
      const html = '<script src="/sveltekit.js"></script>';
      expect(detectFrameworks(html)).toContain('SvelteKit');
    });

    it('should detect SvelteKit from @sveltejs/kit', () => {
      const html = '<!-- Generated with @sveltejs/kit -->';
      expect(detectFrameworks(html)).toContain('SvelteKit');
    });
  });

  describe('Multiple frameworks detection', () => {
    it('should detect multiple frameworks when present', () => {
      const html = `
        <script>__next_data__ = {}</script>
        <div data-reactroot>Content</div>
        <script src="/react-dom.js"></script>
      `;
      const result = detectFrameworks(html);
      expect(result).toContain('Next.js');
      expect(result).toContain('React');
      expect(result.length).toBeGreaterThanOrEqual(2);
    });

    it('should detect React with Next.js (common combination)', () => {
      const html = `
        <script>__next_data__ = {}</script>
        <script src="/_next/static/chunks/main.js"></script>
        <div data-reactroot>Content</div>
      `;
      const result = detectFrameworks(html);
      expect(result).toContain('Next.js');
      expect(result).toContain('React');
    });

    it('should detect Vue with Nuxt.js', () => {
      const html = `
        <script>window.__NUXT__ = {}</script>
        <script src="/vue.js"></script>
        <div data-v-123>Content</div>
      `;
      const result = detectFrameworks(html);
      expect(result).toContain('Nuxt.js');
      expect(result).toContain('Vue.js');
    });

    it('should detect Svelte with SvelteKit', () => {
      const html = `
        <script src="/sveltekit.js"></script>
        <div class="__svelte-123">Content</div>
      `;
      const result = detectFrameworks(html);
      expect(result).toContain('SvelteKit');
      expect(result).toContain('Svelte');
    });
  });

  describe('Edge cases', () => {
    it('should return empty array for empty string', () => {
      expect(detectFrameworks('')).toEqual([]);
    });

    it('should return empty array for HTML with no framework indicators', () => {
      const html = '<html><body><h1>Hello World</h1></body></html>';
      expect(detectFrameworks(html)).toEqual([]);
    });

    it('should be case insensitive', () => {
      const html = '<script>__NEXT_DATA__ = {}</script>';
      expect(detectFrameworks(html)).toContain('Next.js');
    });

    it('should handle HTML with special characters', () => {
      const html = '<div data-reactroot>&copy; 2024</div>';
      expect(detectFrameworks(html)).toContain('React');
    });

    it('should handle very long HTML strings', () => {
      const longHtml = '<html>' + 'a'.repeat(100000) + '<script>__next_data__ = {}</script></html>';
      expect(detectFrameworks(longHtml)).toContain('Next.js');
    });

    it('should handle malformed HTML', () => {
      const html = '<div><script>__next_data__</script>broken';
      expect(detectFrameworks(html)).toContain('Next.js');
    });

    it('should handle partial matches correctly', () => {
      const html = '<script src="/react-dom.production.min.js"></script>';
      const result = detectFrameworks(html);
      expect(result).toContain('React');
      expect(result).not.toContain('Next.js');
    });
  });

  describe('Real-world scenarios', () => {
    it('should detect Next.js from typical Next.js page', () => {
      const html = `
        <!DOCTYPE html>
        <html>
        <head>
          <script id="__NEXT_DATA__" type="application/json">{}</script>
          <script src="/_next/static/chunks/main.js"></script>
        </head>
        <body>Content</body>
        </html>
      `;
      expect(detectFrameworks(html)).toContain('Next.js');
    });

    it('should detect React from typical React app', () => {
      const html = `
        <div id="root">
          <div data-reactroot>
            <div data-react-class="App">Content</div>
          </div>
        </div>
        <script src="/react-dom.production.min.js"></script>
      `;
      expect(detectFrameworks(html)).toContain('React');
    });

    it('should detect Angular from typical Angular app', () => {
      const html = `
        <html ng-app="myApp" ng-version="15.0.0">
        <head>
          <script src="/angular.min.js"></script>
        </head>
        <body>Content</body>
        </html>
      `;
      expect(detectFrameworks(html)).toContain('Angular');
    });

    it('should detect Vue from typical Vue app', () => {
      const html = `
        <div id="app">
          <div data-v-abc123>Content</div>
        </div>
        <script src="/vue.js"></script>
      `;
      expect(detectFrameworks(html)).toContain('Vue.js');
    });
  });
});
