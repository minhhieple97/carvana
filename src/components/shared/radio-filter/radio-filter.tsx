'use client';
import { useRouter } from 'next/navigation';

import { Label, RadioGroup, RadioGroupItem } from '@/components/ui';
import { cn } from '@/lib/utils';

import type { AwaitedPageProps } from '@/config/types';
import type { ClassifiedStatus } from '@prisma/client';

type RadioFilterProps = AwaitedPageProps & {
  items: string[];
};

export const RadioFilter = (props: RadioFilterProps) => {
  const { items, searchParams } = props;
  const router = useRouter();
  const status = (searchParams?.status as string) || 'all';

  const handleStatus = (status: Lowercase<ClassifiedStatus | 'all'>) => {
    const currentUrlParams = new URLSearchParams(window.location.search);
    if (status === 'all') {
      currentUrlParams.delete('status');
    } else {
      currentUrlParams.set('status', status.toUpperCase());
    }
    const url = new URL(window.location.href);
    url.search = currentUrlParams.toString();
    router.push(url.toString());
  };

  return (
    <RadioGroup
      onValueChange={handleStatus}
      defaultValue={status.toLowerCase()}
      className="flex items-center gap-2 border border-border/50 rounded-md p-1 bg-card"
    >
      {items.map((item) => {
        const itemLower = item.toLowerCase();
        const isChecked = status.toLowerCase() === itemLower;
        return (
          <Label
            htmlFor={itemLower}
            className={cn(
              'rounded px-3 py-1 text-center text-sm font-medium transition-colors hover:bg-accent/50 hover:text-foreground cursor-pointer',
              !isChecked && 'text-muted-foreground',
              isChecked && 'bg-primary text-primary-foreground shadow-sm'
            )}
            key={item}
          >
            <RadioGroupItem
              id={itemLower}
              value={itemLower}
              checked={isChecked}
              className="peer sr-only"
            />
            {item}
          </Label>
        );
      })}
    </RadioGroup>
  );
};
