import { getFavourites } from '@/features/classifieds';
import { getSourceId } from '@/lib/source-id';

export const FavoritesCounter = async () => {
  const sourceId = await getSourceId();
  const favourites = await getFavourites(sourceId);

  return (
    <div
      className="absolute -top-1.5 -right-1.5 flex items-center justify-center w-5 h-5 
                  text-white bg-pink-500 rounded-full 
                  transition-all duration-200 ease-in-out
                  group-hover:bg-primary"
    >
      <span className="text-xs">{favourites ? favourites.ids.length : 0}</span>
    </div>
  );
};

export const FavoritesCounterFallback = () => (
  <div
    className="absolute -top-1.5 -right-1.5 flex items-center justify-center w-5 h-5 
                  text-white bg-pink-500 rounded-full"
  >
    <span className="text-xs">...</span>
  </div>
);
