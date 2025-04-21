'use client';

import {
  ArrowRightIcon,
  CircleCheckIcon,
  CreditCardIcon,
  Loader2,
  LockIcon,
  StarIcon,
} from 'lucide-react';
import Image from 'next/image';

import { Button, HTMLParser } from '@/components';
import { type MultiStepFormComponentProps } from '@/config/types';

import { useWelcome } from '../hooks';

export const Welcome = (props: MultiStepFormComponentProps) => {
  const { isPending, nextStep } = useWelcome();

  return (
    <div className="mx-auto bg-card dark:bg-card text-card-foreground dark:text-card-foreground rounded-b-lg shadow-lg border border-border dark:border-input/50">
      <div className="p-6">
        <div className="flex gap-x-12 justify-between">
          <div className="flex-1">
            <div className="flex items-start mb-4">
              <CircleCheckIcon className="text-green-500 dark:text-green-400 w-6 h-6 mr-2" />
              <p className="text-foreground/80 dark:text-foreground/70">
                Reserve in minutes with 2 simple steps
              </p>
            </div>
            <div className="flex items-start mb-4">
              <CircleCheckIcon className="text-green-500 dark:text-green-400 w-6 h-6 mr-2" />
              <p className="text-foreground/80 dark:text-foreground/70">
                Arrange a handover date for your new vehicle
              </p>
            </div>
          </div>
          <div className="flex flex-1 space-x-2">
            <div className="relative w-16 h-16">
              <Image
                src={props.classified.make.image}
                alt={props.classified.make.name}
                className="aspect-1/1 object-contain"
                height={100}
                width={100}
              />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold line-clamp-1 text-foreground dark:text-foreground">
                {props.classified.title}
              </h2>
              <div className="text-xs line-clamp-2 text-muted-foreground dark:text-muted-foreground/90">
                <HTMLParser html={props.classified.description ?? ''} />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-around items-center bg-muted/40 dark:bg-muted/20 p-4 rounded-md mb-4">
          <div className="text-center">
            <p className="font-bold text-foreground dark:text-foreground/90">
              Select Handover Date & Time
            </p>
            <p className="text-muted-foreground dark:text-muted-foreground/80">approx. 1 minute</p>
          </div>
          <ArrowRightIcon className="w-6 h-6 text-foreground/70 dark:text-foreground/60" />
          <div className="text-center">
            <p className="font-bold text-foreground dark:text-foreground/90">Submit Your Details</p>
            <p className="text-muted-foreground dark:text-muted-foreground/80">approx. 1 minute</p>
          </div>
        </div>
        <p className="font-bold mb-4 text-foreground dark:text-foreground">Ready to begin?</p>
        <div className="flex justify-around items-center">
          <div className="flex items-center flex-col justify-center space-y-2">
            <LockIcon className="w-6 h-6 text-foreground/70 dark:text-foreground/60" />
            <p className="text-foreground/80 dark:text-foreground/70">SSL Secure</p>
          </div>
          <div className="flex items-center flex-col justify-center space-y-2">
            <StarIcon className="w-6 h-6 text-foreground/70 dark:text-foreground/60" />
            <p className="text-foreground/80 dark:text-foreground/70">Trustpilot</p>
          </div>
          <div className="flex items-center flex-col justify-center space-y-2">
            <CreditCardIcon className="w-6 h-6 text-foreground/70 dark:text-foreground/60" />
            <p className="text-foreground/80 dark:text-foreground/70">Stripe</p>
          </div>
        </div>
      </div>
      <div className="p-6">
        <Button
          type="button"
          onClick={nextStep}
          disabled={isPending}
          className="uppercase font-bold flex gap-x-3 w-full"
        >
          {isPending ? <Loader2 className="w-4 h-4 shrink-0 animate-spin" /> : null} I'm Ready
        </Button>
      </div>
    </div>
  );
};
