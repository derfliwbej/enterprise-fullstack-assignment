const { query } = require('../db');

class Playlist {
  /**
   * @returns {Promise<Array>} Array of records
   */
  static async getAll({ limit = 20, offset = 0 } = {}) {
    // Simple parameterized query example

    const result = await query(
      'SELECT * FROM playlists ORDER BY playlist_id LIMIT $1 OFFSET $2',
      [limit, offset]
    );

    return result.rows;
  }
}

module.exports = Playlist;
