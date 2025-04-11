'use client';
import { use } from 'react';

import { ClassifiedCard } from './classified-card';

import type { ClassifiedsListProps } from '../types';
export const ClassifiedsList = ({ classifiedsPromise, favourites }: ClassifiedsListProps) => {
  const classifieds = use(classifiedsPromise);
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4">
      {classifieds.map((classified) => (
        <ClassifiedCard key={classified.id} classified={classified} favourites={favourites} />
      ))}
    </div>
  );
};
