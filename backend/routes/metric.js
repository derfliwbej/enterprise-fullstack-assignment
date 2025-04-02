const express = require('express');
const metric = require('../controllers/metricController');

const router = express.Router();

router.get('/', metric.getAll);
router.get('/playlistEfficiency', metric.getPlaylistEfficiency);
router.get('/regionalStrengthScore', metric.getRegionalStrengthScore);

module.exports = router;
