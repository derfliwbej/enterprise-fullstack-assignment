const { query } = require('../db');

class Artist {
  /**
   * @returns {Promise<Array>} Array of records
   */
  static async getAll({ limit = 20, offset = 0 } = {}) {
    // Simple parameterized query example

    const result = await query(
      'SELECT * FROM artists ORDER BY artist_id LIMIT $1 OFFSET $2',
      [limit, offset]
    );

    return result.rows;
  }
}

module.exports = Artist;
