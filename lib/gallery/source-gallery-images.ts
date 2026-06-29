import type { GalleryImage } from './gallery-image';

const galleryImageTitle = 'Image Title';
const galleryImagePrompt = 'Your image prompt here.';

const sourceGalleryImageData = [
  ['8d74a98a-86a5-494c-67a0-c5476336c900', '600x1000', 600, 1000],
  ['5675a179-53f6-40dc-9615-0919bd435b00', '800x800', 800, 800],
  ['79dddf5d-07ae-42dc-f659-6442e45a0200', '1024x576', 1024, 576],
  ['1eca326f-f67f-4afd-a215-8aedc9a93900', '768x1024', 768, 1024],
  ['99650c27-d334-42c4-c205-78153ad49e00', '800x800', 800, 800],
  ['27d4882a-829a-4e9d-94e8-f002202f5e00', '800x1200', 800, 1200],
  ['e76bacbf-df83-4097-519e-04df05071f00', '800x800', 800, 800],
  ['42ef0a74-eb8c-444b-6654-dbb450a84f00', '1024x576', 1024, 576],
  ['7212c266-3198-464d-eae5-441e6f314000', '768x1024', 768, 1024],
  ['8f1badec-5746-4d43-a4d2-62a9fb4f5600', '576x1024', 576, 1024],
  ['ac995e42-03de-40ac-3476-6482d80bd600', '800x800', 800, 800],
  ['de9e325f-b971-45b1-6fd3-c2c1de475c00', '576x1024', 576, 1024],
  ['84374b79-f96e-49bc-a29b-c824645f0400', '600x1000', 600, 1000],
  ['7187918b-6d7a-43f7-c36d-dca2a9967b00', '800x800', 800, 800],
  ['67cc3373-139e-41aa-7518-13cd70269b00', '1024x576', 1024, 576],
  ['f7fae846-cb13-402a-0361-e2f1dcc88c00', '768x1024', 768, 1024],
  ['4c2dafe9-4a62-4570-333d-028acf446c00', '800x800', 800, 800],
  ['9b08b444-e1a4-427f-be10-cf75244a0300', '800x1200', 800, 1200],
  ['587dbaae-b23b-4d0f-212b-beb6ac7a6600', '800x800', 800, 800],
  ['a39539d0-7719-4585-218e-e217e3cb6900', '1024x576', 1024, 576],
  ['ffa2054c-f19d-4d70-7d4f-ab0bf5375200', '768x1024', 768, 1024],
  ['8d9da5f6-a109-4da7-2267-41fa028c6200', '576x1024', 576, 1024],
  ['bd48ece9-8cda-4f02-5715-e91bff9d2400', '800x800', 800, 800],
  ['5671495e-8da2-446b-7d36-08752d19e500', '1280x720', 1280, 720],
  ['1357c71f-4c6e-4c23-5418-0b0be9e50800', '600x1000', 600, 1000],
  ['239247ed-2c94-4dcd-b7de-e8c5216ee900', '800x800', 800, 800],
  ['d980fa07-cd19-40b5-8fbe-e1b9d3fd1500', '1024x576', 1024, 576],
  ['af25d1bb-cb88-4798-1ee4-003823332c00', '768x1024', 768, 1024],
  ['51c10052-05eb-4f95-6dbe-f5400e17fd00', '800x800', 800, 800],
  ['9e52d067-4d33-49de-00cf-87f3e47c6100', '800x1200', 800, 1200],
  ['7d83e422-bfbc-414d-24d0-c4d6a5f1d700', '800x800', 800, 800],
  ['86ffa39e-6b77-4ff1-739c-c0ac076cc600', '1024x576', 1024, 576],
  ['295c8391-f19a-46ce-18ce-3609fe42f900', '768x1024', 768, 1024],
  ['dc4e65bf-d693-4933-3f78-e7f33b485e00', '576x1024', 576, 1024],
  ['6ab62e7b-1cb1-4e94-711d-6c042a405f00', '800x800', 800, 800],
  ['c4eb0b13-b68c-4657-7427-99d87b8bb400', '576x1024', 576, 1024],
] as const;

