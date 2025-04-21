import { format } from 'date-fns';
import Image from 'next/image';

import { Badge, TableCell, TableRow } from '@/components';
import { formatClassifiedStatus, formatColour, formatPrice } from '@/lib/utils';

import { ActionButtons } from './action-buttons';
import { ClassifiedBadgeMap } from '../types';

import type { ClassifiedWithImages } from '../types';

export const ClassifiedsTableRow = (classified: ClassifiedWithImages) => (
  <TableRow className="text-foreground/80 border-border/30 hover:bg-accent/10 transition-colors">
    <TableCell className="font-medium">{classified.id}</TableCell>
    <TableCell className="p-0">
      <Image
        src={classified.images[0].src}
        alt={classified.images[0].alt}
        width={120}
        height={80}
        quality={1}
        className="aspect-3/2 object-cover rounded shadow-sm p-0.5"
      />
    </TableCell>
    <TableCell className="hidden md:table-cell font-medium">{classified.title}</TableCell>
    <TableCell className="hidden md:table-cell">
      {formatPrice({
        price: classified.price,
        currency: classified.currency,
      })}
    </TableCell>
    <TableCell className="hidden md:table-cell uppercase">{classified.vrm}</TableCell>
    <TableCell className="hidden md:table-cell">{formatColour(classified.colour)}</TableCell>
    <TableCell className="hidden md:table-cell">
      <Badge variant={ClassifiedBadgeMap[classified.status]} className="font-medium">
        {formatClassifiedStatus(classified.status)}
      </Badge>
    </TableCell>
    <TableCell className="hidden md:table-cell text-muted-foreground">
      {format(classified.createdAt, 'do MMM yyy HH:mm')}
    </TableCell>
    <TableCell className="font-medium">{classified.views}</TableCell>
    <TableCell>
      <div className="flex gap-x-2">
        <ActionButtons classified={classified} />
      </div>
    </TableCell>
  </TableRow>
);
