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
import moment from 'moment';
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

  const chartConfig = useMemo(() => {
    return chartDataKeys.reduce((acc, key) => {
      return {
        ...acc,
        [key]: {
          label: chartDataLabel[key],
          color: colorMap[key],
        },
      };
    }, {});
  }, [chartDataKeys]);

  return (
    <ChartContainer config={chartConfig} className="max-h-[450px] w-full">
      <BarChart accessibilityLayer data={chartData} height={height}>
        <CartesianGrid />
        <YAxis domain={['dataMin - 100', 'dataMax + 100']} />
        <XAxis
          dataKey={xAxisKey}
          tickMargin={10}
          tickFormatter={(value) => moment(value).format('MMMM Do')}
        />
        <ChartTooltip
          content={
            <ChartTooltipContent
              labelFormatter={(value) => moment(value).format('MMMM Do')}
            />
          }
        />
        <ChartLegend content={<ChartLegendContent />} />
        {chartDataKeys.map((data) => {
          return (
            <Bar key={data} dataKey={data} radius={4} fill={colorMap[data]} />
          );
        })}
      </BarChart>
    </ChartContainer>
  );
};

export default Barchart;
