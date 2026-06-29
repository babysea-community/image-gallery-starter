'use client';

import { useEffect, useRef, useState } from 'react';

import { useGalleryTouchEvents } from '@/components/gallery/touch-event';
import { InlineGitHub } from '@/components/icons/inline-git';
import {
  InlineCloudflare,
  InlineDigitalOcean,
  InlineNetlify,
  InlineRailway,
  InlineRender,
  InlineVercel,
} from '@/components/icons/inline-host';
import { InlineCloudflareImages } from '@/components/icons/inline-storage';
import { ProtectedImage } from '@/components/protected-image';
import { cloudflareImageUrl } from '@/lib/cloudflare-images';
import { featureCarouselImages as featureGalleryImages } from '@/lib/gallery/feature-carousel-images';
import { galleryGridImages } from '@/lib/gallery/gallery-grid-images';
import type { GalleryImage } from '@/lib/gallery/gallery-image';
import { stackSectionImages } from '@/lib/gallery/stack-section-images';
import { cn } from '@/lib/utils';
import { Dialog } from '@base-ui/react/dialog';
import {
  ArrowRight,
  Camera,
  ChevronLeft,
  ChevronRight,
  Cloud,
  Flower2,
  Globe,
  Layers,
  Linkedin,
  LoaderCircle,
  type LucideIcon,
  Mail,
  Palette,
  Pencil,
  Ruler,
  Scissors,
  Sparkles,
  Star,
  Sun,
  WandSparkles,
} from 'lucide-react';
import {
  siArtstation,
  siBehance,
  siDribbble,
  siFacebook,
  siInstagram,
  siPinterest,
  siTiktok,
  siTwitch,
  siX,
  siYoutube,
} from 'simple-icons';

type LightboxState = {
  images: readonly GalleryImage[];
  index: number;
};

type GalleryLayout = {
  wrapperClassName: string;
  frameClassName: string;
};

const galleryLayouts: GalleryLayout[] = [
  {
    wrapperClassName: 'col-span-2 row-span-2 md:col-span-1',
    frameClassName: 'aspect-[3/5]',
  },
  {
    wrapperClassName: 'col-span-1 row-span-1',
    frameClassName: 'aspect-square',
  },
  {
    wrapperClassName: 'col-span-2 row-span-1',
    frameClassName: 'aspect-[16/9]',
  },
  {
    wrapperClassName: 'col-span-1 row-span-1',
    frameClassName: 'aspect-[3/4]',
  },
  {
    wrapperClassName: 'col-span-1 row-span-1',
    frameClassName: 'aspect-square',
  },
  {
    wrapperClassName: 'col-span-2 row-span-2 md:col-span-1',
    frameClassName: 'aspect-[2/3]',
  },
  {
    wrapperClassName: 'col-span-1 row-span-1',
    frameClassName: 'aspect-square',
  },
  {
    wrapperClassName: 'col-span-2 row-span-1',
    frameClassName: 'aspect-[16/9]',
  },
  {
    wrapperClassName: 'col-span-1 row-span-1',
    frameClassName: 'aspect-[3/4]',
  },
  {
    wrapperClassName: 'col-span-2 row-span-2 md:col-span-1',
    frameClassName: 'aspect-[9/16]',
  },
  {
    wrapperClassName: 'col-span-1 row-span-1',
    frameClassName: 'aspect-square',
  },
  {
    wrapperClassName: 'col-span-2 row-span-2 md:col-span-1',
    frameClassName: 'aspect-[9/16]',
  },
];

const featureGalleryGroups = [
  featureGalleryImages.slice(0, 12),
  featureGalleryImages.slice(12, 24),
  featureGalleryImages.slice(24, 36),
].filter((group) => group.length > 0);

const deployHosts = [
  { label: 'Cloudflare', Icon: InlineCloudflare },
  { label: 'DigitalOcean', Icon: InlineDigitalOcean },
  { label: 'Netlify', Icon: InlineNetlify },
  { label: 'Railway', Icon: InlineRailway },
  { label: 'Render', Icon: InlineRender },
  { label: 'Vercel', Icon: InlineVercel },
] as const;

type SimpleIconDefinition = {
  title: string;
  path: string;
};

