import { ClassifiedWithImages } from '@/features/classifieds/types';
import { Cog, Fuel, GaugeCircle, Paintbrush2 } from 'lucide-react';
import {
  formatColour,
  formatFuelType,
  formatNumber,
  formatOdometerUnit,
  formatTransmission,
} from '@/lib/utils';
import { Favourites } from '@/config/types';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { routes } from '@/config/routes';

export const useClassifiedCard = ({
  classified,
  favourites,
}: {
  classified: ClassifiedWithImages;
  favourites: Favourites;
}) => {
  const [isFavourite, setIsFavourite] = useState(favourites.ids.includes(classified.id));
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  useEffect(() => {
    if (!isFavourite && pathname === routes.favourites) {
      setIsVisible(false);
    }
  }, [isFavourite, pathname]);
  const getKeyClassifiedInfo = (classified: ClassifiedWithImages) => {
    return [
      {
        id: 'odoReading',
        icon: <GaugeCircle className="w-4 h-4" />,
        value: `${formatNumber(classified.odoReading)} ${formatOdometerUnit(classified.odoUnit)}`,
      },
      {
        id: 'transmission',
        icon: <Cog className="w-4 h-4" />,
        value: classified?.transmission ? formatTransmission(classified?.transmission) : null,
      },
      {
        id: 'fuelType',
        icon: <Fuel className="w-4 h-4" />,
        value: classified?.fuelType ? formatFuelType(classified.fuelType) : null,
      },
      {
        id: 'colour',
        icon: <Paintbrush2 className="w-4 h-4" />,
        value: classified?.colour ? formatColour(classified.colour) : null,
      },
    ];
  };
  return {
    getKeyClassifiedInfo,
    isFavourite,
    setIsFavourite,
    isVisible,
  };
};
