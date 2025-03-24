import ClassifiedCard from '../../features/classifieds/classified-card';

import type { ClassifiedsListProps } from './types';

export const ClassifiedsList = ({ classifieds, favourites }: ClassifiedsListProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {classifieds.map((classified) => (
        <ClassifiedCard key={classified.id} classified={classified} favourites={favourites} />
      ))}
    </div>
  );
};
