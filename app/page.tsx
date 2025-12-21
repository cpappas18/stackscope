"use client";

import { useState } from "react";

interface HeaderInfo {
  server?: string;
  poweredBy?: string;
  framework?: string;
  security?: Record<string, string>;
  caching?: Record<string, string>;
  csp?: string;
  cors?: string;
  all: Record<string, string>;
}

interface AnalysisResult {
  frameworks?: string[];
  cms?: string[];
  analytics?: string[];
  signIn?: string[];
  headers?: HeaderInfo;
}

export default function Home() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const analyze = async () => {
    if (!url.trim()) return;
    
    setLoading(true);
    setError(null);
    setResult(null);
    
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to analyze URL");
      }
      
      const data = await res.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      analyze();
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-lg">
        Skip to main content
      </a>
      <div id="main-content" className="container mx-auto px-4 sm:px-6 py-6 sm:py-12 max-w-4xl">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            StackScope
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg">
            Analyze any website&apos;s technology stack
          </p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            analyze();
          }}
          className="bg-white dark:bg-slate-800 rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 mb-6 sm:mb-8 border border-slate-200 dark:border-slate-700"
          aria-label="Website analysis form"
        >
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <label htmlFor="url-input" className="sr-only focus:not-sr-only">
              Website URL to analyze
            </label>
            <input
              id="url-input"
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="https://example.com"
              className="flex-1 px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              disabled={loading}
              aria-required="true"
              aria-invalid={error ? "true" : "false"}
              aria-describedby={error ? "error-message" : undefined}
              aria-busy={loading}
            />
            <button
              type="submit"
              onClick={analyze}
              disabled={loading || !url.trim()}
              className="w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm sm:text-base font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl sm:transform sm:hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              aria-label={loading ? "Analyzing website, please wait" : "Analyze website"}
            >
              {loading ? (
                <span className="flex items-center gap-2" aria-hidden="true">
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Analyzing...</span>
                </span>
              ) : (
                "Analyze"
              )}
            </button>
          </div>
        </form>

        {error && (
          <div
            id="error-message"
            role="alert"
            aria-live="assertive"
            className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 sm:p-4 mb-6 sm:mb-8"
          >
            <p className="text-red-800 dark:text-red-200 flex items-start sm:items-center gap-2 text-sm sm:text-base">
              <svg className="w-5 h-5 flex-shrink-0 mt-0.5 sm:mt-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{error}</span>
            </p>
          </div>
        )}

        {result && (
          <div
            className="space-y-4 sm:space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500"
            role="region"
            aria-label="Analysis results"
            aria-live="polite"
          >
            {result.frameworks && result.frameworks.length > 0 && (
              <div className="bg-white dark:bg-slate-800 rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 border border-slate-200 dark:border-slate-700">
                <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                  Frameworks
                </h2>
                <div className="flex flex-wrap gap-2" role="list">
                  {result.frameworks.map((framework, idx) => (
                    <span
                      key={idx}
                      className="px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded-md sm:rounded-lg font-medium"
                      role="listitem"
                    >
                      {framework}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {result.cms && result.cms.length > 0 && (
              <div className="bg-white dark:bg-slate-800 rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 border border-slate-200 dark:border-slate-700">
                <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  <span className="break-words">Content Management System</span>
                </h2>
                <div className="flex flex-wrap gap-2" role="list">
                  {result.cms.map((cms, idx) => (
                    <span
                      key={idx}
                      className="px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 rounded-md sm:rounded-lg font-medium"
                      role="listitem"
                    >
                      {cms}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {result.analytics && result.analytics.length > 0 && (
              <div className="bg-white dark:bg-slate-800 rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 border border-slate-200 dark:border-slate-700">
                <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  Analytics
                </h2>
                <div className="flex flex-wrap gap-2" role="list">
                  {result.analytics.map((analytics, idx) => (
                    <span
                      key={idx}
                      className="px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 rounded-md sm:rounded-lg font-medium"
                      role="listitem"
                    >
                      {analytics}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {result.signIn && result.signIn.length > 0 && (
              <div className="bg-white dark:bg-slate-800 rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 border border-slate-200 dark:border-slate-700">
                <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-pink-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <span className="break-words">Sign In Technology</span>
                </h2>
                <div className="flex flex-wrap gap-2" role="list">
                  {result.signIn.map((signIn, idx) => (
                    <span
                      key={idx}
                      className="px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base bg-pink-100 dark:bg-pink-900/30 text-pink-800 dark:text-pink-200 rounded-md sm:rounded-lg font-medium"
                      role="listitem"
                    >
                      {signIn}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {result.headers && Object.keys(result.headers.all || {}).length > 0 && (
              <div className="bg-white dark:bg-slate-800 rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 border border-slate-200 dark:border-slate-700">
                <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  HTTP Headers
                </h2>
                <div className="space-y-4 sm:space-y-6">
                  {(result.headers.server || result.headers.poweredBy || result.headers.framework) && (
                    <div>
                      <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">
                        Server Information
                      </h3>
                      <div className="space-y-2">
                        {result.headers.server && (
                          <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-2 p-2.5 sm:p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                            <span className="font-semibold text-blue-700 dark:text-blue-300 sm:min-w-[140px] flex-shrink-0 text-sm sm:text-base">
                              Server:
                            </span>
                            <span className="text-blue-900 dark:text-blue-100 font-mono text-xs sm:text-sm break-all">
                              {result.headers.server}
                            </span>
                          </div>
                        )}
                        {result.headers.poweredBy && (
                          <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-2 p-2.5 sm:p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
                            <span className="font-semibold text-purple-700 dark:text-purple-300 sm:min-w-[140px] flex-shrink-0 text-sm sm:text-base">
                              Powered By:
                            </span>
                            <span className="text-purple-900 dark:text-purple-100 font-mono text-xs sm:text-sm break-all">
                              {result.headers.poweredBy}
                            </span>
                          </div>
                        )}
                        {result.headers.framework && (
                          <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-2 p-2.5 sm:p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg border border-indigo-200 dark:border-indigo-800">
                            <span className="font-semibold text-indigo-700 dark:text-indigo-300 sm:min-w-[140px] flex-shrink-0 text-sm sm:text-base">
                              Framework:
                            </span>
                            <span className="text-indigo-900 dark:text-indigo-100 font-mono text-xs sm:text-sm break-all">
                              {result.headers.framework}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {result.headers.security && Object.keys(result.headers.security).length > 0 && (
                    <div>
                      <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3 flex items-center gap-2">
                        <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        Security Headers
                      </h3>
                      <div className="space-y-2">
                        {Object.entries(result.headers.security).map(([key, value], idx) => (
                          <div
                            key={idx}
                            className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-2 p-2.5 sm:p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800"
                          >
                            <span className="font-semibold text-green-700 dark:text-green-300 sm:min-w-[200px] flex-shrink-0 capitalize text-sm sm:text-base">
                              {key.replace(/-/g, " ")}:
                            </span>
                            <span className="text-green-900 dark:text-green-100 font-mono text-xs sm:text-sm break-all">
                              {value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {result.headers.caching && Object.keys(result.headers.caching).length > 0 && (
                    <div>
                      <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">
                        Caching Headers
                      </h3>
                      <div className="space-y-2">
                        {Object.entries(result.headers.caching).map(([key, value], idx) => (
                          <div
                            key={idx}
                            className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-2 p-2.5 sm:p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800"
                          >
                            <span className="font-semibold text-amber-700 dark:text-amber-300 sm:min-w-[140px] flex-shrink-0 capitalize text-sm sm:text-base">
                              {key.replace(/-/g, " ")}:
                            </span>
                            <span className="text-amber-900 dark:text-amber-100 font-mono text-xs sm:text-sm break-all">
                              {value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {result.headers.cors && (
                    <div className="p-2.5 sm:p-3 bg-cyan-50 dark:bg-cyan-900/20 rounded-lg border border-cyan-200 dark:border-cyan-800">
                      <span className="font-semibold text-cyan-700 dark:text-cyan-300 text-sm sm:text-base">CORS: </span>
                      <span className="text-cyan-900 dark:text-cyan-100 text-sm sm:text-base">{result.headers.cors}</span>
                    </div>
                  )}

                  <div>
                    <details className="group">
                      <summary className="cursor-pointer text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3 hover:text-slate-700 dark:hover:text-slate-300 transition-colors">
                        All Headers ({Object.keys(result.headers.all || {}).length})
                      </summary>
                      <div className="mt-3 space-y-2">
                        {Object.entries(result.headers.all || {}).map(([key, value], idx) => (
                          <div
                            key={idx}
                            className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-2 p-2.5 sm:p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                          >
                            <span className="font-semibold text-slate-700 dark:text-slate-300 sm:min-w-[200px] flex-shrink-0 text-sm sm:text-base">
                              {key}:
                            </span>
                            <span className="text-slate-600 dark:text-slate-400 font-mono text-xs sm:text-sm break-all">
                              {value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </details>
                  </div>
                </div>
              </div>
            )}

            {(!result.frameworks || result.frameworks.length === 0) &&
              (!result.cms || result.cms.length === 0) &&
              (!result.analytics || result.analytics.length === 0) &&
              (!result.signIn || result.signIn.length === 0) &&
              (!result.headers || Object.keys(result.headers.all || {}).length === 0) && (
                <div className="bg-white dark:bg-slate-800 rounded-xl sm:rounded-2xl shadow-xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 text-center">
                  <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base">
                    No technologies detected. Try another URL.
                  </p>
                </div>
              )}
          </div>
        )}
      </div>
    </main>
  );
}
