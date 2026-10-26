const express = require('express');
const router = express.Router();
const { getTheaters, getTheaterById, getSnacks } = require('../controllers/theaterController');

router.get('/', getTheaters);
router.get('/snacks', getSnacks);
router.get('/:id', getTheaterById);

module.exports = router;
