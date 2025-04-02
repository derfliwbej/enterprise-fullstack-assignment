const express = require('express');
const metric = require('../controllers/metricController');

const router = express.Router();

router.get('/', metric.getAll);
router.get('/playlistEfficiency', metric.getPlaylistEfficiency);

module.exports = router;
