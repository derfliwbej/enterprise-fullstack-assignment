const Playlist = require('../models/Playlist');

/**
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const getAll = async (req, res, next) => {
  try {
    const data = await Playlist.getAll();

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
};