const creatorSocialLinks: Array<{
  label: string;
  href: string;
  icon?: SimpleIconDefinition;
  Icon?: LucideIcon;
}> = [
  { label: 'Instagram', href: 'https://instagram.com', icon: siInstagram },
  { label: 'X', href: 'https://x.com', icon: siX },
  { label: 'TikTok', href: 'https://tiktok.com', icon: siTiktok },
  { label: 'YouTube', href: 'https://youtube.com', icon: siYoutube },
  { label: 'Twitch', href: 'https://twitch.tv', icon: siTwitch },
  { label: 'Behance', href: 'https://behance.net', icon: siBehance },
  { label: 'Dribbble', href: 'https://dribbble.com', icon: siDribbble },
  { label: 'ArtStation', href: 'https://artstation.com', icon: siArtstation },
  { label: 'Pinterest', href: 'https://pinterest.com', icon: siPinterest },
  { label: 'Facebook', href: 'https://facebook.com', icon: siFacebook },
  { label: 'LinkedIn', href: 'https://linkedin.com', Icon: Linkedin },
  { label: 'Website', href: '/', Icon: Globe },
  { label: 'Email', href: 'mailto:studio@example.com', Icon: Mail },
];

const collectionIcons: LucideIcon[] = [
  Cloud,
  Scissors,
  Pencil,
  Ruler,
  Star,
  Sun,
  Flower2,
  Sparkles,
  Palette,
  Camera,
  WandSparkles,
  Layers,
];

const loadedArtworkUrls = new Set<string>();

function imageUrl(artwork: GalleryImage) {
  return cloudflareImageUrl(artwork.imageId, artwork.variant);
}

