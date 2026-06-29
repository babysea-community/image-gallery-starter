const DEMO_ACCOUNT_HASH = 'ub24fjUytZQ3JbssUo49_w';
const DEFAULT_DELIVERY_ORIGIN = 'https://imagedelivery.net';

export function cloudflareImageUrl(imageId: string, variant: string) {
  const accountHash =
    process.env.NEXT_PUBLIC_CLOUDFLARE_IMAGES_ACCOUNT_HASH?.trim() ||
    DEMO_ACCOUNT_HASH;
  const deliveryOrigin =
    process.env.NEXT_PUBLIC_CLOUDFLARE_IMAGES_DELIVERY_ORIGIN?.trim() ||
    DEFAULT_DELIVERY_ORIGIN;

  return `${deliveryOrigin.replace(/\/+$/, '')}/${accountHash}/${imageId.trim()}/${variant.trim().replace(/^\/+/, '')}`;
}
