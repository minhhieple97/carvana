import Link from 'next/link';

import { routes } from '@/config/routes';

import type { CardImageProps } from '../types';
import { ImgixImage } from '@/components/ui/imgix-image';

export const CardImage = ({ image, slug }: CardImageProps) => (
  <div className="relative aspect-4/3">
    <Link href={routes.singleClassified(slug)} className="absolute inset-0">
      <ImgixImage
        placeholder="blur"
        src={image?.src ?? ''}
        blurDataURL={image?.blurhash ?? ''}
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-105"
        alt={image?.alt ?? ''}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        quality={75}
      />
    </Link>
  </div>
);
