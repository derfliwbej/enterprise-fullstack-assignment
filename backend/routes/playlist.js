const express = require('express');
const playlist = require('../controllers/playlistController');

const router = express.Router();

router.get('/', playlist.getAll);

module.exports = router;
