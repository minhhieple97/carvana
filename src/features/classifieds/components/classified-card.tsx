'use client';
import { AnimatePresence, motion } from 'framer-motion';

import { CardContent } from './card-content';
import { CardImage } from './card-image';
import { FavouriteButton } from './favourite-button';
import { PriceTag } from './price-tag';
import { useClassifiedCard } from '../hooks/useClassifiedCard';

import type { ClassifiedCardProps } from '@/features/classifieds';
export const ClassifiedCard = ({ classified, favourites }: ClassifiedCardProps) => {
  const { getKeyClassifiedInfo, isFavourite, setIsFavourite, isVisible } = useClassifiedCard({
    classified,
    favourites,
  });
  const specifications = getKeyClassifiedInfo(classified);
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="group grid grid-rows-[auto,1fr] h-full rounded-md sm:rounded-lg overflow-hidden shadow-sm sm:shadow-md hover:shadow-xl transition-all duration-300 bg-white text-xs sm:text-sm max-w-md"
        >
          <div className="relative">
            <CardImage image={classified.images[0]} slug={classified.slug} />
            <FavouriteButton
              id={classified.id}
              isFavourite={isFavourite}
              setIsFavourite={setIsFavourite}
            />
            <PriceTag price={classified.price} />
          </div>
          <CardContent classified={classified} specifications={specifications} />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
