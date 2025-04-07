import api, { API_URL } from '@/utils/api';
import {
  Artists,
  Countries,
  PlaylistEfficiencyTrend,
  Response,
} from './types/response';
import { getDateRangeFromNow } from './utils';

export const getCountries = async () => {
  const data = await api.getCountries<Response<Countries>>();
  const countries = data.data;
  return countries.map((e) => {
    return { value: e.country_code, label: e.country_name };
  });
};

export const getArtists = async () => {
  const data = await api.getArtists<Response<Artists>>();
  const artists = data.data;
  return artists.map((e) => {
    return { value: e.artist_id, label: e.artist_name };
  });
};

export const getPlaylistEfficiency = async (
  artist: { value: string; label: string },
  countries: Array<any>,
  timeRange: string
) => {
  const url = new URL(API_URL);
  url.searchParams.set('artist', artist.value);
  for (const country of countries) {
    url.searchParams.append('country', country.value);
  }

  const { startDate, endDate } = getDateRangeFromNow(timeRange);
  url.searchParams.set('startDate', startDate);
  url.searchParams.set('endDate', endDate);

  const data = await api.getPlaylistEfficiency<
    Response<PlaylistEfficiencyTrend>
  >(url.search);

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
};
