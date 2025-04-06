import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function hslGenerateColors(n: number) {
  const colors = [];

  for (let i = 0; i < n; i++) {
    const hue = Math.round((360 / n) * i);
    const color = `hsl(${hue},70%,50%)`;
    colors.push(color);
  }

  return colors;
}
