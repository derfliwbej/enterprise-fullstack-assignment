const Metric = require('../models/Metric');

/**
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const getAll = async (req, res, next) => {
  try {
    const data = await Metric.getAll();

    res.json({
      success: true,
      count: data.length,
      data: data,
    });
  } catch (err) {
    next(err);
  }
};

const getPlaylistEfficiency = async (req, res, next) => {
  try {
    const { artist, country, startDate, endDate } = req.query;
    const data = await Metric.getPlaylistEfficiency({
      artist,
      country: [country].flat(),
      startDate,
      endDate,
    });

    res.json({
      success: true,
      count: data.length,
      data: data,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAll,
  getPlaylistEfficiency,
};
