const QRCode = require('qrcode');
const { isMongoConnected, store, persistStore } = require('../config/db');
const Booking = require('../models/Booking');

exports.createBooking = async (req, res) => {
  try {
    const {
      movie,
      movieId,
      movieTitle,
      poster,
      theater,
      theaterId,
      theaterName,
      screen,
      showDate,
      slot,
      timeSlot,
      seats,
      seatTier,
      baseFare,
      convenienceFee,
      snacksTotal,
      snacks,
      discount,
      totalAmount,
      paymentMethod,
      userName,
      userEmail,
      userPhone
    } = req.body;

    const resolvedMovie = movieTitle || movie || 'Untitled Movie';
    const resolvedSlot = timeSlot || slot || '07:30 PM';
    const resolvedSeats = Array.isArray(seats) ? seats : (typeof seats === 'string' ? [seats] : []);

    if (!resolvedMovie || !resolvedSlot || resolvedSeats.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Invalid booking data. Movie, show slot, and seats are required.'
      });
    }

    const bookingId = `IMV-${Math.floor(10000 + Math.random() * 90000)}`;

    // Generate QR code data URL
    let qrCodeDataUrl = '';
    try {
      const qrPayload = `IMOVIES TICKET | ID: ${bookingId} | Movie: ${resolvedMovie} | Slot: ${resolvedSlot} | Seats: ${resolvedSeats.join(',')}`;
      qrCodeDataUrl = await QRCode.toDataURL(qrPayload, { margin: 1, color: { dark: '#0b0f19', light: '#ffffff' } });
    } catch (e) {
      qrCodeDataUrl = '';
    }

    const newBooking = {
      bookingId,
      movie: resolvedMovie,
      movieId: movieId || 'mov-1',
      movieTitle: resolvedMovie,
      poster: poster || 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80',
      theater: theaterName || theater || 'PVR Cinemas',
      theaterId: theaterId || 'th-1',
      theaterName: theaterName || theater || 'PVR Cinemas',
      screen: screen || 'Screen 1 (IMAX 2D)',
      showDate: showDate || 'Today',
      slot: resolvedSlot,
      timeSlot: resolvedSlot,
      seats: resolvedSeats,
      seatTier: seatTier || 'Premium',
      ticketCount: resolvedSeats.length,
      baseFare: baseFare || (resolvedSeats.length * 280),
      convenienceFee: convenienceFee !== undefined ? convenienceFee : 40,
      snacksTotal: snacksTotal || 0,
      snacks: snacks || [],
      discount: discount || 0,
      totalAmount: totalAmount || (resolvedSeats.length * 280 + 40),
      paymentMethod: paymentMethod || 'UPI',
      paymentStatus: 'Paid',
      bookingDate: new Date().toISOString(),
      userName: userName || 'Alex Johnson',
      userEmail: userEmail || 'alex.demo@imovies.com',
      userPhone: userPhone || '+91 98765 43210',
      status: 'Confirmed',
      qrCode: qrCodeDataUrl
    };

    if (isMongoConnected()) {
      const saved = await Booking.create(newBooking);
      return res.status(200).json({
        success: true,
        message: 'Booking confirmed successfully!',
        data: saved
      });
    }

    // Save in memory/file store
    store.bookings.unshift(newBooking);
    persistStore();

    res.status(200).json({
      success: true,
      message: 'Booking confirmed successfully!',
      data: newBooking
    });
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getLastBooking = async (req, res) => {
  try {
    if (isMongoConnected()) {
      const last = await Booking.findOne().sort({ createdAt: -1 });
      if (!last) {
        return res.status(200).json({ success: false, message: 'no previous booking found', data: null });
      }
      return res.status(200).json({ success: true, data: last });
    }

    if (!store.bookings || store.bookings.length === 0) {
      return res.status(200).json({ success: false, message: 'no previous booking found', data: null });
    }

    res.status(200).json({ success: true, data: store.bookings[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAllBookings = async (req, res) => {
  try {
    if (isMongoConnected()) {
      const bookings = await Booking.find().sort({ createdAt: -1 });
      return res.json({ success: true, count: bookings.length, data: bookings });
    }

    res.json({ success: true, count: store.bookings.length, data: store.bookings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getUserBookings = async (req, res) => {
  try {
    const { email } = req.params;

    if (isMongoConnected()) {
      const bookings = await Booking.find({ userEmail: email }).sort({ createdAt: -1 });
      return res.json({ success: true, count: bookings.length, data: bookings });
    }

    const filtered = store.bookings.filter(b => !email || b.userEmail?.toLowerCase() === email.toLowerCase());
    res.json({ success: true, count: filtered.length, data: filtered });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getBookingById = async (req, res) => {
  try {
    const { id } = req.params;

    if (isMongoConnected()) {
      const booking = await Booking.findOne({ $or: [{ bookingId: id }, { _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }] });
      if (!booking) return res.status(404).json({ success: false, message: 'Booking not found' });
      return res.json({ success: true, data: booking });
    }

    const booking = store.bookings.find(b => b.bookingId === id || b._id === id);
    if (!booking) return res.status(404).json({ success: false, message: 'Booking not found' });
    res.json({ success: true, data: booking });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.cancelBooking = async (req, res) => {
  try {
    const { id } = req.params;

    if (isMongoConnected()) {
      const updated = await Booking.findOneAndUpdate(
        { $or: [{ bookingId: id }, { _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }] },
        { status: 'Cancelled' },
        { new: true }
      );
      if (!updated) return res.status(404).json({ success: false, message: 'Booking not found' });
      return res.json({ success: true, message: 'Booking cancelled successfully. Refund initiated.', data: updated });
    }

    const booking = store.bookings.find(b => b.bookingId === id || b._id === id);
    if (!booking) return res.status(404).json({ success: false, message: 'Booking not found' });
    booking.status = 'Cancelled';
    persistStore();
    res.json({ success: true, message: 'Booking cancelled successfully. Refund initiated.', data: booking });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
