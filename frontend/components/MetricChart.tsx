import { FC } from 'react';
import Barchart from './customized/chart/bar';
import Linechart from './customized/chart/line';
import Typography from './typography';

type MetricChartProps = {
  chartType: string;
  chartData: Array<Record<string, any>>;
  chartDataLabel: Record<string, string>;
  xAxisKey: string;
};

const MetricChart: FC<MetricChartProps> = ({
  chartType,
  chartData,
  chartDataLabel,
  xAxisKey,
}) => {
  if (!chartData.length) {
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
