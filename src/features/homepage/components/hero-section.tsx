import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { imageSources } from '@/config/constants';
import { routes } from '@/config/routes';
import { getClassifiedsMinMaxValues, getClassifiedsCount } from '@/features/classifieds';
import { imgixLoader } from '@/lib/imgix-loader';

import { HomepageTaxonomyFilters } from './homepage-filters';
import { SearchButton } from './search-button';

import type { AwaitedPageProps } from '@/config/types';

export const HeroSection = async (props: AwaitedPageProps) => {
  const { searchParams } = props;
  const totalFiltersApplied = Object.keys(searchParams || {}).length;
  const isFilterApplied = totalFiltersApplied > 0;

  const [classifiedsCount, minMaxResult] = await Promise.all([
    getClassifiedsCount(searchParams),
    getClassifiedsMinMaxValues(),
  ]);

  return (
    <section
      className="relative flex items-center justify-center min-h-[calc(100vh-4rem)] bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${imgixLoader({
          src: imageSources.carLinup,
          width: 1920,
          quality: 85,
          auto: 'format,compress',
        })})`,
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/70" />
      <div className="container mx-auto px-4 sm:px-6 py-12 md:py-20 z-10 relative">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="w-full lg:w-1/2 space-y-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white leading-tight tracking-tight">
              <span className="text-primary-400">Unbeatable Deals</span> on New & Used Cars
            </h1>
            <h2 className="text-xl sm:text-2xl md:text-3xl text-white/90 font-light">
              Discover your dream car today
            </h2>
            <div className="hidden md:block">
              <Button
                size="lg"
                className="mt-4 text-lg bg-primary-500 hover:bg-primary-600 transition-all duration-300 shadow-lg hover:shadow-xl"
                asChild
              >
                <Link href={routes.classifieds}>Browse All Cars</Link>
              </Button>
            </div>
          </div>

          <div className="w-full lg:w-1/2 max-w-md mx-auto lg:mx-0 lg:ml-auto">
            <div className="bg-white/95 backdrop-blur-sm p-6 sm:p-8 rounded-xl shadow-2xl border border-gray-100 transition-all duration-300 hover:shadow-primary-500/10">
              <div className="space-y-6">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">
                  Find Your Perfect Match
                </h3>
                <div className="space-y-4 flex flex-col w-full">
                  <HomepageTaxonomyFilters
                    minMaxValues={minMaxResult}
                    searchParams={searchParams}
                  />
                </div>
                <SearchButton count={classifiedsCount} />
                {isFilterApplied && (
                  <Button
                    asChild
                    variant="outline"
                    className="w-full hover:bg-slate-100 transition-colors"
                  >
                    <Link href={routes.home}>
                      Clear Filters{' '}
                      <span className="ml-1 px-1.5 py-0.5 bg-slate-200 rounded-full text-xs">
                        {totalFiltersApplied}
                      </span>
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
