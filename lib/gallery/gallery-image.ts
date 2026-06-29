export type GalleryImage = {
  id: string;
  title: string;
  collection: string;
  year: string;
  prompt: string;
  model: string;
  imageId: string;
  variant: string;
  width: number;
  height: number;
  alt: string;
};

export type GalleryImageStack = {
  id: string;
  title: string;
  images: GalleryImage[];
};
