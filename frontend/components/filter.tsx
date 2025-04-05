import React, { FC, PropsWithChildren } from 'react';
import Radio, { RadioProps } from './customized/radio-group/radio-group-07';
import Select, { SelectWrapperProps } from './customized/select/default';
import MultiSelect, { MultiSelectProps } from './customized/select/multiselect';
import Search, { SearchProps } from './customized/select/search';

type FilterProps = {
  country: MultiSelectProps;
  artist: SearchProps;
  metric: SelectWrapperProps;
  timeRange: RadioProps;
};

const Filter: FC<FilterProps> = ({ country, artist, metric, timeRange }) => {
  const {
    options: countryOptions,
    selected: selectedCountries,
    setSelected: setSelectedCountries,
    placeholder: countryPlaceholder,
  } = country || {};

  const {
    options: artistOptions,
    value: selectedArtist,
    setValue: setSelectedArtist,
    placeholder: artistPlaceholder,
  } = artist || {};

  const {
    options: metricOptions,
    value: metricValue,
    setValue: setMetricValue,
    placeholder: metricPlaceholder,
  } = metric || {};

  const {
    options: timeRangeOptions,
    value: timeRangeValue,
    setValue: setTimeRangeValue,
  } = timeRange || {};

  return (
    <div className="grid grid-cols-4 w-full gap-5">
      <FilterItem label="Country">
        <MultiSelect
          options={countryOptions}
          selected={selectedCountries}
          setSelected={setSelectedCountries}
          placeholder={countryPlaceholder}
        />
      </FilterItem>
      <FilterItem label="Artist">
        <Search
          options={artistOptions}
          value={selectedArtist}
          setValue={setSelectedArtist}
          placeholder={artistPlaceholder}
        />
      </FilterItem>
      <FilterItem label="Metric">
        <Select
          options={metricOptions}
          value={metricValue}
          setValue={setMetricValue}
          placeholder={metricPlaceholder}
        />
      </FilterItem>
      <FilterItem label="Time Range">
        <Radio
          options={timeRangeOptions}
          value={timeRangeValue}
          setValue={setTimeRangeValue}
        />
      </FilterItem>
    </div>
  );
};

type FilterItemProps = {
  label: string;
};

const FilterItem: React.FC<PropsWithChildren<FilterItemProps>> = ({
  children,
  label,
}) => {
  return (
    <div>
      <span className="font-bold">{label}</span>
      <div className="mt-1">{children}</div>
    </div>
  );
};

export default Filter;
