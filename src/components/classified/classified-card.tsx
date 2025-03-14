import { routes } from '@/config/routes';
import Image from 'next/image';
import Link from 'next/link';
import { ClassifiedCardProps } from './types';

export default function ClassifiedCard({ classified }: ClassifiedCardProps) {
  return (
    <div className="group aspect-3/2 relative rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
      <Link href={routes.singleClassified(classified.slug)} className="absolute inset-0">
        <Image
          placeholder="blur"
          src={classified.images[0]?.src}
          blurDataURL={classified.images[0]?.blurhash}
          fill={true}
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          alt={classified.images[0]?.alt}
          quality={25}
        />
      </Link>

      <div className="absolute top-3 right-3 bg-primary/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-full shadow-lg">
        <p className="text-sm lg:text-base xl:text-lg font-bold">{classified.price}</p>
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
        <div className="space-y-1">
          <Link
            className="block text-white text-sm md:text-base lg:text-lg xl:text-xl font-bold 
                       line-clamp-1 transition-colors hover:text-primary/90"
            href={routes.singleClassified(classified.slug)}
          >
            {classified.title}
          </Link>
          {classified.description && (
            <p
              className="text-white/90 text-xs md:text-sm lg:text-base 
                         line-clamp-2 font-medium"
            >
              {classified.description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
