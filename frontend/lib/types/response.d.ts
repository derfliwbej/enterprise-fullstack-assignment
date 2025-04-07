export type Response<T> = {
  success: boolean;
  count: number;
  data: T;
};

export type Countries = Array<{
  country_code: string;
  country_name: string;
  region: string;
  population: number;
  spotify_market: boolean;
}>;

export type Artists = Array<{
  artist_id: string;
  artist_name: string;
  genre: string;
  label: string;
  verified: boolean;
  artist_image_url: string;
  created_at: string;
  updated_at: string;
}>;

export type PlaylistEfficiencyTrend = {
  rows: Array<{
    artist_id: string;
    artist_name: string;
    streams: number;
    playlist_adds: number;
    playlist_efficiency: string;
    country_code: string;
    country_name: string;
    date: string;
  }>;
  total_streams: number;
  total_playlist_adds: number;
  highest_efficiency: {
    artist_id: string;
    artist_name: string;
    playlist_efficiency: number;
    date: string;
  };
};
