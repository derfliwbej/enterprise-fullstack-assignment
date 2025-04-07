import { clsx, type ClassValue } from 'clsx';
import moment from 'moment';
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

export function getDateRangeFromNow(type: string) {
  // No data after 2025-03-31, set fixed current day as last day with data
  // const currentDay = moment();
  const currentDay = moment('2025-03-31', 'YYYY-MM-DD');
  if (type === 'week') {
    return {
      startDate: currentDay.clone().subtract(6, 'days').format('YYYY-MM-DD'),
      endDate: currentDay.format('YYYY-MM-DD'),
    };
  } else {
    return {
      startDate: currentDay.clone().subtract(29, 'days').format('YYYY-MM-DD'),
      endDate: currentDay.format('YYYY-MM-DD'),
    };
  }
}

export const metricOptions = [
  { value: 'playlistEfficiency', label: 'Playlist Efficiency' },
];

export const dateOptions = [
  {
    value: 'week',
    label: '7 Days',
  },
  {
    value: 'month',
    label: '30 Days',
  },
];

export const chartOptions = [
  { value: 'bar', label: 'Bar' },
  { value: 'line', label: 'Line' },
];
