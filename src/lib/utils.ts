import {
  BodyType,
  ClassifiedStatus,
  Colour,
  FuelType,
  OdoUnit,
  Transmission,
  ULEZCompliance,
} from '@prisma/client';
import { clsx, type ClassValue } from 'clsx';
import { parse } from 'date-fns';
import prettyBytes from 'pretty-bytes';
import { twMerge } from 'tailwind-merge';

import type { FormatPriceArgs } from '@/features/classifieds/types';
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice({ price, currency }: FormatPriceArgs) {
  if (!price) return '0';

  const formatter = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currencyDisplay: 'narrowSymbol',
    ...(currency && { currency }),
    maximumFractionDigits: 0,
  });

  return formatter.format(price / 100);
}

export function formatNumber(num: number | null, options?: Intl.NumberFormatOptions) {
  if (!num) return '0';

  return new Intl.NumberFormat('en-GB', options).format(num);
}

export function formatOdometerUnit(unit: OdoUnit) {
  return unit === OdoUnit.MILES ? 'mi' : 'km';
}

export function formatTransmission(transmission: Transmission) {
  return transmission === Transmission.AUTOMATIC ? 'Automatic' : 'Manual';
}

export function formatColour(colour: Colour) {
  switch (colour) {
    case Colour.BLACK:
      return 'Black';
    case Colour.WHITE:
      return 'White';
    case Colour.SILVER:
      return 'Silver';
    case Colour.RED:
      return 'Red';
    case Colour.BLUE:
      return 'Blue';
    case Colour.BROWN:
      return 'Brown';
    case Colour.GOLD:
      return 'Gold';
    case Colour.GREEN:
      return 'Green';
    case Colour.GREY:
      return 'Grey';
    case Colour.ORANGE:
      return 'Orange';
    case Colour.PINK:
      return 'Pink';
    case Colour.PURPLE:
      return 'Purple';
    case Colour.YELLOW:
      return 'Yellow';
    default:
      return 'Unknown';
  }
}

export function formatFuelType(fuelType: FuelType) {
  switch (fuelType) {
    case FuelType.PETROL:
      return 'Petrol';
    case FuelType.DIESEL:
      return 'Diesel';
    case FuelType.ELECTRIC:
      return 'Electric';
    case FuelType.HYBRID:
      return 'Hybrid';
    default:
      return 'Unknown';
  }
}

export function formatBodyType(bodyType: BodyType) {
  switch (bodyType) {
    case BodyType.CONVERTIBLE:
      return 'Convertible';
    case BodyType.COUPE:
      return 'Coupe';
    case BodyType.HATCHBACK:
      return 'Hatchback';
    case BodyType.SUV:
      return 'SUV';
    case BodyType.WAGON:
      return 'Wagon';
    case BodyType.SEDAN:
      return 'Sedan';
    default:
      return 'Unknown';
  }
}

export function formatUlezCompliance(ulezCompliance: ULEZCompliance) {
  return ulezCompliance === ULEZCompliance.EXEMPT ? 'Exempt' : 'Non-Exempt';
}

export const generateDateOptions = () => {
  const today = new Date();
  const options = [];

  for (let i = 0; i < 365; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);

    if (date >= today) {
      const formattedDate = date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      });

      options.push({
        label: formattedDate,
        value: formattedDate,
      });
    }
  }

  return options;
};

export const generateTimeOptions = () => {
  const options = [];
  const hours = ['09', '10', '11', '12', '01', '02', '03', '04', '05'];
  const minutes = ['00', '30'];
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();

  hours.slice(0, 3).forEach((hour) => {
    minutes.forEach((minute) => {
      const timeHour = parseInt(hour);
      const timeMinute = parseInt(minute);

      if (today.getTime() === now.setHours(0, 0, 0, 0)) {
        if (timeHour < currentHour || (timeHour === currentHour && timeMinute <= currentMinute)) {
          return;
        }
      }

      const time = `${hour}:${minute} am`;
      options.push({
        label: time,
        value: time,
      });
    });
  });

  if (!(today.getTime() === now.setHours(0, 0, 0, 0) && currentHour >= 12)) {
    options.push({
      label: '12:00 pm',
      value: '12:00 pm',
    });
    options.push({
      label: '12:30 pm',
      value: '12:30 pm',
    });
  }

  hours.slice(4).forEach((hour) => {
    minutes.forEach((minute) => {
      const timeHour = parseInt(hour) + 12;
      const timeMinute = parseInt(minute);

      if (today.getTime() === now.setHours(0, 0, 0, 0)) {
        if (timeHour < currentHour || (timeHour === currentHour && timeMinute <= currentMinute)) {
          return;
        }
      }

      const time = `${hour}:${minute} pm`;
      options.push({
        label: time,
        value: time,
      });
    });
  });

  return options;
};

