import {
  CarFrontIcon,
  CarIcon,
  CheckIcon,
  Fingerprint,
  FuelIcon,
  GaugeIcon,
  PowerIcon,
  UsersIcon,
  XIcon,
} from 'lucide-react';
import Image from 'next/image';

import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import {
  formatBodyType,
  formatColour,
  formatFuelType,
  formatNumber,
  formatOdometerUnit,
  formatTransmission,
  formatUlezCompliance,
} from '@/lib/utils';

import type { StreamableSkeletonProps } from '../types';

const DetailItem = ({
  icon: Icon,
  label,
  value,
  isLoading,
  formatter,
  unit,
  isBoolean = false,
}: {
  icon: React.ElementType;
  label: string;
  value?: string | number | boolean | null | undefined;
  isLoading: boolean;
  formatter?: (val: any) => string;
  unit?: string;
  isBoolean?: boolean;
}) => {
  const displayValue =
    formatter && value !== undefined && value !== null ? formatter(value) : value;
  const hasValue = value !== undefined && value !== null && value !== '';

  return (
    <div className="flex items-center gap-3 rounded-lg border h-auto bg-card p-3 shadow-sm">
      <div className="flex h-8 w-8 items-center justify-center rounded-md bg-muted text-muted-foreground">
        <Icon className="h-5 w-5" />
      </div>
      <div className="flex flex-col">
        <span className="text-xs text-muted-foreground">{label}</span>
        {isLoading && !hasValue ? (
          <Skeleton className="mt-1 h-4 w-16" />
        ) : hasValue ? (
          <span className="text-sm font-medium text-card-foreground">
            {isBoolean ? (
              value ? (
                <CheckIcon className="h-5 w-5 text-green-500" />
              ) : (
                <XIcon className="h-5 w-5 text-red-500" />
              )
            ) : (
              `${displayValue ?? ''}${unit ? ` ${unit}` : ''}`
            )}
          </span>
        ) : (
          <span className="text-sm font-medium text-muted-foreground">N/A</span>
        )}
      </div>
    </div>
  );
};

export const StreamableSkeleton = (props: StreamableSkeletonProps) => {
  const {
    image,
    title,
    make,
    model,
    modelVariant,
    year,
    odoReading,
    odoUnit,
    fuelType,
    transmission,
    description,
    bodyType,
    seats,
    ulezCompliance,
    doors,
    colour,
    vrm,
    done,
  } = props;

  const isLoading = !done;

  const fullTitle = [make?.name, model, modelVariant, year].filter(Boolean).join(' ');

  return (
    <div className="flex flex-col gap-6 overflow-y-auto p-1 md:flex-row md:gap-8">
      <div className="w-full shrink-0 md:w-1/3 lg:w-2/5">
        {image ? (
          <div className="relative aspect-video w-full overflow-hidden rounded-lg border">
            <Image
              src={image}
              alt={fullTitle || title || 'Vehicle Image'}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 33vw, 40vw"
              className="object-cover"
              priority
            />
          </div>
        ) : (
          <Skeleton className="aspect-video w-full rounded-lg" />
        )}
      </div>

      <div className="flex w-full flex-col gap-4 md:w-2/3 lg:w-3/5">
        <div className="flex items-start gap-4">
          {make?.image ? (
            <Image
              src={make.image}
              alt={make.name || 'Manufacturer'}
              width={48}
              height={48}
              className="h-12 w-12 object-contain"
            />
          ) : isLoading && !make ? (
            <Skeleton className="h-12 w-12 shrink-0 rounded-md" />
          ) : null}
          <div className="flex-grow">
            {fullTitle || title ? (
              <h2 className="text-xl font-semibold leading-tight text-foreground lg:text-2xl">
                {fullTitle || title}
              </h2>
            ) : isLoading ? (
              <>
                <Skeleton className="mb-2 h-6 w-3/4" />
                <Skeleton className="h-5 w-1/2" />
              </>
            ) : (
              <h2 className="text-xl font-semibold text-muted-foreground lg:text-2xl">
                Details Unavailable
              </h2>
            )}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {odoReading && odoUnit ? (
            <Badge variant="secondary">
              {formatNumber(odoReading)} {formatOdometerUnit(odoUnit)}
            </Badge>
          ) : isLoading && odoReading === undefined ? (
            <Skeleton className="h-6 w-20 rounded-full" />
          ) : null}
          {fuelType ? (
            <Badge variant="secondary">{formatFuelType(fuelType)}</Badge>
          ) : isLoading && fuelType === undefined ? (
            <Skeleton className="h-6 w-16 rounded-full" />
          ) : null}
          {colour ? (
            <Badge variant="secondary">{formatColour(colour)}</Badge>
          ) : isLoading && colour === undefined ? (
            <Skeleton className="h-6 w-16 rounded-full" />
          ) : null}
          {transmission ? (
            <Badge variant="secondary">{formatTransmission(transmission)}</Badge>
          ) : isLoading && transmission === undefined ? (
            <Skeleton className="h-6 w-20 rounded-full" />
          ) : null}
        </div>

        {description ? (
          <p className="text-sm text-muted-foreground">{description}</p>
        ) : isLoading && description === undefined ? (
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        ) : null}

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
          <DetailItem
            icon={Fingerprint}
            label="Registration (VRM)"
            value={vrm}
            isLoading={isLoading}
          />
          <DetailItem
            icon={CheckIcon}
            label="ULEZ Compliance"
            value={ulezCompliance === 'EXEMPT'}
            isLoading={isLoading}
            isBoolean={true}
            formatter={formatUlezCompliance}
          />
          <DetailItem
            icon={CarIcon}
            label="Body Type"
            value={bodyType}
            isLoading={isLoading}
            formatter={formatBodyType}
          />
          <DetailItem
            icon={FuelIcon}
            label="Fuel Type"
            value={fuelType}
            isLoading={isLoading}
            formatter={formatFuelType}
          />
          <DetailItem
            icon={PowerIcon}
            label="Transmission"
            value={transmission}
            isLoading={isLoading}
            formatter={formatTransmission}
          />
          <DetailItem
            icon={GaugeIcon}
            label="Odometer"
            value={odoReading}
            unit={odoUnit ? formatOdometerUnit(odoUnit) : ''}
            isLoading={isLoading}
            formatter={formatNumber}
          />
          <DetailItem icon={UsersIcon} label="Seats" value={seats} isLoading={isLoading} />
          <DetailItem icon={CarFrontIcon} label="Doors" value={doors} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
};
