'use client';
import { env } from '@/env';

import { cn } from '@/lib/utils';
import dynamic from 'next/dynamic';
import { useCallback, useState } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { createPngDataUri } from 'unlazy/thumbhash';
import { v4 as uuidv4 } from 'uuid';
import { Skeleton } from '@/components/ui';
import { DragAndDrop } from './drag-and-drop';
import { SortableItem } from './sortable-item';
import { UpdateClassifiedType } from '@/schemas';
import { ClassifiedImages } from '../types';
import { generateThumbHashFromFile } from '@/lib/thumbhash-client';
import { Uploader } from '@/lib/uploader';
import { ProgressArgs } from '@/config';

const DragAndDropContext = dynamic(
  () => import('./drag-and-drop-context').then((mod) => mod.DragAndDropContext),
  {
    ssr: false,
    loading: () => (
      <div className="gap-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Skeleton
            key={i}
            className="aspect-3/2 rounded-md w-full bg-slate-800/50 dark:bg-slate-700/40"
          />
        ))}
      </div>
    ),
  }
);

type MultiImageUploaderProps = React.InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
};

type ImageProgress = {
  uuid: string;
  progress: number;
};

export const MultiImageUploader = (props: MultiImageUploaderProps) => {
  const { className } = props;

  const form = useFormContext<UpdateClassifiedType>();
  const { fields, replace } = useFieldArray({
    control: form.control,
    name: 'images',
    keyName: 'uuid',
  });

  const [items, setItems] = useState<ClassifiedImages>(fields);
  const [progress, setProgress] = useState<ImageProgress[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const handleItemProgress = useCallback((updates: ImageProgress) => {
    setProgress((prev) => {
      const index = prev.findIndex((item) => item.uuid === updates.uuid);
      if (index === -1) return [...prev, updates];
      const newProgress = [...prev];
      newProgress[index] = { ...newProgress[index], ...updates };
      return newProgress;
    });
  }, []);

  const handleItemsUpdate = useCallback(
    (newItems: ClassifiedImages) => {
      replace(newItems);
      setItems(newItems);
    },
    [replace]
  );

  const setFiles = useCallback(
    async (validFiles: File[]) => {
      const files = Object.values(validFiles);
      setIsUploading(files.length > 0);

      let id = items.length + 1;
      const newImageData: ClassifiedImages = [];

      for (const file of files) {
        const uuid = uuidv4();
        const hash = await generateThumbHashFromFile(file);
        const base64 = createPngDataUri(hash);

        const data = {
          id,
          uuid,
          percentage: 0,
          alt: file.name,
          key: '',
          src: '',
          base64,
          done: false,
        };

        newImageData.push(data);
        id++;

        const options = { file, uuid };

        const uploader = new Uploader(options);

        uploader
          .onProgress((progress: ProgressArgs) => {
            if (progress.percentage !== data.percentage) {
              data.src = `${env.NEXT_PUBLIC_S3_URL}/${progress.key}`;
              data.key = progress.key || '';
              handleItemProgress({
                uuid,
                progress: progress.percentage,
              });

              const clone = items.concat(newImageData);
              setItems(clone);
            }
          })
          .onError((error: Error) => {
            setIsUploading(false);
            console.error(error);
          })
          .onComplete(() => {
            data.done = true;
            const clone = items.concat(newImageData).map((item) => ({ ...item, percentage: 100 }));

            setItems(clone);
            replace(clone.map((item) => ({ src: item.src, alt: item.alt })));
            setIsUploading(false);
          });

        uploader.start();
      }
    },
    [items, handleItemProgress, replace]
  );

  const remove = (i: number) => {
    setItems((prev) => prev.filter((item) => item.id !== i));
    replace(items.filter((item) => item.id !== i));
  };

  return (
    <div
      className={cn(
        className,
        'space-y-4 mt-2 bg-slate-900/20 dark:bg-slate-800/20 p-4 rounded-xl border border-slate-200/10 dark:border-slate-700/50 backdrop-blur-sm'
      )}
    >
      <DragAndDrop
        items={items}
        setFiles={setFiles}
        isUploading={isUploading}
        setIsUploading={setIsUploading}
      />
      <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-slate-900/10 to-slate-800/10 dark:from-slate-900/20 dark:to-slate-800/30 shadow-inner p-1">
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
