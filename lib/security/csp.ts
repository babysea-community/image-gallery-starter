const isProduction = process.env.NODE_ENV === 'production';
const DEFAULT_DELIVERY_ORIGIN = 'https://imagedelivery.net';

export const SECURITY_HEADERS = [
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()',
  },
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  ...(isProduction
    ? [
        {
          key: 'Strict-Transport-Security',
          value: 'max-age=63072000; includeSubDomains; preload',
        },
      ]
    : []),
  { key: 'Content-Security-Policy', value: buildContentSecurityPolicy() },
];

export const API_SECURITY_HEADERS = [
  {
    key: 'Cache-Control',
    value: 'no-store, no-cache, must-revalidate, proxy-revalidate',
  },
  { key: 'Pragma', value: 'no-cache' },
  { key: 'Expires', value: '0' },
];

/**
 * Builds the gallery starter's static CSP from public deployment env.
 * The app is a public, static gallery, so the allowlist is intentionally small:
 * own app assets, Cloudflare Images delivery, optional custom delivery origin,
 * and optional Sentry ingest when monitoring is enabled.
 */
function buildContentSecurityPolicy() {
  const connectHosts = new Set<string>(["'self'"]);
  const imageHosts = new Set<string>([
    "'self'",
    'data:',
    'blob:',
    DEFAULT_DELIVERY_ORIGIN,
  ]);
  const scriptHosts = new Set<string>(["'self'", "'unsafe-inline'"]);

  appendHostFromUrl(
    imageHosts,
    process.env.NEXT_PUBLIC_CLOUDFLARE_IMAGES_DELIVERY_ORIGIN,
  );

  const sentryDsn = process.env.NEXT_PUBLIC_SENTRY_DSN?.trim();

  if (sentryDsn) {
    appendHostFromUrl(connectHosts, sentryDsn);
  }

  const directives: Record<string, string[]> = {
    'default-src': ["'self'"],
    'script-src': Array.from(scriptHosts),
    'script-src-elem': Array.from(scriptHosts),
    'script-src-attr': ["'none'"],
    'style-src': ["'self'", "'unsafe-inline'"],
    'img-src': Array.from(imageHosts),
    'media-src': Array.from(imageHosts),
    'font-src': ["'self'", 'data:'],
    'connect-src': Array.from(connectHosts),
    'frame-ancestors': ["'none'"],
    'form-action': ["'self'"],
    'base-uri': ["'self'"],
    'object-src': ["'none'"],
    'worker-src': ["'self'", 'blob:'],
    'manifest-src': ["'self'"],
  };

  if (isProduction) {
    directives['upgrade-insecure-requests'] = [];
  }

  return Object.entries(directives)
    .map(([directive, sources]) =>
      sources.length > 0 ? `${directive} ${sources.join(' ')}` : directive,
    )
    .join('; ');
}

function appendHostFromUrl(set: Set<string>, raw: string | undefined) {
  const trimmed = raw?.trim();

  if (!trimmed) {
    return;
  }

  try {
    const url = new URL(trimmed);

    if (url.protocol !== 'https:' && url.protocol !== 'http:') {
      return;
    }

    set.add(`${url.protocol}//${url.host}`);
  } catch {
    // ignore invalid URLs; CSP simply will not include them.
  }
}
