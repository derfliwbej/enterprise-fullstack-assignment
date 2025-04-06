const { query } = require('../db');

class Metric {
  /**
   * @returns {Promise<Array>} Array of records
   */
  static async getAll({ limit = 20, offset = 0 } = {}) {
    // Simple parameterized query example

    const result = await query(
      'SELECT * FROM daily_metrics ORDER BY id LIMIT $1 OFFSET $2',
      [limit, offset]
    );

    return result.rows;
  }

  static async getPlaylistEfficiency({ artist, country, startDate, endDate }) {
    const result = await query(
      'SELECT artists.artist_id AS artist_id, \
              artists.artist_name AS artist_name, \
              SUM(daily_metrics.streams) AS streams, \
              SUM(daily_metrics.playlist_adds) AS playlist_adds, \
              COALESCE(SUM(daily_metrics.streams) / NULLIF(SUM(daily_metrics.playlist_adds), 0), 0) AS playlist_efficiency, \
              countries.country_code AS country_code, \
              countries.country_name AS country_name, \
              daily_metrics.date AS date \
        FROM daily_metrics JOIN tracks ON daily_metrics.track_id = tracks.track_id \
                           JOIN countries ON daily_metrics.country_code = countries.country_code \
                           JOIN artists ON artists.artist_id = tracks.artist_id \
        WHERE ($1::text IS NULL OR artists.artist_id = $1) AND \
              ($2::text IS NULL OR countries.country_code = ANY($2::text[])) AND \
              ($3::date IS NULL AND $4::date IS NULL OR daily_metrics.date BETWEEN $3 AND $4) \
        GROUP BY artists.artist_id, daily_metrics.date, countries.country_code \
        ORDER BY daily_metrics.date ASC',
      [artist, country, startDate, endDate]
    );

    return result.rows;
  }

  static async getTotalStreams({ artist, country, startDate, endDate }) {
    const result = await query(
      'SELECT artists.artist_id AS artist_id, \
              artists.artist_name AS artist_name, \
              SUM(daily_metrics.streams) AS total_streams \
      FROM daily_metrics JOIN tracks ON daily_metrics.track_id = tracks.track_id \
                         JOIN countries ON daily_metrics.country_code = countries.country_code \
                         JOIN artists ON artists.artist_id = tracks.artist_id \
      WHERE ($1::text IS NULL OR artists.artist_id = $1) AND \
            ($2::text IS NULL OR countries.country_code = ANY($2::text[])) AND \
            ($3::date IS NULL AND $4::date IS NULL OR daily_metrics.date BETWEEN $3 AND $4) \
      GROUP BY artists.artist_id',
      [artist, country, startDate, endDate]
    );

    return result.rows[0]?.total_streams || 0;
  }

  static async getTotalPlaylistAdds({ artist, country, startDate, endDate }) {
    const result = await query(
      'SELECT artists.artist_id AS artist_id, \
              artists.artist_name AS artist_name, \
              SUM(daily_metrics.playlist_adds) AS total_playlist_adds \
      FROM daily_metrics JOIN tracks ON daily_metrics.track_id = tracks.track_id \
                         JOIN countries ON daily_metrics.country_code = countries.country_code \
                         JOIN artists ON artists.artist_id = tracks.artist_id \
      WHERE ($1::text IS NULL OR artists.artist_id = $1) AND \
            ($2::text IS NULL OR countries.country_code = ANY($2::text[])) AND \
            ($3::date IS NULL AND $4::date IS NULL OR daily_metrics.date BETWEEN $3 AND $4) \
      GROUP BY artists.artist_id',
      [artist, country, startDate, endDate]
    );

    return result.rows[0]?.total_playlist_adds || 0;
  }

  static async getHighestEfficiency({ artist, country, startDate, endDate }) {
    const result = await query(
      'SELECT artists.artist_id AS artist_id, \
              artists.artist_name AS artist_name, \
              daily_metrics.date AS date, \
              COALESCE(SUM(daily_metrics.streams) / NULLIF(SUM(daily_metrics.playlist_adds), 0), 0) AS playlist_efficiency \
      FROM daily_metrics JOIN tracks ON daily_metrics.track_id = tracks.track_id \
                         JOIN countries ON daily_metrics.country_code = countries.country_code \
                         JOIN artists ON artists.artist_id = tracks.artist_id \
      WHERE ($1::text IS NULL OR artists.artist_id = $1) AND \
            ($2::text IS NULL OR countries.country_code = ANY($2::text[])) AND \
            ($3::date IS NULL AND $4::date IS NULL OR daily_metrics.date BETWEEN $3 AND $4) \
      GROUP BY artists.artist_id, daily_metrics.date \
      ORDER BY playlist_efficiency DESC \
      LIMIT 1',
      [artist, country, startDate, endDate]
    );

    return result.rows[0];
  }

  static async getCountryStreams({ artist, country, startDate, endDate }) {
    const result = await query(
      'SELECT artists.artist_id AS artist_id, \
              artists.artist_name AS artist_name, \
              countries.country_code AS country_code, \
              countries.country_name AS country_name, \
              SUM(daily_metrics.streams) AS total_streams, \
              daily_metrics.date AS date \
       FROM daily_metrics JOIN countries ON daily_metrics.country_code = countries.country_code \
                          JOIN tracks ON daily_metrics.track_id = tracks.track_id \
                          JOIN artists ON artists.artist_id = tracks.artist_id \
       WHERE ($1::text IS NULL OR artists.artist_id = $1) AND \
              ($2::text IS NULL OR countries.country_code = ANY($2::text[])) AND \
              ($3::date IS NULL AND $4::date IS NULL OR daily_metrics.date BETWEEN $3 AND $4) \
       GROUP BY artists.artist_id, daily_metrics.date, countries.country_code \
       ORDER BY daily_metrics.date ASC',
      [artist, country, startDate, endDate]
    );

    return result.rows;
  }

  static async getGlobalStreams({ artist, startDate, endDate }) {
    const result = await query(
      'SELECT SUM(daily_metrics.streams) AS total_streams, \
              artists.artist_id AS artist_id, \
              artists.artist_name AS artist_name, \
              daily_metrics.date AS date \
      FROM daily_metrics JOIN tracks ON daily_metrics.track_id = tracks.track_id \
                         JOIN artists ON artists.artist_id = tracks.artist_id \
      WHERE ($1::text IS NULL OR artists.artist_id = $1) AND \
            ($2::date IS NULL AND $3::date IS NULL OR daily_metrics.date BETWEEN $2 AND $3) \
      GROUP BY artists.artist_id, daily_metrics.date \
      ORDER BY daily_metrics.date ASC',
      [artist, startDate, endDate]
    );

    return result.rows;
  }
}

module.exports = Metric;
