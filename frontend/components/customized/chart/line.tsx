'use client';

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts';

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

type LinechartProps = {
  chartData: Array<Record<string, any>>;
  chartDataLabel: Record<string, string>;
  xAxisKey: string;
  height?: number;
};

const Linechart: FC<LinechartProps> = ({
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
      <LineChart accessibilityLayer data={chartData} height={height}>
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
            <Line
              type="natural"
              key={data}
              dataKey={data}
              radius={4}
              stroke={colorMap[data]}
              fill={colorMap[data]}
              label={chartDataLabel[data]}
            />
          );
        })}
      </LineChart>
    </ChartContainer>
  );
};

export default Linechart;