function ArtworkImage({
  className,
  fetchPriority = 'auto',
  loading,
  onError,
  onLoadedChange,
  src,
  wrapperClassName = 'relative block h-full w-full',
}: {
  className: string;
  fetchPriority?: 'auto' | 'high' | 'low';
  loading?: 'eager' | 'lazy';
  onError?: () => void;
  onLoadedChange?: (isLoaded: boolean) => void;
  src: string;
  wrapperClassName?: string;
}) {
  const onErrorRef = useRef(onError);
  const onLoadedChangeRef = useRef(onLoadedChange);
  const isSettledRef = useRef(false);
  const wrapperRef = useRef<HTMLSpanElement>(null);
  const [isLoaded, setIsLoaded] = useState(() => loadedArtworkUrls.has(src));
  const [showLoader, setShowLoader] = useState(false);

  onErrorRef.current = onError;
  onLoadedChangeRef.current = onLoadedChange;

  function markLoaded() {
    isSettledRef.current = true;
    loadedArtworkUrls.add(src);
    setIsLoaded(true);
    setShowLoader(false);
    onLoadedChangeRef.current?.(true);
  }

  useEffect(() => {
    if (loadedArtworkUrls.has(src)) {
      markLoaded();

      return;
    }

    setIsLoaded(false);
    setShowLoader(false);
    isSettledRef.current = false;
    onLoadedChangeRef.current?.(false);

    const loaderTimer = window.setTimeout(() => {
      if (!isSettledRef.current) {
        setShowLoader(true);
      }
    }, 180);

    const completeCheck = window.requestAnimationFrame(() => {
      const image = wrapperRef.current?.querySelector('img');

      if (image?.complete && image.naturalWidth > 0) {
        markLoaded();
      }
    });

    return () => {
      window.clearTimeout(loaderTimer);
      window.cancelAnimationFrame(completeCheck);
    };
  }, [src]);

  return (
    <span ref={wrapperRef} className={wrapperClassName}>
      <ProtectedImage
        src={src}
        alt=""
        className={cn(
          className,
          'transition-opacity duration-300 ease-out',
          isLoaded ? 'opacity-100' : 'opacity-0',
        )}
        decoding="async"
        fetchPriority={fetchPriority}
        loading={loading}
        onError={() => {
          isSettledRef.current = true;
          setIsLoaded(false);
          setShowLoader(false);
          onLoadedChangeRef.current?.(false);
          onErrorRef.current?.();
        }}
        onLoad={markLoaded}
      />
      {!isLoaded && showLoader ? (
        <span className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center bg-[#f8f4ff]/55 text-[#6f7bae]">
          <LoaderCircle className="size-5 animate-spin" aria-hidden="true" />
          <span className="sr-only">Loading image</span>
        </span>
      ) : null}
    </span>
  );
}

function artworkAspectClassName(artwork: GalleryImage) {
  if (artwork.width === artwork.height) {
    return 'aspect-square';
  }

  const ratio = artwork.width / artwork.height;

  if (ratio > 1.55) {
    return 'aspect-[16/9]';
  }

  if (ratio > 1) {
    return 'aspect-[4/3]';
  }

  if (ratio < 0.6) {
    return 'aspect-[9/16]';
  }

  if (ratio < 0.7) {
    return 'aspect-[3/5]';
  }

  if (ratio < 0.8) {
    return 'aspect-[3/4]';
  }

  return 'aspect-[4/5]';
}

export default function HomePage() {
  const galleryRef = useGalleryTouchEvents();
  const [lightboxState, setLightboxState] = useState<LightboxState | null>(
    null,
  );
  const lightboxArtwork = lightboxState
    ? lightboxState.images[lightboxState.index]
    : null;

  function openArtwork(images: readonly GalleryImage[], index: number) {
    setLightboxState({ images, index });
  }

  function showNextArtwork() {
    setLightboxState((current) => {
      if (!current || current.images.length === 0) {
        return current;
      }

      return {
        ...current,
        index: (current.index + 1) % current.images.length,
      };
    });
  }

  function showPreviousArtwork() {
    setLightboxState((current) => {
      if (!current || current.images.length === 0) {
        return current;
      }

      return {
        ...current,
        index:
          (current.index - 1 + current.images.length) % current.images.length,
      };
    });
  }

  return (
    <main
      ref={galleryRef}
      className="stage-bg min-h-screen px-4 py-4 font-serif text-[#131947] selection:bg-[#ffb6c1] selection:text-white sm:px-6 lg:px-8"
    >
      <div className="relative z-10 mx-auto flex w-full max-w-[82rem] flex-col gap-8 md:gap-10">
        <Hero />
        <FeatureStack onOpenArtwork={openArtwork} />
        <GalleryGrid onOpenArtwork={openArtwork} />
        <StackedSpotlights onOpenArtwork={openArtwork} />
        <FooterPanel />
      </div>

      <Dialog.Root
        open={lightboxArtwork !== null}
        onOpenChange={(open) => {
          if (!open) {
            setLightboxState(null);
          }
        }}
      >
        <Dialog.Portal>
          <Dialog.Backdrop className="dialog-backdrop fixed inset-0 z-40" />
          <Dialog.Popup className="dialog-popup fixed inset-x-3 top-3 bottom-3 z-50 mx-auto max-w-6xl overflow-y-auto overscroll-contain rounded-[1.75rem] border border-white/85 bg-white/92 p-3 shadow-[0_38px_140px_rgba(45,56,107,0.34)] backdrop-blur-xl sm:top-4 sm:bottom-4 sm:p-4">
            {lightboxArtwork && lightboxState ? (
              <Lightbox
                artwork={lightboxArtwork}
                canNavigate={lightboxState.images.length > 1}
                onNext={showNextArtwork}
                onPrevious={showPreviousArtwork}
              />
            ) : null}
          </Dialog.Popup>
        </Dialog.Portal>
      </Dialog.Root>
    </main>
  );
}

function Hero() {
  return (
    <section className="section-surface section-surface-hero relative overflow-hidden rounded-[2rem] p-6 sm:p-8 lg:p-10">
      <div className="relative z-10 flex flex-col gap-7">
        <div>
          <div className="mb-5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <ProtectedImage
                src="/icon.png"
                alt=""
                className="size-14 rounded-[1.1rem] shadow-[0_18px_46px_rgba(116,146,221,0.24)]"
              />
              <div>
                <p className="text-[0.65rem] font-black tracking-[0.32em] text-[#949cc3] uppercase">
                  Open source
                </p>
                <p className="mt-1 text-sm font-black text-[#3e4b7e]">
                  Artwork Community
                </p>
              </div>
            </div>
            <a
              href="https://github.com/babysea-community/image-gallery-starter"
              className="inline-flex items-center gap-2 rounded-full bg-[#f0e8ff]/88 px-4 py-2 text-xs font-black text-[#3e4b7e] shadow-sm transition hover:bg-[#eadfff]"
            >
              <InlineGitHub className="size-4 shrink-0" aria-hidden="true" />
              GitHub
            </a>
          </div>

          <h1 className="max-w-full text-[clamp(2.55rem,6.4vw,5.9rem)] leading-none font-bold tracking-tighter text-balance text-[#131947]">
            Image Gallery Starter
          </h1>
        </div>

        <div>
          <p className="max-w-5xl text-base leading-7 text-[#3c4774] sm:text-lg">
            Image gallery for generative media artworks, collecting finished
            studies, prompt notes, model details, and visual experiments in one
            polished creative archive.
          </p>
          <div className="mt-6 grid max-w-5xl grid-cols-1 gap-3 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.35fr)]">
            <CloudflareImageBox />
            <DeployHostBox />
          </div>
        </div>
      </div>
    </section>
  );
}

function FeatureStack({
  onOpenArtwork,
}: {
  onOpenArtwork: (images: readonly GalleryImage[], index: number) => void;
}) {
  if (featureGalleryGroups.length === 0) {
    return null;
  }

  return (
    <section className="section-surface section-surface-rose relative overflow-hidden rounded-[2rem] p-5 sm:p-7 lg:p-8">
      <div className="relative mx-auto w-full max-w-6xl">
        <div className="relative pb-14 text-center sm:pb-16 lg:pb-20">
          <p className="inline-flex items-center text-xs font-black tracking-[0.24em] text-[#8d95bd] uppercase">
            Top collection
          </p>
          <h2 className="mt-4 text-3xl font-black tracking-normal text-[#151a47] md:text-5xl lg:text-6xl">
            <span>Build your</span>
            <span className="mx-4 text-[#9aa0c4]">x</span>
            <span className="font-normal text-[#68739b]">own gallery</span>
          </h2>
        </div>

        <div className="space-y-8 md:hidden">
          {featureGalleryGroups.map((items, groupIndex) => (
            <div
              key={`mobile-feature-gallery-${groupIndex}`}
              className="grid grid-cols-1 gap-7 sm:grid-cols-2 sm:gap-8"
            >
              {items.map((artwork, index) => (
                <FeatureGalleryCard
                  key={artwork.id}
                  artwork={artwork}
                  frameClassName="aspect-square"
                  priority={groupIndex === 0 && index < 2}
                  onClick={() => onOpenArtwork(items, index)}
                />
              ))}
            </div>
          ))}
        </div>

        <div className="hidden space-y-8 md:block">
          {featureGalleryGroups.map((items, groupIndex) => (
            <div
              key={`desktop-feature-gallery-${groupIndex}`}
              className="grid w-full auto-rows-auto grid-cols-4 gap-5 lg:gap-6"
            >
              {items.map((artwork, index) => {
                const layout = galleryLayouts[index]!;

                return (
                  <div key={artwork.id} className={layout.wrapperClassName}>
                    <FeatureGalleryCard
                      artwork={artwork}
                      frameClassName={artworkAspectClassName(artwork)}
                      priority={groupIndex === 0 && index < 2}
                      onClick={() => onOpenArtwork(items, index)}
                    />
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureGalleryCard({
  artwork,
  frameClassName,
  onClick,
  priority = false,
}: {
  artwork: GalleryImage;
  frameClassName: string;
  onClick: () => void;
  priority?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="gallery-card image-frame group relative h-full w-full overflow-hidden rounded-xl p-0 text-left shadow-lg transition duration-500 ease-out hover:-translate-y-0.5 hover:shadow-[0_20px_54px_rgba(145,111,156,0.18)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#75caff]"
      aria-label={`Open ${artwork.title}`}
    >
      <span className={`${frameClassName} block h-full w-full overflow-hidden`}>
        <ArtworkImage
          src={imageUrl(artwork)}
          className="h-full w-full object-cover"
          fetchPriority={priority ? 'high' : 'auto'}
          loading={priority ? 'eager' : 'lazy'}
        />
      </span>
      <span className="absolute inset-0 bg-gradient-to-b from-white/18 to-white/8 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-[.touch-active]:opacity-100" />
      <Caption artwork={artwork} />
    </button>
  );
}

function GalleryGrid({
  onOpenArtwork,
}: {
  onOpenArtwork: (images: readonly GalleryImage[], index: number) => void;
}) {
  return (
    <section className="section-surface section-surface-blue relative overflow-hidden rounded-[2rem] p-5 sm:p-7">
      <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="inline-flex items-center text-xs font-black tracking-[0.3em] text-[#8d95bd] uppercase">
            Top gallery
          </p>
          <h2 className="mt-2 max-w-4xl text-3xl font-black tracking-[-0.045em] text-[#131947] sm:text-5xl">
            Showcase your generative media artworks in a beautiful gallery.
          </h2>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        {galleryGridImages.map((artwork, index) => (
          <GalleryGridCard
            key={artwork.id}
            artwork={artwork}
            index={index}
            onOpenArtwork={onOpenArtwork}
          />
        ))}
      </div>
    </section>
  );
}

function GalleryGridCard({
  artwork,
  index,
  onOpenArtwork,
}: {
  artwork: GalleryImage;
  index: number;
  onOpenArtwork: (images: readonly GalleryImage[], index: number) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onOpenArtwork(galleryGridImages, index)}
      className="gallery-card image-frame group relative aspect-[4/5] w-full overflow-hidden rounded-[1.35rem] p-0 text-left transition duration-500 ease-out hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#75caff]"
      aria-label={`Open ${artwork.title}`}
    >
      <ArtworkImage
        src={imageUrl(artwork)}
        className="h-full w-full object-cover"
        loading="lazy"
      />
      <Caption artwork={artwork} />
    </button>
  );
}

function StackedSpotlights({
  onOpenArtwork,
}: {
  onOpenArtwork: (images: readonly GalleryImage[], index: number) => void;
}) {
  return (
    <section className="section-surface section-surface-violet relative overflow-hidden rounded-[2rem] p-4 sm:p-5">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {stackSectionImages.map((stack, stackIndex) => (
          <article
            key={stack.id}
            className={cn(
              'stack-card relative min-h-[31rem] overflow-hidden rounded-[1.45rem] p-4 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.5)]',
              stackVariantClassName(stackIndex),
            )}
          >
            <div className="relative z-20 max-w-[13rem] rounded-[1.1rem] bg-[#fff8fb] p-4 shadow-sm md:bg-white/78 md:backdrop-blur">
              <p className="text-[0.68rem] font-black tracking-[0.25em] text-[#9aa0c4] uppercase">
                {stack.title}
              </p>
            </div>
            <CollectionIcon index={stackIndex} />
            {stack.images.map((artwork, imageIndex) => (
              <button
                key={artwork.id}
                type="button"
                onClick={() => onOpenArtwork(stack.images, imageIndex)}
                className={cn(
                  'image-frame absolute overflow-hidden rounded-[1.3rem] p-0 text-left transition duration-500 ease-out hover:-translate-y-0.5 hover:rotate-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#75caff]',
                  'gallery-card group',
                  stackCardClassName(imageIndex),
                )}
                aria-label={`Open ${artwork.title}`}
              >
                <ArtworkImage
                  src={imageUrl(artwork)}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </button>
            ))}
            <span className="sr-only">
              Collection position {stackIndex + 1}
            </span>
          </article>
        ))}
      </div>
    </section>
  );
}

function CollectionIcon({ index }: { index: number }) {
  const Icon = collectionIcons[index % collectionIcons.length]!;

  return (
    <div
      className={cn(
        'relative z-10 mt-20 mb-8 ml-6 text-[#4b5d9c]/68',
        collectionIconClassName(index),
      )}
    >
      <Icon className="size-12" aria-hidden="true" />
    </div>
  );
}

function Lightbox({
  artwork,
  canNavigate,
  onNext,
  onPrevious,
}: {
  artwork: GalleryImage;
  canNavigate: boolean;
  onNext: () => void;
  onPrevious: () => void;
}) {
  const [imageLoadState, setImageLoadState] = useState<{
    artworkId: string;
    status: 'error' | 'loaded' | 'loading';
  }>({
    artworkId: artwork.id,
    status: 'loading',
  });
  const imageStatus =
    imageLoadState.artworkId === artwork.id ? imageLoadState.status : 'loading';

  useEffect(() => {
    setImageLoadState({ artworkId: artwork.id, status: 'loading' });
  }, [artwork.id]);

  return (
    <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_18rem]">
      <Dialog.Title className="sr-only">{artwork.title}</Dialog.Title>
      <div className="relative overflow-hidden rounded-[1.25rem] bg-[#f8f4ff]">
        <ArtworkImage
          src={imageUrl(artwork)}
          className="max-h-[78vh] w-full object-contain"
          fetchPriority="high"
          loading="eager"
          onError={() => {
            setImageLoadState({ artworkId: artwork.id, status: 'error' });
          }}
          onLoadedChange={(isLoaded) => {
            setImageLoadState({
              artworkId: artwork.id,
              status: isLoaded ? 'loaded' : 'loading',
            });
          }}
          wrapperClassName="relative block min-h-[18rem] w-full"
        />
        {canNavigate ? (
          <>
            <button
              type="button"
              onClick={onPrevious}
              className="absolute top-1/2 left-3 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-white/82 text-[#35406f] shadow-lg backdrop-blur transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#75caff]"
              aria-label="Previous image"
            >
              <ChevronLeft className="size-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={onNext}
              className="absolute top-1/2 right-3 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-white/82 text-[#35406f] shadow-lg backdrop-blur transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#75caff]"
              aria-label="Next image"
            >
              <ChevronRight className="size-5" aria-hidden="true" />
            </button>
          </>
        ) : null}
      </div>
      <aside className="rounded-[1.25rem] bg-gradient-to-br from-white to-[#f8f1ff] p-5">
        <div className="mb-5 flex items-start justify-between gap-3">
          {imageStatus === 'loaded' ? (
            <div>
              <p className="text-xs font-black tracking-[0.22em] text-[#9aa0c4] uppercase">
                {artwork.collection}
              </p>
              <p className="mt-2 text-3xl font-black tracking-[-0.04em] text-[#131947]">
                {artwork.title}
              </p>
            </div>
          ) : (
            <span className="sr-only">{artwork.title}</span>
          )}
          <Dialog.Close
            className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white text-xl font-black text-[#68739b] shadow-sm transition hover:text-[#131947]"
            aria-label="Close lightbox"
          >
            x
          </Dialog.Close>
        </div>
        {imageStatus === 'loaded' ? (
          <>
            <div className="space-y-3 text-sm text-[#68739b]">
              <InfoBox label="Prompt" value={artwork.prompt} />
              <InfoBox label="Model" value={artwork.model} />
              <InfoBox
                label="Size"
                value={`${artwork.width} x ${artwork.height}`}
              />
            </div>
          </>
        ) : imageStatus === 'error' ? (
          <div className="flex min-h-[18rem] items-center justify-center text-sm font-black text-[#6f7bae]">
            Image failed to load.
          </div>
        ) : (
          <div className="flex min-h-[18rem] items-center justify-center text-[#6f7bae]">
            <LoaderCircle className="size-6 animate-spin" aria-hidden="true" />
            <span className="sr-only">Loading image metadata</span>
          </div>
        )}
      </aside>
    </div>
  );
}

function CloudflareImageBox() {
  return (
    <div className="hero-tech-box flex min-h-28 flex-col justify-center gap-3 rounded-2xl border border-white/75 px-4 py-4 text-left shadow-sm">
      <div className="text-[0.68rem] font-black tracking-[0.2em] text-[#5f6b99] uppercase">
        Powered by Cloudflare Images
      </div>
      <div className="flex items-center gap-2">
        <span className="flex size-11 items-center justify-center rounded-xl bg-white/40 p-2 shadow-sm sm:size-14 sm:rounded-2xl sm:p-2.5">
          <InlineCloudflare
            className="h-6 w-9 sm:h-8 sm:w-12"
            aria-hidden="true"
          />
        </span>
        <ArrowRight
          className="size-4 shrink-0 text-[#7d87b4] sm:size-5"
          aria-hidden="true"
        />
        <span className="flex size-11 items-center justify-center rounded-xl bg-white/40 p-2.5 shadow-sm sm:size-14 sm:rounded-2xl sm:p-3">
          <InlineCloudflareImages
            className="size-6 sm:size-8"
            aria-hidden="true"
          />
        </span>
      </div>
    </div>
  );
}

function DeployHostIcons() {
  return (
    <span
      className="flex flex-wrap items-center gap-1.5 sm:gap-2"
      aria-label="Hosting options"
    >
      {deployHosts.map(({ Icon, label }) => (
        <span
          key={label}
          title={label}
          className="flex size-11 items-center justify-center rounded-xl bg-white/40 p-2.5 shadow-sm sm:size-14 sm:rounded-2xl sm:p-3"
        >
          <Icon className="size-6 sm:size-8" aria-hidden="true" />
          <span className="sr-only">{label}</span>
        </span>
      ))}
    </span>
  );
}

function DeployHostBox() {
  return (
    <div className="hero-tech-box flex min-h-28 flex-col justify-center gap-3 rounded-2xl border border-white/75 px-4 py-4 text-left shadow-sm">
      <div className="text-[0.68rem] font-black tracking-[0.2em] text-[#5f6b99] uppercase">
        Run and host your gallery
      </div>
      <DeployHostIcons />
    </div>
  );
}

function Caption({
  artwork,
  visible = false,
}: {
  artwork: GalleryImage;
  visible?: boolean;
}) {
  return (
    <span
      className={cn(
        'pointer-events-none absolute inset-x-3 bottom-3 rounded-2xl border border-white/70 bg-white/82 px-4 py-3 opacity-0 shadow-lg backdrop-blur-md transition duration-300 group-hover:opacity-100',
        'group-[.touch-active]:opacity-100',
        visible && 'opacity-100',
      )}
    >
      <span className="block text-sm leading-5 font-black break-words whitespace-normal text-[#131947]">
        {artwork.title}
      </span>
    </span>
  );
}

function InfoBox({
  label,
  mono = false,
  value,
}: {
  label: string;
  mono?: boolean;
  value: string;
}) {
  return (
    <div className="rounded-2xl bg-white/70 p-4">
      <div className="font-black text-[#131947]">{label}</div>
      <div
        className={cn(
          'mt-2 text-xs break-words',
          mono && 'font-mono break-all',
        )}
      >
        {value}
      </div>
    </div>
  );
}

function FooterPanel() {
  return (
    <footer className="section-surface section-surface-footer relative overflow-hidden rounded-[2rem] p-5 sm:flex sm:items-center sm:justify-between sm:p-6">
      <div>
        <p className="text-xs font-black tracking-[0.3em] text-[#8c94bb] uppercase">
          Studio contact
        </p>
        <p className="mt-2 max-w-3xl text-2xl font-black tracking-[-0.035em] text-[#131947] sm:text-4xl">
          Let's connect & explore creative possibilities together.
        </p>
      </div>
      <div className="mt-5 grid max-w-fit grid-cols-7 justify-items-center gap-1 pb-1 sm:mt-0 sm:gap-1.5 lg:flex lg:max-w-full lg:flex-nowrap lg:justify-end lg:gap-2 lg:pb-0">
        {creatorSocialLinks.map((item) => (
          <FooterLink key={item.label} item={item} />
        ))}
      </div>
    </footer>
  );
}

function SimpleIcon({ icon }: { icon: SimpleIconDefinition }) {
  return (
    <svg
      className="size-3.5 sm:size-4"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d={icon.path} />
    </svg>
  );
}

function FooterLink({ item }: { item: (typeof creatorSocialLinks)[number] }) {
  const Icon = item.Icon;

  return (
    <a
      href={item.href}
      className="inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-[#f0e8ff] text-[#35406f] shadow-sm transition hover:-translate-y-0.5 hover:bg-[#eadfff] sm:size-8 lg:size-10"
      aria-label={item.label}
      title={item.label}
    >
      {item.icon ? (
        <SimpleIcon icon={item.icon} />
      ) : Icon ? (
        <Icon className="size-3.5 sm:size-4" aria-hidden="true" />
      ) : null}
    </a>
  );
}

function stackVariantClassName(index: number) {
  const sequence = [1, 2, 3, 4, 5, 2, 3, 4, 5, 1, 2, 3];
  const variant = sequence[index % sequence.length];

  return `stack-card-${variant}`;
}

function collectionIconClassName(index: number) {
  const classNames = [
    'rotate-[-12deg] translate-x-1 -translate-y-3',
    'rotate-[7deg] translate-y-1',
    'rotate-[-4deg] translate-x-2',
    'rotate-[15deg] translate-y-1',
    'rotate-0 -translate-x-1',
    'rotate-[-18deg] -translate-y-3',
    'rotate-[10deg] -translate-x-2',
    'rotate-[-8deg] -translate-y-3',
    'rotate-[18deg] translate-x-1',
    'rotate-[-2deg] translate-y-2',
    'rotate-[5deg] -translate-x-1',
    'rotate-[-15deg] translate-x-2 -translate-y-3',
  ];

  return classNames[index % classNames.length] ?? classNames[0]!;
}

function stackCardClassName(index: number) {
  const classNames = [
    'right-5 top-24 h-[17rem] w-[56%] rotate-[-3deg]',
    'bottom-7 left-5 h-[15rem] w-[48%] rotate-[4deg]',
    'bottom-8 right-8 h-[12.5rem] w-[38%] rotate-[-2deg]',
  ];

  return classNames[index] ?? classNames[0]!;
}
