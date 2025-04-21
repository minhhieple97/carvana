'use client';

import { cn } from '@/lib/utils';

import { useFormHeader } from '../hooks';

export const FormHeader = () => {
  const { params, steps } = useFormHeader();

  return (
    <div className="flex justify-between bg-primary dark:bg-primary/90 p-4 shadow-lg rounded-t-lg">
      <div className="flex flex-col justify-between flex-1">
        <h1 className="text-3xl font-bold text-primary-foreground">
          {steps.find(({ id }) => params.get('step') === id)?.title}
        </h1>
      </div>
      <div className="flex items-center justify-end gap-2 text-sm font-medium text-primary-foreground flex-1">
        {steps.map((step) => (
          <div
            className={cn(
              'w-8 h-8 rounded-full flex items-center justify-center transition-colors',
              params.get('step') === step.id
                ? 'bg-white dark:bg-background text-primary'
                : 'bg-primary/80 dark:bg-primary-foreground/20 text-primary-foreground'
            )}
            key={step.id}
          >
            {step.id}
          </div>
        ))}
      </div>
    </div>
  );
};
