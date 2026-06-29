import type { GalleryImageStack } from './gallery-image';
import { sourceGalleryImages } from './source-gallery-images';

const STACK_SIZE = 3;

export const stackSectionImages: GalleryImageStack[] = Array.from(
  { length: sourceGalleryImages.length / STACK_SIZE },
  (_unusedValue, stackIndex) => {
    const stackNumber = String(stackIndex + 1).padStart(2, '0');
    const title = `Collection ${stackNumber}`;
    const start = stackIndex * STACK_SIZE;

    return {
      id: `stack-${stackNumber}`,
      title,
      images: sourceGalleryImages
        .slice(start, start + STACK_SIZE)
        .map((image, imageIndex) => ({
          ...image,
          collection: title,
          id: `stack-${stackNumber}-${imageIndex + 1}-${image.id}`,
        })),
    };
  },
);
