import { ClassifiedWithImages } from '../types';
import { Cog, Fuel, GaugeCircle, Paintbrush2 } from 'lucide-react';
import {
  formatColour,
  formatFuelType,
  formatNumber,
  formatOdometerUnit,
  formatTransmission,
} from '@/lib/utils';

export const useClassifiedCard = () => {
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
  };
};
