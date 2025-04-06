'use client';

import Barchart from '@/components/customized/chart/bar';
import Linechart from '@/components/customized/chart/line';
import Radio from '@/components/customized/radio-group/radio-group-07';
import Filter from '@/components/filter';
import SummaryCard from '@/components/SummaryCard';
import { useState } from 'react';
import Typography from '../components/typography';

const countryOptions = [
  {
    value: 'us',
    label: 'United States',
  },
  {
    value: 'uk',
    label: 'United Kingdom',
  },
  {
    value: 'ca',
    label: 'Canada',
  },
  {
    value: 'au',
    label: 'Australia',
  },
  {
    value: 'fr',
    label: 'France',
  },
  {
    value: 'de',
    label: 'Germany',
  },
  {
    value: 'jp',
    label: 'Japan',
  },
  {
    value: 'br',
    label: 'Brazil',
  },
];

const artistOptions = [
  { value: 'ART001', label: 'Taylor Swift' },
  { value: 'ART002', label: 'Drake' },
];

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
  const [countries, setCountries] = useState([]);
  const [artist, setArtist] = useState({ value: '', label: '' });
  const [metric, setMetric] = useState('');
  const [timeRange, setTimeRange] = useState(dateOptions[0].value);
  const [chartType, setChartType] = useState(chartOptions[0].value);

  const chartData = [
    { date: 'April 1', desktop: 186, mobile: 80 },
    { date: 'April 2', desktop: 305, mobile: 200 },
    { date: 'April 3', desktop: 237, mobile: 120 },
    { date: 'April 4', desktop: 73, mobile: 190 },
    { date: 'April 5', desktop: 209, mobile: 130 },
    { date: 'April 6', desktop: 214, mobile: 140 },
  ];

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
          <SummaryCard metric="Selected Artist" value="BLACKPINK" />
          <SummaryCard metric="Total Streams" value="2,600,000" />
          <SummaryCard metric="Playlist Adds" value="250" />
          <SummaryCard
            metric="Highest Efficiency"
            value="10,050"
            footer="April 1, 2025"
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
        {chartType === 'line' ? (
          <Linechart
            chartData={chartData}
            chartDataLabel={{ desktop: 'Desktop', mobile: 'Mobile' }}
            xAxisKey="date"
          />
        ) : chartType === 'bar' ? (
          <Barchart
            chartData={chartData}
            chartDataLabel={{ desktop: 'Desktop', mobile: 'Mobile' }}
            xAxisKey="date"
          />
        ) : null}
      </div>
    </div>
  );
}
