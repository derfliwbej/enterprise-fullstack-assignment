const express = require('express');
const country = require('../controllers/countryController');

const router = express.Router();

router.get('/', country.getAll);

module.exports = router;
