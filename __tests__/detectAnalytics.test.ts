import { detectAnalytics } from '../lib/detectAnalytics';

describe('detectAnalytics', () => {
  describe('Google Tag Manager detection', () => {
    it('should detect Google Tag Manager from googletagmanager.com', () => {
      const html = '<script src="https://www.googletagmanager.com/gtm.js"></script>';
      expect(detectAnalytics(html)).toContain('Google Tag Manager');
    });

    it('should detect Google Tag Manager from googletagmanager keyword', () => {
      const html = '<script>googletagmanager</script>';
      expect(detectAnalytics(html)).toContain('Google Tag Manager');
    });

    it('should detect Google Tag Manager from gtag(', () => {
      const html = '<script>gtag("config", "GA_MEASUREMENT_ID")</script>';
      expect(detectAnalytics(html)).toContain('Google Tag Manager');
    });

    it('should detect Google Tag Manager from gtm.js', () => {
      const html = '<script src="/gtm.js"></script>';
      expect(detectAnalytics(html)).toContain('Google Tag Manager');
    });

    it('should detect Google Tag Manager from data-gtm attribute', () => {
      const html = '<div data-gtm-click="event">Content</div>';
      expect(detectAnalytics(html)).toContain('Google Tag Manager');
    });
  });

  describe('Google Analytics detection', () => {
    it('should detect Google Analytics from google-analytics.com', () => {
      const html = '<script src="https://www.google-analytics.com/analytics.js"></script>';
      expect(detectAnalytics(html)).toContain('Google Analytics');
    });

    it('should detect Google Analytics from googleanalytics keyword', () => {
      const html = '<script>window.googleanalytics</script>';
      expect(detectAnalytics(html)).toContain('Google Analytics');
    });

    it('should detect Google Analytics from ga.js', () => {
      const html = '<script src="/ga.js"></script>';
      expect(detectAnalytics(html)).toContain('Google Analytics');
    });

    it('should detect Google Analytics from analytics.js', () => {
      const html = '<script src="/analytics.js"></script>';
      expect(detectAnalytics(html)).toContain('Google Analytics');
    });

    it('should detect Google Analytics from gtag.js', () => {
      const html = '<script src="/gtag.js"></script>';
      expect(detectAnalytics(html)).toContain('Google Analytics');
    });

    it('should detect Google Analytics from ga(\'create\')', () => {
      const html = "<script>ga('create', 'UA-123456', 'auto')</script>";
      expect(detectAnalytics(html)).toContain('Google Analytics');
    });

    it('should detect Google Analytics from ga(\'send\')', () => {
      const html = "<script>ga('send', 'pageview')</script>";
      expect(detectAnalytics(html)).toContain('Google Analytics');
    });

    it('should detect Google Analytics from gtag(\'config\')', () => {
      const html = "<script>gtag('config', 'GA_MEASUREMENT_ID')</script>";
      expect(detectAnalytics(html)).toContain('Google Analytics');
    });

    it('should detect Google Analytics from _gaq', () => {
      const html = '<script>_gaq.push([\'_trackPageview\'])</script>';
      expect(detectAnalytics(html)).toContain('Google Analytics');
    });

    it('should detect Google Analytics from __ga', () => {
      const html = '<script>__ga.track()</script>';
      expect(detectAnalytics(html)).toContain('Google Analytics');
    });

    it('should detect Google Analytics from ga- prefix', () => {
      const html = '<div id="ga-tracking">Content</div>';
      expect(detectAnalytics(html)).toContain('Google Analytics');
    });

    it('should detect Google Analytics from google-analytics keyword', () => {
      const html = '<!-- google-analytics -->';
      expect(detectAnalytics(html)).toContain('Google Analytics');
    });
  });

  describe('Hotjar detection', () => {
    it('should detect Hotjar from hotjar keyword', () => {
      const html = '<script src="https://static.hotjar.com/hotjar.js"></script>';
      expect(detectAnalytics(html)).toContain('Hotjar');
    });

    it('should detect Hotjar from hotjar.com', () => {
      const html = '<script src="https://hotjar.com/script.js"></script>';
      expect(detectAnalytics(html)).toContain('Hotjar');
    });

    it('should detect Hotjar from hj(', () => {
      const html = '<script>hj(\'trigger\', \'event\')</script>';
      expect(detectAnalytics(html)).toContain('Hotjar');
    });

    it('should detect Hotjar from hjid', () => {
      const html = '<script>window.hjid = 123456</script>';
      expect(detectAnalytics(html)).toContain('Hotjar');
    });
  });

  describe('Mixpanel detection', () => {
    it('should detect Mixpanel from mixpanel keyword', () => {
      const html = '<script src="https://cdn.mixpanel.com/lib/mixpanel.js"></script>';
      expect(detectAnalytics(html)).toContain('Mixpanel');
    });

    it('should detect Mixpanel from mixpanel.com', () => {
      const html = '<script src="https://mixpanel.com/lib.js"></script>';
      expect(detectAnalytics(html)).toContain('Mixpanel');
    });

    it('should detect Mixpanel from mixpanel.track', () => {
      const html = '<script>mixpanel.track("Event")</script>';
      expect(detectAnalytics(html)).toContain('Mixpanel');
    });

    it('should detect Mixpanel from mixpanel.init', () => {
      const html = '<script>mixpanel.init("token")</script>';
      expect(detectAnalytics(html)).toContain('Mixpanel');
    });
  });

  describe('Segment detection', () => {
    it('should detect Segment from segment.io', () => {
      const html = '<script src="https://cdn.segment.io/analytics.js"></script>';
      expect(detectAnalytics(html)).toContain('Segment');
    });

    it('should detect Segment from segment.com', () => {
      const html = '<script src="https://segment.com/script.js"></script>';
      expect(detectAnalytics(html)).toContain('Segment');
    });

    it('should detect Segment from analytics.js with segment', () => {
      const html = '<script src="/analytics.js"></script><script>analytics.load("segment_key")</script>';
      expect(detectAnalytics(html)).toContain('Segment');
    });

    it('should detect Segment from segmentcdn.com', () => {
      const html = '<script src="https://segmentcdn.com/script.js"></script>';
      expect(detectAnalytics(html)).toContain('Segment');
    });
  });

  describe('Amplitude detection', () => {
    it('should detect Amplitude from amplitude keyword', () => {
      const html = '<script src="https://cdn.amplitude.com/amplitude.js"></script>';
      expect(detectAnalytics(html)).toContain('Amplitude');
    });

    it('should detect Amplitude from amplitude.com', () => {
      const html = '<script src="https://amplitude.com/script.js"></script>';
      expect(detectAnalytics(html)).toContain('Amplitude');
    });

    it('should detect Amplitude from amplitude.init', () => {
      const html = '<script>amplitude.init("apiKey")</script>';
      expect(detectAnalytics(html)).toContain('Amplitude');
    });

    it('should detect Amplitude from amplitude.getInstance', () => {
      const html = '<script>amplitude.getInstance().logEvent()</script>';
      expect(detectAnalytics(html)).toContain('Amplitude');
    });
  });

  describe('Adobe Analytics detection', () => {
    it('should detect Adobe Analytics from omniture', () => {
      const html = '<script>s_account="omniture"</script>';
      expect(detectAnalytics(html)).toContain('Adobe Analytics');
    });

    it('should detect Adobe Analytics from adobe analytics keyword', () => {
      const html = '<!-- Adobe Analytics -->';
      expect(detectAnalytics(html)).toContain('Adobe Analytics');
    });

    it('should detect Adobe Analytics from adobedtm.com', () => {
      const html = '<script src="https://assets.adobedtm.com/script.js"></script>';
      expect(detectAnalytics(html)).toContain('Adobe Analytics');
    });

    it('should detect Adobe Analytics from omniture.com', () => {
      const html = '<script src="https://omniture.com/script.js"></script>';
      expect(detectAnalytics(html)).toContain('Adobe Analytics');
    });

    it('should detect Adobe Analytics from s_code.js', () => {
      const html = '<script src="/s_code.js"></script>';
      expect(detectAnalytics(html)).toContain('Adobe Analytics');
    });

    it('should detect Adobe Analytics from appmeasurement.js', () => {
      const html = '<script src="/appmeasurement.js"></script>';
      expect(detectAnalytics(html)).toContain('Adobe Analytics');
    });
  });

  describe('Social media pixels', () => {
    it('should detect Facebook Pixel', () => {
      const html = '<script>fbq("init", "123456789")</script>';
      expect(detectAnalytics(html)).toContain('Facebook Pixel');
    });

    it('should detect LinkedIn Insight Tag', () => {
      const html = '<script src="https://snap.licdn.com/li.lms-analytics/insight.min.js"></script>';
      expect(detectAnalytics(html)).toContain('LinkedIn Insight Tag');
    });

    it('should detect Pinterest Pixel', () => {
      const html = '<script>pintrk("page")</script>';
      expect(detectAnalytics(html)).toContain('Pinterest Pixel');
    });

    it('should detect Twitter Pixel', () => {
      const html = '<script>twq("event", "tw-event-id")</script>';
      expect(detectAnalytics(html)).toContain('Twitter Pixel');
    });

    it('should detect TikTok Pixel', () => {
      const html = '<script src="https://analytics.tiktok.com/i18n/pixel/events.js"></script>';
      expect(detectAnalytics(html)).toContain('TikTok Pixel');
    });
  });

  describe('Session recording and heatmaps', () => {
    it('should detect Microsoft Clarity', () => {
      const html = '<script src="https://www.clarity.ms/tag/script.js"></script>';
      expect(detectAnalytics(html)).toContain('Microsoft Clarity');
    });

    it('should detect FullStory', () => {
      const html = '<script src="https://fullstory.com/fs.js"></script>';
      expect(detectAnalytics(html)).toContain('FullStory');
    });

    it('should detect LogRocket', () => {
      const html = '<script src="https://cdn.logrocket.io/logrocket.js"></script>';
      expect(detectAnalytics(html)).toContain('LogRocket');
    });

    it('should detect Crazy Egg', () => {
      const html = '<script src="https://script.crazyegg.com/pages/scripts/123.js"></script>';
      expect(detectAnalytics(html)).toContain('Crazy Egg');
    });

    it('should detect Mouseflow', () => {
      const html = '<script src="https://cdn.mouseflow.com/projects/123.js"></script>';
      expect(detectAnalytics(html)).toContain('Mouseflow');
    });

    it('should detect Lucky Orange', () => {
      const html = '<script src="https://tools.luckyorange.com/core/lo.js"></script>';
      expect(detectAnalytics(html)).toContain('Lucky Orange');
    });

    it('should detect Smartlook', () => {
      const html = '<script src="https://rec.smartlook.com/recorder.js"></script>';
      expect(detectAnalytics(html)).toContain('Smartlook');
    });

    it('should detect SessionStack', () => {
      const html = '<script src="https://app.sessionstack.com/player.js"></script>';
      expect(detectAnalytics(html)).toContain('SessionStack');
    });
  });

  describe('Error tracking and monitoring', () => {
    it('should detect Sentry', () => {
      const html = '<script src="https://browser.sentry-cdn.com/bundle.min.js"></script>';
      expect(detectAnalytics(html)).toContain('Sentry');
    });

    it('should detect Datadog', () => {
      const html = '<script src="https://www.datadoghq-browser-agent.com/datadog-rum.js"></script>';
      expect(detectAnalytics(html)).toContain('Datadog');
    });

    it('should detect New Relic', () => {
      const html = '<script src="https://js-agent.newrelic.com/nr-loader.min.js"></script>';
      expect(detectAnalytics(html)).toContain('New Relic');
    });
  });

  describe('Privacy-focused analytics', () => {
    it('should detect Plausible Analytics', () => {
      const html = '<script src="https://plausible.io/js/script.js"></script>';
      expect(detectAnalytics(html)).toContain('Plausible Analytics');
    });

    it('should detect Fathom Analytics', () => {
      const html = '<script src="https://cdn.usefathom.com/fathom.js"></script>';
      expect(detectAnalytics(html)).toContain('Fathom Analytics');
    });

    it('should detect Simple Analytics', () => {
      const html = '<script src="https://scripts.simpleanalyticscdn.com/latest.js"></script>';
      expect(detectAnalytics(html)).toContain('Simple Analytics');
    });
  });

  describe('Product analytics', () => {
    it('should detect PostHog', () => {
      const html = '<script>posthog.init("phc_123")</script>';
      expect(detectAnalytics(html)).toContain('PostHog');
    });

    it('should detect Heap Analytics', () => {
      const html = '<script src="https://cdn.heapanalytics.com/js/heap.js"></script>';
      expect(detectAnalytics(html)).toContain('Heap Analytics');
    });
  });

  describe('A/B testing and optimization', () => {
    it('should detect Google Optimize', () => {
      const html = '<script src="https://www.googleoptimize.com/optimize.js"></script>';
      expect(detectAnalytics(html)).toContain('Google Optimize');
    });

    it('should detect Optimizely', () => {
      const html = '<script src="https://cdn.optimizely.com/js/123.js"></script>';
      expect(detectAnalytics(html)).toContain('Optimizely');
    });

    it('should detect VWO', () => {
      const html = '<script src="https://dev.visualwebsiteoptimizer.com/j.js"></script>';
      expect(detectAnalytics(html)).toContain('VWO');
    });

    it('should detect Adobe Target', () => {
      const html = '<script src="https://tt.omtrdc.net/m2.js"></script>';
      expect(detectAnalytics(html)).toContain('Adobe Target');
    });
  });

  describe('Chat and customer engagement', () => {
    it('should detect Intercom', () => {
      const html = '<script>window.Intercom("boot", {})</script>';
      expect(detectAnalytics(html)).toContain('Intercom');
    });

    it('should detect Drift', () => {
      const html = '<script src="https://js.driftt.com/include/123.js"></script>';
      expect(detectAnalytics(html)).toContain('Drift');
    });

    it('should detect Zendesk Chat', () => {
      const html = '<script src="https://static.zdassets.com/ekr/snippet.js"></script><div>zendesk chat widget</div>';
      expect(detectAnalytics(html)).toContain('Zendesk Chat');
    });

    it('should detect Crisp', () => {
      const html = '<script src="https://client.crisp.chat/l.js"></script>';
      expect(detectAnalytics(html)).toContain('Crisp');
    });
  });

  describe('Other analytics tools', () => {
    it('should detect Matomo', () => {
      const html = '<script src="https://matomo.example.com/matomo.js"></script>';
      expect(detectAnalytics(html)).toContain('Matomo');
    });

    it('should detect Cloudflare Analytics', () => {
      const html = '<script src="https://cloudflareinsights.com/cdn-cgi/rum"></script>';
      expect(detectAnalytics(html)).toContain('Cloudflare Analytics');
    });

    it('should detect Customer.io', () => {
      const html = '<script src="https://cdns.customer.io/track.js"></script>';
      expect(detectAnalytics(html)).toContain('Customer.io');
    });

    it('should detect RudderStack', () => {
      const html = '<script src="https://cdn.rudderlabs.com/v1/rudder-analytics.min.js"></script><script>rudderstack.load()</script>';
      expect(detectAnalytics(html)).toContain('RudderStack');
    });
  });

  describe('Multiple analytics detection', () => {
    it('should detect multiple analytics tools', () => {
      const html = `
        <script src="https://www.googletagmanager.com/gtm.js"></script>
        <script>fbq("init", "123")</script>
        <script src="https://browser.sentry-cdn.com/bundle.min.js"></script>
      `;
      const result = detectAnalytics(html);
      expect(result).toContain('Google Tag Manager');
      expect(result).toContain('Facebook Pixel');
      expect(result).toContain('Sentry');
      expect(result.length).toBeGreaterThanOrEqual(3);
    });

    it('should detect both Google Analytics and Google Tag Manager', () => {
      const html = `
        <script src="https://www.googletagmanager.com/gtag/js"></script>
        <script>ga('create', 'UA-123', 'auto')</script>
      `;
      const result = detectAnalytics(html);
      expect(result).toContain('Google Tag Manager');
      expect(result).toContain('Google Analytics');
    });
  });

  describe('Edge cases', () => {
    it('should return empty array for empty string', () => {
      expect(detectAnalytics('')).toEqual([]);
    });

    it('should return empty array for HTML with no analytics indicators', () => {
      const html = '<html><body><h1>Hello World</h1></body></html>';
      expect(detectAnalytics(html)).toEqual([]);
    });

    it('should be case insensitive', () => {
      const html = '<script src="https://www.GOOGLETAGMANAGER.com/gtm.js"></script>';
      expect(detectAnalytics(html)).toContain('Google Tag Manager');
    });

    it('should handle HTML with special characters', () => {
      const html = '<script>gtag("config", "GA-123&456")</script>';
      expect(detectAnalytics(html)).toContain('Google Tag Manager');
    });

    it('should handle very long HTML strings', () => {
      const longHtml = '<html>' + 'a'.repeat(100000) + '<script>fbq("init")</script></html>';
      expect(detectAnalytics(longHtml)).toContain('Facebook Pixel');
    });
  });

  describe('Real-world scenarios', () => {
    it('should detect typical analytics setup', () => {
      const html = `
        <head>
          <script async src="https://www.googletagmanager.com/gtag/js"></script>
          <script>
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'GA_MEASUREMENT_ID');
          </script>
        </head>
      `;
      const result = detectAnalytics(html);
      expect(result).toContain('Google Tag Manager');
      expect(result).toContain('Google Analytics');
    });

    it('should detect e-commerce analytics stack', () => {
      const html = `
        <script src="https://cdn.segment.io/analytics.js"></script>
        <script>fbq("init", "pixel_id")</script>
        <script>pintrk("load", "pinterest_id")</script>
      `;
      const result = detectAnalytics(html);
      expect(result).toContain('Segment');
      expect(result).toContain('Facebook Pixel');
      expect(result).toContain('Pinterest Pixel');
    });
  });
});
