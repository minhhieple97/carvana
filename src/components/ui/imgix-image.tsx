'use client';

import Image, { type ImageProps } from 'next/image';
import { useState } from 'react';

import { imgixLoader } from '@/lib/imgix-loader';

type ImgixImageProps = Omit<ImageProps, 'priority' | 'loading'>;

export const ImgixImage = ({ src, alt, ...props }: ImgixImageProps) => {
  const [error, setError] = useState(false);

  if (error) {
    return <Image fetchPriority="high" src={src} alt={alt} {...props} />;
  }

  return (
    <Image
      fetchPriority="high"
      loader={(imgProps) => imgixLoader(imgProps)}
      onError={() => setError(true)}
      src={src}
      alt={alt}
      {...props}
    />
  );
};
