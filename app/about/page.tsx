import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About - StackScope",
  description: "Learn about StackScope, a modern web technology analyzer that reveals the technology stack behind any website",
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
        About StackScope
      </h1>

      <div className="prose prose-slate dark:prose-invert max-w-none space-y-8">
        <p className="text-lg text-slate-600 dark:text-slate-300">
          <strong>Uncover the technology stack behind any website with lightning-fast precision.</strong>
        </p>

        <p className="text-slate-700 dark:text-slate-300">
          StackScope is a modern web technology analyzer that can reveal the underlying architecture, frameworks, and services of any website. Built with Next.js and powered by headless browser automation, StackScope delivers comprehensive insights into the technologies that power the modern web.
        </p>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-slate-100">
            Features
          </h2>

          <h3 className="text-xl font-semibold mb-3 text-slate-800 dark:text-slate-200">
            Comprehensive Technology Detection
          </h3>
          <p className="text-slate-700 dark:text-slate-300 mb-4">
            StackScope uses advanced pattern matching and JavaScript-rendered inspection to detect:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2 text-slate-700 dark:text-slate-300">
            <li><strong>Frontend Frameworks</strong> (10): React, Next.js, Angular, Vue.js, Svelte, Preact, Gatsby, Nuxt.js, Remix, SvelteKit</li>
            <li><strong>Content Management Systems</strong> (28): WordPress, Shopify, Webflow, Drupal, Joomla, Squarespace, Wix, Ghost, Contentful, Strapi, Sanity, Prismic, DatoCMS, Storyblok, Craft CMS, TYPO3, Magento, BigCommerce, and more</li>
            <li><strong>Analytics Platforms</strong> (40): Google Analytics (Universal & GA4), Google Tag Manager, Adobe Analytics, Mixpanel, Segment, Amplitude, Matomo, Facebook Pixel, LinkedIn Insight Tag, Pinterest Pixel, Microsoft Clarity, FullStory, LogRocket, Sentry, Plausible, PostHog, and many more</li>
            <li><strong>Authentication Solutions</strong> (18): Auth0, Clerk, Firebase Auth, NextAuth.js, Okta, AWS Cognito, Azure AD, Google Sign-In, Facebook Login, GitHub OAuth, Stytch, Magic Link, Supabase Auth, and more</li>
            <li><strong>HTTP Headers</strong>: Comprehensive analysis including server information, security headers (HSTS, CSP, X-Frame-Options), caching headers, and CORS configuration</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3 text-slate-800 dark:text-slate-200">
            JavaScript-Rendered Inspection
          </h3>
          <p className="text-slate-700 dark:text-slate-300 mb-6">
            Unlike traditional static analyzers, StackScope uses a real headless browser to capture fully-hydrated HTML, ensuring accurate detection of JavaScript-rendered applications and single-page applications (SPAs).
          </p>

          <h3 className="text-xl font-semibold mb-3 text-slate-800 dark:text-slate-200">
            Serverless-First Architecture
          </h3>
          <p className="text-slate-700 dark:text-slate-300 mb-6">
            Designed for modern cloud deployments. Powered by Browserless.io&apos;s remote browser infrastructure, StackScope runs seamlessly on serverless platforms like Vercel, Netlify, and AWS Lambda without the overhead of managing browser binaries.
          </p>

          <h3 className="text-xl font-semibold mb-3 text-slate-800 dark:text-slate-200">
            Beautiful, Modern Interface
          </h3>
          <p className="text-slate-700 dark:text-slate-300 mb-6">
            An intuitive, responsive UI built with Tailwind CSS that presents technology insights in an organized, visually appealing format with dark mode support. Fully accessible with ARIA labels, keyboard navigation, and screen reader support.
          </p>

          <h3 className="text-xl font-semibold mb-3 text-slate-800 dark:text-slate-200">
            Performance Optimized
          </h3>
          <p className="text-slate-700 dark:text-slate-300 mb-6">
            Efficient analysis with sub-30 second response times, even for complex JavaScript-heavy applications. Uses case-insensitive pattern matching and multiple detection methods for high accuracy.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-slate-100">
            Built With
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-slate-700 dark:text-slate-300">
            <li><strong>Next.js 16</strong> - React framework with App Router</li>
            <li><strong>Playwright</strong> - Browser automation for JavaScript rendering</li>
            <li><strong>TypeScript</strong> - Type-safe development</li>
            <li><strong>Tailwind CSS</strong> - Modern, utility-first styling</li>
            <li><strong>Browserless.io</strong> - Serverless browser infrastructure</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-slate-100">
            Use Cases
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-slate-700 dark:text-slate-300">
            <li><strong>Competitive Intelligence</strong>: Understand what technologies competitors are using</li>
            <li><strong>Security Audits</strong>: Identify authentication mechanisms and security configurations</li>
            <li><strong>Technology Research</strong>: Discover popular tech stacks and trends</li>
            <li><strong>Pre-engagement Analysis</strong>: Evaluate a website&apos;s architecture before integration</li>
            <li><strong>Learning Tool</strong>: Explore how modern websites are built</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-slate-100">
            Privacy & Ethics
          </h2>
          <p className="text-slate-700 dark:text-slate-300 mb-4">
            StackScope performs non-invasive analysis using only publicly available information. It does not:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-700 dark:text-slate-300 mb-4">
            <li>Execute malicious scripts</li>
            <li>Access private APIs or endpoints</li>
            <li>Store or cache analyzed data</li>
            <li>Perform any actions beyond inspection</li>
          </ul>
          <p className="text-slate-700 dark:text-slate-300">
            All analysis is performed in real-time with no data retention.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-slate-100">
            Contributing
          </h2>
          <p className="text-slate-700 dark:text-slate-300">
            Contributions, issues, and feature requests are welcome! Feel free to check the issues page.
          </p>
        </section>

        <div>
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Start Analyzing
          </Link>
        </div>
      </div>
    </div>
  );
}

