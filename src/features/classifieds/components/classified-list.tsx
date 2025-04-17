'use client';
import { use } from 'react';
import { Car, SearchX } from 'lucide-react';

import { ClassifiedCard } from './classified-card';

import type { ClassifiedsListProps } from '../types';

export const ClassifiedsList = ({ classifiedsPromise, favourites }: ClassifiedsListProps) => {
  const classifieds = use(classifiedsPromise);

  if (classifieds.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
        <div className="bg-gray-50 rounded-full p-6 mb-4">
          <SearchX className="h-12 w-12 text-gray-400" />
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">No listings found</h3>
        <p className="text-gray-500 max-w-md">
          We couldn't find any vehicles matching your criteria. Try adjusting your filters or check
          back later.
        </p>
        <div className="mt-8 flex items-center justify-center text-sm text-gray-500">
          <Car className="h-4 w-4 mr-2" />
          <span>New vehicles are added regularly</span>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4">
      {classifieds.map((classified) => (
        <ClassifiedCard key={classified.id} classified={classified} favourites={favourites} />
      ))}
    </div>
  );
};
