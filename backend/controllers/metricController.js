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
    const [rows, totalStreams, totalPlaylistAdds, highestEfficiency] =
      await Promise.all([
        Metric.getPlaylistEfficiency({
          artist,
          country: country ? [country].flat() : null,
          startDate,
          endDate,
        }),
        Metric.getTotalStreams({
          artist,
          country: country ? [country].flat() : null,
          startDate,
          endDate,
        }),
        Metric.getTotalPlaylistAdds({
          artist,
          country: country ? [country].flat() : null,
          startDate,
          endDate,
        }),
        Metric.getHighestEfficiency({
          artist,
          country: country ? [country].flat() : null,
          startDate,
          endDate,
        }),
      ]);

    const data = {
      rows,
      total_streams: totalStreams,
      total_playlist_adds: totalPlaylistAdds,
      highest_efficiency: highestEfficiency,
    };

    res.json({
      success: true,
      count: rows.length,
      data: data,
    });
  } catch (err) {
    next(err);
  }
};

const getRegionalStrengthScore = async (req, res, next) => {
  try {
    const { artist, country, startDate, endDate } = req.query;
    const localData = await Metric.getCountryStreams({
      artist,
      country: [country].flat(),
      startDate,
      endDate,
    });

    const globalData = await Metric.getGlobalStreams({
      artist,
      startDate,
      endDate,
    });

    const data = localData.map((d) => {
      const globalStreams = globalData.find((g) => {
        const localDate = new Date(d.date);
        const globalDate = new Date(g.date);
        return (
          localDate.getTime() === globalDate.getTime() &&
          d.artist_id === g.artist_id
        );
      }).total_streams;

      return {
        ...d,
        regionalStrengthScore: d.total_streams / globalStreams,
      };
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
  getRegionalStrengthScore,
};
