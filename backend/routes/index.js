const express = require('express');
const artistRouter = require('./artist');
const metricRouter = require('./metric');
const countryRouter = require('./country');
const trackRouter = require('./track');
const playlistRouter = require('./playlist');

const router = express.Router();

router.use('/artist', artistRouter);
router.use('/metric', metricRouter);
router.use('/country', countryRouter);
router.use('/track', trackRouter);
router.use('/playlist', playlistRouter);

module.exports = router;
