# Changelog

All notable changes will be documented here. The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Added Cloudflare Workers one-click deploy support through OpenNext, including `wrangler.jsonc`, `open-next.config.ts`, Cloudflare deploy scripts, and README guidance.
- Added Cloudflare to the gallery host badges and marketing template deploy target metadata.
- Added DigitalOcean, Netlify, Railway, Render, and Vercel deployment guidance and configuration for the public gallery starter.
- Added a full 36-image shared Cloudflare Images source with prompt, model, and size metadata for gallery, feature, hero, and collection views.
- Added static CSP/security headers and optional Sentry monitoring that no-ops unless `NEXT_PUBLIC_SENTRY_DSN` is configured.

### Changed

- Improved artwork loading with delayed loaders, cached URL reuse, high-priority visible images, and Cloudflare Images delivery preconnects.
- Updated the lightbox to keep metadata hidden until the selected artwork loads and to allow tall image views to scroll within the viewport.
- Refined mobile layout spacing for host icons, social icons, and collection cards.
- Reworked the homepage into an image gallery presentation with prompt/model lightbox metadata, protected image rendering, mobile touch previews, collection cards, and social links.

## [0.1.0] - 2026-06-28 - INITIAL RELEASED

- Implement Image Gallery Starter.
