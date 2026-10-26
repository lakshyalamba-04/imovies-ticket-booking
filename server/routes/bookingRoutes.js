const express = require('express');
const router = express.Router();
const {
  createBooking,
  getLastBooking,
  getAllBookings,
  getUserBookings,
  getBookingById,
  cancelBooking
} = require('../controllers/bookingController');

// Standard BookMyShow / SkillWallet endpoints
router.post('/', createBooking);
router.get('/last', getLastBooking);
router.get('/user/:email', getUserBookings);
router.get('/:id', getBookingById);
router.delete('/:id', cancelBooking);

// If queried without path:
// If request has query `?last=true`, return last booking, otherwise return all bookings
router.get('/', (req, res, next) => {
  if (req.query.last === 'true' || req.query.latest === 'true') {
    return getLastBooking(req, res);
  }
  return getAllBookings(req, res);
});

module.exports = router;