export const formatDate = (date: string, time: string) => {
  const parsedDate = parse(date, 'dd MMM yyyy', new Date());
  const parsedTime = parse(time, 'hh:mm aa', new Date());

  parsedDate.setHours(parsedTime.getHours(), parsedTime.getMinutes(), 0, 0);

  return parsedDate;
};

export const isValidHandoverDateTime = (date: string | undefined, time: string | undefined) => {
  if (!date || !time) {
    return {
      isValid: false,
      error: 'Handover date and time are required',
    };
  }

  const dateRegex = /^\d{2} [A-Za-z]{3} \d{4}$/;
  if (!dateRegex.test(date)) {
    return {
      isValid: false,
      error: 'Date must be in format: DD MMM YYYY (e.g., 05 Apr 2025)',
    };
  }

  const timeRegex = /^\d{2}:\d{2} [ap]m$/;
  if (!timeRegex.test(time)) {
    return {
      isValid: false,
      error: 'Time must be in format: HH:MM am/pm (e.g., 09:00 am)',
    };
  }

  try {
    const parsedDate = parse(date, 'dd MMM yyyy', new Date());
    const parsedTime = parse(time, 'hh:mm aa', new Date());

    if (isNaN(parsedDate.getTime()) || isNaN(parsedTime.getTime())) {
      return {
        isValid: false,
        error: 'Invalid date or time',
      };
    }

    const now = new Date();
    const dateTime = formatDate(date, time);
    if (dateTime < now) {
      return {
        isValid: false,
        error: 'Handover date and time must be in the future',
      };
    }

    return {
      isValid: true,
      error: null,
    };
  } catch {
    return {
      isValid: false,
      error: 'Invalid date or time format',
    };
  }
};

export const isSelectedDateToday = (selectedDate: string): boolean => {
  try {
    const today = new Date();
    const formattedToday = today.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });

    return selectedDate === formattedToday;
  } catch {
    return false;
  }
};

export const getTimeOptions = (selectedDate?: string) => {
  const options = [];
  const hours = ['09', '10', '11', '12', '01', '02', '03', '04', '05'];
  const minutes = ['00', '30'];
  const now = new Date();

  const isToday = selectedDate ? isSelectedDateToday(selectedDate) : false;

  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();

  hours.slice(0, 3).forEach((hour) => {
    minutes.forEach((minute) => {
      const timeHour = parseInt(hour);
      const adjustedHour = timeHour;

      if (isToday) {
        if (
          adjustedHour < currentHour ||
          (adjustedHour === currentHour && parseInt(minute) <= currentMinute)
        ) {
          return;
        }
      }

      const time = `${hour}:${minute} am`;
      options.push({
        label: time,
        value: time,
      });
    });
  });

  if (!isToday || currentHour < 12 || (currentHour === 12 && currentMinute < 30)) {
    options.push({
      label: '12:00 pm',
      value: '12:00 pm',
    });
  }

  if (!isToday || currentHour < 12 || (currentHour === 12 && currentMinute < 30)) {
    options.push({
      label: '12:30 pm',
      value: '12:30 pm',
    });
  }

  hours.slice(4).forEach((hour) => {
    minutes.forEach((minute) => {
      const displayHour = parseInt(hour);
      const timeHour = displayHour + 12;

      if (isToday) {
        if (
          timeHour < currentHour ||
          (timeHour === currentHour && parseInt(minute) <= currentMinute)
        ) {
          return;
        }
      }

      const time = `${hour}:${minute} pm`;
      options.push({
        label: time,
        value: time,
      });
    });
  });

  return options;
};

export function calculatePercentageChange(current: number, previous: number) {
  if (previous === 0) return current > 0 ? 100 : current < 0 ? -100 : 0;

  return ((current - previous) / Math.abs(previous)) * 100;
}

export const convertToMb = (bytes: number) =>
  prettyBytes(bytes, {
    bits: false,
    maximumFractionDigits: 1,
    space: false,
  });

export const formatClassifiedStatus = (status: ClassifiedStatus) => {
  switch (status) {
    case ClassifiedStatus.LIVE:
      return 'Live';
    case ClassifiedStatus.SOLD:
      return 'Sold';
    case ClassifiedStatus.DRAFT:
      return 'Draft';
  }
};

export const generateYears = (minYear: number, maxYear?: number) => {
  const currentYear = maxYear ? maxYear : new Date().getFullYear();
  const years: string[] = [];

  for (let year = currentYear; year >= minYear; year--) {
    years.push(`${year}`);
  }

  return years;
};
