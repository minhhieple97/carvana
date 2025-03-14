import { twMerge } from 'tailwind-merge';
import { type ClassValue, clsx } from 'clsx';
/**
 * Combines multiple class names and merges Tailwind CSS classes efficiently
 * @param inputs - Class names to combine and merge
 * @returns Merged class names string
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
