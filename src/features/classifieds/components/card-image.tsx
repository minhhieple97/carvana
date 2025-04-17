import Link from 'next/link';
import Image from 'next/image';

import { ImgixImage } from '@/components/ui/imgix-image';
import { routes } from '@/config/routes';

import type { CardImageProps } from '../types';

export const CardImage = ({ image, slug }: CardImageProps) => {
  if (!image || !image.src) {
    return (
      <div className="relative aspect-4/3 h-48 w-full">
        <Link href={routes.singleClassified(slug)} className="absolute inset-0">
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span>No image</span>
          </div>
        </Link>
      </div>
    );
  }

  return (
    <div className="relative aspect-4/3 h-48 w-full">
      <Link href={routes.singleClassified(slug)} className="absolute inset-0">
        <Image
          src={image.src}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          alt={image.alt ?? ''}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          quality={75}
        />
      </Link>
    </div>
  );
};
