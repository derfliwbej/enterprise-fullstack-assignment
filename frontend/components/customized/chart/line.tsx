'use client';

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts';

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { useColorMap } from '@/hooks/useColorMap';
import moment from 'moment';
import { FC, useMemo } from 'react';

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
      <LineChart accessibilityLayer data={chartData} height={height}>
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
            <Line
              type="natural"
              key={data}
              dataKey={data}
              radius={4}
              stroke={colorMap[data]}
              fill={colorMap[data]}
              dot={false}
            />
          );
        })}
      </LineChart>
    </ChartContainer>
  );
};

export default Linechart;
