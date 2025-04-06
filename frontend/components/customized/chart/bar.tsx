'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { useColorMap } from '@/hooks/useColorMap';
import { FC, useMemo } from 'react';

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: '#2563eb',
  },
  mobile: {
    label: 'Mobile',
    color: '#60a5fa',
  },
} satisfies ChartConfig;

type BarchartProps = {
  chartData: Array<Record<string, any>>;
  chartDataLabel: Record<string, string>;
  xAxisKey: string;
  height?: number;
};

const Barchart: FC<BarchartProps> = ({
  chartData,
  chartDataLabel,
  xAxisKey,
  height = 450,
}) => {
  const chartDataKeys = useMemo(() => {
    return !!chartData.length
      ? Object.keys(chartData[0]).filter((key) => key !== xAxisKey)
      : [];
  }, [chartData]);

  const colorMap = useColorMap(chartDataKeys);

  return (
    <ChartContainer config={chartConfig} className="max-h-[450px] w-full">
      <BarChart accessibilityLayer data={chartData} height={height}>
        <CartesianGrid />
        <YAxis />
        <XAxis
          dataKey={xAxisKey}
          tickMargin={10}
          tickFormatter={(value) => value}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        {chartDataKeys.map((data) => {
          return (
            <Bar
              key={data}
              dataKey={data}
              radius={4}
              fill={colorMap[data]}
              label={chartDataLabel[data]}
            />
          );
        })}
      </BarChart>
    </ChartContainer>
  );
};

export default Barchart;
