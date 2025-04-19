'use client';

import {
  formatBodyType,
  formatColour,
  formatFuelType,
  formatTransmission,
  formatUlezCompliance,
  generateYears,
} from '@/lib/utils';
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

import { TaxonomySelects } from './taxonomy-selects';
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
            <FormLabel htmlFor="year" className="text-form-label-color">
              Year
            </FormLabel>
            <FormControl>
              <Select
                selectClassName="text-form-text bg-background border-form-border h-form-input-height rounded-form-radius focus:border-form-border-focus hover:border-form-border-focus transition-colors"
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
        className="h-form-input-height bg-background border-form-border rounded-form-radius focus:border-form-border-focus hover:border-form-border-focus transition-colors text-white"
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
        className="h-form-input-height bg-background border-form-border rounded-form-radius focus:border-form-border-focus hover:border-form-border-focus transition-colors text-white"
      />

      <FormField
        control={form.control}
        name="transmission"
        render={({ field: { ref, ...rest } }) => (
          <FormItem>
            <FormLabel htmlFor="transmission" className="text-form-label-color">
              Transmission
            </FormLabel>
            <FormControl>
              <Select
                selectClassName="text-form-text bg-background border-form-border h-form-input-height rounded-form-radius focus:border-form-border-focus hover:border-form-border-focus transition-colors"
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
            <FormLabel htmlFor="fuelType" className="text-form-label-color">
              Fuel Type
            </FormLabel>
            <FormControl>
              <Select
                selectClassName="text-form-text bg-background border-form-border h-form-input-height rounded-form-radius focus:border-form-border-focus hover:border-form-border-focus transition-colors"
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
            <FormLabel htmlFor="bodyType" className="text-form-label-color">
              Body Type
            </FormLabel>
            <FormControl>
              <Select
                selectClassName="text-form-text bg-background border-form-border h-form-input-height rounded-form-radius focus:border-form-border-focus hover:border-form-border-focus transition-colors"
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
            <FormLabel htmlFor="colour" className="text-form-label-color">
              Colour
            </FormLabel>
            <FormControl>
              <Select
                selectClassName="text-form-text bg-background border-form-border h-form-input-height rounded-form-radius focus:border-form-border-focus hover:border-form-border-focus transition-colors"
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
            <FormLabel htmlFor="ulezCompliance" className="text-form-label-color">
              ULEZ Compliance
            </FormLabel>
            <FormControl>
              <Select
                selectClassName="text-form-text bg-background border-form-border h-form-input-height rounded-form-radius focus:border-form-border-focus hover:border-form-border-focus transition-colors"
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
            <FormLabel htmlFor="vrm" className="text-form-label-color">
              Vehicle Registration Mark
            </FormLabel>
            <FormControl>
              <Input
                placeholder="LA16 PYW"
                className="uppercase text-form-text h-form-input-height bg-background border-form-border rounded-form-radius focus:border-form-border-focus hover:border-form-border-focus placeholder:text-form-placeholder transition-colors"
                {...rest}
              />
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
            <FormLabel htmlFor="doors" className="text-form-label-color">
              Doors
            </FormLabel>
            <FormControl>
              <NumberInput
                max={6}
                min={1}
                placeholder="0"
                className="text-form-text bg-background border-form-border h-form-input-height rounded-form-radius placeholder:text-form-placeholder focus:border-form-border-focus hover:border-form-border-focus transition-colors"
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
            <FormLabel htmlFor="seats" className="text-form-label-color">
              Seats
            </FormLabel>
            <FormControl>
              <NumberInput
                max={8}
                min={1}
                placeholder="0"
                className="text-form-text bg-background border-form-border h-form-input-height rounded-form-radius placeholder:text-form-placeholder focus:border-form-border-focus hover:border-form-border-focus transition-colors"
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