const galleryImageMetadata = [
  {
    model: 'bfl/flux-2-pro',
    alt: 'Editorial portrait in a white dress against a dark studio background.',
  },
  {
    model: 'runway/gen-4-image',
    alt: 'Warm blonde portrait over a dark creator dashboard interface.',
  },
  {
    model: 'google/nano-banana-pro',
    alt: 'Dark music interface collage with playlist panels and blue controls.',
  },
  {
    model: 'bytedance/seedream-4.5',
    alt: 'Person standing before a colorful anime mural with app overlays.',
  },
  {
    model: 'bfl/flux-2-max',
    alt: 'Cinematic taxi portrait with neon city lights and rain-streaked windows.',
  },
  {
    model: 'google/imagen-4-ultra',
    alt: 'Outdoor summer portrait with pink cap, white shirt, and warm sunlight.',
  },
  {
    model: 'qwen/image-2-pro',
    alt: 'Fashion portrait framed by white and silver geometric stairs.',
  },
  {
    model: 'bfl/flux-2-flex',
    alt: 'Warm portrait with a golden retriever and evening bokeh lights.',
  },
  {
    model: 'runway/gen-4-image-turbo',
    alt: 'Rainy roadside portrait with glowing typography and teal streetlights.',
  },
  {
    model: 'gpt/image-2',
    alt: 'Cloud role assignment interface collage with a soft portrait overlay.',
  },
  {
    model: 'google/nano-banana',
    alt: 'Orange AI chat interface with fantasy portrait artwork embedded below.',
  },
  {
    model: 'bytedance/seedream-5-lite',
    alt: 'Black rose emblem over a warm cafe window scene.',
  },
  {
    model: 'qwen/image-plus',
    alt: 'Large black rose emblem with metallic highlights and red flower center.',
  },
  {
    model: 'wan/2.7-image-pro',
    alt: 'Soft anime-style portrait with pastel light and warm clothing tones.',
  },
  {
    model: 'bfl/flux-1.1-pro-ultra',
    alt: 'Night city portrait with colorful bokeh and warm amber highlights.',
  },
  {
    model: 'google/imagen-4-fast',
    alt: 'Urban night portrait with brown scarf and blue city bokeh.',
  },
  {
    model: 'bytedance/seedream-4',
    alt: 'Bright outdoor profile portrait against a clear blue sky.',
  },
  {
    model: 'qwen/image-edit-plus',
    alt: 'Expressive watercolor-style portrait study with soft paper texture.',
  },
  {
    model: 'google/imagen-4',
    alt: 'Rainy forest landscape layered behind a dense analytics chart.',
  },
  {
    model: 'runway/gen-4-image',
    alt: 'Creator group portrait layered with a pale dashboard interface.',
  },
  {
    model: 'bfl/flux-2-klein-9b',
    alt: 'Minimal vertical black editorial frame with hidden portrait fragments.',
  },
  {
    model: 'qwen/image-2',
    alt: 'Abstract white and teal architectural window crop.',
  },
  {
    model: 'google/nano-banana-2',
    alt: 'Neon drink cup layered over a dark productivity interface.',
  },
  {
    model: 'gpt/image-2',
    alt: 'Dark todo board interface with multiple task columns.',
  },
  {
    model: 'wan/2.6-image',
    alt: 'Illustrated red-braided character in a dark cloak over dashboard chrome.',
  },
  {
    model: 'bfl/flux-2-pro',
    alt: 'Dark todo board application with green controls and empty columns.',
  },
  {
    model: 'runway/gen-4-image-turbo',
    alt: 'Urban anime mural scene with steam plume and dashboard overlays.',
  },
  {
    model: 'qwen/image-max',
    alt: 'Bold green figure poster with red accents over a black background.',
  },
  {
    model: 'bytedance/seedream-4.5',
    alt: 'Warm cafe scene with rose emblem and striped sunlight.',
  },
  {
    model: 'z/image-turbo',
    alt: 'Three-dimensional rose badge with glossy black and chrome edges.',
  },
  {
    model: 'bfl/flux-1.1-pro',
    alt: 'Blonde portrait framed by a black rose emblem with warm bokeh.',
  },
  {
    model: 'google/imagen-4-ultra',
    alt: 'Black rose emblem above a Microsoft Azure navigation bar.',
  },
  {
    model: 'gpt/image-2',
    alt: 'Cloud role assignment interface layered with warm portrait artwork.',
  },
  {
    model: 'google/nano-banana-pro',
    alt: 'Minimal cloud console panel with empty role assignment space.',
  },
  {
    model: 'runway/gen-4-image',
    alt: 'Orange AI assistant conversation interface with source chips.',
  },
  {
    model: 'bytedance/seedream-5-lite',
    alt: 'Fantasy portrait embedded inside a burnt orange AI chat interface.',
  },
] as const satisfies Array<Pick<GalleryImage, 'model' | 'alt'>>;

export const sourceGalleryImages: GalleryImage[] = sourceGalleryImageData.map(
  ([imageId, variant, width, height], index) => {
    const number = String(index + 1).padStart(2, '0');
    const metadata = galleryImageMetadata[index]!;

    return {
      id: `gallery-${number}`,
      title: galleryImageTitle,
      collection: 'My artwork',
      year: '2026',
      prompt: galleryImagePrompt,
      model: metadata.model,
      imageId,
      variant,
      width,
      height,
      alt: metadata.alt,
    };
  },
);
