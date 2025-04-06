'use client';

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

export default function Page() {
  const [countries, setCountries] = useState([]);
  const [artist, setArtist] = useState({ value: '', label: '' });
  const [metric, setMetric] = useState('');
  const [timeRange, setTimeRange] = useState(dateOptions[0].value);

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
    </div>
  );
}
