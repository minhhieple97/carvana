'use client';
import { HeartIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useFavourite } from '@/features/favourites/hooks';

type FavouriteButtonProps = {
  initialIsFavourite: boolean;
  id: number;
};

export const FavouriteButton = ({ initialIsFavourite, id }: FavouriteButtonProps) => {
  const { isFavourite, isLoading, toggleFavourite } = useFavourite({
    id,
    initialIsFavourite,
  });

  return (
    <Button
      onClick={toggleFavourite}
      variant="ghost"
      size="icon"
      disabled={isLoading}
      className={cn(
        'absolute top-2.5 left-3.5 rounded-full z-10 group !h-6 !w-6 lg:!h-8 lg:!w-8 xl:!h-10 xl:!w-10',
        isFavourite
          ? 'bg-background/90 backdrop-blur-sm dark:bg-background/70'
          : '!bg-muted/30 backdrop-blur-sm'
      )}
    >
      <HeartIcon
        className={cn(
          'duration-200 transition-colors ease-in-out w-3.5 h-3.5 lg:w-4 lg:h-4 xl:w-6 xl:h-6',
          isFavourite
            ? 'text-pink-500 fill-pink-500'
            : 'text-white group-hover:text-pink-500 group-hover:fill-pink-500 drop-shadow-md'
        )}
      />
    </Button>
  );
};
