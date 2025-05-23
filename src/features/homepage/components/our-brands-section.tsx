import { ClassifiedStatus } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';

import { routes } from '@/config/routes';
import { getFeaturedBrands, getLiveClassifiedsCount } from '@/features/classifieds';

export const OurBrandsSection = async () => {
  const [brands, count] = await Promise.all([
    getFeaturedBrands(),
    getLiveClassifiedsCount({ status: ClassifiedStatus.LIVE }),
  ]);

  return (
    <div className="py-16 sm:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-12">
        <div className="px-6 lg:px-8 sm:text-center">
          <h2 className="mt-2 uppercase text-2xl font-bold tracking-tight text-foreground sm:text-4xl">
            Our Brands
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            We have {count} vehicle in stock, ready for same-day drive away.
          </p>
        </div>
        <div className="grid grid-cols-3 lg:grid-cols-5 gap-4">
          {brands.map(({ id, image, name }) => (
            <Link
              key={id}
              href={`${routes.classifieds}?make=${id}`}
              className="hover:scale-110 transition-all duration-100 ease-in-out relative h-24 flex items-center justify-center bg-card/50 dark:bg-card/30 rounded-lg p-2 shadow-sm"
            >
              <Image src={image} alt={name} className="object-contain aspect-1/1" fill />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
