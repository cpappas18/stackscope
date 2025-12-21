# StackScope

**Uncover the technology stack behind any website with lightning-fast precision.**

StackScope is a modern web technology analyzer that can reveal the underlying architecture, frameworks, and services of any website. Built with Next.js and powered by headless browser automation, StackScope delivers comprehensive insights into the technologies that power the modern web.

## Features

### Comprehensive Technology Detection

StackScope uses advanced pattern matching and JavaScript-rendered inspection to detect:

- **Frontend Frameworks** (10): React, Next.js, Angular, Vue.js, Svelte, Preact, Gatsby, Nuxt.js, Remix, SvelteKit
- **Content Management Systems** (28): WordPress, Shopify, Webflow, Drupal, Joomla, Squarespace, Wix, Ghost, Contentful, Strapi, Sanity, Prismic, DatoCMS, Storyblok, Craft CMS, TYPO3, Magento, BigCommerce, and more
- **Analytics Platforms** (40): Google Analytics (Universal & GA4), Google Tag Manager, Adobe Analytics, Mixpanel, Segment, Amplitude, Matomo, Facebook Pixel, LinkedIn Insight Tag, Pinterest Pixel, Microsoft Clarity, FullStory, LogRocket, Sentry, Plausible, PostHog, and many more
- **Authentication Solutions** (18): Auth0, Clerk, Firebase Auth, NextAuth.js, Okta, AWS Cognito, Azure AD, Google Sign-In, Facebook Login, GitHub OAuth, Stytch, Magic Link, Supabase Auth, and more
- **HTTP Headers**: Comprehensive analysis including server information, security headers (HSTS, CSP, X-Frame-Options), caching headers, and CORS configuration

### JavaScript-Rendered Inspection
Unlike traditional static analyzers, StackScope uses a real headless browser to capture fully-hydrated HTML, ensuring accurate detection of JavaScript-rendered applications and single-page applications (SPAs).

### Serverless-First Architecture
Designed for modern cloud deployments. Powered by Browserless.io's remote browser infrastructure, StackScope runs seamlessly on serverless platforms like Vercel, Netlify, and AWS Lambda without the overhead of managing browser binaries.

### Beautiful, Modern Interface
An intuitive, responsive UI built with Tailwind CSS that presents technology insights in an organized, visually appealing format with dark mode support. Fully accessible with ARIA labels, keyboard navigation, and screen reader support.

### Performance Optimized
Efficient analysis with sub-30 second response times, even for complex JavaScript-heavy applications. Uses case-insensitive pattern matching and multiple detection methods for high accuracy.

## Built With

- **Next.js 16** - React framework with App Router
- **Playwright** - Browser automation for JavaScript rendering
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Modern, utility-first styling
- **Browserless.io** - Serverless browser infrastructure

## Quick Start

### Prerequisites

- Node.js 18+ 
- A Browserless.io account and token (or self-hosted Browserless instance)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/stackscope.git
cd stackscope

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env and add your BROWSERLESS_TOKEN
```

### Environment Variables

```env
BROWSERLESS_TOKEN=your-browserless-token-here
# OR
BROWSERLESS_WS_ENDPOINT=wss://your-browserless-endpoint
```

### Development

```bash
npm run dev
```

Visit `http://localhost:3000` to start analyzing websites.

### Deployment

StackScope is ready to deploy to any serverless platform:

**Vercel** (Recommended)
```bash
vercel
```

**Netlify**
```bash
netlify deploy
```

Make sure to add your `BROWSERLESS_TOKEN` to your platform's environment variables.


## Use Cases

- **Competitive Intelligence**: Understand what technologies competitors are using
- **Security Audits**: Identify authentication mechanisms and security configurations
- **Technology Research**: Discover popular tech stacks and trends
- **Pre-engagement Analysis**: Evaluate a website's architecture before integration
- **Learning Tool**: Explore how modern websites are built

## Privacy & Ethics

StackScope performs non-invasive analysis using only publicly available information. It does not:
- Execute malicious scripts
- Access private APIs or endpoints
- Store or cache analyzed data
- Perform any actions beyond inspection

All analysis is performed in real-time with no data retention.

## License

This project is open source and available under the MIT License.

## Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.