import { TableCell, TableRow } from '@/components/ui';

type TableRowBaseProps = {
  children: React.ReactNode;
  className?: string;
};

export const TableRowBase = ({ children, className = '' }: TableRowBaseProps) => (
  <TableRow
    className={`text-foreground/80 border-border/30 hover:bg-accent/10 transition-colors ${className}`}
  >
    {children}
  </TableRow>
);

export const ResponsiveTableCell = ({
  children,
  className = '',
  hideOnMobile = false,
  isImage = false,
}: {
  children: React.ReactNode;
  className?: string;
  hideOnMobile?: boolean;
  isImage?: boolean;
}) => (
  <TableCell
    className={`
      ${hideOnMobile ? 'hidden md:table-cell' : ''} 
      ${isImage ? 'p-0' : ''} 
      ${className}
    `}
  >
    {children}
  </TableCell>
);
