'use client';

import {
  BodyType,
  Colour,
  CurrencyCode,
  FuelType,
  OdoUnit,
  Transmission,
  ULEZCompliance,
} from '@prisma/client';
import dynamic from 'next/dynamic';
import { useFormContext } from 'react-hook-form';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  InputSelect,
  NumberInput,
  Select,
  Skeleton,
} from '@/components';
import {
  formatBodyType,
  formatColour,
  formatFuelType,
  formatTransmission,
  formatUlezCompliance,
  generateYears,
} from '@/lib/utils';

import { TaxonomySelects } from './taxonomy-selects';

const RichTextEditor = dynamic(
  () => import('./rich-text-editor').then((mod) => mod.RichTextEditor),
  {
    ssr: false,
    loading: () => (
      <div className="space-y-2 flex flex-col">
        <Skeleton className="w-24 h-4 bg-primary-900" />
        <Skeleton className="h-[200px] w-full bg-primary-900" />
      </div>
    ),
  }
);

const years = generateYears(1925);

export const ClassifiedFormFields = () => {
  const form = useFormContext();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-white/90">
      <FormField
        control={form.control}
        name="year"
        render={({ field: { ref, ...rest } }) => (
          <FormItem>
            <FormControl>
              <Select
                label="Year"
                options={years.map((year) => ({
                  label: year,
                  value: year,
                }))}
                {...rest}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <TaxonomySelects />
      <InputSelect
        options={Object.values(CurrencyCode).map((value) => ({
          label: value,
          value,
        }))}
        label="Price"
        inputName="price"
        selectName="currency"
        inputMode="numeric"
        placeholder="0"
      />

      <InputSelect
        options={Object.values(OdoUnit).map((value) => ({
          label: value,
          value,
        }))}
        label="Odometer Reading"
        inputName="odoReading"
        selectName="odoUnit"
        inputMode="numeric"
        placeholder="0"
      />

      <FormField
        control={form.control}
        name="transmission"
        render={({ field: { ref, ...rest } }) => (
          <FormItem>
            <FormControl>
              <Select
                label="Transmission"
                options={Object.values(Transmission).map((value) => ({
                  label: formatTransmission(value),
                  value,
                }))}
                {...rest}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="fuelType"
        render={({ field: { ref, ...rest } }) => (
          <FormItem>
            <FormControl>
              <Select
                label="Fuel Type"
                options={Object.values(FuelType).map((value) => ({
                  label: formatFuelType(value),
                  value,
                }))}
                {...rest}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="bodyType"
        render={({ field: { ref, ...rest } }) => (
          <FormItem>
            <FormControl>
              <Select
                label="Body Type"
                options={Object.values(BodyType).map((value) => ({
                  label: formatBodyType(value),
                  value,
                }))}
                {...rest}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="colour"
        render={({ field: { ref, ...rest } }) => (
          <FormItem>
            <FormControl>
              <Select
                label="Colour"
                options={Object.values(Colour).map((value) => ({
                  label: formatColour(value),
                  value,
                }))}
                {...rest}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="ulezCompliance"
        render={({ field: { ref, ...rest } }) => (
          <FormItem>
            <FormControl>
              <Select
                label="ULEZ Compliance"
                options={Object.values(ULEZCompliance).map((value) => ({
                  label: formatUlezCompliance(value),
                  value,
                }))}
                {...rest}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="vrm"
        render={({ field: { ref, ...rest } }) => (
          <FormItem>
            <FormLabel
              htmlFor="vrm"
              className="font-semibold mb-1.5 text-[0.925rem] text-foreground"
            >
              Vehicle Registration Mark
            </FormLabel>
            <FormControl>
              <Input placeholder="LA16 PYW" className="uppercase" {...rest} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="doors"
        render={({ field: { onChange, ...rest } }) => (
          <FormItem>
            <FormLabel
              htmlFor="doors"
              className="font-semibold mb-1.5 text-[0.925rem] text-foreground"
            >
              Doors
            </FormLabel>
            <FormControl>
              <NumberInput
                max={6}
                min={1}
                placeholder="0"
                onValueChange={(values) => {
                  onChange(values.floatValue);
                }}
                {...rest}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="seats"
        render={({ field: { onChange, ...rest } }) => (
          <FormItem>
            <FormLabel
              htmlFor="seats"
              className="font-semibold mb-1.5 text-[0.925rem] text-foreground"
            >
              Seats
            </FormLabel>
            <FormControl>
              <NumberInput
                max={8}
                min={1}
                placeholder="0"
                onValueChange={(values) => {
                  onChange(values.floatValue);
                }}
                {...rest}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="col-span-2">
        <FormField
          control={form.control}
          name="description"
          render={({ field: { onChange, ...rest } }) => (
            <FormItem>
              <FormControl>
                <RichTextEditor
                  label="Description"
                  config={{
                    init: { placeholder: "Enter your vehicle's description" },
                  }}
                  {...rest}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};
