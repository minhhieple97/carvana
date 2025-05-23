import { zodResolver } from '@hookform/resolvers/zod';
import { useActions, useUIState, readStreamableValue } from 'ai/rsc';
import { useRouter } from 'next/navigation';
import { useAction } from 'next-safe-action/hooks';
import { useState, useTransition } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { toast } from 'sonner';

import { CreateClassifiedSchema, type CreateClassifiedType } from '@/schemas/classified.schema';
import { SingleImageSchema, type SingleImageType } from '@/schemas/images.schema';

import { createClassifiedAction } from '../actions/classified';

import type { AI } from '../actions/ai';
import type { StreamableSkeletonProps } from '../types';

const mapStreamDataToCreateType = (
  streamData: StreamableSkeletonProps
): Partial<CreateClassifiedType> => {
  const mapped: Partial<CreateClassifiedType> = {};

  if (streamData.makeId) mapped.makeId = streamData.makeId;
  if (streamData.modelId) mapped.modelId = streamData.modelId;
  if (streamData.modelVariantId) mapped.modelVariantId = streamData.modelVariantId;
  if (streamData.year !== undefined) mapped.year = streamData.year;
  if (streamData.image !== undefined) mapped.image = streamData.image;
  if (streamData.description !== undefined) mapped.description = streamData.description;
  if (streamData.vrm !== undefined) mapped.vrm = streamData.vrm;
  if (streamData.odoReading !== undefined) mapped.odoReading = streamData.odoReading;
  if (streamData.doors !== undefined) mapped.doors = streamData.doors;
  if (streamData.seats !== undefined) mapped.seats = streamData.seats;
  if (streamData.ulezCompliance !== undefined) mapped.ulezCompliance = streamData.ulezCompliance;
  if (streamData.transmission !== undefined) mapped.transmission = streamData.transmission;
  if (streamData.colour !== undefined) mapped.colour = streamData.colour;
  if (streamData.fuelType !== undefined) mapped.fuelType = streamData.fuelType;
  if (streamData.bodyType !== undefined) mapped.bodyType = streamData.bodyType;
  if (streamData.odoUnit !== undefined) mapped.odoUnit = streamData.odoUnit;

  return mapped;
};

export const useCreateClassifiedDialog = () => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUploading, startUploadTransition] = useTransition();
  const { generateClassified } = useActions<typeof AI>();
  const [messages, setMessages] = useUIState<typeof AI>();

  const imageForm = useForm<SingleImageType>({
    resolver: zodResolver(SingleImageSchema),
  });

  const createForm = useForm<CreateClassifiedType>({
    resolver: zodResolver(CreateClassifiedSchema),
    defaultValues: {},
  });

  const { execute: executeCreateAction, isPending: isCreating } = useAction(
    createClassifiedAction,
    {
      onSuccess: (result) => {
        toast.success('Classified created successfully');
        setIsModalOpen(false);
        setMessages([]);
        if (!result.data?.classifiedId) {
          toast.error('Failed to get classified ID after creation.');
        }
        router.refresh();
      },
      onError: ({ error }) => {
        console.error('Create classified error:', error);
        toast.error(error.serverError || 'Failed to create classified.');
      },
    }
  );

  const handleImageUpload = (url: string) => {
    imageForm.setValue('image', url, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const onImageSubmit: SubmitHandler<SingleImageType> = (data) => {
    startUploadTransition(async () => {
      try {
        const responseMessage = await generateClassified(data.image);
        if (!responseMessage) {
          toast.error('Failed to get response from AI.');
          return;
        }
        setMessages((currentMessages) => [...currentMessages, responseMessage]);

        for await (const value of readStreamableValue(responseMessage.classified)) {
          if (value) {
            const mappedData = mapStreamDataToCreateType(value);
            createForm.reset(mappedData);
          }
        }
      } catch (error) {
        console.error('Error generating classified details:', error);
        toast.error('An error occurred while generating classified details.');
        setMessages([]);
      }
    });
  };

  const onCreateSubmit: SubmitHandler<CreateClassifiedType> = (data) => {
    executeCreateAction(data);
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setMessages([]);
      imageForm.reset();
      createForm.reset();
    }
    setIsModalOpen(open);
  };

  return {
    isModalOpen,
    handleOpenChange,
    isUploading,
    isCreating,
    messages,
    imageForm,
    createForm,
    handleImageUpload,
    onImageSubmit: imageForm.handleSubmit(onImageSubmit),
    onCreateSubmit: createForm.handleSubmit(onCreateSubmit),
  };
};
