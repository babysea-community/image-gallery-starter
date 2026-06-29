import type { Metadata } from 'next';

import { cloudflareImageUrl } from '@/lib/cloudflare-images';
import '@/styles/globals.css';

const title = 'Image Gallery Starter';
const description = 'AI image gallery for generative media artworks.';
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
  'https://image-gallery-starter.babysea.live';
const socialImageUrl = cloudflareImageUrl(
  '79dddf5d-07ae-42dc-f659-6442e45a0200',
  '1024x576',
);

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: title,
  title: {
    default: title,
    template: `%s | ${title}`,
  },
  description,
  keywords: [
    'image gallery',
    'creator portfolio',
    'Cloudflare Images',
    'Next.js',
    'Base UI',
  ],
  icons: {
    apple: [{ url: '/icon.png', type: 'image/png' }],
    icon: [{ url: '/icon.png', type: 'image/png' }],
    shortcut: ['/icon.png'],
  },
  openGraph: {
    title,
    description,
    images: [{ alt: title, height: 576, url: socialImageUrl, width: 1024 }],
    siteName: title,
    type: 'website',
    url: '/',
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
      <body>{children}</body>
    </html>
  );
}
