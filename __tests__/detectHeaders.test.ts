import { detectHeaders, HeaderInfo } from '../lib/detectHeaders';

describe('detectHeaders', () => {
  describe('Server information detection', () => {
    it('should detect server header', () => {
      const headers = {
        'Server': 'nginx/1.20.2',
      };
      const result = detectHeaders(headers);
      expect(result.server).toBe('nginx/1.20.2');
    });

    it('should detect server header case insensitively', () => {
      const headers = {
        'SERVER': 'Apache/2.4.41',
      };
      const result = detectHeaders(headers);
      expect(result.server).toBe('Apache/2.4.41');
    });

    it('should detect X-Powered-By header', () => {
      const headers = {
        'X-Powered-By': 'Express',
      };
      const result = detectHeaders(headers);
      expect(result.poweredBy).toBe('Express');
    });

    it('should detect X-Framework header', () => {
      const headers = {
        'X-Framework': 'Next.js',
      };
      const result = detectHeaders(headers);
      expect(result.framework).toBe('Next.js');
    });

    it('should handle all server information headers together', () => {
      const headers = {
        'Server': 'nginx',
        'X-Powered-By': 'PHP/8.0',
        'X-Framework': 'Laravel',
      };
      const result = detectHeaders(headers);
      expect(result.server).toBe('nginx');
      expect(result.poweredBy).toBe('PHP/8.0');
      expect(result.framework).toBe('Laravel');
    });
  });

  describe('Security headers detection', () => {
    it('should detect Strict-Transport-Security', () => {
      const headers = {
        'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
      };
      const result = detectHeaders(headers);
      expect(result.security?.['strict-transport-security']).toBe('max-age=31536000; includeSubDomains');
    });

    it('should detect X-Frame-Options', () => {
      const headers = {
        'X-Frame-Options': 'DENY',
      };
      const result = detectHeaders(headers);
      expect(result.security?.['x-frame-options']).toBe('DENY');
    });

    it('should detect X-Content-Type-Options', () => {
      const headers = {
        'X-Content-Type-Options': 'nosniff',
      };
      const result = detectHeaders(headers);
      expect(result.security?.['x-content-type-options']).toBe('nosniff');
    });

    it('should detect X-XSS-Protection', () => {
      const headers = {
        'X-XSS-Protection': '1; mode=block',
      };
      const result = detectHeaders(headers);
      expect(result.security?.['x-xss-protection']).toBe('1; mode=block');
    });

    it('should detect Referrer-Policy', () => {
      const headers = {
        'Referrer-Policy': 'strict-origin-when-cross-origin',
      };
      const result = detectHeaders(headers);
      expect(result.security?.['referrer-policy']).toBe('strict-origin-when-cross-origin');
    });

    it('should detect Permissions-Policy', () => {
      const headers = {
        'Permissions-Policy': 'geolocation=(), microphone=()',
      };
      const result = detectHeaders(headers);
      expect(result.security?.['permissions-policy']).toBe('geolocation=(), microphone=()');
    });

    it('should detect Content-Security-Policy', () => {
      const headers = {
        'Content-Security-Policy': "default-src 'self'",
      };
      const result = detectHeaders(headers);
      expect(result.security?.['content-security-policy']).toBe("default-src 'self'");
      expect(result.csp).toBe("default-src 'self'");
    });

    it('should detect Public-Key-Pins', () => {
      const headers = {
        'Public-Key-Pins': 'pin-sha256="base64=="',
      };
      const result = detectHeaders(headers);
      expect(result.security?.['public-key-pins']).toBe('pin-sha256="base64=="');
    });

    it('should detect Expect-CT', () => {
      const headers = {
        'Expect-CT': 'max-age=86400, enforce',
      };
      const result = detectHeaders(headers);
      expect(result.security?.['expect-ct']).toBe('max-age=86400, enforce');
    });

    it('should detect multiple security headers', () => {
      const headers = {
        'Strict-Transport-Security': 'max-age=31536000',
        'X-Frame-Options': 'DENY',
        'Content-Security-Policy': "default-src 'self'",
      };
      const result = detectHeaders(headers);
      expect(result.security).toBeDefined();
      expect(Object.keys(result.security || {}).length).toBe(3);
    });

    it('should handle security headers case insensitively', () => {
      const headers = {
        'strict-transport-security': 'max-age=31536000',
        'X-FRAME-OPTIONS': 'DENY',
      };
      const result = detectHeaders(headers);
      expect(result.security?.['strict-transport-security']).toBe('max-age=31536000');
      expect(result.security?.['x-frame-options']).toBe('DENY');
    });
  });

  describe('Caching headers detection', () => {
    it('should detect Cache-Control', () => {
      const headers = {
        'Cache-Control': 'public, max-age=3600',
      };
      const result = detectHeaders(headers);
      expect(result.caching?.['cache-control']).toBe('public, max-age=3600');
    });

    it('should detect ETag', () => {
      const headers = {
        'ETag': '"abc123"',
      };
      const result = detectHeaders(headers);
      expect(result.caching?.['etag']).toBe('"abc123"');
    });

    it('should detect Expires', () => {
      const headers = {
        'Expires': 'Wed, 21 Oct 2025 07:28:00 GMT',
      };
      const result = detectHeaders(headers);
      expect(result.caching?.['expires']).toBe('Wed, 21 Oct 2025 07:28:00 GMT');
    });

    it('should detect Last-Modified', () => {
      const headers = {
        'Last-Modified': 'Wed, 21 Oct 2024 07:28:00 GMT',
      };
      const result = detectHeaders(headers);
      expect(result.caching?.['last-modified']).toBe('Wed, 21 Oct 2024 07:28:00 GMT');
    });

    it('should detect Age', () => {
      const headers = {
        'Age': '3600',
      };
      const result = detectHeaders(headers);
      expect(result.caching?.['age']).toBe('3600');
    });

    it('should detect multiple caching headers', () => {
      const headers = {
        'Cache-Control': 'public, max-age=3600',
        'ETag': '"abc123"',
        'Last-Modified': 'Wed, 21 Oct 2024 07:28:00 GMT',
      };
      const result = detectHeaders(headers);
      expect(result.caching).toBeDefined();
      expect(Object.keys(result.caching || {}).length).toBe(3);
    });
  });

  describe('CORS detection', () => {
    it('should detect CORS from Access-Control-Allow-Origin', () => {
      const headers = {
        'Access-Control-Allow-Origin': '*',
      };
      const result = detectHeaders(headers);
      expect(result.cors).toBe('Enabled');
    });

    it('should detect CORS from Access-Control-Allow-Methods', () => {
      const headers = {
        'Access-Control-Allow-Methods': 'GET, POST, PUT',
      };
      const result = detectHeaders(headers);
      expect(result.cors).toBe('Enabled');
    });

    it('should detect CORS from Access-Control-Allow-Headers', () => {
      const headers = {
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      };
      const result = detectHeaders(headers);
      expect(result.cors).toBe('Enabled');
    });

    it('should detect CORS from any CORS header', () => {
      const headers = {
        'Access-Control-Allow-Origin': 'https://example.com',
        'Access-Control-Allow-Methods': 'GET, POST',
        'Access-Control-Allow-Headers': 'Content-Type',
      };
      const result = detectHeaders(headers);
      expect(result.cors).toBe('Enabled');
    });

    it('should handle CORS headers case insensitively', () => {
      const headers = {
        'access-control-allow-origin': '*',
      };
      const result = detectHeaders(headers);
      expect(result.cors).toBe('Enabled');
    });
  });

  describe('All headers preservation', () => {
    it('should preserve all headers in result.all', () => {
      const headers = {
        'Server': 'nginx',
        'Content-Type': 'text/html',
        'Custom-Header': 'custom-value',
      };
      const result = detectHeaders(headers);
      expect(result.all).toEqual(headers);
    });

    it('should trim whitespace from all header values', () => {
      const headers = {
        'Server': '  nginx  ',
        'Content-Type': ' text/html ',
      };
      const result = detectHeaders(headers);
      expect(result.all['Server']).toBe('nginx');
      expect(result.all['Content-Type']).toBe('text/html');
      expect(result.server).toBe('nginx');
    });

    it('should preserve original header names case', () => {
      const headers = {
        'Server': 'nginx',
        'CONTENT-TYPE': 'text/html',
        'X-Custom': 'value',
      };
      const result = detectHeaders(headers);
      expect(result.all['Server']).toBe('nginx');
      expect(result.all['CONTENT-TYPE']).toBe('text/html');
      expect(result.all['X-Custom']).toBe('value');
    });
  });

  describe('Value trimming', () => {
    it('should trim whitespace from server header', () => {
      const headers = {
        'Server': '  nginx/1.20.2  ',
      };
      const result = detectHeaders(headers);
      expect(result.server).toBe('nginx/1.20.2');
    });

    it('should trim whitespace from security headers', () => {
      const headers = {
        'X-Frame-Options': '  DENY  ',
      };
      const result = detectHeaders(headers);
      expect(result.security?.['x-frame-options']).toBe('DENY');
    });

    it('should trim whitespace from caching headers', () => {
      const headers = {
        'Cache-Control': '  public, max-age=3600  ',
      };
      const result = detectHeaders(headers);
      expect(result.caching?.['cache-control']).toBe('public, max-age=3600');
    });

    it('should trim whitespace from X-Powered-By', () => {
      const headers = {
        'X-Powered-By': '  Express  ',
      };
      const result = detectHeaders(headers);
      expect(result.poweredBy).toBe('Express');
    });
  });

  describe('Edge cases', () => {
    it('should handle empty headers object', () => {
      const headers = {};
      const result = detectHeaders(headers);
      expect(result.all).toEqual({});
      expect(result.server).toBeUndefined();
      expect(result.security).toBeUndefined();
      expect(result.caching).toBeUndefined();
      expect(result.cors).toBeUndefined();
    });

    it('should handle headers with empty values', () => {
      const headers = {
        'Server': '',
        'X-Frame-Options': 'DENY',
      };
      const result = detectHeaders(headers);
      expect(result.server).toBeUndefined();
      expect(result.security?.['x-frame-options']).toBe('DENY');
    });

    it('should handle headers with only whitespace', () => {
      const headers = {
        'Server': '   ',
        'X-Frame-Options': 'DENY',
      };
      const result = detectHeaders(headers);
      expect(result.server).toBeUndefined();
      expect(result.security?.['x-frame-options']).toBe('DENY');
    });

    it('should handle many headers', () => {
      const headers: Record<string, string> = {};
      for (let i = 0; i < 100; i++) {
        headers[`Custom-Header-${i}`] = `value-${i}`;
      }
      headers['Server'] = 'nginx';
      const result = detectHeaders(headers);
      expect(result.all).toHaveProperty('Server');
      expect(Object.keys(result.all).length).toBe(101);
    });
  });

  describe('Real-world scenarios', () => {
    it('should handle typical Next.js headers', () => {
      const headers = {
        'Server': 'Vercel',
        'X-Powered-By': 'Next.js',
        'Content-Type': 'text/html; charset=utf-8',
        'X-Frame-Options': 'DENY',
        'Strict-Transport-Security': 'max-age=31536000',
      };
      const result = detectHeaders(headers);
      expect(result.server).toBe('Vercel');
      expect(result.poweredBy).toBe('Next.js');
      expect(result.security?.['x-frame-options']).toBe('DENY');
      expect(result.security?.['strict-transport-security']).toBe('max-age=31536000');
    });

    it('should handle typical CDN headers', () => {
      const headers = {
        'Server': 'cloudflare',
        'Cache-Control': 'public, max-age=3600',
        'CF-Cache-Status': 'HIT',
        'Age': '1800',
        'ETag': '"abc123"',
      };
      const result = detectHeaders(headers);
      expect(result.server).toBe('cloudflare');
      expect(result.caching?.['cache-control']).toBe('public, max-age=3600');
      expect(result.caching?.['age']).toBe('1800');
      expect(result.caching?.['etag']).toBe('"abc123"');
    });

    it('should handle API response headers with CORS', () => {
      const headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'X-Content-Type-Options': 'nosniff',
      };
      const result = detectHeaders(headers);
      expect(result.cors).toBe('Enabled');
      expect(result.security?.['x-content-type-options']).toBe('nosniff');
    });

    it('should handle security-focused headers', () => {
      const headers = {
        'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
        'X-Frame-Options': 'DENY',
        'X-Content-Type-Options': 'nosniff',
        'X-XSS-Protection': '1; mode=block',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
        'Content-Security-Policy': "default-src 'self'",
        'Permissions-Policy': 'geolocation=(), microphone=()',
      };
      const result = detectHeaders(headers);
      expect(result.security).toBeDefined();
      expect(Object.keys(result.security || {}).length).toBe(7);
      expect(result.csp).toBe("default-src 'self'");
    });
  });
});
