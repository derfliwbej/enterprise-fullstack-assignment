'use client';

import Radio from '@/components/customized/radio-group/radio-group-07';
import Filter from '@/components/filter';
import MetricChart from '@/components/MetricChart';
import SummaryCard from '@/components/SummaryCard';
import { getDateRangeFromNow } from '@/lib/utils';
import api, { API_URL } from '@/utils/api';
import { useQuery } from '@tanstack/react-query';
import moment from 'moment';
import { useMemo, useState } from 'react';
import Typography from '../components/typography';

const metricOptions = [
  { value: 'playlistEfficiency', label: 'Playlist Efficiency' },
];

const dateOptions = [
  {
    value: 'week',
    label: '7 Days',
  },
  {
    value: 'month',
    label: '30 Days',
  },
];

const chartOptions = [
  { value: 'bar', label: 'Bar' },
  { value: 'line', label: 'Line' },
];

export default function Page() {
  const { data: countryOptions } = useQuery({
    queryKey: ['country'],
    queryFn: async () => {
      const data = await api.getCountries();
      const countries = data.data;
      return countries.map((e) => {
        return { value: e.country_code, label: e.country_name };
      });
    },
  });

  const { data: artistOptions } = useQuery({
    queryKey: ['artist'],
    queryFn: async () => {
      const data = await api.getArtists();
      const artists = data.data;
      return artists.map((e) => {
        return { value: e.artist_id, label: e.artist_name };
      });
    },
  });

  const chartDataLabel = useMemo(() => {
    return countryOptions?.reduce((acc, country) => {
      return { ...acc, [country.value]: country.label };
    }, {});
  }, [countryOptions]);

  const [countries, setCountries] = useState([]);
  const [artist, setArtist] = useState({ value: '', label: '' });
  const [metric, setMetric] = useState(metricOptions[0].value);
  const [timeRange, setTimeRange] = useState(dateOptions[0].value);
  const [chartType, setChartType] = useState(chartOptions[0].value);

  const { data: metricsData, isLoading: isFetchingMetrics } = useQuery({
    queryKey: ['metric', { artist, countries, timeRange }],
    queryFn: async () => {
      const url = new URL(API_URL);
      url.searchParams.set('artist', artist.value);
      for (const country of countries) {
        url.searchParams.append('country', country.value);
      }

      const { startDate, endDate } = getDateRangeFromNow(timeRange);
      url.searchParams.set('startDate', startDate);
      url.searchParams.set('endDate', endDate);

      const data = await api.getPlaylistEfficiency(url.search);

      const chartData = data.data.rows;
      const totalStreams = data.data.total_streams;
      const totalPlaylistAdds = data.data.total_playlist_adds;
      const highestEfficiency = data.data.highest_efficiency;
      return {
        chartData,
        totalStreams,
        totalPlaylistAdds,
        highestEfficiency,
      };
    },
    refetchOnMount: false,
  });

  const { chartData, totalStreams, totalPlaylistAdds, highestEfficiency } =
    metricsData || {};

  const refinedChartData = useMemo(() => {
    const chartDataMap =
      chartData?.reduce((acc, data) => {
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
        />
      </div>
    </div>
  );
}
