import { hslGenerateColors } from '@/lib/utils';
import { useMemo } from 'react';

export function useColorMap(keys: Array<string>): Record<any, any> {
  return useMemo(() => {
    const colorSet = hslGenerateColors(keys.length);

    return keys.reduce(
      (acc, key, i) => ({
        ...acc,
        [key]: colorSet[i],
      }),
      {}
    );
  }, [keys]);
}
