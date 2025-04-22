'use client';

import { useAction } from 'next-safe-action/hooks';

import { toggleFavouriteAction } from '../actions';

type UseFavouriteProps = {
  id: number;
  initialIsFavourite: boolean;
};

export const useFavourite = ({ id, initialIsFavourite }: UseFavouriteProps) => {
  const { execute, result, isPending } = useAction(toggleFavouriteAction);

  const handleToggleFavourite = () => execute({ id });

  const isFavourite = result.data ? result.data.ids.includes(id) : initialIsFavourite;

  return {
    isFavourite,
    isLoading: isPending,
    toggleFavourite: handleToggleFavourite,
  };
};
