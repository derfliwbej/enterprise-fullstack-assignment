// API utility for making requests to the backend

// Get the API URL from environment variables, with a fallback
export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

/**
 * Fetch data from the API
 * @param {string} endpoint - API endpoint (without leading slash)
 * @param {Object} options - Fetch options
 * @returns {Promise<any>} - Promise resolving to JSON response
 */
export const fetchFromAPI = async (endpoint, options: RequestInit = {}) => {
  try {
    const url = `${API_URL}/${endpoint}`;
    console.log(`Making API request to: ${url}`);

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

/**
 * Common API methods
 */
export const api = {
  getData: () => fetchFromAPI('api/data'),
  getCountries: () => fetchFromAPI('api/country'),
  getArtists: () => fetchFromAPI('api/artist'),
  getPlaylistEfficiency: (params) =>
    fetchFromAPI(`api/metric/playlistEfficiency${params}`),
};

export default api;
