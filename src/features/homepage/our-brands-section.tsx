import { routes } from '@/config/routes';
import { prisma } from '@/lib/prisma';
import { ClassifiedStatus } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';
import { getBrandsCount } from '../classifieds';
import { getBrands } from '../classifieds';

export const OurBrandsSection = async () => {
  const [brands, count] = await Promise.all([getBrands(), getBrandsCount()]);

  return (
    <div className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-12">
        <div className="px-6 lg:px-8 sm:text-center">
          <h2 className="mt-2 uppercase text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Our Brands
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            We have {count} vehicle in stock, ready for same-day drive away.
          </p>
        </div>
        <div className="grid grid-cols-3 lg:grid-cols-5 gap-4">
          {brands.map(({ id, image, name }) => (
            <Link
              key={id}
              href={`${routes.classifieds}?make=${id}`}
              className="hover:scale-110 transition-all duration-100 ease-in-out relative h-24 flex items-center justify-center"
            >
              <Image src={image} alt={name} className="object-contain aspect-1/1" fill={true} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
