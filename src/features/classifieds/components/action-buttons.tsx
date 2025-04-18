'use client';

import { Button } from '@/components/ui';
import { EyeIcon, PencilIcon, Trash } from 'lucide-react';
import { Loader2 } from 'lucide-react';
import { deleteClassifiedAction } from '@/features/admin/actions/classified';
import { useTransition } from 'react';
import { routes } from '@/config';
import Link from 'next/link';
import { ClassifiedWithImages } from '../types';
import { Tooltip } from 'react-tooltip';
export const ActionButtons = ({ classified }: { classified: ClassifiedWithImages }) => {
  const [isPending, startTransition] = useTransition();
  const deleteClassified = (id: number) => {
    startTransition(async () => {
      const result = await deleteClassifiedAction({ id });
      // if (result.success) {
      //   toast({
      //     title: 'Classified Deleted',
      //     description: result.message,
      //   });
      // } else {
      //   toast({
      //     title: 'Error Deleting Classified',
      //     description: result.message,
      //     variant: 'destructive',
      //   });
      // }
    });
  };

  return (
    <>
      <Button
        variant="destructive"
        className="p-2 h-fit"
        data-tooltip-id="trash-tooltip"
        data-tooltip-content="Delete"
        onClick={() => deleteClassified(classified.id)}
      >
        <Tooltip id="trash-tooltip" />
        {isPending ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Trash className="h-4 w-4 outline-none" />
        )}
      </Button>
      <Button
        data-tooltip-id="view-tooltip"
        data-tooltip-content="View"
        className="p-2 h-fit"
        asChild
      >
        <Link href={routes.singleClassified(classified.slug)}>
          <Tooltip id="view-tooltip" />
          <EyeIcon className="h-4 w-4 outline-none" />
        </Link>
      </Button>
      <Button
        data-tooltip-id="edit-tooltip"
        data-tooltip-content="Edit"
        className="p-2 h-fit"
        asChild
      >
        <Link href={routes.admin.editClassified(classified.id)}>
          <Tooltip id="edit-tooltip" />
          <PencilIcon className="h-4 w-4 outline-none" />
        </Link>
      </Button>
    </>
  );
};
