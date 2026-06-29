'use client';

import { LoaderCircle } from 'lucide-react';
import type {
  DragEventHandler,
  ImgHTMLAttributes,
  MouseEventHandler,
} from 'react';
import { useEffect, useRef, useState } from 'react';

type ProtectedImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  onLoadedChange?: (isLoaded: boolean) => void;
  showLoader?: boolean;
};

export function ProtectedImage({
  className,
  draggable = false,
  onLoadedChange,
  showLoader = false,
  onContextMenu,
  onDragStart,
  onError,
  onLoad,
  src,
  ...props
}: ProtectedImageProps) {
  const imageRef = useRef<HTMLImageElement>(null);
  const onLoadedChangeRef = useRef(onLoadedChange);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    onLoadedChangeRef.current = onLoadedChange;
  }, [onLoadedChange]);

  useEffect(() => {
    const image = imageRef.current;
    const nextIsLoaded = Boolean(image?.complete && image.naturalWidth > 0);

    setIsLoaded(nextIsLoaded);
    onLoadedChangeRef.current?.(nextIsLoaded);
  }, [src]);

  const handleContextMenu: MouseEventHandler<HTMLImageElement> = (event) => {
    event.preventDefault();
    onContextMenu?.(event);
  };

  const handleDragStart: DragEventHandler<HTMLImageElement> = (event) => {
    event.preventDefault();
    onDragStart?.(event);
  };

  const image = (
    <img
      {...props}
      ref={imageRef}
      src={src}
      className={
        className
          ? `select-none ${className}${showLoader && !isLoaded ? ' opacity-0' : ''}`
          : `select-none${showLoader && !isLoaded ? ' opacity-0' : ''}`
      }
      draggable={draggable}
      onContextMenu={handleContextMenu}
      onDragStart={handleDragStart}
      onError={onError}
      onLoad={(event) => {
        setIsLoaded(true);
        onLoadedChange?.(true);
        onLoad?.(event);
      }}
    />
  );

  if (!showLoader) {
    return image;
  }

  return (
    <span className="relative block h-full w-full">
      {isLoaded ? null : (
        <span className="absolute inset-0 z-20 flex items-center justify-center bg-[#f8f4ff]/86 text-[#6f7bae] backdrop-blur-sm">
          <LoaderCircle className="size-6 animate-spin" aria-hidden="true" />
          <span className="sr-only">Loading image</span>
        </span>
      )}
      {image}
    </span>
  );
}
