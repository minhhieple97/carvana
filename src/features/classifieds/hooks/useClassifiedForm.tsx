import { zodResolver } from '@hookform/resolvers/zod';
import { ClassifiedStatus, CurrencyCode, OdoUnit } from '@prisma/client';
import { useAction } from 'next-safe-action/hooks';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { updateClassifiedAction } from '@/features/admin/actions/classified';
import { formatClassifiedStatus } from '@/lib/utils';
import { updateClassifiedSchema } from '@/schemas';

import type { ClassifiedWithImages } from '@/features/classifieds';
import type { UpdateClassifiedType } from '@/schemas/classified.schema';

function extractKey(url: string) {
  const regex = /uploads\/.+/;
  const match = url.match(regex);
  return match ? match[0] : url;
}

export const useClassifiedForm = (classified: ClassifiedWithImages) => {
  const form = useForm<UpdateClassifiedType>({
    resolver: zodResolver(updateClassifiedSchema),
    defaultValues: {
      id: classified.id,
      odoUnit: classified.odoUnit,
      currency: classified.currency,
      ...(classified && {
        images: classified.images
          ? classified.images.map((image, index) => ({
              ...image,
              id: index + 1,
              percentage: 100,
              key: extractKey(image.src),
              done: true,
            }))
          : [],
        make: classified.makeId.toString(),
        model: classified.modelId.toString(),
        modelVariant: classified.modelVariantId?.toString(),
        year: classified.year.toString(),
        vrm: classified.vrm ?? '',
        description: classified.description ?? '',
        fuelType: classified.fuelType,
        bodyType: classified.bodyType,
        transmission: classified.transmission,
        colour: classified.colour,
        ulezCompliance: classified.ulezCompliance,
        status: classified.status,
        odoReading: classified.odoReading,
        seats: classified.seats,
        doors: classified.doors,
        price: classified.price / 100,
      }),
    },
  });

  const { execute, isPending, result } = useAction(updateClassifiedAction, {
    onSuccess: () => {
      toast.success('Classified updated successfully');
    },
    onError: ({ error }) => {
      toast.error(error.serverError || 'An error occurred');
    },
  });

  const handleSubmit = form.handleSubmit((data) => {
    execute(data);
  });

  const statusOptions = Object.values(ClassifiedStatus).map((value) => ({
    label: formatClassifiedStatus(value),
    value,
  }));

  return {
    form,
    handleSubmit,
    isPending,
    statusOptions,
    error: result?.serverError || null,
  };
};
