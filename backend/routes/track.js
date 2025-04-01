const express = require('express');
const track = require('../controllers/trackController');

const router = express.Router();

router.get('/', track.getAll);

module.exports = router;
