'use client';

import dynamic from 'next/dynamic';

import { Skeleton } from '@/components/ui';
import { cn } from '@/lib/utils';

import { DragAndDrop } from './drag-and-drop';
import { SortableItem } from './sortable-item';
import { useMultiImageUploader } from '../hooks/useMultiImageUploader';

const DragAndDropContext = dynamic(
  () => import('./drag-and-drop-context').then((mod) => mod.DragAndDropContext),
  {
    ssr: false,
    loading: () => (
      <div className="gap-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Skeleton key={i} className="aspect-3/2 rounded-md w-full bg-muted/60 dark:bg-muted/40" />
        ))}
      </div>
    ),
  }
);

type MultiImageUploaderProps = React.InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
};

export const MultiImageUploader = (props: MultiImageUploaderProps) => {
  const { className } = props;
  const { items, progress, isUploading, setIsUploading, handleItemsUpdate, setFiles, remove } =
    useMultiImageUploader();

  return (
    <div
      className={cn(
        className,
        'space-y-4 mt-2 bg-secondary/30 dark:bg-muted/30 p-4 rounded-lg border border-border dark:border-input shadow-sm backdrop-blur-sm'
      )}
    >
      <DragAndDrop
        items={items}
        setFiles={setFiles}
        isUploading={isUploading}
        setIsUploading={setIsUploading}
      />
      <div className="relative overflow-hidden rounded-lg bg-card/60 dark:bg-card/40 shadow-inner p-2">
        <DragAndDropContext
          replace={handleItemsUpdate}
          items={items}
          renderItem={(item) => (
            <SortableItem
              key={item.uuid}
              index={item.id as number}
              item={item}
              progress={progress.find((p) => p.uuid === item.uuid)?.progress as number}
              remove={remove}
            />
          )}
        />
      </div>
    </div>
  );
};
