import { useClassifiedCard } from './hooks/useClassifiedCard';
import { ClassifiedCardProps } from './types';
import { CardImage } from './components/card-image';
import { PriceTag } from './components/price-tag';
import { CardContent } from './components/card-content';

export default function ClassifiedCard({ classified }: ClassifiedCardProps) {
  const { getKeyClassifiedInfo } = useClassifiedCard();
  const specifications = getKeyClassifiedInfo(classified);

  return (
    <div className="group grid grid-rows-[auto,1fr] h-full rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 bg-white">
      <div className="relative">
        <CardImage image={classified.images[0]} slug={classified.slug} />
        <PriceTag price={classified.price} />
      </div>
      <CardContent classified={classified} specifications={specifications} />
    </div>
  );
}
