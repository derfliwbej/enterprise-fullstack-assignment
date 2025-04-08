'use client';

import Radio from '@/components/customized/radio-group/radio-group-07';
import { MultiselectOption } from '@/components/customized/select/multiselect';
import Filter from '@/components/filter';
import MetricChart from '@/components/MetricChart';
import SummaryCard from '@/components/SummaryCard';
import { getArtists, getCountries, getPlaylistEfficiency } from '@/lib/queries';
import { chartOptions, dateOptions, metricOptions } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import moment from 'moment';
import { useMemo, useState } from 'react';
import Typography from '../components/typography';

export default function Page() {
  const [countries, setCountries] = useState<Array<MultiselectOption>>([]);
  const [artist, setArtist] = useState({ value: '', label: '' });
  const [metric, setMetric] = useState(metricOptions[0].value);
  const [timeRange, setTimeRange] = useState(dateOptions[0].value);
  const [chartType, setChartType] = useState(chartOptions[0].value);

  const { data: countryOptions } = useQuery({
    queryKey: ['country'],
    queryFn: getCountries,
  });

  const { data: artistOptions } = useQuery({
    queryKey: ['artist'],
    queryFn: getArtists,
  });

  const {
    data: metricsData,
    isLoading: isFetchingMetrics,
    isError: isErrorFetchingMetrics,
  } = useQuery({
    queryKey: ['metric', { artist, countries, timeRange }],
    queryFn: async () =>
      await getPlaylistEfficiency(artist, countries, timeRange),
  });

  const { chartData, totalStreams, totalPlaylistAdds, highestEfficiency } =
    metricsData || {};

  const refinedChartData = useMemo(() => {
    const chartDataMap: Record<
      string,
      Record<string, number>
    > = chartData?.reduce((acc, data) => {
      return {
        ...acc,
        [data.date]: {
          ...acc[data.date],
          [data.country_code]: parseInt(data.playlist_efficiency),
        },
      };
    }, {}) || {};

    return Object.keys(chartDataMap).map((date) => {
      return { date, ...chartDataMap[date] };
    });
  }, [chartData]);

  const chartDataLabel = useMemo<Record<string, string>>(() => {
    return countryOptions?.reduce((acc, country) => {
      return { ...acc, [country.value]: country.label };
    }, {});
  }, [countryOptions]);

  return (
    <div className="p-5">
      <div className="pb-5">
        <Typography.H3>Global Editorial Playlist Dashboard</Typography.H3>
        <Typography.Muted>
          Find regional breakout artists and analyze playlist performance.
        </Typography.Muted>
      </div>
      <Filter
        country={{
          options: countryOptions,
          selected: countries,
          setSelected: setCountries,
          placeholder: 'Search for a country',
        }}
        artist={{
          options: artistOptions,
          value: artist,
          setValue: setArtist,
          placeholder: 'Search for artist',
        }}
        metric={{
          options: metricOptions,
          value: metric,
          setValue: setMetric,
          placeholder: 'Select a metric',
        }}
        timeRange={{
          options: dateOptions,
          value: timeRange,
          setValue: setTimeRange,
        }}
      />
      <div>
        <div className="flex mt-5 mb-3 items-center">
          <Typography.H4 className="font-bold">Summary KPIs</Typography.H4>
          <Typography.Muted className="ml-auto text-xs">
            Based on current filter selection
          </Typography.Muted>
        </div>

        <div className="grid grid-cols-4 gap-5">
          <SummaryCard
            metric="Selected Artist"
            value={artist.label || 'None'}
          />
          <SummaryCard
            metric="Total Streams"
            value={totalStreams || 0}
            isLoading={isFetchingMetrics}
          />
          <SummaryCard
            metric="Playlist Adds"
            value={totalPlaylistAdds || 0}
            isLoading={isFetchingMetrics}
          />
          <SummaryCard
            metric="Highest Efficiency"
            value={highestEfficiency?.playlist_efficiency || 0}
            footer={
              moment(highestEfficiency?.date).format('MMMM Do YYYY') || ''
            }
            isLoading={isFetchingMetrics}
          />
        </div>
      </div>
      <div>
        <div className="grid grid-cols-2 mt-5 mb-3 items-center">
          <Typography.H4 className="font-bold">
            Playlist Efficiency Trends by Country
          </Typography.H4>
          <div className="ml-auto">
            <Radio
              options={chartOptions}
              value={chartType}
              setValue={setChartType}
            />
          </div>
        </div>
        <MetricChart
          chartType={chartType}
          chartData={refinedChartData}
          chartDataLabel={chartDataLabel}
          xAxisKey="date"
          isLoading={isFetchingMetrics}
          isError={isErrorFetchingMetrics}
        />
      </div>
    </div>
  );
}
