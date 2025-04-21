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
            <div className="hidden md:block mt-8">
              <Button
                asChild
                className="group relative overflow-hidden rounded-full bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 px-10 py-7 text-lg font-bold text-white shadow-[0_10px_20px_-10px_rgba(59,130,246,0.7)] transition-all duration-500 hover:shadow-[0_20px_30px_-15px_rgba(59,130,246,0.8)] hover:translate-y-[-3px] active:translate-y-[0px]"
              >
                <Link href={routes.classifieds} className="flex items-center gap-3">
                  <span className="relative z-10">Browse All Cars</span>
                  <div className="relative z-10 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm transition-transform duration-500 group-hover:rotate-45">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 transition-all duration-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </div>
                  <span className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100" />
                  <span className="absolute top-0 left-0 w-full h-full -z-5 bg-gradient-to-br from-primary-400 to-primary-600 blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 rounded-full" />
                </Link>
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
