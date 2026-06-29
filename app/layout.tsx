import type { Metadata } from 'next';
import '@/styles/globals.css';

const title = 'Image Gallery Starter';
const description = 'Image gallery for generative media artworks.';
const socialImageUrl =
  'https://cdn.babysea.live/assets/oss/image-gallery-starter-card.png';
const defaultCloudflareImagesOrigin = 'https://imagedelivery.net';
const cloudflareImagesDeliveryOrigin = getUrlOrigin(
  process.env.NEXT_PUBLIC_CLOUDFLARE_IMAGES_DELIVERY_ORIGIN ??
    defaultCloudflareImagesOrigin,
);

export const metadata: Metadata = {
  metadataBase: new URL('https://image-gallery-starter.babysea.live'),
  applicationName: title,
  title: {
    default: title,
    template: `%s | ${title}`,
  },
  description,
  keywords: [
    'babysea',
    'open-source',
    'ai-infrastructure',
    'control-plane',
    'execution-layer',
    'inference-providers',
    'developer-tools',
    'creative-tools',
    'generative-ai',
    'generative-media',
    'cloudflare-images',
    'sentry',
  ],
  icons: {
    icon: [{ url: '/favicon.ico', type: 'image/x-icon' }],
    shortcut: ['/favicon.ico'],
  },
  openGraph: {
    title,
    description,
    images: [
      {
        alt: title,
        height: 630,
        url: socialImageUrl,
        width: 1200,
      },
    ],
    siteName: title,
    type: 'website',
    url: '/',
  },
  robots: {
    follow: true,
    index: true,
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: [socialImageUrl],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="dns-prefetch" href={cloudflareImagesDeliveryOrigin} />
        <link rel="preconnect" href={cloudflareImagesDeliveryOrigin} />
      </head>
      <body>{children}</body>
    </html>
  );
}

function getUrlOrigin(url: string) {
  try {
    return new URL(url).origin;
  } catch {
    return defaultCloudflareImagesOrigin;
  }
}
