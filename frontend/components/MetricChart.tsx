import { FC } from 'react';
import Barchart from './customized/chart/bar';
import Linechart from './customized/chart/line';
import Typography from './typography';
import { Skeleton } from './ui/skeleton';

type MetricChartProps = {
  chartType: string;
  chartData: Array<Record<string, any>>;
  chartDataLabel: Record<string, string>;
  xAxisKey: string;
  isLoading: boolean;
  isError: boolean;
};

const MetricChart: FC<MetricChartProps> = ({
  chartType,
  chartData,
  chartDataLabel,
  xAxisKey,
  isLoading,
  isError,
}) => {
  if (isLoading) {
    return <Skeleton className="h-[450px] w-full" />;
  } else if (isError) {
    return (
      <Typography.Muted>
        Error while fetching server data. Please try again later.
      </Typography.Muted>
    );
  } else if (!chartData.length) {
    return (
      <Typography.Muted>Select an artist to view metrics</Typography.Muted>
    );
  } else if (chartType === 'line') {
    return (
      <Linechart
        chartData={chartData}
        chartDataLabel={chartDataLabel}
        xAxisKey={xAxisKey}
      />
    );
  } else if (chartType === 'bar') {
    return (
      <Barchart
        chartData={chartData}
        chartDataLabel={chartDataLabel}
        xAxisKey={xAxisKey}
      />
    );
  } else return null;
};

export default MetricChart;
