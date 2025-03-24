'use client';
import { AnimatePresence, motion } from 'framer-motion';

import { CardContent } from './components/card-content';
import { CardImage } from './components/card-image';
import { FavouriteButton } from './components/favourite-button';
import { PriceTag } from './components/price-tag';
import { useClassifiedCard } from './hooks/useClassifiedCard';

import type { ClassifiedCardProps } from './types';
export default function ClassifiedCard({ classified, favourites }: ClassifiedCardProps) {
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
          className="group grid grid-rows-[auto,1fr] h-full rounded-lg overflow-hidden shadow-sm sm:shadow-md hover:shadow-lg sm:hover:shadow-xl transition-all duration-300 bg-white"
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
}
