'use client';

import { EyeIcon, Loader2, PencilIcon, Trash } from 'lucide-react';
import Link from 'next/link';
import { Tooltip } from 'react-tooltip';
import { routes } from '../../../config/routes';
import { Button } from '@/components/ui';
import { CustomerWithClassified } from '../types';
import { useDeleteCustomer } from '../hooks';

type ActionButtonsProps = {
  customer: CustomerWithClassified;
};

export const ActionButtons = ({ customer }: ActionButtonsProps) => {
  const { deleteCustomer, isDeleting } = useDeleteCustomer();

  return (
    <>
      <Button
        variant="destructive"
        className="p-2 h-fit"
        data-tooltip-id="trash-tooltip"
        data-tooltip-content="Delete"
        onClick={() => deleteCustomer(customer.id)}
      >
        <Tooltip id="trash-tooltip" />
        {isDeleting ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Trash className="h-4 w-4 outline-none" />
        )}
      </Button>
      <Button
        data-tooltip-id="edit-tooltip"
        data-tooltip-content="Edit"
        className="p-2 h-fit"
        asChild
      >
        <Link href={routes.admin.editCustomer(customer.id)}>
          <Tooltip id="edit-tooltip" />
          <PencilIcon className="h-4 w-4 outline-none" />
        </Link>
      </Button>
    </>
  );
};
