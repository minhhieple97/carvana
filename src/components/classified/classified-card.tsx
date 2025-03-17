'use client';
import { useClassifiedCard } from './hooks/useClassifiedCard';
import { AnimatePresence, motion } from 'framer-motion';
import { ClassifiedCardProps } from './types';
import { CardImage } from './components/card-image';
import { PriceTag } from './components/price-tag';
import { CardContent } from './components/card-content';
import { FavouriteButton } from './components/favourite-button';
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
          className="group grid grid-rows-[auto,1fr] h-full rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 bg-white"
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
