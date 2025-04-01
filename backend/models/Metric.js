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
}

module.exports = Metric;
