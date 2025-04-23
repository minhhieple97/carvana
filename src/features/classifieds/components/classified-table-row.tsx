import { format } from 'date-fns';
import Image from 'next/image';
import { Badge } from '@/components/ui';
import { formatClassifiedStatus, formatColour, formatPrice } from '@/lib/utils';
import { ActionButtons } from './action-buttons';
import { ClassifiedBadgeMap, type ClassifiedWithImages } from '../types';
import { TableRowBase, ResponsiveTableCell } from '@/components/shared/sortable-table';

export const ClassifiedsTableRow = (classified: ClassifiedWithImages) => (
  <TableRowBase>
    <ResponsiveTableCell className="font-medium">{classified.id}</ResponsiveTableCell>

    <ResponsiveTableCell isImage>
      <Image
        src={classified.images[0].src}
        alt={classified.images[0].alt}
        width={120}
        height={80}
        quality={1}
        className="aspect-3/2 object-cover rounded shadow-sm p-0.5"
      />
    </ResponsiveTableCell>

    <ResponsiveTableCell hideOnMobile className="font-medium">
      {classified.title}
    </ResponsiveTableCell>

    <ResponsiveTableCell hideOnMobile>
      {formatPrice({
        price: classified.price,
        currency: classified.currency,
      })}
    </ResponsiveTableCell>

    <ResponsiveTableCell hideOnMobile className="uppercase">
      {classified.vrm}
    </ResponsiveTableCell>

    <ResponsiveTableCell hideOnMobile>{formatColour(classified.colour)}</ResponsiveTableCell>

    <ResponsiveTableCell hideOnMobile>
      <Badge variant={ClassifiedBadgeMap[classified.status]} className="font-medium">
        {formatClassifiedStatus(classified.status)}
      </Badge>
    </ResponsiveTableCell>

    <ResponsiveTableCell hideOnMobile className="text-muted-foreground">
      {format(classified.createdAt, 'do MMM yyy HH:mm')}
    </ResponsiveTableCell>

    <ResponsiveTableCell className="font-medium">{classified.views}</ResponsiveTableCell>

    <ResponsiveTableCell>
      <div className="flex gap-x-2">
        <ActionButtons classified={classified} />
      </div>
    </ResponsiveTableCell>
  </TableRowBase>
);
