const express = require('express');
const metric = require('../controllers/metricController');

const router = express.Router();

router.get('/', metric.getAll);

module.exports = router;
