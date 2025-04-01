const express = require('express');
const artist = require('../controllers/artistController');

const router = express.Router();

router.get('/', artist.getAll);

module.exports = router;
